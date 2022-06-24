import React, { useState, useEffect } from "react";
import { GoThreeBars } from "react-icons/go";
import Menu from "./Menu";

function Header({ user, setUser }) {
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setMenuVisible(false);
  }, []);

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
        <GoThreeBars className="menuIcon" />
      </span>
      <Menu menuVisible={menuVisible} user={user} setUser={setUser} />
    </header>
  );
}

export default Header;
