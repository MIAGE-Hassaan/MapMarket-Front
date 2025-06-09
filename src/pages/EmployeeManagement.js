import React, { useEffect, useState } from "react";
import "../styles/EmployeeManagement.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    async function fetchEmployees() {
        try {
            const users = await userService.getAllUsers();

            if (!users || !users.data || !Array.isArray(users.data)) {
                throw new Error("Données invalides reçues");
            }

            console.log("Tous les utilisateurs :", users.data);

            // ✅ Vérifie si `active` existe, sinon on considère que l'utilisateur est actif
            const actifs = users.data.filter(user =>
                user.hasOwnProperty('active') ? user.active === 1 : true
            );

            console.log("Utilisateurs actifs :", actifs);
            setEmployees(actifs);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    }

    async function deleteEmployee(id, nom, prenom) {
        const confirmation = window.confirm(`Êtes-vous sûr de vouloir archiver l'employé ${prenom} ${nom} ?`);
        if (!confirmation) return;

        try {
            await userService.deleteUser(id);
            await fetchEmployees();
        } catch (error) {
            console.error("Erreur lors de l'archivage de l'employé :", error);
        }
    }

    function addEmployee() {
        navigate('/CreateAccount');
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="tab">
            <div className="hautListEmployees">
                <p className="titre2">Liste des employés</p>
                <button className="add-employee-button" onClick={addEmployee}>
                    + Ajouter un employé
                </button>
            </div>
            {employees.length === 0 ? (
                <p>Aucun employé à afficher.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Mail</th>
                            <th>Information</th>
                            <th>Archiver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.uuid}>
                                <td>{employee.nom}</td>
                                <td>{employee.prenom}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <img
                                        className="icone"
                                        src="/assets/oeil.png"
                                        width="30"
                                        alt="Voir plus"
                                        onClick={() =>
                                            navigate(`/InformationEmployee`, {
                                                state: {
                                                    id: employee.uuid,
                                                    nom: employee.nom,
                                                    prenom: employee.prenom,
                                                },
                                            })
                                        }
                                        style={{ cursor: "pointer" }}
                                    />
                                </td>
                                <td>
                                    <img
                                        className="icone"
                                        src="/assets/cadena.png"
                                        width="30"
                                        alt="Archiver"
                                        onClick={() =>
                                            deleteEmployee(employee.uuid, employee.nom, employee.prenom)
                                        }
                                        style={{ cursor: "pointer" }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeeManagement;
