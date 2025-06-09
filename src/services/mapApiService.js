import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'http://mapmarketapi.test/api';

const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

export const fetchSecteurs = async (token) =>
  axios.get(`${BASE_URL}/secteurs`, authHeader(token));

export const fetchRayons = async (token) =>
  axios.get(`${BASE_URL}/rayons`, authHeader(token));

export const fetchProduits = async (token) =>
  axios.get(`${BASE_URL}/produits`, authHeader(token));

export const fetchAlertes = async (token) =>
  axios.get(`${BASE_URL}/alertes`, authHeader(token));

export const updateAlertStatus = async (token, alertUuid, statusSlug) => {
  try {
    const decoded = jwtDecode(token); // decode le token JWT
    const userUuid = decoded.user?.uuid;

    if (!userUuid) {
      throw new Error("UUID utilisateur introuvable dans le token.");
    }

    const response = await axios.put(
      `${BASE_URL}/alertes/${alertUuid}`,
      {
        statut_slug: statusSlug,
        user_uuid: userUuid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de l'alerte :", error.response?.data || error.message);
    throw error;
  }
};
