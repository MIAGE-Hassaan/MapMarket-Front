import React from "react";
import { useLocation } from "react-router-dom";
import { getUserInfo } from "../services/authService";
import "../styles/Navbar.css";

function Navbar({ collapsed, toggleSidebar }) {
  const location = useLocation();
  const users_basics = getUserInfo();

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
      case "/forgotPassword":
        return "Mot de passe oublié";
      case "/resetPassword":
        return "Réinitialisation du mot de passe";
      case "/EmployeeManagement":
        return "Gestion employés";
      case "/InformationEmployee":
        return "Information employé";
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
          <h3>{users_basics ? `${users_basics.nom} ${users_basics.prenom}` : "Session invité"}</h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
