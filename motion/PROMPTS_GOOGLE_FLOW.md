# Prompts Google Flow (Veo) — mascotte OJA

Objectif : générer une **bibliothèque de plans courts** de la mascotte, un geste par plan. Je les assemble ensuite sur la voix off, avec l'interface OJA, les textes et le logo.

## Réglages Flow

- **Mode :** *Ingredients to Video* (ou *Frames to Video*). Image de référence : la mascotte officielle (pin orange avec visage, badge OJA sur le ventre, pieds en treillis).
- **Format :** 9:16, 8 s par plan, caméra **fixe** (sauf indication contraire).
- **Fond :** vert uni pour que je puisse le détourer (option A, recommandée), ou studio gris très clair uni (option B).
- **Interdits :** aucun texte, aucun logo ajouté, aucune autre forme.
- **Réutilisation :** garder le même **seed** et la même image de référence pour tous les plans, afin que la mascotte reste identique.

## Bloc « personnage » à coller au début de CHAQUE prompt

```
The official OJA mascot from the reference image: a glossy orange (#FF6B00) map-pin-shaped robot, round face inset with a dark ring, big cartoon eyes and eyebrows, a black round OJA house badge on the belly, translucent orange flame-like wings on the back, orange mechanical arms and legs, orange lattice feet. Keep its design, proportions and colors exactly identical to the reference. Full body visible, centered, facing camera, standing on an invisible floor. Locked-off static camera, 9:16 vertical. Plain solid chroma-key green background (#00B140), even soft studio lighting, soft contact shadow, no text, no logos added, no other objects. Pixar-quality 3D render, smooth natural motion, 24 fps.
```

## Plans à générer (un prompt par plan)

| # | Nom du fichier | Prompt (après le bloc personnage) |
|---|---|---|
| 1 | `m01_entree_chute.mp4` | The mascot drops in from above the frame like a map pin landing, squashes slightly on impact, bounces once, then settles and looks straight at the camera with a confident smile. |
| 2 | `m02_salut.mp4` | The mascot waves hello at the camera with its right hand, friendly and energetic, small head tilt, eyebrows raised, then returns to a relaxed stance. |
| 3 | `m03_parle_idle.mp4` | The mascot stands and talks naturally to the camera, small head movements, occasional blink, light breathing motion, open relaxed hand gestures at chest height. Mouth moving as if speaking French. |
| 4 | `m04_pointe_gauche.mp4` | The mascot turns its head and points with its right index finger toward the left side of the frame, holds the pose while looking at that point, then looks back at the camera and nods. |
| 5 | `m05_pointe_haut.mp4` | The mascot points up toward the upper-left corner of the frame with an extended index finger, as if showing a button on a phone screen, eyes following its finger. |
| 6 | `m06_regarde_telephone.mp4` | The mascot holds a small orange smartphone in its left hand, looks down at the screen with curiosity, taps it twice with its right finger, then looks back at the camera. |
| 7 | `m07_hoche_tete.mp4` | The mascot nods approvingly twice, smiles, and gives a small thumbs up with its right hand. |
| 8 | `m08_pouce_leve.mp4` | The mascot gives an enthusiastic thumbs up with both hands, eyes squinting with joy. |
| 9 | `m09_celebration.mp4` | The mascot does a small happy jump with both arms raised, lands softly, wings flutter briefly. Celebratory but elegant, not childish. |
| 10 | `m10_presente.mp4` | The mascot opens both arms wide to the sides as if presenting something big behind it, proud smile. |
| 11 | `m11_suis_moi.mp4` | The mascot makes a "follow me" gesture with its right hand toward the right of the frame, then turns slightly as if to walk in that direction. |
| 12 | `m12_clin_doeil.mp4` | The mascot looks at the camera, winks with its right eye and points at the viewer with its right index finger: "your turn!". |
| 13 | `m13_reflechit.mp4` | The mascot taps its chin with one finger, looks up to the left as if thinking, eyebrows raised, then smiles with an idea. |
| 14 | `m14_sortie.mp4` | The mascot waves goodbye and jumps up out of the top of the frame. |

**Option dialogue (lip-sync natif Veo).** Ajoute à un plan : `The mascot says in French, cheerful voice: "Salut ! Moi, je suis ton guide OJA."` Je remplace ensuite l'audio par ta vraie voix off. La bouche reste à peu près synchronisée puisque le texte est le même. Une phrase courte par plan :

- « Eh ! Viens, je te montre. Salut ! »
- « Moi, je suis ton guide OJA. »
- « Alors regarde, je vais te montrer comment l'ajouter. »
- « Et voilà ! »
- « À toi de jouer ! »

## Ce qu'il faut éviter (vu sur le clip d'essai)

- **Visage qui change :** le clip d'essai a un visage-écran noir avec yeux LED, et non le visage orange de la référence. Ajouter : `keep the orange face with painted eyes from the reference, NOT a black screen face`. Si tu préfères le visage-écran LED, choisis-le pour **toute** la série et refais l'image de référence.
- **Texte incrusté :** le clip d'essai contient « TON GUIDE OJA ». Il faut l'interdire (`no text`), car je pose les textes en motion design.
- **Fond détaillé et caméra qui bouge :** ils empêchent le détourage. Il faut un fond uni et une caméra fixe.

## Ce que j'en fais ensuite

1. Je détoure le fond vert de chaque plan.
2. Je découpe, ralentis ou mets en boucle chaque geste pour le caler sur la phrase correspondante de la voix off.
3. Je pose l'iPhone 3D, l'interface OJA, les textes, les cartes et le logo autour de la mascotte, comme dans le tutoriel actuel.
4. Je mixe la voix off, la musique et les bruitages.
