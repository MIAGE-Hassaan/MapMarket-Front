import {useState} from "react";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import "../styles/gestionStocks.css"; // Assure-toi que le fichier existe bien et respecte la casse

export default function GestionStock() {
    const [products, setProducts] = useState([
        {id: 1, name: "Pâtes coquillettes", rayon: 7, secteur: 2, stock: "A7", seuil: 5},
        {id: 2, name: "Pâtes tagliatelle", rayon: 7, secteur: 2, stock: "A7", seuil: 8},
        {id: 3, name: "Riz basmati", rayon: 5, secteur: 3, stock: "B1", seuil: 12},
        {id: 4, name: "Céréales de petit-déjeuner", rayon: 3, secteur: 1, stock: "C4", seuil: 10},
        {id: 5, name: "Tomates pelées en boîte", rayon: 4, secteur: 2, stock: "D2", seuil: 6},
        {id: 6, name: "Huile d'olive", rayon: 2, secteur: 1, stock: "E7", seuil: 4},
        {id: 7, name: "Sauce tomate", rayon: 6, secteur: 3, stock: "F3", seuil: 3},
        {id: 8, name: "Spaghetti", rayon: 7, secteur: 2, stock: "A6", seuil: 7},
        {id: 9, name: "Farine de blé", rayon: 5, secteur: 1, stock: "B2", seuil: 9},
        {id: 10, name: "Confiture de fraises", rayon: 8, secteur: 4, stock: "G5", seuil: 5},
        {id: 11, name: "Lait entier", rayon: 1, secteur: 1, stock: "H4", seuil: 10},
        {id: 12, name: "Chocolat au lait", rayon: 9, secteur: 5, stock: "J3", seuil: 6},
        {id: 13, name: "Pain de mie", rayon: 10, secteur: 6, stock: "K8", seuil: 8},
        {id: 14, name: "Conserves de maïs", rayon: 4, secteur: 2, stock: "L2", seuil: 7},
        {id: 15, name: "Jus d'orange", rayon: 6, secteur: 3, stock: "M1", seuil: 11},
        {id: 16, name: "Pâtes penne", rayon: 7, secteur: 2, stock: "N9", seuil: 6},
        {id: 17, name: "Chips nature", rayon: 3, secteur: 1, stock: "O4", seuil: 3},
        {id: 18, name: "Crème fraîche épaisse", rayon: 2, secteur: 4, stock: "P5", seuil: 4},
        {id: 19, name: "Jus de pomme", rayon: 6, secteur: 3, stock: "Q7", seuil: 7},
        {id: 20, name: "Fromage râpé", rayon: 2, secteur: 1, stock: "R6", seuil: 9},
    ]);
    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, {id: products.length + 1, ...newProduct}]);
    };

    return (
        <div className="gestion-stock-container">

                {/* Tableau des produits (2/3 de la largeur) */}
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
                    <ProductTable products={products} search={search} onDelete={handleDelete}/>
                </div>

                {/* Formulaire d'ajout (1/3 de la largeur) */}
                <div className="form-container">
                    <AddProduct onProductAdded={handleAddProduct}/>
                </div>

        </div>
    );
}
