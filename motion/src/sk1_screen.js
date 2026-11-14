// Capture the app screen of the tutorial's final scene (new pin drops, then the place sheet slides up) as a JPEG sequence,
// to play inside the phone of sketch 1.  usage (from motion/): node src/sk1_screen.js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
(async () => {
  const br = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await br.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  await p.goto('file://' + process.cwd() + '/oja_ajout_lieu_mascotte.html');
  await p.evaluate(() => window.ready);
  const T = await p.evaluate(() => ({ app: T_APP, trouv: T_TROUV, st8: ST[8] }));
  console.log(T);
  await p.addStyleTag({ content: '#phoneWrap,#phone,#phone *{transform-style:flat!important} #phoneWrap{perspective:none!important} #phone{transform:none!important}' });
  fs.mkdirSync('assets/sketch1/scr', { recursive: true });
  const t0 = T.app - .2, t1 = T.trouv + .9, n = Math.round((t1 - t0) * 30);
  for (let i = 0; i <= n; i++) {
    await p.evaluate(t => renderAt(t), t0 + i / 30);
    await p.evaluate(() => window.waitFrame ? window.waitFrame() : 0);
    const el = await p.$('#scr');
    await el.screenshot({ path: `assets/sketch1/scr/s${String(i).padStart(3, '0')}.jpg`, type: 'jpeg', quality: 88 });
  }
  console.log('frames', n + 1, 'pin at', (T.app + .1 - t0).toFixed(2), 'sheet at', (T.trouv + .15 - t0).toFixed(2));
  await br.close();
})();
