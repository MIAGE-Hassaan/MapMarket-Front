import { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import { fetchProducts, addProduct, deleteProduct } from "../Services/productService";
import "../styles/gestionStocks.css";

export default function GestionStock() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState(null);

    //  Charger les produits depuis l'API
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                if (!data || data.length === 0) {
                    throw new Error("Aucun produit trouvé");
                }
                setProducts(data);
            } catch (error) {
                console.error("Erreur API :", error);
                setMessage({ type: "error", text: "Erreur lors du chargement des produits." });
            }
        };


    }, []);

    // Ajouter un produit
    const handleAddProduct = async (newProduct) => {
        try {
            const createdProduct = await addProduct(newProduct);
            setProducts([...products, createdProduct]);
            setMessage({ type: "success", text: "Produit ajouté avec succès !" });
        } catch (error) {
            setMessage({ type: "error", text: "Erreur lors de l'ajout du produit." });
        }
    };

    // Supprimer un produit
    const handleDelete = async (ref) => {
        try {
            await deleteProduct(ref);
            setProducts(products.filter((product) => product.ref !== ref));
            setMessage({ type: "success", text: "Produit supprimé avec succès !" });
        } catch (error) {
            setMessage({ type: "error", text: "Erreur lors de la suppression." });
        }
    };

    return (
        <div className="gestion-stock-container">
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="table-container">
                <div className="search-bar">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher un produit"
                    />
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
