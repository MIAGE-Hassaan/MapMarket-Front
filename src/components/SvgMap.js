import React, { useState, useEffect, useRef } from 'react';
import { fetchAlertes, updateAlertStatus } from '../services/mapApiService';
import '../styles/Map.css';

const SvgMap = () => {
  const [alertsWithDetails, setAlertsWithDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stockInfo, setStockInfo] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage
        if (!token) {
          console.error('Token non trouvé');
          return;
        }

        // Récupérer les données de l'API
        const alertesResponse = await fetchAlertes(token);
        const alerts = alertesResponse.data.data || [];

        // Mapper les alertes avec les détails associés tout en conservant l'accès à alert.statut
        const alertsWithDetails = alerts.map((alert) => {
          const produit = alert.produit;
          const rayon = alert.produit.rayon;
          const secteur = alert.produit.rayon.secteur;
          return { alert, produit, rayon, secteur };
        }).filter(detail => detail.produit && detail.rayon && detail.secteur);

        setAlertsWithDetails(alertsWithDetails);

      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

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
      const alert = alertsWithDetails.find(alert => alert.produit.uuid === productUuid);
      if (alert) {
        const newStatus = alert.alert.statut.slug === "nouveau" ? 'en-cours' : 'fait';
        await updateAlertStatus(token, alert.alert.uuid, newStatus);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
     <svg id="map" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  ref={svgRef} viewBox="0 0 1920 1080" shapeRendering="geometricPrecision" textRendering="geometricPrecision" project_id="c6c38a66b99748c8bd9a2366b2ebeffa" export_id="ac1627c9b4d444ac83e1de455905bd54" cached="true">
      <g id="map-u-accueil-et-livre" transform="translate(893.426796 566.152129)">
        <rect id="map-u-section-1" width="682.012028" height="560.962274" rx="4" ry="4" transform="matrix(1.144053 0 0 0.690309 51.278491 70.721905)" paintOrder="stroke fill markers" fill="none" stroke="#ce6700" strokeWidth="2"/>
        <g id="map-u-rack-25" transform="translate(384.757792-12.816415)">
          <rect id="map-u-rack-252" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 355.351704 132.157288)" fill="#e4e4e4"/>
          <text id="map-u-rack-253" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(356.917745 170.664523)" strokeWidth="0">
            <tspan id="map-s-tspan1" y="0" fontWeight="400" strokeWidth="0">25</tspan>
          </text>
          <rect id="map-u-shelf-25-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 355.35169 323.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-25-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 355.35169 260.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-25-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 355.35169 198.727525)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-24" transform="matrix(0 1-1 0 712.413297 147.476829)">
          <rect id="map-u-rack-242" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(-0.241436 0.241436-1.183689-1.183689 252.329004 348.028825)" fill="#e4e4e4"/>
          <text id="map-u-rack-243" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0-1 1 0 114.681186 244.369353)" strokeWidth="0">
            <tspan id="map-s-tspan2" y="0" fontWeight="400" strokeWidth="0">24</tspan>
            <tspan id="map-s-tspan3" x="0" y="60" fontWeight="400" strokeWidth="0"> </tspan>
          </text>
          <rect id="map-u-shelf-24-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 229.743988 325.677323)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-24-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 177.678354 273.378164)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-23" transform="matrix(0 1-1 0 716.409349 38.770673)">
          <rect id="map-u-rack-232" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(-0.241436 0.241436-1.183689-1.183689 252.329004 348.028825)" fill="#e4e4e4"/>
          <text id="map-u-rack-233" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0-1 1 0 114.681186 244.369353)" strokeWidth="0">
            <tspan id="map-s-tspan4" y="0" fontWeight="400" strokeWidth="0">23</tspan>
            <tspan id="map-s-tspan5" x="0" y="30" fontWeight="400" strokeWidth="0"> </tspan>
          </text>
          <rect id="map-u-shelf-23-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 229.743988 325.677323)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-23-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 177.678354 273.378164)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-22" transform="translate(21.435473 13.776587)">
          <rect id="map-u-rack-222" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(-0.241436 0.241436-1.183689-1.183689 252.329004 348.028825)" fill="#e4e4e4"/>
          <text id="map-u-rack-223" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(87.449581 238.795729)" strokeWidth="0">
            <tspan id="map-s-tspan6" y="0" fontWeight="400" strokeWidth="0">22</tspan>
          </text>
          <rect id="map-u-shelf-22-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 229.743988 325.677323)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-22-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 177.678354 273.378164)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-21" transform="translate(26.102173-92.045521)">
          <rect id="map-u-rack-212" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(-0.241436 0.241436-1.183689-1.183689 252.329004 348.028825)" fill="#e4e4e4"/>
          <text id="map-u-rack-213" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(87.449581 238.795729)" strokeWidth="0">
            <tspan id="map-s-tspan7" y="0" fontWeight="400" strokeWidth="0">21</tspan>
          </text>
          <rect id="map-u-shelf-21-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 229.743988 325.677323)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-21-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 177.678354 273.378164)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <text id="map-u-section-accueil-et-livres" dx="0" dy="0" fontFamily="&quot;map:::Roboto&quot;" fontSize="30" fontWeight="400" transform="translate(52.517731 56.036957)" fill="#ce6700" strokeWidth="0">
          <tspan id="map-s-tspan8" y="0" fontWeight="400" strokeWidth="0">Section accueil et livres</tspan>
          <tspan id="map-s-tspan9" x="0" y="30" fontWeight="400" strokeWidth="0"> </tspan>
        </text>
      </g>
      <g id="map-u-conserve" transform="translate(37 566.152208)">
        <rect id="map-u-section-6" width="682.012028" height="560.962274" rx="4" ry="4" transform="matrix(0.548042 0 0 0.690309 482.446589 70.721905)" paintOrder="stroke fill markers" fill="none" stroke="#d2c100" strokeWidth="2"/>
        <text id="map-u-section-conserve" dx="0" dy="0" fontFamily="&quot;map:::Roboto&quot;" fontSize="30" fontWeight="400" transform="translate(482.928858 56.439304)" fill="#d2c100" strokeWidth="0">
          <tspan id="map-s-tspan10" y="0" fontWeight="400" strokeWidth="0">Section conserve</tspan>
        </text>
        <g id="map-u-rack-20" transform="translate(150 163)">
          <rect id="map-u-rack-202" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(1.133201 0 0 1.075675 553.636381 119.340794)" fill="#e4e4e4"/>
          <text id="map-u-rack-203" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(558.780533 245.221872)" strokeWidth="0">
            <tspan id="map-s-tspan11" y="0" fontWeight="400" strokeWidth="0">20</tspan>
          </text>
          <rect id="map-u-shelf-20-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 640.636376 128.099604)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-20-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 559.636376 128.099604)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-19" transform="translate(150 0)">
          <rect id="map-u-rack-192" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(1.133201 0 0 1.075675 553.636381 119.340794)" fill="#e4e4e4"/>
          <text id="map-u-rack-193" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(558.780533 151.221872)" strokeWidth="0">
            <tspan id="map-s-tspan12" y="0" fontWeight="400" strokeWidth="0">19</tspan>
          </text>
          <rect id="map-u-shelf-19-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 640.636376 194.099604)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-19-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 559.636376 194.099604)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-18" transform="translate(63 0)">
          <rect id="map-u-rack-182" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 518.492205 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-183" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(520.480433 151.276486)" strokeWidth="0">
            <tspan id="map-s-tspan13" y="0" fontWeight="400" strokeWidth="0">18</tspan>
          </text>
          <rect id="map-u-shelf-18-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 322.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-18-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492205 257.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-18-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 192.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-17">
          <rect id="map-u-rack-172" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 518.492205 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-173" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(520.480433 151.276486)" strokeWidth="0">
            <tspan id="map-s-tspan14" y="0" fontWeight="400" strokeWidth="0">17</tspan>
          </text>
          <rect id="map-u-shelf-17-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 322.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-17-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492205 257.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-17-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 192.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
      </g>
      <g id="map-u-fruits-et-l-gumes" transform="translate(-394.247314 563.770918)">
        <g id="map-u-rack-16" transform="matrix(0-1 1 0 405.514943 690.937807)">
          <rect id="map-u-rack-12" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(2.417372 0 0 1.926618 283.978775 143.635527)" fill="#e4e4e4"/>
          <rect id="map-u-shelf-16-6" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 326.532285 325.178693)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-16-5" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 386.308907 325.178704)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-16-4" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 445.568869 326.922986)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-16-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 326.532285 150.178693)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-16-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 386.308907 150.178704)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-16-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 445.568869 151.922986)" fill="#d2dbed" strokeWidth="0"/>
          <text id="map-u-rack-162" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 526.608479 151.345098)" strokeWidth="0">
            <tspan id="map-s-tspan15" y="0" fontWeight="400" strokeWidth="0">16</tspan>
          </text>
        </g>
        <text id="map-u-section-fruit-et-l-gumes" dx="0" dy="0" fontFamily="&quot;map:::Roboto&quot;" fontSize="30" fontWeight="400" transform="translate(482.928858 56.439304)" fill="#ac014b" strokeWidth="0">
          <tspan id="map-s-tspan16" y="0" fontWeight="400" strokeWidth="0">Section fruits et légumes</tspan>
        </text>
        <rect id="map-u-section-5" width="682.012028" height="560.962274" rx="4" ry="4" transform="matrix(0.548042 0 0 0.690309 482.446589 70.721905)" paintOrder="stroke fill markers" fill="none" stroke="#ac014b" strokeWidth="2"/>
      </g>
      <g id="map-u-boisson" transform="translate(902 53)">
        <g id="map-u-rack-15" transform="matrix(0-1 1 0 405.514931 1179.59689)">
          <rect id="map-u-rack-152" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 770.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-153" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 779.088942 121.276804)" strokeWidth="0">
            <tspan id="map-s-tspan17" y="0" fontWeight="400" strokeWidth="0">15</tspan>
            <tspan id="map-s-tspan18" x="0" y="60" fontWeight="400" strokeWidth="0"> </tspan>
          </text>
          <rect id="map-u-shelf-15-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492191 319.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-15-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492205 254.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-15-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492191 189.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-14" transform="matrix(0-1 1 0 404.991662 1020.636294)">
          <rect id="map-u-rack-142" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 692.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-143" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 700.3864 121.800073)" strokeWidth="0">
            <tspan id="map-s-tspan19" y="0" fontWeight="400" strokeWidth="0">14</tspan>
          </text>
          <rect id="map-u-shelf-14-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492191 319.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-14-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492205 254.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-14-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492191 189.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-13" transform="matrix(0-1 1 0 405.51497 1015.942268)">
          <rect id="map-u-rack-132" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 770.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-133" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 779.088942 121.276804)" strokeWidth="0">
            <tspan id="map-s-tspan20" y="0" fontWeight="400" strokeWidth="0">13</tspan>
            <tspan id="map-s-tspan21" x="0" y="60" fontWeight="400" strokeWidth="0"> </tspan>
          </text>
          <rect id="map-u-shelf-13-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492191 319.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-13-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492205 254.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-13-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492191 189.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-122" transform="matrix(0-1 1 0 405.514943 690.937807)">
          <rect id="map-u-rack-123" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 518.492205 119.276792)" fill="#e4e4e4"/>
          <rect id="map-u-shelf-12-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 189.227727)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-12-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492205 254.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-12-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 319.42161)" fill="#d2dbed" strokeWidth="0"/>
          <text id="map-u-rack-124" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 527.384917 120.906492)" strokeWidth="0">
            <tspan id="map-s-tspan22" y="0" fontWeight="400" strokeWidth="0">12</tspan>
          </text>
        </g>
        <text id="map-u-section-boisson" dx="0" dy="0" fontFamily="&quot;map:::Roboto&quot;" fontSize="30" fontWeight="400" transform="translate(482.928858 56.439304)" fill="#5800c5" strokeWidth="0">
          <tspan id="map-s-tspan23" y="0" fontWeight="400" strokeWidth="0">Section boisson</tspan>
          <tspan id="map-s-tspan24" x="0" y="60" fontWeight="400" strokeWidth="0"> </tspan>
        </text>
        <rect id="map-u-section-4" width="682.012028" height="560.962274" rx="4" ry="4" transform="matrix(0.548042 0 0 0.690309 482.446589 70.721905)" paintOrder="stroke fill markers" fill="none" stroke="#5800c5" strokeWidth="2"/>
      </g>
      <g id="map-u-produit-de-beaut" transform="translate(462 53)">
        <g id="map-u-rack-10" transform="matrix(0-1 1 0 404.991662 1020.636294)">
          <rect id="map-u-rack-102" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 692.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-103" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 700.3864 121.800073)" strokeWidth="0">
            <tspan id="map-s-tspan25" y="0" fontWeight="400" strokeWidth="0">10</tspan>
          </text>
          <rect id="map-u-shelf-10-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492191 319.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-10-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492205 254.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-10-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492191 189.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-8" transform="matrix(0-1 1 0 405.514943 690.937807)">
          <rect id="map-u-rack-82" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 518.492205 119.276792)" fill="#e4e4e4"/>
          <rect id="map-u-shelf-8-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 189.227727)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-8-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492205 254.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-8-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 319.42161)" fill="#d2dbed" strokeWidth="0"/>
          <text id="map-u-rack-83" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 527.384917 120.906492)" strokeWidth="0">
            <tspan id="map-s-tspan26" y="0" fontWeight="400" strokeWidth="0">8</tspan>
          </text>
        </g>
        <g id="map-u-rack-9" transform="matrix(0-1 1 0 404.99165 849.908039)">
          <rect id="map-u-rack-92" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 604.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-93" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 613.188521 123.430928)" strokeWidth="0">
            <tspan id="map-s-tspan27" y="0" fontWeight="400" strokeWidth="0">9</tspan>
          </text>
          <rect id="map-u-shelf-9-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 604.492191 319.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-9-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 604.492205 254.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-9-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 604.492191 189.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-11" transform="matrix(0-1 1 0 405.514931 1179.59689)">
          <rect id="map-u-rack-112" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 770.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-113" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="matrix(0 1-1 0 779.088942 121.276804)" strokeWidth="0">
            <tspan id="map-s-tspan28" y="0" fontWeight="400" strokeWidth="0">11</tspan>
            <tspan id="map-s-tspan29" x="0" y="60" fontWeight="400" strokeWidth="0"> </tspan>
          </text>
          <rect id="map-u-shelf-11-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492191 319.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-11-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492205 254.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-11-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492191 189.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <text id="map-u-section-produit-de-beaut" dx="0" dy="0" fontFamily="&quot;map:::Roboto&quot;" fontSize="30" fontWeight="400" transform="translate(482.928858 56.439304)" fill="#032492" strokeWidth="0">
          <tspan id="map-s-tspan30" y="0" fontWeight="400" strokeWidth="0">Section produits de beauté</tspan>
          <tspan id="map-s-tspan31" x="0" y="60" fontWeight="400" strokeWidth="0"> </tspan>
        </text>
        <rect id="map-u-section-3" width="682.012028" height="560.962274" rx="4" ry="4" transform="matrix(0.548042 0 0 0.690309 482.446589 70.721905)" paintOrder="stroke fill markers" fill="none" stroke="#032492" strokeWidth="2"/>
      </g>
      <g id="map-u-fromagerie" transform="translate(37 53)">
        <rect id="map-u-section-2" width="682.012028" height="560.962274" rx="4" ry="4" transform="matrix(0.548042 0 0 0.690309 482.446589 70.721905)" paintOrder="stroke fill markers" fill="none" stroke="#00b5c2" strokeWidth="2"/>
        <text id="map-u-section-fromagerie" dx="0" dy="0" fontFamily="&quot;map:::Roboto&quot;" fontSize="30" fontWeight="400" transform="translate(482.928858 56.439304)" fill="#00b5c2" strokeWidth="0">
          <tspan id="map-s-tspan32" y="0" fontWeight="400" strokeWidth="0">Section fromagerie</tspan>
          <tspan id="map-s-tspan33" x="0" y="60" fontWeight="400" strokeWidth="0"> </tspan>
        </text>
        <g id="map-u-rack-7">
          <rect id="map-u-rack-72" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 770.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-73" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(781.54073 151.646032)" strokeWidth="0">
            <tspan id="map-s-tspan34" y="0" fontWeight="400" strokeWidth="0">7</tspan>
          </text>
          <rect id="map-u-shelf-7-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492191 322.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-7-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492205 257.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-7-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 770.492191 192.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-6">
          <rect id="map-u-rack-62" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 692.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-63" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(703.54073 151.646032)" strokeWidth="0">
            <tspan id="map-s-tspan35" y="0" fontWeight="400" strokeWidth="0">6</tspan>
          </text>
          <rect id="map-u-shelf-6-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492191 322.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-6-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492205 257.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-6-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 692.492191 192.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-5">
          <rect id="map-u-rack-52" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 604.192554 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-53" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(615.54073 151.646032)" strokeWidth="0">
            <tspan id="map-s-tspan36" y="0" fontWeight="400" strokeWidth="0">5</tspan>
          </text>
          <rect id="map-u-shelf-5-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 604.492191 322.42161)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-5-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 604.492205 257.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-5-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 604.492191 192.227727)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-4">
          <rect id="map-u-rack-42" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 518.492205 119.276792)" fill="#e4e4e4"/>
          <text id="map-u-rack-43" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(530.06028 151.646032)" strokeWidth="0">
            <tspan id="map-s-tspan37" y="0" fontWeight="400" strokeWidth="0">4</tspan>
          </text>
          <rect id="map-u-shelf-4-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 192.227727)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-4-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492205 257.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-4-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 518.492191 322.42161)" fill="#d2dbed" strokeWidth="0"/>
        </g>
      </g>
      <g id="map-u-boucherie" transform="translate(37 53.000001)">
        <rect id="map-u-section-12" width="682.012028" height="560.962274" rx="4" ry="4" transform="matrix(0.548042 0 0 0.690309 52.521826 70.721905)" paintOrder="stroke fill markers" fill="none" stroke="#188f00" strokeWidth="2"/>
        <g id="map-u-rack-3">
          <rect id="map-u-rack-32" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 355.351704 132.157288)" fill="#e4e4e4"/>
          <text id="map-u-rack-33" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(366.917745 170.664523)" strokeWidth="0">
            <tspan id="map-s-tspan38" y="0" fontWeight="400" strokeWidth="0">3</tspan>
          </text>
          <rect id="map-u-shelf-3-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 355.35169 198.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-3-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 355.35169 260.727525)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-3-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 355.35169 323.727525)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-2">
          <rect id="map-u-rack-22" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(0.341442 0 0 2.300186 287.351704 132.157288)" fill="#e4e4e4"/>
          <text id="map-u-rack-23" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(298.917745 169.962702)" strokeWidth="0">
            <tspan id="map-s-tspan39" y="0" fontWeight="400" strokeWidth="0">2</tspan>
          </text>
          <rect id="map-u-shelf-2-3" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 287.351697 323.010629)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-2-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 287.351697 261.010629)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-2-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(1.405095 0 0 1 287.351697 200.010629)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <g id="map-u-rack-1" transform="translate(.000001 0.000001)">
          <rect id="map-u-rack-12" width="117.994644" height="126.132205" rx="2" ry="2" transform="matrix(-0.241436 0.241436-1.183689-1.183689 252.329004 348.028825)" fill="#e4e4e4"/>
          <text id="map-u-rack-13" dx="0" dy="0" fontFamily="&quot;map:::Open Sans&quot;" fontSize="30" fontWeight="400" transform="translate(94.449581 238.795729)" strokeWidth="0">
            <tspan id="map-s-tspan40" y="0" fontWeight="400" strokeWidth="0">1</tspan>
          </text>
          <rect id="map-u-shelf-1-2" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 177.678354 273.378164)" fill="#d2dbed" strokeWidth="0"/>
          <rect id="map-u-shelf-1-1" width="28.673038" height="53.487746" rx="0" ry="0" transform="matrix(-0.993552 0.993552-.707107-.707107 229.743988 325.677323)" fill="#d2dbed" strokeWidth="0"/>
        </g>
        <text id="map-u-section-boucherie" dx="0" dy="0" fontFamily="&quot;map:::Roboto&quot;" fontSize="30" fontWeight="400" transform="translate(49.517731 56.036957)" fill="#188f00" strokeWidth="0">
          <tspan id="map-s-tspan41" y="0" fontWeight="400" strokeWidth="0">Section boucherie</tspan>
        </text>
      </g>
    </svg>

      {alertsWithDetails.map(({ alert, rayon }, index) => {
        const shelfId = `map-u-shelf-${rayon.uuid.replace(/\s+/g, '-')}-1`;
        const shelfElement = svgRef.current.querySelector(`#${shelfId}`);

        if (shelfElement) {
          const rect = shelfElement.getBoundingClientRect();
          const svgRect = svgRef.current.getBoundingClientRect();

          // Déterminer la couleur du cercle en fonction du statut de l'alerte
          let circleColor;
          if (alert.statut.slug === 'nouveau') {
            circleColor = 'red';
          } else if (alert.statut.slug === 'en-cours') {
            circleColor = 'orange';
          } else {
            return null; // Ne pas afficher le cercle si le statut est "fait"
          }

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                marginTop:"1%",
                width: '1vw',
                height: '1vw',
                borderRadius: '50%',
                backgroundColor: circleColor,
                left: `${rect.left - svgRect.left + rect.width / 2 - 10}px`,
                top: `${rect.top - svgRect.top - 10}px`,
                cursor: 'pointer',
              }}
              onClick={(e) => handleCircleClick(e, [alert.produit])}
            />
          );
        }
        return null;
      })}

      {showModal && (
        <div className="fenetre-alerte">
          <h4>Produits concernés par l'alerte</h4>
          <div className='produit-alerte'>
            {stockInfo.map((product, index) => {
              const alert = alertsWithDetails.find(a => a.produit.uuid === product.uuid);
              const buttonText = alert.alert.statut.slug === 'nouveau' ? 'Faire' : 'Valider';
              return (
                <div className="produit" key={index}>
                  <p>{product.libelle}</p>
                  <p>{product.quantite} / {product.seuil}</p>
                  <button className="update-task-bouton" onClick={() => updateTaskStatus(product.uuid)}>
                    {buttonText}
                  </button>
                </div>
              );
            })}
          </div>
          <span className="bouton-fermeture" onClick={closeModal}>&times;</span>
        </div>
      )}
    </div>
  );
};

export default SvgMap;
