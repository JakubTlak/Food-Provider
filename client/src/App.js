import React, { useState, useEffect } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import RecipeDetails from "./components/RecipeDetails";
import MainMenu from "./components/MainMenu";
import Registration from "./components/Registration";
import Login from "./components/Login";

function App() {
  const [page, setPage] = useState("main");
  const [recipeToShow, setRecipeToShow] = useState("");
  const [myIngredients, setMyIngredients] = useState([]);
  const [ingredients, setIngredients] = useState(null);
  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function getIngredients() {
    fetch("http://127.0.0.1:9000/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getIngredients();
  }, []);

  function switchPage(toShow) {
    switch (toShow) {
      case "main":
        return (
          <MainPage
            setRecipeToShow={setRecipeToShow}
            recipeToShow={recipeToShow}
            setPage={setPage}
            logged={logged}
            myIngredients={myIngredients}
          ></MainPage>
        );
      case "menu":
        return (
          <MainMenu
            setPage={setPage}
            ingredients={ingredients}
            myIngredients={myIngredients}
            setMyIngredients={setMyIngredients}
            userName={userName}
            setLogged={setLogged}
          ></MainMenu>
        );
      case "recipeDetails":
        return <RecipeDetails />;
      case "login":
        return (
          <Login
            setLogged={setLogged}
            userName={userName}
            setUserName={setUserName}
            setPassword={setPassword}
            password={password}
            setPage={setPage}
          />
        );
      case "register":
        return (
          <Registration
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
            setPage={setPage}
          />
        );
      default:
        break;
    }
  }

  return <div className="App">{switchPage(page)}</div>;
}

export default App;
