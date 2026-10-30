# Images générées dans Google Flow (par l'équipe)

Depuis le 30 octobre 2026, les images des films sont générées par l'équipe dans Google Flow. Les crédits ElevenLabs servent seulement aux voix (et, au besoin, aux effets sonores).

## Le circuit
1. Claude écrit les prompts du film dans `motion/assets/<film>/prompts_flow.md` : un portrait de référence, puis une image par scène, avec le format (9:16 ou 16:9) et le nom de fichier attendu.
2. L'équipe génère dans Flow :
   - d'abord le portrait de référence ;
   - puis chaque scène avec ce portrait ajouté comme image de référence, pour garder le même visage.
3. L'équipe envoie les images à Claude, de l'une de ces deux façons :
   - pièces jointes dans la conversation, en gardant la meilleure qualité possible (pas de capture d'écran) ;
   - ou dépôt dans `motion/flow/in/<film>/` sur la branche de travail, avec les noms de fichiers du prompt.
4. Claude vérifie que les images respectent les règles, les recadre, fait le montage, la voix ElevenLabs et la musique, puis rend et livre la vidéo.

## Règles pour les images
- Format : celui indiqué par le prompt, à la plus haute résolution proposée par Flow.
- Même personne d'une scène à l'autre : toujours ajouter le portrait de référence.
- Pas de texte lisible, pas de logo, pas de plaque d'immatriculation lisible, pas de numéro de zem lisible.
- Zems : chemise jaune à Cotonou, bleue à Porto-Novo, jamais orange.
- Personnes générées par IA : la mention « Personnes des images générées par IA » reste à l'écran.
- Si une image ne va pas (visage différent, mains bizarres, texte parasite), la régénérer dans Flow plutôt que de l'envoyer.
