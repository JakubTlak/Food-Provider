import { useEffect, useState } from "react";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails";

function RecipeSearch({ ingredients, bool, setPage }) {
  const [possibleMeals, setMealsToShow] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

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
        if (data === "No matching cookable meals found") {
          setMealsToShow(null);
        } else {
          setMealsToShow(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bool]);

  function handleOnClick() {
    setPage("menu");
  }

  function handleRecipeClick(index) {
    setSelectedMeal(possibleMeals[index]);
  }

  return bool ? (
    <div className="RecipeSearch">
      <h1>Meals you can cook with only what you have</h1>
      <button onClick={handleOnClick}>Back</button>
      {possibleMeals ? (
        <div>
          {possibleMeals.map((meal, index) => (
            <button key={index} onClick={() => handleRecipeClick(index)}>
              {meal.strMeal}
            </button>
          ))}
        </div>
      ) : (
        <div>No Meals found! Try adding more ingredients!</div>
      )}
      {selectedMeal && <RecipeDetails meal={selectedMeal} />}
    </div>
  ) : (
    <div className="RecipeSearch">
      <h1>Meals you can cook using what you have</h1>
      <button onClick={handleOnClick}>Back</button>
      {possibleMeals && (
        <div>
          {possibleMeals.map((meal, index) => (
            <button key={index} onClick={() => handleRecipeClick(index)}>
              {meal.strMeal}
            </button>
          ))}
        </div>
      )}
      {selectedMeal && <RecipeDetails meal={selectedMeal} />}
    </div>
  );
}

export default RecipeSearch;
