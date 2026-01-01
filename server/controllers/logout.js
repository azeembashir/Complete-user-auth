const userLogout = (req, res) => {
  try {
    // 1️⃣ JWT token clear karo
    res.clearCookie("token");

    // 2️⃣ Agar session middleware use ho raha hai, to connect.sid clear karo
    res.clearCookie("connect.sid");

    // 3️⃣ Optionally, server-side session destroy kar do
    if (req.session) {
      req.session.destroy(err => {
        if (err) console.log(err);
      });
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = userLogout;
