import "./MainMenu.css";
import Ingredients from "./Ingredients";
import RecipeSearch from "./RecipeSearch";

function MainMenu({
  setPage,
  ingredients,
  userName,
  setLogged,
  myIngredients,
  setMyIngredients,
}) {
  return (
    <div className="MainMenu">
      <Ingredients
        ingredients={ingredients}
        userName={userName}
        myIngredients={myIngredients}
        setMyIngredients={setMyIngredients}
      />
      <div className="menu">
        <RecipeSearch
          ingredients={myIngredients}
          setPage={setPage}
          setLogged={setLogged}
          myIngredients={myIngredients}
        ></RecipeSearch>
      </div>
    </div>
  );
}

export default MainMenu;
