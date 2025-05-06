import axios from 'axios';
const API_URL = "http://mapmarketapi.test/api";



async function getAllEmployee() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        console.error("Aucun token trouvé !");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/users-basics`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const employees = response.data.data;
        return employees.length;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        return 0;
    }
}




async function getAlertesWeekly() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        console.error("Aucun token trouvé !");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/stats/alertes-week`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        return 0;
    }
}









export default { getAllEmployee, getAlertesWeekly };