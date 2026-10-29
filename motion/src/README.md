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

## Outils
- **ffmpeg :** `pip install imageio-ffmpeg`, puis `python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"` donne le chemin du binaire.
- **Rendu :** depuis `motion/` : `PAGE=page.html VW=1080 VH=1920 node render.js 24 <début> <fin> sortie.mp4 <ffmpeg>`. Couper en 4 morceaux lancés en parallèle, les concaténer, puis multiplexer avec la bande son (x264 `-preset slow -crf 20 -maxrate 14M -bufsize 28M`, son AAC 192k, `loudnorm=I=-14`).
- **Aperçus :** `PAGE=page.html VW=1080 VH=1920 node src/snap.js <dossier> 1.5 3.2 …` (une image JPEG par instant).
- **Détourage :** `cutout2.py` (rembg `isnet-general-use` + remplissage par inondation ; modes `ai` / `union`).
- **Voix ElevenLabs :** `tts.py` (voir son en-tête). Il lit la clé dans la variable d'environnement `ELEVENLABS_API_KEY`, vérifie les crédits avant chaque génération et refuse tout dépassement du forfait. Il écrit aussi les temps de chaque caractère dans `<sortie>.json`, pour caler les sous-titres sur la voix.
  - Voix habituelle : « Isac », `SomyDQQmnE7TsltdiDgp` (voix d'homme, léger accent ivoirien).
  - Toujours écrire « Odja » dans les textes, pour que la voix ne dise pas « O-J-A ».
- **Musique :** scripts `music*.py` entièrement synthétisés (numpy). Les transitions d'écran utilisent un accord inversé (`swell`), pas de « whoosh » de souffle.
