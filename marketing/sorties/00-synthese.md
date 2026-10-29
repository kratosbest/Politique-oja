# 00 — Ce que j'ai compris d'OJA (prompt 00)

## En 10 lignes
1. OJA est une appli béninoise qui réunit tout le quotidien : se déplacer (zem, tricycle, voiture, confort, livraison), envoyer des colis, commander au restaurant ou en boutique (Market), vendre ou donner des objets (NOVOJA).
2. OJA Marchand est l'appli des commerçants : catalogue, commandes, livraison par OJA. Sur OJA Market, tout se paie par MTN MoMo (précision de l'équipe OJA ; le kit indiquait aussi les espèces).
3. La promesse : **« OJA. Tout ton Bénin dans une seule appli. »** Variante : « Bouge, envoie, mange, vends. Et gagne en le faisant. »
4. Trois émotions à faire sentir en 3 secondes : « Je ne me fais plus avoir », « Mes proches sont rassurés », « OJA me rapporte ».
5. Nos preuves : le prix est calculé avant le départ, la question « Le chauffeur vous a-t-il demandé plus d'argent ? », le paiement protégé NOVOJA, le partage de trajet, le chauffeur de remplacement en cas de panne, les Défis et badges.
6. Face aux « autres applis » (jamais nommées), OJA ne se présente pas comme « une appli pour se déplacer » mais comme l'appli de tout le quotidien, avec des récompenses et de la confiance.
7. Le ton est direct, chaleureux, malin et très local (Cotonou, Calavi, Porto-Novo, Parakou…), avec des phrases courtes, de l'humour bienveillant et une accroche dite ET écrite dans les 3 premières secondes.
8. Honnêteté : chaque pourcentage est donné avec son plafond, le mot « gratuit » est interdit (une course « offerte » coûte au moins 100 F), il n'y a pas de faux témoignages, et les prix montrés sont les vrais prix du trajet filmé.
9. Données personnelles : plaques, numéros et noms sont fictifs ou floutés, et aucune vraie position d'une vraie personne n'apparaît à l'écran.
10. Plusieurs fonctions dépendent de la nouvelle version sur les stores, de l'activation des Défis (avec un budget mensuel) ou du décaissement MTN : chaque contenu doit indiquer sa dépendance.

## À NE PAS promouvoir avant la version store
| Fonction | Appli |
|---|---|
| Partager mon trajet (lien WhatsApp/SMS, page web de suivi) | OJA |
| Suivez-moi (partage de position 30 min / 1 h / 2 h hors course) | OJA |
| Partager ma position (version améliorée) | OJA |
| Course relais (côté client et côté chauffeur) | OJA |
| Points de prise en charge appris | OJA |
| Appli en français / anglais | OJA |
| Verrouillage Face ID / empreinte | OJA et OJA Marchand |
| Partage du lien d'invitation depuis l'appli, champ « Un ami t'a invité ? » | OJA |
| « C'est mon commerce » (revendiquer sa fiche) | OJA Marchand |

## Autres dépendances à vérifier avant publication
| Ce qu'on veut dire | Il faut d'abord |
|---|---|
| Toute réduction des Défis (−50 % bienvenue, parrainage, anniversaire…) | Défis activés au Bénin **et** budget mensuel fixé (il vaut 0 par défaut : sans lui, seuls les badges sont donnés) |
| Heures creuses (−15 % de 10 h à 16 h) | Activation au Bénin |
| « L'argent arrive sur ton MoMo » (vendeurs NOVOJA, commerçants, chauffeurs) | Décaissement MTN actif |
| Forfait chauffeur, montants de ristourne | Montants Bénin fixés par OJA |
| Bonus de zone chaude | Activation par le pays |
| Commission ou abonnement commerçant | Montants confirmés par OJA (5 % par défaut, réglable) |
| Tout pourcentage | Vérification dans le Centre de contrôle (réglable par pays) |

## Comment lire les fichiers de `sorties/`
- `[ENTRE CROCHETS]` : à remplacer par une valeur réelle avant tournage ou publication (prix du trajet filmé, montant chauffeur, nom du commerçant, code d'invitation…).
- Chaque contenu porte une ligne **Dépendance** : ne pas le publier tant qu'elle n'est pas remplie.
- Les versions « à faire traduire en fon » sont des textes français simplifiés pour un traducteur natif ; je n'écris pas moi-même en fon.
