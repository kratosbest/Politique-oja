# Prompts Google Flow (Veo) — « La mascotte OJA dans les rues de Cotonou » (1 min)

Un film d'environ 60 s. La mascotte OJA (la même que sur les clips fond vert) se promène dans Cotonou et aide trois personnes avec l'app :

1. trouver un **restaurant** ;
2. trouver un **véhicule** ;
3. trouver un **artisan**.

Le film est découpé en **8 plans de 8 s** (64 s, ramenés à 60 s au montage).

---

## 1. Réglages Flow

| Réglage | Valeur |
|---|---|
| Modèle | Veo 3 / 3.1 (« Quality » pour les plans finaux, « Fast » pour les essais) |
| Mode | **Ingredients to Video**. Ingrédient 1 : une image nette de la mascotte (capture d'un clip fond vert, de face, en pied). Ingrédient 2, facultatif : une photo de rue de Cotonou pour l'ambiance. |
| Format | **16:9** recommandé : la rue respire mieux. Pour une version 9:16 (Reels/TikTok), remplace `16:9 widescreen` par `9:16 vertical` dans le bloc style. |
| Durée | 8 s par plan |
| Audio | Activé si tu veux le lip-sync natif (voir § 5). Sinon, ajoute `no dialogue, ambient street sound only`. |
| Cohérence | Même image de référence et même seed pour tous les plans. Garde les 2–3 meilleures versions de chaque plan. |
| Enchaînement | Dans Scenebuilder, utilise **Extend / Jump to** depuis la dernière image du plan précédent : la mascotte garde la même place et la même lumière. |

---

## 2. Bloc PERSONNAGE (à coller au début de chaque prompt)

```
The official OJA mascot from the reference image: a glossy orange (#FF6B00) map-pin-shaped robot about 1.2 m tall, round orange face inset with a dark ring, big painted cartoon eyes and expressive eyebrows (keep the orange face with painted eyes, NOT a black screen face), a black round OJA house badge on its belly, translucent orange flame-like wings on its back, orange mechanical arms and legs, orange lattice feet. Keep its design, proportions and colors exactly identical to the reference in every shot. It moves with light bouncy steps, friendly and confident, never childish.
```

## 3. Bloc STYLE (à coller à la fin de chaque prompt)

```
Setting: real modern Cotonou, Benin, West Africa. Warm natural sunlight, red-earth and paved streets, colorful painted walls, palm trees, zemidjan moto-taxis with drivers in yellow shirts, street vendors, everyday Beninese people in modern and wax-print clothing. Cinematic photorealistic live-action footage with the mascot as a seamlessly integrated Pixar-quality 3D character, correct shadows and contact with the ground. 16:9 widescreen, shallow depth of field, smooth gimbal camera. No text, no readable signs, no logos, no subtitles, no watermark. Phone screens are a plain solid bright green, never show any interface.
```

> Les écrans de téléphone sont **verts unis** : j'y incruste ensuite les vraies interfaces OJA (recherche restaurant, commande de course, carte des artisans). Veo invente sinon de fausses interfaces illisibles.

---

## 4. Les 8 plans (bloc personnage + prompt du plan + bloc style)

### Plan 1 — Arrivée dans Cotonou · 0–8 s
```
Wide establishing shot of a busy sunny street in Cotonou in the morning, zemidjans passing by. The mascot drops in from the sky like a map pin landing, lands softly in the middle of the sidewalk, its wings flutter, it straightens up, looks around at the city with delight, then turns to the camera and waves hello. Passers-by smile and look at it with curiosity. Camera slowly pushes in.
```
*Dialogue (option) :* « Salut ! Moi, c'est ton guide OJA. »

### Plan 2 — Situation 1 : il a faim · 8–16 s
```
Midday street near small shops. A young Beninese man in his twenties, office shirt, stands on the sidewalk, hand on his stomach, looking left and right, clearly hungry and not knowing where to eat. The mascot walks into frame beside him, taps him on the shoulder, holds up a smartphone toward him with a solid green screen and points at it. The man leans in, curious. Medium shot, camera at chest height.
```
*Dialogue :* « Tu as faim ? Cherche un restaurant sur OJA ! »

### Plan 3 — Le maquis trouvé · 16–24 s
```
The young man and the mascot arrive together at a lively open-air maquis restaurant with plastic chairs, a woman grilling fish over charcoal, plates of alloco and akassa on the table, warm smoke in the sunlight. The man sits down happily, takes a bite and gives a big thumbs up; the mascot gives a thumbs up back and nods. Tracking shot that ends on a medium shot of both.
```
*Dialogue :* « Les maquis autour de toi, avec les avis et le chemin. »

### Plan 4 — Situation 2 : elle doit se déplacer · 24–32 s
```
Busy roadside near a big market (Dantokpa atmosphere), heavy traffic. A Beninese woman in her thirties in an elegant wax-print dress, holding shopping bags, waves at passing zemidjans that are all full and don't stop; she sighs, tired of waiting under the sun. The mascot hops next to her, shows her its smartphone with a solid green screen, taps it once with a confident smile. Medium-wide shot.
```
*Dialogue :* « Besoin de bouger ? Commande une moto ou une voiture sur OJA. »

### Plan 5 — Le véhicule arrive · 32–40 s
```
A few seconds later a clean modern compact car with orange accents and no visible logo pulls up smoothly at the curb, the friendly driver smiles through the window. The woman checks her phone, smiles, the driver helps her put the bags in, she gets in. The mascot opens the door for her like a gentleman, then waves as the car drives off. Low-angle shot following the car.
```
*Dialogue :* « Ton chauffeur arrive, et tu suis ta course en direct. »

*Variante moto :* remplace la voiture par `a zemidjan driver in a yellow shirt and a helmet stops on a clean motorbike and hands her a second helmet`.

### Plan 6 — Situation 3 : la panne · 40–48 s
```
Residential street in Cotonou, afternoon. A Beninese man in his forties pushes his motorbike with a flat rear tire, sweating, looking annoyed and lost. The mascot walks alongside him, crouches to look at the flat tire, then stands up and shows him its smartphone with a solid green screen; a soft orange glow comes from the phone. The man looks relieved. Side tracking shot.
```
*Dialogue :* « Une panne ? Trouve un artisan près de chez toi. »

### Plan 7 — L'artisan · 48–56 s
```
A small roadside vulcanizer and mechanic workshop under a tin roof, tires stacked, tools on a wooden bench. A skilled Beninese mechanic in work clothes quickly repairs the motorbike tire while the owner watches, satisfied. Quick cutaway inside the same street: a tailor at her sewing machine and a hairdresser at work. The repair is done; the mechanic, the owner and the mascot do a happy fist bump. Medium shot, warm light.
```
*Dialogue :* « Mécanicien, couturier, coiffeur… tes artisans sont sur OJA. »

### Plan 8 — Final · 56–64 s
```
Golden hour on a wide boulevard in Cotonou with a large roundabout and a monument in the background (Place de l'Amazone atmosphere). The young man, the woman and the mechanic from the previous scenes stand together with the mascot in the center, smiling at the camera. The mascot waves goodbye, spreads its glowing orange wings and flies up out of the top of the frame, leaving a soft orange light trail. Camera cranes up to the sky. Leave the sky empty for the final title.
```
*Dialogue :* « OJA. Le local devient visible. »

---

## 5. Option lip-sync (dialogue natif Veo)

Ajoute à la fin d'un plan :

```
The mascot speaks in French with a cheerful young male voice, mouth clearly moving: "<réplique>". The other characters don't speak.
```

- **Une réplique courte par plan**, 3–5 s maximum, sinon Veo coupe ou accélère.
- **Voix finale :** je remplace ensuite l'audio par ta voix ElevenLabs (mêmes répliques). La bouche reste synchronisée puisque le texte est le même.
- **Script complet** à enregistrer sur ElevenLabs, environ 45 s de voix sur 60 s :
  1. « Salut ! Moi, c'est ton guide OJA. »
  2. « Tu as faim ? Cherche un restaurant sur OJA ! »
  3. « Les maquis autour de toi, avec les avis et le chemin. »
  4. « Besoin de bouger ? Commande une moto ou une voiture sur OJA. »
  5. « Ton chauffeur arrive, et tu suis ta course en direct. »
  6. « Une panne ? Trouve un artisan près de chez toi. »
  7. « Mécanicien, couturier, coiffeur… tes artisans sont sur OJA. »
  8. « OJA. Le local devient visible. »

---

## 6. Pièges à éviter

- **Visage qui change.** Si Veo met un visage-écran noir ou change la couleur, régénère en répétant `keep the orange face with painted eyes`. Mets aussi l'image de référence en premier ingrédient.
- **Faux logos et textes.** Veo écrit du charabia sur les enseignes, les voitures et les t-shirts. Garde `no text, no readable signs, no logos`. Je floute ou remplace au montage si besoin.
- **Écran de téléphone inventé.** Exige `solid green screen` : c'est ce qui me permet d'incruster la vraie interface OJA.
- **Taille de la mascotte.** Précise `about 1.2 m tall`, sinon elle devient géante ou minuscule d'un plan à l'autre.
- **Personnes réelles.** Pas de célébrités ni de personnes identifiables : des passants génériques.
- **Plans trop chargés.** Une action principale par plan de 8 s. Le plan 7 (atelier + cutaways) peut être scindé en 7a et 7b si Veo mélange.

---

## 7. Ce que je fais ensuite avec tes clips

1. **Montage** sur la voix off. Je coupe chaque plan au meilleur moment pour tenir 60 s pile.
2. **Incrustation** des vraies interfaces OJA dans les écrans verts des téléphones :
   - plans 2–3 : recherche de restaurants et fiche du maquis ;
   - plans 4–5 : commande de course et suivi du chauffeur ;
   - plans 6–7 : carte des artisans avec pins.
3. **Habillage motion design** :
   - pins OJA qui tombent sur les lieux ;
   - titres « RESTAURANT · VÉHICULE · ARTISAN » ;
   - transitions orange #FF6B00.
4. **Final :** le logo OJA s'anime dans le ciel du plan 8, avec les badges App Store / Google Play.
5. **Son :** mixage de la voix off, d'une musique afro-pop et des bruitages, à −14 LUFS.

Envoie-moi les clips nommés `cot1.mp4` … `cot8.mp4`.
