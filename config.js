const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = {
  connectDB,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
};
