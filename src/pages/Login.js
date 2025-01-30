import "../styles/Login.css";

function Login() {
  return (
    <div className="Login">
      <header className="login-container">
       <h1>Accédez à votre compte</h1>
       <div className="login-form">
          <label for='e-mail'>Adresse mail</label>
          <input type='email' name='email' required/>
          <label for='password'>Mot de passe</label>
          <input type='password' name='password' required/>
          <input type='submit' name='submitLogin' className="submitLogin" required/>
       </div>
      </header>
    </div>
  );
}

export default Login;
