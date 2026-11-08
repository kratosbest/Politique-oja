// Saves the times of the small sounds of montage3.html (window.SFX) in data/v3/sfx.json, for src/music3.py.
// usage (from video4/): node src/sfx3.js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage();
  await p.goto('file://' + path.resolve(__dirname, '..', 'montage3.html'));
  const sfx = await p.evaluate(() => window.SFX);
  fs.writeFileSync(path.resolve(__dirname, '..', 'data/v3/sfx.json'), JSON.stringify(sfx));
  console.log(sfx.length, 'sounds'); await b.close();
})();
