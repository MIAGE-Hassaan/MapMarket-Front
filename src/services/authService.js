import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = "http://mapmarketapi.test/api";
const TOKEN_KEY = "token";

// Fonction pour récupérer le token de manière sécurisée
export const getToken = () => localStorage.getItem(TOKEN_KEY);

// Connexion utilisateur avec gestion des erreurs
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const token = response.data.token;

        if (!token) throw new Error("Token invalide ou manquant.");

        localStorage.setItem(TOKEN_KEY, token);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.response?.data || error.message);
        throw error;
    }
};

// Déconnexion avec gestion des erreurs et suppression sécurisée du token
export const logoutUser = async (navigate) => {
    try {
        const token = getToken();
        if (!token) throw new Error("Aucun token disponible pour la déconnexion.");

        console.log("Token utilisé pour la déconnexion :", token);

        await axios.post(`${API_URL}/logout?Accept=application/json`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        localStorage.removeItem(TOKEN_KEY);
        navigate("/login");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
    }
};

// Créer un utilisateur (nom, prénom, email)
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data; // Retourne les données utilisateur
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error.response?.data || error.message);
        throw error;
    }
};

// Récupérer l'UUID de l'utilisateur en recherchant par email
export const getUserUuidByEmail = async (email) => {
    try {
        const response = await axios.get(API_URL);
        const users = response.data; // Liste des utilisateurs
        const user = users.find((u) => u.email === email);

        if (!user) throw new Error("Utilisateur non trouvé");

        return user.uuid; // Retourne l'UUID
    } catch (error) {
        console.error("Erreur lors de la récupération de l'UUID :", error.response?.data || error.message);
        throw error;
    }
};

// Envoyer le mot de passe une fois l'UUID récupéré
export const setUserPassword = async (uuid, password) => {
    try {
        const response = await axios.post(`${API_URL}/${uuid}/password`, { password });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout du mot de passe :", error.response?.data || error.message);
        throw error;
    }
};

export const getUserInfo = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return {
          nom: decodedToken.user.nom,
          prenom: decodedToken.user.prenom,
        };
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return null;
      }
    }
    return null;
};
