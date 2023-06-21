import { Schema, model } from "mongoose";

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

export default Recipe