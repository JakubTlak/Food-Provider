import "./RecipeDetails.css";

function RecipeDetails({ meal, myIngredients }) {


  const paragraphStyle = {
    backgroundColor: 'red',
  }

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

          if (!myIngredients.includes(ingredient.Ingredient)) {
            return (<div className="notStorage">
              <img className="notAvailable" src='https://t3.ftcdn.net/jpg/01/38/48/40/360_F_138484065_1enzXuW8NlkppNxSv4hVUrYoeF8qgoeY.jpg'></img>
              <h3
                key={index}
                className="ingredient-list"
              >{`${ingredient.Messure} ${ingredient.Ingredient}`}</h3>
            </div>
            );
          }else{
            return (
              <h3
                key={index}
                className="ingredient-list"
              >{`${ingredient.Messure} ${ingredient.Ingredient}`}</h3>
            )
          }

        })}
      </div>
      <p className="Instructions">{meal.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
