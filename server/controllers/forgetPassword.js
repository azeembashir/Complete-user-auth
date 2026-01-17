const userModel = require("../models/user");
const sendEmail = require("../utils/sendMail");

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const findedUser = await userModel.findOne({ email });
    if (!findedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Email not registered" });
    }

    const userOtp = findedUser.password_otp?.otp;
    if (userOtp) {
      const timeDiff =
        new Date().getTime() -
          new Date(findedUser.password_otp.last_attempt).getTime() <=
        24 * 60 * 60 * 1000;
      if (!timeDiff) {
        findedUser.password_otp.limit = 5;
        await findedUser.save();
      }

      const remainLimit = findedUser.password_otp.limit === 0;
      if (timeDiff & remainLimit) {
        res
          .status(401)
          .json({ success: false, message: "daily limit reached" });
      }
    }
    const otp = Math.floor(Math.random() * 900000) + 100000;
    findedUser.password_otp.otp = otp;
    findedUser.password_otp.limit--;
    findedUser.password_otp.last_attempt = new Date();
    findedUser.password_otp.send_time = new Date().getTime() + 2 * 60 * 1000;
    await findedUser.save();

    const data = {
      email:email,
      otp:otp
    }
    const result = await sendEmail(data);
    res
      .status(200)
      .json({
        success: true,
        message: `Otp sent at ${email}`,
        otp: findedUser.password_otp.otp,
      });
  } catch (error) {
    console.log(error);
    
  }
};

module.exports = forgetPassword;
