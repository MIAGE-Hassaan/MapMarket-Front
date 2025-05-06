import React, { useEffect, useState } from "react";
import "../styles/InformationEmployee.css";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import userService from "../services/userService";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";


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

            if (!information || information.length === 0) {
                console.warn("Aucune alerte reçue.");
                setDailyData([]);
                return;
            }

            // Obtenir la date du jour
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];  // 'YYYY-MM-DD'

            let dailyData = [];
            let weeklyData = [];
            let dates = getLastSixDays();
            let tabJour = [0,0,0,0,0,0,0];

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
                    for (let i = 0; i<=6; i++){
                        if (alerteDateString === dates[i]){
                            tabJour[i] += 1;
                        }
                    }
                }
            });

            // Mettre à jour l'état avec les alertes du jour
            setDailyData(dailyData);
            setWeeklyData({
                labels: getLastSix(),
                datasets: [
                    {
                        label: "Tâches effectuées",
                        data: tabJour
                    },
                ],
            });

        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    }



    // Au format YYYY-MM-DD
    function getLastSixDays() {
        let dates = [];
        for (let i = 6; i >= 0; i--) { // Commence à 7 pour exclure aujourd'hui
            let date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
        }
        return dates;
    }

    // Au format MM-DD
    function getLastSix() {
        let dates = [];
        let nbAlerte = [];

        for (let i = 6; i >= 0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i);

            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois sur 2 chiffres
            let day = date.getDate().toString().padStart(2, '0'); // Jour sur 2 chiffres

            dates.push(`${month}-${day}`);
        }
        return dates;
    }

    useEffect(() => {
        setWeeklyData({
            labels: getLastSix(),
            datasets: [
                {
                    label: "Tâches effectuées",
                    data: [20, 35, 25, 4, 50, 30, 28],
                },
            ],
        });

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
            {selectedActivity === "quotidienne" ? (
                <table>
                    <thead>
                    <tr>
                        <th>Produits</th>
                        <th>Quantité</th>
                        <th>Heure</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dailyData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.produit?.libelle}</td>
                            <td>{item.quantite}</td>
                            <td>{item.formattedHour}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="chart">
                    <Bar  data = {weeklyData} />
                </div>

            )}

        </div>
    );
}

export default InformationEmployee;
