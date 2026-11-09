
import { Link } from "react-router-dom";

function Footer() {
  return (
    
<footer className="container py-4">

      <div>
        <h2>Région Auvergne-Rhône-Alpes</h2>

        <address>
          101 cours Charlemagne<br />
          CS 20033<br />
          69269 LYON CEDEX 02<br />
          France
        </address>

        <p>
          Téléphone :{" "}
          <a href="tel:+33426734000">
            +33 (0)4 26 73 40 00
          </a>
        </p>
      </div>

      <nav aria-label="Informations légales">
        <h2>Informations légales</h2>

        <ul>
          <li>
            <Link to="/mentions-legales">
              Mentions légales
            </Link>
          </li>

          <li>
            <Link to="/donnees-personnelles">
              Données personnelles
            </Link>
          </li>

          <li>
            <Link to="/accessibilite">
              Accessibilité
            </Link>
          </li>

          <li>
            <Link to="/cookies">
              Cookies
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
