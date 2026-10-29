"""Builds motion/oja_market_pub.html: shared helpers of index.html + OJA Market screens of the Market film + mkp_body.js."""
import pathlib
B = pathlib.Path(__file__).parent
M = pathlib.Path(__file__).resolve().parents[1]
idx = (M / 'index.html').read_text().split('\n')
helpers = '\n'.join(idx[58:213]).replace('const DUR = 65.5;', 'const DUR = 20.5;')
mk = (B / 'market_body.js').read_text().split('\n')
end = next(i for i, l in enumerate(mk) if l.startswith('/* S0'))
screens = '\n'.join(mk[3:end])
R = [
    ("const PHOTO = { shawarma: 'assets/food_shawarma.jpg', croissant: 'assets/food_croissant.jpg' };",
     "const PHOTO = { shawarma: 'assets/food_shawarma.jpg', croissant: 'assets/food_croissant.jpg', poulet: 'assets/mkp/food_poulet.jpg' };"),
    ("['🥘', 'Maquis Chez Tanti'", "['poulet', 'Maquis Chez Tanti'"),
    ("['🍗', 'Poulet braisé', '3 500', '']", "['poulet', 'Poulet braisé', '3 500', '']"),
    ("${ic('search', 22, '#111', 2.4)}Rechercher un plat ou une boutique</div>",
     "${ic('search', 22, '#111', 2.4)}<span id=\"${p}q\" style=\"white-space:nowrap\">Rechercher un plat ou une boutique</span><span id=\"${p}cur\" style=\"display:inline-block;width:2px;height:26px;background:#FF6B00;margin-left:-10px;opacity:0\"></span></div>"),
    ('<div class="abs a-card" style="left:16px;right:16px;top:164px;height:56px;border:2px solid #C2410C;',
     '<div id="${p}sbx" class="abs a-card" style="left:16px;right:16px;top:164px;height:56px;border:2px solid #C2410C;'),
    ('Voir le panier</span><span>2 500 XOF</span>', 'Voir le panier</span><span>3 500 XOF</span>'),
    # checkout as ordered in this spot: poulet braisé 3 500 + Livraison OJA 1 200 (moto)
    ('color:#E85D00">800 XOF</div></div>', 'color:#E85D00">1 200 XOF</div></div>'),
    ('top:410px;height:104px;border-radius:20px;border:2px solid #12B76A;background:#E7F6EF;', 'top:410px;height:104px;border-radius:20px;border:1.5px solid #E2E2E2;background:#fff;'),
    ('border-radius:50%;border:3px solid #12B76A;display:grid;place-items:center"><div style="width:12px;height:12px;border-radius:50%;background:#12B76A"></div></div></div>',
     'border-radius:50%;border:3px solid #CCC"></div></div>'),
    ('<b style="font:800 17px Inter;color:#12B76A">800 XOF</b>', '<b style="font:800 17px Inter;color:#555">800 XOF</b>'),
    ('<div class="abs a-card" style="left:16px;right:16px;top:526px;height:104px;padding:14px 16px;border:1.5px solid #E2E2E2">',
     '<div id="${p}ojad" class="abs" style="left:16px;right:16px;top:526px;height:104px;padding:14px 16px;border-radius:20px;border:2px solid #FF6B00;background:#FFF1E6">'),
    ('OJA choisit le véhicule disponible.</div></div>',
     'OJA choisit le véhicule disponible.</div><div class="abs" style="right:16px;top:50px;width:26px;height:26px;border-radius:50%;border:3px solid #FF6B00;display:grid;place-items:center"><div style="width:12px;height:12px;border-radius:50%;background:#FF6B00"></div></div></div>'),
    ('<span style="color:#E85D00">2 500 XOF</span>', '<span style="color:#E85D00">3 500 XOF</span>'),
    ('Total 3 300 XOF', 'Total 4 700 XOF'), ('PAYER 3 300 XOF', 'PAYER 4 700 XOF'),
]
for a, b in R:
    assert a in screens, a[:60]
    screens = screens.replace(a, b)
head = '''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>OJA Market — Pub de lancement</title>
<link rel="stylesheet" href="fonts/local.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#000}
#stage{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:Inter,sans-serif;background:#070504;color:#fff}
.abs{position:absolute}
.lay{position:absolute;left:0;top:0;width:1080px;height:1920px}
.wm{display:inline-block;overflow:hidden;vertical-align:top;padding:.04em .03em .12em;margin:-.04em -.03em -.12em}
.wi{display:inline-block;will-change:transform}
.hl{color:#FF6B00}
#grain{position:absolute;inset:-100px;pointer-events:none;opacity:.08;mix-blend-mode:overlay;z-index:50}
#vig{position:absolute;inset:0;pointer-events:none;z-index:49;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(0,0,0,.45) 100%)}
#fade{position:absolute;inset:0;background:#000;opacity:0;z-index:60}
</style>
</head>
<body>
<div id="stage"></div>
<audio id="aud" src="assets/soundtrack_market_pub.m4a" preload="auto"></audio>
<script>
'''
tail = '''
/* readiness: fonts + images */
window.ready = (async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map(im => im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; })));
  for (const im of PRE) if (!im.complete) await new Promise(r => { im.onload = im.onerror = r; });
  window.renderAt(0);
  return true;
})();
if (location.search.includes('play')) {
  const a = $('aud'); let t0 = null;
  const fit = () => { const s = Math.min(innerWidth / 1080, innerHeight / 1920); stage.style.transform = `scale(${s})`; stage.style.transformOrigin = '0 0'; };
  fit(); addEventListener('resize', fit);
  const loop = () => { const t = a && !a.paused ? a.currentTime : (t0 === null ? 0 : (performance.now() - t0) / 1000); window.renderAt(t % DUR); requestAnimationFrame(loop); };
  document.addEventListener('click', () => { a.currentTime = 0; a.play().catch(() => { t0 = performance.now(); }); });
  window.ready.then(loop);
}
</script>
</body>
</html>
'''
(M / 'oja_market_pub.html').write_text(head + helpers + '\n' + screens + '\n' + (B / 'mkp_body.js').read_text() + tail)
print('ok')
