import "./RecipeDetails.css";

function RecipeDetails({ meal }) {
  return (
    <div className="Recipe-container">
      <h1 className="Title">{meal.strMeal}</h1>{" "}
      <div className="Recipe-picture">
        <img src={meal.strMealThumb} alt="should be a meal..." />
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
      <div className="Instructions">
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetails;
