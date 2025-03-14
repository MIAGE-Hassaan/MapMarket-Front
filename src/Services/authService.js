import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const loginUser = async (email, password) => {
    const response = await axios.post("http://mapmarketapi.test/api/login", {
        email,
        password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    console.log("Token reçu et stocké :", token); // Log du token reçu
    return response.data;
};

export const logoutUser = async (navigate) => {
    try {
        const token = localStorage.getItem("token");
        console.log("Token utilisé pour la déconnexion :", token); // Log du token utilisé
        await axios.post(
            "http://mapmarketapi.test/api/logout?Accept=application/json",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        localStorage.removeItem("token");
        navigate("/login");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    }
};

export const getUserInfo = () => {
    const token = localStorage.getItem("token");
    console.log("Token récupéré pour décodage :", token); // Log du token récupéré
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log("Token décodé :", decodedToken); // Log du token décodé
            return {
                nom: decodedToken.nom,
                prenom: decodedToken.prenom,
            };
        } catch (error) {
            console.error("Erreur lors du décodage du token :", error);
            return null;
        }
    }
    return null;
};
