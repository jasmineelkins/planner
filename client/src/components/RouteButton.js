import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMaximize2, FiChevronsLeft } from "react-icons/fi";

function RouteButton({ path }) {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(true);

  function handleClick() {
    setButtonClicked(!buttonClicked);
    navigate(-1);
  }
  return (
    <>
      {buttonClicked ? (
        <button
          onClick={() => setButtonClicked(!buttonClicked)}
          className="btn link"
        >
          {" "}
          <Link to={path}>
            <FiMaximize2 />
          </Link>
        </button>
      ) : (
        <button onClick={() => handleClick()} className="btn return">
          <FiChevronsLeft />
        </button>
      )}
    </>
  );
}

export default RouteButton;
