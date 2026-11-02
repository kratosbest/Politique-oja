# Assistant WhatsApp OJA (avec Claude)

L'assistant répond automatiquement sur le numéro WhatsApp de l'entreprise. C'est **Claude** (Anthropic) qui écrit les réponses. Meta ne fournit que le « tuyau » WhatsApp (la WhatsApp Cloud API) ; l'IA de Meta n'est pas utilisée.

## Ce qu'il fait
- Il répond 24 h/24, en français (ou en anglais si on lui écrit en anglais), en messages courts au format WhatsApp.
- Il ne parle que d'OJA et ne dit que ce qui est écrit dans `connaissances.md` : jamais de prix, de commission ni de montant, et aucune promesse de réduction.
- Il prend les **candidatures** des ambassadeurs, chauffeurs, commerçants et partenaires, et les enregistre.
- Il **passe la main à un conseiller** pour les paiements, remboursements, commandes, plaintes, problèmes de sécurité, ou quand la personne le demande. Il se tait ensuite pour ce numéro pendant 12 h.
- Si un membre de l'équipe répond lui-même depuis l'appli WhatsApp Business (mode « coexistence »), l'assistant s'efface aussi pour ce client.
- Il regroupe les rafales de messages (« Bonjour » puis « vous êtes là ? ») en une seule réponse. Il affiche « en train d'écrire… » pendant qu'il prépare sa réponse.
- Il rappelle qu'OJA ne demande jamais de code secret Mobile Money.
- Il ne peut ni écouter les notes vocales ni voir les images : il demande d'écrire, ou transfère au conseiller s'il s'agit d'une capture de paiement.

## Fichiers
| Fichier | Rôle |
|---|---|
| `connaissances.md` | **Ce que l'assistant sait d'OJA.** À relire et à tenir à jour par l'équipe. |
| `consignes.md` | Son comportement : ton, règles, quand transférer, comment prendre une candidature. |
| `app.py` | Le serveur qui reçoit les messages de WhatsApp. |
| `assistant.py` | L'appel à Claude et les deux outils (candidature, transfert). |
| `whatsapp.py`, `stockage.py`, `config.py` | Envoi WhatsApp, mémoire (SQLite), réglages. |
| `admin.py` | Commandes pour l'équipe : candidatures, transferts, pauses. |
| `discuter.py` | Tester l'assistant dans le terminal, sans WhatsApp. |

## Ce qu'il vous faut
1. **Une clé API Anthropic** : sur [platform.claude.com](https://platform.claude.com), menu *API keys*, avec du crédit prépayé. L'API se paie à part de l'abonnement Claude.
2. **Un compte Meta Business** (business.facebook.com), de préférence vérifié, et le numéro WhatsApp de l'entreprise.
3. **Un hébergement** toujours allumé, avec une adresse en `https://` et un disque qui garde ses fichiers (voir l'étape 3).

> Les clés ne s'écrivent jamais dans le code ni dans une discussion. Elles se saisissent seulement chez l'hébergeur, ou dans un fichier `.env` sur votre ordinateur (déjà exclu de GitHub).

## Étape 1 : essayer en local (10 minutes)
```bash
cd whatsapp-bot
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export ANTHROPIC_API_KEY=...   # tapée dans votre terminal, jamais partagée
python discuter.py
```
Testez des questions de clients, une candidature d'ambassadeur, une demande de « conseiller », une question hors sujet. Les essais sont enregistrés à part, dans `data/test.sqlite3`.

## Étape 2 : brancher le numéro WhatsApp (côté Meta)
1. Sur [developers.facebook.com](https://developers.facebook.com) : *Mes apps*, puis *Créer une app*. Choisissez le cas d'usage WhatsApp (contacter des clients), puis reliez l'app à votre portefeuille Meta Business.
2. **Le numéro**, deux possibilités :
   - **Garder le numéro actuel dans l'appli WhatsApp Business (coexistence, recommandé).** L'équipe continue de voir et de répondre aux conversations sur le téléphone ; l'assistant répond via l'API. Le raccordement se fait par le parcours d'inscription intégrée de Meta (on scanne un QR code depuis l'appli WhatsApp Business). Selon votre compte, il peut falloir passer par un fournisseur officiel WhatsApp (BSP).
   - **Un numéro dédié à l'API**, ajouté dans WhatsApp Manager. Ce numéro ne pourra plus servir dans l'appli WhatsApp.
3. Récupérez les quatre valeurs suivantes :
   - *Phone number ID* : menu WhatsApp, puis *Configuration de l'API* → `WHATSAPP_PHONE_NUMBER_ID`.
   - *Clé secrète de l'app* : *Paramètres de l'app*, puis *Général* → `WHATSAPP_APP_SECRET`.
   - *Jeton permanent* → `WHATSAPP_TOKEN`. Dans les paramètres de l'entreprise, ouvrez *Utilisateurs système*, puis :
     1. créez un utilisateur système de type Admin ;
     2. attribuez-lui l'app et le compte WhatsApp ;
     3. générez un jeton sans expiration, avec les autorisations `whatsapp_business_messaging` et `whatsapp_business_management`.
   - *Jeton de vérification* : un mot de passe que vous inventez → `WHATSAPP_VERIFY_TOKEN`.
4. Une fois l'assistant en ligne (étape 3), ouvrez le menu WhatsApp, puis *Configuration* et *Webhook* :
   1. dans *URL de rappel*, mettez `https://VOTRE-ADRESSE/webhook` ;
   2. dans *Jeton de vérification*, mettez la valeur de `WHATSAPP_VERIFY_TOKEN` ;
   3. cliquez sur *Vérifier et enregistrer* ;
   4. abonnez-vous au champ **messages**, et aussi à **smb_message_echoes** si vous êtes en coexistence.
5. **Publiez l'app (mode « Live »).** Sinon, seuls les numéros de test reçoivent des réponses. Meta demande l'adresse de votre politique de confidentialité : celle de ce dépôt convient. Ajoutez-y une phrase indiquant que les messages WhatsApp sont traités par un assistant automatique.

## Étape 3 : mettre en ligne
L'assistant doit tourner en continu et être joignable en `https://`.

**Choisir où l'héberger**
- **Un petit serveur Linux (VPS)** avec Docker et un nom de domaine en HTTPS, par exemple avec Caddy.
- **Ou une plateforme qui lit le `Dockerfile`** (Railway, Render, Fly.io…). Montez un **disque persistant sur `/app/data`**, sinon les conversations et les candidatures seront effacées à chaque redémarrage.
- **Évitez les offres gratuites qui « s'endorment »** : les messages arriveraient en retard.

**Lancer l'assistant**
- Commande de démarrage sans Docker : `uvicorn app:app --host 0.0.0.0 --port 8000`.
- L'adresse `https://VOTRE-ADRESSE/` doit répondre `{"statut":"ok"}`.

## Variables d'environnement
| Variable | Obligatoire | Rôle |
|---|---|---|
| `ANTHROPIC_API_KEY` | oui | Clé API Claude |
| `WHATSAPP_TOKEN` | oui | Jeton permanent de l'utilisateur système Meta |
| `WHATSAPP_PHONE_NUMBER_ID` | oui | Identifiant du numéro WhatsApp |
| `WHATSAPP_APP_SECRET` | oui | Clé secrète de l'app (vérifie que les messages viennent bien de Meta) |
| `WHATSAPP_VERIFY_TOKEN` | oui | Mot de passe choisi pour l'enregistrement du webhook |
| `OJA_CLAUDE_MODEL` | non | Modèle Claude, par défaut `claude-opus-5-5` |
| `OJA_CLAUDE_EFFORT` | non | `low` (par défaut : rapide et économique), `medium` ou `high` |
| `PAUSE_HEURES` | non | Silence après un transfert ou une réponse de l'équipe (12 par défaut) |
| `SESSION_HEURES` | non | Après ce délai sans message, la conversation repart de zéro (24) |
| `MAX_MESSAGES_PAR_JOUR` | non | Garde-fou par numéro (60) |
| `DB_PATH`, `GRAPH_API_VERSION`, `REGROUPEMENT_SECONDES` | non | Réglages avancés |

## Au quotidien
Ces commandes se lancent sur le serveur, dans le dossier `whatsapp-bot` :
```bash
python admin.py candidatures                  # liste des candidatures
python admin.py candidatures candidatures.csv # export pour Excel
python admin.py transferts                    # demandes de conseiller, avec le résumé
python admin.py pauses                        # clients suivis par un conseiller en ce moment
python admin.py reprendre 22997000000         # l'assistant répond de nouveau à ce client
python admin.py pause 22997000000 48          # l'assistant se tait 48 h pour ce client
```
- Les conseillers répondent aux clients transférés depuis l'appli WhatsApp Business (coexistence). Avec un numéro dédié à l'API, il faut un autre outil de messagerie pour répondre : c'est pourquoi la coexistence est recommandée.
- Quand une fonction sort, ou qu'une info change, modifiez `connaissances.md`, puis redémarrez l'assistant.

## Coûts (ordre de grandeur)
- **Claude Opus 5.5** : 4 $ par million de jetons lus, 20 $ par million de jetons écrits, et 0,20 $ pour la partie mise en cache. Les consignes et la base de connaissances sont mises en cache. Comptez environ **0,01 à 0,03 $ par réponse**, soit 5 à 20 F CFA. C'est une estimation, à vérifier sur la console Anthropic après quelques jours.
- **Meta** : selon les tarifs actuels, répondre à un client dans les 24 h après son message n'est pas facturé. Les messages modèles, que l'entreprise envoie en premier, sont payants.
- **Pour réduire la facture**, vous pouvez :
  - baisser `MAX_MESSAGES_PAR_JOUR` ;
  - choisir un modèle moins cher avec `OJA_CLAUDE_MODEL`, au prix de réponses un peu moins fines.

## Bon à savoir
- **Règle Meta (depuis le 15 janvier 2026).** Les assistants IA « généralistes » sont interdits sur l'API WhatsApp Business. Celui-ci ne traite que le service client d'OJA, ce qui est autorisé : il refuse poliment les sujets hors OJA.
- **Refus de Claude.** Si Claude refuse une demande, l'API la rejoue automatiquement sur le modèle de secours recommandé par Anthropic (option `fallbacks="default"`, en bêta). Si le refus persiste, la personne reçoit un message poli qui l'oriente vers OJA.
- **Sécurité des messages.** Chaque message reçu est vérifié avec la signature de Meta ; un message mal signé est rejeté.
- **Ce qu'il ne voit pas.** L'assistant n'a accès à aucun compte, commande ni paiement : il ne peut que renseigner et orienter.
