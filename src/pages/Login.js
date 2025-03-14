import React from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faRegularUser, faBell as faRegularBell } from "@fortawesome/free-regular-svg-icons";

function Login() {
  const { email, setEmail, password, setPassword, error, responseData, handleSubmit, isLoading } = useLogin();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user");
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
