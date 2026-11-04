# Montage de la vidéo de présentation d'OJA (vidéo 1)

Ce dossier sert au montage. Lis tout ce fichier avant de commencer. Il a été écrit à partir du code de l'app OJA (libellés, couleurs, fonctions réelles) : n'invente aucune fonction, aucun chiffre et aucun libellé qui ne soit pas ici.

## 1. Le contexte

- **OJA** est une application mobile (iOS et Android) faite pour le **Bénin**. Elle s'appelle « **Oja App** » sur les stores.
- **Le fondateur, Derrick Dodoo**, est béninois, né et grandi au Bénin, et vit aujourd'hui au Canada. C'est lui qui parle dans la vidéo.
- **Ọjà** veut dire « **marché** » en yoruba. La signature : « *Tout est plus facile quand on a le marché dans sa poche.* »
- L'app regroupe le transport (courses), les livraisons (colis et repas, immédiates ou programmées), **OJA Market** (achats chez les commerçants, avec un paiement protégé jusqu'à la livraison), **NOVOJA** (petites annonces entre particuliers), le paiement Mobile Money, et **les lieux sur la carte**.
- **Cette vidéo (n° 1) ne parle que d'une chose : mettre son business sur la carte, gratuitement.** Les autres services auront leurs propres vidéos. On ne les cite pas ici, sauf « commander une course OJA jusqu'à votre porte », qui fait partie de la fiche d'un commerce.
- **Public** : commerçants, artisans, ateliers, maquis et prestataires au Bénin, et leurs clients. La vidéo est en **français**, avec un ton chaleureux, sincère et local.
- **Objectif** : que les gens téléchargent OJA, ajoutent leur commerce (ou celui qu'ils connaissent) et partagent la vidéo.

## 2. La forme imposée

- **Un seul plan** : Derrick face caméra pendant toute la vidéo, filmé au Canada. Il n'y a **aucune image de terrain** ni aucun autre intervenant. Tout le visuel passe par des **incrustations** posées sur ce plan.
- On peut enchaîner les meilleures prises (coupes franches) et alterner un léger zoom numérique (100 % puis environ 115 %) à chaque bloc pour cacher les coupes et donner du rythme. On ne change jamais d'angle.
- **Référence de style** : `reference/reel-reference.mp4`, un Reel de 35 s avec une personne assise face caméra et un effet nouveau toutes les 1 à 2 s :
  - un mot clé géant au centre (blanc, gras, ombre portée) ;
  - un très grand titre placé **derrière** la personne (détourage) ;
  - une liste qui se coche sur le côté ;
  - un téléphone qui montre une app ;
  - un ticket de caisse ;
  - un collage ;
  - un compteur « 02/24 » en haut à gauche.
  
  On reprend ce rythme et ces types d'effets, avec l'identité d'OJA.

## 3. Les exports

| Version | Durée | Usage |
|---|---|---|
| Principale | environ 85 s | Facebook, TikTok, Instagram |
| WhatsApp | **60 s maximum** | Statut WhatsApp : accroche, présentation, vision et appel ; histoire réduite à deux phrases ; sans le bloc Résultat |
| Accroche | 20–30 s | Teaser |

- **Format** : 1080 × 1920 (9:16), 30 i/s, H.264, son AAC à 48 kHz.
- **Zones sûres** : rien d'important dans les 250 px du haut, les 420 px du bas et les 160 px de droite, car les interfaces de TikTok, Instagram et WhatsApp les couvrent.
- **Sous-titres incrustés** sur toute la vidéo, car beaucoup regardent sans le son : mot à mot ou groupes de 2 à 3 mots.
- **Musique** : uniquement **libre de droits** pour un usage commercial, très basse sous la voix (−20 à −24 dB). Pendant l'histoire, elle est douce, presque absente ; elle remonte à l'appel final.

## 4. L'identité visuelle

**Couleurs** (tirées du thème de l'app, `oja_colors.dart`) :

| Nom | Code | Usage dans la vidéo |
|---|---|---|
| Orange OJA | `#FF6B00` | Couleur principale : mots clés, épingle, tampons |
| Orange foncé | `#B94700` | Fonds de bandeau, ombres |
| Encre | `#172126` | Textes sur fond clair, fonds sombres |
| Vert NOVOJA | `#159A69` | Coches validées, « OUVERT » |
| Rouge | `#D92D20` | « FERMÉ », tampon « ABSENT » |
| Fond clair | `#F7F8FA` / blanc | Cartes, ticket |

- **Drapeau du Bénin** (accent ponctuel, sur le bandeau du nom) : vert `#008751`, jaune `#FCD116`, rouge `#E8112D`.
- **Police** : l'app utilise la police système (SF Pro ou Roboto) en très gras (800). Pour les titres de la vidéo, prendre une sans-serif très grasse et lisible (Inter ExtraBold ou Black, ou Montserrat Black) et rester sur une seule famille.
- **Logos** (dossier `assets/`) :
  - `logo-oja-carte.png` (1024², fond transparent) : épingle orange avec une maison « OJA » sur une carte. **C'est le logo à utiliser** : il illustre exactement le thème « sur la carte ».
  - `logo-oja-vertical.png` (1024 × 1536, transparent) : variante.
  - `logo-oja-transport.png` (fond blanc, non transparent) : **ne pas utiliser**, il est réservé au transport.
- **Logos des stores** : uniquement les badges officiels, non modifiés (« Télécharger dans l'App Store » d'Apple, « Disponible sur Google Play » de Google), récupérés sur leurs sites marketing.

## 5. Le texte (dit par Derrick) et les incrustations

Pour chaque bloc : ce qui est dit, puis ce qui apparaît à l'écran.

1. **Accroche (0–5 s)**
   - Dit : « J'ai perdu une journée entière de travail… à cause d'un réparateur qui était à quelques mètres de moi. »
   - Écran : « UNE JOURNÉE PERDUE » en géant, puis une épingle orange qui tombe sur un fond de carte stylisé, avec « à quelques mètres ».

2. **Présentation (5–12 s)**
   - Dit : « Je m'appelle Derrick Dodoo. Je suis béninois, né et grandi au Bénin. »
   - Écran : bandeau en bas (au-dessus de la zone sûre) « **Derrick Dodoo**, fondateur d'OJA », avec un filet aux trois couleurs du Bénin.

3. **Histoire (12–35 s)**
   - Dit : « Un matin, très tôt, en allant au boulot, j'ai crevé. Je ne connaissais personne dans le coin. Tout le monde était pressé, et ceux qui s'arrêtaient ne connaissaient aucun réparateur. J'ai perdu des heures, et ce jour-là, je ne suis même pas arrivé au travail. Le réparateur était juste là… *(pause)* mais invisible. »
   - Écran, dans l'ordre :
     - une horloge dont les aiguilles tournent vite ;
     - le tampon rouge « ABSENT AU TRAVAIL » ;
     - sur « invisible », l'épingle s'efface en fondu.
   - Rythme plus lent : c'est le moment émotionnel, avec peu d'effets.

4. **Vision (35–47 s)**
   - Dit : « Le Bénin mise sur le tourisme. Ce serait dommage que nos visiteurs vivent la même chose. C'est de là qu'est née OJA. Ọjà, en yoruba, ça veut dire "marché". Parce que tout est plus facile quand on a le marché dans sa poche. »
   - Écran : « ỌJÀ » en très grand **derrière** Derrick, puis « = MARCHÉ ». Sur « dans sa poche », un téléphone avec le logo OJA qui glisse dans une poche, ou une petite épingle qui se pose dans sa main.
   - Écrire « Ọjà » avec les signes yoruba (Ọ et à).

5. **Comment (47–65 s)**
   - Dit : « Artisans, ateliers, boutiques, maquis : avec OJA, vous mettez votre business sur la carte. C'est gratuit, et ça prend quelques minutes. Une photo, un nom, votre position… et vous êtes visible. »
   - Écran :
     - les 4 mots « Artisans · Ateliers · Boutiques · Maquis » qui défilent ;
     - le tampon orange « **GRATUIT** » ;
     - une liste (style de la référence) qui se coche avec un compteur 1/4 → 4/4 : « Photo », « Nom », « Position », « Visible » ;
     - en parallèle, un téléphone qui montre les écrans de l'app (section 6).

6. **Résultat (65–77 s)**
   - Dit : « Les clients vous trouvent, voient si vous êtes ouvert, vous appellent, et peuvent même commander une course OJA jusqu'à votre porte. »
   - Écran : dans le téléphone, la carte du commerce sur l'accueil, puis la fiche avec la pastille « OUVERT », et les boutons « Appeler » et « S'Y RENDRE AVEC OJA » mis en évidence.

7. **Appel (77–88 s)**
   - Dit : « Alors aidez-moi à mettre le Bénin sur la carte. Téléchargez OJA, ajoutez votre commerce, ou celui du réparateur de votre quartier, et partagez cette vidéo. Merci ! »
   - Écran :
     - logo OJA (`logo-oja-carte.png`) ;
     - « Oja App » ;
     - les deux badges officiels des stores ;
     - pour finir : « **Mettons le Bénin sur la carte.** »

Si Derrick change quelques mots en tournant, les **sous-titres suivent ce qu'il dit réellement**, pas ce texte.

## 6. Les vrais écrans et libellés de l'app (pour les maquettes de téléphone)

Le meilleur choix est d'utiliser de vrais enregistrements d'écran de l'app (dossier `rushes/` s'ils sont fournis). S'il faut les recréer en maquette, utiliser **exactement** ces libellés (version française de l'app).

**Ajouter un commerce** (écran « **Enregistrer un lieu** »)

| Étape | Libellés exacts |
|---|---|
| Photos | « Ajouter des photos », boutons « Prendre une photo » et « Choisir depuis la galerie » ; la première photo porte le badge « COUVERTURE » |
| Cadrage | Bouton « Cadrer la couverture », écran « Cadrer la photo de couverture » : un cadre blanc au format de la carte d'accueil, les lignes des tiers, des pointillés orange (« Pointillés : toujours visible, sur tous les téléphones »), bouton « Valider ». En dessous, un « Aperçu sur la page d'accueil » |
| Infos | « Informations générales » : « Nom de l'entreprise / Lieu », « Catégorie », « Téléphone principal », « Numéro WhatsApp (optionnel) », « Horaires d'ouverture » |
| Propriété | « Ce lieu vous appartient-il ? », avec « Oui, je suis propriétaire » ou « Non, je référence ce lieu » |
| Envoi | Bouton « ENREGISTRER LE LIEU ». Un commerce est **publié tout de suite** (sauf doublon possible). Le propriétaire peut ensuite faire vérifier sa fiche (SMS et photo sur place). Message vert après l'envoi (version corrigée de l'app) : « Merci ! Votre lieu est en ligne : tout le monde peut maintenant le trouver sur OJA. » Si un enregistrement d'écran montre l'ancien message « envoyé à OJA pour vérification », ne pas l'utiliser |

**Côté client**
- **Accueil** : la carte du commerce montre la photo (la zone cadrée), avec le badge de catégorie en haut à gauche et un cœur de favori en haut à droite.
- **Fiche du commerce** : la grande photo entière en haut, la pastille « OUVERT » (vert) ou « FERMÉ » (rouge), les « Horaires d'ouverture », les boutons « Appeler » et « Itinéraire », le gros bouton « S'Y RENDRE AVEC OJA », et « Notez ce commerce ».

**Pour les maquettes**
- Un téléphone moderne, bords fins, coins arrondis.
- Un commerce **fictif mais crédible**, par exemple « Atelier Vulcanisation Gbèto », catégorie réparation, à Cotonou, avec une vraie photo de devanture libre de droits.
- **Jamais** de vrai nom de client, de vrai numéro de téléphone ou de vraie adresse.

## 7. Ce qu'il ne faut pas dire ni montrer

- **Ne pas dire « en 2 minutes »** ni donner une durée précise : dire « quelques minutes ».
- **Un commerce (atelier, boutique, maquis…) s'affiche directement** après l'enregistrement : on peut dire « et vous êtes visible ». Seuls les **lieux publics** (marché, carrefour, lieu de culte…) attendent une confirmation : ils sont publiés quand deux personnes différentes donnent le même nom. On n'en parle pas dans cette vidéo.
- La seule exception : si OJA pense que le commerce existe déjà (doublon possible), il est vérifié avant d'être publié. Pas besoin de le dire.
- **Ne pas dire** que la vérification vient de Google, ni mettre de logo Google Maps.
- **Ne pas citer** de chiffres d'utilisateurs ou de commerces, ni de prix.
- **« Vérifié »** veut dire : le propriétaire confirme qu'il possède le commerce par un SMS au numéro du commerce et par une photo prise sur place. On peut le dire simplement (« votre fiche est à vous »), sans détails techniques.
- **N'importe qui peut ajouter un commerce** qu'il connaît, même sans en être le propriétaire (« Non, je référence ce lieu »). C'est vrai, et c'est l'idée de « celui du réparateur de votre quartier ».
- **L'ajout est gratuit.** On peut l'écrire en grand.
- **Pas d'emoji** dans les textes à l'écran : le fondateur n'en veut pas.
- **Pas de musique ni d'image protégées** par des droits.

## 8. Les liens à mettre en description et en commentaire épinglé

- **App Store** (vérifié, disponible au Bénin et au Canada) : https://apps.apple.com/bj/app/oja-app/id6762379436
- **Google Play** (fiche publique, vérifiée le 2026-11-04) : https://play.google.com/store/apps/details?id=com.derrickbest.oja
- **Nom à chercher dans les stores** : « Oja App ».

## 9. Méthode de travail

1. Regarde d'abord `reference/reel-reference.mp4` pour le rythme.
2. Mets les rushes de Derrick dans `rushes/`. Choisis les meilleures prises, enlève les silences et les hésitations, et garde la vraie pause avant « invisible ».
3. Transcris la voix (horodatage au mot) pour caler les sous-titres et chaque incrustation sur le mot exact.
4. Fabrique les incrustations comme des éléments séparés et réutilisables (fichiers dans `assets/` ou dans un dossier de travail), puis assemble.
5. Exporte d'abord la version principale. Fais-la valider par Derrick avant de couper les versions de 60 s et de 20 à 30 s.
6. Les fichiers finaux vont dans `exports/` : `OJA-video1-principale.mp4`, `OJA-video1-whatsapp-60s.mp4`, `OJA-video1-accroche.mp4`.
