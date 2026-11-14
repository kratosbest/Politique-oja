# Prompts Google Flow (Veo) — sketch 3 « Monsieur Je-connais-tout »

Sketch d'environ 45 s, en **9:16 vertical** (TikTok, Reels, statuts WhatsApp), avec de **nouveaux personnages en images réalistes**, dans le **nouveau Cotonou** : avenues goudronnées, trottoirs pavés, lampadaires solaires, palmiers et bâtiments modernes. Les dialogues viennent du document « Sketchs OJA — dialogues » (sketch 3).

**Qui fait quoi :**
- **Dans Flow, tu génères les 8 plans** (environ 8 s chacun), **avec le son** : Veo fait parler les personnages et synchronise les lèvres.
- **Moi, au montage**, je fais le reste :
  - je coupe les plans au bon moment ;
  - j'ajoute les sous-titres jaunes, les bruitages (le grillon du silence) et la musique ;
  - je crée le gros plan sur la **map OJA** (le maquis sur la carte, puis « Itinéraire »), comme dans les autres sketchs ;
  - je termine par la carte de fin avec le QR code.

---

## 1. Avant tout : créer les deux personnages (pour qu'ils restent identiques)

Dans Flow, génère d'abord **une image** de chaque personnage, avec « Create image ». Garde la meilleure, puis utilise-la comme **ingrédient** dans tous ses plans.

**Tonton Augustin — le Je-connais-tout, bel homme élégant**
```
Photorealistic full-body portrait of a handsome, distinguished Beninese man in his early fifties, fit, well-groomed short salt-and-pepper beard, charming confident smile, wearing an elegant sky-blue bazin boubou with subtle gold embroidery and a matching cap, a classy wristwatch and stylish brown leather sandals, standing on a newly paved avenue of modern Cotonou with palm trees, solar streetlights and modern buildings, warm late-afternoon golden light, 9:16 vertical. No text, no logo.
```

**Grâce — sa nièce, belle et stylée**
```
Photorealistic full-body portrait of a beautiful, stylish Beninese young woman around 24, confident and glamorous, long braids, gold hoop earrings, light makeup, wearing a fitted white crop top, high-waisted frayed denim cut-off shorts and white sneakers, holding a smartphone, playful teasing smile, standing on a newly paved avenue of modern Cotonou with palm trees, solar streetlights and modern buildings, warm late-afternoon golden light, 9:16 vertical. No text, no logo.
```

Garde un style classe, façon pub de mode : Flow refuse parfois les images trop osées, et ça colle mieux à une pub OJA.

## 2. Réglages Flow

- **Mode :** **Ingredients to Video**. Mets en ingrédient l'image de chaque personnage présent dans le plan. Si ce mode n'est pas proposé, prends **Frames to Video** avec le portrait comme première image.
- **Modèle :** **Veo 3.1 – Fast**, qui coûte beaucoup moins de crédits. Passe en « Quality » seulement pour refaire un plan important qui rate.
- **Format :** **9:16 (portrait)**, **x1**.
- **Son activé.** La réplique entre guillemets est dite par le personnage, avec les lèvres synchronisées. Je garde ce son au montage.
- **Une réplique mal prononcée ?** Régénère juste ce plan. « Oja » est écrit « Odja » dans le prompt pour être bien prononcé : les sous-titres afficheront « OJA ».
- **À la fin :** télécharge chaque plan en **1080p** et nomme-le `plan1.mp4` à `plan8.mp4`. Envoie-les-moi dans un zip.

## 3. Bloc STYLE (à coller à la fin de chaque prompt)

```
Modern present-day Cotonou, Benin: newly paved avenues and side streets with clean paved sidewalks, solar streetlights, palm trees, modern buildings and shops. Light comedic tone, cinematic photorealistic live-action, warm late-afternoon golden light, vibrant natural colors, 9:16 vertical, shallow depth of field. The characters speak French with a natural Beninese accent. No text, no readable signs, no logos, no subtitles, no watermark, no background music.
```

---

## 4. Les 8 plans

### Plan 1 — Tonton guide (« Suis-moi ! Cotonou, je connais par cœur. »)
```
Tonton Augustin (from the reference image) walks confidently toward the camera along a newly paved street of modern Cotonou lined with palm trees, chest out, waving his hand for Grâce (from the reference image) to follow him; she walks a few steps behind in her denim cut-off shorts, looking at her phone. He says proudly in French: "Suis-moi ! Cotonou, je connais par cœur. Le meilleur poulet braisé, c'est par ici." Medium tracking shot.
```

### Plan 2 — Grâce fatiguée (« On a déjà fait trois fois le tour. »)
```
Grâce (from the reference image) stops walking on the paved sidewalk, tired, one hand on her hip, and points at a small modern kiosk with a red umbrella right next to them. She says in French, deadpan and a bit annoyed: "Tonton… on a déjà fait trois fois le tour." Medium shot on her, the kiosk with the red umbrella clearly visible behind.
```

### Plan 3 — Tonton sûr de lui (« Fais-moi confiance… Voilà ! »)
```
Tonton Augustin (from the reference image) stands on a modern paved street of Cotonou, smiling with great confidence and lifting his chin proudly. He turns and spreads both arms wide with open palms, warmly presenting the place in front of him like a cheerful tour guide. He says in French, happy and proud: "Fais-moi confiance… Voilà !" Medium shot, friendly comedic tone.
```

### Plan 4 — La révélation (« Tonton… c'est un salon de coiffure. »)
```
Wide reveal shot: instead of a restaurant, a trendy modern hair salon with a large glass front on a paved street of modern Cotonou. Inside, two women sit under hair dryers and a hairdresser is braiding a client's hair; they all stop and stare at Tonton Augustin standing proudly in front of the salon with his arms open. Grâce (from the reference image), next to him, says in French, deadpan: "Tonton… c'est un salon de coiffure." Comedic timing. No readable sign on the salon.
```

### Plan 5 — Le silence gênant (« … Ils ont changé le menu. »)
```
Close-up of Tonton Augustin (from the reference image), frozen and embarrassed. Two seconds of awkward silence with only the sound of crickets; he glances left and right and adjusts his cap. Then he says very seriously in French: "… Ils ont changé le menu." Comedic deadpan.
```

### Plan 6 — Grâce sort la map (« C'est sur la map Odja. »)
```
Grâce (from the reference image) looks at her smartphone, scrolls with her thumb, then turns the phone toward Tonton Augustin; the screen faces away from the camera. She says in French, with a teasing smile: "Le maquis a déménagé. Il est à deux rues, c'est sur la map Odja." Medium two-shot on a modern paved street with palm trees.
```

### Plan 7 — Tonton retombe sur ses pieds (« C'est exactement ce que j'allais dire. »)
```
Tonton Augustin (from the reference image) nods calmly with a confident smile and straightens the collar of his boubou, as if nothing happened. He says in French, relaxed and sure of himself: "Oui, c'est exactement ce que j'allais dire." Beside him, Grâce (from the reference image) slowly turns her head toward him, amused, raising her eyebrows. Medium two-shot on a modern paved street with palm trees, light comedic tone.
```

### Plan 8 — Au maquis (« Tu vois ? Je connais Cotonou. »)
```
Dusk, a trendy open-air maquis-lounge terrace in modern Cotonou, wooden tables, plants and warm string lights. Tonton Augustin (from the reference image) sits at a table eating braised chicken with alloco with his hands, mouth full, very happy. He says in French with his mouth full: "Tu vois ? Je connais Cotonou." Grâce (from the reference image), sitting across the table, rolls her eyes and laughs. Medium shot.
```

---

## 5. Montage (je m'en occupe)

| Temps environ | Image | Son |
|---|---|---|
| 0–7 s | Plan 1 | Tonton : « Suis-moi ! Cotonou, je connais par cœur. Le meilleur poulet braisé, c'est par ici. » |
| 7–11 s | Plan 2 | Grâce : « Tonton… on a déjà fait trois fois le tour. » |
| 11–15 s | Plan 3 | Tonton : « Fais-moi confiance… Voilà ! » |
| 15–20 s | Plan 4 | Grâce : « Tonton… c'est un salon de coiffure. » |
| 20–26 s | Plan 5 | Grillon, puis Tonton : « … Ils ont changé le menu. » |
| 26–32 s | Plan 6 | Grâce : « Le maquis a déménagé. Il est à deux rues, c'est sur la map OJA. » |
| 32–35 s | Gros plan sur la map OJA (fait par moi) | Le maquis apparaît sur la map, puis tap sur « Itinéraire ». |
| 35–40 s | Plan 7 | Tonton : « Oui, c'est exactement ce que j'allais dire. » |
| 40–46 s | Plan 8 | Tonton : « Tu vois ? Je connais Cotonou. » |
| 46–49 s | Carte de fin | « Ne te perds plus : les lieux près de toi sont sur la map OJA », « Télécharge Oja App » et le QR code. |

Sous-titres jaunes comme dans les autres sketchs, une petite musique comique sous les dialogues, et aucun nom d'autre application.
