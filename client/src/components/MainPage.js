import "./MainPage.css";
import { useEffect, useState, useRef } from "react";

function MainPage({ ingredientToShow }) {
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
    filterMeals();
  }, [searchInput, recipe]);

  const fetchRecipes = () => {
    fetch("http://127.0.0.1:9000/api/meals")
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterMeals = () => {
    setFilteredMeals(
      recipe.filter((meal) => {
        return meal.strMeal.toLowerCase().includes(searchInput.toLowerCase());
      })
    );
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    setShowOptions(true);
    setShowDetails(false);
  };

  const handleOptionClick = (value) => {
    setSearchInput(value);
    setShowOptions(false);
    setShowDetails(true);
    ingredientToShow(value);
  };

  const handleClear = () => {
    setSearchInput("");
    setShowOptions(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="MainPage">
      <div className="loginRegister">
        <button>login</button>
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
                  onClick={() => handleOptionClick(meal.strMeal)}
                >
                  {meal.strMeal}
                </div>
              ))}
            </div>
          )}
          {showDetails && <div>details</div>}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
