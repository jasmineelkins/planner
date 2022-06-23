import React, { useState } from "react";

function Menu({ menuVisible }) {
  const show = menuVisible === true ? "menuContainer" : "menuContainer hidden";
  return (
    <div className={show}>
      <ul>
        <li>Profile</li>
        <li>Log Out</li>
      </ul>
    </div>
  );
}

export default Menu;
