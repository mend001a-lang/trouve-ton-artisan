import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import illustrationArtisans from "../assets/illustration-artisans.png";

function DetailArtisan() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  // État du formulaire de contact
  const [formulaire, setFormulaire] = useState({
    nom: "",
    email: "",
    objet: "",
    message: ""
  });

  const [messageContact, setMessageContact] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  useEffect(() => {
    async function chargerArtisan() {
      try {
        const reponse = await fetch(
  `https://trouve-ton-artisan-yagt.onrender.com/artisans/${id}`
);

        if (!reponse.ok) {
          throw new Error("Impossible de récupérer cet artisan.");
        }

        const donnees = await reponse.json();
        setArtisan(donnees);

      } catch (erreur) {
        console.error(erreur);
        setErreur("Impossible de charger la fiche de cet artisan.");

      } finally {
        setChargement(false);
      }
    }

    chargerArtisan();
  }, [id]);

  // Mise à jour des champs du formulaire
  function modifierChamp(e) {
    const { name, value } = e.target;

    setFormulaire((ancienFormulaire) => ({
      ...ancienFormulaire,
      [name]: value
    }));
  }

  // Envoi du formulaire au backend
  async function envoyerContact(e) {
    e.preventDefault();

    setMessageContact("");
    setEnvoiEnCours(true);

    try {
      const reponse = await fetch(
        "https://trouve-ton-artisan-yagt.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
  ...formulaire,
  id_artisan: artisan.id_artisan
})
        }
      );

      const donnees = await reponse.json();

      if (!reponse.ok) {
        throw new Error(
          donnees.erreur || "Impossible d'envoyer le formulaire."
        );
      }

      setMessageContact(donnees.message);

      setFormulaire({
        nom: "",
        email: "",
        objet: "",
        message: ""
      });

    } catch (erreur) {
      console.error(erreur);
      setMessageContact(erreur.message);

    } finally {
      setEnvoiEnCours(false);
    }
  }

  if (chargement) {
    return <p>Chargement de la fiche artisan...</p>;
  }

  if (erreur) {
    return <p role="alert">{erreur}</p>;
  }

  if (!artisan) {
    return <p>Artisan introuvable.</p>;
  }

  return (
    <main className="detail-artisan">
      <h1>{artisan.nom}</h1>

<img
  src={illustrationArtisans}
  alt="Illustration des métiers de l'artisanat"
  className="illustration-artisan"
/>

     
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

      <h2>À propos</h2>
      <p>{artisan.a_propos || "Aucune description disponible."}</p>

      {artisan.site_web && (
        <p>
          Site web :{" "}
          <a
            href={artisan.site_web}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visiter le site
          </a>
        </p>
      )}

      {/* FORMULAIRE DE CONTACT */}
      <section className="contact-artisan">
        <h2>Contacter {artisan.nom}</h2>

        <form onSubmit={envoyerContact}>
          <div>
            <label htmlFor="contact-nom">Nom</label>
            <input
              id="contact-nom"
              type="text"
              name="nom"
              value={formulaire.nom}
              onChange={modifierChamp}
              required
            />
          </div>

          <div>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formulaire.email}
              onChange={modifierChamp}
              required
            />
          </div>

          <div>
            <label htmlFor="contact-objet">Objet</label>
            <input
              id="contact-objet"
              type="text"
              name="objet"
              value={formulaire.objet}
              onChange={modifierChamp}
              required
            />
          </div>

          <div>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={formulaire.message}
              onChange={modifierChamp}
              required
              rows="5"
            />
          </div>

          <button type="submit" disabled={envoiEnCours}>
            {envoiEnCours ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>

        {messageContact && (
          <p role="status">{messageContact}</p>
        )}
      </section>
    </main>
  );
}


export default DetailArtisan;