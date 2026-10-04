# Prompts Google Flow (Veo) — sketch « Je suis devant le gros arbre ! »

Sketch d'environ 40 s, en **9:16 vertical** (TikTok, Reels, statuts WhatsApp). Les voix sont déjà faites avec ElevenLabs (`assets/arbre/`).

**Qui fait quoi :**
- **Dans Flow, tu génères seulement les deux humains** (6 plans).
- **La mascotte** vient de nos clips fond vert : c9 « pointe vers le haut » pour son entrée, c10 « téléphone », c11 « pouce levé », c7 « bras ouverts ».
- **La carte OJA, le pin de la boutique, l'itinéraire et le logo** : je les fais en motion design.

---

## 1. Avant tout : créer les deux personnages (pour qu'ils restent identiques)

Dans Flow, génère d'abord **une image** de chaque personnage, avec « Create image » ou le générateur d'images. Utilise ensuite cette image comme **ingrédient** dans tous ses plans.

**Personnage A — le client**
```
Photorealistic portrait, full body, of a Beninese man in his early thirties, short hair, light beard, wearing a bright yellow short-sleeve shirt, beige chino trousers and white sneakers, holding a smartphone, standing on a red-earth street in Cotonou, natural daylight, 9:16 vertical.
```

**Personnage B — le commerçant**
```
Photorealistic portrait, full body, of a Beninese shopkeeper in his fifties, round friendly face, short grey hair, wearing a blue and orange wax-print shirt and dark trousers, holding a smartphone, standing in front of his small colorful roadside shop with no readable sign, natural daylight, 9:16 vertical.
```

## 2. Réglages Flow

- **Mode :** **Ingredients to Video**. Mets en ingrédient l'image du personnage du plan, plus celle du décor si tu veux.
- **Format :** **9:16**, 8 s par plan, Veo 3 / 3.1 Quality.
- **Audio activé, avec la réplique** : la bouche bouge alors au bon rythme. Je remplace ensuite le son par tes voix ElevenLabs.
- **Même seed** pour tous les plans d'un même personnage.

## 3. Bloc STYLE (à coller à la fin de chaque prompt)

```
Real present-day Cotonou, Benin. A red-earth residential street lined with FIVE big identical mango trees, small colorful shops and roadside stalls. Warm afternoon light, light comedic tone, cinematic photorealistic live-action, 9:16 vertical, shallow depth of field. No text, no readable signs, no logos, no subtitles, no watermark.
```

---

## 4. Les 6 plans

### Plan 1 — Le client sûr de lui (« Allô ? Oui, je suis devant le gros arbre ! »)
```
Character A (the client from the reference image) stands under a big mango tree, phone to his ear, very confident, pointing proudly at the tree next to him. He says in French, cheerful and sure of himself: "Allô ? Oui, je suis devant le gros arbre !" Medium shot, slight low angle.
```

### Plan 2 — Le commerçant perdu (« Quel gros arbre ? Il y en a cinq ici ! »)
```
Character B (the shopkeeper from the reference image) stands in front of his small shop, phone to his ear, looks around in disbelief at the several big mango trees around him, then raises his free hand counting on his fingers. He says in French, surprised: "Quel gros arbre ? Il y en a cinq ici !" Medium shot.
```

### Plan 3 — Le client précise (« Celui à côté de la vendeuse de pain ! »)
```
Character A, phone to his ear, turns and points at a woman selling bread from a basket under a mango tree. He says in French, a bit unsure: "Celui à côté de la vendeuse de pain !" Medium-wide shot.
```

### Plan 4 — Le commerçant exaspéré (« Des vendeuses de pain aussi, il y en a cinq ! »)
```
Character B, phone to his ear, looks left and right along the street where several women sell bread from baskets under different mango trees. He puts his free hand on his forehead, exasperated, and says in French: "Des vendeuses de pain aussi, il y en a cinq !" Medium shot, comedic timing.
```

### Plan 5 — Ils tournent en rond (« Bon… je tourne à gauche ? » / « Ma gauche ou ta gauche ?! »)
```
Comedic wide shot: Character A walks in a full circle around a big mango tree, phone to his ear, completely lost, scratching his head. He says hesitantly in French: "Bon… je tourne à gauche ?" Passers-by look at him amused.
```
Génère aussi une version avec le commerçant (Character B) qui tourne sur lui-même devant sa boutique et dit, agacé : « Ma gauche ou ta gauche ?! ». Je les monterai en écran partagé.

### Plan 6 — L'arrivée (« Ah ! Je vous vois ! » / « Bienvenue, bienvenue ! »)
```
Character A walks up to the small colorful shop of Character B, both lower their phones and laugh. Character A says in French, relieved and happy: "Ah ! Je vous vois !" Character B opens his arms and answers warmly: "Bienvenue, bienvenue !" They shake hands. Medium-wide shot, joyful.
```

---

## 5. Montage

| Temps | Image | Son |
|---|---|---|
| 0–3 s | Plan 1 | Client : « Allô ? Oui, je suis devant le gros arbre ! » |
| 3–6 s | Plan 2 (les arbres se dédoublent ×5 en motion design) | Commerçant : « Quel gros arbre ? Il y en a cinq ici ! » |
| 6–9 s | Plan 3 | Client : « Celui à côté de la vendeuse de pain ! » |
| 9–12 s | Plan 4 | Commerçant : « … il y en a cinq ! » |
| 12–16 s | Plan 5 en écran partagé, points d'interrogation | « Je tourne à gauche ? » / « Ma gauche ou ta gauche ?! » |
| 16–19 s | Arrêt sur image ; la mascotte surgit avec un pin OJA (clip c9) | Mascotte : « Ou bien… on met simplement le commerce sur OJA ? » |
| 19–28 s | Écran OJA : la boutique est enregistrée, le pin tombe sur la carte, puis le client voit la boutique et appuie sur « Itinéraire » ; le tracé se dessine (mascotte c10 puis c11) | « Le commerçant enregistre sa boutique… arrive tout droit ! » |
| 28–31 s | Plan 6 | « Ah ! Je vous vois ! » / « Bienvenue, bienvenue ! » |
| 31–36 s | Mascotte bras ouverts (c7) + punchline à l'écran | « Fini les "après le manguier, tourne à gauche" ! » |
| 36–40 s | Logo OJA | « OJA. Le local devient visible. » |

## 6. Pièges à éviter

- **Mêmes têtes d'un plan à l'autre :** utilise toujours l'image du personnage en ingrédient, et décris les mêmes vêtements.
- **Pas de texte :** ni enseigne ni panneau lisible. J'ajouterai moi-même le nom de la boutique dans l'écran OJA.
- **Cinq arbres qui se ressemblent :** c'est le cœur de la blague. Insiste sur « FIVE big identical mango trees ». Si Veo n'en met qu'un, je les dédouble au montage.
- **Une seule action par plan :** si le plan 6 est trop chargé, coupe-le en deux, d'abord la poignée de main, puis les répliques.

Envoie-moi les clips nommés `ar1.mp4` … `ar6.mp4` (et `ar5b.mp4` pour la version du commerçant).
