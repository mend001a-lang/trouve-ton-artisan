import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Recherche() {
  const [searchParams] = useSearchParams();
  const nomArtisan = searchParams.get("nom")?.trim() || "";

  const [artisans, setArtisans] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function rechercherArtisans() {
      setChargement(true);
      setErreur("");
      setArtisans([]);

      if (!nomArtisan) {
        setChargement(false);
        return;
      }

      try {
        const reponse = await fetch(
          `http://localhost:3001/artisans?nom=${encodeURIComponent(nomArtisan)}`
        );

        if (!reponse.ok) {
          throw new Error("Impossible de rechercher les artisans.");
        }

        const donnees = await reponse.json();
        setArtisans(donnees);

      } catch (erreur) {
        console.error(erreur);
        setErreur("Impossible de charger les résultats.");

      } finally {
        setChargement(false);
      }
    }

    rechercherArtisans();
  }, [nomArtisan]);

  return (
    <main className="recherche-artisans">
      <h1>Résultats de recherche</h1>

      <p>
        Vous recherchez un artisan nommé : {nomArtisan}
      </p>

      {chargement && <p>Recherche en cours...</p>}

      {erreur && <p role="alert">{erreur}</p>}

      {!chargement && !erreur && artisans.length === 0 && (
        <p>Aucun artisan trouvé.</p>
      )}

      {!chargement && !erreur && artisans.length > 0 && (
        <section aria-label="Liste des artisans">
          {artisans.map((artisan) => (
            <article key={artisan.id_artisan}>
              <h2>
                <Link to={`/artisans/${artisan.id_artisan}`}>
                  {artisan.nom}
                </Link>
              </h2>

              <p>Note : {artisan.note ?? "Non renseignée"} / 5</p>

              <p>
                Spécialité :{" "}
                {artisan.Specialite?.nom_specialite ?? "Non renseignée"}
              </p>

              <p>Ville : {artisan.ville}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Recherche;