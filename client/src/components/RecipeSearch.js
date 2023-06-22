import { useEffect, useState } from "react";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails";

function RecipeSearch({ ingredients, bool, setPage }) {
  const [possibleMeals, setMealsToShow] = useState(null);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:9000/api/${bool ? "cookableMeals" : "possibleMeals"}`,
      {
        method: "PATCH",
        body: JSON.stringify(ingredients),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMealsToShow(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bool]);

  function handleOnClick() {
    setPage("menu");
  }

  return bool ? (
    <div className="RecipeSearch">
      <h1>Meals you can cook with only what you have </h1>
      <button onClick={handleOnClick}>Back</button>
      {possibleMeals &&
        possibleMeals.map((meal, index) => {
          return <RecipeDetails meal={meal} key={index}></RecipeDetails>;
        })}
    </div>
  ) : (
    <div className="RecipeSearch">
      <h1>Meals you can cook using what you have </h1>
      <button onClick={handleOnClick}>Back</button>
      {possibleMeals &&
        possibleMeals.map((meal, index) => {
          return <RecipeDetails meal={meal} key={index}></RecipeDetails>;
        })}
    </div>
  );
}

export default RecipeSearch;
