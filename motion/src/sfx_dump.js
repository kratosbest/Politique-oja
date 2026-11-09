// Saves the sound marks of a page (window.SFX: [[seconds, kind], ...]) in a JSON file, for the music scripts.
// usage (from motion/): node src/sfx_dump.js page.html out.json
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage();
  await p.goto('file://' + path.resolve(process.argv[2]));
  const sfx = await p.evaluate(() => window.SFX);
  fs.writeFileSync(process.argv[3], JSON.stringify(sfx)); console.log(sfx.length, 'sounds'); await b.close();
})();
