import React from 'react';
import PropTypes from 'prop-types';
import "../styles/Alert.css";

const Alert = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box" role="alertdialog" aria-labelledby="alert-title" aria-describedby="alert-description">
        <h3 id="alert-description">{message}</h3>
        <div className="alert-buttons">
          <button className="confirm-button" onClick={onConfirm}>Confirmer</button>
          <button className="cancel-button" onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Alert;
