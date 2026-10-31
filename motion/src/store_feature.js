// Google Play feature graphics (1024 x 500, no transparency): node src/store_feature.js
// One per app: logo, name, tagline and service chips on the left, two app captures on the right.
// Play policy: no call to action ("Télécharger"), no ranking claim, no price in the graphic.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const ROOT = path.resolve(__dirname, '..');
const APPS = [
  { out: 'store/out/play_feature.png', logo: 'assets/mk_logo.png', name: 'Oja App',
    title: ['Se déplacer, manger, vendre', '*avec une seule app*'], chips: ['Transport', 'Market', 'NOVOJA'],
    back: 'store/captures/course.png', front: 'store/captures/accueil.png' },
  { out: 'store/merchant/out/play_feature.png', logo: 'store/merchant/out/_icon.png', round: true, name: 'Oja Merchant',
    title: ['Gérez vos commandes', '*en temps réel*'], chips: ['Commandes', 'Catalogue', 'Revenus'],
    back: 'store/merchant/captures/parametres.png', front: 'store/merchant/captures/boutique.png' },
];

const uri = f => `data:image/png;base64,${fs.readFileSync(path.join(ROOT, f)).toString('base64')}`;

function page(a) {
  const title = a.title.map(l => l.replace(/\*(.+?)\*/g, '<em>$1</em>')).join('<br>');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1024px;height:500px;overflow:hidden;position:relative;background:#0E0F14;font-family:Inter,sans-serif;color:#fff}
  .glow{position:absolute;inset:0;background:radial-gradient(ellipse 55% 75% at 0% 0%,rgba(255,107,0,.38),rgba(255,107,0,0) 70%),radial-gradient(ellipse 45% 70% at 82% 100%,rgba(255,138,31,.30),rgba(255,138,31,0) 70%)}
  .left{position:absolute;left:64px;top:0;bottom:0;width:545px;display:flex;flex-direction:column;justify-content:center}
  .brand{display:flex;align-items:center;gap:18px}
  .brand img{width:${a.round ? 76 : 92}px;height:${a.round ? 76 : 92}px;${a.round ? 'border-radius:50%;' : ''}object-fit:cover}
  .brand span{font:800 40px Inter;letter-spacing:-.02em}
  h1{margin-top:26px;font:800 40px/1.1 Inter;letter-spacing:-.025em}
  h1 em{font-style:normal;color:#FF8A1F}
  .chips{display:flex;gap:10px;margin-top:28px}
  .chips b{padding:9px 18px;border-radius:40px;background:rgba(255,107,0,.16);color:#FF8A1F;font:700 17px Inter;letter-spacing:.06em;text-transform:uppercase}
  .ph{position:absolute;width:238px;padding:7px;border-radius:38px;background:#1d2230;box-shadow:0 0 0 2px #2A2E3D,0 30px 70px rgba(0,0,0,.65)}
  .ph img{display:block;width:100%;border-radius:31px}
  .back{left:640px;top:96px;transform:rotate(-7deg);filter:brightness(.72)}
  .front{left:770px;top:52px;transform:rotate(4deg)}
  </style></head><body><div class="glow"></div>
  <div class="left"><div class="brand"><img src="${uri(a.logo)}"><span>${a.name}</span></div>
  <h1>${title}</h1><div class="chips">${a.chips.map(c => `<b>${c}</b>`).join('')}</div></div>
  <div class="ph back"><img src="${uri(a.back)}"></div><div class="ph front"><img src="${uri(a.front)}"></div>
  </body></html>`;
}

(async () => {
  // Oja Merchant icon: the round app icon cut from the login capture (114 px circle).
  execFileSync(FFMPEG, ['-v', 'error', '-y', '-i', path.join(ROOT, 'store/merchant/captures/connexion.png'),
    '-vf', 'crop=114:114:403:316', path.join(ROOT, 'store/merchant/out/_icon.png')]);
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: 1024, height: 500 } });
  for (const a of APPS) {
    await pg.setContent(page(a), { waitUntil: 'load' });
    await pg.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode())); });
    const out = path.join(ROOT, a.out), tmp = out.replace(/\.png$/, '_tmp.png');
    await pg.screenshot({ path: tmp });
    execFileSync(FFMPEG, ['-v', 'error', '-y', '-i', tmp, '-pix_fmt', 'rgb24', out]);   // no alpha channel
    fs.unlinkSync(tmp);
    console.log(a.out);
  }
  fs.unlinkSync(path.join(ROOT, 'store/merchant/out/_icon.png'));
  await browser.close();
})();
