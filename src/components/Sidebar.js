import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
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
          <a href="login" className="sidebar-main-link">
            <img src="../assets/group-line.png" alt="logo" />
            {!collapsed && <p>Employés</p>}
          </a>
        </div>
        <div className="sidebar-option-links">
          <a href="settings" className="sidebar-option-link">
            <img src="../assets/settings-3-line.png" alt="logo" />
            {!collapsed && <p>Paramètres</p>}
          </a>
          <a href="logout" className="sidebar-main-link">
            <img src="../assets/door-open-line.png" alt="logo" />
            {!collapsed && <p>Se déconnecter</p>}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
