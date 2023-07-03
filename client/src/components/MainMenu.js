import "./MainMenu.css";

function MainMenu({ setPage, setSearch, ingredients }) {
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
      {ingredients.map((ingr, index) => (
        <div key={index}>{ingr}</div>
      ))}
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
