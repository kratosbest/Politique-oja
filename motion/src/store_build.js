// App Store screenshots: node src/store_build.js store/shots.json
// Renders each shot (kicker, title, app capture in a phone frame) at the exact sizes App Store Connect accepts.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

const SIZES = {
  'iphone_6.9': [1320, 2868],   // iPhone with Dynamic Island (large display), the main iPhone set
  'iphone_6.5': [1284, 2778],   // iPhone with Face ID (large display), fallback set
  'ipad_13': [2064, 2752],      // only if the app runs on iPad
};
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

function page(shot, W, H, img) {
  const tab = W / H > 0.6;                       // iPad: wider canvas, smaller relative phone
  const u = W / 1320;                            // layout unit, designed at 1320 wide
  const phoneW = tab ? W * 0.5 : W * 0.712, bez = 24 * u, rad = 118 * u;
  const titleSize = (tab ? 92 : 104) * u;
  const title = shot.title.map(l => l.replace(/\*(.+?)\*/g, '<em>$1</em>')).join('<br>');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;overflow:hidden;background:#0E0F14;font-family:Inter,sans-serif;color:#fff}
  .glow{position:absolute;inset:0;background:radial-gradient(ellipse 70% 38% at 50% 0%,rgba(255,107,0,.42),rgba(255,107,0,0) 70%),radial-gradient(ellipse 60% 30% at 50% 100%,rgba(255,138,31,.18),rgba(255,138,31,0) 70%)}
  .top{position:absolute;left:0;right:0;top:${150 * u}px;text-align:center;padding:0 ${80 * u}px}
  .kicker{display:inline-block;padding:${14 * u}px ${34 * u}px;border-radius:${60 * u}px;background:rgba(255,107,0,.16);color:#FF8A1F;font:700 ${34 * u}px Inter;letter-spacing:.16em;text-transform:uppercase}
  h1{margin-top:${44 * u}px;font:800 ${titleSize}px/1.06 Inter;letter-spacing:-.025em}
  h1 em{font-style:normal;color:#FF8A1F}
  .phone{position:absolute;left:50%;bottom:${(tab ? 0 : 96) * u}px;transform:translateX(-50%);width:${phoneW}px;padding:${bez}px;border-radius:${rad}px;background:#1d2230;box-shadow:0 0 0 ${3 * u}px #2A2E3D,0 ${60 * u}px ${140 * u}px rgba(0,0,0,.6)${tab ? `;bottom:-${180 * u}px` : ''}}
  .phone img{display:block;width:100%;border-radius:${rad - bez}px}
  </style></head><body><div class="glow"></div>
  <div class="top"><div class="kicker">${shot.kicker}</div><h1>${title}</h1></div>
  <div class="phone"><img src="${img}"></div></body></html>`;
}

(async () => {
  const cfgPath = process.argv[2], cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const base = path.dirname(cfgPath), outDir = path.join(base, 'out');
  const sizes = cfg.sizes || ['iphone_6.9'];
  const browser = await chromium.launch();
  for (const sz of sizes) {
    const [W, H] = SIZES[sz];
    fs.mkdirSync(path.join(outDir, sz), { recursive: true });
    const pg = await browser.newPage({ viewport: { width: W, height: H } });
    for (const [i, shot] of cfg.shots.entries()) {
      const file = path.resolve(base, shot.capture);
      const mime = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
      const img = `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
      await pg.setContent(page(shot, W, H, img), { waitUntil: 'load' });
      await pg.evaluate(() => document.fonts.ready);
      const tmp = path.join(outDir, sz, '_tmp.png');
      await pg.screenshot({ path: tmp });
      // App Store Connect rejects alpha channels: flatten to RGB.
      const out = path.join(outDir, sz, `${String(i + 1).padStart(2, '0')}_${shot.name}.png`);
      execFileSync(FFMPEG, ['-v', 'error', '-y', '-i', tmp, '-pix_fmt', 'rgb24', out]);
      fs.unlinkSync(tmp);
      console.log(out);
    }
    await pg.close();
  }
  await browser.close();
})();
