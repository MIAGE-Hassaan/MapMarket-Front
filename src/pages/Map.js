import React, { useState } from "react";
import "../styles/Map.css";

function Map() {
  const [popups, setPopups] = useState({
    7: false,
    18: false,
    22: false,
  });

  const togglePopup = (id) => {
    setPopups((prevPopups) => ({
      ...prevPopups,
      [id]: !prevPopups[id],
    }));
  };

  return (
    <div className="map-container">
      <h1>Map</h1>
    </div>
  );
}

export default Map;
