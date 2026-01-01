const getUser = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = getUser;