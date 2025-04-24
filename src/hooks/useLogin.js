import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, verifyTokenValidity } from "../services/authService";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event, remember) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await loginUser(email, password, remember);
      setResponseData(data);

      if (verifyTokenValidity()) {
        navigate("/map");
      } else {
        throw new Error("Token invalide ou expiré après login.");
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez vérifier vos informations.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    responseData,
    handleSubmit,
    isLoading,
  };
};

export default useLogin;
