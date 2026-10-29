import csv, sys
OUT = sys.argv[1]
WD = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']   # hypothesis: J = lundi
OBJ = {'C': ('Curiosité', 'Vues, commentaires, partages'),
       'R': ('Révélation', 'Abonnés gagnés, clics vers le store'),
       'J': ('Événement', 'Installations, inscriptions, 1res courses'),
       'E': ('Essai', '1res courses, liens d\'invitation utilisés, liens « Partager mon trajet » créés'),
       'H': ('Habitude', 'Courses répétées, annonces NOVOJA publiées, commandes Market'),
       'K': ('Communauté', 'Lieux ajoutés, participants aux défis, commerçants validés, chauffeurs actifs')}
CH = 'Recrutement chauffeurs : chauffeurs inscrits'
CM = 'Commerçants : boutiques créées et validées'
VS, DF, MT, DC = 'Version store', 'Défis activés + budget', 'Montants chauffeur Bénin', 'Décaissement MTN'
# (jour, plateforme, contenu, heure, objectif, indicateur spécifique ou None, dépendance)
R = [
 (-14, 'TikTok + Facebook', 'n° 30 — Énigme #1 « Bientôt, une appli béninoise va tout changer » (sans le nom)', '19 h', 'C', None, ''),
 (-13, 'Facebook + statut WhatsApp', 'Devine le quartier #1 (un repère d\'Akpakpa en gros plan)', '12 h', 'C', None, ''),
 (-12, 'TikTok + Reels', 'n° 30 — Énigme #2 (un carrefour de Cotonou, une question)', '19 h', 'C', None, ''),
 (-11, 'Instagram + Facebook', 'Coulisses de l\'équipe (sans le nom ni le logo)', '18 h', 'C', None, ''),
 (-10, 'Facebook + statut WhatsApp', 'Devine le quartier #2 (Abomey-Calavi)', '12 h', 'C', None, ''),
 (-9, 'TikTok + Reels', 'n° 30 — Énigme #3 « Ce que Cotonou ne savait pas encore… »', '19 h', 'C', None, ''),
 (-8, 'Facebook + Instagram', 'Devine le quartier #3 (Porto-Novo) + « Demain, on vous dit tout »', '18 h', 'C', None, ''),
 (-7, 'TikTok + Instagram + Facebook', 'n° 31 — « Elle s\'appelle OJA » (OJA dit en fon, yoruba, mina, français)', '19 h', 'R', None, ''),
 (-7, 'Facebook', 'Vidéo COMING SOON concept 1 « Quelque chose arrive au Bénin » (déjà produite)', '12 h', 'R', None, ''),
 (-6, 'Facebook', 'n° 26 — « Chaque jour, ta ristourne grimpe » (recrutement chauffeurs)', '6 h 30', 'R', CH, MT),
 (-6, 'TikTok', 'n° 33 — « OJA dans ma langue » (sketch en fon sous-titré)', '19 h', 'R', None, ''),
 (-5, 'Facebook + Instagram', 'n° 22 — « Maman Tanti met sa boutique sur OJA » (script 22)', '12 h', 'R', CM, ''),
 (-5, 'TikTok + Reels', 'Vidéo COMING SOON concept 6 « Ils ne savent pas encore » (déjà produite)', '19 h', 'R', None, ''),
 (-4, 'Facebook', 'n° 27 — « Zone chaude près de toi » (recrutement chauffeurs)', '6 h 30', 'R', CH, ''),
 (-4, 'TikTok + Reels', 'n° 1 — « Le prix, avant de monter » (script 01, 30 s)', '19 h', 'R', None, ''),
 (-3, 'Facebook + Instagram', 'n° 24 — « Tes clients te trouvent même sans connaître ton nom »', '12 h', 'R', CM, ''),
 (-3, 'TikTok + Facebook', 'Vidéo COMING SOON concept 2 « Et si tout était plus simple ? » (déjà produite)', '19 h', 'R', None, ''),
 (-2, 'Facebook', 'n° 29 — « Je vois tout ce que je gagne » (relevé chauffeur)', '6 h 30', 'R', CH, ''),
 (-2, 'TikTok + Reels', 'n° 3 — « Même trajet, 25 % moins cher » (OJA Partage)', '19 h', 'R', None, ''),
 (-1, 'Statut WhatsApp + Facebook', '« Demain. » + lieux des stands (UAC, Dantokpa)', '12 h', 'R', None, ''),
 (-1, 'TikTok + Instagram + Facebook', 'Vidéo COMING SOON concept 3 « Le compte à rebours » (déjà produite)', '20 h', 'R', None, ''),
 (0, 'Facebook Live + TikTok Live', 'n° 32 — Live « Premier client à Cotonou » + stands UAC et Dantokpa', '8 h', 'J', None, VS + ' ; ' + DF),
 (0, 'TikTok + Instagram + Facebook', 'n° 9 — « Ma première course m\'a coûté la moitié » (script 09)', '11 h', 'J', None, DF),
 (0, 'Facebook + statut WhatsApp', 'n° 5 — « Maman, suis-moi en direct » (script 05)', '15 h', 'J', None, VS),
 (0, 'TikTok + Instagram + Facebook', 'Pub OJA Market « Tout ce que vous aimez » (déjà produite)', '19 h', 'J', None, ''),
 (1, 'Facebook', 'n° 2 — « Il t\'a demandé plus d\'argent ? Dis-le à OJA. »', '12 h', 'E', None, ''),
 (1, 'TikTok + Reels', 'n° 6 — « Ta sœur prend un zem au bord de la route ? » (Suivez-moi)', '19 h', 'E', None, VS),
 (2, 'Facebook + Instagram', 'n° 1 — « Le prix, avant de monter » (version Facebook 4:5)', '12 h', 'E', None, ''),
 (2, 'TikTok + Reels', 'n° 14 — « Invite ta bande » + challenge « Qui fait monter le plus d\'amis ? »', '19 h', 'E', None, VS + ' ; ' + DF),
 (3, 'Facebook + Instagram', 'n° 19 — « Commandé à 11 h, livré à 12 h 30 pile » (livraison programmée)', '11 h', 'E', None, ''),
 (3, 'TikTok + Reels', 'n° 20 — « En retard ? OJA te paie » (−10 % sur la prochaine)', '19 h', 'E', None, ''),
 (4, 'Facebook', 'n° 28 — « Tu finis une course, la suivante t\'attend à côté » (course relais)', '6 h 30', 'E', CH, VS),
 (4, 'TikTok + Reels', 'n° 9 — Réaction d\'un 2e nouvel utilisateur (accord écrit)', '19 h', 'E', None, DF),
 (5, 'Facebook', 'n° 5 — « Maman, suis-moi en direct » (version longue 45 s)', '12 h', 'E', None, VS),
 (5, 'Facebook + Instagram', 'n° 23 — « C\'est mon commerce » (ta fiche t\'appartient)', '18 h', 'E', CM, VS),
 (6, 'Statut WhatsApp', 'n° 6 — Extrait « Suivez-moi » (8 s)', '7 h', 'E', None, VS),
 (6, 'TikTok', 'n° 14 — Résultats du challenge « Invite ta bande »', '19 h', 'E', None, VS + ' ; ' + DF),
 (7, 'Facebook + Instagram', 'n° 10 — Lancement du 1er Défi de quartier « 50 lieux à Akpakpa »', '12 h', 'E', None, DF),
 (7, 'TikTok + Reels', 'n° 2 — « Il t\'a demandé plus ? Dis-le. » (version 15 s)', '19 h', 'E', None, ''),
 (8, 'Facebook', 'Série « Histoires de route » #1 — n° 8 « Le moteur a lâché en pleine course »', '12 h', 'H', None, ''),
 (8, 'TikTok', 'n° 13 — « 4 semaines d\'affilée : −15 % » (série de semaines, max 500 F)', '19 h', 'H', None, DF),
 (9, 'Facebook + Instagram', 'Série « Vendu sur NOVOJA » #1 — n° 15 « Ce frigo dormait dans ma cour » (script 15)', '12 h', 'H', None, DC),
 (9, 'TikTok + Reels', 'n° 16 — « J\'ai payé, mais l\'argent attend que je reçoive l\'objet »', '19 h', 'H', None, ''),
 (10, 'Facebook + Instagram', 'Série « Commerçant vedette » #1', '12 h', 'H', CM, ''),
 (11, 'Facebook', 'Série « Chauffeur héros » #1', '6 h 30', 'H', CH, MT),
 (11, 'TikTok + Reels', 'n° 21 — « Ton colis traverse Cotonou pendant que tu travailles »', '19 h', 'H', None, ''),
 (12, 'TikTok + Reels', 'Série « OJA dans ma langue » #1', '11 h', 'H', None, ''),
 (13, 'Facebook', 'n° 10 — « J\'ai gagné une réduction parce que je connais mon quartier » (point d\'étape Akpakpa)', '17 h', 'H', None, DF),
 (14, 'Facebook + TikTok', 'Série « Le prix de la semaine » #1', '12 h', 'H', None, ''),
 (14, 'Instagram + Facebook', 'n° 11 — Annonce du concours « Guides du mois »', '19 h', 'H', None, DF),
 (15, 'Facebook', 'Série « Histoires de route » #2', '12 h', 'K', None, ''),
 (16, 'Facebook + Instagram', 'Série « Vendu sur NOVOJA » #2', '12 h', 'K', None, ''),
 (17, 'Facebook + Instagram', 'Série « Commerçant vedette » #2', '12 h', 'K', CM, ''),
 (18, 'Facebook', 'Série « Chauffeur héros » #2', '6 h 30', 'K', CH, MT),
 (19, 'TikTok + Reels', 'Série « OJA dans ma langue » #2', '11 h', 'K', None, ''),
 (20, 'Facebook + Instagram', 'Défi de quartier Akpakpa : résultats et carte des lieux ajoutés', '17 h', 'K', None, DF),
 (21, 'Facebook + TikTok', 'Série « Le prix de la semaine » #2', '12 h', 'K', None, ''),
 (22, 'Facebook', 'Série « Histoires de route » #3', '12 h', 'K', None, ''),
 (23, 'Facebook + Instagram', 'Série « Vendu sur NOVOJA » #3 — n° 17 « Je l\'ai donné. Quelqu\'un en avait besoin. » (dons)', '12 h', 'K', None, ''),
 (24, 'Facebook + Instagram', 'Série « Commerçant vedette » #3', '12 h', 'K', CM, ''),
 (25, 'Facebook', 'Série « Chauffeur héros » #3', '6 h 30', 'K', CH, MT),
 (26, 'TikTok + Reels', 'Série « OJA dans ma langue » #3', '11 h', 'K', None, ''),
 (27, 'Facebook + Instagram', 'n° 18 — « Vendu, livré par OJA » (témoignage réel, accord écrit)', '17 h', 'K', None, ''),
 (28, 'Facebook + TikTok', 'Série « Le prix de la semaine » #3', '12 h', 'K', None, ''),
 (29, 'Facebook', 'Série « Histoires de route » #4', '12 h', 'K', None, ''),
 (30, 'Facebook + Instagram + TikTok', 'Série « Le Guide du mois » — n° 11, les 3 champions (avec leur accord)', '19 h', 'K', None, DF),
]
rows = []
for d, pf, ct, h, o, ind, dep in R:
    rel = 'J' if d == 0 else (f'J{d:+d}')
    rows.append([rel, WD[d % 7], pf, ct, h, OBJ[o][0], ind or OBJ[o][1], dep or 'aucune'])
H = ['Date relative', 'Jour (si J = lundi)', 'Plateforme', 'Contenu (n° d\'idée ou série)', 'Heure conseillée', 'Objectif', 'Indicateur', 'Dépendance']
with open(OUT + '/calendrier.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f); w.writerow(H); w.writerows(rows)
md = ['# Calendrier détaillé J-14 → J+30 (prompt 04)', '',
      'Hypothèse du kit : **J = jour où la nouvelle version est sur les stores ET où les Défis sont activés au Bénin.** La colonne « Jour » suppose que J tombe un lundi (pour caler les séries hebdomadaires) ; si J tombe un autre jour, décaler les séries, pas les dates relatives.',
      '', 'Heures : conseils de départ (Facebook à midi et le soir, TikTok le soir, chauffeurs tôt le matin avant le service). À ajuster après deux semaines selon les statistiques de chaque page.',
      '', 'Les vidéos « déjà produites » sont celles du dossier `motion/` (campagne COMING SOON et pub OJA Market). Version CSV : `calendrier.csv`.', '',
      '| ' + ' | '.join(H) + ' |', '|' + '---|' * len(H)]
md += ['| ' + ' | '.join(r) + ' |' for r in rows]
md += ['', '## Actions hors ligne (rappel du kit)', '- J-7 : chauffeurs en gilet et casque OJA aux carrefours clés.', '- J : stands au campus (UAC) et à Dantokpa : installation de l\'appli + code d\'invitation des ambassadeurs.', '- J+7 : premier Défi de quartier (Akpakpa).']
open(OUT + '/calendrier.md', 'w', encoding='utf-8').write('\n'.join(md) + '\n')
print(len(rows), 'lignes')
