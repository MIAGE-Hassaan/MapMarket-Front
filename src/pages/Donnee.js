import "../styles/Donnee.css";
import React, { useState, useEffect } from "react";
import {Bar} from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import donneeService from "../services/donneeService";



function Donnee(){
    const [ totalEmployee, setTotalEmployee ] = useState([]);
    const [ alertes, setAlertes ] = useState([]);
    const [ tacheEffectue, setTacheEffectue ] = useState([]);
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

            const rep = alerte.nb_alertes_total;
            const tache = alerte.nb_alertes_faits;
            setTacheEffectue(tache);
            setAlertes(rep);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    }


    async function getTachesFaites(){
        try {
            const tache = await donneeService.getTacheFaites();
            if (!tache) {
                throw new Error("Aucune donnée reçue");
            }

            const rep = tache.nb_alertes_faits;
            setTacheEffectue(rep);
            console.log(rep);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    }



    useEffect(() => {
        getEmployee();
        getAlertesW();

        setWeeklyData({
            labels: [1, 2, 3, 4, 5, 6],
            datasets: [
                {
                    label: "Tâches effectuées",
                    data: [45, 7, 6, 6, 7, 3],
                },
            ],
        });

        // Mettez à jour donutData avec les données calculées après l'initialisation
        setDonutData({
            labels: [
                `Complétées (${tacheEffectue})`, // Utilisez directement la valeur de tacheEffectue
                `Restantes (${alertes - tacheEffectue})`, // Alertes restantes = Total alertes - Alertes complétées
            ],
            datasets: [
                {
                    data: [tacheEffectue, alertes - tacheEffectue],  // tacheEffectue pour complétées, alertes restantes pour reportées
                    backgroundColor: ['#4A7BFF', '#E0E0E0'],
                    borderWidth: 0,
                },
            ],
        });
    }, []);

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