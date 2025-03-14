import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = "http://mapmarketapi.test/api";
const TOKEN_KEY = "token";

// Fonction pour récupérer le token de manière sécurisée
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

// ✅ Connexion utilisateur avec gestion des erreurs
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const token = response.data.token;

        if (!token) throw new Error("Token invalide ou manquant.");

        sessionStorage.setItem(TOKEN_KEY, token); // 🔒 Utilisation de sessionStorage au lieu de localStorage
        console.log("✅ Token reçu et stocké :", token);

        return response.data;
    } catch (error) {
        console.error("❌ Erreur lors de la connexion :", error.response?.data || error.message);
        throw error; // Relancer l'erreur pour la capturer côté frontend
    }
};

// ✅ Déconnexion avec gestion des erreurs et suppression sécurisée du token
export const logoutUser = async (navigate) => {
    try {
        const token = getToken();
        if (!token) throw new Error("Aucun token disponible pour la déconnexion.");

        console.log("🔑 Token utilisé pour la déconnexion :", token);

        await axios.post(`${API_URL}/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        sessionStorage.removeItem(TOKEN_KEY); // 🔒 Suppression sécurisée
        navigate("/login");
    } catch (error) {
        console.error("❌ Erreur lors de la déconnexion :", error.response?.data || error.message);
    }
};

// ✅ Récupération des infos utilisateur avec vérification d'expiration
export const getUserInfo = () => {
    const token = getToken();
    if (!token) {
        console.warn("⚠️ Aucun token trouvé.");
        return null;
    }

    try {
        const decodedToken = jwtDecode(token);
        console.log("🔍 Token décodé :", decodedToken);

        // ✅ Vérification si le token est expiré
        const now = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < now) {
            console.warn("⚠️ Le token a expiré !");
            sessionStorage.removeItem(TOKEN_KEY);
            return null;
        }

        return { nom: decodedToken.nom, prenom: decodedToken.prenom };
    } catch (error) {
        console.error("❌ Erreur lors du décodage du token :", error.message);
        return null;
    }
};
