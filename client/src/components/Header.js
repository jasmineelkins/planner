import React, { useState } from "react";
import { GoThreeBars } from "react-icons/go";
import Menu from "./Menu";

function Header({ user }) {
  const [menuVisible, setMenuVisible] = useState(false);

  function toggleMenu() {
    setMenuVisible(!menuVisible);
    // console.log("clicked");
    console.log(menuVisible);
  }

  return (
    <header className="headerContainer">
      {user ? <span>Hi, {user.username}</span> : null}
      <h1 className="title">Task Tracker</h1>
      <span className="headerIcon" onClick={() => toggleMenu()}>
        <GoThreeBars />
      </span>
      <Menu />
    </header>
  );
}

export default Header;
