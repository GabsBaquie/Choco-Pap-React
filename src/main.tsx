import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./components/Context/context.tsx";
import Boutique from "./pages/Boutique/boutique.tsx";
import ProductDetail from "./pages/ProduitDetail/productDetail.tsx";
import Panier from "./pages/Panier/panier.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Accueil",
    element: <App />,
  },
  {
    path: "/Boutique",
    element: <Boutique />,
  },
  {
    path: "/Produit/:id",
    element: <ProductDetail />,
  },
  {
    path: "/Panier",
    element: <Panier />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
