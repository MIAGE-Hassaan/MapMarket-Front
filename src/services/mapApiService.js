import axios from 'axios';

const BASE_URL = 'http://mapmarketapi.test/api';

export const fetchSecteurs = async (token) => {
  return axios.get(`${BASE_URL}/secteurs`, { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchRayons = async (token) => {
  return axios.get(`${BASE_URL}/rayons`, { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchProduits = async (token) => {
  return axios.get(`${BASE_URL}/produits`, { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchAlertes = async (token) => {
  return axios.get(`${BASE_URL}/alertes`, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateAlertStatus = async (token, alertUuid, statusSlug) => {
  return axios.put(
    `${BASE_URL}/alertes/${alertUuid}`,
    { statut_slug: statusSlug },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
