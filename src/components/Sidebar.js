import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../styles/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse as faHouseRegular,
  faChartSimple,
  faLocationDot,
  faUser,
  faTruck,
  faGear,
  faArrowRightFromBracket,
  faBars,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

const MySidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="h-screen flex">
      <Sidebar collapsed={collapsed} className="h-full custom-sidebar">
        <Menu>
          <MenuItem
            icon={<FontAwesomeIcon icon={collapsed ? faBars : faBarsStaggered} />}
            onClick={() => setCollapsed(!collapsed)}
            className="menu-toggle"
          >
            {!collapsed && <span className="sidebar-title">MapMarket</span>}
          </MenuItem>

          <div className="main-links">
            <MenuItem
              icon={<FontAwesomeIcon icon={faHouseRegular} />}
              component={<Link to="/" />}
            >
              Dashboard
            </MenuItem>

            <MenuItem
              icon={<FontAwesomeIcon icon={faChartSimple} />}
              component={<Link to="/donnees" />}
            >
              Données
            </MenuItem>

            <MenuItem
              icon={<FontAwesomeIcon icon={faLocationDot} />}
              component={<Link to="/cartographie" />}
              className="active"
            >
              Cartographie
            </MenuItem>

            <MenuItem
              icon={<FontAwesomeIcon icon={faUser} />}
              component={<Link to="/login" />}
            >
              Employés
            </MenuItem>

            <MenuItem
              icon={<FontAwesomeIcon icon={faTruck} />}
              component={<Link to="/stock" />}
            >
              Stock
            </MenuItem>
          </div>

          <div className="option-links">
            <MenuItem
              icon={<FontAwesomeIcon icon={faGear} />}
              component={<Link to="/parametres" />}
            >
              Paramètres
            </MenuItem>

            <MenuItem
              icon={<FontAwesomeIcon icon={faArrowRightFromBracket} className="logout-icon" />}
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