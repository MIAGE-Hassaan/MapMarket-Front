import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = "http://mapmarketapi.test/api";
const TOKEN_KEY = "token";

// Sauvegarde du token selon la préférence "Se souvenir de moi"
export const saveToken = (token, remember) => {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token); // persistant
  } else {
    sessionStorage.setItem(TOKEN_KEY, token); // session uniquement
  }
};

// Récupération du token peu importe l'endroit
export const getToken = () =>
  localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

// Suppression du token des deux stockages
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

// Connexion utilisateur avec choix du stockage du token
export const loginUser = async (email, password, remember = false) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const token = response.data.token;

    if (!token) throw new Error("Token invalide ou manquant.");

    saveToken(token, remember);
    window.location.reload(); // Force le rafraîchissement de l’interface

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.response?.data || error.message);
    throw error;
  }
};

// Déconnexion avec suppression du token et rafraîchissement
export const logoutUser = async (navigate) => {
  try {
    const token = getToken();
    if (!token) throw new Error("Aucun token disponible pour la déconnexion.");

    await axios.post(
      `${API_URL}/logout?Accept=application/json`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    removeToken();
    navigate("/login");
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
  }
};

// Création d’un utilisateur
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error.response?.data || error.message);
    throw error;
  }
};

//Récupération de l'UUID d'un utilisateur
export const getUserUuidByEmail = async (email) => {
  try {
    const response = await axios.get(API_URL);
    const users = response.data;
    const user = users.find((u) => u.email === email);

    if (!user) throw new Error("Utilisateur non trouvé");

    return user.uuid;
  } catch (error) {
    throw error;
  }
};

// Affectation d’un mot de passe à un utilisateur via son UUID
export const setUserPassword = async (uuid, password) => {
  try {
    const response = await axios.post(`${API_URL}/${uuid}/password`, { password });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du mot de passe :", error.response?.data || error.message);
    throw error;
  }
};

// Informations utilisateur depuis le token
export const getUserInfo = () => {
  const token = getToken();
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

// Vérification de la validité du token
export const verifyTokenValidity = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      removeToken();
      return false;
    }

    return true;
  } catch (error) {
    removeToken();
    return false;
  }
};
