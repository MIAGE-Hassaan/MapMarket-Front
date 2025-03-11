import { useState } from "react";
import "../styles/gestionStocks.css";

export default function AddProduct({ onProductAdded }) {
    const [newProduct, setNewProduct] = useState({
        ref: "",
        libelle: "",
        prix: "",
        capacite: "",
        quantite: "",
        seuil: "",
        rayon: "", // On récupère l'ID du rayon
    });

    const handleAddProduct = async () => {
        if (!newProduct.ref || !newProduct.libelle || !newProduct.prix || !newProduct.capacite || !newProduct.quantite || !newProduct.seuil || !newProduct.rayon) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        await onProductAdded(newProduct); // Appelle la fonction du parent pour ajouter via l'API

        setNewProduct({ ref: "", libelle: "", prix: "", capacite: "", quantite: "", seuil: "", rayon: "" }); // Réinitialisation
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
                <input type="number" placeholder="ID Rayon" value={newProduct.rayon} onChange={(e) => setNewProduct({ ...newProduct, rayon: e.target.value })} />
            </div>
            <button className="add-btn" onClick={handleAddProduct}>Ajouter</button>
        </div>
    );
}
