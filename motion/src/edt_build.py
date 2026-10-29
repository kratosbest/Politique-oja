"""Builds motion/oja_chauffeur_editorial.html: helpers of index.html + Market/Merchant preludes + edt_body.js (editorial fonts)."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vo_marks import marks, VIDE
B = pathlib.Path(__file__).parent
M = B.parent
idx = (M / 'index.html').read_text().split('\n')
helpers = '\n'.join(idx[58:213]).replace('const DUR = 65.5;', 'const DUR = 25.0;')
mk = (B / 'market_body.js').read_text(); mk = '\n'.join(mk.split('\n')[3:])
market = mk[:mk.index('/* S0')]
ms = (B / 'merchant_scenes.js').read_text()
merchant = ms[:ms.index('/* S0')]
head = (B / 'mkp_build.py').read_text()
head = head[head.index("head = '''") + 10:head.index("'''", head.index("head = '''") + 10)]
head = head.replace('<link rel="stylesheet" href="fonts/local.css">', '<link rel="stylesheet" href="fonts/local.css">\n<link rel="stylesheet" href="fonts/editorial.css">')
head = head.replace('<title>OJA Market — Pub de lancement</title>', '<title>OJA chauffeurs — version éditoriale</title>').replace('assets/soundtrack_market_pub.m4a', 'assets/soundtrack_chauffeur_editorial.m4a')
mkb = (B / 'mkp_build.py').read_text()
tail = mkb[mkb.index("tail = '''") + 10:mkb.index("'''", mkb.index("tail = '''") + 10)]
body = (B / 'edt_body.js').read_text()
mk = marks(M / 'assets/chv/voix_chauffeur_vide.mp3.json', VIDE)
body = body.replace('/*VOICE_MARKS*/{}', json.dumps(mk))
(M / 'oja_chauffeur_editorial.html').write_text(head + helpers + '\n' + market + '\n' + merchant + '\n' + body + tail)
print('ok')
