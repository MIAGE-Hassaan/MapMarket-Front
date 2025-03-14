import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const loginUser = async (email, password) => {
  const response = await axios.post("http://mapmarketapi.test/api/login", {
    email,
    password,
  });
  const token = response.data.token;
  localStorage.setItem("token", token);
  return response.data;
};

export const logoutUser = async (navigate) => {
  try {
    const token = localStorage.getItem("token");
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
