import React, {useState} from "react";
import './Registration.css'

function Registration({setRegistered, setUserName, userName, password, setPassword}){


  //USER DATA
  const[email, setEmail]= useState('');
  const[myIngredients, setMyIngredients] = useState([])
    


    function handleRegister(){
        setRegistered("xd")
        const data = {userName, email, password, myIngredients}
        fetch("http://127.0.0.1:9000/register",{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=> console.log(data))
        .catch(error=>console.error(error))
    }

    return(
        <div className="registration">
            <h3>Nick:</h3>
            <input type="text" value={userName} onChange={e=>setUserName(e.target.value)} required/>
            <h3>Email:</h3>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            <h3>Password:</h3>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}  required/>
            <button type="button" onClick={()=>handleRegister()}>Register</button>
        </div>
    )
}

export default Registration