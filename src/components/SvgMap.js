import React, { useState } from 'react';
import useMapData from '../hooks/useMapData';
import { updateAlertStatus } from '../services/mapApiService';
import '../styles/Map.css';

const SvgMap = () => {
  const { data, alerts, error } = useMapData();
  const [showModal, setShowModal] = useState(false);
  const [stockInfo, setStockInfo] = useState([]);

  const handleCircleClick = (event, products) => {
    setStockInfo(products);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateTaskStatus = async (productUuid) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const alert = alerts.find(alert => alert.produit?.uuid === productUuid);
      if (alert && alert.statut.slug === "nouveau") {
        await updateAlertStatus(token, alert.uuid, 'en-cours');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
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

      const alertProducts = productsInRectangle.filter(product =>
        alerts.some(alert => alert.produit?.uuid === product.uuid)
      );

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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
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
          <g transform="rotate(-90 548.226 142.711)">
            <rect width={117.995} height={126.132} fill="#e4e4e4" rx={2} ry={2} transform="matrix(.34144 0 0 2.30019 518.492 119.277)" />
            <text fontSize={30} fontWeight={400} transform="rotate(90 203.24 324.146)">
              9
            </text>
            {renderRayonRectangles(0, 10)}
          </g>
          <g transform="rotate(-90 710.729 305.214)">
            <rect width={117.995} height={126.132} fill="#e4e4e4" rx={2} ry={2} transform="matrix(.34144 0 0 2.30019 770.193 119.277)" />
            <text fontSize={30} fontWeight={400} transform="rotate(90 328.906 450.183)">
              10
            </text>
            {renderRayonRectangles(1, 10)}
          </g>
          <g transform="rotate(-90 712.814 307.822)">
            <rect width={117.995} height={126.132} fill="#e4e4e4" rx={2} ry={2} transform="matrix(.34144 0 0 2.30019 692.193 119.277)" />
            <text fontSize={30} fontWeight={400} transform="rotate(90 289.293 411.093)">
              11
            </text>
            {renderRayonRectangles(2, 10)}
          </g>
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
          <h4>Produits liés aux alertes</h4>
          <div className='produit-alerte'>
            {stockInfo.map((product, index) => (
              <div className="produit" key={index}>
                <p>{product.libelle}</p>
                <p>{product.quantite} / {product.seuil}</p>
                <button onClick={() => updateTaskStatus(product.uuid)}>Faire</button>
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
