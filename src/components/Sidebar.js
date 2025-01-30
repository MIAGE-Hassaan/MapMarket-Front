import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <Link to="/" className="home-link">
            <img src="/assets/list-logo.png" alt="Accueil" />
      </Link>
      <ul className="start-links">
        <li>
          <Link to="/">
            <img src="/assets/home-logo.png" alt="Accueil" />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src="/assets/box-logo.png" alt="Login" />
          </Link>
        </li>
        <li>
          <Link to="/login">
            <img src="/assets/users-logo.png" alt="Profil" />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src="/assets/pin-logo.png" alt="Map" />
          </Link>
        </li>
        </ul>
        <ul className="end-links">
        <li>
          <Link to="/">
            <img src="/assets/settings-logo.png" alt="Paramètres" />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src="/assets/exit-logo.png" alt="Déconnexion" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
