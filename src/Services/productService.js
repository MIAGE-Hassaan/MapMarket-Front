import axios from "axios";
import { getToken, logout } from "./authService";

const API_BASE_URL = "http://mapmarketapi.test/api";

const getAuthHeaders = () => {
    const token = getToken();
    if (!token) {
        throw new Error("Token manquant. Veuillez vous reconnecter.");
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};

// Gestion des erreurs et redirection si token invalide
const handleApiError = (error) => {
    if (error.response?.status === 401) {
        alert("Votre session a expiré. Veuillez vous reconnecter.");
        logout(); // Déconnexion et redirection
    }
    throw error;
};

// Récupérer les produits
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/produits`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Ajouter un produit
export const addProduct = async (newProduct) => {
    try {
        const rayonResponse = await axios.get(`${API_BASE_URL}/rayons`, getAuthHeaders());
        const rayon = rayonResponse.data.find((r) => r.id === newProduct.rayon);
        if (!rayon) throw new Error("Rayon introuvable");

        const productData = { ...newProduct, rayon_uuid: rayon.uuid };

        const response = await axios.post(`${API_BASE_URL}/produits`, productData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Supprimer un produit
export const deleteProduct = async (ref) => {
    try {
        await axios.delete(`${API_BASE_URL}/produits/${ref}`, getAuthHeaders());
    } catch (error) {
        handleApiError(error);
    }
};
