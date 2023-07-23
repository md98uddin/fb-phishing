const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
  })
);

mongoose.connect(process.env.ATLAS_URI).then(() => {
  console.log("mongoose called");
});

app.get("/postEmailPassword", cors(), (req, res, next) => {
  console.log("hit api");
  console.log(req.query);

  const { email, password } = req.query;

  var user = new User({ email: email, password: password });
  console.log("user", user);
  user.save();
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
