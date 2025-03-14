import React from "react";

function TaskItem({ alert, onValidateClick }) {
  return (
    <div key={alert.uuid} className={`task-panel ${alert.statut.slug === 'urgent' ? "urgent" : "attente"}`}>
      <div className="status-indicator"></div>
      <div className="task-cell">{alert.rayon}</div>
      <div className="task-cell">{alert.secteur}</div>
      <div className="task-cell">{alert.reference}</div>
      <div className="task-cell">{alert.produit}</div>
      <div className="task-cell">{alert.capacite}</div>
      <div className="task-cell">{alert.quantite}</div>
      <div className={`task-status ${alert.statut.slug}`}>{alert.statut.libelle}</div>
      <button
        className="action-button"
        onClick={() => onValidateClick(alert)}
        disabled={alert.statut.slug === 'fait'}
        style={{ backgroundColor: alert.statut.slug === 'fait' ? 'grey' : '' }}
      >
        {alert.statut.slug === 'nouveau' ? 'Faire' : 'Valider'}
      </button>
    </div>
  );
}

export default TaskItem;
