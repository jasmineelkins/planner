import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const errorsToDisplay = errors === null ? null : errors;

  function handleSubmit(e) {
    e.preventDefault();
    createNewUserSession();
  }

  async function createNewUserSession() {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const userObj = await response.json();

      console.log("User logged in: ", userObj);
      if (userObj.username) {
        navigate("/");
        setUser(userObj);
        setErrors(null);
      } else {
        if (userObj.errors) {
          setErrors(userObj.errors);
        } else {
          setErrors(null);
        }

        setUser(null);
      }
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  }

  return (
    <div className="authFormContainer">
      <form onSubmit={handleSubmit} className="authForm">
        <h1>Login</h1>
        <div className="formRow">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="formRow">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          Login
        </button>

        <span className="errorSpan">{errorsToDisplay}</span>
      </form>
    </div>
  );
}

export default Login;
