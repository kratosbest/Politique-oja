
const CX = [960, 960, 960, 900, 960, 960, 960, 960];   // horizontal centre of the 4:5 window, per shot
function labelV(t) {
  for (const [a, b, s] of LABELS) {
    if (t < a || t > b) continue;
    const u = t - a, al = win(t, a, b, .2);
    V.save(); V.globalAlpha = al; V.textBaseline = 'alphabetic';
    V.fillStyle = '#FF6B00'; const lw = 70 * ease(u / .4); V.fillRect(540 - lw / 2, 150, lw, 5);
    V.fillStyle = '#fff'; V.font = '700 56px Inter';
    spaced(V, decode(s, clamp((u - .08) / .45), a * 10), 540, 222, 18);
    V.font = '600 28px Inter'; V.fillStyle = 'rgba(255,255,255,.65)';
    if (u > .3) spaced(V, decode('BÉNIN', clamp((u - .3) / .3), a * 7), 540, 262, 12);
    V.restore();
  }
}
function composeShot(t, i) {
  // blurred, darkened copy of the frame fills the vertical screen
  V.save(); V.filter = 'blur(38px) brightness(.42) saturate(1.2)';
  const sc = OH / H * 1.08, w = W * sc, h = H * sc; V.drawImage(off, (OW - w) / 2, (OH - h) / 2, w, h); V.restore();
  // the picture, in a 4:5 window
  let sy = 0, sh = H; if (i === 7) { sy = 140; sh = 800; }       // plan 6 already has cinema bars
  const sw = sh * OW / BH, sx = clamp(CX[i] - sw / 2, 0, W - sw);
  V.save(); V.shadowColor = 'rgba(0,0,0,.6)'; V.shadowBlur = 60; V.fillStyle = '#000'; V.fillRect(0, BY, OW, BH); V.restore();
  V.drawImage(off, sx, sy, sw, sh, 0, BY, OW, BH);
  V.fillStyle = 'rgba(255,107,0,.9)'; V.fillRect(0, BY - 3, OW, 3); V.fillRect(0, BY + BH, OW, 3);
}
function backgroundV() {
  V.fillStyle = '#07070a'; V.fillRect(0, 0, OW, OH);
  V.save(); V.strokeStyle = 'rgba(255,107,0,.05)'; V.lineWidth = 1;
  for (let x = 0; x <= OW; x += 90) { V.beginPath(); V.moveTo(x + .5, 0); V.lineTo(x + .5, OH); V.stroke(); }
  for (let y = 0; y <= OH; y += 90) { V.beginPath(); V.moveTo(0, y + .5); V.lineTo(OW, y + .5); V.stroke(); }
  V.restore();
}
function endCardV(t) {
  const u = t - T_END;
  backgroundV();
  const LS = 700, bc = 760, LX = 540 - LS / 2, LY = bc - LS * 377 / 1024;
  const sh = 330 * easeIO(u / .38) + 30 * easeIO((u - 1.1) / .8);
  const gl = V.createRadialGradient(540, bc, 10, 540, bc, 520); gl.addColorStop(0, `rgba(255,107,0,${.32 * ease(u / .5)})`); gl.addColorStop(1, 'rgba(255,107,0,0)');
  V.fillStyle = gl; V.fillRect(0, bc - 520, OW, 1040);
  V.save(); V.beginPath(); V.rect(0, bc - sh / 2, OW, sh); V.clip(); V.drawImage(img('logo'), LX, LY, LS, LS); V.restore();
  V.save(); V.shadowColor = '#FF6B00'; V.shadowBlur = 24; V.fillStyle = `rgba(255,170,90,${clamp(u / .1)})`;
  V.fillRect(0, bc - sh / 2 - 2, OW, 4); V.fillRect(0, bc + sh / 2 - 2, OW, 4); V.restore();
  V.save(); V.textBaseline = 'alphabetic';
  V.font = '900 168px Poppins'; V.fillStyle = '#fff';
  const k1 = clamp((u - .35) / .45); if (k1 > 0) spaced(V, decode('BIENTÔT', k1, 300), 540, 1225, 6);
  V.font = '700 38px Inter'; V.fillStyle = '#FF6B00';
  const k2 = clamp((u - .7) / .5); if (k2 > 0) spaced(V, decode('AU BÉNIN · COMING SOON', k2, 400), 540, 1315, 16);
  V.restore();
}
const grains = [0, 1, 2, 3].map(s => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), d = g.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) { const v = rnd(i * .37 + s * 1000, s) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); return c; });
function wrapCaption(s) {   // two balanced lines when the caption is long
  X.font = '500 50px Inter'; if (X.measureText(s).width < OW - 140) return [s];
  const w = s.split(' '); let best = [s], bd = 1e9;
  for (let k = 1; k < w.length; k++) { const a = w.slice(0, k).join(' '), b = w.slice(k).join(' '), d = Math.abs(X.measureText(a).width - X.measureText(b).width); if (d < bd) { bd = d; best = [a, b]; } }
  return best;
}
function post(t, fi) {
  const g = glitchAt(t);
  X.globalCompositeOperation = 'source-over'; X.drawImage(vc, 0, 0);
  if (g > .02) {
    const n = 6 + Math.floor(10 * g);
    for (let k = 0; k < n; k++) {
      const y = Math.floor(rnd(fi, k) * OH), h = 8 + Math.floor(rnd(fi, k + 50) * 130 * g), dx = (rnd(fi, k + 99) - .5) * 220 * g;
      X.drawImage(vc, 0, y, OW, h, dx, y, OW, h);
    }
    const s = Math.round(5 + 22 * g), id = X.getImageData(0, 0, OW, OH), d = id.data, src = new Uint8ClampedArray(d);
    for (let y = 0; y < OH; y++) { const row = y * OW * 4;
      for (let x = 0; x < OW; x++) { const i = row + x * 4; d[i] = src[row + Math.min(OW - 1, x + s) * 4]; d[i + 2] = src[row + Math.max(0, x - s) * 4 + 2]; } }
    X.putImageData(id, 0, 0);
  }
  X.save(); X.globalAlpha = .06; X.globalCompositeOperation = 'screen';
  const gc = grains[fi % 4], ox = Math.floor(rnd(fi, 1) * 256), oy = Math.floor(rnd(fi, 2) * 256);
  for (let y = -oy; y < OH; y += 256) for (let x = -ox; x < OW; x += 256) X.drawImage(gc, x, y);
  X.restore();
  const v = X.createRadialGradient(540, 960, 600, 540, 960, 1300); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)');
  X.fillStyle = v; X.fillRect(0, 0, OW, OH);
  if (t < .7) { X.fillStyle = `rgba(0,0,0,${1 - ease(t / .7)})`; X.fillRect(0, 0, OW, OH); }
  // captions under the picture
  X.save(); X.font = '500 50px Inter'; X.textAlign = 'center'; X.textBaseline = 'middle';
  for (const [a, b, s] of CAPS) {
    const al = win(t, a, b, .2); if (al <= 0) continue;
    const ls = wrapCaption(s); X.fillStyle = `rgba(255,255,255,${al})`; X.shadowColor = 'rgba(0,0,0,.8)'; X.shadowBlur = 16;
    ls.forEach((l, k) => X.fillText(l, 540, 1752 + (k - (ls.length - 1) / 2) * 66));
  }
  X.restore();
}

let curSrc = '';
window.renderAt = async t => {
  const fi = Math.round(t * FPS);
  if (t < T_END) {
    const src = `assets/csf/f${String(Math.min(fi, 407)).padStart(4, '0')}.jpg`;
    if (src !== curSrc) { bg.src = src; curSrc = src; }
    await bg.decode().catch(() => 0);
    const i = shot(t);
    if (i === 6) phoneGlow(t);
    if (i === 7) trails(t);
    composeShot(t, i); labelV(t);
  } else endCardV(t);
  post(t, fi);
};
window.waitFrame = () => 0;
window.ready = (async () => {
  for (const f of ['900 168px Poppins', '700 56px Inter', '600 28px Inter', '700 38px Inter', '500 50px Inter']) await document.fonts.load(f);
  await document.fonts.ready; await img('logo').decode().catch(() => 0);
  await window.renderAt(0);
  return true;
})();
if (location.search.includes('play')) {
  const a = document.getElementById('aud'); let t0 = null, busy = false;
  const fit = () => { const s = Math.min(innerWidth / OW, innerHeight / OH); cv.style.transform = `scale(${s})`; cv.style.transformOrigin = '0 0'; };
  fit(); addEventListener('resize', fit);
  const loop = async () => { if (!busy) { busy = true; const t = a && !a.paused ? a.currentTime : (t0 === null ? 0 : (performance.now() - t0) / 1000); await window.renderAt(t % DUR); busy = false; } requestAnimationFrame(loop); };
  document.addEventListener('click', () => { a.currentTime = 0; a.play().catch(() => { t0 = performance.now(); }); });
  window.ready.then(loop);
}
