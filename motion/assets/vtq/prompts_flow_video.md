# Prompts Google Flow (vidéo) — « Vendez tranquille »

7 clips de 8 s, un par scène du film. Chaque clip part de l'image déjà faite pour la scène, pour garder la même vendeuse, la même tenue et la même boutique.

**Avant tout : importez les 7 images dans votre projet Flow** (bouton d'ajout ou glisser-déposer). Flow ne voit que les images du projet.

**Réglages dans Flow, pour chaque clip :**
1. Dans le prompt, tapez **@** et choisissez l'image de la scène dans la liste (par exemple `v_live`) : c'est elle qui sert de **première image**. Chaque prompt commence par « Start from @v_… » ; remplacez ce mot par l'image choisie avec @ si Flow ne la relie pas tout seul.
2. Modèle **Veo 3.1 – Fast** (beaucoup moins de crédits que « Quality »).
3. Format **9:16 (portrait)**.
4. Nombre de résultats : **x1**.
5. Collez le prompt, générez, puis téléchargez le clip en **1080p** et envoyez-le-moi avec son nom (`c_live.mp4`, etc.).

Les phrases de la vendeuse sont dans les prompts pour que ses lèvres bougent sur les bons mots ; au montage, je garde la voix d'Alimata et la voix d'Isac. Les prompts restent en anglais, que Veo suit mieux ; seules ses répliques sont en français.

---

## 1. `c_live.mp4` — le live · image : `v_live.jpg`
```
Start from @v_live as the first frame. Keep exactly the same woman, the same emerald green and gold wax-print dress and headwrap, the same gold hoop earrings and the same wax fabric shop in Cotonou, Benin. Vertical 9:16 video, 8 seconds, realistic, filmed from a smartphone on a small tripod in front of her, like a live sale on social media: very slight natural camera shake, warm evening lamps, a ring light reflected in her eyes. She lifts the folded bright wax fabric towards the camera, opens it a little to show the pattern, smiles warmly and speaks to the camera with energy, in French with a West African accent: "Bonsoir la famille, on est en direct ! Ce wax-là, il en reste trois. Qui prend ?" Then she laughs and nods. Audio: only her voice and the quiet sound of the shop. No music, no subtitles, no on-screen text, no logos.
```

## 2. `c_doute.mp4` — la fausse capture · image : `v_doute.jpg`
```
Start from @v_doute as the first frame. Keep exactly the same woman, the same emerald green and gold wax-print dress and headwrap, the same gold hoop earrings and the same wax fabric shop in Cotonou, Benin. Vertical 9:16 video, 8 seconds, realistic, slow push-in camera. She stands behind the wooden counter and looks down at her smartphone; the screen faces her and is never visible. She zooms in on the screen with two fingers, frowns, raises one eyebrow in doubt, tilts her head, then slowly shakes her head, suspicious, lips pressed together. A short notification sound at the start. Audio: quiet shop ambience, no dialogue. No music, no subtitles, no on-screen text, no logos.
```

## 3. `c_colere.mp4` — elle dénonce face caméra · image : `v_colere.jpg`
```
Start from @v_colere as the first frame. Keep exactly the same woman, the same emerald green and gold wax-print dress and headwrap, the same gold hoop earrings and the same wax fabric shop in Cotonou, Benin. Vertical 9:16 video, 8 seconds, realistic, filmed in selfie mode as if she is recording a video for her followers to denounce a problem: handheld, slight natural shake, warm lamps. Indignant and tired, she frowns, raises her open hand in exasperation and speaks to the camera in French with a West African accent: "Un autre me dit : je paie quand le livreur arrive." She pauses, sighs, drops her hand and says, tired: "Vraiment, on est fatiguées !" Audio: only her voice and quiet shop ambience. No music, no subtitles, no on-screen text, no logos.
```

## 4. `c_livreur.mp4` — le client ne décroche plus · image : `v_livreur.jpg`
```
Start from @v_livreur as the first frame. Keep exactly the same delivery man (navy blue polo shirt, dark trousers, brown leather belt, silver watch, white sneakers), the same clean black motorbike with the parcel wrapped in wax fabric, and the same villa gate with the white wall and pink bougainvillea, in Cotonou, Benin. Vertical 9:16 video, 8 seconds, realistic, slow push-in from a low angle, bright afternoon sun. Phone to his ear, he waits and says "Allô ? ... Allô ?", lowers the phone and looks at the screen (never visible), calls again, checks his watch, shakes his head and sighs, annoyed. Audio: his voice, a ringing tone from the phone, distant street sounds, birds. No music, no subtitles, no on-screen text, no logos, no license plate.
```

## 5. `c_tranquille.mp4` — avec OJA, elle est tranquille · image : `v_tranquille.jpg`
```
Start from @v_tranquille as the first frame. Keep exactly the same woman, the same emerald green and gold wax-print dress and headwrap, the same gold hoop earrings and the same wax fabric shop in Cotonou, Benin. Vertical 9:16 video, 8 seconds, realistic, soft morning daylight, very slow camera move. Sitting relaxed behind the wooden counter, she hears a soft notification, looks at her smartphone (the screen faces her and is never visible) and breaks into a relieved, happy smile, then takes a calm sip of tea and nods with satisfaction. Audio: a soft notification sound and quiet morning ambience, no dialogue. No music, no subtitles, no on-screen text, no logos.
```

## 6. `c_colis.mp4` — le livreur part avec la commande payée · image : `v_colis.jpg`
```
Start from @v_colis as the first frame. Keep exactly the same woman (emerald green and gold wax-print dress and headwrap), the same young delivery man in a plain dark green polo shirt and helmet, the same motorbike, the shop door and the sunny sandy street in Cotonou, Benin. Vertical 9:16 video, 8 seconds, realistic, bright daylight, steady camera. She hands him the parcel wrapped in colourful wax fabric; he takes it with a smile, places it securely behind him on the motorbike, gives her a friendly thumbs-up, starts the engine and rides off down the street; she smiles and waves. Audio: motorbike engine and street ambience, no dialogue. No music, no subtitles, no on-screen text, no logos, no license plate.
```

## 7. `c_fin.mp4` — la fin, fière · image : `v_fin.jpg`
```
Start from @v_fin as the first frame. Keep exactly the same woman, the same emerald green and gold wax-print dress and headwrap, the same gold hoop earrings and the same wax fabric shop in Cotonou, Benin. Vertical 9:16 video, 8 seconds, realistic, warm golden light, slow dolly-in towards her. She stands proudly with her arms crossed and a big confident smile, then uncrosses her arms, opens one hand towards the camera in a welcoming gesture and laughs softly. Calm, confident and happy. Audio: quiet shop ambience, no dialogue. No music, no subtitles, no on-screen text, no logos.
```

---

**Si un clip ne va pas :** régénérez uniquement ce clip, toujours en x1. Les défauts à surveiller :
- le visage ou la tenue qui changent ;
- du texte ou des sous-titres qui apparaissent ;
- un écran de téléphone lisible ;
- une plaque d'immatriculation visible.
