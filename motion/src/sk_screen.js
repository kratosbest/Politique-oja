// Capture the app screen of the tutorial's final scene (a new pin drops, then the place sheet slides up) as a JPEG
// sequence for the phone inserts of the sketches, with the place renamed (texts and photo swapped before capture).
// usage (from motion/): node src/sk_screen.js <outdir> '<json: {"texts": {"old": "new"}, "photo": "path/from/motion.jpg"}>'
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const out = process.argv[2], R = JSON.parse(process.argv[3] || '{}');
(async () => {
  const br = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await br.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  await p.goto('file://' + process.cwd() + '/oja_ajout_lieu_mascotte.html');
  await p.evaluate(() => window.ready);
  await p.evaluate(R => {
    const root = document.getElementById('s_final');
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) for (const [a, b] of Object.entries(R.texts || {})) if (n.nodeValue.includes(a)) n.nodeValue = n.nodeValue.split(a).join(b);
    if (R.photo) root.querySelectorAll('img').forEach(i => { if (i.getAttribute('src').includes('plat.jpg')) i.src = R.photo; });
    root.querySelectorAll('[style*="plat.jpg"]').forEach(e => e.style.backgroundImage = `url(${R.photo})`);
  }, R);
  await p.waitForTimeout(400);
  const T = await p.evaluate(() => ({ app: T_APP, trouv: T_TROUV }));
  await p.addStyleTag({ content: '#phoneWrap,#phone,#phone *{transform-style:flat!important} #phoneWrap{perspective:none!important} #phone{transform:none!important}' });
  fs.mkdirSync(out, { recursive: true });
  const t0 = T.app - .2, t1 = T.trouv + .9, n = Math.round((t1 - t0) * 30);
  for (let i = 0; i <= n; i++) {
    await p.evaluate(t => renderAt(t), t0 + i / 30);
    await p.evaluate(() => window.waitFrame ? window.waitFrame() : 0);
    await (await p.$('#scr')).screenshot({ path: `${out}/s${String(i).padStart(3, '0')}.jpg`, type: 'jpeg', quality: 88 });
  }
  console.log('frames', n + 1, 'pin at', (T.app + .1 - t0).toFixed(2), 'sheet at', (T.trouv + .15 - t0).toFixed(2));
  await br.close();
})();
