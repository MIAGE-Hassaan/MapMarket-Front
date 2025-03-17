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

    // Enrich alerts with details from rayons, secteurs, and produits
    const alertsWithDetails = alerts.map((alert) => {
      const rayon = rayons.find((r) => r.id === alert.rayon_id);
      const secteur = secteurs.find((s) => s.id === rayon?.secteur_id);
      const produit = produits.find((p) => p.id === alert.produit_id);

      return {
        ...alert,
        rayon: rayon?.libelle || "Inconnu",
        secteur: secteur?.libelle || "Inconnu",
        produit: produit?.libelle || "Inconnu",
      };
    });

    return alertsWithDetails;
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes :", error);
    throw error;
  }
};
