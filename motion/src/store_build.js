// App Store screenshots: node src/store_build.js store/shots.json
// Renders each shot (kicker, title, app capture in a device frame) at the exact sizes App Store Connect accepts.
// Each size uses the capture taken on its own device class: Apple rejects iPhone captures stretched to iPad.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

// size: [width, height, capture key, frame corner radius as a share of the screen width]
const SIZES = {
  'iphone_6.9': [1320, 2868, 'phone', 0.125],   // iPhone with Dynamic Island (large display), the main iPhone set
  'iphone_6.5': [1284, 2778, 'phone', 0.125],   // iPhone with Face ID (large display), fallback set
  'iphone_6.3': [1206, 2622, 'phone', 0.125],   // iPhone with Dynamic Island (medium display), 6.1 and 6.3 inch
  'ipad_13': [2064, 2752, 'ipad', 0.035],       // iPad 13-inch, required when the app runs on iPad
  'duo_outer': [1398, 2034, 'duo_outer', 0.09], // iPhone Duo outer display (folded)
  'duo_inner': [2007, 2853, 'duo_inner', 0.06], // iPhone Duo inner display (unfolded)
  'play_phone': [1080, 1920, 'phone', 0.125],   // Google Play phone screenshots (9:16)
};
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

function page(shot, W, H, img, radius, titleH = 0) {
  const u = Math.min(W / 1320, H / 2868);        // layout unit, designed on the 1320 x 2868 iPhone canvas
  const title = shot.title.map(l => l.replace(/\*(.+?)\*/g, '<em>$1</em>')).join('<br>');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;overflow:hidden;background:#0E0F14;font-family:Inter,sans-serif;color:#fff;display:flex;flex-direction:column}
  .glow{position:absolute;inset:0;background:radial-gradient(ellipse 70% 38% at 50% 0%,rgba(255,107,0,.42),rgba(255,107,0,0) 70%),radial-gradient(ellipse 60% 30% at 50% 100%,rgba(255,138,31,.18),rgba(255,138,31,0) 70%)}
  .top{position:relative;padding:${150 * u}px ${80 * u}px 0;text-align:center}
  .kicker{display:inline-block;padding:${14 * u}px ${34 * u}px;border-radius:${60 * u}px;background:rgba(255,107,0,.16);color:#FF8A1F;font:700 ${34 * u}px Inter;letter-spacing:.16em;text-transform:uppercase}
  h1{margin-top:${44 * u}px;min-height:${titleH}px;display:flex;align-items:center;justify-content:center;font:800 ${104 * u}px/1.06 Inter;letter-spacing:-.025em}
  h1 span{text-wrap:balance}
  h1 em{font-style:normal;color:#FF8A1F}
  .box{position:relative;flex:1;min-height:0;margin:${110 * u}px ${80 * u}px ${96 * u}px;display:flex;align-items:center;justify-content:center}
  .dev{background:#1d2230;box-shadow:0 0 0 ${3 * u}px #2A2E3D,0 ${60 * u}px ${140 * u}px rgba(0,0,0,.6)}
  .dev img{display:block}
  </style></head><body><div class="glow"></div>
  <div class="top"><div class="kicker">${shot.kicker}</div><h1><span>${title}</span></h1></div>
  <div class="box"><div class="dev"><img src="${img}"></div></div>
  <script>
  // Fit the device frame (capture + bezel) inside the space left under the title.
  // Elements are looked up inside fit(): setContent reuses the window, so top-level consts would clash.
  window.fit = () => {
    const box = document.querySelector('.box'), dev = document.querySelector('.dev'), im = dev.querySelector('img');
    const a = im.naturalWidth / im.naturalHeight, bw = box.clientWidth, bh = box.clientHeight;
    let w = Math.min(bw, bh * a); const bez = w * 0.026; w -= 2 * bez;
    const r = w * ${radius};
    im.style.width = w + 'px'; im.style.borderRadius = r + 'px';
    dev.style.padding = bez + 'px'; dev.style.borderRadius = (r + bez) + 'px';
  };
  </script></body></html>`;
}

(async () => {
  const cfgPath = process.argv[2], cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const base = path.dirname(cfgPath), outDir = path.join(base, 'out');
  const browser = await chromium.launch();
  for (const sz of cfg.sizes) {
    const [W, H, key, radius] = SIZES[sz];
    const shots = cfg.shots.filter(s => s.captures[key] && !(s.skip || []).includes(sz));
    if (!shots.length) { console.log(`${sz}: no ${key} capture, skipped`); continue; }
    fs.mkdirSync(path.join(outDir, sz), { recursive: true });
    const pg = await browser.newPage({ viewport: { width: W, height: H } });
    // Reserve the tallest title of the set, so every device frame in a set has the same size.
    let titleH = 0;
    for (const shot of shots) {
      await pg.setContent(page(shot, W, H, '', radius));
      titleH = Math.max(titleH, await pg.evaluate(async () => { await document.fonts.ready; return document.querySelector('h1 span').offsetHeight; }));
    }
    for (const [i, shot] of shots.entries()) {
      const file = path.resolve(base, shot.captures[key]);
      const mime = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
      const img = `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
      await pg.setContent(page(shot, W, H, img, radius, titleH), { waitUntil: 'load' });
      await pg.evaluate(async () => { await document.fonts.ready; await document.querySelector(".dev img").decode(); fit(); });
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
