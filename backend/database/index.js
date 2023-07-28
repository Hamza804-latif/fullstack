const mongoose = require("mongoose");

async function ConnectDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/fullstackauthmern", {});
    console.log("database is connected");
  } catch (error) {
    console.log("error in database connection", error);
  }
}

module.exports = ConnectDatabase;
