import { Schema, model } from "mongoose";

const IngredientSchema = new Schema({
  ingredientId: Number,
  ingredientName: String
});

const Ingredient = model("Ingredient", IngredientSchema);

export default Ingredient