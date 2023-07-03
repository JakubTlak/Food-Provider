import React, { useState, useEffect } from 'react'
import './App.css';
import Ingredients from './components/Ingredients'
import Registration from './components/Registration';
import Login from './components/Login'

function App() {



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


  



  return (<>
    {registered || loged ? (
      <div className="App">
        <Ingredients 
        ingredients={ingredients} 
        userName={userName}
        />
      </div>)
      : (
        <div className='App'>
          <Login 
          setLoged={setLoged}
          userName={userName}
          setUserName={setUserName}
          setPassword={setPassword}
          password={password}/>
          <Registration 
          setRegistered={setRegistered}
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}/>
        </div>
        )}
  </>
  );
}

export default App;
