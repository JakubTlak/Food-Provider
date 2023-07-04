import "./RecipeDetails.css";

function RecipeDetails({ meal }) {
  return (
    <div className="Recipe-container">
      <div className="top-container">
        <h1>{meal.strMeal}</h1>{" "}
        <img
          className="Recipe-picture"
          src={meal.strMealThumb}
          alt="should be a meal..."
        />
      </div>
      <div className="Ingredient-container">
        {meal.ingredients.map((ingredient, index) => {
          return (
            <p
              key={index}
              className="ingredient-list"
            >{`${ingredient.Messure} ${ingredient.Ingredient}`}</p>
          );
        })}
      </div>
      <p className="Instructions">{meal.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
