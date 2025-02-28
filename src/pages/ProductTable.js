import { Pencil, Trash } from "lucide-react";
import "../styles/gestionStocks.css";

export default function ProductTable({ products, search, onDelete }) {
    return (
        <table className="product-table">
            <thead>
            <tr>
                <th>Nom du produit</th>
                <th>Rayon</th>
                <th>Secteur</th>
                <th>Stock</th>
                <th>Seuil</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {products
                .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
                .map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.rayon}</td>
                        <td>{product.secteur}</td>
                        <td>{product.stock}</td>
                        <td>{product.seuil}</td>
                        <td className="actions">
                            <button className="edit-btn">
                                <Pencil size={16} />
                            </button>
                            <button className="delete-btn" onClick={() => onDelete(product.id)}>
                                Supprimer {/* Texte du bouton */}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
