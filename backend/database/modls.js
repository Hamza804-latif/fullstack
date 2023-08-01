const mongoose = require("mongoose");

let registerSchema = new mongoose.Schema({
  image: String,
  name: String,
  email: String,
  password: String,
});
let ProductsSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: String,
  stock: String,
});

exports.RegisterModel = mongoose.model("register", registerSchema);
exports.ProductsModel = mongoose.model("products", ProductsSchema);
