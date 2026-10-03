# Bibliothèque de clips de la mascotte (fond vert, Google Flow)

Tous les clips sont dans `clips/` : 720 × 1280, 24 i/s, 8 s, visage orange.

- **Détourage :** `python3 key_clips.py` (tous les clips) ou `python3 key_clips.py 7 8` (certains clips seulement). Il crée `assets/mc/c{n}_{001..192}.webp` (612 × 960, avec transparence).
- **Utilisation dans les pages :** `SEG = [[début, fin, clip, départ dans le clip, 'f' | 'p']]`. `'p'` est le mode aller-retour, utile pour une attente. Ensuite `vbody(id, t, x, piedsY, échelle)` place la mascotte (voir `chauffeur_tuto.html` ou `passager_tuto.html`).

| Clip | Action | Moments clés (dans le clip) | Usage conseillé |
|---|---|---|---|
| c1 | Salut de la main | salut de 1,5 à 5,5 s | « Salut ! », au revoir, « Parfait ! » |
| c2 | Attente, puis clin d'œil et pointe | attente de 0 à 4,5 s, clin d'œil + pointe de 4,5 à 6,5 s | Écoute (mode `p`), « À toi de jouer ! » |
| c3 | Même chose que c2 | clin d'œil + pointe de 4,5 à 6,5 s | Montrer un bouton ou un résultat |
| c4 | Salue, pointe à gauche, s'accroupit, saute hors du cadre | salut de 2 à 3,5 s, pointe à gauche vers 4 s, accroupi à 6 s, saut à partir de 7 s | Pointer le téléphone à gauche, sortie avant le logo |
| c5 | Gestes de présentation, se tourne | présente de 1,5 à 3 s, se tourne de 3 à 5,5 s, salue à 6 s | Explications, listes |
| c6 | Atterrissage | se pose vers 1 s, rebondit à 2 s, mains sur les hanches à la fin | Entrée en scène |
| c7 | Ouvre grand les bras | lève les bras de 2 à 2,5 s, bras ouverts tenus de 3 à 8 s | « Et voilà ! », « Tout ça avec OJA » |
| c8 | Saut de joie, bras levés | s'accroupit à 2 s, saute de 2,5 à 4,5 s, retombe à 5 s, attente à partir de 6 s | Validation, compte activé, paiement réussi |
| c9 | Pointe vers le haut, l'air malin | pointe en haut de 2 à 6,5 s (petit éclat vers 5 s) | Astuce, « Bonne idée ! », montrer un titre en haut |
| c10 | Regarde son téléphone et tape dessus | téléphone en main pendant tout le clip | « Ouvre l'app », pendant qu'un écran défile |
| c11 | Hoche la tête, puis pouce levé | hochement de 1,5 à 3 s, pouce levé de 3,5 à 6 s | « C'est bon ! », confirmation d'étape |

Clips c7 à c11 ajoutés le 3 octobre 2026.
