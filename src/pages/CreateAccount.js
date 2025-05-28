import React from "react";
import useRegister from "../hooks/useRegister";
import "../styles/CreateAccount.css";

function CreateAccount() {
    const {
        formData,
        handleChange,
        handleSubmit,
        error,
        isLoading,
    } = useRegister();

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Créer un compte</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            name="nom"
                            placeholder="Nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="prenom"
                            placeholder="Prénom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Adresse email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Création en cours..." : "Créer le compte"}
                </button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default CreateAccount;
