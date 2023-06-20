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

const Recipe = require("./models/Recipe.js");

populateDBs();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://Pumak:9MRarbyueOuQbWIO@cluster0.mbfbdy3.mongodb.net/"
);

app.listen(port, ip, () => console.log(`http://${ip}:${port}`));

async function fetchMeals() {
  let meals = [];
  const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
  for await (const letter of alphabet) {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const data = await res.json();
      meals = await data.meals;
      meals ? createMeals(meals) : null;
    } catch (error) {
      console.error(error);
    }
  }
}

function createMeals(meals) {
  meals.forEach((meal) => {
    const mealsArray = Object.entries(meal);
    const ingredients = [];
    mealsArray.forEach((mi) => {
      if (mi[0].includes("Ingredient") && mi[1] !== "" && mi[1] !== null) {
        let number = mi[0].slice(13);
        mealsArray.forEach((mm) => {
          if (mm[0].includes("Measure") && mm[0].slice(10) === number) {
            ingredients.push({ Ingredient: mi[1], Messure: mm[1] });
          }
        });
      }
    });
    const recipe = new Recipe({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strDrinkAlternate: meal.strDrinkAlternate,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      strInstructions: meal.strInstructions,
      strMealThumb: meal.strMealThumb,
      strTags: meal.strTags,
      strYoutube: meal.strYoutube,
      ingredients: ingredients,
      dateModified: Date.now(),
    });
    recipe.save();
  });
}

async function populateDBs() {
  fetchMeals();
}
