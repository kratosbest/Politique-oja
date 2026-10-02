# Prompts Google Flow (Veo) — « OJA dans tout le Bénin » (1 min)

La mascotte OJA fait le tour du Bénin, du sud au nord. Dans chaque ville, elle aide quelqu'un avec un service OJA différent.

Le film dure environ 60 s, en **16:9**. Il se compose de **9 plans Flow de 8 s**, que je raccourcis au montage. Entre deux villes, j'ajoute moi-même une **carte animée du Bénin** : le pin OJA vole d'une ville à l'autre et le nom de la ville s'affiche. Tu n'as donc pas besoin de générer tous les vols.

| # | Ville | Service OJA | Personne aidée |
|---|---|---|---|
| 1 | Cotonou | Départ | — |
| 2 | Lac Nokoué (Ganvié) | Vol de transition | Pêcheurs en pirogue |
| 3 | Porto-Novo | Course à moto | Un étudiant pressé |
| 4 | Abomey-Calavi | Livraison de repas (OJA Market) | Des étudiants sur le campus |
| 5 | Ouidah | Bonnes adresses (carte OJA) | Un couple de visiteurs |
| 6 | Abomey | Artisan visible sur la carte | Une artisane des tentures appliquées |
| 7 | Parakou | Livraison en tricycle | Une commerçante du marché |
| 8 | Natitingou | Final, l'Atacora au coucher du soleil | — |
| 9 | (option) | La mascotte s'envole au-dessus du Bénin | — |

---

## 1. Réglages Flow (comme pour Cotonou)

- **Mode :** **Ingredients to Video**. Ingrédient 1 : une image de la mascotte avec le **visage orange** (une capture du clip `cot1`, par exemple).
- **Format :** 16:9, 8 s par plan, Veo 3 / 3.1 Quality, audio activé si tu veux les répliques (§ 5).
- **Seed et référence :** garde le même seed et la même image de référence sur tous les plans.
- **Vérification :** contrôle le visage sur chaque version avant de me l'envoyer. Sur Cotonou, les plans 6 et 7 étaient sortis avec un visage-écran noir.

## 2. Bloc PERSONNAGE (au début de chaque prompt)

```
The official OJA mascot from the reference image: a glossy orange (#FF6B00) map-pin-shaped robot about 1.2 m tall, round orange face inset with a dark ring, big painted cartoon eyes and expressive eyebrows (keep the orange face with painted eyes from the reference, NOT a black screen face, in every frame), a black round OJA house badge on its belly, translucent orange flame-like wings on its back, orange mechanical arms and legs, orange lattice feet. Keep its design, proportions and colors exactly identical to the reference. Friendly, confident, light bouncy movements.
```

## 3. Bloc STYLE (à la fin de chaque prompt)

```
Real present-day Benin, West Africa. Cinematic photorealistic live-action footage with the mascot as a seamlessly integrated Pixar-quality 3D character, correct shadows and ground contact. Warm natural light, everyday Beninese people in modern and wax-print clothing, zemidjan moto-taxis with drivers in yellow shirts where it fits. 16:9 widescreen, shallow depth of field, smooth cinematic camera. No text, no readable signs, no logos, no subtitles, no watermark. Any phone screen is a plain solid bright green, never show an interface.
```

---

## 4. Les plans (bloc personnage + prompt du plan + bloc style)

### Plan 1 — Départ de Cotonou
```
Early morning on a wide boulevard in Cotonou with a large roundabout and a monument in the background, light traffic of zemidjans. The mascot stands on the sidewalk, stretches, looks at the camera with excitement, waves, then spreads its glowing orange wings and takes off into the sky toward the left of the frame. Camera tilts up to follow it.
```
*Réplique :* « Salut ! Aujourd'hui, je fais le tour du Bénin avec OJA ! »

### Plan 2 — Vol au-dessus du lac Nokoué (transition, sans réplique)
```
Aerial drone shot at sunrise over a stilt village on a calm lake (Ganvié atmosphere): wooden houses on stilts, fishermen in long wooden pirogues casting nets, golden reflections on the water. The mascot flies through the frame from left to right just above the water, wings glowing, and waves at the fishermen, who wave back. No dialogue, ambient water and birds.
```

### Plan 3 — Porto-Novo · course à moto
```
A street in Porto-Novo with colorful Afro-Brazilian colonial architecture, pastel facades with arched windows and balconies. A young Beninese student with a backpack checks his watch, worried about being late. The mascot lands softly next to him, shows him its smartphone with a solid green screen and taps it; seconds later a friendly zemidjan driver in a yellow shirt and helmet pulls up on a clean motorbike and hands the student a helmet. The student hops on and gives a thumbs up as they leave. Medium-wide shot.
```
*Réplique :* « À Porto-Novo, ta moto OJA arrive en quelques minutes. »

### Plan 4 — Abomey-Calavi · repas livré sur le campus
```
A sunny university campus in Abomey-Calavi, students sitting on benches under big trees with notebooks. Three hungry students look at the mascot, who shows them its smartphone with a solid green screen. A delivery rider arrives on a motorbike with an orange insulated delivery box (no logo), hands over warm food bags; the students cheer and share the food with the mascot, who does a happy little dance. Medium shot, joyful mood.
```
*Réplique :* « À Calavi, tes repas sont livrés jusqu'au campus. »

### Plan 5 — Ouidah · les bonnes adresses
```
A coastal road in Ouidah lined with tall coconut palms, the ocean visible at the end of the road, warm afternoon light. A young couple of visitors with a small suitcase looks around, unsure where to go. The mascot walks up and shows them its smartphone with a solid green screen; they smile and follow the mascot toward a charming small beach restaurant with straw parasols. Tracking shot.
```
*Réplique :* « À Ouidah, trouve les bonnes adresses autour de toi. »

> **Lieu à éviter à Ouidah :** la Porte du Non-Retour. C'est un mémorial de la traite négrière, il ne convient pas à une publicité. La route des cocotiers et la plage suffisent pour reconnaître Ouidah.

### Plan 6 — Abomey · l'artisane visible sur la carte
```
Red-earth street in Abomey next to long ochre traditional palace walls. In front of her small open workshop, a Beninese woman artisan sews colorful traditional appliqué tapestries with figures of animals and symbols; finished tapestries hang on a line. The mascot admires a tapestry, then shows her its smartphone with a solid green screen; a soft orange glow comes from the phone. She smiles proudly; customers start to arrive and look at her work. Medium shot.
```
*Réplique :* « À Abomey, nos artisans sont visibles sur la carte OJA. »

### Plan 7 — Parakou · colis en tricycle
```
A huge busy open-air market in Parakou, northern Benin, dry harmattan haze and warm dusty light, stalls of yams, onions and fabrics. A Beninese market woman in a colorful outfit has several big sacks to send. The mascot taps its smartphone with a solid green screen; a cargo tricycle with a smiling driver arrives, the driver and the mascot load the sacks together, the woman waves as the tricycle drives off through the market. Wide shot.
```
*Réplique :* « À Parakou, envoie tes marchandises en tricycle. »

### Plan 8 — Natitingou · final dans l'Atacora
```
Golden hour in the Atacora mountains near Natitingou, northern Benin: green hills, savanna, traditional fortified clay tower houses (Tata Somba) in the valley. The mascot stands on a rock overlooking the landscape, turns to the camera, smiles and opens its arms wide toward the view, then spreads its wings. Slow cinematic push-in. Leave the sky above the mountains empty for a title.
```
*Réplique :* « Du sud au nord, OJA est partout au Bénin. »

### Plan 9 — (option) Envol final
```
Aerial shot at sunset: the mascot flies high above the green hills of northern Benin, leaving a soft orange light trail across the sky, then disappears into the sun. Camera rises. Empty sky at the end. No dialogue.
```

---

## 5. Répliques (lip-sync natif Veo)

À la fin des plans 1 et 3 à 8, ajoute :

```
The mascot speaks in French with a cheerful young male voice, mouth clearly moving: "<réplique>". The other characters don't speak.
```

Les répliques, dans l'ordre :

1. « Salut ! Aujourd'hui, je fais le tour du Bénin avec OJA ! »
2. « À Porto-Novo, ta moto OJA arrive en quelques minutes. »
3. « À Calavi, tes repas sont livrés jusqu'au campus. »
4. « À Ouidah, trouve les bonnes adresses autour de toi. »
5. « À Abomey, nos artisans sont visibles sur la carte OJA. »
6. « À Parakou, envoie tes marchandises en tricycle. »
7. « Du sud au nord, OJA est partout au Bénin. »

La prononciation des noms de villes par Veo n'est pas toujours parfaite. Écoute chaque version : si un nom est mal dit, régénère, ou envoie-moi la phrase enregistrée sur ElevenLabs et je remplace l'audio.

---

## 6. Pièges à éviter (leçons de Cotonou)

- **Visage :** il doit rester orange avec des yeux peints. Mets l'image de référence en premier ingrédient et garde la phrase « NOT a black screen face ».
- **Téléphones :** l'écran doit être vert uni. J'y incruste l'écran OJA correspondant à chaque ville : moto, OJA Market, carte, artisan, tricycle.
- **Monuments :** Veo ne reproduit pas les vrais monuments à l'identique, d'où le mot « atmosphere » dans les prompts. Si tu m'envoies de **vraies photos** de chaque ville, je les utiliserai pour les cartes de transition, comme la Place de l'Amazone dans le premier film.
- **Une action par plan :** si Veo mélange tout (surtout les plans 3, 4 et 7), coupe le plan en deux : d'abord le problème et le téléphone, puis l'arrivée du service.
- **Pas de texte :** aucun texte ni logo dans l'image, pas même sur la boîte de livraison ou le tricycle.

## 7. Ce que je fais au montage

1. **Carte du Bénin animée** entre chaque ville : tracé orange du sud au nord, le pin OJA saute de ville en ville et le nom de la ville s'affiche (« Porto-Novo », « Abomey-Calavi »…).
2. **Incrustation** des vrais écrans OJA dans les téléphones verts, avec les cartes d'info de chaque service.
3. **Sous-titres**, logo OJA en haut à droite et transitions orange.
4. **Final :** le logo OJA se dessine dans le ciel de l'Atacora, avec « Le local devient visible. », App Store / Google Play et « Télécharge OJA ».
5. **Son :** voix des clips, musique et bruitages, −14 LUFS.

Envoie-moi les clips nommés `bj1.mp4` … `bj9.mp4`.
