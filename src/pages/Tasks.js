import React, { useEffect, useState } from "react";
import Alert from "../pages/Alert";
import { fetchAlerts } from "../services/alertService";
import "../styles/Tasks.css";

function TaskItem({ alert, onValidateClick }) {
  return (
    <div
      key={alert.uuid}
      className={`task-panel ${alert.statut.slug === 'urgent' ? "urgent" : "attente"}`}
    >
      <div className="status-indicator"></div>
      <div className="task-cell">{alert.rayon}</div>
      <div className="task-cell">{alert.secteur}</div>
      <div className="task-cell">{alert.reference}</div>
      <div className="task-cell">{alert.produit}</div>
      <div className="task-cell">{alert.stock}</div>
      <div className="task-cell">{alert.quantite}</div>
      <div className={`task-status ${alert.statut.slug}`}>{alert.statut.libelle}</div>
      <button className="action-button" onClick={onValidateClick}>
        Valider
      </button>
    </div>
  );
}

function Tasks() {
  const [alerts, setAlerts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAlerts = async () => {
      try {
        const data = await fetchAlerts();
        console.log("Fetched alerts:", data);

        if (Array.isArray(data) && data.every(item => typeof item === 'object' && item !== null)) {
          setAlerts(data);
        } else {
          console.error("Fetched data is not a valid array of objects:", data);
          setError("Erreur lors du chargement des alertes. Veuillez réessayer plus tard.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des alertes :", error);
        setError("Erreur lors du chargement des alertes. Veuillez réessayer plus tard.");
      }
    };

    getAlerts();
  }, []);

  const handleConfirm = () => {
    console.log("Confirmed");
    setShowAlert(false);
  };

  const handleCancel = () => {
    console.log("Canceled");
    setShowAlert(false);
  };

  const handleValidateClick = () => {
    setShowAlert(true);
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="Tasks">
      <div className="filters">
        <label>
          <input type="checkbox" /> Filtrer par urgence
        </label>
        <label>
          <input type="checkbox" /> Filtrer par rayon
        </label>
        <label>
          <input type="checkbox" /> Filtrer par Statut
        </label>
        <label>
          <input type="checkbox" /> Filtrer par mes tâches
        </label>
      </div>

      <div className="task-list">
        <div className="task-header">
          <div className="task-cell">Rayon</div>
          <div className="task-cell">Secteur</div>
          <div className="task-cell">Référence</div>
          <div className="task-cell">Produit</div>
          <div className="task-cell">Stock</div>
          <div className="task-cell">Nombre</div>
          <div className="task-cell">Statut</div>
          <div className="task-cell">Action</div>
        </div>

        {Array.isArray(alerts) && alerts.length > 0 ? (
          alerts.map((alert) => (
            <TaskItem
              key={alert.uuid}
              alert={alert}
              onValidateClick={handleValidateClick}
            />
          ))
        ) : (
          <div>No alerts available.</div>
        )}
      </div>

      {showAlert && (
        <Alert
          message="La tâche a-t-elle bien été effectuée ?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Tasks;
