-- ==========================================
-- PROJET : TROUVE TON ARTISAN
-- SCRIPT 02 : INSERTION DES DONNEES
-- ==========================================

USE trouve_ton_artisan;

-- ==========================================
-- INSERTION DES 4 CATEGORIES
-- ==========================================

INSERT INTO categorie (nom_categorie)
VALUES
    ('Bâtiment'),
    ('Services'),
    ('Fabrication'),
    ('Alimentation');

-- ==========================================
-- INSERTION DES 15 SPECIALITES
-- ==========================================

INSERT INTO specialite (nom_specialite, id_categorie)
VALUES
    ('Chauffagiste', 1),
    ('Electricien', 1),
    ('Menuisier', 1),
    ('Plombier', 1),
    ('Coiffeur', 2),
    ('Fleuriste', 2),
    ('Toiletteur', 2),
    ('Webdesign', 2),
    ('Bijoutier', 3),
    ('Couturier', 3),
    ('Ferronier', 3),
    ('Boucher', 4),
    ('Boulanger', 4),
    ('Chocolatier', 4),
    ('Traiteur', 4);

-- ==========================================
-- INSERTION DES 17 ARTISANS
-- ==========================================

SET @description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ';

INSERT INTO artisan
(nom, note, ville, a_propos, email, site_web, top, id_specialite)
VALUES
(
    'Boucherie Dumont',
    4.5,
    'Lyon',
    @description,
    'boucherie.dumond@gmail.com',
    NULL,
    FALSE,
    12
);
À retenir dans Word
- SET @description : prépare un texte réutilisable.
- NULL : signifie qu'aucun site web n'est renseigné.
- FALSE : cet artisan ne fait pas partie des artisans du mois.
- 12 : correspond à la spécialité Boucher.

-- ==========================================
-- INSERTION DES 16 AUTRES ARTISANS
-- ==========================================

INSERT INTO artisan
(nom, note, ville, a_propos, email, site_web, top, id_specialite)
VALUES
('Au pain chaud', 4.8, 'Montélimar', @description,
'aupainchaud@hotmail.com', NULL, TRUE, 13),

('Chocolaterie Labbé', 4.9, 'Lyon', @description,
'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', TRUE, 14),

('Traiteur Truchon', 4.1, 'Lyon', @description,
'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', FALSE, 15),

('Orville Salmons', 5.0, 'Evian', @description,
'o-salmons@live.com', NULL, TRUE, 1),

('Mont Blanc Eléctricité', 4.5, 'Chamonix', @description,
'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', FALSE, 2),

('Boutot & fils', 4.7, 'Bourg-en-bresse', @description,
'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', FALSE, 3),

('Vallis Bellemare', 4.0, 'Vienne', @description,
'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', FALSE, 4),

('Claude Quinn', 4.2, 'Aix-les-bains', @description,
'claude.quinn@gmail.com', NULL, FALSE, 9),

('Amitee Lécuyer', 4.5, 'Annecy', @description,
'a.amitee@hotmail.com', 'https://lecuyer-couture.com', FALSE, 10),

('Ernest Carignan', 5.0, 'Le Puy-en-Velay', @description,
'e-carigan@hotmail.com', NULL, FALSE, 11),

('Royden Charbonneau', 3.8, 'Saint-Priest', @description,
'r.charbonneau@gmail.com', NULL, FALSE, 5),

('Leala Dennis', 3.8, 'Chambéry', @description,
'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', FALSE, 5),

('C''est sup''hair', 4.1, 'Romans-sur-Isère', @description,
'sup-hair@gmail.com', 'https://sup-hair.fr', FALSE, 5),

('Le monde des fleurs', 4.6, 'Annonay', @description,
'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', FALSE, 6),

('Valérie Laderoute', 4.5, 'Valence', @description,
'v-laredoute@gmail.com', NULL, FALSE, 7),

('CM Graphisme', 4.4, 'Valence', @description,
'contact@cm-graphisme.com', 'https://cm-graphisme.com', FALSE, 8);
