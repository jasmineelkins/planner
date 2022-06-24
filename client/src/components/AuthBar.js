import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../Config";

function AuthBar({ user, setUser }) {
  // async function deleteUserSession() {
  //   try {
  //     const response = await fetch(`${BASE_URL}/logout`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     console.log("ERROR: ", error.message);
  //   }
  // }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
      {/* <div>
        {user ? (
          <button onClick={deleteUserSession} className="btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div> */}
    </header>
  );
}

export default AuthBar;
