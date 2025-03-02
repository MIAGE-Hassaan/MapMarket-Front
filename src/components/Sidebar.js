import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://mapmarketapi.test/api/logout?Accept=application/json",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Supprimer le token du localStorage
      localStorage.removeItem("token");
      // Rediriger l'utilisateur vers la page de connexion
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

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
          <a href="données" className="sidebar-main-link">
            <img src="../assets/bar-chart-2-line.png" alt="logo" />
            {!collapsed && <p>Données</p>}
          </a>
          <a href="map" className="sidebar-main-link">
            <img src="../assets/map-pin-line.png" alt="logo" />
            {!collapsed && <p>Cartographie</p>}
          </a>
          {isLoggedIn ? (
            <a href="user" className="sidebar-main-link">
              <img src="../assets/group-line.png" alt="logo" />
              {!collapsed && <p>Compte</p>}
            </a>
          ) : (
            <a href="login" className="sidebar-main-link">
              <img src="../assets/group-line.png" alt="logo" />
              {!collapsed && <p>Employés</p>}
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
