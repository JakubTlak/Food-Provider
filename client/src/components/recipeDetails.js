import "./RecipeDetails.css";

function RecipeDetails({ meal, myIngredients }) {


  const paragraphStyle = {
    backgroundColor: 'red',
  }

  return (
    <div className="Recipe-container">
      <h1 className="Title">{meal.strMeal}</h1>{" "}
      <div className="Recipe-picture">
        <img src={meal.strMealThumb} alt="should be a meal..." />
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
      <div className="Instructions">
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetails;
