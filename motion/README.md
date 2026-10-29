# OJA Transport — Motion design (lancement Bénin)

Vidéo de présentation en motion design de 65 s, 1920×1080, calée sur la voix off fournie.

- **Vidéo finale :** `OJA_Motion_Benin.mp4` (voix off + musique + sound design)
- **Source :** `index.html`. L'animation est entièrement codée : chaque image est une fonction pure du temps (`renderAt(t)`), ce qui garantit un rendu identique à chaque fois.
- **Aperçu en direct :** ouvrir `index.html?play` dans Chrome via un petit serveur local (`npx serve motion`), puis cliquer pour lancer avec le son.

## Découpage (synchronisé sur la voix off)

| Temps | Voix off | Visuel |
|---|---|---|
| 0–3 s | « Besoin de vous déplacer ? Avec OJA, vous avez le choix. » | Place de l'Amazone (Cotonou) : pin sur la statue, voiture OJA qui entre, logo |
| 3–9 s | Réserver, trajet, option | Téléphone avec l'écran réel « Choisissez votre course » |
| 9–14 s | Voiture, moto, tricycle / budget | Cartes véhicules (vraie voiture, moto et tricycle OJA détourés), curseur de budget |
| 14–22 s | Formule ÉCO, trajet partagé | Tampon ÉCO, covoiturage, prix 8 130 → 6 100 XOF |
| 22–33 s | Destination, recherche, géolocalisation | Recherche « Marché Dantokpa », carte de Cotonou, trajet |
| 33–37 s | « Vous avez un colis à envoyer ? » | Chute du colis, zoom de transition |
| 37–52 s | Livraison | Appli chauffeur (interrupteur Livraison), cas d'usage, suivi de A à Z |
| 52–56 s | Transport ou livraison | Écran partagé |
| 56–61 s | « OJA — déplacez-vous, envoyez, livrez simplement » | Coupes nettes aux couleurs du drapeau béninois |
| 61–65 s | « Téléchargez OJA… » | Écran de fin, stores, « Bientôt au Bénin » |

## Refaire le rendu

Il faut Node.js avec Playwright (Chromium) et ffmpeg.

```bash
node render.js 30 0 1965 video.mp4 ffmpeg     # images 0 → 1965 à 30 i/s
ffmpeg -i video.mp4 -i assets/soundtrack.m4a -c:v copy -c:a copy -shortest OJA_Motion_Benin.mp4
```

## Visuels

- `assets/car.png`, `assets/moto.png`, `assets/moto_course.png`, `assets/tricycle.png` : détourés à partir des visuels de campagne OJA.
- `assets/amazone.jpg` : Place de l'Amazone, photo © Présidence du Bénin (crédit affiché dans la vidéo).

---

# OJA Chauffeur — recrutement (61 s)

Deuxième film, calé sur la voix off « Avec OJA, transformez chaque déplacement en opportunité ».

- **Vidéo :** `OJA_Chauffeur_Benin.mp4`
- **Source :** `chauffeur.html` (même moteur que `index.html`)
- **Rendu :** `PAGE=chauffeur.html node render.js 60 0 3672 video.mp4 ffmpeg`, puis multiplexer avec `assets/soundtrack_chauffeur.m4a`

| Temps | Voix off | Visuel |
|---|---|---|
| 0–4 s | Avec OJA, transformez chaque déplacement en opportunité | Statue équestre sur ciel bleu (parallaxe), voiture OJA, gains qui montent |
| 4–7 s | Voiture, moto, tricycle ou vélo ? | 4 cartes véhicules |
| 7–10 s | Rejoignez OJA, choisissez votre façon de travailler | Chauffeur OJA détouré sur fond orange |
| 10–18 s | Passagers, livraisons, ou combiner | Appli chauffeur : interrupteurs Livraison / Mode éco, trajets à vide ↓, opportunités ↑ |
| 18–24 s | Missions OJA Market et NOVOJA | Notifications de missions partenaires |
| 24–31 s | Option VIP, zones chaudes, priorité | Écran VIP réel, carte de chaleur de Cotonou |
| 31–38 s | Commission % ou forfait illimité 0 % | Deux cartes, compteur 20 % → 0 % |
| 38–47 s | Journalier / hebdo / mensuel, paiement Mobile Money (MoMo) | Forfaits, paiement, « Forfait activé » |
| 47–54 s | Voiture, moto, tricycle, vélo · Passagers, colis, Market, NOVOJA, VIP | Coupes aux couleurs du Bénin, puces services |
| 54–61 s | Roulez, pédalez, livrez, gagnez · Rejoignez OJA | Tagline, écran de fin (statue + chauffeur) |

Thème distinct du premier film : ciel bleu, bleu nuit et or au lieu du crème et du noir. `assets/statue.png` et `assets/sky.jpg` viennent de la photo © Présidence du Bénin (crédit affiché).

---

# OJA Market — restaurants & commerces (55 s)

Troisième film, calé sur la voix off « Vos restaurants préférés sont maintenant à portée de main ».

- **Vidéo :** `OJA_Market_Benin.mp4`
- **Source :** `market.html` (même moteur). Les écrans d'appli sont recréés en HTML (données du Bénin, prix en XOF) dans des iPhone 3D animés.
- **Rendu :** `PAGE=market.html node render.js 60 0 3300 video.mp4 ffmpeg`, puis multiplexer avec `assets/soundtrack_market.m4a`

| Temps | Voix off | Visuel |
|---|---|---|
| 0–5 s | Vos restaurants préférés… en un seul clic avec OJA Market | iPhone qui pivote, plats en orbite, tap sur Market |
| 5–8 s | Envie de votre plat préféré ? Plus besoin de vous déplacer | Plats en stickers, livreur OJA vers la maison |
| 8–15 s | Ouvrez, découvrez, choisissez, commandez, faites-vous livrer | 5 étapes, l'iPhone pivote d'écran en écran (accueil, menu, paiement, suivi) |
| 15–19 s | Quartier, fast food, cuisine locale, bonnes adresses | 4 cartes qui se retournent |
| 19–23 s | Retrouvez vos restaurants préférés | Favoris (cœurs) sur l'iPhone |
| 23–30 s | Réseau de livraison OJA · vélo, moto, tricycle, voiture | Carte réseau animée, véhicules réels |
| 30–37 s | Boutiques, commerces, produits près de chez vous | Onglet Magasins, produits en stickers |
| 37–40 s | Un restaurant ? Un produit ? Une envie ? À un clic | Coupes rapides |
| 40–48 s | Commandez local… OJA Market · à portée de clic | Pin Bénin, logo, trois iPhone en éventail |
| 48–55 s | OJA. Le local devient visible | Logo animé (carte, pin, traits), boutons de téléchargement |

Les noms de restaurants et les prix sont des exemples. Logo découpé en calques `mk_map.png`, `mk_pin.png`, `mk_streak.png`.

---

# NOVOJA — objets d'occasion (58,5 s)

Quatrième film, calé sur la voix off « Vous avez des objets que vous n'utilisez plus ? ».

- **Vidéo :** `NOVOJA_Benin.mp4`
- **Source :** `novoja.html` (même moteur et mêmes iPhone 3D que `market.html`), aux couleurs OJA (orange et noir chaud)
- **Rendu :** `PAGE=novoja.html node render.js 60 0 3510 video.mp4 ffmpeg`, puis multiplexer avec `assets/soundtrack_novoja.m4a`

| Temps | Voix off | Visuel |
|---|---|---|
| 0–3 s | Des objets inutilisés ? Ne les jetez pas ! | Objets qui tombent vers la poubelle et rebondissent |
| 3–6 s | Une seconde vie avec NOVOJA | Anneau de recyclage, logo NOVOJA |
| 6–11 s | Donner ou revendre autour de vous | iPhone fil d'annonces, badges Don / À vendre, distances |
| 11–17 s | Téléphones, meubles, vêtements… | 7 cartes catégories synchronisées |
| 17–20 s | Publiez en quelques clics | Écran de publication (saisie, prix, « Annonce publiée ») |
| 20–26 s | Bonne affaire ? Parcourez, achetez | Étiquette, fil puis fiche objet en rotation 3D |
| 26–34 s | Paiement sécurisé | Discussion, négociation, MTN MoMo, fonds protégés |
| 34–40 s | Besoin d'une livraison ? | Trajet vendeuse → acheteur, livreur OJA, « Objet reçu » |
| 40–50 s | Vendez, donnez, achetez malin · nouvelle vie | Coupes de couleur, trois iPhone en éventail |
| 50–58 s | NOVOJA avec OJA, le local devient visible | Logo animé, anneau de recyclage, boutons de téléchargement |

---

# OJA Merchant — commerçants & restaurants (59,5 s)

Cinquième film, calé sur la voix off « Vous êtes restaurateur, commerçant ou vendeur ? ».

- **Vidéo :** `OJA_Merchant_Benin.mp4`
- **Source :** `merchant.html` (même moteur et mêmes iPhone 3D). Thème clair nacré premium (maillage pêche/orange, grille fine), scènes sombres pour l'impact.
- **Rendu :** `PAGE=merchant.html node render.js 60 0 3570 video.mp4 ffmpeg`, puis multiplexer avec `assets/soundtrack_merchant.m4a`

| Temps | Voix off | Visuel |
|---|---|---|
| 0–2 s | Restaurateur, commerçant ou vendeur ? | Coupes typographiques rapides, balayage de lumière |
| 2–5 s | Faites grandir votre activité avec OJA Merchant | Barres et courbe de croissance, logotype |
| 5–12 s | Écosystème OJA, visible sur OJA Market | Tableau de bord marchand relié à Market, clients, livreurs, paiements, NOVOJA |
| 12–16 s | Produits, prix, stocks | Catalogue, formulaire « Nouveau produit », prix et stock animés |
| 16–19 s | Recevez et suivez vos commandes | Tickets de commande aspirés dans l'iPhone |
| 19–26 s | Nouvelle commande, préparation, livraison | Notification, accepter, en préparation, prête, livreur, livrée |
| 26–33 s | Paiements, ventes, opérations | Revenus (compteur), cartes en verre, courbe de chiffre d'affaires |
| 33–38 s | Restaurants, boutiques… commerce de quartier | 7 cartes qui se retournent |
| 38–43 s | Vendre plus, plus de clients | Commerce au centre, clients qui apparaissent, compteur |
| 43–47 s | Moins de complications, plus de visibilité, d'opportunités | Coupes −/+ |
| 47–52 s | Votre commerce dans votre poche | Cinq iPhone alignés en arc |
| 52–59,5 s | OJA. Le local devient visible | Logo OJA Marketplace assemblé pièce par pièce, reflet, boutons de téléchargement |

---

# OJA — « Le local devient visible » : commerces sur la carte (62 s)

Sixième film, calé sur la voix off « Vous avez une boutique, un atelier, un salon… ».

- **Vidéo :** `OJA_Commerces_Benin.mp4`
- **Source :** `places.html` (même moteur et mêmes iPhone 3D)
- **Rendu :** `PAGE=places.html node render.js 60 0 3720 video.mp4 ffmpeg`, puis multiplexer avec `assets/soundtrack_places.m4a`

| Temps | Voix off | Visuel |
|---|---|---|
| 0–4,5 s | Boutique, atelier, salon, restaurant ? | Façades de commerces illustrées, « Vous avez un commerce ? » |
| 4,5–7 s | Faites-vous enfin voir avec OJA | Plein orange, pin qui tombe et zoome |
| 7–13,5 s | Sur la carte, découverte autour de vous | iPhone carte de Cotonou, pins, « Chez Aïcha », utilisateurs reliés |
| 13,5–23 s | Ouvrez OJA, nom, activité, emplacement, infos, photos | Écran réel « Enregistrer un lieu » rempli étape par étape |
| 23–31 s | Les utilisateurs vous trouvent | Recherche « Restaurant autour de moi », résultats, fiche du lieu, retour au commerce |
| 31–44 s | Coiffeur, couturier… même sans site internet | 8 métiers, convergence vers une carte remplie de pins |
| 44–49 s | Plus de visibilité, plus de chances d'être découvert | Commerce entouré d'utilisateurs, cercles de découverte |
| 49–54 s | Existe dans votre quartier → sur la carte | Rue → ville → carte, le pin s'illumine parmi les autres |
| 54–62 s | Ajoutez votre commerce sur OJA · OJA, le local devient visible | Pin → tracé de carte → logo OJA, boutons de téléchargement |

Photos réelles : marché (`biz_market`, `biz_epicerie`, `biz_etal`), panneau de vulcanisation (`biz_vulca`), vendeuse de fruits (`biz_fruits`, © Présidence du Bénin, crédit affiché). Les autres métiers (coiffeur, couturier, restaurant, boutique, artisan) restent illustrés. Écran client recréé d'après la capture de l'accueil OJA (catégories, bannière, cartes « Près de vous »). Les noms (Chez Aïcha, etc.) sont des exemples.

---

# OJA Mascotte — tutoriel « Ajouter un lieu » (9:16, 57 s)

Voir `MASCOTTE_TIMELINE.md` (transcription, découpage scène par scène, lip-sync).

---

# OJA Mascotte — « Dans les rues de Cotonou » (16:9, 60,5 s)

Film tourné avec Google Flow (8 clips Veo de 8 s, prompts dans `PROMPTS_GOOGLE_FLOW_COTONOU.md`), puis monté et habillé en motion design.

- **Vidéo :** `OJA_Mascotte_Cotonou.mp4` (1920 × 1080, 24 i/s)
- **Sources :** clips dans `clips_cot/` (`cot1` à `cot8`), page `cotonou.html`, écrans OJA dans `assets/cot_ui/`
- **Rendu :**
  1. `python3 cot_frames.py` : génère le fond image par image dans `assets/cot/` et remplace les écrans verts des téléphones par les vrais écrans OJA (`cot_phone.py`).
  2. `PAGE=cotonou.html node render.js 24 0 1452 video.mp4 ffmpeg`.
  3. Multiplexer avec `assets/soundtrack_cotonou.m4a` (voix des clips + musique + bruitages, −14 LUFS).

| Temps | Clip | Réplique de la mascotte | Habillage |
|---|---|---|---|
| 0–8 s | cot1 | Salut ! Moi, c'est ton guide OJA. (« Cotonou » coupé : le film parle à tout le Bénin) | Atterrissage, étiquette « Bienvenue au Bénin 🇧🇯 », petit zoom à la coupe |
| 8–14,2 s | cot2 | Tu as faim ? Cherche un restaurant sur OJA ! | Chapitre 01 · Trouver un restaurant ; écran OJA Market incrusté dans le téléphone, défilement jusqu'à « Maquis Chez Tanti » ♥ |
| 14,2–21,3 s | cot3 | Les maquis autour de toi, avec les avis et le chemin. | Carte « Maquis Chez Tanti · ★ 4.9 · Ouvert » |
| 21,3–28,5 s | cot4 | Besoin de bouger ? Commande une moto ou une voiture sur OJA. | Chapitre 02 · Commander une course ; vraie capture « Choisissez votre course » incrustée |
| 28,5–35 s | cot5 | Ton chauffeur arrive, et tu suis ta course en direct. | Carte « Chauffeur en route », compte à rebours et barre de progression |
| 35–37,8 s | cot6 | — | Chapitre 03 · Trouver un artisan ; la moto en panne |
| 37,8–41,3 s | (graphique) | Une panne ? Trouve un artisan près de chez toi. | iPhone 3D : recherche « Vulcanisation », pins, fiche « Vulcanisation Qui Sait l'Avenir » (photo réelle) |
| 41,3–44,3 s | cot7 | — | Réparation chez le vulcanisateur |
| 44,3–47,6 s | (graphique) | Mécaniciens, couturiers, coiffeurs… | Trois cartes métiers |
| 47,6–49 s | cot7 | … tes artisans sont sur OJA. | Check entre la mascotte et les artisans |
| 49–55,5 s | cot8 | OJA. Le local devient visible. | Tout le monde réuni, la mascotte s'envole |
| 55,5–60,5 s | cot8 (ciel) | — | Logo OJA tracé dans le ciel, App Store / Google Play, « Télécharge OJA » |

Sur les plans 6 et 7, Veo a donné à la mascotte un visage-écran noir pendant ses répliques. Ces passages sont donc remplacés par des graphiques OJA, et la voix continue par-dessus.

---

# OJA Mascotte — « Le tour du Bénin » (16:9, 60,5 s)

La mascotte fait le tour du Bénin, du sud au nord. Le film combine 6 clips Google Flow (`clips_bj/`, prompts dans `PROMPTS_GOOGLE_FLOW_BENIN.md`), une carte animée du Bénin (vraies frontières), les vraies photos des villes (`assets/bj/ph_*.jpg`) et une voix ElevenLabs pour les villes sans clip.

- **Vidéo :** `OJA_Mascotte_TourDuBenin.mp4` (1920 × 1080, 24 i/s)
- **Rendu :**
  1. `python3 bj_frames.py` : génère les images des clips dans `assets/bjf/` et remplace les écrans verts des téléphones par les écrans OJA.
  2. `PAGE=benin.html node render.js 24 0 1452 video.mp4 ffmpeg`.
  3. Multiplexer avec `assets/soundtrack_benin.m4a`.

| Temps | Source | Voix | Visuel |
|---|---|---|---|
| 0–7,6 s | bj1 | Salut ! Aujourd'hui, je fais le tour du Bénin avec OJA ! | Cotonou, la mascotte s'envole |
| 7,6–13 s | bj2 | — | Survol de Ganvié, les pêcheurs saluent |
| 13–14,6 s | Carte | — | Cotonou → Ganvié → Porto-Novo, photo de la ville |
| 14,6–20,6 s | bj3 | À Porto-Novo, ta moto OJA arrive en quelques minutes. | Étudiant, zémidjan ; écran « Choisissez votre course » incrusté |
| 20,6–26,6 s | Carte + bj4 | À Calavi, tes repas sont livrés jusqu'au campus ! | Photo de l'UAC, puis la mascotte sur le campus (écran OJA Market incrusté) et le livreur qui remet les repas ; légende incrustée par Veo effacée |
| 26,6–34,8 s | Carte + bj5 | À Ouidah, découvre les lieux à visiter et les bonnes adresses autour de toi. | Photo de la Porte du Non-Retour, puis le couple ; écran « Près de vous » incrusté |
| 34,8–43 s | Carte + bj6 | À Abomey, nos artisans sont visibles sur la carte OJA. | Statue de Béhanzin, puis l'artisane des tentures ; carte OJA « Tentures d'Abomey » incrustée |
| 43–48,8 s | Carte + graphique | À Parakou, envoie tes marchandises en tricycle. (ElevenLabs) | Marché Arzèkè, écran de course avec « Tricycle » sélectionné, tricycle qui traverse |
| 48,8–55,2 s | Carte | Du sud au nord, OJA est partout au Bénin. (ElevenLabs) | Natitingou (Tata Somba), puis tout le Bénin avec les 6 photos |
| 55,2–60,5 s | Logo | OJA, le local devient visible. (ElevenLabs) | Logo OJA, App Store / Google Play, « Télécharge OJA » |

---

# OJA Mascotte — tutoriel « Créer son compte chauffeur » (9:16, 64,5 s)

La mascotte guide l'inscription chauffeur, étape par étape, avec les écrans de l'app recréés d'après les captures et remplis avec des données d'exemple (Koffi Agossou, Toyota Corolla, AB 1234 RB).

- **Vidéo :** `OJA_Mascotte_CompteChauffeur_9x16.mp4` (1080 × 1920, 30 i/s)
- **Sources :** page `chauffeur_tuto.html`, voix ElevenLabs `assets/chf/voix_chauffeur.mp3`
- **Rendu :**
  1. Préparer la mascotte avec `python3 key_clips.py`.
  2. `VW=1080 VH=1920 PAGE=chauffeur_tuto.html node render.js 30 0 1935 video.mp4 ffmpeg`.
  3. Multiplexer avec `assets/soundtrack_chauffeur_tuto.m4a`.

| Temps | Voix | Écran / visuel |
|---|---|---|
| 0–5,6 s | Hé ! Tu veux gagner de l'argent… je te montre comment créer ton compte chauffeur. | Mascotte, voiture et moto réelles, pièces |
| 5,6–9 s | Ouvre OJA Transport, appuie sur « Je suis chauffeur » | Écran « Oja Transport » (passager / chauffeur) |
| 9–15,6 s | Première étape : nom complet et numéro, puis « Suivant » | « Devenir chauffeur » – Étape 1/2 |
| 15,6–24,9 s | Type de véhicule, modèle, plaque, couleur | « Véhicule & identité » – menu Moto / Voiture / Tricycle |
| 24,9–28,5 s | Pièce d'identité et permis | Validation d'identité, photos ajoutées ✓ |
| 28,5–34,7 s | Carte grise, visite technique, assurance, TVM | Documents du véhicule ✓ |
| 34,7–39,9 s | Vue avant et vue arrière, plaque visible | Photos du véhicule ✓ |
| 39,9–44 s | Astuce : photos claires = validation plus rapide | Carte « Astuce » floue / nette |
| 44–46,7 s | Tout est bon ? Envoie ton dossier | Bouton « Envoyer mon dossier » (recréé), puis « Dossier envoyé » |
| 46,7–50,7 s | L'équipe OJA vérifie, puis active le compte | Vérifications ✓, « Compte chauffeur activé » |
| 50,7–54,6 s | Mets-toi disponible, reçois tes premières courses | Accueil chauffeur : EN LIGNE, nouvelle demande |
| 54,6–59,3 s | Ton véhicule est prêt ? Ton dossier aussi ? On se retrouve sur la route ! | Mascotte, voiture et moto qui passent |
| 59,3–64,5 s | OJA. Ta mobilité, ton opportunité. | Logo, App Store / Google Play, « Deviens chauffeur OJA » |

---

# OJA Mascotte — tutoriel « Commander une course » (passager, 9:16, 84 s)

La mascotte guide le parcours passager complet. Les écrans sont recréés d'après les captures de l'app, avec des données d'exemple : une destination à Cotonou et le chauffeur « Rodrigue ».

- **Vidéo :** `OJA_Mascotte_CommanderUneCourse_9x16.mp4` (1080 × 1920, 30 i/s)
- **Sources :** page `passager_tuto.html`, voix ElevenLabs `assets/pas/voix_passager.mp3`
- **Rendu :**
  1. Préparer la mascotte avec `python3 key_clips.py`.
  2. `VW=1080 VH=1920 PAGE=passager_tuto.html node render.js 30 0 2520 video.mp4 ffmpeg`.
  3. Multiplexer avec `assets/soundtrack_passager_tuto.m4a`.

| Temps | Étape | Écran |
|---|---|---|
| 0–5,3 s | Accroche | Mascotte, moto, tricycle et voiture réels |
| 5,3–9 s | Ouvre OJA Transport | « Je suis passager » |
| 9–10,6 s | Destination | « Où allez-vous ? » (recréé) |
| 10,6–16,5 s | Choix de la course | « Choisissez votre course » : moto, tricycle, voiture, prix |
| 16,5–22 s | Paiement | « Comment voulez-vous payer ? » Espèces / Mobile Money |
| 22–35 s | Réservation | « Maintenant », choix de la date et de l'heure, « Confirmer la réservation », puis « Mes réservations » : EN ATTENTE → ACCEPTÉE, avec notification |
| 35–47,5 s | Pas de moto disponible | Voiture standard / de luxe, « M'avertir » |
| 47,5–53,4 s | Chauffeur en route | Note, arrivée en direct, « Appeler » |
| 53,4–59 s | Pendant le trajet | « Signaler un problème », puis fenêtre SOS |
| 59–70 s | Paie et note | « Course terminée », payer avec MTN MoMo, « Le chauffeur a-t-il demandé plus d'argent ? », étoiles |
| 70–78,6 s | Et voilà ! | Mascotte, véhicules |
| 78,6–84 s | Logo | « Ta mobilité, ton opportunité. », boutons de téléchargement |

---

# OJA — sketch « Je suis devant le gros arbre ! » (9:16, 40,5 s)

Sketch comique sur la fonction « enregistrer et retrouver un commerce sur la carte ».

- **Vidéo :** `OJA_Sketch_GrosArbre_9x16.mp4` (1080 × 1920, 24 i/s)
- **Sources :**
  - 6 clips Google Flow dans `clips_arbre/` (prompts dans `PROMPTS_GOOGLE_FLOW_ARBRE.md`) ;
  - voix ElevenLabs dans `assets/arbre/` : client, commerçant en 3 prises (la réplique la plus nette de chaque prise est utilisée), mascotte ;
  - mascotte tirée des clips fond vert c9, c10, c11, c7 et c8.
- **Rendu :**
  1. `python3 arbre_frames.py` : génère le fond image par image, l'écran partagé et les arrêts sur image.
  2. `python3 arbre_voices.py` : place les répliques et produit `assets/arbre/dialogue.wav`.
  3. `VW=1080 VH=1920 PAGE=arbre.html node render.js 24 0 972 video.mp4 ffmpeg`.
  4. Multiplexer avec `assets/soundtrack_arbre.m4a`.

| Temps | Plan | Réplique | Habillage |
|---|---|---|---|
| 0–3 s | ar1 | Client : « Allô ? Oui, je suis devant le gros arbre ! » | Sous-titre avec étiquette CLIENT |
| 3–6,2 s | ar2 | Commerçant : « Quel gros arbre ? Il y en a cinq ici ! » | Arbres numérotés de 1 à 5, tampon « ×5 » |
| 6,2–8,9 s | ar3 | Client : « Celui à côté de la vendeuse de pain ! » | |
| 8,9–11,5 s | ar4 | Commerçant : « Des vendeuses de pain aussi, il y en a cinq ! » | 5 baguettes, « ×5 » |
| 11,5–14,1 s | ar5 | Client : « Bon… je tourne à gauche ? » | 💫 qui tourne autour de sa tête |
| 14,1–15,9 s | ar4 | Commerçant : « Ma gauche ou ta gauche ?! » | Flèches ← → |
| 15,9–17,3 s | Écran partagé ar5 / ar4 | (silence, musique coupée) | Points d'interrogation |
| 17,3–20,5 s | Arrêt sur image + mascotte (c9) | « Ou bien… on met simplement le commerce sur OJA ? » | Le pin OJA tombe, la mascotte le pointe |
| 20,5–23,6 s | Écran OJA (mascotte c10) | « Le commerçant enregistre sa boutique… » | « Enregistrer un lieu » : Boutique Chez Bona, Épicerie, Lieu enregistré ✓ |
| 23,6–28,3 s | Écran OJA (mascotte c11) | « Le client la retrouve, appuie sur « Itinéraire »… » | Le pin tombe sur la carte, recherche, fiche, « Itinéraire », tracé, « Vous êtes arrivé ! » |
| 28,3–32,9 s | ar6 | « Ah ! Je vous vois ! » / « Bienvenue, bienvenue ! » | Poignée de main |
| 32,9–36,2 s | Arrêt sur image + mascotte (c7) | « Fini les "après le manguier, tourne à gauche" ! » | Citation barrée, tampon « FINI ! », « Ton commerce sur la carte OJA » |
| 36,2–40,5 s | Logo (mascotte c8) | « OJA. Le local devient visible. » | App Store / Google Play, « Mets ton commerce sur OJA » |

---

# OJA — campagne « COMING SOON »

Teasing avant le lancement, en 7 vidéos et 3 phases (Intriguer, Révéler, Créer l'attente). Le plan complet, mon avis sur la proposition de départ et les prompts Google Flow sont dans `PROMPTS_GOOGLE_FLOW_COMINGSOON.md`.

## Concept 3 — « Le compte à rebours » (9:16, 10 s)

Teasing 100 % motion design, sans clip IA. Le compte à rebours traverse le Bénin, du sud au nord.

- **Vidéo :** `OJA_ComingSoon_CompteARebours_9x16.mp4` (1080 × 1920, 30 i/s)
- **Source :** `comingsoon_countdown.html`. Tout est dessiné dans un canvas, avec `renderAt(t)` comme pour les autres films : glitch (tranches décalées, séparation RVB), grain, lignes de balayage.
- **Images :** `assets/cs/cd1…cd5.jpg`, photos des villes passées en duotone orange. La carte du Bénin utilise les vraies frontières (comme le tour du Bénin) ; le logo vient de `assets/mk_logo.png`.
- **Son :** `assets/soundtrack_comingsoon_countdown.m4a`, sound design synthétisé (drone, impacts, glitchs, montée, impact final), à −14 LUFS.
- **Rendu :** `VW=1080 VH=1920 PAGE=comingsoon_countdown.html node render.js 30 0 300 video.mp4 ffmpeg`, puis multiplexer avec la bande son.

| Temps | Visuel |
|---|---|
| 0–0,5 s | Écran noir, allumage façon vieux téléviseur |
| 0,5–6,1 s | 5 COTONOU (Place de l'Amazone, photo © Présidence du Bénin, crédit affiché), 4 PORTO-NOVO, 3 OUIDAH (Porte du Non-Retour), 2 ABOMEY (Béhanzin), 1 NATITINGOU (Tata Somba). Chaque chiffre est rempli par la photo de la ville. |
| 6,1–7 s | Le « 1 » devient la carte du Bénin, les 5 villes s'allument |
| 7–8 s | « Le changement approche. » |
| 8–10 s | Logo dévoilé en partie à travers une fente, « BIENTÔT », « AU BÉNIN · COMING SOON » |

## Concept 1 — « Quelque chose arrive au Bénin » (21 s, 16:9 et 9:16)

Bande-annonce de nuit : le pays qui vit, des visages, un téléphone qui s'allume en orange, des traînées de lumière qui se rejoignent en pin OJA, puis le logo en partie dévoilé.

- **Vidéos :** `OJA_ComingSoon_QuelqueChoseArrive_16x9.mp4` (1920 × 1080, format cinéma 2,39:1) et `OJA_ComingSoon_QuelqueChoseArrive_9x16.mp4` (1080 × 1920 : image dans un cadre 4:5 sur fond flouté, texte au-dessus et en dessous), 24 i/s.
- **Sources :**
  - 8 clips Google Flow dans `clips_cs/` (prompts : `PROMPTS_GOOGLE_FLOW_COMINGSOON.md`, § 4). Leur son d'origine contient de la musique générée par Veo, il n'est pas utilisé.
  - Voix ElevenLabs « Isac » : `assets/cs/voix_cs1.mp3`. Le nom est écrit « Odja » dans le texte pour qu'il soit lu d'un bloc.
- **Rendu :**
  1. `python3 cs1_frames.py` : découpe les plans en images (`assets/csf/`, non versionné) et efface la marque inventée par Veo sur le casque du zem.
  2. `VW=1920 VH=1080 PAGE=comingsoon_trailer.html node render.js 24 0 504 video.mp4 ffmpeg` (ou `comingsoon_trailer_9x16.html` avec `VW=1080 VH=1920`).
  3. Multiplexer avec `assets/soundtrack_comingsoon_trailer.m4a` (musique, bruitages et voix placée, −14 LUFS).

| Temps | Plan | Voix | Habillage |
|---|---|---|---|
| 0–3,2 s | Survol du pont de Cotonou | « Un pays qui bouge. » | Étiquette COTONOU |
| 3,2–5 s | La rue de nuit, zems | — | Ambiance de rue, passages de motos |
| 5–6,6 s | L'Atacora à l'aube | — | Étiquette ATACORA |
| 6,6–10,8 s | Portraits : commerçante, zem, étudiant | « Des millions d'ambitions. » | |
| 10,8–14 s | Le téléphone vibre et s'allume en orange | « Et bientôt… une nouvelle façon de tout connecter. » | Halo orange renforcé |
| 14–17 s | La ville entière | — | Traînées de lumière qui forment le pin OJA, flash |
| 17–21 s | Fond noir | « Odja arrive. » | Logo partiel à travers une fente, « BIENTÔT AU BÉNIN · COMING SOON » |

## Concept 2 — « Et si tout était plus simple ? » (9:16, 28 s)

Trois galères du quotidien dans le Cotonou moderne, puis les trois mêmes personnes reçoivent la lumière orange sur leur téléphone.

- **Vidéo :** `OJA_ComingSoon_EtSiToutEtaitPlusSimple_9x16.mp4` (1080 × 1920, 24 i/s)
- **Sources :**
  - 6 clips Google Flow `clips_cs/cs2_p1…p6.mp4` (prompts : `PROMPTS_GOOGLE_FLOW_COMINGSOON.md`, § 5 ; image de départ puis Frames to Video). Les images `refs_cs2/` (tirées des plans 1 à 3) ont servi de référence pour les gros plans.
  - Voix « Isac » : `assets/cs/voix_cs2.mp3`. Silhouette de la mascotte tirée du clip fond vert c7.
- **Rendu :**
  1. `python3 cs2_frames.py` : découpe les plans et compose le triptyque (`assets/cs2f/`, non versionné).
  2. `VW=1080 VH=1920 PAGE=comingsoon_simple.html node render.js 24 0 672 video.mp4 ffmpeg`.
  3. Multiplexer avec `assets/soundtrack_comingsoon_simple.m4a` (voix placée, son d'origine des clips en bruitage, musique, −14 LUFS).

| Temps | Image | Voix |
|---|---|---|
| 0–6 s | La jeune femme appelle, aucun zem ne s'arrête | « Attendre une moto… qui ne s'arrête jamais. » |
| 6–11,3 s | Le commerçant attend devant sa boutique | « Avoir une boutique… que personne ne trouve. » |
| 11,3–16,8 s | Le client et son colis au carrefour | « Traverser la ville… pour un simple colis. » |
| 16,8–20,4 s | Les trois téléphones vibrent, lumière orange | — |
| 20,4–23,4 s | Triptyque des trois sourires, les lumières se rejoignent | « Et si tout était plus simple ? » |
| 23,4–24,7 s | Silhouette de la mascotte en contre-jour | « Le Bénin bouge. Le monde avance. » |
| 24,7–28 s | Logo partiel, « BIENTÔT · AU BÉNIN · COMING SOON » | « Odja arrive. » |

## Concept 6 — « Ils ne savent pas encore » (9:16, 20 s)

Teaser mystérieux (phase « Intriguer ») remonté avec les plans du concept 2, sans nouvelle génération : les trois personnes avant que leur téléphone s'allume.

- **Vidéo :** `OJA_ComingSoon_IlsNeSaventPasEncore_9x16.mp4` (1080 × 1920, 24 i/s)
- **Sources :** clips `clips_cs/cs2_p1…p6.mp4`, voix « Isac » `assets/cs/voix_cs6.mp3`.
- **Rendu :** `python3 cs6_frames.py` (images dans `assets/cs6f/`, non versionné, et triptyque figé), puis `VW=1080 VH=1920 PAGE=comingsoon_ilsnesavent.html node render.js 24 0 480 video.mp4 ffmpeg`, multiplexé avec `assets/soundtrack_comingsoon_ilsnesavent.m4a`.

| Temps | Image | Voix |
|---|---|---|
| 0–3,6 s | La jeune femme qui appelle un zem (couleurs éteintes) | « Ils attendent. » |
| 3,6–7,2 s | Le commerçant devant sa boutique | « Ils cherchent. » |
| 7,2–11 s | Le client et son colis | « Ils traversent la ville. » |
| 11–15,5 s | Les trois visages figés, presque en noir et blanc ; une lumière orange les balaie et rend les couleurs | « Ils ne savent pas encore… que tout va changer. » |
| 15,5–20 s | Logo partiel, « BIENTÔT · AU BÉNIN · COMING SOON » | « Odja arrive. » |

## Concept 4 — « OJA, c'est pour nous » (9:16, 25 s)

Quatre personnes, quatre villes, quatre besoins, puis « C'est pour nous ! » en chœur et la révélation de la mascotte (phase 3).

- **Vidéo :** `OJA_ComingSoon_CestPourNous_9x16.mp4` (1080 × 1920, 24 i/s)
- **Sources :**
  - 4 clips Google Flow `clips_cs/cs4_p1…p4.mp4` (prompt unique, § 6 de `PROMPTS_GOOGLE_FLOW_COMINGSOON.md`) ; leurs voix sont celles générées par Veo.
  - Le zem disait des mots inventés au milieu de sa phrase : ils sont coupés, et la seconde moitié est légèrement zoomée pour masquer la coupe.
  - Mascotte : clip fond vert c7 (bras ouverts). Voix « Isac » : « Le Bénin bouge. Le monde avance. Odja arrive. », reprise de `assets/cs/voix_cs2.mp3`.
- **Rendu :** `python3 cs4_frames.py` (images dans `assets/cs4f/`, non versionné, avec la mosaïque 2 × 2), puis `VW=1080 VH=1920 PAGE=comingsoon_pournous.html node render.js 24 0 600 video.mp4 ffmpeg`, multiplexé avec `assets/soundtrack_comingsoon_pournous.m4a`.

| Temps | Image | Son |
|---|---|---|
| 0–3,3 s | Conducteur de zem, Cotonou | « Moi, je veux plus de courses… et moins de tours à vide. » |
| 3,3–6,5 s | Commerçante, Parakou | « Moi, je veux que mes clients me trouvent facilement. » |
| 6,5–8,5 s | Étudiant, Abomey-Calavi | « Moi, je veux me déplacer sans me ruiner. » |
| 8,5–11 s | Restauratrice, Porto-Novo | « Moi, je veux livrer mes plats dans tout le quartier. » |
| 11–16,9 s | Les quatre, l'un après l'autre | « C'est pour nous ! » |
| 16,9–18,6 s | Mosaïque 2 × 2, « C'EST POUR NOUS. » | Les quatre en chœur |
| 18,6–21,6 s | La mascotte dévoilée, bras ouverts, fond orange | Isac : « Le Bénin bouge. Le monde avance. » |
| 21,6–25 s | Logo complet, « BIENTÔT · AU BÉNIN · COMING SOON » | « Odja arrive. » |

## Concept 5 — « Le téléphone qui change tout » (9:16, 15 s)

100 % motion design, sans clip IA : un téléphone flotte dans le noir, vibre, s'allume en orange ; les services d'OJA en sortent un par un et tournent autour de lui, puis repartent en spirale dans l'écran d'où sort le logo.

- **Vidéo :** `OJA_ComingSoon_LeTelephone_9x16.mp4` (1080 × 1920, 24 i/s)
- **Source :** `comingsoon_telephone.html` (canvas, `renderAt(t)`). Le téléphone est dessiné à plat puis projeté en bandes verticales pour simuler sa rotation en 3D.
- **Visuels :** vrais véhicules OJA détourés (`assets/moto.png`, `car.png`, `tricycle.png`) et objets photoréalistes générés dans Google Flow puis détourés avec rembg (`assets/cs/obj_colis.png`, `obj_plat.png`, `obj_sac.png`, `obj_occasion.png`, `obj_reveil.png`), `assets/mk_pin.png` et `assets/mk_logo.png`. Chaque objet sort d'abord en grand devant le téléphone, au moment où son mot s'affiche.
- **Son :** `assets/soundtrack_comingsoon_telephone.m4a` (vibration, pops, arpège, impact) ; voix « Isac » reprise de `assets/cs/voix_cs2.mp3`.
- **Rendu :** `VW=1080 VH=1920 PAGE=comingsoon_telephone.html node render.js 24 0 360 video.mp4 ffmpeg`, puis multiplexer avec la bande son.

| Temps | Visuel | Texte / voix |
|---|---|---|
| 0–3 s | Le téléphone apparaît, vibre, l'écran s'allume en orange | « Un seul téléphone. » |
| 3–8,4 s | Moto, voiture, tricycle, puis les icônes sortent de l'écran et tournent autour | SE DÉPLACER, LIVRER, COMMANDER, ÊTRE VISIBLE, REVENDRE, RÉSERVER |
| 8,4–10 s | Tout repart en spirale dans l'écran, flash | « Une seule app. » |
| 10–15 s | Le logo sort du téléphone, « BIENTÔT · AU BÉNIN · COMING SOON » | « Le Bénin bouge. Le monde avance. Odja arrive. » |

## Pub OJA Market — « Tout ce que vous aimez » (9:16, 20,5 s)

Pub de lancement d'OJA Market, construite comme les spots produit « tout ce que vous aimez, de A à Z » : un ruban de lumière orange, les vrais écrans de l'app, une route lumineuse sur une ville en 3D, le colis livré sur la table, deux slogans, puis le logo. Le produit vedette est un plat : poulet braisé, riz au gras et alloco du Maquis Chez Tanti (restaurant d'exemple). Pas de voix off, aucun clip IA.

- **Vidéo :** `OJA_Market_Pub_ToutCeQueVousAimez_9x16.mp4` (1080 × 1920, 24 i/s)
- **Source :** `oja_market_pub.html` (DOM + canvas, `renderAt(t)`). Écrans OJA Market repris du film Market (accueil, menu du restaurant, paiement) ; téléphone et cartes en CSS 3D ; ruban, ville 3D, moto et lumières sur canvas.
- **Visuels :** `assets/cs/obj_plat.png` (le plat), `assets/moto.png` (le livreur OJA), `assets/mk_logo.png` ; `assets/mkp/` est généré par `python3 mkp_assets.py` (table en bois procédurale, logo OJA imprimé en blanc sur la boîte, photo du plat pour le menu).
- **Son :** `assets/soundtrack_market_pub.m4a`, entièrement synthétisé (groove afro-pop en ré majeur, clics de frappe, carillon de paiement, moteur de la moto, notification, impacts). Les changements d'écran sont marqués par un accord inversé qui monte vers la coupe, sans « whoosh » de souffle.
- **Rendu :** `VW=1080 VH=1920 PAGE=oja_market_pub.html node render.js 24 0 492 video.mp4 ffmpeg`, puis multiplexer avec la bande son.

| Temps | Visuel | Texte à l'écran |
|---|---|---|
| 0–1,6 s | Téléphone dans le noir, un ruban de lumière orange tourne autour | — |
| 1,6–3 s | Zoom sur la recherche OJA Market, on tape « Poulet braisé » | — |
| 3–5,4 s | Menu du Maquis Chez Tanti ; les cartes des plats sortent de l'écran en 3D, le poulet braisé vole vers la caméra | — |
| 5,4–6,75 s | Le plat en grand, qui tourne lentement | MAQUIS CHEZ TANTI · Poulet braisé · 3 500 XOF · ★ 4,9 · Livraison OJA |
| 6,75–8,3 s | Paiement : Livraison OJA (moto), « PAYER 4 700 XOF » → « Payé » | — |
| 8,3–11,5 s | Une comète plonge sur une ville 3D (lagune, ponts) ; la route s'allume du restaurant à Haie Vive | « Votre commande arrive » : Acceptée → Préparation → En route → Livrée, 12 → 1 min |
| 11,5–12,45 s | Le livreur OJA passe à moto, traînée de lumière | — |
| 12,45–14,6 s | Le plat se pose sur une table en bois, le ruban fait le tour et révèle le logo OJA sur la boîte | Notification « Commande livrée — Votre poulet braisé est arrivé. Bon appétit ! » |
| 14,6–16,3 s | Fond chaud, trait de lumière | « Tout ce que vous aimez. » |
| 16,3–17,75 s | Flèche de lumière | « De Cotonou à Parakou. » |
| 17,75–20,5 s | Logo OJA, flèche, boutons des stores | « OJA Market » · « Téléchargez l'app OJA » · App Store · Google Play |

## OJA Marchand — « Tu cuisines, OJA livre » (9:16, 29,5 s)

Vidéo motion design pour attirer les commerçants (idée 22 et carrousel 5 du kit marketing). Elle utilise les vrais écrans OJA Marchand (tableau de bord, catalogue, commandes) **sans aucun montant**. On voit le plat, le livreur OJA, et les quatre véhicules qui apparaissent sur les mots de la voix.

- **Vidéo :** `OJA_Marchand_TuCuisinesOJALivre_9x16.mp4` (1080 × 1920, 24 i/s)
- **Source :** `oja_marchand_tucuisines.html`, construite par `src/mch_build.py` à partir de `src/mch_body.js`. Les écrans sont repris des films Market et Marchand.
- **Voix :** Isac, générée directement avec `src/tts.py`. Texte dans `assets/mch/voix_marchand.txt`, minutage mot par mot dans `assets/mch/voix_marchand.mp3.json`. L'animation est calée sur ce minutage.
- **Son :** `assets/soundtrack_marchand.m4a`, produit par `src/music21.py` : groove afro-pop, bruitages sur les mots, aucun whoosh, musique baissée sous la voix.
- **Images :** `assets/mch/card_*.jpg` (restaurant, maquis, boutique), `assets/cs/obj_plat.png`, `assets/moto.png`, `tricycle.png`, `car.png`, `assets/mk_logo.png`.
- **Mention à l'écran :** « Boutique en ligne après validation du dossier par l'équipe OJA. »

| Temps | Voix | Image |
|---|---|---|
| 0–3 s | « Tu cuisines ? Odja livre ! » | Le plat, puis le livreur OJA qui arrive avec une traînée de lumière |
| 3–7,5 s | « Restaurant, maquis, boutique… mets ton commerce sur Odja Marchand. » | Trois photos, puis le téléphone avec le tableau de bord OJA Marchand |
| 7,5–11,5 s | « Tu ajoutes tes produits, avec une photo. Tu appuies sur « Ouvert ». » | Nouveau produit (photo, nom, enregistré), puis la boutique passe de « fermée » à « ouverte » |
| 11,5–18,6 s | « Une commande arrive ? Tu acceptes… et un livreur Odja vient la chercher : à vélo, à moto, en tricycle ou en voiture. » | Notification, commande acceptée, suivi ; le livreur arrive, puis les 4 véhicules |
| 18,6–23,4 s | « Tes clients paient par MoMo ou en espèces. Et ils te trouvent, même s'ils ne connaissent pas ton nom. » | Cartes MoMo et Espèces ; recherche « maquis derrière la pharmacie » qui trouve la boutique |
| 23,4–29,5 s | « Odja Marchand. Tu cuisines, Odja livre. » | Logo, « OJA Marchand », boutons des stores, mention |
