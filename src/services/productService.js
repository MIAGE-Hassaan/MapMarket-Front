import axios from "axios";
import { getToken, logoutUser } from "./authService";

const API_BASE_URL = "http://mapmarketapi.test/api";

// ✅ Fonction pour obtenir les headers avec le token
const getAuthHeaders = () => {
    const token = getToken();
    console.log("🔑 Token utilisé dans l'API :", token);
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

// ✅ Gestion des erreurs API
const handleApiError = (error) => {
    if (error.response) {
        console.error(`❌ Erreur API (${error.response.status}):`, error.response.data);
        if (error.response.status === 401) {
            alert("Votre session a expiré. Veuillez vous reconnecter.");
            logoutUser(); // Déconnexion et suppression du token
        }
    } else {
        console.error("❌ Erreur réseau :", error.message);
    }
    throw error; // Relance l'erreur pour la capturer côté frontend
};

// ✅ Récupérer les produits
export const fetchProducts = async () => {
    console.log("fetchProducts appelé !")
    try {
        const response = await axios.get(`${API_BASE_URL}/produits`, getAuthHeaders());
        console.log("Produits reçus :", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// ✅ Ajouter un produit
export const addProduct = async (newProduct) => {
    try {
        // 🔹 Vérifier si le rayon existe
        const rayonResponse = await axios.get(`${API_BASE_URL}/rayons`, getAuthHeaders());
        const rayon = rayonResponse.data.find((r) => r.id.toString() === newProduct.rayon.toString());
        if (!rayon) throw new Error("Rayon introuvable.");

        // 🔹 Envoyer le produit avec le bon `rayon_uuid`
        const productData = { ...newProduct, rayon_uuid: rayon.uuid };
        const response = await axios.post(`${API_BASE_URL}/produits`, productData, getAuthHeaders());

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// ✅ Supprimer un produit
export const deleteProduct = async (ref) => {
    try {
        await axios.delete(`${API_BASE_URL}/produits/${ref}`, getAuthHeaders());
    } catch (error) {
        handleApiError(error);
    }
};
