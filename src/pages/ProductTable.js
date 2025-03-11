import { Pencil, Trash } from "lucide-react";
import "../styles/gestionStocks.css";

export default function ProductTable({ products, search, onDelete }) {
    return (
        <table className="product-table">
            <thead>
            <tr>
                <th>Référence</th>
                <th>Libellé</th>
                <th>Prix</th>
                <th>Capacité</th>
                <th>Quantité</th>
                <th>Seuil</th>
                <th>Rayon</th>
                <th>Secteur</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {products
                .filter((p) => p.libelle.toLowerCase().includes(search.toLowerCase()))
                .map((product) => (
                    <tr key={product.ref}>
                        <td>{product.ref}</td>
                        <td>{product.libelle}</td>
                        <td>{product.prix}</td>
                        <td>{product.capacite}</td>
                        <td>{product.quantite}</td>
                        <td>{product.seuil}</td>
                        <td>{product.rayon}</td>
                        <td>{product.secteur}</td>
                        <td className="actions">
                            <button className="edit-btn">
                                <Pencil size={16} />
                            </button>
                            <button className="delete-btn" onClick={() => onDelete(product.ref)}>
                                <Trash size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
