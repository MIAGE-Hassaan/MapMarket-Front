import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, getUserUuidByEmail, setUserPassword } from "../services/authService";

const useRegister = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Gestion des changements de champs
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { nom, prenom, email, password } = formData;

            // 1. Créer l'utilisateur (hors mot de passe)
            await registerUser({ nom, prenom, email, password });

            // 2. Récupérer l'UUID via l'email
            const uuid = await getUserUuidByEmail(email);

            // 3. Associer le mot de passe
            await setUserPassword(uuid, password);

            alert("Compte créé avec succès !");
            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Une erreur est survenue lors de la création du compte."
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
};

export default useRegister;