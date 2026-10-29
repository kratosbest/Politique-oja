"""Builds the NOVOJA film pages from nov_body.js (+ helpers of index.html, Market/Merchant preludes):
- motion/oja_novoja_film.html (16:9, 1920 x 1080)
- motion/oja_novoja_film_9x16.html (9:16, 1080 x 1920, same story, vertical positions: VERT = true)."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vo_marks import marks, NOVOJA
B = pathlib.Path(__file__).parent
M = B.parent
idx = (M / 'index.html').read_text().split('\n')
helpers = '\n'.join(idx[58:213]).replace('const DUR = 65.5;', 'const DUR = 57.0;')
mk = (B / 'market_body.js').read_text(); mk = '\n'.join(mk.split('\n')[3:])
market = mk[:mk.index('/* S0')]
ms = (B / 'merchant_scenes.js').read_text()
merchant = ms[:ms.index('/* S0')]
mkb = (B / 'mkp_build.py').read_text()
head0 = mkb[mkb.index("head = '''") + 10:mkb.index("'''", mkb.index("head = '''") + 10)]
head0 = head0.replace('<title>OJA Market — Pub de lancement</title>', '<title>NOVOJA — Ce qui dort chez toi vaut de l\'argent</title>').replace('assets/soundtrack_market_pub.m4a', 'assets/soundtrack_novoja_film.m4a')
tail = mkb[mkb.index("tail = '''") + 10:mkb.index("'''", mkb.index("tail = '''") + 10)]
body0 = (B / 'nov_body.js').read_text()
body0 = body0.replace('/*VOICE_MARKS*/{}', json.dumps(marks(M / 'assets/nov/voix_novoja.mp3.json', NOVOJA)))

for vert, name in ((False, 'oja_novoja_film.html'), (True, 'oja_novoja_film_9x16.html')):
    head = head0
    if not vert:   # 16:9 page: swap the 1080x1920 sizes of the shared head
        for old, new in (('html,body{width:1080px;height:1920px', 'html,body{width:1920px;height:1080px'), ('width:1080px;height:1920px;overflow:hidden;font-family', 'width:1920px;height:1080px;overflow:hidden;font-family'), ('.lay{position:absolute;left:0;top:0;width:1080px;height:1920px}', '.lay{position:absolute;left:0;top:0;width:1920px;height:1080px}')):
            assert old in head, old
            head = head.replace(old, new)
    body = body0.replace('/*VERT*/false', 'true' if vert else 'false')
    (M / name).write_text(head + helpers + '\n' + market + '\n' + merchant + '\n' + body + tail)
print('ok')
