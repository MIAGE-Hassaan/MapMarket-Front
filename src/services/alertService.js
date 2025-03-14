import axios from "axios";

const API_BASE_URL = "http://mapmarketapi.test/api";

export const fetchAlerts = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const [alertsResponse, rayonsResponse, secteursResponse, produitsResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/alertes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${API_BASE_URL}/rayons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${API_BASE_URL}/secteurs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${API_BASE_URL}/produits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const alerts = alertsResponse.data.data || [];
    const rayons = rayonsResponse.data.data || [];
    const secteurs = secteursResponse.data.data || [];
    const produits = produitsResponse.data.data || [];

    const alertsWithDetails = alerts.map((alert) => {
      const produit = produits.find((p) => p.uuid === alert.produit.uuid);
      const rayon = rayons.find((r) => r.id === produit?.rayon_id);
      const secteur = secteurs.find((s) => s.id === rayon?.secteur_id);

      return {
        ...alert,
        rayon: rayon?.libelle || "Inconnu",
        secteur: secteur?.libelle || "Inconnu",
        produit: produit?.libelle || "Inconnu",
        reference: produit?.ref || "Inconnu",
        capacite: produit?.capacite || "Inconnu",
      };
    });

    return alertsWithDetails;
  } catch (error) {
    throw error;
  }
};

export const updateAlertStatus = async (token, alertUuid, statusSlug) => {
  return axios.put(
    `${API_BASE_URL}/alertes/${alertUuid}`,
    { statut_slug: statusSlug },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
