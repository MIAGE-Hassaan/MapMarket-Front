import React, { useState } from "react";
import "../styles/Map.css";
import { useNavigate } from "react-router-dom";

function Map() {
  const [popups, setPopups] = useState({
    7: false,
    18: false,
    22: false,
  });
  const navigate = useNavigate();
  const togglePopup = (id) => {
    setPopups((prevPopups) => ({
      ...prevPopups,
      [id]: !prevPopups[id],
    }));
  };

  return (
      <div className="map-container">
        <h1>Map</h1>
        <button onClick={() => navigate("/gestionstocks")} className="go-to-stock-btn">
          Aller à la gestion des stocks
        </button>
      </div>
  );
}

export default Map;
