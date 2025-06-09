import React, { useEffect, useState } from "react";
import "../styles/InformationEmployee.css";
import { useNavigate, useLocation } from "react-router-dom";
import userService from "../services/userService";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function InformationEmployee() {
    const [dailyData, setDailyData] = useState([]);
    const [weeklyData, setWeeklyData] = useState({});
    const [selectedActivity, setSelectedActivity] = useState("quotidienne");
    const navigate = useNavigate();
    const location = useLocation();
    const { id, nom, prenom } = location.state || {};

    const displayedData = selectedActivity === "quotidienne" ? dailyData : weeklyData;

    useEffect(() => {
        fetchInformation();
    }, []);

    async function fetchInformation() {
        try {
            const alertes = await userService.getAllAlertes(id);

            if (!alertes || alertes.length === 0) {
                console.warn("Aucune alerte reçue.");
                setDailyData([]);
                setWeeklyData({});
                return;
            }

            const today = new Date().toISOString().split("T")[0];
            const datesYMD = getLastSevenDates("ymd"); // Pour filtrage logique
            const datesMD = getLastSevenDates("md"); // Pour affichage du graphique
            const daily = [];
            const dailyTaskCount = Array(7).fill(0); // Pour le graph

            alertes.forEach((alerte) => {
                if (!alerte.date) return;
                const alerteDate = new Date(alerte.date);
                const dateYMD = alerteDate.toISOString().split("T")[0];
                const formattedHour = alerteDate.toTimeString().slice(0, 5);

                // Quotidien
                if (dateYMD === today) {
                    daily.push({
                        produit: alerte.produit,
                        quantite: alerte.quantite,
                        formattedHour,
                    });
                }

                // Hebdomadaire
                const index = datesYMD.indexOf(dateYMD);
                if (index !== -1) {
                    dailyTaskCount[index]++;
                }
            });

            setDailyData(daily);

            setWeeklyData({
                labels: datesMD,
                datasets: [
                    {
                        label: "Tâches effectuées",
                        data: dailyTaskCount,
                    },
                ],
            });
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    }

    function getLastSevenDates(format = "ymd") {
        const dates = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            if (format === "ymd") {
                dates.push(date.toISOString().split("T")[0]); // 'YYYY-MM-DD'
            } else {
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                dates.push(`${month}-${day}`); // 'MM-DD'
            }
        }
        return dates;
    }

    return (
        <div className="InformationEmployee">
            <div className="hautInformationEmployees">
                <p className="titre2">Information employé de {prenom} {nom}</p>
                <img
                    className="boutonRetour"
                    src="/assets/BoutonRetour.png"
                    alt="btnRetour"
                    width={30}
                    height={30}
                    onClick={() => navigate("/EmployeeManagement")}
                />
            </div>

            <div className="buttons">
                <button
                    className={`button ${selectedActivity === "quotidienne" ? "active" : ""}`}
                    onClick={() => setSelectedActivity("quotidienne")}
                >
                    Activité quotidienne
                </button>
                <button
                    className={`button ${selectedActivity === "hebdomadaire" ? "active" : ""}`}
                    onClick={() => setSelectedActivity("hebdomadaire")}
                >
                    Activité hebdomadaire
                </button>
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
                                <td>{item.produit?.libelle || "Inconnu"}</td>
                                <td>{item.quantite}</td>
                                <td>{item.formattedHour}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="chart">
                    {weeklyData.labels ? (
                        <Bar data={weeklyData} />
                    ) : (
                        <p>Aucune donnée hebdomadaire à afficher.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default InformationEmployee;
