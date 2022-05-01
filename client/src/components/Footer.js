import React from "react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Designed & built by Jasmine Elkins&nbsp;
        <a
          href="https://github.com/jasmineelkins"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="icon" />
        </a>
        &nbsp; | &nbsp; May 2022 &nbsp;&nbsp;
      </p>
    </footer>
  );
}

export default Footer;
