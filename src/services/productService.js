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




export const addProduct = async (newProduct) => {
    try {
        // 🔹 Récupérer la liste des rayons
        const rayonResponse = await axios.get(`${API_BASE_URL}/rayons`, getAuthHeaders());
        console.log("Réponse API des rayons:", rayonResponse.data); // Log de la réponse complète

        // 🔹 Vérifier si la réponse contient bien un tableau de rayons
        const rayons = rayonResponse.data.data; // Accès correct au tableau de rayons
        if (!Array.isArray(rayons)) {
            throw new Error("Les rayons ne sont pas dans un tableau.");
        }

        // 🔹 Chercher le rayon correspondant au libellé
        const rayon = rayons.find((r) => r.libelle.toLowerCase() === newProduct.rayon.toLowerCase());

        // 🔹 Si le rayon n'existe pas, lancer une erreur
        if (!rayon) {
            throw new Error("Rayon introuvable. Veuillez vérifier le libellé du rayon.");
        }

        // 🔹 Envoyer le produit avec le bon `rayon_uuid`
        const productData = { ...newProduct, rayon_uuid: rayon.uuid };
        const response = await axios.post(`${API_BASE_URL}/produits`, productData, getAuthHeaders());

        return response.data; // Retourner le produit créé
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit:", error); // Log de l'erreur
        handleApiError(error); // Gestion des erreurs API
        throw error; // Relancer l'erreur pour gestion en amont
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
