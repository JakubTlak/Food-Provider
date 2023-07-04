import { useEffect, useState } from "react";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails";

function RecipeSearch({ ingredients, setPage, setLogged }) {
  const [possibleMeals, setMealsToShow] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const [onlyMyIng, setOnlyMyIng] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:9000/api/${
        onlyMyIng ? "cookableMeals" : "possibleMeals"
      }`,
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
  }, [onlyMyIng, showDetails, possibleMeals]);

  function handleOnClick() {
    setShowDetails(false);
    setShowMenu(true);
  }

  function handleRecipeClick(index) {
    setSelectedMeal(possibleMeals[index]);
    setShowDetails(true);
  }

  function handleOnly() {
    setSelectedMeal(null);
    setShowDetails(false);
    setOnlyMyIng(true);
    setShowMenu(false);
  }
  function handleNotOnly() {
    setSelectedMeal(null);
    setShowDetails(false);
    setOnlyMyIng(false);
    setShowMenu(false);
  }

  function handleLogOut() {
    setLogged(false);
    setPage("main");
  }

  return showMenu ? (
    <>
      <button onClick={handleOnly}>
        Search for meals only using your ingredients
      </button>
      <button onClick={handleNotOnly}>
        Search for meals with your ingredients
      </button>
      <button onClick={() => handleLogOut()}>Log Out</button>
    </>
  ) : onlyMyIng ? (
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
  ) : !showDetails ? (
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
    </div>
  ) : (
    <div>
      {selectedMeal && (
        <>
          <button onClick={() => setShowDetails(false)}>Back</button>
          <RecipeDetails meal={selectedMeal} />
        </>
      )}
    </div>
  );
}

export default RecipeSearch;
