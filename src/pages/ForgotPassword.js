import React, { useState } from "react";
import axios from "axios";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/request-reset", { email });
      setMessage(response.data.message || "Email de réinitialisation envoyé !");
    } catch (error) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Erreur lors de l'envoi de l'email de réinitialisation :", error);
    }
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
          <img src="../assets/account-box-line.png" alt="email icon"/>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <a href="login">Revenir à la page de connexion</a>
          <input
            type="submit"
            name="submitLogin"
            value="Envoyer l'email de vérification"
            className="submitLogin"
            onClick={handleSubmit}
          />
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
