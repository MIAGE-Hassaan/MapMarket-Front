import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser as faRegularUser,
  faBell as faRegularBell

} from "@fortawesome/free-regular-svg-icons";

function Login() {
  return (
    <div className="Login">
      <div className="login-container">
        <div className="title">
          <img src="../assets/image1.png" alt="logo"/>
          <h1>MapMarket</h1>
        </div>
        <h2>Accédez à votre compte</h2>
        <div className="login-form">
        <label for='e-mail'>Email</label>
          <div className="input-display">
            <FontAwesomeIcon icon={faRegularUser} className="input-icon"/>
            <input type='email' name='email' required/>
          </div>
          <label for='password'>Mot de passe</label>
          <div className="input-display">
            <FontAwesomeIcon icon={faRegularBell} className="input-icon"/>
            <input type='password' name='password' required/>
          </div>
          <a href="forgotPassword">Mot de passe oublié ?</a>
          <div className="remember-display">
            <input type='checkBox' name='remember'/>
            <p>Se souvenir de moi</p>
          </div>
          <input type='submit' name='submitLogin' value="Se connecter" className="submitLogin" required/>
        </div>
      </div>
    </div>
  );
}

export default Login;
