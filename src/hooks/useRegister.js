import { useState } from "react";
import { registerUser, setUserPassword, getUserUuidByEmail } from "../services/authService";

const useRegister = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            // 1. Créer l'utilisateur (hors mot de passe)
            const { nom, prenom, email, password } = formData;
            await registerUser({ nom, prenom, email });

            // 2. Récupérer l'UUID par l'email
            const uuid = await getUserUuidByEmail(email);

            // 3. Associer le mot de passe
            await setUserPassword(uuid, password);

            // Tu peux rediriger ou notifier ici
            alert("Compte créé avec succès !");
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
