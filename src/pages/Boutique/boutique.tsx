import { useState } from "react";
import data from "../../data/products.json";
import NavBar from "../../components/NavBar/Nav";
import Footer from "../../components/Footer/footer";
import "./boutique.css";
import Filter from "../../components/Filter/Filter";
import Products from "../../components/Products/Products";
import { useCart } from "../../components/Context/context";

const Boutique = () => {
  //  État pour stocker les catégories sélectionnées
  const [selectedCategories, setSelectedCategories] = useState(["ch-all"]);
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);

  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(20);
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useCart() as { dispatch: any };

  //  Fonction pour gérer le changement de catégorie
  function handleCategoryChange(categoryName: string) {
    // Si la catégorie sélectionnée est "ch-all"
    if (categoryName === "ch-all") {
      // Sélectionner uniquement "ch-all"
      setSelectedCategories(["ch-all"]);
      setMinRating(1);
      setMaxRating(5);
      setMinPrice(1);
      setMaxPrice(20);
    } else {
      // Si "ch-all" était déjà sélectionné, mettre à jour avec la nouvelle catégorie seulement
      if (selectedCategories.includes("ch-all")) {
        setSelectedCategories([categoryName]);
      } else {
        // Sinon, gérer les sélections/désélections de catégories
        setSelectedCategories((prevCategories) => {
          // Si la nouvelle catégorie était déjà sélectionnée, la désélectionner
          if (prevCategories.includes(categoryName)) {
            return prevCategories.filter(
              (category) => category !== categoryName
            );
          } else {
            // Sinon, l'ajouter à la liste des catégories sélectionnées
            return [...prevCategories, categoryName];
          }
        });
      }
    }
  }

  //  Logique pour filtrer les produits en fonction des catégories sélectionnées et des notes
  const filteredProducts = data.filter((product) => {
    const meetsCategoryCriteria =
      selectedCategories.length === 0 ||
      selectedCategories.includes("ch-all") ||
      (product.filter &&
        product.filter.some((category) =>
          selectedCategories.includes(category)
        ));

    // Logique pour filtrer les etoiles
    const meetsRatingCriteria =
      product.stars >= minRating && product.stars <= maxRating;

    // Logique pour filtrer les pris
    const meetsPriceCriteria =
      (minPrice === 1 || Number(product.price) >= Number(minPrice)) &&
      (maxPrice === 5 || Number(product.price) <= Number(maxPrice));

    return meetsCategoryCriteria && meetsRatingCriteria && meetsPriceCriteria;
  });

  const addToCart = (product: any) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: quantity },
    });
  };

  return (
    <>
      <NavBar />
      <h1 id="Titre">Boutique</h1>
      <div className="content">
        {/* FILTRES */}
        <Filter
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
          maxRating={maxRating}
          setMaxRating={setMaxRating}
        />
        <div className="droite">
          {/* PRODUIT */}
          {
            <Products
              filteredProducts={filteredProducts}
              addToCart={addToCart}
            />
          }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Boutique;
