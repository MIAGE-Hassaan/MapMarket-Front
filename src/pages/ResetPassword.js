import React, { useState } from "react";
import "../styles/ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = new URLSearchParams(window.location.search).get('email');
    const token = new URLSearchParams(window.location.search).get('token');

    if (password === confirmPassword) {
      try {
        const response = await fetch(`/api/users-basics/${email}/password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, password }),
        });

        if (response.ok) {
          setMessage("Mot de passe modifié avec succès");
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          const data = await response.json();
          setMessage(data.message || "Erreur lors de la réinitialisation du mot de passe.");
        }
      } catch (error) {
        setMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
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
          <img src="../assets/lock-password-line.png" alt="password icon"/>
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
            <img src="../assets/lock-2-line.png" alt="password icon"/>
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
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
