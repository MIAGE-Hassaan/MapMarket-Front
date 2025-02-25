import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ collapsed, toggleSidebar }) {
  const location = useLocation();

  // Fonction pour déterminer le titre en fonction de l'URL
  const getTitle = (pathname) => {
    switch (pathname) {
      case "/map":
        return "Cartographie";
      case "/login":
        return "Connexion";
      case "/tasks":
        return "Alertes";
      default:
        return ".";
    }
  };

  const title = getTitle(location.pathname);

  return (
    <div className="Navbar">
      <h2 className="navbar-title">{title}</h2>
      <div className="user-navbar-infos">
        <button>
          <img src="../assets/notification-2-line.png" alt="logo" className="input-icon" />
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
