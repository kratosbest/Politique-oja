"""Start times of key phrases in an ElevenLabs voice, from the alignment JSON that tts.py writes next to the mp3."""
import json


def marks(alignment_json, keys):
    """keys: {name: phrase}; a phrase starting with '>' is searched from the end of the text."""
    a = json.load(open(alignment_json))
    txt, st = ''.join(a['characters']), a['character_start_times_seconds']
    out = {}
    for k, ph in keys.items():
        i = txt.rfind(ph[1:]) if ph.startswith('>') else txt.find(ph)
        if i < 0:
            raise SystemExit(f'phrase not found in the voice: {ph}')
        out[k] = round(st[i], 3)
    return out


# key phrases of the OJA Marchand voice (assets/mch/voix_marchand.txt)
MARCHAND = dict(cuis='Tu cuisines', livre='Odja livre', resto='Restaurant', maquis='maquis', bout='boutique', marchand='mets ton commerce',
                prod='Tu ajoutes', photo='photo', ouvert='Ouvert', cmd='Une commande', acc='Tu acceptes', livreur='et un livreur', velo='vélo',
                moto='moto,', tri='tricycle', voit='voiture', momo='MoMo', trouv='Et ils te trouvent', endA='>Odja Marchand.', endB='>Tu cuisines, Odja livre')

# key phrases of the « Arrête de marchander » voice (assets/amm/voix_marchander.txt)
MARCHANDER = dict(hook='Arrête', choisis='Avec Odja', moto='moto', tri='tricycle', voit='voiture', prix='et tu vois le prix', montes='Tu montes',
                  disc='Plus de discussion', arr='Et à l', quest='Le chauffeur', clic='Tu réponds', endA='>Odja. Le prix', endB='>Le prix, avant')

# key phrases of the « Le moteur a lâché » voice (assets/pan/voix_panne.txt)
PANNE = dict(course='En pleine', lache='le moteur', panique='Pas de panique', autre='un autre chauffeur', fin='pour finir', prix='Et ton prix',
             franc='Pas un franc', endA='>Odja. Ton', endB='>Ton trajet')

# key phrases of the « Dis-le à OJA » voice (assets/dis/voix_disle.txt)
DISLE = dict(hook="Il t'a", argent="plus d'argent", dis='Dis-le', apres='Après chaque', quest='te pose', clic='Tu réponds',
             compte='Ta réponse', endA='>Odja. On', endB=">On t'écoute")

# key phrases of the « Même trajet, 25 % moins cher » voice (assets/prt/voix_partage.txt)
PARTAGE = dict(hook='Même trajet', moins='vingt-cinq', ami='Toi et ton ami', calavi='Calavi', avec='Avec Odja Partage', montez='vous montez', voit='la même voiture',
               prix='Et le prix', normal='le prix normal', co2='En plus', evite='CO2', endA='>Odja Partage. Moins', endB='>Moins cher à deux')

# key phrases of the « Défis des lieux » mascot voice (assets/dfl/voix_defis.txt)
DEFIS = dict(hook='Eh', quartier='Tu connais', rapporte='Ça peut', ajoute='Ajoute des lieux', confirme='Chaque lieu', t1='Trois lieux',
             t2='Dix lieux', t3='Vingt-cinq lieux', badge='Et un badge', aide='Ton lieu', guides='Et chaque mois', endA='>Odja. Le local',
             endB='>Le local devient')

# key phrases of the « Livré à ton heure » voice (assets/liv/voix_livre.txt)
LIVRE = dict(hook='Tu commandes', midi='midi et demi', prog='Avec Odja', choisis="c'est toi", repas='Pour tes repas', creneau='Odja te donne',
             quinze='quinze minutes', retard='Et si le livreur', dix='Dix pour cent', auto='Automatiquement', endA='>Odja. Livré', endB='>Livré à ton heure')

# key phrases of the « Chauffeur, arrête de tourner à vide » voice (assets/chv/voix_chauffeur_vide.txt)
VIDE = dict(hook='Chauffeur', trouvent='Avec Odja', prix='Et le prix', bagarre='plus de bagarre', zones="L'appli", attendent='là où',
            essence='Tu brûles', gagnes='Et tu vois', releve='ton relevé', vehic='Moto, tricycle', inscris='inscris-toi', endA='>Odja. On roule',
            endB='>On roule ensemble')

# key phrases of the « Une journée à Cotonou » launch film voice (assets/jour/voix_journee.txt)
JOURNEE = dict(t0='Sept heures', ganhi='Tu dois', carref='Au carrefour', combien="C'est combien", perdues='Dix minutes', midi='Midi quarante',
               faim='Tu as faim', pastemps='Mais pas', seize='Seize heures', soeur='Ta sœur', personne='Et personne', soir='Le soir',
               debrouiller='Tu as passé', siTout='Et si tout', voici='Voici Odja', course='Tu choisis', vz='zem, tri', vt='tricycle ou', vv='ou voiture', prix="Le prix s'affiche",
               repas='Ton repas', colis='Ton colis', direct='tu suis', fin='À la fin', question='le chauffeur', moteur='Le moteur',
               autre='Un autre', meme='Au même', liste='Zem. Tricycle', endA='>Odja. Tout', endB='>Tout ton Bénin')

# key phrases of the « Le local devient visible » places film voice (assets/lieux/voix_lieux.txt)
LIEUX = dict(t0='Neuf heures', von='au fond', onze='Onze heures', appelle='Une cliente', bleue='Je suis devant', laquelle='Laquelle', trois='Il y en a',
             expl='Tu expliques', tourne='Elle tourne', perd='Elle se perd', quatorze='Quatorze', vide="L'atelier est vide", tuesla='Tu es là', personne='mais personne', msg='Et puis',
             ailleurs='Laisse', siAt='Et si ton', ajoute='Avec Odja', nom='le nom', cat='la catégorie', point='le point exact', photos='quelques photos',
             mots='Et on te trouve', derriere="l'atelier derrière", publics='Les lieux publics', carte='sur la carte', listep='la pharmacie, le marché', marche='le marché', arret="l'arrêt de zem", tous='Ajoutés par',
             deux='Quand deux', valide="l'équipe Odja", publie='le lieu est publié', erreur='Une erreur', signale='Tu la signales',
             endA='>Odja. Le local', endB='>Le local devient')

# key phrases of the NOVOJA film voice (assets/nov/voix_novoja.txt)
NOVOJA = dict(t0='Samedi', frigo='Le vieux frigo', marche='Il marche', place='mais il prend', onze='Onze heures', propose='Tu le proposes', inconnu='Un inconnu',
              prends='Je le prends', histoire='Tu connais', avance='Une fois', vendeur='et le vendeur', dixhuit='Dix-huit', confiance='Et la confiance',
              siArg="Et si l'argent", livraison='la livraison', surN='Sur Novodja', publies='tu publies', photos='quelques photos', desc='une description',
              ligne="c'est en ligne", ach="L'acheteur discute", paie='Il paie', garde="c'est Odja qui garde", livrer='Odja peut', recoit='Il reçoit',
              confirme='il confirme', paye='tu es payé', souci='Un souci', arbitre="L'équipe Odja", rembourse="l'acheteur est remboursé",
              donne='Et ce qui ne', donner='tu peux le donner', endA='>Novodja, dans Odja.', endB='>Ce qui dort')

# key phrases of the zemidjan awareness voice (assets/zem/voix_zem.txt)
ZEM = dict(t0='Zémidjan, cette', jour='Chaque jour', tournes='Tu tournes', carrefour='au carrefour', vide='et parfois', maint='Maintenant',
           appli="Avec l'appli", trouvent='qui te trouvent', course='Une course arrive', vois='tu la vois', acceptes='tu acceptes',
           montre='Et Odja te montre', zones='les zones chaudes', inscr='Ton inscription', nom='ton nom', numero='ton numéro', moto='puis ta moto',
           papiers='et tes papiers', formule='Ensuite', sans='Sans pass', commission='une commission', avec='Avec le pass', zero='zéro pour cent',
           prends='Tu prends ton pass', jour1='un jour', semaine='une semaine', mois='un mois', pourtoi='et chaque course', gains='Et tous tes gains',
           releve='ton relevé', endA='>Zémidjan, roule', endB="Les clients t'attendent")
