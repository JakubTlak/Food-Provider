const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  idMeal: String,
  strMeal: String,
  strDrinkAlternate: String,
  strCategory: String,
  strArea: String,
  strInstructions: String,
  strMealThumb: String,
  strTags: String,
  strYoutube: String,
  ingredients: Array,
  dateModified: Date
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
