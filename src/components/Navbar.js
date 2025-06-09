import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserInfo, verifyTokenValidity } from "../services/authService"; // Importer la nouvelle fonction
import { useAlerts } from "../hooks/useAlerts";
import "../styles/Navbar.css";

function Navbar({ collapsed, toggleSidebar }) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { hasAlerts, loading, error } = useAlerts();

  // Vérifier la validité du token et récupérer les informations de l'utilisateur
  useEffect(() => {
    const tokenValid = verifyTokenValidity();
    setIsLoggedIn(tokenValid);

    if (tokenValid) {
      const info = getUserInfo();
      setUserInfo(info); // Si le token est valide, récupérer les informations de l'utilisateur
    } else {
      setUserInfo(null); // Si le token est invalide, on efface les informations utilisateur
    }
  }, []);

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
        return "Liste des employés";
      case "/gestionStocks":
        return "Gestion des produits";
      case "/InformationEmployee":
        return "Informations employée";
      case "/Donnee":
        return "Dashboard";
      case "/CreateAccount":
        return "Ajouter un employé";
      default:
        return ".";
    }
  };

  const title = getTitle(location.pathname);

  return (
    <div className="Navbar">
      <h1 className="navbar-title">{title}</h1>
      <div className="user-navbar-infos">
        <a href="tasks" className="notification-icon-container">
          <img src="../assets/notification-2-line.png" alt="logo" className="input-icon" />
          {hasAlerts && !loading && !error && <span className="alert-dot"></span>}
        </a>
        <div className="user-name-navbar">
          <img src="../assets/user.png" alt="User" />
          <h4>{isLoggedIn && userInfo ? `${userInfo.nom} ${userInfo.prenom}` : "Session invité"}</h4>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
