/* ============================================================
   OJA — « Le moteur a lâché » (idée 8 du kit), 9:16, 15 s, voice: Isac (assets/pan/voix_panne.mp3, from 0.5 s).
   The OJA car breaks down in the middle of a ride (hazard lights, smoke), OJA sends another driver,
   the total price does not change (no amount shown), logo.
   ============================================================ */
const CX = 540, CY = 960, VO = 0.5;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const IMG = { car: imgL('assets/car.png'), driver: imgL('assets/driver.png') };
// voice timings (seconds in the voice file), injected by pan_build.py from assets/pan/voix_panne.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 15.0;
const head = (id, html, top = 210, size = 92) => `<div id="${id}" class="abs hd" style="left:50px;right:50px;top:${top}px;text-align:center;font:800 ${size}px Poppins;letter-spacing:-.025em;line-height:1.08;visibility:hidden">${html}</div>`;
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1430px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const CANV = id => `<canvas id="${id}" class="lay" width="1080" height="1920"></canvas>`;
const ticket = (id, label, y) => `<div id="${id}" class="abs" style="left:150px;top:${y}px;width:780px;height:250px;border-radius:40px;background:#fff;color:#111;padding:40px 46px;box-shadow:0 40px 80px rgba(0,0,0,.45);visibility:hidden">
<div style="display:flex;align-items:center;gap:16px;font:800 30px Inter;letter-spacing:.12em;color:#666">${ic('lock', 34, '#666', 2.4)}${label}</div>
<div style="display:flex;gap:16px;margin-top:40px">${[260, 150, 110].map(w => `<div style="width:${w}px;height:52px;border-radius:26px;background:#ECEDEF"></div>`).join('')}</div></div>`;
H += `<div id="bg" class="lay" style="background:radial-gradient(ellipse 80% 55% at 50% 46%,#6a3110 0%,#33170a 38%,#120905 70%,#050302 100%)"></div>
<div id="glow" class="abs" style="left:-260px;top:300px;width:1600px;height:1500px;background:radial-gradient(circle,rgba(255,107,0,.4),rgba(255,107,0,0) 58%)"></div>
${CANV('rd')}
<div id="s3" class="lay">${ticket('tk0', 'PRIX AU DÉPART', 600)}
<div id="teq" class="abs" style="left:0;right:0;top:860px;text-align:center;font:900 150px Poppins;color:#FF6B00;line-height:1;visibility:hidden">=</div>
${ticket('tk1', 'PRIX À L\'ARRIVÉE', 1020)}
<div id="stamp" class="abs" style="left:520px;top:1140px;padding:18px 34px;border-radius:24px;border:7px solid #12B76A;color:#12B76A;background:rgba(231,246,239,.92);font:900 58px Poppins;letter-spacing:.04em;display:flex;align-items:center;gap:14px;visibility:hidden">${ic('check', 54, '#12B76A', 3.4)}INCHANGÉ</div></div>
${CANV('fx')}
${head('h0', 'En pleine course…', 200, 96)}${head('h1', '<span style="color:#FF6B00">le moteur lâche.</span>', 320, 96)}
${head('h2', 'Pas de panique.', 200, 104)}${head('h3', 'Un autre chauffeur OJA<br><span style="color:#FF6B00">finit le trajet.</span>', 200, 82)}
${head('h4', 'Ton prix total<br><span style="color:#FF6B00">ne change pas.</span>', 230, 92)}${head('h5', 'Pas un franc<br><span style="color:#12B76A">de plus.</span>', 230, 92)}
<div id="sEnd" class="lay">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:360px;top:420px;width:360px;height:360px;filter:drop-shadow(0 0 50px rgba(255,107,0,.55))">
<div id="eword" class="abs" style="left:0;right:0;top:830px;text-align:center;font:900 150px Poppins;letter-spacing:-.03em;line-height:1">OJA</div>
<div id="eslo" class="abs" style="left:0;right:0;top:1040px;text-align:center;font:800 76px Poppins;letter-spacing:-.02em">Ton trajet <span style="color:#FF6B00">continue.</span></div>
<div id="ecta" class="abs" style="left:0;right:0;top:1320px;text-align:center;font:600 42px Inter;color:#E8E2DC">Télécharge OJA</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}
<div id="emen" class="abs" style="left:60px;right:60px;top:1620px;text-align:center;font:500 26px Inter;color:#A39C96;line-height:1.35">En cas de panne, OJA envoie un chauffeur de remplacement. Le prix total de ta course ne change pas.</div></div>
<div id="flash" class="lay" style="background:radial-gradient(circle at 50% 50%,#fff3e0,rgba(255,140,40,.85) 40%,rgba(255,107,0,0) 75%);opacity:0;z-index:40"></div>
<canvas id="grain" width="1280" height="2120"></canvas><div id="vig"></div><div id="fade"></div>`;
stage.innerHTML = H;
(() => { const g = el('grain').getContext('2d'), d = g.createImageData(1280, 2120), r = rng(5);
  for (let i = 0; i < d.data.length; i += 4) { const v = r() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); })();

/* ---------- light ribbon ---------- */
const ORG = '255,107,0';
const RBP = [[7, .045, '255,107,0'], [3.4, .12, '255,120,20'], [1.7, .42, '255,168,64'], [.62, .95, '255,242,220']];
function ribbon(c, pts, w, chunk = 5) {
  c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'butt'; c.lineJoin = 'round';
  for (const [m, al, col] of RBP) for (let i = 0; i < pts.length - 1; i += chunk) {
    const j = Math.min(pts.length - 1, i + chunk); let a = 0;
    for (let k = i; k <= j; k++) a += pts[k][2];
    a = a / (j - i + 1) * al; if (a < .003) continue;
    c.lineWidth = w * m; c.strokeStyle = `rgba(${col},${a})`; c.beginPath(); c.moveTo(pts[i][0], pts[i][1]);
    for (let k = i + 1; k <= j; k++) c.lineTo(pts[k][0], pts[k][1]);
    c.stroke();
  }
  c.restore();
}
function flare(c, x, y, r, a) {
  if (a <= .002) return;
  c.save(); c.globalCompositeOperation = 'lighter';
  const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(255,248,235,${a})`); g.addColorStop(.18, `rgba(255,190,110,${a * .7})`); g.addColorStop(.5, `rgba(${ORG},${a * .22})`); g.addColorStop(1, `rgba(${ORG},0)`);
  c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); c.restore();
}

/* ---------- helpers ---------- */
function phoneT(o) {
  el('ph').style.transform = `translate3d(${o.x || 0}px,${o.y || 0}px,0) rotateX(${o.rx || 0}deg) rotateY(${o.ry || 0}deg) scale3d(${o.s},${o.s},${o.s})`;
  const g = o.g || 0;
  el('ph').style.boxShadow = `0 0 0 2px #0c0c0e inset,0 0 0 ${2 + 2 * g}px rgba(255,150,60,${.9 * g}),0 0 ${70 * g}px rgba(255,107,0,${.6 * g}),0 80px 140px rgba(0,0,0,.5)`;
}
const pose = (s, cy, fy) => ({ s, y: (cy - CY) + (450 - fy) * s });
function hd(id, t, a, b) {
  const p = P(t, a, .4, E.oQ), q = P(t, b - .28, .28, E.iC), e = el(id);
  e.style.opacity = p * (1 - q); e.style.transform = `translateY(${(1 - p) * 40 - q * 20}px)`; e.style.filter = `blur(${(1 - p) * 14 + q * 10}px)`;
  e.style.visibility = t >= a && t < b ? 'visible' : 'hidden';
}
function tapAt(id, t, a, x, y) { const q = (t - a) / .45; if (q > 0 && q < 1) { el(id).style.transform = `translate(${x}px,${y}px) scale(${.5 + q * 1.3})`; O(id, 1 - q); } else O(id, 0); }

/* ---------- the road: breakdown, then the replacement driver ---------- */
const BASE = 1440;                                   // road line under the wheels
const spd = t => 2600 * (1 - P(t, V('lache') - .1, .7, E.oQ)) + 900 * P(t, V('autre') - .3, .5, E.oQ) * (1 - P(t, V('fin') + .2, .5, E.oQ));
function travel(t) { let x = 0; for (let u = 0; u < t; u += 1 / 48) x += spd(u) / 48; return x; }   // deterministic distance
function drawCar(c, x, w, alpha = 1, dim = 0) {
  const h = w * 301 / 823; c.save(); c.globalAlpha = alpha; c.drawImage(IMG.car, x - w / 2, BASE - h, w, h);
  if (dim > 0) { c.globalCompositeOperation = 'source-atop'; c.fillStyle = `rgba(10,8,8,${dim})`; c.fillRect(x - w / 2, BASE - h, w, h); }
  c.restore(); return h;
}
function hazard(c, x, w, t) {                       // orange blinking lights, front and rear
  const on = Math.floor((t - V('lache')) * 3) % 2 === 0 ? 1 : 0, h = w * 301 / 823;
  for (const [fx, fy] of [[-0.40, -0.47], [0.47, -0.62]]) flare(c, x + fx * w, BASE + fy * h, 170 * w / 820, .95 * on);
}
function smoke(c, x, w, t) {                        // soft grey puffs rising from the bonnet
  const t0 = V('lache'), h = w * 301 / 823, r = rng(9);
  for (let i = 0; i < 26; i++) {
    const b = t0 + r() * 2.4, age = t - b, life = 1.4 + r() * .8; if (age < 0 || age > life) { r(); r(); continue; }
    const q = age / life, px = x - .3 * w + (r() - .5) * 70 + q * 40, py = BASE - .62 * h - q * 300, rad = 40 + q * 140;
    const g = c.createRadialGradient(px, py, 0, px, py, rad); g.addColorStop(0, `rgba(210,205,200,${.5 * (1 - q)})`); g.addColorStop(1, 'rgba(200,195,190,0)');
    c.fillStyle = g; c.fillRect(px - rad, py - rad, rad * 2, rad * 2);
  }
}
function sceneRoad(t) {
  const c = el('rd').getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0a0706'); g.addColorStop(.5, '#1c100a'); g.addColorStop(1, '#080605'); c.fillStyle = g; c.fillRect(0, 0, 1080, 1920);
  const d = travel(t);
  c.save(); c.globalCompositeOperation = 'lighter'; const r = rng(31);
  for (let k = 0; k < 46; k++) { const x0 = r() * 1700, y = 300 + r() * 1200, rad = 10 + r() * 60, col = r() < .6 ? '255,150,60' : '255,230,200', a = .25 + r() * .6, sp = .5 + r();
    const xx = ((x0 + d * sp * .6) % 1700) - 300, gr = c.createRadialGradient(xx, y, 0, xx, y, rad);
    gr.addColorStop(0, `rgba(${col},${a * .5})`); gr.addColorStop(.7, `rgba(${col},${a * .25})`); gr.addColorStop(1, `rgba(${col},0)`); c.fillStyle = gr; c.fillRect(xx - rad, y - rad, rad * 2, rad * 2); }
  const rg = c.createLinearGradient(0, BASE - 20, 0, 1920); rg.addColorStop(0, 'rgba(255,120,40,.13)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = rg; c.fillRect(0, BASE - 20, 1080, 1920 - BASE);
  const r2 = rng(77);
  for (let k = 0; k < 26; k++) { const y = BASE + 10 + r2() * 560, x = ((r2() * 2000 + d * 1.6) % 2200) - 600, l = 160 + r2() * 380 * clamp(spd(t) / 2600, .15, 1); c.strokeStyle = `rgba(255,${150 + r2() * 90},90,${.12 + r2() * .2})`; c.lineWidth = 2 + r2() * 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + l, y); c.stroke(); }
  c.restore();
  // broken car: drives in, stops on « lâche », shakes, then moves aside when the other driver comes
  const side = P(t, V('panique') - .1, .7, E.ioC);
  const x1 = KF(t, [[0, 1300], [V('lache') + .2, 540]], E.oQ) - side * 280, w1 = lerp(1000, 680, side);
  const shake = t > V('lache') && t < V('lache') + .5 ? Math.sin(t * 90) * 7 * (1 - (t - V('lache')) / .5) : 0;
  c.save(); c.translate(shake, 0); drawCar(c, x1, w1, 1, .35 * side);
  if (t > V('lache')) { smoke(c, x1, w1, t); hazard(c, x1, w1, t); }
  c.restore();
  // replacement: a second OJA car arrives on the right, its driver steps out
  const k2 = P(t, V('autre') - .3, .9, E.oQ);
  if (k2 > 0) {
    const x2 = lerp(1550, 820, k2), w2 = 680; drawCar(c, x2, w2);
    if (k2 < 1) { const tr = []; for (let i = 0; i <= 40; i++) tr.push([x2 + 300 + i * 20, BASE - 120, Math.pow(1 - i / 40, 1.5) * (1 - k2)]); ribbon(c, tr, 8); }
    const dp = P(t, V('fin') - .1, .5, E.oB), dh = 640, dw = dh * 298 / 987;
    if (dp > 0) { c.save(); c.globalAlpha = clamp(dp * 1.5); c.drawImage(IMG.driver, 560 - dw / 2, BASE + 30 - dh * lerp(.85, 1, dp), dw, dh * lerp(.85, 1, dp)); c.restore(); }
  }
}
function sceneTickets(t) {
  [['tk0', V('prix') - .05], ['teq', V('prix') + .35], ['tk1', V('prix') + .6]].forEach(([id, a]) => { const p = P(t, a, .5, E.oB), e = el(id);
    e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.opacity = clamp(p * 1.5); e.style.transform = `translateY(${(1 - p) * 80}px) scale(${lerp(.8, 1, p)})`; });
  const sp = P(t, V('franc') - .1, .35, E.oB), e = el('stamp');
  e.style.visibility = t >= V('franc') - .1 ? 'visible' : 'hidden'; e.style.transform = `rotate(${lerp(-25, -8, sp)}deg) scale(${lerp(2.2, 1, sp)})`; e.style.opacity = clamp(sp * 2);
}
function sceneEnd(t, cf) {
  const h = P(t, V('endA') - .25, .55, E.ioC), sm = u => [lerp(330, 750, u), 1000 + Math.sin(u * Math.PI) * 44 - u * 10];
  const pts = []; for (let i = 0; i <= 100; i++) { const u = h * i / 100, q = sm(u); pts.push([q[0], q[1], Math.pow(i / 100, .5)]); }
  ribbon(cf, pts, 8);
  if (h > .97) { const e = sm(1); ribbon(cf, [[e[0] - 40, e[1] - 26, 1], [e[0], e[1], 1], [e[0] - 35, e[1] + 26, 1]], 8, 1); }
  if (h < 1) { const q = sm(h); flare(cf, q[0], q[1], 150, 1); }
  const lp = P(t, V('endA') - .3, .55, E.oB);
  el('elogo').style.transform = `scale(${lerp(.55, 1, lp)})`; el('elogo').style.opacity = clamp(lp * 1.5); el('elogo').style.filter = `drop-shadow(0 0 50px rgba(255,107,0,.55)) blur(${(1 - clamp(lp)) * 14}px)`;
  el('eword').style.clipPath = `inset(-20% ${100 - P(t, V('endA') - .15, .5, E.oQ) * 100}% -20% 0)`;
  const sp = P(t, V('endB'), .5, E.oQ); el('eslo').style.opacity = sp; el('eslo').style.transform = `translateY(${(1 - sp) * 30}px)`;
  const cp = P(t, V('endB') + 1.6, .5, E.oQ); el('ecta').style.opacity = cp; el('ecta').style.transform = `translateY(${(1 - cp) * 30}px)`;
  for (let i = 0; i < 2; i++) { const p = P(t, V('endB') + 1.8 + i * .12, .5, E.oB); el('est' + i).style.opacity = clamp(p); el('est' + i).style.transform = `translateY(${(1 - p) * 60}px)`; }
  O('emen', P(t, V('endB') + 2.1, .5));
}

/* ---------- master ---------- */
const SPANS = () => ({ rd: [0, V('prix') - .1], s3: [V('prix') - .1, V('endA') - .25], sEnd: [V('endA') - .3, DUR2] });
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'); cf.clearRect(0, 0, 1080, 1920);
  const sp = SPANS();
  for (const k in sp) el(k).style.display = t >= sp[k][0] && t < sp[k][1] ? 'block' : 'none';
  el('glow').style.opacity = .55 + .25 * Math.sin(t * 1.1);
  if (el('rd').style.display === 'block') sceneRoad(t);
  if (el('s3').style.display === 'block') sceneTickets(t);
  if (el('sEnd').style.display === 'block') sceneEnd(t, cf);
  hd('h0', t, V('course') - .1, V('panique') - .1); hd('h1', t, V('lache') - .05, V('panique') - .1);
  hd('h2', t, V('panique') - .05, V('autre') - .15); hd('h3', t, V('autre') - .1, V('prix') - .1);
  hd('h4', t, V('prix') - .05, V('franc') - .1); hd('h5', t, V('franc') - .05, V('endA') - .25);
  let fl = 0;
  for (const [a, d, m] of [[V('prix') - .25, .3, .4], [V('endA') - .35, .3, .35]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .25, E.lin), P(t, DUR2 - .45, .45, E.lin)));
  const R = rng(Math.floor(t * 24) + 1); el('grain').style.transform = `translate(${-R() * 100}px,${-R() * 100}px)`;
};
