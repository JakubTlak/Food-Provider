function RecipeDetails ({meal}) {
console.log(meal)

    return (
        <div className="Recipe-container">
            <h1>{meal.strMeal}</h1>
            <img className="Recipe-picture" src={meal.strMealThumb}></img>
            <div className="Ingredient-container">
            {meal.ingredients.map((ingredient) => {return<p className="ingredient">{`${ingredient.Messure} ${ingredient.Ingredient}`}</p>})}
            </div>
            <p className="Instructions">{meal.strInstructions}</p>

        </div>
    )
}

export default RecipeDetails