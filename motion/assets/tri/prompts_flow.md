# Prompts Google Flow — sensibilisation des conducteurs de tricycle (9:16)

**Pour que les images soient précises (essai du 30 octobre 2026)**

Sans image de référence jointe, Nano Banana invente un homme différent à chaque fois. Le mot « auto-rickshaw » l'a même envoyé vers une rue indienne. Pour l'éviter :
1. **Réglez le nombre d'images sur x1** (le « x2 » dans la barre de saisie). On obtient une seule photo par prompt.
2. **Gardez un seul portrait de référence** (`tri_ref.png`).
3. **Avant chaque scène, joignez ce portrait avec le « + »** de la barre de saisie. C'est l'étape qui garde le même visage, les mêmes vêtements et le même tricycle.
4. **Collez le prompt de la scène.** Il demande de reprendre l'homme de l'image jointe et ne décrit que ce qui change, avec des repères de Cotonou (zems en chemise jaune, sable, wax) et « Not India ».
5. **Régénérez** si le visage, les vêtements ou le lieu ne vont pas. Envoyez-moi ensuite les images ici ou dans `motion/flow/in/tri/`, avec les noms indiqués.

---

## 0. `tri_ref.png` — portrait de référence
L'homme, bien habillé et soigné, est assis dans la cabine de son tricycle jaune et noir. Il regarde l'objectif, calme et souriant.
```
Generate one single photograph only (one image, no grid, no collage, no split panels, no variations). Documentary street photograph, vertical 9:16: portrait of a well-dressed, neatly groomed Beninese tricycle taxi driver in Cotonou, about 38 years old, short black hair with a clean cut, neatly trimmed short beard, warm brown skin with natural texture. He wears a crisp, well-ironed short-sleeved button-up shirt in light sky blue, tucked into tailored dark navy trousers with a brown leather belt, a classic silver watch, clean and smart. He is seated at the handlebar inside the open cabin of his clean yellow and black tricycle taxi (keke), calm, friendly, confident expression looking at the camera, a slight proud smile. Framed from the waist up, his face in the upper half of the image. Behind him a softly blurred busy market street of Cotonou, bright daylight. Natural colours, crisp detail, shallow depth of field, 50mm. Black West African man, Cotonou, Benin. No readable text or signs, no logos, no license plate. Not India.
```

---

## 1. `t_attente.png` — la galère : il attend près du marché
« Tu attends au bord de la route, près du marché » / « Le temps passe, le carburant aussi ».
```
Use the attached reference image. Keep exactly the same Black Beninese man (same face, same short beard, same crisp light sky blue short-sleeved shirt, dark navy trousers, brown leather belt, silver watch) and exactly the same yellow and black tricycle taxi. Generate one single photo, vertical 9:16, realistic documentary photography, in Cotonou, Benin, West Africa. Scene: hot afternoon, his tricycle is parked by the roadside next to a crowded market; he sits alone in the driver seat, the passenger bench behind him empty, wiping sweat from his forehead, tired and worried; people walk past without stopping. West African street: sandy roadsides, zemidjan motorbike taxis with drivers in yellow shirts, market stalls with colourful wax fabrics. Harsh sunlight, dusty air. His face in the upper half of the image. No readable text or signs, no logos, no license plate. Not India.
```

---

## 2. `t_appel.png` — la galère : il appelle les passants, il roule à vide
« Tu appelles les passants… et souvent, tu roules à vide. »
```
Use the attached reference image. Keep exactly the same Black Beninese man (same face, same short beard, same crisp light sky blue short-sleeved shirt, dark navy trousers, brown leather belt, silver watch) and exactly the same yellow and black tricycle taxi. Generate one single photo, vertical 9:16, realistic documentary photography, in Cotonou, Benin, West Africa. Scene: he drives the tricycle slowly along a busy street, the passenger bench empty, leaning out of the cabin and calling to passers-by with one hand raised, nobody stops; frustrated face. West African street: sandy roadsides, zemidjan motorbike taxis with drivers in yellow shirts, market stalls with colourful wax fabrics. Harsh midday sun. His face in the upper half of the image. No readable text or signs, no logos, no license plate. Not India.
```

---

## 3. `t_tranquille.png` — avec OJA : tranquille à l'ombre
« Tu restes tranquille. Ce sont les clients qui viennent à toi. »
```
Use the attached reference image. Keep exactly the same Black Beninese man (same face, same short beard, same crisp light sky blue short-sleeved shirt, dark navy trousers, brown leather belt, silver watch) and exactly the same yellow and black tricycle taxi. Generate one single photo, vertical 9:16, realistic documentary photography, in Cotonou, Benin, West Africa. Scene: the tricycle is parked in the cool shade of a big mango tree by a quiet sandy street; he sits relaxed in the driver seat holding a small bottle of water, his smartphone in his other hand, calm, a slight easy smile. Dappled shade, vivid warm colours. His face in the upper half of the image. No readable text or signs, no logos, no license plate. Not India.
```

---

## 4. `t_phone.png` — avec OJA : une course arrive
« La course arrive sur ton téléphone, tu acceptes. »
```
Use the attached reference image. Keep exactly the same Black Beninese man (same face, same short beard, same crisp light sky blue short-sleeved shirt, dark navy trousers, brown leather belt, silver watch) and exactly the same yellow and black tricycle taxi. Generate one single photo, vertical 9:16, realistic documentary photography, in Cotonou, Benin, West Africa. Scene: seated in his parked tricycle, he looks at the smartphone in his hand and smiles with happy surprise, eyebrows raised; the screen faces him and is not visible. West African street: sandy roadsides, zemidjan motorbike taxis with drivers in yellow shirts, market stalls with colourful wax fabrics. Bright daylight. His face in the upper half of the image. No readable text or signs, no logos, no license plate. Not India.
```

---

## 5. `t_rejoint.png` — avec OJA : il va droit vers la cliente
« …et tu vas droit vers elle. » La maman et ses courses lui font signe.
```
Use the attached reference image. Keep exactly the same Black Beninese man (same face, same short beard, same crisp light sky blue short-sleeved shirt, dark navy trousers, brown leather belt, silver watch) and exactly the same yellow and black tricycle taxi. Generate one single photo, vertical 9:16, realistic documentary photography, in Cotonou, Benin, West Africa. Scene: at the roadside near the market, a smiling young Beninese mother in a wax-print dress, holding her little daughter's hand, with full shopping bags at her feet and her phone in her other hand, waves at him; he pulls up next to her in the tricycle with a friendly smile. West African street: sandy roadsides, zemidjan motorbike taxis with drivers in yellow shirts, market stalls with colourful wax fabrics. Bright daylight. His face in the upper half of the image. No readable text or signs, no logos, no license plate. Not India.
```

---

## 6. `t_livraison.png` — avec OJA : une livraison pour une commerçante
« Tu peux aussi faire des livraisons pour les commerçants. »
```
Use the attached reference image. Keep exactly the same Black Beninese man (same face, same short beard, same crisp light sky blue short-sleeved shirt, dark navy trousers, brown leather belt, silver watch) and exactly the same yellow and black tricycle taxi. Generate one single photo, vertical 9:16, realistic documentary photography, in Cotonou, Benin, West Africa. Scene: in front of a small colourful shop, a smiling Beninese shopkeeper woman hands him a sealed plain cardboard box, and he loads it onto the back bench of the tricycle next to two other plain boxes; both smile. Bright daylight, vivid colours. His face in the upper half of the image. No readable text or signs, no logos, no license plate. Not India.
```

---

## 7. `t_papiers.png` — l'inscription : ses papiers en photo
« …puis ton tricycle et tes papiers, en photo. »
```
Use the attached reference image. Keep exactly the same Black Beninese man (same face, same short beard, same crisp light sky blue short-sleeved shirt, dark navy trousers, brown leather belt, silver watch) and exactly the same yellow and black tricycle taxi. Generate one single photo, vertical 9:16, realistic documentary photography, in Cotonou, Benin, West Africa. Scene: seated in his parked tricycle in a quiet shaded street, he holds an identity card in one hand and takes a photo of it with the smartphone in his other hand, focused and serious; the card is seen at an angle, nothing on it readable. Soft shade light. His face in the upper half of the image. No readable text or signs, no logos, no license plate. Not India.
```

---

## 8. `t_fin.png` — la fin : fier, au coucher du soleil
« Conducteur de tricycle, roule avec OJA. Les clients t'attendent. »
```
Use the attached reference image. Keep exactly the same Black Beninese man (same face, same short beard, same crisp light sky blue short-sleeved shirt, dark navy trousers, brown leather belt, silver watch) and exactly the same yellow and black tricycle taxi. Generate one single photo, vertical 9:16, realistic documentary photography, in Cotonou, Benin, West Africa. Scene: golden hour on a wide avenue of Cotonou lined with palm trees, he sits in the driver seat of his tricycle facing the camera with a big proud confident smile, relaxed; warm sunset light, blurred traffic. His face in the upper third of the image, the lower half calm. No readable text or signs, no logos, no license plate. Not India.
```
