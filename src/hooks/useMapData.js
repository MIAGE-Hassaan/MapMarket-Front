import { useEffect, useState } from 'react';
import { fetchSecteurs, fetchRayons, fetchProduits, fetchAlertes } from '../services/mapApiService';

const useMapData = () => {
  const [data, setData] = useState({ secteurs: [] });
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const [secteursResponse, rayonsResponse, produitsResponse, alertsResponse] = await Promise.all([
          fetchSecteurs(token),
          fetchRayons(token),
          fetchProduits(token),
          fetchAlertes(token),
        ]);

        const secteurs = secteursResponse.data.data || [];
        const rayons = rayonsResponse.data.data || [];
        const produits = produitsResponse.data.data || [];
        const alerts = alertsResponse.data.data || [];

        const sortedRayons = rayons.sort((a, b) => {
          const numA = parseInt(a.uuid.replace(/[^0-9]/g, ''), 10);
          const numB = parseInt(b.uuid.replace(/[^0-9]/g, ''), 10);
          return numB - numA;
        });

        const secteursWithDetails = secteurs.map(secteur => {
          const secteurRayons = sortedRayons.filter(rayon => rayon.secteur?.uuid === secteur.uuid);
          const secteurRayonsWithProduits = secteurRayons.map(rayon => {
            const rayonProduits = produits.filter(produit => produit.rayon?.uuid === rayon.uuid);
            return { ...rayon, produits: rayonProduits };
          });
          return { ...secteur, rayons: secteurRayonsWithProduits };
        });

        setData({ secteurs: secteursWithDetails });
        setAlerts(alerts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setError('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
      }
    };

    fetchData();
  }, []);

  return { data, alerts, error };
};

export default useMapData;
