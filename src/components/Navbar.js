import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as faRegularBell, faBars} from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";

function Navbar({ collapsed, toggleSidebar }) {
  return (
    <div className="Navbar">
      <h2 className="navbar-title">Alertes</h2>
      <div className="user-navbar-infos">
        <button>
          <FontAwesomeIcon icon={faRegularBell} className="input-icon" />
        </button>
        <div className="user-name-navbar">
          <img src="../assets/user.jpg" alt="User" />
          <h3>Employé</h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
