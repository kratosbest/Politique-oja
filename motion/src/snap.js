const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: Number(process.env.VW || 1920), height: Number(process.env.VH || 1080) } });
  p.on('pageerror', e => console.log('ERR', e.message));
  p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
  await p.goto(require('url').pathToFileURL(require('path').resolve(__dirname, '..')).href + '/' + (process.env.PAGE || 'index.html'));
  await p.evaluate(() => window.ready);
  const dir = process.argv[2]; const ts = process.argv.slice(3).map(Number);
  const fs = require('fs'); fs.mkdirSync(require('path').resolve(dir), { recursive: true });
  for (const t of ts) {
    await p.evaluate(t => renderAt(t), t);
    await p.evaluate(() => window.waitFrame ? window.waitFrame() : 0);
    await p.screenshot({ path: `${require('path').resolve(dir)}/t${t.toFixed(2)}.jpg`, type: 'jpeg', quality: 70 });
  }
  await b.close();
})();
