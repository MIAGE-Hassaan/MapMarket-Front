import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    responseData,
    handleSubmit,
    isLoading,
    rememberMe,
    setRememberMe
  } = useLogin();

  const navigate = useNavigate();

  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && isTokenValid(token)) {
      navigate("/map");
    }
  }, [navigate]);

  return (
    <div className="Login">
      <div className="log-title">
        <img src="../assets/image1.png" alt="logo" />
        <h1>MapMarket</h1>
      </div>

      <form className="log-form" onSubmit={(e) => handleSubmit(e, rememberMe)}>
        <div className="log-input">
          <img src="../assets/account-box-line.png" alt="email icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="log-input">
          <img src="../assets/lock-2-line.png" alt="password icon" />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <a href="forgotPassword">Mot de passe oublié ?</a>

        <div className="log-remember-checkbox">
          <input
            type="checkbox"
            name="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <p>Se souvenir de moi</p>
        </div>

        <input
          type="submit"
          value="Se connecter"
          className="log-submit"
          disabled={isLoading}
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
  );
}

export default Login;
