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
