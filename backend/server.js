const express = require("express");
const ConnectDatabase = require("./database/index.js");
const cors = require("cors");
const { RegisterModel } = require("./database/modls.js");

const app = express();

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
      await RegisterModel.create({
        image,
        name,
        email,
        password,
      });
      resp.json({ status: 200, msg: "Registered Successfully" });
    }
  } catch (error) {
    console.log("error in register route", error);
  }
});

app.listen(5000, function () {
  console.log("server is running on http://localhost:5000");
});
