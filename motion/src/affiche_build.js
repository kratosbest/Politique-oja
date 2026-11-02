// Renders the ambassador recruitment poster: node src/affiche_build.js  (FFMPEG=<ffmpeg> to flatten the PNGs)
// affiche_ambassadeurs.html#story -> affiches/OJA_Affiche_Ambassadeurs_1080x1920.png, #feed -> _1080x1350.png,
// plus the HD versions rendered at twice the pixel density from the 4K photo: _2160x3840.png and _2160x2700.png
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..'), FFMPEG = process.env.FFMPEG || 'ffmpeg';
(async () => {
  fs.mkdirSync(path.join(ROOT, 'affiches'), { recursive: true });
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  for (const [fmt, h, k] of [['story', 1920, 1], ['feed', 1350, 1], ['story', 1920, 2], ['feed', 1350, 2]]) {
    const p = await b.newPage({ viewport: { width: 1080, height: h }, deviceScaleFactor: k });
    await p.goto(require('url').pathToFileURL(path.join(ROOT, 'affiche_ambassadeurs.html')).href + '#' + fmt);
    await p.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => 0))); });
    await p.waitForTimeout(300);
    const out = path.join(ROOT, 'affiches', `OJA_Affiche_Ambassadeurs_${1080 * k}x${h * k}.png`), tmp = out + '.tmp.png';
    await p.screenshot({ path: tmp });
    execFileSync(FFMPEG, ['-v', 'error', '-y', '-i', tmp, '-pix_fmt', 'rgb24', out]); fs.unlinkSync(tmp);
    console.log(path.relative(ROOT, out)); await p.close();
  }
  await b.close();
})();
