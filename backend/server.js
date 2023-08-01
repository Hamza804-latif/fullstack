const express = require("express");
const ConnectDatabase = require("./database/index.js");
const cors = require("cors");
const { RegisterModel, ProductsModel } = require("./database/modls.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const tokenSecret = "kajdfhksdkchsj78326472?>?>?>;";

ConnectDatabase();

app.use(cors());
app.use(express.json({ limit: "60mb" }));

app.post("/register", async (req, resp) => {
  let { image, name, email, password } = req.body;
  try {
    let checkEmail = await RegisterModel.findOne({ email });
    if (checkEmail) {
      return resp.json({ status: 403, msg: "Email Already Exist" });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      await RegisterModel.create({
        image,
        name,
        email,
        password: hashedPassword,
      });
      resp.json({ status: 200, msg: "Registered Successfully" });
    }
  } catch (error) {
    console.log("error in register route", error);
  }
});

app.post("/login", async (req, resp) => {
  let { email, password } = req.body;
  try {
    let emailCheck = await RegisterModel.findOne({ email });
    if (emailCheck) {
      let checkPassword = await bcrypt.compare(password, emailCheck?.password);
      if (checkPassword) {
        jwt.sign(
          { id: emailCheck?._id, name: emailCheck?.name },
          tokenSecret,
          { expiresIn: "10m" },
          (err, token) => {
            if (err)
              return resp.json({ status: 500, msg: "Internal Server Error" });

            resp.json({ status: 200, msg: "Login Successfull", token });
          }
        );
      } else {
        resp.json({ status: 401, msg: "Email or Password is incorrect" });
      }
    } else {
      resp.json({ status: 401, msg: "Email or Password is incorrect" });
    }
  } catch (error) {
    console.log("error in login route", error);
  }
});

app.post("/addproduct", async (req, resp) => {
  let { image, name, price, stock } = req.body;
  try {
    await ProductsModel.create({
      image,
      name,
      price,
      stock,
    });
    resp.json({ status: 200, msg: "Product Added Successfully" });
  } catch (error) {
    console.log("error in add product", error);
  }
});

app.get("/allproducts", async (req, resp) => {
  try {
    let products = await ProductsModel.find({});
    resp.json({ status: 200, data: products });
  } catch (error) {
    console.log("error in all products", error);
  }
});

app.listen(5000, function () {
  console.log("server is running on http://localhost:5000");
});
