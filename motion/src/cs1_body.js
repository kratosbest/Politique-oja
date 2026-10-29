const W = 1920, H = 1080, DUR = 21, FPS = 24;
const BAR = 138;                       // 2.39:1 letterbox
const cv = document.getElementById('cv'), X = cv.getContext('2d');
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const off = mk(), O = off.getContext('2d');
const img = id => document.getElementById(id);
const bg = img('bg');

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = u => 1 - Math.pow(1 - clamp(u), 3);
const easeIO = u => { u = clamp(u); return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
const rnd = (a, b = 0) => { const x = Math.sin(a * 127.1 + b * 311.7 + 17.3) * 43758.5453; return x - Math.floor(x); };
const win = (t, a, b, f = .25) => clamp((t - a) / f) * clamp((b - t) / f);

/* ---------- timeline (captions follow the Isac voice placed by the soundtrack script) ---------- */
const CUTS = [0, 3.2, 5.0, 6.6, 8.0, 9.4, 10.8, 14.0, 17.0];
const ZOOM = [.06, .03, .03, .035, .035, .035, .05, .025];     // slow push-in per shot
const T_END = 17.0;
let CAPS = [[0.9, 2.9, 'Un pays qui bouge.'], [6.8, 9.1, 'Des millions d’ambitions.'],
  [11.05, 14.6, 'Et bientôt… une nouvelle façon de tout connecter.'], [17.5, 20.7, 'OJA arrive.']];
const LABELS = [[0.5, 3.1, 'COTONOU'], [5.05, 6.55, 'ATACORA']];
const HITS = [[3.2, .25, .06], [6.6, .5, .12], [10.8, .6, .14], [14.0, .35, .08], [T_END, 1.15, .26], [18.62, .3, .06], [19.7, .35, .07]];
const glitchAt = t => { let g = 0; for (const [h, s, d] of HITS) if (t >= h - .04 && t < h + d) g = Math.max(g, s * (1 - Math.max(0, t - h) / d)); return g; };

/* ---------- text helpers ---------- */
const GLY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/';
function decode(s, u, seed) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i]; if (' .·…’'.includes(c)) { out += c; continue; }
    const k = clamp(u * (s.length + 4) - i, 0, 1);
    out += k >= 1 ? c : k <= 0 ? ' ' : GLY[Math.floor(rnd(seed + i, Math.floor(u * 40)) * GLY.length)];
  }
  return out;
}
function spaced(ctx, s, x, y, sp, align = 'center') {
  const ws = [...s].map(c => ctx.measureText(c).width), tot = ws.reduce((a, b) => a + b, 0) + sp * (s.length - 1);
  let cx = align === 'center' ? x - tot / 2 : x; ctx.textAlign = 'left';
  [...s].forEach((c, i) => { ctx.fillText(c, cx, y); cx += ws[i] + sp; });
  return tot;
}

/* ---------- shots ---------- */
function shot(t) {
  let i = CUTS.length - 2; while (CUTS[i] > t) i--;
  const u = (t - CUTS[i]) / (CUTS[i + 1] - CUTS[i]), z = 1 + ZOOM[i] * easeIO(u);
  const w = W * z, h = H * z;
  O.drawImage(bg, (W - w) / 2, (H - h) / 2 - (z - 1) * 120, w, h);
  return i;
}
// plan 5: the phone lights up in OJA orange
function phoneGlow(t) {
  const u = clamp((t - 11.2) / 2.4); if (u <= 0) return;
  const pulse = .85 + .15 * Math.sin(t * 22) * Math.exp(-((t - 11.2) % .9) * 3);
  O.save(); O.globalCompositeOperation = 'screen';
  O.translate(956, 655); O.scale(2.3, 1);
  const r = 120 + 260 * ease(u), g = O.createRadialGradient(0, 0, 10, 0, 0, r);
  g.addColorStop(0, `rgba(255,140,40,${.75 * u * pulse})`); g.addColorStop(.45, `rgba(255,107,0,${.35 * u * pulse})`); g.addColorStop(1, 'rgba(255,107,0,0)');
  O.fillStyle = g; O.beginPath(); O.arc(0, 0, r, 0, 7); O.fill();
  O.restore();
  // warm wash over the whole frame
  O.save(); O.globalCompositeOperation = 'soft-light'; O.fillStyle = `rgba(255,107,0,${.35 * u})`; O.fillRect(0, 0, W, H); O.restore();
}
// plan 6: light trails converge on one point, which becomes the OJA pin
const C = [960, 470];
const TRAILS = Array.from({ length: 18 }, (_, k) => {
  const side = k % 3, sx = side === 0 ? 120 + rnd(k, 1) * 1680 : side === 1 ? -40 : W + 40;
  const sy = side === 0 ? 960 : 300 + rnd(k, 2) * 600;
  const cx = (sx + C[0]) / 2 + (rnd(k, 3) - .5) * 700, cy = (sy + C[1]) / 2 + (rnd(k, 4) - .2) * 300;
  return { sx, sy, cx, cy, d: rnd(k, 5) * .9, s: 1.15 + rnd(k, 6) * .5 };
});
const qb = (p, a, b, c) => (1 - p) * (1 - p) * a + 2 * (1 - p) * p * b + p * p * c;
function trails(t) {
  const T0 = 14.25; if (t < T0) return;
  O.save(); O.globalCompositeOperation = 'screen'; O.lineCap = 'round';
  for (const r of TRAILS) {
    const head = clamp((t - T0 - r.d) / r.s); if (head <= 0) continue;
    const tail = Math.max(0, head - .35), N = 18;
    for (let j = 0; j < N; j++) {
      const p0 = tail + (head - tail) * j / N, p1 = tail + (head - tail) * (j + 1) / N, a = (j + 1) / N;
      O.strokeStyle = `rgba(255,${120 + 80 * a},${40 + 60 * a},${a * .9})`; O.lineWidth = 1.5 + 4 * a;
      O.shadowColor = '#FF6B00'; O.shadowBlur = 18;
      O.beginPath(); O.moveTo(qb(p0, r.sx, r.cx, C[0]), qb(p0, r.sy, r.cy, C[1])); O.lineTo(qb(p1, r.sx, r.cx, C[0]), qb(p1, r.sy, r.cy, C[1])); O.stroke();
    }
  }
  // core + pin
  const k = clamp((t - 15.7) / .9);
  if (k > 0) {
    const g = O.createRadialGradient(C[0], C[1], 4, C[0], C[1], 60 + 260 * k);
    g.addColorStop(0, `rgba(255,220,170,${.9 * k})`); g.addColorStop(.3, `rgba(255,107,0,${.55 * k})`); g.addColorStop(1, 'rgba(255,107,0,0)');
    O.fillStyle = g; O.fillRect(0, 0, W, H);
  }
  O.restore();
  const p = clamp((t - 16.15) / .6);
  if (p > 0) {
    const s = 60 + 200 * ease(p), a = clamp(p * 2);
    O.save(); O.globalAlpha = a; O.shadowColor = '#FF6B00'; O.shadowBlur = 50;
    O.drawImage(img('logo'), C[0] - s / 2, C[1] - s * .42, s, s); O.restore();
  }
  // flash into the end card
  const fl = clamp((t - 16.82) / .18);
  if (fl > 0) { O.fillStyle = `rgba(255,236,215,${fl})`; O.fillRect(0, 0, W, H); }
}
function label(t) {
  for (const [a, b, s] of LABELS) {
    if (t < a || t > b) continue;
    const u = t - a, al = win(t, a, b, .2);
    O.save(); O.globalAlpha = al; O.textBaseline = 'alphabetic';
    O.fillStyle = '#FF6B00'; O.fillRect(120, 196, 54 * ease(u / .4), 4);
    O.fillStyle = '#fff'; O.font = '700 40px Inter';
    spaced(O, decode(s, clamp((u - .08) / .45), a * 10), 120, 250, 14, 'left');
    O.font = '600 22px Inter'; O.fillStyle = 'rgba(255,255,255,.65)';
    if (u > .3) spaced(O, decode('BÉNIN', clamp((u - .3) / .3), a * 7), 122, 284, 10, 'left');
    O.restore();
  }
}

/* ---------- end card: partial logo through a slit ---------- */
function background() {
  O.fillStyle = '#07070a'; O.fillRect(0, 0, W, H);
  O.save(); O.strokeStyle = 'rgba(255,107,0,.05)'; O.lineWidth = 1;
  for (let x = 0; x <= W; x += 96) { O.beginPath(); O.moveTo(x + .5, 0); O.lineTo(x + .5, H); O.stroke(); }
  for (let y = 0; y <= H; y += 96) { O.beginPath(); O.moveTo(0, y + .5); O.lineTo(W, y + .5); O.stroke(); }
  O.restore();
}
function endCard(t) {
  const u = t - T_END;
  background();
  const LS = 540, bc = 440, LX = 960 - LS / 2, LY = bc - LS * 377 / 1024;
  const sh = 290 * easeIO(u / .38) + 24 * easeIO((u - 1.2) / .9);
  const gl = O.createRadialGradient(960, bc, 10, 960, bc, 560); gl.addColorStop(0, `rgba(255,107,0,${.3 * ease(u / .5)})`); gl.addColorStop(1, 'rgba(255,107,0,0)');
  O.fillStyle = gl; O.fillRect(0, 0, W, H);
  O.save(); O.beginPath(); O.rect(0, bc - sh / 2, W, sh); O.clip(); O.drawImage(img('logo'), LX, LY, LS, LS); O.restore();
  O.save(); O.shadowColor = '#FF6B00'; O.shadowBlur = 24; O.fillStyle = `rgba(255,170,90,${clamp(u / .1)})`;
  O.fillRect(0, bc - sh / 2 - 2, W, 4); O.fillRect(0, bc + sh / 2 - 2, W, 4); O.restore();
  O.save(); O.textBaseline = 'alphabetic';
  O.font = '900 104px Poppins'; O.fillStyle = '#fff';
  const k1 = clamp((u - .35) / .45); if (k1 > 0) spaced(O, decode('BIENTÔT AU BÉNIN', k1, 300), 960, 760, 4);
  O.font = '700 32px Inter'; O.fillStyle = '#FF6B00';
  const k2 = clamp((u - .75) / .5); if (k2 > 0) spaced(O, decode('COMING SOON', k2, 400), 960, 830, 18);
  O.restore();
}

/* ---------- post: glitch, grain, vignette, letterbox + captions ---------- */
const grains = [0, 1, 2, 3].map(s => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), d = g.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) { const v = rnd(i * .37 + s * 1000, s) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); return c; });
function post(t, fi) {
  const g = glitchAt(t);
  X.globalCompositeOperation = 'source-over'; X.drawImage(off, 0, 0);
  if (g > .02) {
    const n = 6 + Math.floor(10 * g);
    for (let k = 0; k < n; k++) {
      const y = Math.floor(rnd(fi, k) * H), h = 8 + Math.floor(rnd(fi, k + 50) * 110 * g), dx = (rnd(fi, k + 99) - .5) * 300 * g;
      X.drawImage(off, 0, y, W, h, dx, y, W, h);
    }
    const s = Math.round(5 + 24 * g), id = X.getImageData(0, 0, W, H), d = id.data, src = new Uint8ClampedArray(d);
    for (let y = 0; y < H; y++) { const row = y * W * 4;
      for (let x = 0; x < W; x++) { const i = row + x * 4; d[i] = src[row + Math.min(W - 1, x + s) * 4]; d[i + 2] = src[row + Math.max(0, x - s) * 4 + 2]; } }
    X.putImageData(id, 0, 0);
  }
  X.save(); X.globalAlpha = .06; X.globalCompositeOperation = 'screen';
  const gc = grains[fi % 4], ox = Math.floor(rnd(fi, 1) * 256), oy = Math.floor(rnd(fi, 2) * 256);
  for (let y = -oy; y < H; y += 256) for (let x = -ox; x < W; x += 256) X.drawImage(gc, x, y);
  X.restore();
  const v = X.createRadialGradient(960, 540, 520, 960, 540, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)');
  X.fillStyle = v; X.fillRect(0, 0, W, H);
  // fade from black at the start
  if (t < .7) { X.fillStyle = `rgba(0,0,0,${1 - ease(t / .7)})`; X.fillRect(0, 0, W, H); }
  // letterbox
  X.fillStyle = '#000'; X.fillRect(0, 0, W, BAR); X.fillRect(0, H - BAR, W, BAR);
  // captions in the bottom bar
  X.save(); X.font = '500 36px Inter'; X.textAlign = 'center'; X.textBaseline = 'middle';
  for (const [a, b, s] of CAPS) { const al = win(t, a, b, .2); if (al > 0) { X.fillStyle = `rgba(255,255,255,${al})`; X.fillText(s, 960, H - BAR / 2); } }
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
    label(t);
  } else endCard(t);
  post(t, fi);
};
window.waitFrame = () => 0;
window.ready = (async () => {
  for (const f of ['900 104px Poppins', '700 40px Inter', '600 22px Inter', '700 32px Inter', '500 36px Inter']) await document.fonts.load(f);
  await document.fonts.ready; await img('logo').decode().catch(() => 0);
  await window.renderAt(0);
  return true;
})();
if (location.search.includes('play')) {
  const a = document.getElementById('aud'); let t0 = null, busy = false;
  const fit = () => { const s = Math.min(innerWidth / W, innerHeight / H); cv.style.transform = `scale(${s})`; cv.style.transformOrigin = '0 0'; };
  fit(); addEventListener('resize', fit);
  const loop = async () => { if (!busy) { busy = true; const t = a && !a.paused ? a.currentTime : (t0 === null ? 0 : (performance.now() - t0) / 1000); await window.renderAt(t % DUR); busy = false; } requestAnimationFrame(loop); };
  document.addEventListener('click', () => { a.currentTime = 0; a.play().catch(() => { t0 = performance.now(); }); });
  window.ready.then(loop);
}
