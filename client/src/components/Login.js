import React, { useState } from "react";

function Login({
  setLoged,
  setPassword,
  setUserName,
  userName,
  password,
  setPage,
  logged,
}) {
  const [showAlert, setShowAlert] = useState(false);

  async function checkLogin() {
    try {
      const response = await fetch(
        `http://127.0.0.1:9000/login/${userName}/${password}`
      );
      const data = await response.json();
      setLoged(data);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to login.");
    }
  }

  async function handleLogin() {
    try {
      await checkLogin();
      logged ? setPage("menu") : setShowAlert(true);
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  }

  return (
    <div className="Login">
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
        <div style={{ color: "red" }}>Wrong username or password!</div>
      ) : null}
      <button type="button" onClick={() => handleLogin()}>
        Login
      </button>
      <button onClick={() => setPage("main")}>Back</button>
    </div>
  );
}

export default Login;
