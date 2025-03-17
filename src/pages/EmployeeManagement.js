import React, { useEffect, useState } from "react";
import "../styles/EmployeeManagement.css";
import {useNavigate} from "react-router-dom";
import userService from "../services/userService";

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ nom: "", prenom: "" });
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const navigate = useNavigate();


    async function fetchEmployees() {
        try {
            const users = await userService.getAllUsers(); // users est déjà un tableau d'objets JSON
            if (!users) {
                throw new Error("Aucune donnée reçue");
            }

            const rep = users.data;

            setEmployees(rep); // Pas besoin de `json()`
            console.log("test1", employees);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    }

    async function deleteEmployee(id, nom, prenom) {
        const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer l'employé ${prenom} ${nom} ?`);

        if (!confirmation) return; // Si l'utilisateur annule, on arrête la fonction.

        try {
            await userService.deleteUser(id); // On ne passe que l'ID
            console.log(`Employé avec l'ID ${id} supprimé.`);
            await fetchEmployees(); // Rafraîchir la liste des employés seulement après une suppression réussie
        } catch (error) {
            console.error("Erreur lors de la suppression de l'employé :", error);
        }
    }


    async function addEmployee() {
        navigate('/CreateAccount');
    }


    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="tab">
            <div className="hautListEmployees">
                <p className={"titre2"} >Liste des employés</p>
                <button className="add-employee-button" onClick={addEmployee}>+ Ajouter un employé</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>ID Employé</th>
                    <th>Information</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <tr key={employee.uuid}>
                        <td>{employee.nom}</td>
                        <td>{employee.prenom}</td>
                        <td>{employee.uuid}</td>
                        <td>
                            <img className="icone"
                                 src="/assets/oeil.png"
                                 width="30"
                                 alt="Voir plus"
                                 onClick={() => navigate(`/InformationEmployee/${employee.nom}/${employee.prenom}`)}/>
                        </td>
                        <td>
                            <img
                                className="icone"
                                src="/assets/filled-trash.png"
                                width="30"
                                alt="Supprimer"
                                onClick={() => deleteEmployee(employee.uuid, employee.nom, employee.prenom)}
                                style={{cursor: "pointer"}}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeManagement;