import "./MainPage.css";
import { useEffect, useState, useRef } from "react";
import RecipeDetails from "./RecipeDetails";

function MainPage({ recipeToShow, setRecipeToShow, setPage }) {
  const [searchInput, setSearchInput] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterMeals(recipe, searchInput);
  }, [searchInput, recipe]);

  function fetchRecipes() {
    fetch("http://127.0.0.1:9000/api/meals")
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function filterMeals(toFilter, filterBy) {
    setFilteredMeals(
      toFilter.filter((meal) => {
        return meal.strMeal.toLowerCase().includes(filterBy.toLowerCase());
      })
    );
  }

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    setShowOptions(true);
    setShowDetails(false);
  };

  const handleOptionClick = (value, meal) => {
    setSearchInput(value);
    setShowOptions(false);
    setShowDetails(true);
    setRecipeToShow(meal);
  };

  function handleClear() {
    setSearchInput("");
    setShowOptions(false);
  }

  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  }

  function handleLogin() {
    setPage("menu");
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="MainPage">
      <div className="loginRegister">
        <button onClick={handleLogin}>login</button>
        <button>register</button>
      </div>
      <div className="searchMeals">
        <div className="customDropdown" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}
          />
          {searchInput && (
            <button className="clearButton" onClick={handleClear}>
              X
            </button>
          )}
          {showOptions && (
            <div className="dropdownOptions">
              {filteredMeals.map((meal) => (
                <div
                  key={meal._id}
                  className="option"
                  value={meal.strMeal}
                  onClick={() => handleOptionClick(meal.strMeal, meal)}
                >
                  {meal.strMeal}
                </div>
              ))}
            </div>
          )}
          {showDetails && <RecipeDetails meal={recipeToShow} />}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
