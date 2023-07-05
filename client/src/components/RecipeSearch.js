import { useEffect, useState } from "react";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails";
import Loading from "./Loading";

<<<<<<< HEAD
function RecipeSearch({ ingredients, setPage, setLogged, myIngredients }) {
=======
function RecipeSearch({ ingredients }) {
>>>>>>> c70419e85962323530100cde4f31da396924393e
  const [possibleMeals, setMealsToShow] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const [onlyMyIng, setOnlyMyIng] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function fetchMeals(onlyMyIng) {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleOnClick() {
    setShowDetails(false);
    setShowMenu(true);
  }

  function handleRecipeClick(index) {
    setSelectedMeal(possibleMeals[index]);
    setShowDetails(true);
  }

  function handleOnly() {
    fetchMeals(true);
    setSelectedMeal(null);
    setShowDetails(false);
    setOnlyMyIng(true);
    setShowMenu(false);
  }
  function handleNotOnly() {
    fetchMeals(false);
    setSelectedMeal(null);
    setShowDetails(false);
    setOnlyMyIng(false);
    setShowMenu(false);
  }

  return showMenu ? (
    <>
      <button onClick={handleOnly}>
        Search for meals only using your ingredients
      </button>
      <button onClick={handleNotOnly}>
        Search for meals with your ingredients
      </button>
    </>
  ) : onlyMyIng ? (
    <div className="RecipeSearch">
      <h1>Meals you can cook with only what you have</h1>
      <button onClick={handleOnClick}>Back</button>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
<<<<<<< HEAD
      {selectedMeal && <RecipeDetails meal={selectedMeal} myIngredients={myIngredients}/>}
=======
>>>>>>> c70419e85962323530100cde4f31da396924393e
    </div>
  ) : !showDetails ? (
    <div className="RecipeSearch">
      <h1>Meals you can cook using what you have</h1>
      <button onClick={handleOnClick}>Back</button>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {possibleMeals && (
            <div>
              {possibleMeals.map((meal, index) => (
                <button key={index} onClick={() => handleRecipeClick(index)}>
                  {meal.strMeal}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  ) : (
    <div>
      {selectedMeal && (
        <div className="RecipeSearch">
          <button onClick={() => setShowDetails(false)}>Back</button>
<<<<<<< HEAD
          <RecipeDetails meal={selectedMeal} myIngredients={myIngredients}/>
        </>
=======
          <RecipeDetails meal={selectedMeal} />
        </div>
>>>>>>> c70419e85962323530100cde4f31da396924393e
      )}
    </div>
  );
}

export default RecipeSearch;
