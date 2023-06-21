import React, {useState, useEffect} from 'react'
import './App.css';
import Ingredients from './components/Ingredients.js'

function App() {

  const[ingredients, setIngredients] = useState(null)
  
  const[myIngredients, setMyIngredients] = useState([]);


  function getIngredients(){
    fetch('http://127.0.0.1:9000/api/ingredients')
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setIngredients(data);
    })
    .catch(error=>console.error(error))
  }

 

  return (
    <div className="App">
      <button type='button' onClick={()=>getIngredients()}>Show ingredients</button>
      {ingredients && ingredients.map((ingredient,index)=> <Ingredients ingredient={ingredient} myIngredients={myIngredients}/>)}
    </div>
  );
}

export default App;
