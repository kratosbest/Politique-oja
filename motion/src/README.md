# Sources et outils des vidéos (pour reprendre le travail dans une nouvelle session)

Les pages `motion/*.html` sont générées à partir des fichiers de ce dossier. Chaque script `*_build.py` réécrit sa page dans `motion/` ; les relancer telles quelles redonne exactement les pages commitées.

| Vidéo | Page | Sources | Son (script → fichier) |
|---|---|---|---|
| COMING SOON 3 — compte à rebours | `comingsoon_countdown.html` | `cd_body.js`, `bj_map.js`, `cd_build.py` | `music13.py` → `assets/soundtrack_comingsoon_countdown.m4a` |
| COMING SOON 1 — « Quelque chose arrive » 16:9 / 9:16 | `comingsoon_trailer.html`, `comingsoon_trailer_9x16.html` | `cs1_body.js`, `cs1_build.py`, `cs1v_tail.js`, `cs1v_build.py` | `music14.py` |
| COMING SOON 2 — « Et si tout était plus simple ? » | `comingsoon_simple.html` | `cs2_body.js`, `cs2_build.py` | `music15.py` |
| COMING SOON 6 — « Ils ne savent pas encore » | `comingsoon_ilsnesavent.html` | `cs6_body.js`, `cs6_build.py` | `music16.py` |
| COMING SOON 4 — « OJA, c'est pour nous » | `comingsoon_pournous.html` | `cs4_body.js`, `cs4_build.py` | `music17.py` |
| COMING SOON 5 — « Le téléphone » | `comingsoon_telephone.html` | `cs5_body.js` (remplace le texte entre `const W = 1080` et `</script>` dans la page) | `music18.py` |
| Pub OJA Market « Tout ce que vous aimez » | `oja_market_pub.html` | `mkp_body.js`, `market_body.js`, `mkp_build.py`, `../mkp_assets.py` | `music20.py` (sans « whoosh ») |
| OJA Marchand « Tu cuisines, OJA livre » | `oja_marchand_tucuisines.html` | `mch_body.js`, `market_body.js`, `merchant_scenes.js`, `mch_build.py` | `music21.py` + voix `assets/mch/voix_marchand.mp3` (générée avec `tts.py`) ; vélo `../velo_asset.py` |
| OJA « Arrête de marchander » | `oja_arrete_de_marchander.html` | `amm_body.js`, `amm_build.py` (+ préludes Market/Marchand), plan d'accroche `../amm_frames.py` | `music22.py` + voix `assets/amm/voix_marchander.mp3` |
| OJA « Le moteur a lâché » | `oja_moteur_lache.html` | `pan_body.js`, `pan_build.py` | `music23.py` + voix `assets/pan/voix_panne.mp3` |
| OJA « Dis-le à OJA » | `oja_dis_le_a_oja.html` | `dis_body.js`, `dis_build.py` | `music24.py` + voix `assets/dis/voix_disle.mp3` |
| OJA Partage « Même trajet, 25 % moins cher » | `oja_meme_trajet_partage.html` | `prt_body.js`, `prt_build.py` | `music25.py` + voix `assets/prt/voix_partage.mp3` |
| OJA Mascotte « Défis des lieux » | `oja_defis_lieux_mascotte.html` | `dfl_body.js`, `dfl_build.py` (clips mascotte `assets/mc/`) | `music26.py` + voix `assets/dfl/voix_defis.mp3` |
| OJA « Livré à ton heure » | `oja_livre_a_ton_heure.html` | `liv_body.js`, `liv_build.py` | `music27.py` + voix `assets/liv/voix_livre.mp3` |
| OJA chauffeurs « Arrête de tourner à vide » | `oja_chauffeur_tourner_a_vide.html` | `chv_body.js`, `chv_build.py` | `music28.py` + voix `assets/chv/voix_chauffeur_vide.mp3` |
| OJA chauffeurs, version éditoriale | `oja_chauffeur_editorial.html` | `edt_body.js`, `edt_build.py` (polices `fonts/editorial.css`, photos `assets/edt/`) | `music29.py` + même voix |
| OJA « Une journée à Cotonou » (16:9) | `oja_journee_cotonou.html` | `jour_body.js`, `bj_map.js`, `jour_build.py` | `music30.py` + voix `assets/jour/voix_journee.mp3` |
| OJA « Le local devient visible » (16:9 et 9:16) | `oja_lieux_visible.html`, `oja_lieux_visible_9x16.html` | `lieu_body.js`, `lieu_build.py` (photos `assets/lieux/`) | `music31.py` + voix `assets/lieux/voix_lieux.mp3` |
| NOVOJA « Ce qui dort chez toi vaut de l'argent » (16:9 et 9:16) | `oja_novoja_film.html`, `oja_novoja_film_9x16.html` | `nov_body.js`, `nov_build.py` (photos `assets/nov/`) | `music32.py` + voix `assets/nov/voix_novoja.mp3` |
| OJA « Zémidjan, avec OJA ça change » (9:16) | `oja_zemidjan.html` | `zem_body.js`, `zem_build.py` (photos `assets/zem/`) | `music33.py` + voix `assets/zem/voix_zem.mp3` |
| OJA « Conducteur de tricycle, avec OJA ça change » (9:16) | `oja_tricycle.html` | `tri_body.js`, `tri_build.py` (photos `assets/tri/`) | `music34.py` + voix `assets/tri/voix_tri.mp3` |

## Outils
- **ffmpeg :** `pip install imageio-ffmpeg`, puis `python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"` donne le chemin du binaire.
- **Rendu :** depuis `motion/` : `PAGE=page.html VW=1080 VH=1920 node render.js 24 <début> <fin> sortie.mp4 <ffmpeg>`. Couper en 4 morceaux lancés en parallèle, les concaténer, puis multiplexer avec la bande son (x264 `-preset slow -crf 20 -maxrate 14M -bufsize 28M`, son AAC 192k, `loudnorm=I=-14`).
- **Rendu en une commande :** `src/render_video.sh page.html <secondes> <bande son> sortie.mp4 <ffmpeg>` (ajouter `VW=1920 VH=1080` devant pour une page 16:9).
- **Aperçus :** `PAGE=page.html VW=1080 VH=1920 node src/snap.js <dossier> 1.5 3.2 …` (une image JPEG par instant).
- **Détourage :** `cutout2.py` (rembg `isnet-general-use` + remplissage par inondation ; modes `ai` / `union`).
- **Images ElevenLabs :** le connecteur ElevenLabs de Claude (`creative_generate_image`) fonctionne avec le forfait Creator ; l'API `/v1/flows/image` de `img.py` demande le forfait Pro.
- **Voix ElevenLabs :** `tts.py` (voir son en-tête). La clé vient des réglages de l'environnement : un secret réseau pour `api.elevenlabs.io` (en-tête `xi-api-key`) ou la variable `ELEVENLABS_API_KEY`. Il vérifie les crédits avant chaque génération et refuse tout dépassement du forfait. Il écrit aussi les temps de chaque caractère dans `<sortie>.json`, pour caler les sous-titres sur la voix.
  - Voix habituelle : « Isac », `SomyDQQmnE7TsltdiDgp` (voix d'homme, léger accent ivoirien).
  - Toujours écrire « Odja » dans les textes, pour que la voix ne dise pas « O-J-A ».
- **Musique :** scripts `music*.py` entièrement synthétisés (numpy). Les transitions d'écran utilisent un accord inversé (`swell`), pas de « whoosh » de souffle.

## Repères visuels du Bénin
- **Taxis-motos (zems) :** chemise jaune à Cotonou, chemise bleue à Porto-Novo. Ne jamais les habiller en orange ; l'orange OJA se met sur les autres éléments.
- **Pas de numéro de zem ni de plaque lisible** sur les images générées (données personnelles fictives ou absentes).

## Images : Google Flow
Les images peuvent être générées de deux façons. Le circuit et les règles sont dans `motion/flow/README.md`.
- **Par l'équipe dans Google Flow,** à partir des prompts de Claude.
- **Par Claude dans ElevenLabs,** avec le modèle le moins cher qui garde le même visage : Nano Banana 2 Lite (`gemini-3.1-flash-lite-image`, 1K, 9:16), avec le portrait de référence joint à chaque scène. Comptez 206 crédits pour le portrait et 309 par scène.

ElevenLabs sert aussi aux voix.

## Captures App Store
`node src/store_build.js store/shots.json` (avec `FFMPEG=<chemin de ffmpeg>`) : pour chaque écran de `shots.json` (surtitre, titre, captures), il produit une image aux tailles exactes acceptées par App Store Connect, en PNG sans transparence, dans `store/out/<taille>/`. Dans le titre, `*mot*` passe en orange. Le cadre de l'appareil s'ajuste à la forme de la capture.

Chaque taille utilise la capture prise sur son propre type d'appareil (clé dans `captures`). Apple refuse les captures d'iPhone étirées pour l'iPad. `skip` retire un écran d'une taille (par exemple, de Google Play, un écran qui montre l'App Store). Dans une série, la place du titre est celle du titre le plus haut, pour que tous les téléphones aient la même taille.
| Taille | Pixels | Capture | Quand |
|---|---|---|---|
| `iphone_6.9` | 1320 × 2868 | `phone` | Série iPhone principale, réduite par Apple pour les autres iPhone |
| `iphone_6.5` | 1284 × 2778 | `phone` | Série de secours, seulement si Apple la réclame |
| `iphone_6.3` | 1206 × 2622 | `phone` | iPhone 6,1 et 6,3 pouces, demandée par la fiche OJA dans App Store Connect |
| `ipad_13` | 2064 × 2752 | `ipad` | L'app tourne sur iPad |
| `duo_outer` | 1398 × 2034 | `duo_outer` | iPhone Duo plié, écran extérieur |
| `duo_inner` | 2007 × 2853 | `duo_inner` | iPhone Duo déplié, écran intérieur |
| `play_phone` | 1080 × 1920 | `phone` | Google Play, téléphone (de 2 à 8 images) |

Les captures iPhone Duo se prennent dans le simulateur iPhone Duo de Xcode 27.1 (ou sur l'appareil). Apple les exigera à partir d'avril 2027 pour les apps compilées avec le SDK iOS 27.1 ou plus récent ; elles ajoutent le badge « iPhone Duo » sur la fiche du Store.

Une série App Store compte de 1 à 10 images. Utilisez uniquement des captures de la version envoyée au Store, sans donnée personnelle visible.

Les captures de `store/captures/` sont prêtes à l'emploi : les originaux restent hors du dépôt, et les adresses, le numéro de téléphone et la position sur la carte y sont floutés.
