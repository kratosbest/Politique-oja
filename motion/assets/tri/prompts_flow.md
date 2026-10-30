# Prompts Google Flow — sensibilisation des conducteurs de tricycle (9:16)

**Comment faire dans Flow**
- Format **9:16 (vertical)**, à la meilleure qualité proposée.
- Générez d'abord **le portrait de référence** et gardez le meilleur.
- Pour chaque scène, ajoutez ce portrait comme **image de référence**, pour garder le même homme et le même tricycle.
- Nommez chaque image comme indiqué (`tri_ref.png`, `t_attente.png`…), puis envoyez-la ici en pièce jointe, ou déposez-la dans `motion/flow/in/tri/`.
- Régénérez une image avant de l'envoyer si on y voit :
  - un visage différent ;
  - du texte ou un logo ;
  - une plaque lisible ;
  - des mains déformées.

Les prompts sont en anglais, c'est la langue que les modèles d'image suivent le mieux.

---

## 0. `tri_ref.png` — portrait de référence
L'homme, bien habillé et soigné, est assis dans la cabine de son tricycle jaune et noir. Il regarde l'objectif, calme et souriant.
```
Documentary street photograph, vertical 9:16: portrait of a well-dressed, neatly groomed Beninese auto-rickshaw tricycle driver in Cotonou, about 38 years old, short black hair with a clean cut, neatly trimmed short beard, warm brown skin with natural texture. He wears a crisp, well-ironed short-sleeved button-up shirt in light sky blue, tucked into tailored dark navy trousers with a brown leather belt, a classic silver watch, clean and smart. He is seated at the handlebar inside the open cabin of his clean yellow and black auto-rickshaw tricycle, calm, friendly, confident expression looking at the camera, a slight proud smile. Framed from the waist up, his face in the upper half of the image. Behind him a softly blurred busy market street of Cotonou, bright daylight. Natural colours, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```

Variante, plus « wax » si vous préférez :
```
Documentary street photograph, vertical 9:16: portrait of a well-dressed, neatly groomed Beninese auto-rickshaw tricycle driver in Cotonou, about 38 years old, short black hair with a clean cut, neatly trimmed short beard, warm brown skin with natural texture. He wears an elegant, well-fitted short-sleeved shirt in a refined navy and gold wax print with a clean collar, dark tailored trousers, a classic silver watch, clean and smart. He is seated at the handlebar inside the open cabin of his clean yellow and black auto-rickshaw tricycle, calm, friendly, confident expression looking at the camera, a slight proud smile. Framed from the waist up, his face in the upper half of the image. Behind him a softly blurred busy market street of Cotonou, bright daylight. Natural colours, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```

## 1. `t_attente.png` — la galère : il attend près du marché
Image utilisée deux fois : « Tu attends au bord de la route, près du marché » et « Le temps passe, le carburant aussi ».
```
Keep exactly the same man, wearing exactly the same clothes, and the same yellow and black tricycle as in the reference image. Documentary street photograph, vertical 9:16: hot afternoon by the roadside near a big crowded market in Cotonou, he sits alone in the cabin of his parked tricycle, the passenger bench behind him empty, wiping sweat from his forehead, tired and worried, waiting for clients; people walk past without stopping. Waist up, his face in the upper half of the image. Harsh sunlight, dusty air, natural colours, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```

## 2. `t_appel.png` — la galère : il appelle les passants, il roule à vide
« Tu appelles les passants… et souvent, tu roules à vide. »
```
Keep exactly the same man, wearing exactly the same clothes, and the same yellow and black tricycle as in the reference image. Documentary street photograph, vertical 9:16: he drives his tricycle slowly along a busy street of Cotonou with the passenger bench empty, leaning out of the cabin and calling out to passers-by with one hand raised, but nobody stops; frustrated face. His face in the upper half of the image. Harsh midday sun, heat haze, natural colours, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```

## 3. `t_tranquille.png` — avec OJA : tranquille à l'ombre
« Tu restes tranquille. Ce sont les clients qui viennent à toi. »
```
Keep exactly the same man, wearing exactly the same clothes, and the same yellow and black tricycle as in the reference image. Documentary street photograph, vertical 9:16: he sits relaxed in the cabin of his tricycle parked in the cool shade of a big tree by a quiet street of Cotonou, holding a small bottle of water, his smartphone in his other hand, calm and peaceful, a slight easy smile. Waist up, his face in the upper half of the image. Dappled shade, soft warm light, vivid natural colours, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```

## 4. `t_phone.png` — avec OJA : une course arrive
« La course arrive sur ton téléphone, tu acceptes. »
```
Keep exactly the same man, wearing exactly the same clothes, and the same yellow and black tricycle as in the reference image. Documentary street photograph, vertical 9:16: seated in his parked tricycle, he looks at the smartphone in his hand and smiles with happy surprise, eyebrows raised; the phone screen faces him and is not visible to the camera. Waist up, his face in the upper half of the image; blurred street with shops behind. Bright daylight, vivid natural colours, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```

## 5. `t_rejoint.png` — avec OJA : il va droit vers la cliente
« …et tu vas droit vers elle. » La maman et ses courses lui font signe.
```
Keep exactly the same man, wearing exactly the same clothes, and the same yellow and black tricycle as in the reference image. Documentary street photograph, vertical 9:16: at the roadside near a market in Cotonou, a smiling young mother holding her little daughter's hand, with several full shopping bags at her feet and her phone in her other hand, waves at him; he pulls up next to her in his tricycle with a friendly smile and a nod, his face clearly visible. His face in the upper half of the image. Bright daylight, vivid natural colours, lively street behind, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```

## 6. `t_livraison.png` — avec OJA : une livraison pour une commerçante
« Tu peux aussi faire des livraisons pour les commerçants. »
```
Keep exactly the same man, wearing exactly the same clothes, and the same yellow and black tricycle as in the reference image. Documentary street photograph, vertical 9:16: in front of a small colourful shop in Cotonou, a smiling shopkeeper woman hands him a sealed cardboard box, and he loads it onto the back of his tricycle next to two other boxes; both smile. His face in the upper half of the image. Bright daylight, vivid natural colours, crisp detail, shallow depth of field, 50mm. No readable text on the boxes or the shop, no logos, no visible license plate.
```

## 7. `t_papiers.png` — l'inscription : ses papiers en photo
« …puis ton tricycle et tes papiers, en photo. »
```
Keep exactly the same man, wearing exactly the same clothes, and the same yellow and black tricycle as in the reference image. Documentary street photograph, vertical 9:16: seated in his parked tricycle in a quiet shaded street, he holds an identity card in one hand and takes a photo of it with the smartphone in his other hand, focused and serious; the card is seen at an angle, nothing on it readable. Waist up, his face in the upper half of the image. Soft shade light, natural colours, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```

## 8. `t_fin.png` — la fin : fier, au coucher du soleil
« Conducteur de tricycle, roule avec OJA. Les clients t'attendent. »
```
Keep exactly the same man, wearing exactly the same clothes, and the same yellow and black tricycle as in the reference image. Documentary street photograph, vertical 9:16: golden hour on a wide avenue in Cotonou, he sits in the cabin of his tricycle facing the camera with a big proud confident smile, relaxed; warm sunset light, blurred traffic and palm trees behind. Waist up, his face in the upper third of the image; the lower half is calm, mostly the tricycle and the road. Natural warm colours, crisp detail, shallow depth of field, 50mm. No readable text, no logos, no visible license plate.
```
