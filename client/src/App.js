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
        return (
          <RecipeDetails
            meal={{
              _id: {
                $oid: "6492c34dd66c7047b8577c2b",
              },
              idMeal: "52893",
              strMeal: "Apple & Blackberry Crumble",
              strDrinkAlternate: null,
              strCategory: "Dessert",
              strArea: "British",
              strInstructions:
                "Heat oven to 190C/170C fan/gas 5. Tip the flour and sugar into a large bowl. Add the butter, then rub into the flour using your fingertips to make a light breadcrumb texture. Do not overwork it or the crumble will become heavy. Sprinkle the mixture evenly over a baking sheet and bake for 15 mins or until lightly coloured.\r\nMeanwhile, for the compote, peel, core and cut the apples into 2cm dice. Put the butter and sugar in a medium saucepan and melt together over a medium heat. Cook for 3 mins until the mixture turns to a light caramel. Stir in the apples and cook for 3 mins. Add the blackberries and cinnamon, and cook for 3 mins more. Cover, remove from the heat, then leave for 2-3 mins to continue cooking in the warmth of the pan.\r\nTo serve, spoon the warm fruit into an ovenproof gratin dish, top with the crumble mix, then reheat in the oven for 5-10 mins. Serve with vanilla ice cream.",
              strMealThumb:
                "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
              strTags: "Pudding",
              strYoutube: "https://www.youtube.com/watch?v=4vhcOwVBDO4",
              ingredients: [
                {
                  Ingredient: "Plain Flour",
                  Messure: "120g",
                },
                {
                  Ingredient: "Caster Sugar",
                  Messure: "60g",
                },
                {
                  Ingredient: "Butter",
                  Messure: "60g",
                },
                {
                  Ingredient: "Braeburn Apples",
                  Messure: "300g",
                },
                {
                  Ingredient: "Butter",
                  Messure: "30g",
                },
                {
                  Ingredient: "Demerara Sugar",
                  Messure: "30g",
                },
                {
                  Ingredient: "Blackberrys",
                  Messure: "120g",
                },
                {
                  Ingredient: "Cinnamon",
                  Messure: "¼ teaspoon",
                },
                {
                  Ingredient: "Ice Cream",
                  Messure: "to serve",
                },
              ],
              dateModified: {
                $date: "2023-06-21T09:30:53.375Z",
              },
              __v: 0,
            }}
          />
        );
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
