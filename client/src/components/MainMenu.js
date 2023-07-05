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
  function handleLogOut() {
    setLogged(false);
    setPage("main");
  }

  return (
    <div className="MainMenu">
      <Ingredients
        ingredients={ingredients}
        userName={userName}
        myIngredients={myIngredients}
        setMyIngredients={setMyIngredients}
      />
      <div className="Logout"><button onClick={() => handleLogOut()}>Log Out</button></div>
      <div className="menu">
        <RecipeSearch
          ingredients={myIngredients}
          setPage={setPage}
          setLogged={setLogged}
        ></RecipeSearch>
      </div>
    </div>
  );
}

export default MainMenu;
