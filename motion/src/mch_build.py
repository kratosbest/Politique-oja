"""Builds motion/oja_marchand_tucuisines.html: helpers of index.html + screens of the Market and Merchant films + mch_body.js."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vo_marks import marks, MARCHAND
B = pathlib.Path(__file__).parent
M = B.parent
idx = (M / 'index.html').read_text().split('\n')
helpers = '\n'.join(idx[58:213]).replace('const DUR = 65.5;', 'const DUR = 28.5;')
mk = (B / 'market_body.js').read_text(); mk = '\n'.join(mk.split('\n')[3:])
market = mk[:mk.index('/* S0')]
ms = (B / 'merchant_scenes.js').read_text()
merchant = ms[:ms.index('/* S0')]
head = (B / 'mkp_build.py').read_text()
head = head[head.index("head = '''") + 10:head.index("'''", head.index("head = '''") + 10)]
head = head.replace('<title>OJA Market — Pub de lancement</title>', '<title>OJA Marchand — Tu cuisines, OJA livre</title>').replace('assets/soundtrack_market_pub.m4a', 'assets/soundtrack_marchand.m4a')
mkb = (B / 'mkp_build.py').read_text()
tail = mkb[mkb.index("tail = '''") + 10:mkb.index("'''", mkb.index("tail = '''") + 10)]
body = (B / 'mch_body.js').read_text()
mk = marks(M / 'assets/mch/voix_marchand.mp3.json', dict(MARCHAND, clients='Tes clients'))
body = body.replace('/*VOICE_MARKS*/{}', json.dumps(mk))
if (M / 'assets/mch/velo.png').exists():          # real OJA delivery bicycle, once generated
    body = body.replace("['bike', 'Vélo']", "['assets/mch/velo.png', 'Vélo']")
(M / 'oja_marchand_tucuisines.html').write_text(head + helpers + '\n' + market + '\n' + merchant + '\n' + body + tail)
print('ok')
