import React, { useState, useEffect } from "react";
import "./App.css";
import Ingredients from "./components/Ingredients.js";
import MainPage from "./components/MainPage";

function App() {
  const [page, setPage] = useState("main");
  const [ingredients, setIngredients] = useState(null);
  const [myIngredients, setMyIngredients] = useState([]);
  const [inngredientToShow, setinngredientToShow] = useState("");

  function getIngredients() {
    fetch("http://127.0.0.1:9000/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIngredients(data);
      })
      .catch((error) => console.error(error));
  }
  function switchPage(toShow) {
    switch (toShow) {
      case "main":
        return <MainPage setinngredientToShow={setinngredientToShow}></MainPage>;
      case "menu":

      case "recipeList":

      case "recipeDetails":
    }
  }

  return (
    <div className="App">
      {/* <button type="button" onClick={() => getIngredients()}>
        Show ingredients
      </button>
      {ingredients &&
        ingredients.map((ingredient, index) => (
          <Ingredients ingredient={ingredient} myIngredients={myIngredients} />
        ))} */}
      {switchPage(page)}
    </div>
  );
}

export default App;
