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

Les façades de commerces sont des illustrations (aucune photo réelle fournie) ; les noms (Chez Aïcha, etc.) sont des exemples.
