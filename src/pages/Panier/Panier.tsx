import { useState, useEffect } from "react";
import { useCart } from "../../components/Context/context";
import "./Panier.css";
import { Link } from "react-router-dom";

function Panier() {
  const { cart, dispatch } = useCart() as { cart: any[]; dispatch: any };
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  const togglePanier = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = cart.reduce((acc, item) => {
    // console.log("quantity", item.quantity);
    return acc + item.quantity * item.price;
  }, 0);

  // Mise à jour du localStorage à chaque modification du panier
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // pour supprimer un article du panier button poubelle
  const deleteItem = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    const existingProductIndex = cart.findIndex(
      (item: { id: number }) => item.id === id
    );

    if (existingProductIndex !== -1) {
      if (newQuantity > 0) {
        // Mise à jour immuable de la quantité du produit existant dans le panier
        dispatch({
          type: "UPDATE_CART_ITEM_QUANTITY",
          payload: {
            item: cart[existingProductIndex],
            newQuantity: newQuantity,
          },
        });
      } else {
        // Supprimer le produit du panier si la nouvelle quantité est 0 ou moins
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
      }
    } else {
      console.log("Item not found in cart");
    }
  };

  function PanierItem({
    item,
    deleteItem,
    updateQuantity,
  }: {
    item: any;
    deleteItem: any;
    updateQuantity: any;
  }) {
    return (
      <li key={item.id} id="liPanier">
        {isMobile ? (
          <button onClick={() => deleteItem(item.id)} id="PanierDelete">
            X
          </button>
        ) : (
          ""
        )}
        <Link to={`/produit/${item.id}`}>
          <img width={45} height={45} src={item.image} alt={item.name} />
        </Link>
        <div>
          {!isMobile ? (
            `${item.name} - ${item.quantity} = ${Math.round(
              item.quantity * item.price
            )} €`
          ) : (
            <div className="PanierMobile">
              {item.name} <br />
              <input
                type="number"
                value={item.quantity}
                id={`${item.id}`}
                className="inputPanier"
                onChange={(e) => updateQuantity(item.id, e.target.value)}
              />
              <br />
              {Math.round(item.quantity * item.price)} €
            </div>
          )}
        </div>
        <button id="poubelle" onClick={() => deleteItem(item.id)}>
          <img
            src="/images/poubelle-de-recyclage.png"
            alt="poubelle-de-recyclage"
          />
        </button>
      </li>
    );
  }

  return (
    <>
      <img
        src="/images/panier.png"
        alt="Panier"
        className={`${`panierImage`}`}
        onClick={togglePanier}
      />
      <div
        className="panier-container"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div
          className="panierText"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <h2 onClick={togglePanier}>Panier ⓧ </h2>
          <ul id="PanierUl">
            {cart.map((item) => (
              <PanierItem
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                updateQuantity={updateQuantity}
              />
            ))}
          </ul>
          <br />
          <p> Total = {Math.round(totalPrice.toFixed(2))} €</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              margin: "40px 80px",
              gap: "10px",
            }}
          >
            <button
              onClick={() => {
                dispatch({ type: "CLEAR_CART" });
                console.log("panier vidé");
              }}
              className="buttonPanier "
            >
              Réinitialiser le panier
            </button>
            <button
              onClick={() => {
                dispatch({ type: "VALIDATE_CART" });
                console.log("panier validé");
              }}
              className="buttonPanier"
            >
              Valider le panier
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Panier;
