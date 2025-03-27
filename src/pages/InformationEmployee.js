import React, { useEffect, useState } from "react";
import "../styles/InformationEmployee.css";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import userService from "../services/userService";

function InformationEmployee() {
    
    const [ dailyData, setDailyData ] = useState([]);
    const [ weeklyData, setWeeklyData ] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState("quotidienne");
    const navigate = useNavigate();
    const location = useLocation();
    const { id, nom, prenom } = location.state || {};

    
    const displayedData = selectedActivity === "quotidienne" ? dailyData : weeklyData;

    async function fetchInformation() {
        try {
            const information = await userService.getAllAlertes(id);
            console.log("Alertes récupérées :", information);

            if (!information || information.length === 0) {
                console.warn("Aucune alerte reçue.");
                setDailyData([]);
                return;
            }

            // Obtenir la date du jour
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];  // 'YYYY-MM-DD'

            let dailyData = [];

            // Filtrer les alertes du jour
            information.forEach(alerte => {
                if (alerte.date) {
                    // Convertir l'alerte.date en objet Date
                    const alerteDate = new Date(alerte.date);
                    const alerteDateString = alerteDate.toISOString().split('T')[0];  // 'YYYY-MM-DD'

                    // Si l'alerte correspond à aujourd'hui
                    if (alerteDateString === todayString) {
                        // Extraire l'heure et les minutes (sans secondes)
                        const hours = alerteDate.getHours().toString().padStart(2, '0');
                        const minutes = alerteDate.getMinutes().toString().padStart(2, '0');
                        const formattedHour = `${hours}:${minutes}`;

                        // Ajouter la propriété 'formattedHour' à l'alerte
                        alerte.formattedHour = formattedHour;

                        // Ajouter l'alerte filtrée au tableau dailyData
                        dailyData.push(alerte);
                    }
                }
            });

            // Mettre à jour l'état avec les alertes du jour
            setDailyData(dailyData);
            console.log("Alertes du jour : ", dailyData);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    }





    useEffect(() => {
        fetchInformation();
    }, []);

    return (
        <div className="InformationEmployee">
            <div className="hautInformationEmployees">
                <p className="titre2">Information employé de {prenom} {nom}</p>
                <img className="boutonRetour" src="/assets/BoutonRetour.png" alt="btnRetour" width={30} height={30} onClick={() => navigate("/EmployeeManagement")}/>
            </div>
            <div className="buttons">
                <button
                    className={`button ${selectedActivity === "quotidienne" ? "active" : ""}`}
                    onClick={() => setSelectedActivity("quotidienne")}>Activité quotidienne</button>
                <button
                    className={`button ${selectedActivity === "hebdomadaire" ? "active" : ""}`}
                    onClick={() => setSelectedActivity("hebdomadaire")}>Activité hebdomadaire</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Produits</th>
                    <th>Quantité</th>
                    <th>{selectedActivity === "quotidienne" ? "Heure" : "Jour"}</th>
                </tr>
                </thead>
                <tbody>
                {displayedData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.produit?.libelle}</td>
                        <td>{item.quantite}</td>
                        <td>{item.formattedHour}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default InformationEmployee;
