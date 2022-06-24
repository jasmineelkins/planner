import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../Config";

function Menu({ menuVisible, user, setUser }) {
  const show = menuVisible === true ? "menuContainer" : "menuContainer hidden";

  async function deleteUserSession() {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  }
  return (
    <div className={show}>
      {user ? (
        <ul>
          <li>Profile</li>
          <li onClick={deleteUserSession} className="logOutLink">
            Log Out
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            {" "}
            <Link to="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            {" "}
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Menu;
