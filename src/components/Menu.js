import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Menu = (props) => {
  const { setShowMenu } = props;

  // State variables
  const navigate = useNavigate();

  // Get firstname
  const [user] = useAuthState(auth);
  const firstName = user.displayName.split(" ")[0];

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
    });
  };

  const handleClick = () => {
    navigate("/ts");
  };

  return (
    <div className="sidebar-background" onClick={() => setShowMenu(false)}>
      <nav>
        <span className="close" onClick={() => setShowMenu(false)}>
          Close Menu <i className="far fa-circle-xmark"></i>
        </span>
        <h1>Hello {firstName}!</h1>
        <ul>
          <li>
            <NavLink to="/">Today</NavLink>
          </li>
          <li>
            <NavLink to="/rota">Rota</NavLink>
          </li>
          <li>
            <NavLink to="/calendar">Calendar</NavLink>
          </li>
          <li>
            <NavLink to="/dailytasks">Tasks</NavLink>
          </li>
          <li>
            <NavLink to="/todo">To Do List</NavLink>
          </li>
          <li>
            <NavLink to="/training">Training</NavLink>
          </li>
          <li>
            <NavLink to="/handovers">Handovers</NavLink>
          </li>
          {/* <li>
            <NavLink to="/newstore">New Store</NavLink>
          </li> */}
        </ul>
        <ul className="side-menu-2">
          <li>
            <Link to="https://myapplications.microsoft.com/" target="_blank">
              My Apps
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://live.microlise.com/COOP/TMCWebPortal/authentication/login.aspx?ReturnUrl=%2fCOOP%2fTMCWebPortal%2fSite%2fVisits%2f35678%3fsiteIdEncoded%3dFalse&siteIdEncoded=False"
            >
              Delivery Time
            </Link>
          </li>
          <li>
            <Link
              to="https://eam.verisae.co.uk/DataNett/mobile/mlogin.html"
              target="_blank"
            >
              Verisae
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
        {/* <div className="btn-nav-btn" onClick={handleClick}></div> */}
      </nav>
    </div>
  );
};

export default Menu;
