import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const data = await loginUser(email, password);
            setResponseData(data);
            navigate("/map");
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
        error,
        responseData,
        handleSubmit,
        isLoading,
    };
};

export default useLogin;
