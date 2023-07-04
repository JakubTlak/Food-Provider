import React, { useState, useEffect } from "react";
import "./Ingredients.css";

function Ingredients({ ingredients, userName, setMyIngredients, myIngredients }) {
  const [searchValue, setSearchValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

  function addIngredient(ingredient) {
    setShowOptions(false);
    const data = { ingredient };
    if (!myIngredients.includes(ingredient)) {
      fetch(`http://127.0.0.1:9000/add/ingredients/${userName}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } else {
      alert("Already on your list");
    }
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
        setMyIngredients(data.ingredients);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getIngredients();
  }, [myIngredients]);

  useEffect(() => {
    filterIngredients(ingredients, searchValue);
  }, [ingredients, searchValue]);

  function handleChange(e) {
    setShowOptions(true);
    setSearchValue(e.target.value);
  }

  function filterIngredients(toFilter, filterBy) {
    setFilteredIngredients(
      toFilter.filter((ingredient) => {
        return ingredient.ingredientName
          .toLowerCase()
          .includes(filterBy.toLowerCase());
      })
    );
  }

  return (
    <>
      <div className="ingredient">
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search..."
        />
        {showOptions && (
          <ul>
            {filteredIngredients.map((i, index) => (
              <div
                key={index}
                className="ingredientItem"
                onClick={() => addIngredient(i.ingredientName)}
              >
                {i.ingredientName}
              </div>
            ))}
          </ul>
        )}
      </div>

      {myIngredients ? (
        <div>
          {myIngredients.map((i, index) => (
            <div key={index} className="myIngredient">
              {i}
              <button onClick={() => removeIngredient(i)}> X</button>
            </div>
          ))}
        </div>
      ) : (
        <div>{myIngredients?.length}</div>
      )}
    </>
  );
}
export default Ingredients;
