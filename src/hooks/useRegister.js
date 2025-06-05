import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    registerUser,
    getUserUuidByEmail,
    setUserPassword,
} from "../services/authService";

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

            // Étape 1 : Créer l'utilisateur
            await registerUser({ nom, prenom, email });

            // Étape 2 : Récupérer son UUID
            const uuid = await getUserUuidByEmail(email);

            // Étape 3 : Définir son mot de passe
            await setUserPassword(uuid, password);

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
