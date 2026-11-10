require("dotenv").config();

// ===============================
// IMPORTATION DES MODULES
// ===============================

const express = require("express");
const { Resend } = require("resend");
const cors = require("cors");
const sequelize = require("./database");

const Artisan = require("./models/Artisan");
const Specialite = require("./models/Specialite");
const Categorie = require("./models/Categorie");

const nodemailer = require("nodemailer");
const { rateLimit } = require("express-rate-limit");

// ===============================
// CONFIGURATION RESEND
// ===============================

const resend = new Resend(process.env.RESEND_API_KEY);


// Un artisan appartient à une spécialité
Artisan.belongsTo(Specialite, {
  foreignKey: "id_specialite",
  targetKey: "id_specialite"
});
Specialite.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  targetKey: "id_categorie"
});
const app = express();

app.use(express.json({ limit: "10kb" }));

const PORT = 3001;

// ===============================
// CONFIGURATION NODEMAILER
// ===============================

const transporteur = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Autoriser les requêtes de notre application React
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://trouve-ton-artisan-1-9849.onrender.com"
  ]
}));

// Route d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Trouve ton artisan !");
});

// Route pour récupérer tous les artisans
// =========================
// RÉCUPÉRER LES ARTISANS
// FILTRAGE PAR CATÉGORIE
// =========================

// ===============================
// ROUTE LISTE ET RECHERCHE ARTISANS
// ===============================

app.get("/artisans", async (req, res) => {
  try {
    const { categorie, nom } = req.query;

    // Recherche par nom
    const { Op } = require("sequelize");

    const artisans = await Artisan.findAll({
      // Filtrer les artisans par nom si une recherche existe
      ...(nom && nom.trim()
        ? {
            where: {
              nom: {
                [Op.like]: `%${nom.trim()}%`
              }
            }
          }
        : {}),

      // Conserver le filtrage par catégorie
      include: [
        {
          model: Specialite,
          required: true,
          include: [
            {
              model: Categorie,
              required: true,
              ...(categorie
                ? {
                    where: {
                      nom_categorie: categorie
                    }
                  }
                : {})
            }
          ]
        }
      ]
    });

    res.json(artisans);

  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des artisans :",
      erreur
    );

    res.status(500).json({
      erreur: "Impossible de récupérer les artisans."
    });
  }
});
// =========================
// DÉTAIL D'UN ARTISAN
// =========================

app.get("/artisans/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        erreur: "Identifiant invalide."
      });
    }

    const artisan = await Artisan.findByPk(id, {
      include: [
        {
          model: Specialite,
          include: [
            {
              model: Categorie
            }
          ]
        }
      ]
    });

    if (!artisan) {
      return res.status(404).json({
        erreur: "Artisan introuvable."
      });
    }

    res.json(artisan);

  } catch (erreur) {
    console.error("Erreur détail artisan :", erreur);

    res.status(500).json({
      erreur: "Impossible de récupérer cet artisan."
    });
  }
});

// =========================
// LES TROIS ARTISANS DU MOIS
// =========================

app.get("/artisans-du-mois", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
  where: {
    top: true
  },
  include: [
    {
      model: Specialite,
      attributes: ["nom_specialite"]
    }
  ],
  limit: 3
});

    res.json(artisans);

  } catch (erreur) {
    console.error("Erreur artisans du mois :", erreur);

    res.status(500).json({
      erreur: "Impossible de récupérer les artisans du mois."
    });
  }
});

// ===============================
// DÉMARRAGE DU SERVEUR
// ===============================

async function demarrerServeur() {
  try {
    // 1. Vérification de la connexion MySQL
    await sequelize.authenticate();

    console.log("Connexion à MySQL réussie !");

    // 2. Vérification de la connexion Gmail
    try {
      await transporteur.verify();

      console.log("Connexion Gmail réussie !");
    } catch (erreur) {
      console.error("Erreur de connexion Gmail :", erreur.message);
    }

    // 3. Démarrage du serveur Express
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });

  } catch (erreur) {
    console.error("Erreur de connexion à MySQL :", erreur.message);
  }
}

const limiteContact = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    erreur: "Trop de tentatives. Réessayez dans 15 minutes."
  }
});
// ===============================
// ROUTE CONTACT ARTISAN
// ===============================


app.post("/contact", limiteContact, async (req, res) => {

  try {
    const { nom, email, objet, message, id_artisan } = req.body;

    // 1. Vérifier les champs
    if (
      typeof nom !== "string" ||
      typeof email !== "string" ||
      typeof objet !== "string" ||
      typeof message !== "string" ||
      !nom.trim() ||
      !email.trim() ||
      !objet.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        erreur: "Tous les champs sont obligatoires."
      });
    }

    // Limiter la longueur des champs
    if (
      nom.trim().length > 100 ||
      email.trim().length > 254 ||
      objet.trim().length > 150 ||
      message.trim().length > 5000
    ) {
      return res.status(400).json({
        erreur: "Un ou plusieurs champs dépassent la longueur autorisée."
      });
    }


    // 2. Vérifier l'adresse email
    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValide.test(email.trim())) {
      return res.status(400).json({
        erreur: "Adresse email invalide."
      });
    }

    // 3. Vérifier l'identifiant de l'artisan
    const id = Number(id_artisan);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        erreur: "Identifiant artisan invalide."
      });
    }

    // 4. Rechercher l'artisan dans MySQL
    const artisan = await Artisan.findByPk(id);

    if (!artisan) {
      return res.status(404).json({
        erreur: "Artisan introuvable."
      });
    }

    if (!artisan.email) {
      return res.status(400).json({
        erreur: "Cet artisan ne possède pas d'adresse email."
      });
    }

   // ===============================
// 5. ENVOYER L'EMAIL AVEC RESEND
// ===============================

const { data, error } = await resend.emails.send({
  from: "Trouve ton artisan <onboarding@resend.dev>",

  // Adresse de test autorisée par Resend
  to: process.env.RESEND_TEST_EMAIL,

  replyTo: email.trim(),

  subject: `Trouve ton artisan - ${objet.trim()}`,

  text: `
Nouveau message envoyé depuis Trouve ton artisan.

Artisan : ${artisan.nom}
Email de l'artisan : ${artisan.email}

Nom du visiteur : ${nom.trim()}
Email du visiteur : ${email.trim()}

Objet : ${objet.trim()}

Message :
${message.trim()}
  `
});

// Vérifier si Resend a refusé l'envoi
if (error) {
  console.error("Erreur Resend :", error);

  return res.status(502).json({
    erreur: "Impossible d'envoyer votre message pour le moment."
  });
}

console.log("Email accepté par Resend :", data?.id);
    // 6. Confirmer l'envoi
    res.status(200).json({
      message: "Votre message a été envoyé avec succès."
    });

  } catch (erreur) {
    console.error("Erreur lors de l'envoi du contact :", erreur);

    res.status(500).json({
      erreur: "Impossible d'envoyer votre message pour le moment."
    });
  }
});

// ===============================
// ROUTE LISTE DES CATÉGORIES
// ===============================

app.get("/categories", async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [["nom_categorie", "ASC"]]
    });

    res.json(categories);

  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des catégories :",
      erreur
    );

    res.status(500).json({
      erreur: "Impossible de récupérer les catégories."
    });
  }
});
demarrerServeur();




