import "../../pages/Boutique/boutique.css";
import React, { useEffect, useState } from "react";

// props de Filter type
interface FilterProps {
  selectedCategories: string[];
  onCategoryChange: (categoryName: string) => void;
  minRating: number;
  maxRating: number;
  setMinRating: (minRating: number) => void;
  setMaxRating: (maxRating: number) => void;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
}

// component Filter
const Filter: React.FC<FilterProps> = ({
  selectedCategories,
  onCategoryChange,
  minRating,
  maxRating,
  setMinRating,
  setMaxRating,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  const [showCategories, setShowCategories] = useState(false);
  const [showPrices, setShowPrices] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);

  // Mettre à jour l'état isMobile chaque fois que la largeur de la fenêtre change
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 770);
      if (window.innerWidth > 770) {
        setShowCategories(true);
        setShowPrices(true);
        setShowRatings(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fonction pour gérer le changement de catégorie
  const handleCategoryChange = (categoryName: string) => {
    onCategoryChange(categoryName);
  };

  // Fonction pour gérer le changement de note minimale
  const handleMinRatingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMinRating(Number(event.target.value));
  };

  // Fonction pour gérer le changement de note maximale
  const handleMaxRatingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMaxRating(Number(event.target.value));
  };

  // Fonction pour gérer le changement de prix minimal
  const handleMinPriceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMinPrice(Number(event.target.value));
  };

  // Fonction pour gérer le changement de prix maximal
  const handleMaxPriceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMaxPrice(Number(event.target.value));
  };

  //  Fonction pour gérer le changement de catégorie

  return (
    <div>
      <div id="filter">
        <h4>FILTRE</h4>
        <div
          className="text-style3"
          onClick={() => isMobile && setShowCategories(!showCategories)}
        >
          {isMobile
            ? showCategories
              ? "Catégories -"
              : "Catégories +"
            : "Catégories"}
        </div>

        <div
          className="zone-filtre"
          style={{ display: isMobile && !showCategories ? "none" : "block" }}
        >
          <div>
            <input
              type="radio"
              id="ch-all"
              checked={selectedCategories.includes("ch-all")}
              onChange={() => handleCategoryChange("ch-all")}
            />
            <label htmlFor="ch-all" className="text-style4">
              Tous
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="ch-chocolat-blanc"
              checked={selectedCategories.includes("ch-chocolat-blanc")}
              onChange={() => handleCategoryChange("ch-chocolat-blanc")}
            />
            <label htmlFor="ch-chocolat-blanc" className="text-style4">
              Chocolat blanc
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="ch-chocolat-lait"
              checked={selectedCategories.includes("ch-chocolat-lait")}
              onChange={() => handleCategoryChange("ch-chocolat-lait")}
            />
            <label htmlFor="ch-chocolat-lait" className="text-style4">
              Chocolat au lait
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="ch-chocolat-noir"
              checked={selectedCategories.includes("ch-chocolat-noir")}
              onChange={() => handleCategoryChange("ch-chocolat-noir")}
            />
            <label htmlFor="ch-chocolat-noir" className="text-style4">
              Chocolat noir
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="ch-noix"
              checked={selectedCategories.includes("ch-noix")}
              onChange={() => handleCategoryChange("ch-noix")}
            />
            <label htmlFor="ch-noix" className="text-style4">
              Noix/Noisette
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="ch-fruit"
              checked={selectedCategories.includes("ch-fruit")}
              onChange={() => handleCategoryChange("ch-fruit")}
            />
            <label htmlFor="ch-fruit" className="text-style4">
              Fruit
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="ch-caramel"
              checked={selectedCategories.includes("ch-caramel")}
              onChange={() => handleCategoryChange("ch-caramel")}
            />
            <label htmlFor="ch-caramel" className="text-style4">
              Caramel
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="ch-liqueur"
              checked={selectedCategories.includes("ch-liqueur")}
              onChange={() => handleCategoryChange("ch-liqueur")}
            />
            <label htmlFor="ch-liqueur" className="text-style4">
              Liqueur
            </label>
          </div>
        </div>
        <div
          className="text-style3"
          onClick={() => isMobile && setShowPrices(!showPrices)}
        >
          {isMobile ? (showPrices ? "Prix -" : "Prix +") : "Prix"}
        </div>
        <div
          className="zone-filtre"
          style={{ display: isMobile && !showPrices ? "none" : "block" }}
        >
          <div>
            <span className="text-style">Prix min</span> <br />
            <select value={minPrice} onChange={handleMinPriceChange}>
              <option value="2">2 €</option>
              <option value="5">5 €</option>
              <option value="10">10 €</option>
            </select>
          </div>

          <div>
            <span className="text-style">Prix max</span> <br />
            <select value={maxPrice} onChange={handleMaxPriceChange}>
              <option value="20">20 €</option>
              <option value="10">10 €</option>
              <option value="6">5 €</option>
            </select>
          </div>
        </div>
        <div
          className="text-style3"
          onClick={() => isMobile && setShowRatings(!showRatings)}
        >
          {isMobile ? (showRatings ? "Note -" : "Note +") : "Note"}
        </div>

        <div
          className="zone-filtre"
          style={{ display: isMobile && !showRatings ? "none" : "block" }}
        >
          <div>
            <div>
              <span className="text-style">Note min</span> <br />
              <select value={minRating} onChange={handleMinRatingChange}>
                <option value="1"> ⭐️</option>
                <option value="2"> ⭐️⭐️</option>
                <option value="3"> ⭐️⭐️⭐️</option>
                <option value="4"> ⭐️⭐️⭐️⭐️</option>
                <option value="5"> ⭐️⭐️⭐️⭐️⭐️ </option>
              </select>
            </div>
            <div>
              <span className="text-style">Note max</span> <br />
              <select value={maxRating} onChange={handleMaxRatingChange}>
                <option value="1"> ⭐️</option>
                <option value="2"> ⭐️⭐️</option>
                <option value="3"> ⭐️⭐️⭐️</option>
                <option value="4"> ⭐️⭐️⭐️⭐️</option>
                <option value="5"> ⭐️⭐️⭐️⭐️⭐️</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
