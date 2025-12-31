const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch(() => {
        console.log("Failed to connect to database");
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;