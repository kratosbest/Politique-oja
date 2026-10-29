# OJA (appli client) — fonctions réelles

Source : le code de l'application (octobre 2026). Les chiffres sont les
valeurs PAR DÉFAUT ; chaque pays peut les régler dans le Centre de contrôle.
Toujours vérifier avec l'équipe OJA avant une campagne chiffrée.

Légende « Disponible » :
- **En ligne** : déjà dans l'appli publiée.
- **Version store** : prêt, arrive avec la prochaine version publiée (en
  attente des clés MTN de décaissement). Ne pas promouvoir avant sa sortie.
- **Réglable** : existe, mais doit être activé/réglé par pays.

## 1. Transport (VTC)
| Fonction | Ce que vit le client | Disponible |
|---|---|---|
| Types de véhicules | Moto (zem), tricycle, voiture, voiture confort, livraison | En ligne |
| Prix affiché et vérifié avant le départ | Le prix est calculé par le serveur avant la course ; pas de marchandage | En ligne |
| Question anti-arnaque | Après la course : « Le chauffeur vous a-t-il demandé plus d'argent ? » | En ligne |
| Paiement | Espèces ou MTN Mobile Money | En ligne (MoMo encaissement actif) |
| OJA Partage / Eco | Trajet partagé : prix 25 % moins cher que le prix normal ; CO₂ évité affiché | En ligne |
| Majoration de nuit | +25 % entre 23 h et 6 h (heure locale) — à dire honnêtement | En ligne |
| Heures creuses | Prix réduit (15 % par défaut, 10 h–16 h) quand le pays l'active | Réglable |
| Réservation à l'avance | Course programmée, chauffeur confirmé avant l'heure | En ligne |
| Course relais | Un chauffeur qui termine une course tout près vous prend juste après ; attente affichée | Version store (serveur en ligne) |
| Panne du chauffeur | Si le véhicule tombe en panne, OJA envoie un chauffeur de remplacement ; le prix total du client ne change pas | En ligne |
| Points de prise en charge appris | L'appli propose l'endroit exact où les gens montent vraiment | Version store |
| Fiche chauffeur | Photo, nom, véhicule, plaque, note | En ligne |
| Appel et signalement | Appeler le chauffeur, signaler un problème | En ligne |
| Notation | Note de 1 à 5 après la course | En ligne |
| Français / anglais | Toute l'appli | Version store |

## 2. Sécurité
| Fonction | Ce que vit le client | Disponible |
|---|---|---|
| Partager mon trajet | Pendant une course : lien envoyé par WhatsApp/SMS ; le proche voit la voiture bouger sur une page web, sans appli ni compte ; plaque en grand ; heure d'arrivée ; le lien s'arrête seul à la fin ; aucun téléphone ni prix visible | Version store (serveur en ligne) |
| Suivez-moi (hors course) | Partage de position en direct 30 min / 1 h / 2 h, même appli fermée ; on peut arrêter à tout moment | Version store (serveur en ligne) |
| Partager ma position | Envoi de la position actuelle avec l'adresse | Version store (amélioré) |
| Verrouillage Face ID / empreinte | Protection de l'appli | Version store |

## 3. Défis OJA (récompenses) — **Réglable** (désactivés par défaut)
Réductions à usage unique, plafonnées, valables 30 jours (sauf mention).
| Défi | Récompense par défaut |
|---|---|
| Bienvenue (1re course) | −50 % (plafond 500 F) |
| Ami invité (code / lien) | Parrain : −20 % quand l'ami a fait sa 1re course (plafond 500 F, 5 fois/mois max). Filleul : −20 % sur sa 2e course (plafond 500 F), en plus de la bienvenue |
| Premier colis envoyé | −10 % (plafond 500 F) |
| Première commande Market | −10 % (plafond 500 F) |
| Pass découverte (4 services utilisés) | −25 % (plafond 1 000 F), badge « OJA complet » |
| Lieux ajoutés : 3 / 10 / 25 | −15 % / −20 % / −25 % (plafonds 500 / 1 000 / 1 500 F), badges Éclaireur, Guide de quartier, Cartographe |
| Mon lieu a aidé 10 personnes | −20 % (plafond 500 F, 3 fois/mois) |
| Signalement confirmé | −5 % (plafond 200 F, 3 fois/mois), badge Vigilant |
| Défi du mois (5 courses) | −10 % (plafond 500 F) |
| Série de semaines | 2 sem. −5 %, 3 sem. −10 %, 4 sem. −15 % (plafond 500 F) |
| Anniversaire | −30 % pendant 7 jours (plafond 500 F) |
| Guides du mois (classement des lieux) | Les 3 premiers (au moins 3 lieux) : une course offerte (plafond 1 500 F) |
| Défis de quartier | Campagnes locales créées par OJA (ex. « 50 lieux à Akpakpa ») |
| Badges | Premier pas, Éclaireur, Guide de quartier, Cartographe, Lieu utile, Lieu star, Vigilant, OJA complet, En feu, Éco-citoyen, Ambassadeur, Guide du mois… |

Notes : un lieu ajouté via « Enregistrer un lieu » compte pour les Défis
après confirmation par l'équipe OJA. Le prix ne descend jamais sous 100 F.
Budget mensuel par pays : quand il est épuisé, le badge reste, la réduction
est donnée plus tard.

## 4. Parrainage
- Chaque client a un code à 7 caractères et un **lien d'invitation**
  (`oja-app-6265f.web.app/invite/CODE`) qui mène au bon store (Android ou
  iPhone). Sur Android, le code s'enregistre tout seul. — Lien : en ligne ;
  partage depuis l'appli : version store.
- Champ « Un ami t'a invité ? » à la fin de l'inscription — version store.

## 5. Lieux intelligents
- On trouve les lieux par le nom que les gens leur donnent (« la pharmacie
  derrière le marché »), pas seulement par les adresses Google.
- Lieux publics ajoutés par la communauté (publiés quand 2 personnes donnent
  le même nom au même endroit, ou validés par OJA).
- « C'est mon commerce » : un commerçant revendique sa fiche (SMS au numéro
  du commerce + photo sur place).
- Signaler un problème sur une fiche (fermé, mauvais endroit, doublon).

## 6. NOVOJA (seconde main et dons)
- Vendre ou donner des objets entre particuliers.
- Discussions acheteur/vendeur dans l'appli.
- **Paiement protégé** : l'acheteur paie, l'argent est gardé par OJA jusqu'à
  ce qu'il confirme la réception ; le vendeur est payé ensuite (MoMo).
- Litiges arbitrés par l'équipe OJA ; remboursement au numéro qui a payé.
- Livraison possible par OJA.

## 7. Market et livraison
- Commander dans les commerces et restaurants sur OJA.
- Livraison de colis entre particuliers.
- **Livraison programmée « Livré à… »** (colis et repas) : créneau de 15 min ;
  en cas de retard au-delà du créneau, réduction −10 % automatique sur la
  prochaine course ou livraison de colis (30 jours).
- Suivi du livreur en direct.

## 8. Pour les chauffeurs (recrutement)
- Ristourne quotidienne : plus de courses dans la journée = palier plus élevé
  (montants fixés par pays).
- Forfait (pass) : chauffeurs au forfait avec montant fixe par course (montant
  Bénin à fixer avant toute communication).
- Zones chaudes : l'appli montre où sont les clients (et, si le pays l'active,
  un bonus de zone payé par OJA).
- Course relais : enchaîner sans rouler à vide.
- Relevé complet de toutes les transactions.
- Paiement des gains sur MTN MoMo (à la mise en service du décaissement).
EOF
