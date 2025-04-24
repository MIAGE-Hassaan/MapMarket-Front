import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../services/authService";

const API_BASE_URL = "http://mapmarketapi.test/api";

export default function EditProductModal({ product, isOpen, onClose, onUpdate }) {
    const [formData, setFormData] = useState({});
    const [rayons, setRayons] = useState([]);

    useEffect(() => {
        if (product) {
            setFormData({
                libelle: product.libelle || "",
                prix: product.prix || "",
                capacite: product.capacite || "",
                quantite: product.quantite || "",
                seuil: product.seuil || "",
                rayon: product.rayon?.libelle || "",
            });
        }
    }, [product]);

    useEffect(() => {
        const fetchRayons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/rayons`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                setRayons(res.data.data);
            } catch (err) {
                console.error("Erreur lors du chargement des rayons :", err);
            }
        };
        fetchRayons();
    }, []);

    const handleSave = async () => {
        try {
            const selectedRayon = rayons.find((r) => r.libelle === formData.rayon);
            if (!selectedRayon) {
                alert("Rayon sélectionné introuvable.");
                return;
            }

            // Construire un objet sans `ref` ni `rayon`
            const updatedProduct = {
                libelle: formData.libelle,
                prix: formData.prix,
                capacite: formData.capacite,
                quantite: formData.quantite,
                seuil: formData.seuil,
                rayon_uuid: selectedRayon.uuid,
            };

            console.log("🔼 Envoi à l'API :", updatedProduct);

            await axios.put(`${API_BASE_URL}/produits/${product.ref}`, updatedProduct, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });

            onUpdate(); // recharge les produits
            onClose();  // ferme la modal
        } catch (err) {
            alert("Erreur lors de la modification.");
            console.error(" Réponse API :", err.response?.data || err.message);
        }
    };

    if (!isOpen || !product) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Modifier le produit</h3>
                <input
                    value={formData.libelle}
                    onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
                    placeholder="Libellé"
                />
                <input
                    value={formData.prix}
                    onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                    placeholder="Prix"
                />
                <input
                    value={formData.capacite}
                    onChange={(e) => setFormData({ ...formData, capacite: e.target.value })}
                    placeholder="Capacité"
                />
                <input
                    value={formData.quantite}
                    onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                    placeholder="Quantité"
                />
                <input
                    value={formData.seuil}
                    onChange={(e) => setFormData({ ...formData, seuil: e.target.value })}
                    placeholder="Seuil"
                />
                <select
                    value={formData.rayon}
                    onChange={(e) => setFormData({ ...formData, rayon: e.target.value })}
                >
                    <option value="">-- Sélectionner un rayon --</option>
                    {rayons.map((r) => (
                        <option key={r.uuid} value={r.libelle}>
                            {r.libelle}
                        </option>
                    ))}
                </select>
                <div className="modal-actions">
                    <button onClick={handleSave}>Enregistrer</button>
                    <button onClick={onClose}>Annuler</button>
                </div>
            </div>
        </div>
    );
}
