import { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import "../styles/gestionStocks.css";

export default function GestionStock() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    // Fonction pour récupérer les produits
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://mapmarketapi.test/api/produits");
            if (!response.ok) throw new Error("Erreur lors de la récupération des produits");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Erreur lors du chargement des produits :", error);
        }
    };

    // Charger les produits une fois au montage
    useEffect(() => {
        fetchProducts();
    }, []);

    // Ajouter un produit et rafraîchir la liste
    const handleAddProduct = async (newProduct) => {
        try {
            // Récupérer l'UUID du rayon
            const rayonResponse = await fetch(`http://mapmarketapi.test/api/rayons/${newProduct.rayon}`);
            if (!rayonResponse.ok) throw new Error("Rayon introuvable");
            const rayonData = await rayonResponse.json();

            // Envoyer le produit
            await fetch("http://mapmarketapi.test/api/produits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ref: newProduct.ref,
                    libelle: newProduct.libelle,
                    prix: newProduct.prix,
                    capacite: newProduct.capacite,
                    quantite: newProduct.quantite,
                    seuil: newProduct.seuil,
                    rayon_uuid: rayonData.uuid,
                }),
            });

            fetchProducts(); // 🔄 Rafraîchir les produits après ajout
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
        }
    };

    // Supprimer un produit et rafraîchir la liste
    const handleDelete = async (ref) => {
        try {
            await fetch(`http://mapmarketapi.test/api/produits/${ref}`, { method: "DELETE" });
            fetchProducts(); // 🔄 Rafraîchir les produits après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression du produit :", error);
        }
    };

    return (
        <div className="gestion-stock-container">
            <div className="table-container">
                <div className="search-bar">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un produit" />
                    <button>Rechercher</button>
                </div>
                <ProductTable products={products} search={search} onDelete={handleDelete} />
            </div>
            <div className="form-container">
                <AddProduct onProductAdded={handleAddProduct} />
            </div>
        </div>
    );
}
