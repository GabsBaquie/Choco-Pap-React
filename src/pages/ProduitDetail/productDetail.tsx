import NavBar from "../../components/NavBar/Nav";
import "./productDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productsData from "../../data/products.json";
import { useCart } from "../../components/Context/context";

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

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
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

  const handleQuantityChange = (event: { target: { value: string } }) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    console.log("New quantity:", newQuantity);
  };

  const addToCart = () => {
    const existingProductIndex = cart.findIndex(
      (item: { id: number }) => item.id === product.id
    );

    const newQuantity = quantity; // Utilisez simplement la valeur actuelle de quantity

    if (existingProductIndex !== -1) {
      // Mise à jour immuable de la quantité du produit existant dans le panier
      dispatch({
        type: "UPDATE_CART_ITEM_QUANTITY",
        payload: {
          item: cart[existingProductIndex],
          newQuantity: newQuantity, // Utilisez la nouvelle valeur de quantity ici
        },
      });
    } else {
      // Ajout immuable d'un nouveau produit au panier
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity: newQuantity }, // Utilisez la nouvelle valeur de quantity ici
      });
    }
    setQuantity(1);
    console.log("Adding to cart. Quantity:", newQuantity);
  };

  return (
    <>
      <NavBar />

      <div className="styles.content">
        <div>
          <img
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
          />
        </div>
        <div className="table">
          <div style={{ marginTop: "50px", fontWeight: "bold" }}>
            {product.name}
          </div>
          <div style={{ marginTop: "10px" }}>{product.price} €</div>
          <div style={{ marginTop: "10px", marginBottom: "30px" }}>
            {product.description}
          </div>
          <input
            type="number"
            id="qte"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button
            style={{
              marginLeft: "10px",
              marginTop: "15px",
              padding: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              addToCart();
            }}
          >
            AJOUTER AU PANIER
          </button>
        </div>
      </div>
      <div className="contentTable">
        <div style={{ fontWeight: "bold" }}>Ingrédients</div>
        <div>{product.ingredients}</div>
      </div>
    </>
  );
};

export default ProductDetail;
