// Renders the Oja App Facebook / Instagram ad: node src/pub_facebook_build.js  (FFMPEG=<ffmpeg> to flatten the PNGs)
// pub_facebook.html#feed -> pubs/OJA_Pub_Facebook_1080x1350.png (4:5), #story -> _1080x1920.png (9:16),
// plus the same at twice the pixel density (_2160x2700.png, _2160x3840.png).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..'), FFMPEG = process.env.FFMPEG || 'ffmpeg';
(async () => {
  fs.mkdirSync(path.join(ROOT, 'pubs'), { recursive: true });
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  for (const [fmt, h, k] of [['feed', 1350, 1], ['story', 1920, 1], ['feed', 1350, 2], ['story', 1920, 2]]) {
    const p = await b.newPage({ viewport: { width: 1080, height: h }, deviceScaleFactor: k });
    await p.goto(require('url').pathToFileURL(path.join(ROOT, 'pub_facebook.html')).href + '#' + fmt);
    await p.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => 0))); });
    await p.waitForTimeout(300);
    const out = path.join(ROOT, 'pubs', `OJA_Pub_Facebook_${1080 * k}x${h * k}.png`), tmp = out + '.tmp.png';
    await p.screenshot({ path: tmp });
    execFileSync(FFMPEG, ['-v', 'error', '-y', '-i', tmp, '-pix_fmt', 'rgb24', out]); fs.unlinkSync(tmp);
    console.log(path.relative(ROOT, out)); await p.close();
  }
  await b.close();
})();
