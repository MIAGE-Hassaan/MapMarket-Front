import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { jwtDecode } from "jwt-decode"; // Assurez-vous que vous avez installé jwt-decode
import "../styles/Login.css";

function Login() {
  const { email, setEmail, password, setPassword, error, responseData, handleSubmit, isLoading } = useLogin();
  const navigate = useNavigate();

  // Fonction pour vérifier la validité du token
  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      // Vérifie si le token est expiré (token.exp est en secondes, donc *1000 pour comparer avec Date.now())
      return decodedToken.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Si un token est trouvé et valide, rediriger vers la page utilisateur
    if (token && isTokenValid(token)) {
      navigate("/map");
    }
  }, [navigate]);

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
            <img src="../assets/account-box-line.png" alt="email icon"/>
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
            <img src="../assets/lock-2-line.png" alt="password icon"/>
            
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
            disabled={isLoading}
            required
          />
          {error && <p className="error">{error}</p>}
          {responseData && (
            <div className="response-data">
              <h3>Réponse de la requête de connexion :</h3>
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
