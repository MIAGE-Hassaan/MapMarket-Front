import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../services/authService";

const API_BASE_URL = "http://mapmarketapi.test/api";

export default function EditProductModal({ product, isOpen, onClose, onUpdate }) {
    const [formData, setFormData] = useState({ ...product });
    const [rayons, setRayons] = useState([]);

    useEffect(() => {
        if (product) setFormData({ ...product, rayon: product.rayon?.libelle });
    }, [product]);

    useEffect(() => {
        const fetchRayons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/rayons`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                setRayons(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRayons();
    }, []);

    const handleSave = async () => {
        try {
            const rayon = rayons.find((r) => r.libelle === formData.rayon);
            const updatedProduct = { ...formData, rayon_uuid: rayon?.uuid };

            await axios.put(`${API_BASE_URL}/produits/${product.ref}`, updatedProduct, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });

            onUpdate(); // recharge produits
            onClose(); // ferme modal
        } catch (err) {
            alert("Erreur lors de la modification.");
            console.error(err);
        }
    };

    if (!isOpen || !product) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Modifier le produit</h3>
                <input value={formData.libelle} onChange={(e) => setFormData({ ...formData, libelle: e.target.value })} />
                <input value={formData.prix} onChange={(e) => setFormData({ ...formData, prix: e.target.value })} />
                <input value={formData.capacite} onChange={(e) => setFormData({ ...formData, capacite: e.target.value })} />
                <input value={formData.quantite} onChange={(e) => setFormData({ ...formData, quantite: e.target.value })} />
                <input value={formData.seuil} onChange={(e) => setFormData({ ...formData, seuil: e.target.value })} />
                <select value={formData.rayon} onChange={(e) => setFormData({ ...formData, rayon: e.target.value })}>
                    {rayons.map((r) => <option key={r.uuid} value={r.libelle}>{r.libelle}</option>)}
                </select>
                <div className="modal-actions">
                    <button onClick={handleSave}>Enregistrer</button>
                    <button onClick={onClose}>Annuler</button>
                </div>
            </div>
        </div>
    );
}
