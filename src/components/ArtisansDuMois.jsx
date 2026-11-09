
import { useEffect, useState } from "react";
import { recupererArtisansDuMois } from "../api";

function ArtisansDuMois() {
  const [artisans, setArtisans] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function chargerArtisansDuMois() {
      try {
        const donnees = await recupererArtisansDuMois();
        setArtisans(donnees);
      } catch (erreur) {
        console.error(erreur);
        setErreur("Impossible de charger les artisans du mois.");
      } finally {
        setChargement(false);
      }
    }

    chargerArtisansDuMois();
  }, []);

  if (chargement) {
    return <p>Chargement des artisans du mois...</p>;
  }

  if (erreur) {
    return <p role="alert">{erreur}</p>;
  }

  return (
    <section className="artisans-du-mois">
      <h2>Les trois artisans du mois</h2>

      <div className="artisans-grille">
        {artisans.map((artisan) => (
          <article
            className="artisan-carte"
            key={artisan.id_artisan}
          >
            <h3>{artisan.nom}</h3>

<p>
  Note : {artisan.note ?? "Non renseignée"} / 5
  {" "}
<span className="artisan-etoiles" aria-hidden="true">
    {"★".repeat(
      Math.max(0, Math.min(5, Math.round(Number(artisan.note) || 0)))
    )}
    {"☆".repeat(
      5 - Math.max(0, Math.min(5, Math.round(Number(artisan.note) || 0)))
    )}
  </span>
</p>

<p>
  Spécialité : {artisan.Specialite?.nom_specialite ?? "Non renseignée"}
</p>

<p>Ville : {artisan.ville}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ArtisansDuMois;
