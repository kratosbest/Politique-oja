"""Builds motion/oja_journee_cotonou.html (16:9): helpers of index.html + Market/Merchant preludes + bj_map.js + jour_body.js."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vo_marks import marks, JOURNEE
B = pathlib.Path(__file__).parent
M = B.parent
idx = (M / 'index.html').read_text().split('\n')
helpers = '\n'.join(idx[58:213]).replace('const DUR = 65.5;', 'const DUR = 56.0;')
mk = (B / 'market_body.js').read_text(); mk = '\n'.join(mk.split('\n')[3:])
market = mk[:mk.index('/* S0')]
ms = (B / 'merchant_scenes.js').read_text()
merchant = ms[:ms.index('/* S0')]
head = (B / 'mkp_build.py').read_text()
head = head[head.index("head = '''") + 10:head.index("'''", head.index("head = '''") + 10)]
# 16:9 page: swap the 1080x1920 sizes of the shared head
for old, new in (('html,body{width:1080px;height:1920px', 'html,body{width:1920px;height:1080px'), ('width:1080px;height:1920px;overflow:hidden;font-family', 'width:1920px;height:1080px;overflow:hidden;font-family'), ('.lay{position:absolute;left:0;top:0;width:1080px;height:1920px}', '.lay{position:absolute;left:0;top:0;width:1920px;height:1080px}')):
    assert old in head, old
    head = head.replace(old, new)
head = head.replace('<title>OJA Market — Pub de lancement</title>', '<title>OJA — Une journée à Cotonou</title>').replace('assets/soundtrack_market_pub.m4a', 'assets/soundtrack_journee.m4a')
mkb = (B / 'mkp_build.py').read_text()
tail = mkb[mkb.index("tail = '''") + 10:mkb.index("'''", mkb.index("tail = '''") + 10)]
body = (B / 'bj_map.js').read_text() + '\n' + (B / 'jour_body.js').read_text()
mk = marks(M / 'assets/jour/voix_journee.mp3.json', JOURNEE)
body = body.replace('/*VOICE_MARKS*/{}', json.dumps(mk))
(M / 'oja_journee_cotonou.html').write_text(head + helpers + '\n' + market + '\n' + merchant + '\n' + body + tail)
print('ok')
