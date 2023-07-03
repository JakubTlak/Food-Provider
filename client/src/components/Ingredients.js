import React, { useState, useEffect } from "react";
import "./Ingredients.css";

function Ingredients({ ingredients, userName }) {
  const [searchValue, setSearchValue] = useState("");
  const [myIngredients1, setMyIngredients1] = useState([]);

  //const filteredIngredients = (ingredients.filter(ingredient => ingredient.ingredientName.toLowerCase().includes(searchValue.toLowerCase())));

  function addIngredient(ingredient) {
    const data = { ingredient };
    fetch(`http://127.0.0.1:9000/add/ingredients/${userName}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function removeIngredient(ingredient) {
    const data = { ingredient };
    fetch(`http://127.0.0.1:9000/remove/ingredients/${userName}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function getIngredients() {
    fetch(`http://127.0.0.1:9000/api/myIngredients/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        setMyIngredients1(data.ingredients);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div className="ingredient">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {ingredients.map((i) => (
          <div
            className="ingredientItem"
            onClick={() => addIngredient(i.ingredientName)}
          >
            {i.ingredientName}
          </div>
        ))}
      </ul>

      {myIngredients1 ? (
        myIngredients1.map((i, index) => (
          <div key={index} className="myIngredient">
            {i}
          </div>
        ))
      ) : (
        <div>{myIngredients1?.length}</div>
      )}
    </div>
  );
}
export default Ingredients;
