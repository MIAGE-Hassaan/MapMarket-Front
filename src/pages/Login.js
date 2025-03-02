import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser as faRegularUser,
  faBell as faRegularBell
} from "@fortawesome/free-regular-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem("token");
    if (token) {
      // Rediriger vers la page /user si le token est présent
      navigate("/user");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Réinitialiser le message d'erreur à chaque tentative
    try {
      const response = await axios.post("http://mapmarketapi.test/api/login", {
        email,
        password,
      });
      // Sauvegarder le token dans le localStorage
      localStorage.setItem("token", response.data.token);

      // Rediriger l'utilisateur vers la page /user après une connexion réussie
      navigate("/user");
    } catch (error) {
      setError("Erreur de connexion. Veuillez vérifier vos informations.");
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <div className="title">
          <img src="../assets/image1.png" alt="logo" />
          <h1>MapMarket</h1>
        </div>
        <h2>Accédez à votre compte</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <label htmlFor="password">Mot de passe</label>
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
          <a href="forgotPassword">Mot de passe oublié ?</a>
          <div className="remember-display">
            <input type="checkbox" name="remember" />
            <p>Se souvenir de moi</p>
          </div>
          <input
            type="submit"
            name="submitLogin"
            value="Se connecter"
            className="submitLogin"
            required
          />
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
