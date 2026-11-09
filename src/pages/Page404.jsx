
import { Link } from "react-router-dom";
import image404 from "../assets/erreur-404.png";

function Page404() {
  return (
    <main className="page-404">
      <h1>Erreur 404</h1>

      <img
        src={image404}
        alt="Boîte à outils avec un marteau, une clé et un casque de chantier"
        className="image-404"
      />

      <p>
        Oups ! La page que vous recherchez
        n'existe pas.
      </p>

      <Link to="/">
        Retour à l'accueil
      </Link>
    </main>
  );
}

export default Page404;
