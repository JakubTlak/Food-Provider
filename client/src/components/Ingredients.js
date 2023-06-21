import React, {useState} from "react";

function Ingredients({ingredient, myIngredients}){


    function addIngredient(ingredient){
        myIngredients.push(ingredient)
        console.log(myIngredients)
    }

    return(
        <div className="ingredient">
            <h3>{ingredient.ingredientName}</h3>
            <button type="button" onClick={()=>addIngredient(ingredient)}>ADD</button>
        </div>
    )
}
export default Ingredients