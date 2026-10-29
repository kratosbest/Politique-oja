"""Builds motion/oja_moteur_lache.html: helpers of index.html + Market/Merchant preludes + amm_body.js."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vo_marks import marks, PANNE
B = pathlib.Path(__file__).parent
M = B.parent
idx = (M / 'index.html').read_text().split('\n')
helpers = '\n'.join(idx[58:213]).replace('const DUR = 65.5;', 'const DUR = 15.0;')
mk = (B / 'market_body.js').read_text(); mk = '\n'.join(mk.split('\n')[3:])
market = mk[:mk.index('/* S0')]
ms = (B / 'merchant_scenes.js').read_text()
merchant = ms[:ms.index('/* S0')]
head = (B / 'mkp_build.py').read_text()
head = head[head.index("head = '''") + 10:head.index("'''", head.index("head = '''") + 10)]
head = head.replace('<title>OJA Market — Pub de lancement</title>', '<title>OJA — Le moteur a lâché</title>').replace('assets/soundtrack_market_pub.m4a', 'assets/soundtrack_panne.m4a')
mkb = (B / 'mkp_build.py').read_text()
tail = mkb[mkb.index("tail = '''") + 10:mkb.index("'''", mkb.index("tail = '''") + 10)]
body = (B / 'pan_body.js').read_text()
mk = marks(M / 'assets/pan/voix_panne.mp3.json', PANNE)
body = body.replace('/*VOICE_MARKS*/{}', json.dumps(mk))
(M / 'oja_moteur_lache.html').write_text(head + helpers + '\n' + market + '\n' + merchant + '\n' + body + tail)
print('ok')
