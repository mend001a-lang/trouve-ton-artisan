
-- ==========================================
-- PROJET : TROUVE TON ARTISAN
-- SCRIPT 01 : CREATION DE LA BASE DE DONNEES
-- ==========================================

CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- ==========================================
-- TABLE 1 : CATEGORIE
-- ==========================================

CREATE TABLE IF NOT EXISTS categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL UNIQUE
);

-- ==========================================
-- TABLE 2 : SPECIALITE
-- ==========================================

CREATE TABLE IF NOT EXISTS specialite (
    id_specialite INT AUTO_INCREMENT PRIMARY KEY,
    nom_specialite VARCHAR(100) NOT NULL UNIQUE,
    id_categorie INT NOT NULL,

    CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (id_categorie)
    REFERENCES categorie(id_categorie)
);

-- ==========================================
-- TABLE 3 : ARTISAN
-- ==========================================

CREATE TABLE IF NOT EXISTS artisan (
    id_artisan INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    note DECIMAL(2,1),
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT,
    email VARCHAR(150) NOT NULL,
    site_web VARCHAR(255),
    top BOOLEAN NOT NULL DEFAULT FALSE,
    id_specialite INT NOT NULL,

    CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (id_specialite)
    REFERENCES specialite(id_specialite)
);
