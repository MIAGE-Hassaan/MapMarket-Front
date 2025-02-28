import { useEffect, useState } from "react";
import "../styles/InformationEmployee.css"; // Ajoute du style pour le modal

function InformationEmployee(props) {








    return(
        <div className={"InformationEmployee"}>
            <div className={"hautInformationEmployees"}>
                <p className={"titre2"}>Information employé</p>
                <img  className={"boutonRetour"} src="/assets/BoutonRetour.png" alt="btnRetour" width={30} height={30} />
            </div>
            <div className={"buttons"}>

            </div>
            <table>
                <thead>
                <tr>
                    <th>Produits</th>
                    <th>Quantité</th>
                    <th>Heure</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Pâtes tagliatelle</td>
                    <td>25</td>
                    <td>11:50</td>
                </tr>
                <tr>
                    <td>Sauce tomate</td>
                    <td>15</td>
                    <td>10:00</td>
                </tr>
                <tr>
                    <td>Lardons</td>
                    <td>30</td>
                    <td>16:03</td>
                </tr>
                <tr>
                    <td>Pain</td>
                    <td>12</td>
                    <td>14:33</td>
                </tr>
                <tr>
                    <td>Savon</td>
                    <td>9</td>
                    <td>08:20</td>
                </tr>
                <tr>
                    <td>Gel douche</td>
                    <td>2</td>
                    <td>12:02</td>
                </tr>
                <tr>
                    <td>Serviette de bain</td>
                    <td>10</td>
                    <td>17:30</td>
                </tr>
                </tbody>
            </table>

</div>
)
}
export default InformationEmployee