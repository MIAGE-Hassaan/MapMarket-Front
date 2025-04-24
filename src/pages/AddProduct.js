import { useEffect, useState } from "react";
import "../styles/gestionStocks.css";
import axios from "axios";
import { getToken } from "../services/authService";

const API_BASE_URL = "http://mapmarketapi.test/api";

export default function AddProduct({ onProductAdded }) {
    const [rayons, setRayons] = useState([]);
    const [newProduct, setNewProduct] = useState({
        ref: "",
        libelle: "",
        prix: "",
        capacite: "",
        quantite: "",
        seuil: "",
        rayon: "",
    });

    useEffect(() => {
        const fetchRayons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/rayons`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                setRayons(res.data.data);
            } catch (error) {
                console.error("Erreur chargement rayons :", error);
            }
        };

        fetchRayons();
    }, []);

    const handleAddProduct = async () => {
        if (Object.values(newProduct).some(v => !v)) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        await onProductAdded(newProduct);
        setNewProduct({ ref: "", libelle: "", prix: "", capacite: "", quantite: "", seuil: "", rayon: "" });
    };

    return (
        <div className="add-product-container">
            <h2>Ajouter un produit</h2>
            <div className="form-group">
                <input type="text" placeholder="Référence" value={newProduct.ref} onChange={(e) => setNewProduct({ ...newProduct, ref: e.target.value })} />
                <input type="text" placeholder="Libellé" value={newProduct.libelle} onChange={(e) => setNewProduct({ ...newProduct, libelle: e.target.value })} />
                <input type="number" placeholder="Prix" value={newProduct.prix} onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })} />
                <input type="number" placeholder="Capacité" value={newProduct.capacite} onChange={(e) => setNewProduct({ ...newProduct, capacite: e.target.value })} />
                <input type="number" placeholder="Quantité" value={newProduct.quantite} onChange={(e) => setNewProduct({ ...newProduct, quantite: e.target.value })} />
                <input type="number" placeholder="Seuil" value={newProduct.seuil} onChange={(e) => setNewProduct({ ...newProduct, seuil: e.target.value })} />

                <select value={newProduct.rayon} onChange={(e) => setNewProduct({ ...newProduct, rayon: e.target.value })}>
                    <option value="">Sélectionnez un rayon</option>
                    {rayons.map((r) => (
                        <option key={r.uuid} value={r.libelle}>{r.libelle}</option>
                    ))}
                </select>
            </div>
            <button className="add-btn" onClick={handleAddProduct}>Ajouter</button>
        </div>
    );
}
