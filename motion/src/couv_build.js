// WhatsApp Business cover photo (1920 x 1080): node src/couv_build.js [photo] [output]
// Left: OJA logo, tagline and services on a dark panel. Right: photo of Cotonou (AI image, Nano Banana 2 Lite).
// The photo's left part is dropped (the model drew a separate blurred panel there) and its edge fades into the panel.
// Text stays in the upper three quarters: the round profile picture can cover the bottom of the cover.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const ROOT = path.resolve(__dirname, '..');
const PHOTO = path.resolve(process.argv[2] || path.join(ROOT, 'assets/couv/couv_photo.jpg'));
const OUT = path.resolve(process.argv[3] || path.join(ROOT, 'affiches/OJA_Couverture_WhatsApp_1920x1080.png'));
const W = 1920, H = 1080, PANEL = 760;

const uri = f => `data:image/${f.endsWith('.png') ? 'png' : 'jpeg'};base64,${fs.readFileSync(f).toString('base64')}`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;position:relative;background:#0E0F14;font-family:Inter,sans-serif;color:#fff}
.photo{position:absolute;left:${PANEL}px;right:0;top:0;bottom:0;background:url(${uri(PHOTO)}) right center/auto 100% no-repeat}
.fade{position:absolute;left:${PANEL - 2}px;width:340px;top:0;bottom:0;background:linear-gradient(90deg,#0E0F14 0%,rgba(14,15,20,.85) 30%,rgba(14,15,20,0) 100%)}
.glow{position:absolute;inset:0;background:radial-gradient(ellipse 42% 70% at 0% 0%,rgba(255,107,0,.42),rgba(255,107,0,0) 70%),radial-gradient(ellipse 30% 45% at 18% 100%,rgba(255,138,31,.22),rgba(255,138,31,0) 70%)}
.left{position:absolute;left:104px;top:170px;width:${PANEL - 70}px}
.brand{display:flex;align-items:center;gap:22px}
.brand img{width:118px;height:118px}
.brand span{font:800 70px 'Inter Display',Inter;letter-spacing:-.02em}
h1{margin-top:44px;font:800 74px/1.05 'Inter Display',Inter;letter-spacing:-.025em}
h1 em{font-style:normal;color:#FF8A1F}
.chips{display:flex;gap:14px;margin-top:44px}
.chips b{padding:14px 26px;border-radius:50px;background:rgba(255,107,0,.18);border:2px solid rgba(255,138,31,.55);color:#FFB277;font:700 24px Inter;letter-spacing:.08em;text-transform:uppercase}
.store{margin-top:34px;font:600 27px Inter;color:rgba(255,255,255,.72)}
.store strong{color:#fff;font-weight:700}
</style></head><body>
<div class="photo"></div><div class="fade"></div><div class="glow"></div>
<div class="left">
  <div class="brand"><img src="${uri(path.join(ROOT, 'assets/mk_logo.png'))}"><span>OJA</span></div>
  <h1>Se déplacer,<br>manger, vendre<br><em>avec une seule app</em></h1>
  <div class="chips"><b>Transport</b><b>Market</b><b>NOVOJA</b></div>
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
