// WhatsApp Business cover photo (1920 x 1080): node src/couv_build.js [photo] [output]
// Left: OJA logo and the lead feature (put your business on the map) on a dark panel.
// Right: photo of today's Cotonou, clean paved street, a tailor in front of her workshop (AI image, Nano Banana 2 Lite).
// The photo fills the cover; a dark gradient on the left carries the text. An OJA pin marks the workshop.
// Text stays in the upper three quarters: the round profile picture can cover the bottom of the cover.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const ROOT = path.resolve(__dirname, '..');
const PHOTO = path.resolve(process.argv[2] || path.join(ROOT, 'assets/couv/couv_photo.jpg'));
const OUT = path.resolve(process.argv[3] || path.join(ROOT, 'affiches/OJA_Couverture_WhatsApp_1920x1080.png'));
const W = 1920, H = 1080, PANEL = 760;
const PIN = { x: 1462, y: 118, size: 180 };   // above the tailor's head in assets/couv/couv_photo.jpg

const uri = f => `data:image/${f.endsWith('.png') ? 'png' : 'jpeg'};base64,${fs.readFileSync(f).toString('base64')}`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;position:relative;background:#0E0F14;font-family:Inter,sans-serif;color:#fff}
.photo{position:absolute;inset:0;background:url(${uri(PHOTO)}) right center/cover no-repeat}
.fade{position:absolute;inset:0;background:linear-gradient(90deg,#0E0F14 0px,rgba(14,15,20,.93) ${PANEL - 180}px,rgba(14,15,20,.6) ${PANEL - 20}px,rgba(14,15,20,0) ${PANEL + 160}px)}
.pin{position:absolute;left:${PIN.x - PIN.size / 2}px;top:${PIN.y}px;width:${PIN.size}px;height:${PIN.size}px;filter:drop-shadow(0 14px 18px rgba(0,0,0,.45))}
.glow{position:absolute;inset:0;background:radial-gradient(ellipse 42% 70% at 0% 0%,rgba(255,107,0,.42),rgba(255,107,0,0) 70%),radial-gradient(ellipse 30% 45% at 18% 100%,rgba(255,138,31,.22),rgba(255,138,31,0) 70%)}
.left{position:absolute;left:104px;top:130px;width:${PANEL - 70}px}
.brand{display:flex;align-items:center;gap:22px}
.brand img{width:118px;height:118px}
.brand span{font:800 70px 'Inter Display',Inter;letter-spacing:-.02em}
h1{font:800 88px/1.02 'Inter Display',Inter;letter-spacing:-.025em}
h1 em{font-style:normal;color:#FF8A1F}
.kick{margin-top:46px;font:800 25px Inter;letter-spacing:.2em;text-transform:uppercase;color:#FF8A1F}
h1{margin-top:14px}
.lead{margin-top:26px;font:600 31px/1.32 Inter;color:rgba(255,255,255,.9)}
.also{margin-top:34px;display:flex;align-items:center;gap:12px;font:600 23px Inter;color:rgba(255,255,255,.65)}
.also b{padding:9px 18px;border-radius:40px;background:rgba(255,107,0,.16);border:1.5px solid rgba(255,138,31,.5);color:#FFB277;font:700 20px Inter;letter-spacing:.06em;text-transform:uppercase}
.store{margin-top:26px;font:600 27px Inter;color:rgba(255,255,255,.72)}
.store strong{color:#fff;font-weight:700}
</style></head><body>
<div class="photo"></div><div class="fade"></div><div class="glow"></div>
<img class="pin" src="${uri(path.join(ROOT, 'assets/mk_pin.png'))}">
<div class="left">
  <div class="brand"><img src="${uri(path.join(ROOT, 'assets/mk_logo.png'))}"><span>OJA</span></div>
  <div class="kick">Boutique · Atelier · Restaurant</div>
  <h1>Votre business<br><em>sur la carte</em></h1>
  <div class="lead">Vos clients trouvent votre lieu<br>par son nom, même sans adresse précise.</div>
  <div class="also">Et aussi <b>Transport</b><b>Market</b><b>NOVOJA</b></div>
  <div class="store"><strong>Oja App</strong> sur Play Store et App Store</div>
</div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: W, height: H } });
  await pg.setContent(html, { waitUntil: 'load' });
  await pg.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode())); });
  const tmp = OUT.replace(/\.png$/, '_tmp.png');
  await pg.screenshot({ path: tmp });
  await browser.close();
  execFileSync(FFMPEG, ['-v', 'error', '-y', '-i', tmp, '-pix_fmt', 'rgb24', OUT]);   // no alpha channel
  fs.unlinkSync(tmp);
  console.log(OUT);
})();
