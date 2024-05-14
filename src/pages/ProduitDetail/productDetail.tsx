import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../components/Context/context";
import NavBar from "../../components/NavBar/Nav";
import productsData from "../../data/products.json";
import "./productDetail.css";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  ingredients: string;
  description: string;
  // Ajoutez ici d'autres propriétés si nécessaire
}

type ProductDetailProps = {
  productId: number;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { cart, dispatch }: any = useCart();

  useEffect(() => {
    if (!id) {
      return;
    }

    const productId = parseInt(id, 10);

    const selectedProduct = productsData.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      setProduct(selectedProduct);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Produit non trouvé</p>;
  }

  const addToCart = () => {
    const existingProductIndex = cart.findIndex(
      (item: { id: number }) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Mise à jour immuable de la quantité du produit existant dans le panier
      dispatch({
        type: "UPDATE_CART_ITEM_QUANTITY",
        payload: {
          item: cart[existingProductIndex],
          newQuantity: cart[existingProductIndex].quantity + 1, // Ajoutez simplement 1 à la quantité existante
        },
      });
    } else {
      // Ajout immuable d'un nouveau produit au panier
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity: 1 }, // La quantité initiale est 1 pour un nouveau produit
      });
    }
  };

  return (
    <>
      <NavBar />

      <div className="content-produit content">
        <img
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          style={{ borderRadius: 5, margin: "50px" }}
        />

        <div className="table">
          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
            {product.name}
          </div>
          <div style={{ marginTop: "10px" }}>{product.price} €</div>
          <div
            style={{
              marginTop: "10px",
              marginBottom: "30px",
              fontSize: "20px",
            }}>
            {product.description}
          </div>
          <button
            style={{
              border: "none",
              borderRadius: "5px",
              backgroundColor: "wheat",
              marginLeft: "10px",
              marginTop: "15px",
              padding: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              addToCart();
            }}>
            AJOUTER AU PANIER
          </button>
        </div>
      </div>
      <div className="contentTable">
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>Ingrédients:</div>
        <div>{product.ingredients}</div>
      </div>
    </>
  );
};

export default ProductDetail;
