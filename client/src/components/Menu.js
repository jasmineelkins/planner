import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from "../Config";

function Menu({ menuVisible, setMenuVisible, user, setUser }) {
  const show = menuVisible === true ? "menuContainer" : "menuContainer hidden";
  const navigate = useNavigate();

  async function deleteUserSession() {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUser(null);
        setMenuVisible(false);
        navigate("/");
      }
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  }

  function hideMenu() {
    setMenuVisible(false);
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
          <li onClick={hideMenu}>
            {" "}
            <Link to="/">Home</Link>
          </li>
          <li onClick={hideMenu}>
            {" "}
            <Link to="/signup">Signup</Link>
          </li>
          <li onClick={hideMenu}>
            {" "}
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Menu;
