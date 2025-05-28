import { useState } from "react";
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
            // Étape 1 : Créer l'utilisateur de base
            await registerUser({
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
            });

            // Étape 2 : Récupérer son UUID
            const uuid = await getUserUuidByEmail(formData.email);

            // Étape 3 : Définir son mot de passe
            await setUserPassword(uuid, formData.password);

            alert("Compte créé avec succès !");
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
