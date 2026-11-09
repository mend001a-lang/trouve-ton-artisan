

import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Recherche from './pages/Recherche'
import Artisans from './pages/Artisans'
import ArtisansDuMois from './components/ArtisansDuMois'
import DetailArtisan from './pages/DetailArtisan'
import MentionsLegales from './pages/MentionsLegales'
import DonneesPersonnelles from './pages/DonneesPersonnelles'
import Accessibilite from './pages/Accessibilite'
import Cookies from './pages/Cookies'
import Page404 from './pages/Page404'
import './App.css'


function App() {
  const nomSite = "Trouve ton artisan !";
  const location = useLocation();

  useEffect(() => {
    let titre = nomSite;
    let description =
      "Trouvez un artisan en Auvergne-Rhône-Alpes et contactez-le facilement.";

    if (location.pathname === "/") {
      titre = "Accueil | Trouve ton artisan";
    } else if (location.pathname === "/recherche") {
      titre = "Recherche d'artisans | Trouve ton artisan";
      description = "Recherchez un artisan par son nom en Auvergne-Rhône-Alpes.";
    } else if (location.pathname === "/artisans") {
      titre = "Liste des artisans | Trouve ton artisan";
      description = "Découvrez les artisans de la région par catégorie et spécialité.";
    } else if (location.pathname.startsWith("/artisans/")) {
      titre = "Fiche artisan | Trouve ton artisan";
      description = "Consultez la fiche d'un artisan et contactez-le.";
    } else if (location.pathname === "/mentions-legales") {
      titre = "Mentions légales | Trouve ton artisan";
    } else if (location.pathname === "/donnees-personnelles") {
      titre = "Données personnelles | Trouve ton artisan";
    } else if (location.pathname === "/accessibilite") {
      titre = "Accessibilité | Trouve ton artisan";
    } else if (location.pathname === "/cookies") {
      titre = "Cookies | Trouve ton artisan";
    } else {
      titre = "Page introuvable | Trouve ton artisan";
    }

    document.title = titre;

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [location.pathname]);

  return (

    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            
<main className="accueil container">


  <h1>Comment trouver mon artisan ?</h1>

  <section className="etapes-artisan">

    <article className="etape">
      <h2>1</h2>
      <p>Choisir la catégorie d’artisanat dans le menu.</p>
    </article>

    <article className="etape">
      <h2>2</h2>
      <p>Choisir un artisan.</p>
    </article>

    <article className="etape">
      <h2>3</h2>
      <p>Le contacter via le formulaire de contact.</p>
    </article>

    <article className="etape">
      <h2>4</h2>
      <p>Une réponse sera apportée sous 48h.</p>
    </article>

    </section>

  {/* =========================
      LES TROIS ARTISANS DU MOIS
  ========================= */}

  <ArtisansDuMois />

</main>
          }
        />

        <Route
          path="/recherche"
          element={<Recherche />}
        />

        <Route
          path="/artisans"
          element={<Artisans />}  
        />
      
{/* PAGE MENTIONS LÉGALES */}
<Route
  path="/mentions-legales"
  element={<MentionsLegales />}
/>

{/* PAGE DONNÉES PERSONNELLES */}
<Route
  path="/donnees-personnelles"
  element={<DonneesPersonnelles />}
/>
{/* PAGE ACCESSIBILITÉ */}
<Route
  path="/accessibilite"
  element={<Accessibilite />}
/>
{/* PAGE COOKIES */}
<Route
  path="/cookies"
  element={<Cookies />}
/>
{/* PAGE DÉTAIL ARTISAN */}
<Route
  path="/artisans/:id"
  element={<DetailArtisan />}
/>
{/* PAGE 404 */}
<Route
  path="*"
  element={<Page404 />}
/>
</Routes>

<Footer />
</>
)
}

export default App






