const mongoose = require("mongoose");
const colors = require("colors");
// mangodb database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to database ${mongoose.connection.host}`.bgWhite);
  } catch (error) {
    console.log("db error", error, colors.bgRed);
  }
};
module.exports = connectDB;
