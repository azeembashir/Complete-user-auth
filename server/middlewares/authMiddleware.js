const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Token cookies se lo
    const token = req.cookies.token;
    // console.log(token);
    

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "please login first",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ User find karo
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 4️⃣ Request ke sath user attach karo
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

module.exports = authMiddleware;
