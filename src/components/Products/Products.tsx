import { Link } from "react-router-dom";
import "./products.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  stars: number;
  quantity?: number;
  totalPriceμ?: number;
};

function Products({
  filteredProducts,
  addToCart,
}: {
  filteredProducts: Product[];
  addToCart: (product: Product) => void;
}) {
  // Vérifier si filteredProducts est un tableau, sinon définir un tableau vide par défaut
  const productsArray = Array.isArray(filteredProducts) ? filteredProducts : [];

  // Fonction pour générer une chaîne d'émojis en fonction du nombre d'étoiles
  const emojiStars = (stars: number) => {
    // Vérifiez que 'stars' est un nombre
    if (typeof stars !== "number" || isNaN(stars) || stars < 1 || stars > 5) {
      return ""; // Retournez une chaîne vide en cas de valeur invalide
    }
    let emojiString = "";
    for (let i = 0; i < stars; i++) {
      emojiString += "⭐️"; // Ajoutez un emoji étoile pour chaque étoile
    }
    return emojiString;
  };

  return (
    <>
      <div className="produits">
        <ul className="scrollContainer">
          {productsArray.map((product) => (
            <li key={product.id} className="Li">
              <Link to={`/produit/${product.id}`}>
                <img
                  width={140}
                  height={100}
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <h1>{product.name}</h1>
              <p>Prix: {product.price} €</p>
              <p>Étoiles: {emojiStars(product.stars)}</p>
              <button
                onClick={() => {
                  addToCart(product);
                }}
              >
                Ajouter au panier
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Products;
