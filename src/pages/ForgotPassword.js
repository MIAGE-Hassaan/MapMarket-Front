import "../styles/ForgotPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser as faRegularUser
} from "@fortawesome/free-regular-svg-icons";

function ForgotPassword() {
  return (
    <div className="ForgotPassword">
      <header className="recovery-container">
        <div className="title">
          <img src="../assets/image1.png" alt="logo"/>
          <h1>MapMarket</h1>
        </div>
        <h2>Mot de passe oublié ?</h2>
        <div className="recovery-form">
        <label for='e-mail'>Email</label>
          <div className="input-display">
            <FontAwesomeIcon icon={faRegularUser} className="input-icon"/>
            <input type='email' name='email' required/>
          </div>
          <a href="login">Revenir à la page de connexion</a>
          <input type='submit' name='submitLogin' value="Envoyer l'email de vérification" className="submitLogin" required/>
        </div>
      </header>
    </div>
  );
}

export default ForgotPassword;
