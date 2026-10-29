const W = 1080, H = 1920, DUR = 10, FPS = 30;
const cv = document.getElementById('cv'), X = cv.getContext('2d');
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const off = mk(), O = off.getContext('2d');      // scene
const lay = mk(), L = lay.getContext('2d');      // numeral compositing
const img = id => document.getElementById(id);

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = u => 1 - Math.pow(1 - clamp(u), 3);
const easeIO = u => { u = clamp(u); return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
const rnd = (a, b = 0) => { const x = Math.sin(a * 127.1 + b * 311.7 + 17.3) * 43758.5453; return x - Math.floor(x); };

/* ---------- timeline ---------- */
const NUMS = [
  { ch: '5', t: 0.5, im: 'cd5', city: 'COTONOU' },
  { ch: '4', t: 1.7, im: 'cd4', city: 'PORTO-NOVO' },
  { ch: '3', t: 2.9, im: 'cd3', city: 'OUIDAH' },
  { ch: '2', t: 4.1, im: 'cd2', city: 'ABOMEY' },
  { ch: '1', t: 5.3, im: 'cd1', city: 'NATITINGOU' },
];
const T_MAP = 6.1, T_TXT = 6.95, T_LOGO = 8.0;
// glitch hits: [time, strength, duration]
const HITS = [[0.5, .9, .16], [1.7, .8, .14], [2.9, .8, .14], [4.1, .8, .14], [5.3, .9, .16], [T_MAP, 1, .22],
  [T_TXT, .6, .14], [7.42, .35, .07], [T_LOGO, 1.2, .26], [8.62, .3, .06], [9.18, .45, .08], [9.66, .35, .06]];
const glitchAt = t => { let g = 0; for (const [h, s, d] of HITS) { if (t >= h - .05 && t < h + d) g = Math.max(g, s * (1 - Math.max(0, t - h) / d)); } return g; };

/* ---------- decode text (letters scramble then settle) ---------- */
const GLY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/';
function decode(s, u, seed) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i]; if (c === ' ' || c === '.' || c === '·') { out += c; continue; }
    const k = clamp(u * (s.length + 4) - i, 0, 1);
    if (k >= 1) out += c; else if (k <= 0) out += ' '; else out += GLY[Math.floor(rnd(seed + i, Math.floor(u * 40)) * GLY.length)];
  }
  return out;
}
function spaced(ctx, s, x, y, sp) { // centered text with letter spacing
  const ws = [...s].map(c => ctx.measureText(c).width); const tot = ws.reduce((a, b) => a + b, 0) + sp * (s.length - 1);
  let cx = x - tot / 2; ctx.textAlign = 'left';
  [...s].forEach((c, i) => { ctx.fillText(c, cx, y); cx += ws[i] + sp; });
  return tot;
}

/* ---------- numeral filled with a city photo ---------- */
const NUM_FONT = '900 1420px Poppins';
function numeral(n, u) {
  L.setTransform(1, 0, 0, 1, 0, 0); L.globalCompositeOperation = 'source-over'; L.clearRect(0, 0, W, H);
  L.font = NUM_FONT; L.textAlign = 'center'; L.textBaseline = 'alphabetic';
  const m = L.measureText(n.ch), asc = m.actualBoundingBoxAscent, desc = m.actualBoundingBoxDescent;
  const cy = 880, s = 1 + .2 * Math.exp(-u * 13) - .03 * u;
  const base = asc - (asc + desc) / 2;
  L.translate(540, cy); L.scale(s, s);
  L.fillStyle = '#fff'; L.fillText(n.ch, 0, base);
  L.setTransform(1, 0, 0, 1, 0, 0);
  L.globalCompositeOperation = 'source-in';
  const z = 1.06 + .03 * u, pw = W * z, ph = H * z;
  L.drawImage(img(n.im), (W - pw) / 2, (H - ph) / 2 - 40 * u + 20, pw, ph);
  // white flash on hit
  const fl = Math.exp(-u * 11) * .75;
  if (fl > .01) { L.globalCompositeOperation = 'source-atop'; L.fillStyle = `rgba(255,240,225,${fl})`; L.fillRect(0, 0, W, H); }
  // glow + edge behind/over the photo
  O.save();
  O.translate(540, cy); O.scale(s, s); O.font = NUM_FONT; O.textAlign = 'center';
  O.shadowColor = 'rgba(255,107,0,.55)'; O.shadowBlur = 90; O.fillStyle = '#2a0f00'; O.fillText(n.ch, 0, base);
  O.restore();
  O.drawImage(lay, 0, 0);
  O.save();
  O.translate(540, cy); O.scale(s, s); O.font = NUM_FONT; O.textAlign = 'center';
  O.lineWidth = 3 / s; O.strokeStyle = 'rgba(255,150,60,.85)'; O.strokeText(n.ch, 0, base);
  O.restore();
}
function cityLabel(n, u, i) {
  const k = clamp((u - .06) / .38);
  O.save(); O.fillStyle = '#fff'; O.font = '700 62px Inter'; O.textBaseline = 'alphabetic';
  spaced(O, decode(n.city, k, i * 13), 540, 1640, 22);
  // scan line under the city
  const lw = 420 * ease((u - .05) / .4);
  O.fillStyle = '#FF6B00'; O.fillRect(540 - lw / 2, 1678, lw, 5);
  O.font = '600 30px Inter'; O.fillStyle = 'rgba(255,255,255,.55)';
  if (u > .3) spaced(O, decode('BÉNIN', clamp((u - .3) / .3), i * 7 + 3), 540, 1740, 14);
  O.restore();
  if (n.ch === '5') { O.save(); O.font = '500 20px Inter'; O.fillStyle = 'rgba(255,255,255,.45)'; O.textAlign = 'right'; O.fillText('Photo © Présidence du Bénin', W - 36, H - 34); O.restore(); }
}

/* ---------- Benin map ---------- */
const MK = 1.62, MCX = 226.5, MCY = 369.5, MX = 540, MY = 860;
const P_BEN = new Path2D(MAP.BEN), NEI = ['TGO', 'NGA', 'BFA', 'NER'].map(k => new Path2D(MAP[k]));
const benLen = (() => { const n = MAP.BEN.match(/-?[\d.]+/g).map(Number); let l = 0; for (let i = 2; i < n.length; i += 2) l += Math.hypot(n[i] - n[i - 2], n[i + 1] - n[i - 1]); return l; })();
const CITIES = [['Cotonou', 6.3703, 2.3912], ['Porto-Novo', 6.4969, 2.6289], ['Ouidah', 6.3631, 2.0851], ['Abomey', 7.1829, 1.9912], ['Natitingou', 10.3042, 1.3796]]
  .map(([n, la, lo]) => [n, lo * 100 * Math.cos(9.5 * Math.PI / 180), (13 - la) * 100]);
function benin(t, dim) {
  const u = t - T_MAP;
  O.save();
  O.translate(MX, MY); const sc = MK * (1.04 - .04 * ease(u / .6)) * (1 - .12 * dim); O.scale(sc, sc); O.translate(-MCX, -MCY);
  O.globalAlpha = 1 - .72 * dim;
  O.lineWidth = 1.4 / sc; O.strokeStyle = `rgba(255,255,255,${.16 * ease((u - .2) / .4)})`;
  NEI.forEach(p => O.stroke(p));
  // fill
  const fa = ease((u - .15) / .5);
  const gr = O.createLinearGradient(0, 60, 0, 680); gr.addColorStop(0, `rgba(255,138,31,${.55 * fa})`); gr.addColorStop(1, `rgba(194,65,12,${.75 * fa})`);
  O.fillStyle = gr; O.fill(P_BEN);
  // border drawing
  const d = ease(u / .55);
  O.setLineDash([benLen * d, benLen]); O.lineWidth = 5 / sc; O.strokeStyle = '#FF8A1F';
  O.shadowColor = 'rgba(255,107,0,.9)'; O.shadowBlur = 30; O.stroke(P_BEN); O.setLineDash([]); O.shadowBlur = 0;
  // cities
  CITIES.forEach(([n, x, y], i) => {
    const v = u - (.25 + i * .09); if (v < 0) return;
    const r = 9 / sc * ease(v / .15);
    O.fillStyle = '#fff'; O.beginPath(); O.arc(x, y, r, 0, 7); O.fill();
    const rr = (10 + 60 * ease(v / .6)) / sc; O.strokeStyle = `rgba(255,255,255,${.8 * (1 - ease(v / .6))})`; O.lineWidth = 3 / sc;
    O.beginPath(); O.arc(x, y, rr, 0, 7); O.stroke();
  });
  O.restore();
}

/* ---------- "Le changement approche." ---------- */
function tagline(t) {
  const u = t - T_TXT;
  O.save(); O.textBaseline = 'alphabetic'; O.font = '800 104px Poppins';
  const y0 = 880 + 30 * (1 - ease(u / .5));
  O.fillStyle = '#fff'; spaced(O, decode('Le changement', clamp(u / .42), 50), 540, y0 - 20, -2);
  O.fillStyle = '#FF6B00'; spaced(O, decode('approche.', clamp((u - .18) / .36), 90), 540, y0 + 105, -2);
  O.restore();
}

/* ---------- partial logo through a slit + BIENTÔT ---------- */
function endCard(t) {
  const u = t - T_LOGO;
  const LS = 700, LX = 540 - LS / 2, LY = 760 - LS * (377 / 1024);   // badge centre at y = 760
  const bc = LY + LS * 377 / 1024;
  const sh = 330 * easeIO(u / .38) + 30 * easeIO((u - 1.1) / .8);    // slit height
  // glow behind
  const gl = O.createRadialGradient(540, bc, 10, 540, bc, 520); gl.addColorStop(0, `rgba(255,107,0,${.32 * ease(u / .5)})`); gl.addColorStop(1, 'rgba(255,107,0,0)');
  O.fillStyle = gl; O.fillRect(0, bc - 520, W, 1040);
  O.save(); O.beginPath(); O.rect(0, bc - sh / 2, W, sh); O.clip();
  O.drawImage(img('logo'), LX, LY, LS, LS);
  O.restore();
  // slit edges (scanner lights)
  const ea = clamp(u / .1);
  O.save(); O.shadowColor = '#FF6B00'; O.shadowBlur = 24; O.fillStyle = `rgba(255,170,90,${ea})`;
  O.fillRect(0, bc - sh / 2 - 2, W, 4); O.fillRect(0, bc + sh / 2 - 2, W, 4); O.restore();
  // text
  O.save(); O.textBaseline = 'alphabetic';
  O.font = '900 168px Poppins'; O.fillStyle = '#fff';
  const k1 = clamp((u - .35) / .45); if (k1 > 0) spaced(O, decode('BIENTÔT', k1, 300), 540, 1225, 6);
  O.font = '700 38px Inter'; O.fillStyle = '#FF6B00';
  const k2 = clamp((u - .7) / .5); if (k2 > 0) spaced(O, decode('AU BÉNIN · COMING SOON', k2, 400), 540, 1315, 16);
  O.restore();
}

/* ---------- background, grain, scanlines, vignette ---------- */
const grains = [0, 1, 2, 3].map(s => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), d = g.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) { const v = rnd(i * .37 + s * 1000, s) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); return c; });
const scan = (() => { const c = document.createElement('canvas'); c.width = 4; c.height = 4; const g = c.getContext('2d'); g.fillStyle = 'rgba(0,0,0,.28)'; g.fillRect(0, 0, 4, 1); return c; })();
function background(t) {
  O.fillStyle = '#07070a'; O.fillRect(0, 0, W, H);
  // faint orange grid
  O.save(); O.strokeStyle = 'rgba(255,107,0,.05)'; O.lineWidth = 1;
  for (let x = 0; x <= W; x += 90) { O.beginPath(); O.moveTo(x + .5, 0); O.lineTo(x + .5, H); O.stroke(); }
  for (let y = 0; y <= H; y += 90) { O.beginPath(); O.moveTo(0, y + .5); O.lineTo(W, y + .5); O.stroke(); }
  O.restore();
}
function post(t, fi) {
  const g = glitchAt(t);
  X.globalCompositeOperation = 'source-over';
  X.drawImage(off, 0, 0);
  if (g > .02) {
    // horizontal slice displacement
    const n = 6 + Math.floor(10 * g);
    for (let k = 0; k < n; k++) {
      const y = Math.floor(rnd(fi, k) * H), h = 8 + Math.floor(rnd(fi, k + 50) * 120 * g), dx = (rnd(fi, k + 99) - .5) * 260 * g;
      X.drawImage(off, 0, y, W, h, dx, y, W, h);
    }
    // RGB split
    const s = Math.round(6 + 26 * g), id = X.getImageData(0, 0, W, H), d = id.data, src = new Uint8ClampedArray(d);
    for (let y = 0; y < H; y++) { const row = y * W * 4;
      for (let x = 0; x < W; x++) { const i = row + x * 4; const xr = Math.min(W - 1, x + s), xb = Math.max(0, x - s);
        d[i] = src[row + xr * 4]; d[i + 2] = src[row + xb * 4 + 2]; } }
    X.putImageData(id, 0, 0);
    // a few blocks of colour noise
    for (let k = 0; k < 3 * g; k++) { X.fillStyle = rnd(fi, k + 7) > .5 ? 'rgba(255,107,0,.5)' : 'rgba(255,255,255,.25)';
      X.fillRect(rnd(fi, k + 200) * W, rnd(fi, k + 300) * H, 60 + rnd(fi, k + 400) * 400 * g, 6 + rnd(fi, k + 500) * 40); }
  }
  // grain
  X.save(); X.globalAlpha = .07; X.globalCompositeOperation = 'screen';
  const gc = grains[fi % 4], ox = Math.floor(rnd(fi, 1) * 256), oy = Math.floor(rnd(fi, 2) * 256);
  for (let y = -oy; y < H; y += 256) for (let x = -ox; x < W; x += 256) X.drawImage(gc, x, y);
  X.restore();
  // scanlines
  X.save(); X.fillStyle = X.createPattern(scan, 'repeat'); X.globalAlpha = .55; X.fillRect(0, 0, W, H); X.restore();
  // vignette
  const v = X.createRadialGradient(540, 900, 420, 540, 900, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.75)');
  X.fillStyle = v; X.fillRect(0, 0, W, H);
}

/* ---------- CRT power-on at the start ---------- */
function intro(t) {
  if (t < .18 || t > .5) return;
  const u = (t - .18) / .32, w = W * ease(u * 1.6), h = 3 + 40 * Math.max(0, u - .7) / .3;
  O.save(); O.shadowColor = '#FF6B00'; O.shadowBlur = 40; O.fillStyle = `rgba(255,190,120,${1 - .5 * u})`;
  O.fillRect(540 - w / 2, 880 - h / 2, w, h); O.restore();
}

window.renderAt = t => {
  const fi = Math.round(t * FPS);
  background(t);
  intro(t);
  if (t >= NUMS[0].t && t < T_MAP) {
    let i = NUMS.length - 1; while (NUMS[i].t > t) i--;
    const n = NUMS[i], u = t - n.t;
    numeral(n, u); cityLabel(n, u, i);
  }
  if (t >= T_MAP && t < T_LOGO) benin(t, ease((t - T_TXT + .1) / .45));
  if (t >= T_TXT && t < T_LOGO) tagline(t);
  if (t >= T_LOGO) endCard(t);
  post(t, fi);
};
window.waitFrame = () => Promise.all(['cd5', 'cd4', 'cd3', 'cd2', 'cd1', 'logo'].map(i => img(i).decode().catch(() => 0)));
window.ready = (async () => {
  await document.fonts.load(NUM_FONT); await document.fonts.load('800 104px Poppins'); await document.fonts.load('700 62px Inter');
  await document.fonts.load('600 30px Inter'); await document.fonts.load('500 20px Inter'); await document.fonts.load('900 168px Poppins');
  await document.fonts.ready;
  await window.waitFrame();
  window.renderAt(0);
  return true;
})();
if (location.search.includes('play')) {
  const a = document.getElementById('aud'); let t0 = null;
  const fit = () => { const s = Math.min(innerWidth / W, innerHeight / H); cv.style.transform = `scale(${s})`; cv.style.transformOrigin = '0 0'; };
  fit(); addEventListener('resize', fit);
  const loop = () => { const t = a && !a.paused ? a.currentTime : (t0 === null ? 0 : (performance.now() - t0) / 1000); window.renderAt(t % DUR); requestAnimationFrame(loop); };
  document.addEventListener('click', () => { a.currentTime = 0; a.play().catch(() => { t0 = performance.now(); }); });
  window.ready.then(loop);
}
