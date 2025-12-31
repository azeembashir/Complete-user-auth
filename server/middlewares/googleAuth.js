const userModel = require("../models/user");
const generateToken = require("../utils/generateToken");

const googleAuth = async (req, res, next) => {
  try {
    if (!req.user || !req.user._json) {
      return res.status(401).json({ message: "Google authentication failed" });
    }

    const { name, email } = req.user._json;

    let existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      existingUser = await userModel.create({
        name,
        email,
      });
    }

    req.user = existingUser; // future use (JWT, session)

    const token = generateToken(existingUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = googleAuth;
