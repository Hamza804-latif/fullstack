const express = require("express");

const app = express();

app.use(express.json());

app.listen(5000, function () {
  console.log("server is running on http://localhost:5000");
});
