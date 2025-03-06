import React, { useState } from "react";
import "../styles/ResetPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as faRegularBell } from "@fortawesome/free-regular-svg-icons";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Simuler la réinitialisation du mot de passe
      setMessage("Mot de passe modifié avec succès");
      // Rediriger vers la page de connexion après un délai
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else {
      setMessage("Les mots de passe ne correspondent pas");
    }
  };

  return (
    <div className="ForgotPassword">
      <div className="recovery-container">
        <div className="title">
          <img src="../assets/image1.png" alt="logo" />
          <h1>MapMarket</h1>
        </div>
        <h2>Modification du mot de passe</h2>
        <div className="recovery-form">
          <label htmlFor="password">Nouveau mot de passe</label>
          <div className="input-display">
            <FontAwesomeIcon icon={faRegularBell} className="input-icon" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <label htmlFor="password2">Confirmation du mot de passe</label>
          <div className="input-display">
            <FontAwesomeIcon icon={faRegularBell} className="input-icon" />
            <input
              type="password"
              name="password2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <p className="input-response">{message}</p>
          <a href="login">Revenir à la page de connexion</a>
          <input
            type="submit"
            name="submitLogin"
            value="Changer de mot de passe"
            className="submitLogin"
            onClick={handleSubmit}
            required
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
