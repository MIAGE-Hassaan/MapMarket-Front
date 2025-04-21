import "../styles/Donnee.css";
import { useState, useEffect } from "react";


function Donnee(){
    const [ totalEmployee, setTotalEmployee ] = useState([]);
    const [ alertes, setAlertes ] = useState([]);
    const [ tacheEffectue, setTacheEffectue ] = useState([]);





    useEffect(() => {
        setTotalEmployee(7);
        setAlertes(61);
        setTacheEffectue(57);
    }, []);

    return(
        <div>
            <div className={"top_donnee"}>
                <p className={"titre_donnee"}>Compte rendu global</p>
                <div className={"info_donnee"}>
                    <div className="tab_donnee">
                        <tr>
                            <th>{totalEmployee}</th>
                            <th>{alertes}</th>
                            <th>{tacheEffectue}</th>
                        </tr>
                        <tr>
                            <td>Total Employes</td>
                            <td>Alertes</td>
                            <td>Tâches effectuées</td>
                        </tr>
                    </div>

                    <p className={"reponse_donnee"}>Taux de réponse hebdomadaire</p>
                </div>
            </div>

            <div className={"bot_donnee"}>

            </div>
        </div>
















    );
}

export default Donnee;