import React, { useState } from "react";


function Login({setLoged, setPassword, setUserName, userName, password}) {


    function checkLogin() {
        fetch(`http://127.0.0.1:9000/login/${userName}/${password}`)
        .then(res=> setLoged(res))
        .catch(error=>console.log(error))
    }


    return (
        <div className="Login">
            <h3>Login:</h3>
            <input type="text" value={userName} onChange={e => setUserName(e.target.value)} required />
            <h3>Password:</h3>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="button" onClick={()=>checkLogin()}>Login</button>
        </div>
    )
}

export default Login