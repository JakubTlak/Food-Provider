import React, { useState } from "react";
import "./Login.css";

function Login({
  setLogged,
  setPassword,
  setUserName,
  userName,
  password,
  setPage,
}) {
  const [showAlert, setShowAlert] = useState(false);

  function checkLogin() {
    fetch(`http://127.0.0.1:9000/login/${userName}/${password}`)
      .then((res) => {
        if (res.status === 200) {
          setLogged(true);
          setPage("menu");
        } else {
          setShowAlert(true);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="LoginContainer">
      <h3>Login:</h3>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <h3>Password:</h3>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {showAlert ? (
        <div className="Alert">Wrong username or password!</div>
      ) : null}
      <button type="button" onClick={() => checkLogin()}>
        Login
      </button>
      <button onClick={() => setPage("main")}>Back</button>
    </div>
  );
}

export default Login;
