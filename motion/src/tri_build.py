"""Builds the tricycle awareness film page motion/oja_tricycle.html (9:16, 1080 x 1920) from tri_body.js (+ helpers of index.html, Market/Merchant preludes)."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vo_marks import marks, TRI
B = pathlib.Path(__file__).parent
M = B.parent
idx = (M / 'index.html').read_text().split('\n')
helpers = '\n'.join(idx[58:213]).replace('const DUR = 65.5;', 'const DUR = 56.0;')
mk = (B / 'market_body.js').read_text(); mk = '\n'.join(mk.split('\n')[3:])
market = mk[:mk.index('/* S0')]
ms = (B / 'merchant_scenes.js').read_text()
merchant = ms[:ms.index('/* S0')]
mkb = (B / 'mkp_build.py').read_text()
head0 = mkb[mkb.index("head = '''") + 10:mkb.index("'''", mkb.index("head = '''") + 10)]
head0 = head0.replace('<title>OJA Market — Pub de lancement</title>', '<title>OJA — Conducteur de tricycle, avec OJA ça change</title>').replace('assets/soundtrack_market_pub.m4a', 'assets/soundtrack_tri.m4a')
tail = mkb[mkb.index("tail = '''") + 10:mkb.index("'''", mkb.index("tail = '''") + 10)]
body0 = (B / 'tri_body.js').read_text()
body0 = body0.replace('/*VOICE_MARKS*/{}', json.dumps(marks(M / 'assets/tri/voix_tri.mp3.json', TRI)))

(M / 'oja_tricycle.html').write_text(head0 + helpers + '\n' + market + '\n' + merchant + '\n' + body0 + tail)
print('ok')
