import { useState } from "react";
import "../styles/CreateAccount.css";

function CreateAccount() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        selectedCategories: [],
    });

    const categories = ["Rayon 1", "Rayon 2", "Rayon 3", "Rayon 4","Rayon 5", "Rayon 6", "Rayon 7", "Rayon 8","Rayon 9", "Rayon 10","Rayon 11", "Rayon 12", "Rayon 13","Rayon 14", "Rayon 15"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectAll = () => {
        setFormData({ ...formData, selectedCategories: categories });
    };

    const handleDeselectAll = () => {
        setFormData({ ...formData, selectedCategories: [] });
    };

    const handleCheckboxChange = (category) => {
        setFormData((prev) => ({
            ...prev,
            selectedCategories: prev.selectedCategories.includes(category)
                ? prev.selectedCategories.filter((item) => item !== category)
                : [...prev.selectedCategories, category],
        }));
    };

    return (
        <div className="container">
            <div className="form-section">
                <h2>Informations personnelles</h2>
                <div className="input-group">
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom"
                        value={formData.nom}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="prenom"
                        placeholder="Prénom"
                        value={formData.prenom}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Adresse email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-section">
                <h2>Affectation</h2>
                <div className="buttons">
                    <button onClick={handleSelectAll}>Sélectionner tout</button>
                    <button onClick={handleDeselectAll}>Désélectionner tout</button>
                </div>
                <div className="checkbox-group">
                    {categories.map((category, index) => (
                        <label key={index} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.selectedCategories.includes(category)}
                                onChange={() => handleCheckboxChange(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            <button className="submit-button">Créer le compte</button>
        </div>
    );
}

export default CreateAccount;
