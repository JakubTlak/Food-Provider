import React, { useState, useEffect } from 'react'
import './App.css';
import Ingredients from './components/Ingredients'
import Registration from './components/Registration';
import Login from './components/Login';
import MainPage from "./components/MainPage";
import RecipeDetails from "./components/RecipeDetails";
import RecipeSearch from "./components/RecipeSearch";
import MainMenu from "./components/MainMenu";

function App() {
  const [page, setPage] = useState("main");

  const [recipeToShow, setRecipeToShow] = useState("");
  const [onlyMyIngredients, setOnlyMyIngredients] = useState(true);

  const [ingredients, setIngredients] = useState(null)

  const [registered, setRegistered] = useState(null)
  const[loged, setLoged]= useState(null);

  const [userName, setUserName] = useState('')
  const[password, setPassword] = useState('')




  function getIngredients() {
    fetch('http://127.0.0.1:9000/api/ingredients')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIngredients(data);
      })
      .catch(error => console.error(error))
  }

  useEffect(()=>{
    getIngredients()
  }, [])


  



  // return (<>
  //   {registered || loged ? (
  //     <div className="App">
  //       <Ingredients 
  //       ingredients={ingredients} 
  //       userName={userName}
  //       />
  //     </div>)
  //     : (
  //       <div className='App'>
  //         <Login 
  //         setLoged={setLoged}
  //         userName={userName}
  //         setUserName={setUserName}
  //         setPassword={setPassword}
  //         password={password}/>
  //         <Registration 
  //         setRegistered={setRegistered}
  //         userName={userName}
  //         setUserName={setUserName}
  //         password={password}
  //         setPassword={setPassword}/>
  //       </div>
  //       )}
  // </>
  function switchPage(toShow) {
    switch (toShow) {
      case "main":
        return (
          <MainPage
            setRecipeToShow={setRecipeToShow}
            recipeToShow={recipeToShow}
            setPage={setPage}
          ></MainPage>
        );

      case "menu":
        return (
          <MainMenu
            setPage={setPage}
            setSearch={setOnlyMyIngredients}
            ingredients={[
              "Beef",
              "Broccoli",
              "Potatoes",
              "Carrots",
              "plain flour",
              "Eggs",
              "milk",
              "sunflower oil",
            ]}
          ></MainMenu>
        );
      case "recipeSearch":
        return (
          <RecipeSearch
            ingredients={[
              "Beef",
              "Broccoli",
              "Potatoes",
              "Carrots",
              "plain flour",
              "Eggs",
              "milk",
              "sunflower oil",
            ]}
            bool={onlyMyIngredients}
            setPage={setPage}
          ></RecipeSearch>
        );
      case "recipeDetails":
        return <RecipeDetails />;
      default:
        break;
    }
  }

  return (
    <div className="App">
      {/* <button type="button" onClick={() => getIngredients()}>
        Show ingredients
      </button>
      {ingredients &&
        ingredients.map((ingredient, index) => (
          <Ingredients ingredient={ingredient} myIngredients={myIngredients} />
        ))} */}
      {switchPage(page)}
    </div>
  );
}

export default App;
