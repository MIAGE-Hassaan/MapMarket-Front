import { useEffect, useState } from "react";
import "../styles/EmployeeManagement.css"; // Ajoute du style pour le modal

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ nom: "", prenom: "" });
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    async function fetchEmployees() {
        try {
            const response = await fetch("https://api.example.com/employees"); // Remplace par ton API
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
        }
    }

    function deleteEmployee(id, nom, prenom) {
        const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer l'employé ${prenom} ${nom} ?`);
        if (confirmation) {
            setEmployees(employees.filter(employee => employee.id !== id));
            console.log(`Employé avec l'ID ${id} supprimé.`);
            // Tu peux aussi ajouter une requête API pour supprimer côté serveur.
        }
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

        // Tu peux envoyer une requête API ici pour ajouter côté serveur
    }

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
                                alt="Voir plus"/>
                        </td>
                        <td>
                            <img
                                className="icone"
                                src="/assets/filled-trash.png"
                                width="30"
                                alt="Supprimer"
                                onClick={() => deleteEmployee(employee.id, employee.nom, employee.prenom)}
                                style={{ cursor: "pointer" }}
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