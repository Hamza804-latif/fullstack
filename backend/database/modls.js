const mongoose = require("mongoose");

let registerSchema = new mongoose.Schema({
  image: String,
  name: String,
  email: String,
  password: String,
});

exports.RegisterModel = mongoose.model("register", registerSchema);
