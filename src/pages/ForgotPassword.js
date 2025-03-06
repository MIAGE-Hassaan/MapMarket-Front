import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faRegularUser } from "@fortawesome/free-regular-svg-icons";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi d'un e-mail
    setMessage(`Un e-mail de réinitialisation a été envoyé à ${email}`);
    // Rediriger vers la page de réinitialisation après un délai
    setTimeout(() => {
      window.location.href = "/resetPassword";
    }, 3000);
  };

  return (
    <div className="ForgotPassword">
      <div className="recovery-container">
        <div className="title">
          <img src="../assets/image1.png" alt="logo" />
          <h1>MapMarket</h1>
        </div>
        <h2>Mot de passe oublié ?</h2>
        <div className="recovery-form">
          <label htmlFor="email">Email</label>
          <div className="input-display">
            <FontAwesomeIcon icon={faRegularUser} className="input-icon" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <a href="login">Revenir à la page de connexion</a>
          <input
            type="submit"
            name="submitLogin"
            value="Envoyer l'email de vérification"
            className="submitLogin"
            onClick={handleSubmit}
            required
          />
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
