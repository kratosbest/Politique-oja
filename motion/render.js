// Usage: node render.js <fps> <startFrame> <endFrame> <out.mp4> [ffmpeg]
// Steps renderAt(t) frame by frame in headless Chromium and pipes JPEG frames to ffmpeg.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const fps = Number(process.argv[2]), a = Number(process.argv[3]), b = Number(process.argv[4]);
const out = process.argv[5], ff = process.argv[6] || 'ffmpeg';
(async () => {
  const br = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await br.newPage({ viewport: { width: Number(process.env.VW || 1920), height: Number(process.env.VH || 1080) } });
  p.on('pageerror', e => console.error('ERR', e.message));
  await p.goto('file://' + __dirname + '/' + (process.env.PAGE || 'index.html'));
  await p.evaluate(() => window.ready);
  const enc = spawn(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(fps), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = a; f < b; f++) {
    await p.evaluate(t => renderAt(t), f / fps);
    const buf = await p.screenshot({ type: 'jpeg', quality: 95 });
    if (!enc.stdin.write(buf)) await new Promise(r => enc.stdin.once('drain', r));
  }
  enc.stdin.end();
  await new Promise(r => enc.on('close', r));
  await br.close();
})();
