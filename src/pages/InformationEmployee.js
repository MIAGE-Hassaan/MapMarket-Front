import { useState } from "react";
import "../styles/InformationEmployee.css"; // Ajoute du style pour le modal

function InformationEmployee() {
    // État pour suivre l'activité sélectionnée
    const [selectedActivity, setSelectedActivity] = useState("quotidienne");

    // Données pour chaque type d'activité
    const dailyData = [
        { product: "Pâtes tagliatelle", quantity: 25, time: "11:50" },
        { product: "Sauce tomate", quantity: 15, time: "10:00" },
        { product: "Lardons", quantity: 30, time: "16:03" },
        { product: "Pain", quantity: 12, time: "14:33" },
        { product: "Savon", quantity: 9, time: "08:20" }
    ];

    const weeklyData = [
        { product: "Farine", quantity: 50, time: "Lundi" },
        { product: "Sucre", quantity: 40, time: "Mardi" },
        { product: "Beurre", quantity: 35, time: "Mercredi" },
        { product: "Œufs", quantity: 60, time: "Jeudi" },
        { product: "Lait", quantity: 20, time: "Vendredi" }
    ];

    // Sélection des données en fonction de l'activité choisie
    const displayedData = selectedActivity === "quotidienne" ? dailyData : weeklyData;

    return (
        <div className="InformationEmployee">
            <div className="hautInformationEmployees">
                <p className="titre2">Information employé</p>
                <img className="boutonRetour" src="/assets/BoutonRetour.png" alt="btnRetour" width={30} height={30} />
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
                        <td>{item.product}</td>
                        <td>{item.quantity}</td>
                        <td>{item.time}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default InformationEmployee;
