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
      case "/":
        return "Accueil";
      case "/tasks":
        return "Alertes";
      case "/createAccount":
        return "Compte utilisateur";
      default:
        return ".";
    }
  };

  const title = getTitle(location.pathname);

  return (
    <div className="Navbar">
      <h4 className="navbar-title">{title}</h4>
      <div className="user-navbar-infos">
        <a href="tasks">
          <img src="../assets/notification-2-line.png" alt="logo" className="input-icon" />
        </a>
        <div className="user-name-navbar">
          <img src="../assets/user.jpg" alt="User" />
          <h3>Employé</h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
