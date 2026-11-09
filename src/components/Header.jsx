


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

function Header() {
  const [recherche, setRecherche] = useState("");
  const [messageErreur, setMessageErreur] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // Charger les catégories depuis MySQL via notre API
  useEffect(() => {
    async function chargerCategories() {
      try {
        const reponse = await fetch(
          "http://localhost:3001/categories"
        );

        if (!reponse.ok) {
          throw new Error("Impossible de charger les catégories.");
        }

        const donnees = await reponse.json();
        setCategories(donnees);

      } catch (erreur) {
        console.error(
          "Erreur de chargement des catégories :",
          erreur
        );
      }
    }

    chargerCategories();
  }, []);

  // Rechercher un artisan par nom
  function rechercherArtisan(event) {
    event.preventDefault();

    const nomArtisan = recherche.trim();

    if (nomArtisan === "") {
      setMessageErreur("Veuillez saisir un nom d'artisan.");
      return;
    }

    setMessageErreur("");

    navigate(`/recherche?nom=${encodeURIComponent(nomArtisan)}`);
  }

  return (
    <header>
      
<Link to="/" className="logo">
  <img
    src={logo}
    alt="Trouve ton artisan"
    className="logo-image"
  />
</Link>


      <nav aria-label="Catégories d'artisans">
        {categories.map((categorie) => (
          <Link
            key={categorie.id_categorie}
            to={`/artisans?categorie=${encodeURIComponent(
              categorie.nom_categorie
            )}`}
          >
            {categorie.nom_categorie}
          </Link>
        ))}
      </nav>

      <form role="search" onSubmit={rechercherArtisan}>
        <input
          type="search"
          name="artisan"
          placeholder="Rechercher un artisan"
          aria-label="Rechercher un artisan par nom"
          value={recherche}
          onChange={(event) => setRecherche(event.target.value)}
        />

        <button type="submit">
          Rechercher
        </button>

        {messageErreur && (
          <p role="alert" className="message-erreur">
            {messageErreur}
          </p>
        )}
      </form>
    </header>
  );
}

export default Header;
