import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function useRegister() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { nom, prenom, email, password } = formData;

            // Appel unique à l'API d'inscription
            await registerUser({ nom, prenom, email, password });

            alert("Compte créé avec succès !");
            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Erreur lors de la création du compte."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        error,
        isLoading,
    };
}
