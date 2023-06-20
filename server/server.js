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
let meals = [];

async function fetchMeals() {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=a`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await res.json();
    meals = data;
    console.log(meals);
  } catch (error) {
    console.error(error);
  }
}
fetchMeals();

console.log(meals);

app.use(express.json());

mongoose.connect(
  "mongodb+srv://Pumak:9MRarbyueOuQbWIO@cluster0.mbfbdy3.mongodb.net/"
);

app.listen(port, ip, () => console.log(`http://${ip}:${port}`));
