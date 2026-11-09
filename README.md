
# Trouve ton artisan

## Présentation du projet

Trouve ton artisan est une application web réalisée dans le cadre d'un projet de formation en développement web.

Elle permet aux utilisateurs de rechercher des artisans de la région Auvergne-Rhône-Alpes, de consulter leurs fiches et de les contacter grâce à un formulaire.

L'application est responsive et s'adapte aux ordinateurs, tablettes et smartphones.

## Fonctionnalités

- Consultation des catégories : Alimentation, Bâtiment, Fabrication et Services
- Recherche d'artisans par nom
- Affichage des artisans par catégorie
- Consultation des fiches détaillées
- Présentation de trois artisans du mois
- Formulaire de contact avec envoi d'e-mail
- Page 404
- Interface responsive

## Technologies utilisées

### Frontend
- React
- Vite
- HTML / CSS
- Sass
- Bootstrap
- JavaScript

### Backend
- Node.js
- Express
- Sequelize
- MySQL
- Nodemailer
- express-rate-limit
- dotenv

### Autres outils
- Figma
- Git
- GitHub

## Prérequis

Avant de lancer le projet, installer :

- Node.js et npm
- MySQL
- Git (pour cloner le dépôt)

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/mend001a-lang/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Installer les dépendances du frontend

Depuis la racine du projet :

```bash
npm install
```

### 3. Installer les dépendances du backend

```bash
cd backend
npm install
```

## Configuration de la base de données

Dans MySQL, exécuter les scripts dans cet ordre :

1. `01_creation_trouve_ton_artisan.sql`
2. `02_insertion_trouve_ton_artisan.sql`

Le fichier `03_requetes_trouve_ton_artisan.sql` contient des requêtes de vérification complémentaires.

La base de données comprend trois tables :

- `categorie`
- `specialite`
- `artisan`

## Variables d'environnement

Dans le dossier `backend`, créer un fichier `.env` contenant les paramètres nécessaires à la connexion MySQL et à l'envoi des e-mails.

Exemple pour la base de données :

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
```

Ajouter également les variables de configuration du service de messagerie utilisées dans le backend.

Ne jamais publier les véritables identifiants ou mots de passe.

## Lancement du projet

### 1. Démarrer le backend

Depuis le dossier `backend` :

```bash
node server.js
```

Le serveur fonctionne en local sur :

http://localhost:3001

### 2. Démarrer le frontend

Ouvrir un deuxième terminal à la racine du projet :

```bash
npm run dev
```

Ouvrir ensuite :

http://localhost:5173

Le backend et le frontend doivent être démarrés simultanément.

## Sécurité

Les protections mises en place comprennent :

- Validation des données du formulaire côté serveur
- Limitation des requêtes sur le formulaire de contact
- Limitation de la taille des requêtes JSON
- Configuration CORS
- Utilisation de Sequelize pour accéder à MySQL
- Protection des informations sensibles avec `.env` et `.gitignore`

## Maquettes Figma

https://www.figma.com/design/QY9brkITrNcdNXCWooE1sR/Trouve-ton-artisan---Maquettes

## Dépôt GitHub

https://github.com/mend001a-lang/trouve-ton-artisan

## Site en ligne

Lien à ajouter après le déploiement.

## Auteur

Projet réalisé dans le cadre d'une formation en développement web.
