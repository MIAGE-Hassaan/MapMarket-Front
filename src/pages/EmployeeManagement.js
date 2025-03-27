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
            const users = await userService.getAllUsers();
            if (!users) {
                throw new Error("Aucune donnée reçue");
            }

            const rep = users.data;

            setEmployees(rep); // Pas besoin de `json()`
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
                    <th>Mail</th>
                    <th>Information</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <tr key={employee.uuid}>
                        <td>{employee.nom}</td>
                        <td>{employee.prenom}</td>
                        <td>{employee.email}</td>
                        <td>
                            <img className="icone"
                                 src="/assets/oeil.png"
                                 width="30"
                                 alt="Voir plus"
                                 onClick={() => navigate(`/InformationEmployee`, { state: { id: employee.uuid, nom: employee.nom, prenom: employee.prenom } })}/>
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