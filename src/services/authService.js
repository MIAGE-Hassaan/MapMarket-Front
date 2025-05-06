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

    // Attendre 5 secondes avant de recharger la page
    setTimeout(() => {
      window.location.reload();
    }, 50000);

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
    sessionStorage.removeItem("isManager"); // Suppression de isManager
    navigate("/login");
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
  }
};


// Création d’un utilisateur
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users-basics`, userData); // Mise à jour ici
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error.response?.data || error.message);
    throw error;
  }
};

//Récupération de l'UUID d'un utilisateur
export const getUserUuidByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/users-basics`); // Mise à jour ici
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
    const response = await axios.post(`${API_URL}/users-basics/${uuid}`, { password }); // Mise à jour ici
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
      console.log("Contenu du token décodé :", decodedToken);

      // Assure-toi que la structure du token correspond à ce que tu attends
      return {
        nom: decodedToken.user.nom, // "user" est la clé qui contient les infos utilisateur dans le token
        prenom: decodedToken.user.prenom,
        email: decodedToken.user.email,
        uuid: decodedToken.user.uuid,
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

    // Vérification de l'expiration du token
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

// Vérification du role user pour vérifier s'il est manager ou non
export const getUserRole = async (uuid) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/users-roles/user/${uuid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const roleLibelle = response?.data?.data?.[0]?.role?.libelle?.toLowerCase();
    const isManager = roleLibelle === "manager";

    sessionStorage.setItem("isManager", JSON.stringify(isManager)); // Stockage sous forme de booléen

    return isManager;
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle :", error.response?.data || error.message);
    console.log(uuid);
    throw error;
  }
};
