import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  ingredients: Array
});

const User = model("User", UserSchema);

export default User