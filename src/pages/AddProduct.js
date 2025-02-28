import { useState } from "react";
import "../styles/gestionStocks.css";

export default function AddProductForm({ onProductAdded }) {
    const [newProduct, setNewProduct] = useState({
        name: "",
        rayon: "",
        secteur: "",
        stock: "",
        seuil: "",
    });

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.rayon || !newProduct.secteur || !newProduct.stock || !newProduct.seuil) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        onProductAdded(newProduct);
        setNewProduct({ name: "", rayon: "", secteur: "", stock: "", seuil: "" });
    };

    return (
        <div className="add-product-container">
            <h2>Ajouter un nouveau produit</h2>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Nom du produit"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Rayon"
                    value={newProduct.rayon}
                    onChange={(e) => setNewProduct({ ...newProduct, rayon: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Secteur"
                    value={newProduct.secteur}
                    onChange={(e) => setNewProduct({ ...newProduct, secteur: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Emplacement stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Seuil minimal"
                    value={newProduct.seuil}
                    onChange={(e) => setNewProduct({ ...newProduct, seuil: e.target.value })}
                />
            </div>
            <button className="add-btn" onClick={handleAddProduct}>Ajouter</button>
        </div>
    );
}
