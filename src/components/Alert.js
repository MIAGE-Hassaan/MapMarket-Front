import React from "react";

function Alert({ message, onConfirm, onCancel }) {
  return (
    <div className="Alert">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirmer</button>
      <button onClick={onCancel}>Annuler</button>
    </div>
  );
}

export default Alert;
