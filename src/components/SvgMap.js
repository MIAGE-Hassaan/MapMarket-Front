import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Map.css';

const SvgMap = () => {
  const [data, setData] = useState({ secteurs: [] });
  const [showModal, setShowModal] = useState(false);
  const [stockInfo, setStockInfo] = useState([]);
  const [error, setError] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Rediriger vers la page de connexion
        return;
      }

      fetchData(token);
    };

    const fetchData = async (token) => {
      try {
        const [secteursResponse, rayonsResponse, produitsResponse] = await Promise.all([
          axios.get('http://mapmarketapi.test/api/secteurs', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://mapmarketapi.test/api/rayons', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://mapmarketapi.test/api/produits', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const secteurs = secteursResponse.data.data || [];
        const rayons = rayonsResponse.data.data || [];
        const produits = produitsResponse.data.data || [];

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
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setError('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const saveAlerts = async () => {
      const newAlerts = [];

      data.secteurs.forEach(secteur => {
        secteur.rayons.forEach(rayon => {
          rayon.produits.forEach(produit => {
            if (produit.quantite <= produit.seuil) {
              newAlerts.push({
                quantite: produit.quantite,
                produit_ref: produit.ref,
                statut_slug: 'En attente'
              });
            }
          });
        });
      });

      if (newAlerts.length > 0) {
        console.log('Alertes à envoyer :', newAlerts); // Affiche les alertes avant l'envoi

        try {
          await axios.post('http://mapmarketapi.test/api/alertes', newAlerts, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          setAlerts(prevAlerts => [...prevAlerts, ...newAlerts]);
        } catch (error) {
          console.error('Erreur lors de l\'envoi des alertes :', error);
        }
      }
    };

    const intervalId = setInterval(saveAlerts, 300000);

    return () => clearInterval(intervalId);
  }, [data]);

  const handleCircleClick = (event, products) => {
    setStockInfo(products);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderRayonRectangles = (rayonIndex, productsPerRectangle) => {
    if (!data.secteurs[0]?.rayons[rayonIndex]) return null;

    return [...Array(3)].map((_, rectangleIndex) => {
      const rayon = data.secteurs[0].rayons[rayonIndex];
      const productsInRectangle = rayon.produits.slice(rectangleIndex * productsPerRectangle, (rectangleIndex + 1) * productsPerRectangle) || [];

      const transformMatrix = [
        { x: 518.492, y: 322.422 }, // Rayon 9
        { x: 770.492, y: 322.422 }, // Rayon 10
        { x: 692.492, y: 322.422 }, // Rayon 11
        { x: 770.492, y: 322.422 }, // Rayon 12
      ][rayonIndex];

      // Filtrer les produits en dessous du seuil
      const alertProducts = productsInRectangle.filter(product => product.quantite <= product.seuil);

      return (
        <g key={rectangleIndex}>
          <rect
            width={28.673}
            height={53.488}
            fill="#d2dbed"
            fillOpacity={productsInRectangle.length > 0 ? 1 : 0.5}
            rx={2}
            ry={2}
            transform={`matrix(1.4051 0 0 1 ${transformMatrix.x} ${transformMatrix.y - rectangleIndex * 75})`}
          />
          {alertProducts.length > 0 && (
            <circle
              cx={28.673 / 2}
              cy={53.488 / 2}
              r={7}
              fill="red"
              onClick={(e) => handleCircleClick(e, alertProducts)}
              style={{ cursor: 'pointer' }}
              transform={`matrix(1.4051 0 0 1 ${transformMatrix.x} ${transformMatrix.y - rectangleIndex * 75})`}
            />
          )}
        </g>
      );
    });
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
      >
        {/* Secteur Boisson */}
        <g transform="translate(902 53)">
          <text fill="#5800c5" fontSize={30} fontWeight={400} transform="translate(482.929 56.44)">
            Boisson
          </text>
          <rect
            width={682.012}
            height={560.962}
            fill="none"
            stroke="#5800c5"
            strokeWidth={2}
            rx={4}
            ry={4}
            transform="matrix(.54804 0 0 .6903 482.447 70.722)"
          />

          {/* Rayon 9 */}
          <g transform="rotate(-90 548.226 142.711)">
            <rect width={117.995} height={126.132} fill="#e4e4e4" rx={2} ry={2} transform="matrix(.34144 0 0 2.30019 518.492 119.277)" />
            <text fontSize={30} fontWeight={400} transform="rotate(90 203.24 324.146)">
              9
            </text>
            {renderRayonRectangles(0, 10)}
          </g>

          {/* Rayon 10 */}
          <g transform="rotate(-90 710.729 305.214)">
            <rect width={117.995} height={126.132} fill="#e4e4e4" rx={2} ry={2} transform="matrix(.34144 0 0 2.30019 770.193 119.277)" />
            <text fontSize={30} fontWeight={400} transform="rotate(90 328.906 450.183)">
              10
            </text>
            {renderRayonRectangles(1, 10)}
          </g>

          {/* Rayon 11 */}
          <g transform="rotate(-90 712.814 307.822)">
            <rect width={117.995} height={126.132} fill="#e4e4e4" rx={2} ry={2} transform="matrix(.34144 0 0 2.30019 692.193 119.277)" />
            <text fontSize={30} fontWeight={400} transform="rotate(90 289.293 411.093)">
              11
            </text>
            {renderRayonRectangles(2, 10)}
          </g>

          {/* Rayon 12 */}
          <g transform="rotate(-90 792.556 387.041)">
            <rect width={117.995} height={126.132} fill="#e4e4e4" rx={2} ry={2} transform="matrix(.34144 0 0 2.30019 770.193 119.277)" />
            <text fontSize={30} fontWeight={400} transform="rotate(90 328.906 450.183)">
              12
            </text>
            {renderRayonRectangles(3, 10)}
          </g>
        </g>
      </svg>

      {showModal && (
        <div className="fenetre-alerte">
          <h4>Produits en dessous du seuil limite</h4>
          <div className='produit-alerte'>
            {stockInfo.map((product, index) => (
              <div className="produit" key={index}>
                <p>{product.libelle}</p>
                <p>{product.quantite} / {product.seuil}</p>
                <a href={`/addTask/${product.uuid}`}>Faire</a>
              </div>
            ))}
          </div>
          <span className="bouton-fermeture" onClick={closeModal}>&times;</span>
        </div>
      )}
    </>
  );
};

export default SvgMap;
