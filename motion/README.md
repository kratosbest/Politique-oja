# OJA Transport — Motion design (lancement Bénin)

Vidéo de présentation en motion design de 65 s, 1920×1080, calée sur la voix off fournie.

- **Vidéo finale :** `OJA_Motion_Benin.mp4` (voix off + musique + sound design)
- **Source :** `index.html`. L'animation est entièrement codée : chaque image est une fonction pure du temps (`renderAt(t)`), ce qui garantit un rendu identique à chaque fois.
- **Aperçu en direct :** ouvrir `index.html?play` dans Chrome via un petit serveur local (`npx serve motion`), puis cliquer pour lancer avec le son.

## Découpage (synchronisé sur la voix off)

| Temps | Voix off | Visuel |
|---|---|---|
| 0–3 s | « Besoin de vous déplacer ? Avec OJA, vous avez le choix. » | Place de l'Amazone (Cotonou) : pin sur la statue, voiture OJA qui entre, logo |
| 3–9 s | Réserver, trajet, option | Téléphone avec l'écran réel « Choisissez votre course » |
| 9–14 s | Voiture, moto, tricycle / budget | Cartes véhicules (vraie voiture et vraie moto OJA détourées), curseur de budget |
| 14–22 s | Formule ÉCO, trajet partagé | Tampon ÉCO, covoiturage, prix 8 130 → 6 100 XOF |
| 22–33 s | Destination, recherche, géolocalisation | Recherche « Marché Dantokpa », carte de Cotonou, trajet |
| 33–37 s | « Vous avez un colis à envoyer ? » | Chute du colis, zoom de transition |
| 37–52 s | Livraison | Appli chauffeur (interrupteur Livraison), cas d'usage, suivi de A à Z |
| 52–56 s | Transport ou livraison | Écran partagé |
| 56–61 s | « OJA — déplacez-vous, envoyez, livrez simplement » | Coupes nettes aux couleurs du drapeau béninois |
| 61–65 s | « Téléchargez OJA… » | Écran de fin, stores, « Bientôt au Bénin » |

## Refaire le rendu

Il faut Node.js avec Playwright (Chromium) et ffmpeg.

```bash
node render.js 30 0 1965 video.mp4 ffmpeg     # images 0 → 1965 à 30 i/s
ffmpeg -i video.mp4 -i assets/soundtrack.m4a -c:v copy -c:a copy -shortest OJA_Motion_Benin.mp4
```

## Visuels

- `assets/car.png`, `assets/moto.png` : détourés à partir des visuels de campagne OJA.
- `assets/amazone.jpg` : Place de l'Amazone, photo © Présidence du Bénin (crédit affiché dans la vidéo).
- Tricycle : illustration provisoire. Pour la remplacer, ajouter une photo détourée `assets/tricycle.png` et l'utiliser dans `VEH` (`index.html`).
