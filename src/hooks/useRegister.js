import { useState } from "react";
import { registerUser, getUserUuidByEmail, setUserPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

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

    // ✅ Gestion du changement des inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // ➤ Étape 1 : Création de l'utilisateur
            await registerUser({
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
            });

            // ➤ Étape 2 : Récupérer l'UUID de l'utilisateur
            const uuid = await getUserUuidByEmail(formData.email);

            // ➤ Étape 3 : Définir le mot de passe
            await setUserPassword(uuid, formData.password);

            navigate("/login"); // Redirection vers la connexion
        } catch (err) {
            setError("Erreur lors de l'inscription. Veuillez réessayer.");
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
