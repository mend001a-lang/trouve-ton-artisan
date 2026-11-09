
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  const [searchParams] = useSearchParams();
  const categorie = searchParams.get("categorie");

  useEffect(() => {
    async function chargerArtisans() {
      setChargement(true);
      setErreur("");

      try {
        const url = categorie
  ? `https://trouve-ton-artisan-yagt.onrender.com/artisans?categorie=${encodeURIComponent(categorie)}`
  : "https://trouve-ton-artisan-yagt.onrender.com/artisans";

        const reponse = await fetch(url);

        if (!reponse.ok) {
          throw new Error("Erreur lors du chargement.");
        }

        const donnees = await reponse.json();
        setArtisans(donnees);

      } catch (erreur) {
        console.error(erreur);
        setErreur("Impossible de charger les artisans.");

      } finally {
        setChargement(false);
      }
    }

    chargerArtisans();
  }, [categorie]);

  if (chargement) {
    return <p>Chargement des artisans...</p>;
  }

  if (erreur) {
    return <p role="alert">{erreur}</p>;
  }

  return (
    <section className="artisans-section">
      <h1>
        {categorie ? `Artisans - ${categorie}` : "Liste des artisans"}
      </h1>

      <p>Nombre d'artisans : {artisans.length}</p>

      <div className="artisans-grille">
        {artisans.map((artisan) => (
          <article
            className="artisan-carte"
            key={artisan.id_artisan}
          >
            <h2>
  <Link to={`/artisans/${artisan.id_artisan}`}>
    {artisan.nom}
  </Link>
</h2>
            <p>Ville : {artisan.ville}</p>
            <p>Note : {artisan.note ?? "Non renseignée"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Artisans;
