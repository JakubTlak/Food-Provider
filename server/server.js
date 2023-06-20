const mongoose = require("mongoose");
const express = require("express");
const app = express();

const port = 9000;
const ip = "127.0.0.1";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

mongoose.connect(
    "mongodb+srv://Pumak:9MRarbyueOuQbWIO@cluster0.mbfbdy3.mongodb.net/"
  );


  app.listen(port, ip, () => console.log(`http://${ip}:${port}`));