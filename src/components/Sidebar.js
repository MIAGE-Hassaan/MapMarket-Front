import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../styles/Sidebar.css";

const MySidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="h-screen flex">
      <Sidebar collapsed={collapsed} className="h-full custom-sidebar">
        <Menu>
          <MenuItem
            icon={
              <img
                src={
                  collapsed
                    ? "../assets/sidebar-unfold-line.png"
                    : "../assets/sidebar-fold-line.png"
                }
                alt={collapsed ? "Unfold" : "Fold"}
                className="sidebar-icon"
              />
            }
            onClick={() => setCollapsed(!collapsed)}
            className="menu-toggle"
          >
            {!collapsed && <span className="sidebar-title">MapMarket</span>}
          </MenuItem>

          <div className="main-links">
            <MenuItem
              icon={<img src="../assets/home-9-line.png" alt="Dashboard" className="sidebar-icon" />}
              component={<Link to="/" />}
            >
              Dashboard
            </MenuItem>

            <MenuItem
              icon={<img src="../assets/bar-chart-2-line.png" alt="Données" className="sidebar-icon" />}
              component={<Link to="/donnees" />}
            >
              Données
            </MenuItem>

            <MenuItem
              icon={<img src="../assets/map-pin-line.png" alt="Cartographie" className="sidebar-icon" />}
              component={<Link to="/cartographie" />}
              className="active"
            >
              Cartographie
            </MenuItem>

            <MenuItem
              icon={<img src="../assets/group-line.png" alt="Employés" className="sidebar-icon" />}
              component={<Link to="/login" />}
            >
              Employés
            </MenuItem>

            <MenuItem
              icon={<img src="../assets/truck-line.png" alt="Stock" className="sidebar-icon" />}
              component={<Link to="/stock" />}
            >
              Stock
            </MenuItem>
          </div>

          <div className="option-links">
            <MenuItem
              icon={<img src="../assets/settings-3-line.png" alt="Paramètres" className="sidebar-icon" />}
              component={<Link to="/parametres" />}
            >
              Paramètres
            </MenuItem>

            <MenuItem
              icon={<img src="../assets/door-open-line.png" alt="Déconnexion" className="sidebar-icon logout-icon" />}
              component={<Link to="/logout" />}
              className="logout"
            >
              Déconnexion
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MySidebar;
