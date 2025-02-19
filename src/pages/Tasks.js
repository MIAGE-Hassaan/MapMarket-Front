import React, { useState } from "react";
import Alert from "../pages/Alert";
import "../styles/Tasks.css";

function Tasks() {
  const [showAlert, setShowAlert] = useState(false);

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

        <div className="task-panel urgent">
          <div className="status-indicator"></div>
          <div className="task-cell">7</div>
          <div className="task-cell">Fromage</div>
          <div className="task-cell">1165498436496</div>
          <div className="task-cell">Conté</div>
          <div className="task-cell">A7</div>
          <div className="task-cell">76</div>
          <div className="task-status in-progress">En cours</div>
          <button className="action-button" onClick={handleValidateClick}>Valider</button>
        </div>

        <div className="task-panel attente">
          <div className="status-indicator"></div>
          <div className="task-cell">14</div>
          <div className="task-cell">Légumes frais</div>
          <div className="task-cell">2544960612492</div>
          <div className="task-cell">poivrons rouges</div>
          <div className="task-cell">B4</div>
          <div className="task-cell">29</div>
          <div className="task-status attente">En attente</div>
          <button className="action-button" onClick={handleValidateClick}>Valider</button>
        </div>

        <div className="task-panel urgent">
          <div className="status-indicator"></div>
          <div className="task-cell">22</div>
          <div className="task-cell">Accueil et livres</div>
          <div className="task-cell">1165498436496</div>
          <div className="task-cell">dictionnaire</div>
          <div className="task-cell">A2</div>
          <div className="task-cell">31</div>
          <div className="task-status in-progress">En Cours</div>
          <button className="action-button" onClick={handleValidateClick}>Valider</button>
        </div>

        <div className="task-panel attente">
          <div className="status-indicator"></div>
          <div className="task-cell">22</div>
          <div className="task-cell">Accueil et livres</div>
          <div className="task-cell">1165498436496</div>
          <div className="task-cell">dictionnaire</div>
          <div className="task-cell">A7</div>
          <div className="task-cell">31</div>
          <div className="task-status attente">En attente</div>
          <button className="action-button" onClick={handleValidateClick}>Valider</button>
        </div>

        <div className="task-panel urgent">
          <div className="status-indicator"></div>
          <div className="task-cell">22</div>
          <div className="task-cell">Accueil et livres</div>
          <div className="task-cell">1165498436496</div>
          <div className="task-cell">dictionnaire</div>
          <div className="task-cell">A7</div>
          <div className="task-cell">31</div>
          <div className="task-status attente">En attente</div>
          <button className="action-button" onClick={handleValidateClick}>Valider</button>
        </div>

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
