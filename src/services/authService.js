import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://mapmarketapi.test/api";
const TOKEN_KEY = "token";

// --- Token helpers ---

export const saveToken = (token, remember) => {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = () =>
  localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

// --- Authentification ---

export const loginUser = async (email, password, remember = false) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const token = response.data.token;

    if (!token) throw new Error("Token invalide ou manquant.");

    saveToken(token, remember);

    setTimeout(() => {
      window.location.reload();
    }, 5000);

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async (navigate) => {
  try {
    const token = getToken();
    if (!token) throw new Error("Aucun token disponible pour la déconnexion.");

    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    removeToken();
    sessionStorage.removeItem("isManager");
    navigate("/login");
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
  }
};


export const registerUser = async (userData) => {
  try {
    const token = getToken(); // récupère le token de l'utilisateur connecté
    if (!token) throw new Error("Token manquant. Connectez-vous.");

    const response = await axios.post(`${API_URL}/users-basics`, userData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'utilisateur :",
      error.response?.data || error.message
    );
    throw error;
  }
};


// --- Token Info / Validation ---

export const getUserInfo = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return {
      nom: decodedToken.user.nom,
      prenom: decodedToken.user.prenom,
      email: decodedToken.user.email,
      uuid: decodedToken.user.uuid,
    };
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

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

// --- Rôle utilisateur ---

export const getUserRole = async (uuid) => {
  try {
    const token = getToken();
    if (!token) throw new Error("Token manquant pour la récupération du rôle.");

    const response = await axios.get(`${API_URL}/users-roles/user/${uuid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const roleLibelle = response?.data?.data?.[0]?.role?.libelle?.toLowerCase();
    const isManager = roleLibelle === "manager";

    sessionStorage.setItem("isManager", JSON.stringify(isManager));

    return isManager;
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle :", error.response?.data || error.message);
    throw error;
  }
};
