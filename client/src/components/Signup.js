import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";

function SignUp({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const errorsToDisplay = errors === null ? null : errors;

  function handleSubmit(e) {
    e.preventDefault();
    createUser();
  }

  async function createUser() {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });
      const userObj = await response.json();

      console.log("New User Logged In: ", userObj);

      if (userObj.username) {
        navigate("/");
        setUser(userObj);
        setErrors(null);
      } else {
        if (userObj.error) {
          setErrors(userObj.error.login);
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
        <h1>Sign Up</h1>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="formRow">
          <label htmlFor="password">Password Confirmation</label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn">
          Sign Up
        </button>

        <span className="errorSpan">{errorsToDisplay}</span>
      </form>
    </div>
  );
}

export default SignUp;
