import axios from 'axios';
const API_URL = "http://mapmarketapi.test/api";

// Fonction de connexion
async function loginUser(email, password) {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token) {
            throw new Error("Aucun token reçu");
        }

        localStorage.setItem("token", token);
        console.log("Token reçu :", token);
        return response.data;
    } catch (error) {
        console.error("Erreur de connexion :", error.response ? error.response.data : error.message);
    }
}

// Récupérer tous les utilisateurs
async function getAllUsers() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        console.error("Aucun token trouvé !");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/users-basics`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        return [];
    }
}

// Supprimer un utilisateur
async function deleteUser(id) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        console.error("Aucun token trouvé !");
        return;
    }
    try {
        await axios.delete(`${API_URL}/users-basics/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(`Utilisateur avec ID ${id} supprimé.`);
    } catch (error) {
        console.error("Erreur lors de la suppression :", error.response ? error.response.data : error.message);
    }
}

export default { loginUser, getAllUsers, deleteUser };