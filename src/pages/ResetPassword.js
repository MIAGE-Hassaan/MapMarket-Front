import "../styles/ResetPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faBell as faRegularBell
} from "@fortawesome/free-regular-svg-icons";

function ResetPassword() {
  return (
    <div className="ForgotPassword">
      <header className="recovery-container">
        <div className="title">
          <img src="../assets/image1.png" alt="logo"/>
          <h1>MapMarket</h1>
        </div>
        <h2>Modification du mot de passe</h2>
        <div className="recovery-form">
            <label for='password'>Nouveau mot de passe</label>
            <div className="input-display">
                <FontAwesomeIcon icon={faRegularBell} className="input-icon"/>
                <input type='password' name='password' required/>
            </div>

            <label for='password2'>Confirmation du mot de passe</label>
            <div className="input-display">
                <FontAwesomeIcon icon={faRegularBell} className="input-icon"/>
                <input type='password' name='password2' required/>
            </div>
            <p className="input-response">Mot de passe modifié</p>
            <a href="login">Revenir à la page de connexion</a>
            <input type='submit' name='submitLogin' value="Changer de mot de passe" className="submitLogin" required/>
        </div>
      </header>
    </div>
  );
}

export default ResetPassword;
