import React, { useEffect, useState } from "react";
import "../styles/EmployeeManagement.css";
import {useNavigate} from "react-router-dom";

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ nom: "", prenom: "" });
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const navigate = useNavigate();
    const userService = require('../services/userService');


    async function fetchEmployees() {
        try {
            const users = await userService.getAllUsers()
            const data = await users.json();
            setEmployees(data);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
        }
    }

    async function deleteEmployee(id, nom, prenom) {
        const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer l'employé ${prenom} ${nom} ?`);
        if (confirmation) {
            try{
                await userService.deleteUser(id, nom, prenom);
            }catch (error){
                console.error("Erreur lors de la suppression de l'employé :", error);
            }
            console.log(`Employé avec l'ID ${id} supprimé.`);

        }
        await fetchEmployees();
    }

    function addEmployee() {
        const newId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;

        const employeeToAdd = {
            id: newId,
            nom: "Test",      //newEmployee.nom
            prenom: "nom",        //newEmployee.prenom
        };

        setEmployees([...employees, employeeToAdd]);

        console.log("Nouvel employé ajouté :", employeeToAdd);

        // Réinitialiser le formulaire
        setNewEmployee({ nom: "test", prenom: "nom" });
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
                    <tr key={employee.id}>
                        <td>{employee.nom}</td>
                        <td>{employee.prenom}</td>
                        <td>{employee.id}</td>
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
                                onClick={() => deleteEmployee(employee.id, employee.nom, employee.prenom)}
                                style={{cursor: "pointer"}}
                            />
                        </td>
                    </tr>
                ))}
                <tr key={99}>
                    <td>eluecque</td>
                    <td>kelian</td>
                    <td>99</td>
                    <td>
                        <img className="icone"
                             src="/assets/oeil.png"
                             width="30"
                             alt="Voir plus"
                             onClick={() => navigate(`/InformationEmployee/eluecque/kelian`)}/>
                    </td>
                    <td>
                        <img
                            className="icone"
                            src="/assets/filled-trash.png"
                            width="30"
                            alt="Supprimer"
                            onClick={() => deleteEmployee("99", "eluecque", "kelian")}
                            style={{cursor: "pointer"}}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeManagement;