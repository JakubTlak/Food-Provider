import React, { useState } from "react";
import "./App.css";
// import Ingredients from "./components/Ingredients.js";
import MainPage from "./components/MainPage";
import RecipeDetails from "./components/RecipeDetails";
import RecipeSearch from "./components/RecipeSearch";
import MainMenu from "./components/MainMenu";

function App() {
  const [page, setPage] = useState("main");
  // const [ingredients, setIngredients] = useState(null);
  // const [myIngredients, setMyIngredients] = useState([]);
  const [recipeToShow, setRecipeToShow] = useState("");
  const [onlyMyIngredients, setOnlyMyIngredients] = useState(true);

  // function getIngredients() {
  //   fetch("http://127.0.0.1:9000/api/ingredients")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setIngredients(data);
  //     })
  //     .catch((error) => console.error(error));
  // }
  function switchPage(toShow) {
    switch (toShow) {
      case "main":
        return (
          <MainPage
            setRecipeToShow={setRecipeToShow}
            recipeToShow={recipeToShow}
            setPage={setPage}
          ></MainPage>
        );

      case "menu":
        return (
          <MainMenu
            setPage={setPage}
            setSearch={setOnlyMyIngredients}
            ingredients={[
              "Beef",
              "Broccoli",
              "Potatoes",
              "Carrots",
              "plain flour",
              "Eggs",
              "milk",
              "sunflower oil",
            ]}
          ></MainMenu>
        );
      case "recipeSearch":
        return (
          <RecipeSearch
            ingredients={[
              "Beef",
              "Broccoli",
              "Potatoes",
              "Carrots",
              "plain flour",
              "Eggs",
              "milk",
              "sunflower oil",
            ]}
            bool={onlyMyIngredients}
            setPage={setPage}
          ></RecipeSearch>
        );
      case "recipeDetails":
        return <RecipeDetails />;
      default:
        break;
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
