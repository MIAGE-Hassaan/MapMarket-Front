import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  logoutUser,
  verifyTokenValidity,
  getUserInfo,
  getToken
} from "../services/authService";
import "../styles/Sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const valid = verifyTokenValidity();
      setIsLoggedIn(valid);
      if (valid) {
        const info = getUserInfo();
        setUserInfo(info);
      } else {
        setUserInfo(null);
        localStorage.removeItem("token");
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    };

    checkAuth();
    // Vérifie l'état toutes les 5 minutes
    const interval = setInterval(checkAuth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    await logoutUser(navigate);
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-links-container">
        <div className="sidebar-title" onClick={toggleSidebar}>
          <img
            src={
              collapsed
                ? "../assets/expand-right-fill.png"
                : "../assets/contract-left-fill.png"
            }
            alt="toggle"
          />
          {!collapsed && <h4>MapMarket</h4>}
        </div>
        <div className="sidebar-main-links">
          <a href="Donnee" className="sidebar-main-link">
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
              {!collapsed && <p>Déconnexion</p>}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
