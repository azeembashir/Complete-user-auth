const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return accessToken;
};

module.exports = generateToken;
