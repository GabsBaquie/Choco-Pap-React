// CartContext.js
import { createContext, useContext, useReducer, useEffect } from "react";

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const INITIALIZE_CART = "INITIALIZE_CART";
const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";
const VALIDATE_CART = "VALIDATE_CART";

type CartItem = {
  id: number;
  quantity: number;
  item: {
    id: number;
  };
  newQuantity: number;
};

type CartAction = {
  type: string;
  payload: CartItem;
};

type CartState = CartItem[];

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        // Mise à jour immuable de la quantité du produit existant dans le panier
        return state.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Ajout immuable d'un nouveau produit au panier
        return [...state, action.payload];
      }

    case INITIALIZE_CART:
      // Initialiser le panier à partir du localStorage
      return action.payload ? [action.payload] : [];

    case UPDATE_CART_ITEM_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.item.id
          ? { ...item, quantity: action.payload.newQuantity }
          : item
      );

    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload.id);

    case CLEAR_CART:
      return [];

    case VALIDATE_CART: // Action type pour valider le panier
      // Ici, vous pouvez effectuer des appels d'API pour valider le panier
      // et vider le panier si la validation réussit
      alert("Votre commande a été validée avec succès !");
      return [];

    default:
      return state;
  }
};

// Create the context
const CartContext = createContext({
  cart: [] as CartState,
  dispatch: (action: CartAction) => {},
});

// Custom hook to use the context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Récupérer l'état initial du panier à partir de localStorage
  const initialState = JSON.parse(localStorage.getItem("cart") || "[]");

  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Utiliser useEffect pour mettre à jour localStorage chaque fois que le panier change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
