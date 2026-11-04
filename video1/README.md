# Vidéo 1 — « Mettre son business sur la carte » (Derrick face caméra)

La consigne complète est dans `CLAUDE.md`.

| Dossier | Contenu | Dans git |
|---|---|---|
| `rushes/` | Prises de Derrick face caméra | non |
| `reference/` | `reel-reference.mp4`, le reel de référence | non (contenu d'un tiers) |
| `assets/` | `logo-oja-carte.png`, badges officiels des stores, photo de devanture libre de droits, enregistrements d'écran de l'app | oui |
| `exports/` | `OJA-video1-principale.mp4`, `OJA-video1-whatsapp-60s.mp4`, `OJA-video1-accroche.mp4` | oui |

**Méthode :**
1. Choisir les meilleures prises et enlever les silences.
2. Transcrire mot à mot, pour caler les sous-titres et les incrustations.
3. Détourer Derrick image par image, pour les titres placés derrière lui.
4. Composer les incrustations et faire le rendu en 1080 × 1920, 30 i/s, son AAC à 48 kHz.

## Version principale (première version, à valider par Derrick)

`exports/OJA-video1-principale.mp4` : 92 s, 1080 × 1920, 30 i/s, H.264, son AAC 48 kHz, voix à −16 LUFS.

**Montage**
- Une seule prise (`rushes/IMG_1012.mp4`, envoyée en deux parties).
- `src/cut.py` raccourcit les silences de plus de 0,55 s à 0,3 s.
- Il garde 1,4 s avant « mais invisible ».
- Il supprime l'accroc « que naît, que est né », ce qui donne « C'est de là que naît OJA ».

**Sous-titres**
- Ils suivent ce que Derrick dit vraiment, par groupes de 2 à 3 mots, avec les mots clés en orange.
- Corrections d'orthographe : « Dodoo », « OJA », « Ọjà », « marché ».

**Incrustations** (`montage.html`) :
1. « UNE JOURNÉE PERDUE » derrière Derrick.
2. La carte stylisée, l'épingle et « à quelques mètres ».
3. Le bandeau « Derrick Dodoo, fondateur d'OJA », avec le filet aux couleurs du Bénin.
4. L'horloge.
5. Le tampon « ABSENT AU TRAVAIL ».
6. L'épingle qui s'efface sur « invisible ».
7. Le collage « TOURISME ».
8. « ỌJÀ = MARCHÉ ».
9. Le téléphone qui glisse dans la poche.
10. Les 4 mots géants.
11. « SUR LA CARTE ».
12. Le ticket et le tampon « GRATUIT ».
13. Le téléphone « Enregistrer un lieu », avec la liste 1/4 à 4/4.
14. La carte d'accueil, puis la fiche avec « OUVERT », « Appeler » et « S'Y RENDRE AVEC OJA ».
15. Le vertigo.
16. Le Bénin sur la carte.
17. « Ce lieu vous appartient-il ? ».
18. « Partagez », puis le mur de vidéos.
19. La fin : « Mettons le Bénin sur la carte. »

**Musique :** générée par `src/music_v1.py`, donc libre de droits, et mixée environ 21 dB sous la voix par `src/mix.sh`.

**Version 2 (retours de Derrick)**
- Le compteur « NN/24 » en haut est retiré.
- Les logos App Store et Google Play envoyés par Derrick sont dans `assets/store-app-store.png` et `assets/store-google-play.png`. Ils apparaissent sur « Téléchargez OJA » et sur l'écran de fin.
- La devanture d'« Atelier Vulcanisation Gbèto » est une photo générée par IA (ElevenLabs, Nano Banana 2 Lite) : `assets/devanture-gbeto.jpg`. On y voit une rue propre de Cotonou.
- L'écran d'accueil reprend le vrai haut de l'app (`../motion/store/captures/accueil.png`).
- « Enregistrer un lieu » et la fiche du commerce restent en maquette, avec les libellés exacts : il n'existe pas encore de vraie capture de ces écrans.

**Musique :**
- C'est maintenant le son fourni par Derrick, extrait de sa vidéo (`work/fond_sonore.wav`, non versionné). Derrick confirme avoir le droit de l'utiliser.
- `src/music_from_file.py` le met en boucle avec un fondu enchaîné de 3 s pour tenir 92 s. Il le rend plus doux pendant l'histoire et plus fort à l'appel, avec un fondu de fin.
- `src/mix.sh` le place environ 21 dB sous la voix.

**En attente :** les versions 60 s et accroche, à faire après validation.

**Refaire :**
1. `python3 src/cut.py work/rush_stt.json`
2. Transcription de `work/edit.mp4`, qui donne `work/words_edit.json`.
3. `python3 src/data.py`
4. Extraction des images : `ffmpeg -i work/edit.mp4 -vf fps=24 -q:v 3 work/frames/f%04d.jpg`
5. Détourage : `src/masks.py`
6. Musique : `src/music_v1.py`, puis `src/mix.sh`
7. Rendu : `src/render.sh`
