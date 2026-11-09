
-- ==========================================
-- PROJET : TROUVE TON ARTISAN
-- SCRIPT 03 : REQUETES DE VERIFICATION
-- ==========================================

USE trouve_ton_artisan;

-- REQUETE 1 : VERIFIER LE NOMBRE D'ARTISANS

SELECT COUNT(*) AS total_artisans
FROM artisan;

-- ==========================================
-- REQUETE 2 : LES ARTISANS DU MOIS
-- ==========================================

SELECT nom, note, ville
FROM artisan
WHERE top = TRUE;

-- ==========================================
-- REQUETE 3 : ARTISANS ET LEURS SPECIALITES
-- ==========================================

SELECT
    a.nom AS artisan,
    s.nom_specialite AS specialite,
    c.nom_categorie AS categorie
FROM artisan a
INNER JOIN specialite s
    ON a.id_specialite = s.id_specialite
INNER JOIN categorie c
    ON s.id_categorie = c.id_categorie
ORDER BY a.nom;
