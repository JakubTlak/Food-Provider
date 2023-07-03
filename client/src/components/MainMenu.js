import "./MainMenu.css";
import Ingredients from "./Ingredients";

function MainMenu({ setPage, setSearch, ingredients, userName }) {
  function handleOnly() {
    setPage("recipeSearch");
    setSearch(true);
  }
  function handleNotOnly() {
    setPage("recipeSearch");
    setSearch(false);
  }
  return (
    <div className="MainMenu">
      <Ingredients ingredients={ingredients} userName={userName} />
      <button onClick={handleOnly}>
        Search for meals only using your ingredients
      </button>
      <button onClick={handleNotOnly}>
        Search for meals with your ingredients
      </button>
      <button onClick={() => setPage("main")}>Log Out</button>
    </div>
  );
}

export default MainMenu;
