import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import Alert from "../pages/Alert";
import "../styles/Tasks.css";
import { fetchAlerts, updateAlertStatus } from "../services/alertService";

function Tasks() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    urgence: false,
    rayon: false,
    statut: false,
    date: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchAlerts();

      if (Array.isArray(data) && data.every(item => typeof item === 'object' && item !== null)) {
        setAlerts(data);
        setFilteredAlerts(data); // Initialement, affichez toutes les alertes sans filtres
      } else {
        console.error("Fetched data is not a valid array of objects:", data);
        setError("Erreur lors du chargement des alertes. Veuillez réessayer plus tard.");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des alertes :", error);
      setError("Erreur lors du chargement des alertes. Veuillez réessayer plus tard.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = [...alerts];

    if (filters.urgence) {
      filtered = filtered.filter(alert => alert.statut.slug === 'urgent' || alert.statut.slug === 'nouveau' || alert.statut.slug === 'en-cours');
    }

    if (filters.rayon) {
      filtered = filtered.reduce((acc, alert) => {
        const produit = alerts.find(a => a.produit?.uuid === alert.produit?.uuid);
        const rayon = produit?.rayon_id;
        const group = acc[rayon] || [];
        group.push(alert);
        acc[rayon] = group;
        return acc;
      }, {});
    }

    if (filters.statut) {
      filtered = Array.isArray(filtered) ? filtered.reduce((acc, alert) => {
        const group = acc[alert.statut.slug] || [];
        group.push(alert);
        acc[alert.statut.slug] = group;
        return acc;
      }, {}) : filtered;
    }

    if (filters.date) {
      filtered = Array.isArray(filtered) ? filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : filtered;
    }

    const flattened = (obj) => Object.values(obj).flat();
    setFilteredAlerts(Array.isArray(filtered) ? filtered : flattened(filtered));
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  useEffect(() => {
    if (Object.values(filters).every(value => !value)) {
      setFilteredAlerts(alerts);
    }
  }, [filters, alerts]);

  const handleValidateClick = (alert) => {
    setCurrentAlert(alert);
    setShowAlert(true);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const newStatus = currentAlert.statut.slug === 'nouveau' ? 'en-cours' : 'fait';
      await updateAlertStatus(token, currentAlert.uuid, newStatus);
      fetchData(); // Refresh the alerts to reflect the change
      setShowAlert(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="Tasks">
      <div className="filters">
        <label>
          <input type="checkbox" name="urgence" onChange={handleFilterChange} /> Filtrer par urgence
        </label>
        <label>
          <input type="checkbox" name="rayon" onChange={handleFilterChange} /> Filtrer par rayon
        </label>
        <label>
          <input type="checkbox" name="statut" onChange={handleFilterChange} /> Filtrer par Statut
        </label>
        <label>
          <input type="checkbox" name="date" onChange={handleFilterChange} /> Filtrer par date
        </label>
        <button className="action-button" onClick={applyFilters}>Appliquer les filtres</button>
      </div>

      <div className="task-list">
        <div className="task-header">
          <div className="task-cell">Urgence</div>
          <div className="task-cell">Rayon</div>
          <div className="task-cell">Secteur</div>
          <div className="task-cell">Référence</div>
          <div className="task-cell">Produit</div>
          <div className="task-cell">Capacité</div>
          <div className="task-cell">Quantité</div>
          <div className="task-cell">Statut</div>
          <div className="task-cell">Action</div>
        </div>

        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <TaskItem
              key={alert.uuid}
              alert={alert}
              onValidateClick={() => handleValidateClick(alert)}
            />
          ))
        ) : (
          <div>No alerts available.</div>
        )}
      </div>

      {showAlert && (
        <Alert
          message={currentAlert.statut.slug === 'nouveau' ? "Voulez vous effectuer cette tâche ?" : "La tâche a-t-elle bien été effectuée ?"}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Tasks;
