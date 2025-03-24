import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, verifyTokenValidity, getUserInfo } from "../services/authService"; // Import de la nouvelle fonction
import "../styles/Sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérification du token à chaque re-rendu ou au montage du composant
  useEffect(() => {
    const tokenValid = verifyTokenValidity();
    setIsLoggedIn(tokenValid); // Mettre à jour l'état en fonction de la validité du token

    // Si le token est invalide, redirige vers la page de connexion
    if (!tokenValid) {
      navigate("/login");
    }
  }, [navigate]);

  // Fonction de gestion de la déconnexion
  const handleLogout = async () => {
    await logoutUser(navigate); // Déconnecter l'utilisateur
    setIsLoggedIn(false); // Réinitialiser l'état de connexion
    navigate("/login"); // Rediriger vers la page de connexion immédiatement après la déconnexion
  };

  const userInfo = getUserInfo();

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-links-container">
        <div className="sidebar-title" onClick={toggleSidebar}>
          <img src={collapsed ? "../assets/sidebar-unfold-line.png" : "../assets/sidebar-fold-line.png"} alt="toggle" />
          {!collapsed && <h4>MapMarket</h4>}
        </div>
        <div className="sidebar-main-links">
          <a href="dashboard" className="sidebar-main-link">
            <img src="../assets/home-9-line.png" alt="logo" />
            {!collapsed && <p>Dashboard</p>}
          </a>
          <a href="gestionStocks" className="sidebar-main-link">
            <img src="../assets/bar-chart-2-line.png" alt="logo" />
            {!collapsed && <p>Stocks</p>}
          </a>
          <a href="map" className="sidebar-main-link">
            <img src="../assets/map-pin-line.png" alt="logo" />
            {!collapsed && <p>Cartographie</p>}
          </a>
          {isLoggedIn ? (
            <>
              <a href="EmployeeManagement" className="sidebar-main-link">
                <img src="../assets/group-line.png" alt="logo" />
                {!collapsed && <p>Employés</p>}
              </a>
            </>
          ) : (
            <a href="login" className="sidebar-main-link">
              <img src="../assets/account-box-line.png" alt="logo" />
              {!collapsed && <p>Compte</p>}
            </a>
          )}
        </div>
        <div className="sidebar-option-links">
          <a href="settings" className="sidebar-option-link">
            <img src="../assets/settings-3-line.png" alt="logo" />
            {!collapsed && <p>Paramètres</p>}
          </a>
          {isLoggedIn && (
            <a className="sidebar-main-link" onClick={handleLogout}>
              <img src="../assets/door-open-line.png" alt="logo" />
              {!collapsed && <p>Se déconnecter</p>}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
