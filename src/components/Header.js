import React, { useState } from "react";
// Assets
import logo from "../assets/coop-logo.png";
// Components
import Menu from "./Menu";

const Header = () => {
  // State variables
  const [showMenu, setShowMenu] = useState(false);
  const [spin, setSpin] = useState(false);

  return (
    <>
      {showMenu && <Menu setShowMenu={setShowMenu} showMenu={showMenu} />}
      <header>
        <a href="/">
          <img src={logo} alt="logo" height={40} />
        </a>
        <div>
          <i
            className={`fas fa-arrows-rotate ${spin ? "fa-spin" : ""}`}
            onClick={() => {
              setSpin(true);
              window.location.reload();
            }}
          ></i>
          <i className="fas fa-bars" onClick={() => setShowMenu(true)}></i>
        </div>
      </header>
    </>
  );
};

export default Header;
