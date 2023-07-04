import "./MainMenu.css";
import Ingredients from "./Ingredients";

function MainMenu({
  setPage,
  setSearch,
  ingredients,
  userName,
  setLogged,
  myIngredients,
  setMyIngredients,
}) {
  function handleOnly() {
    setPage("recipeSearch");
    setSearch(true);
  }
  function handleNotOnly() {
    setPage("recipeSearch");
    setSearch(false);
  }

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
      <button onClick={handleOnly}>
        Search for meals only using your ingredients
      </button>
      <button onClick={handleNotOnly}>
        Search for meals with your ingredients
      </button>
      <button onClick={() => handleLogOut()}>Log Out</button>
    </div>
  );
}

export default MainMenu;
