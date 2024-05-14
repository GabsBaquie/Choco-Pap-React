import { useState } from "react";
import { Link } from "react-router-dom";
import Panier from "../../pages/Panier/Panier";
import { useCart } from "../Context/context";
import "./navBar.css";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { cart } = useCart() as { cart: any[]; dispatch: any };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // // span qui affiche le nombre d'articles dans le panier seulement si le panier n'est pas vide
  const showSpan = () => {
    if (cart.length > 0) {
      const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      console.log("totalQuantity", totalQuantity);
      return <span className="span"> {totalQuantity}</span>;
    }
  };

  return (
    <>
      <nav className="Navbar">
        <img
          className="logo"
          src="/images/logo.png"
          alt="Logo"
          width={60}
          height={60}
        />
        {showSpan()}
        <button onClick={toggleMenu} className="hamburger">
          &#9776;
        </button>

        <div className={`navUl ${showMenu ? "show" : ""}`}>
          <ul>
            <Link to="/Accueil">Accueil</Link>
            <Link to="/Boutique">Boutique</Link>
          </ul>

          <Panier />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
