import "../styles/Donnee.css";
import React, { useState, useEffect } from "react";
import {Bar} from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import donneeService from "../services/donneeService";



function Donnee(){
    const [ totalEmployee, setTotalEmployee ] = useState([]);
    const [ alertes, setAlertes ] = useState(null);
    const [ tacheEffectue, setTacheEffectue ] = useState(null);
    const [ weeklyData, setWeeklyData ] = useState({
        labels: [],
        datasets: [],
    });
    const [ donutData, setDonutData ] = useState({
        labels: [],
        datasets: [],
    });


    async function getEmployee(){
        try {
            const employee = await donneeService.getAllEmployee();
            if (!employee) {
                throw new Error("Aucune donnée reçue");
            }

            setTotalEmployee(employee);
            console.log(totalEmployee);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    }
    
    async function getAlertesW(){
        try {
            const alerte = await donneeService.getAlertesWeekly();
            if (!alerte) {
                throw new Error("Aucune donnée reçue");
            }

            const total = alerte.nb_alertes_total;
            const fait = alerte.nb_alertes_faits;
            setTacheEffectue(fait);
            setAlertes(total);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
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
        getEmployee();
        getAlertesW();
        setWeeklyData({
            labels: getLastSix(),
            datasets: [
                {
                    label: "Tâches effectuées",
                    data: [0, 0, 0, 0, 0, 0],
                },
            ],
        });
    }, []);
    useEffect(() => {
        if (alertes !== null && tacheEffectue !== null) {
            setDonutData({
                labels: [
                    `Complétées (${tacheEffectue})`,
                    `Restantes (${alertes - tacheEffectue})`,
                ],
                datasets: [
                    {
                        data: [tacheEffectue, alertes - tacheEffectue],
                        backgroundColor: ['#4A7BFF', '#E0E0E0'],
                        borderWidth: 0,
                    },
                ],
            });
        }
    }, [alertes, tacheEffectue]);

    return(
        <div>
            <div className={"top_donnee"}>
                <p className={"titre_donnee"}>Compte rendu global</p>
                <div className={"info_donnee"}>
                    <div className="tab_donnee">
                        <table>
                            <thead>
                                <tr>

                                    <th className={"th_table"}>{totalEmployee}</th>
                                    <th className={"th_table"}>{alertes}</th>
                                    <th className={"th_table"}>{tacheEffectue}</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Employes</td>
                                    <td>Alertes</td>
                                    <td>Tâches effectuées</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className={"reponse_donnee"}>Taux de réponse hebdomadaire</p>
                </div>
            </div>

            <div className={"bot_donnee"}>
                <div className="chart">
                    <Bar data={weeklyData}/>

                </div>
                <div className={"chart2"}>
                    <Doughnut data={donutData}/>
                </div>

            </div>
        </div>


    );
}

export default Donnee;