import mongoose from "mongoose";
import express from "express";
import Recipe from "./models/Recipe.js";
import mongoPasswordo from "./mongooseKey.js";
import Ingredient from "./models/Ingredient.js";
import User from "./models/User.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

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

mongoose.connect(`${mongoPasswordo}`);

app.get("/api/ingredients", (req, res) => {
  Ingredient.find({})
    .then((data) => res.json(data))
    .catch((error) => console.error(error));
});

app.get("/api/meals", (req, res) => {
  Recipe.find({})
    .then((data) => res.send(data))
    .catch((error) => console.error(error));
});

app.patch("/api/possibleMeals", (req, res) => {
  Recipe.find({ "ingredients.Ingredient": { $in: req.body } })
    .then((data) => {
      const filteredData = data.filter((recipe) => {
        const matchingIngredients = recipe.ingredients.filter((ingredient) =>
          req.body.includes(ingredient.Ingredient)
        );
        return matchingIngredients.length >= 2;
      });
      res.send(filteredData);
    })
    .catch((error) => console.error(error));
});

app.patch("/api/cookableMeals", (req, res) => {
  const ingredients = req.body;
  const requestedIngredients = ingredients.map((ing) => ing.toLowerCase());

  Recipe.find({})
    .then((data) => {
      const toSend = data.filter((meal) =>
        meal.ingredients.every((ing) =>
          requestedIngredients.includes(ing.Ingredient.toLowerCase())
        )
      );

      if (toSend.length > 0) {
        res.send(toSend);
      } else {
        res.json("No matching cookable meals found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch cookable meals" });
    });
});


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

function fetchIngredients() {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    .then((response) => response.json())
    .then((data) => {
      data.meals.forEach((ingredient) => {
        const ingredient1 = new Ingredient({
          ingredientId: ingredient.idIngredient,
          ingredientName: ingredient.strIngredient,
        });
        ingredient1.save();
      });
    })
    .catch((error) => console.error(error));
}

app.get("/api/ingredients", (req, res) => {
  Ingredient.find({})
    .then((data) => res.json(data))
    .catch((error) => console.error(error));
});

app.get("/api/myIngredients/:userName", (req, res) => {
  const userName = req.params.userName;
  User.findOne({ userName: userName })
    .then((data) => res.json(data))
    .catch((error) => console.error(error));
});

app.post("/register", (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const myIngredients = req.body.myIngredients;

  const newUser = new User({
    userName,
    email,
    password,
    myIngredients,
  });
  newUser
    .save()
    .then((newUser) => res.json(newUser))
    .catch((error) => {
      res.status(400).send({ error: "nie udalo sie zapisac usera" });
      console.error(error);
    });
});

app.patch("/add/ingredients/:userName", async (req, res) => {
  const userName = req.params.userName;

  const ingredient = req.body.ingredient;

  try {
    const user = await User.findOne({ userName: userName });
    if (!user) {
      res.json({ message: "ty jelopie" });
    }

    user.ingredients.push(ingredient);

    await user.save();
    res.json({ message: "user ingredients updated" });
  } catch (error) {
    res.json({ error: "user ingredients cannot be updated" });
  }
});

app.patch("/remove/ingredients/:userName", async (req, res) => {
  const userName = req.params.userName;
  const ingredient = req.body.ingredient;
  try {
    await User.findOneAndUpdate(
      { userName: userName },
      { $pull: { ingredients: ingredient } }
    ).exec();
    res.json({ message: "user ingredients updated" });
  } catch (error) {
    res.json({ error: "user ingredients cannot be updated" });
  }
});

app.get("/login/:login/:haslo", async (req, res) => {
  const login = req.params.login;
  const haslo = req.params.haslo;
  try {
    const user = await User.findOne({ userName: login, password: haslo });
    if (user) {
      res.status(200).send("Logged in");
    } else {
      res.status(406).send("Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
