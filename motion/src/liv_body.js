/* ============================================================
   OJA — « Livré à ton heure » (idées 19 et 20 du kit, livraison programmée « Livré à… »), 9:16, 23 s,
   voice: Isac (assets/liv/voix_livre.mp3, from 0.5 s).
   A clock goes from 11 h to 12 h 30, the meal and the parcel, the 15-minute slot on a timeline with the OJA rider
   delivering inside it, then a late case: −10 % on the next ride or parcel delivery, automatically, 30 days. Logo.
   ============================================================ */
const CX = 540, CY = 960, VO = 0.5;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const IMG = { moto: imgL('assets/moto.png') };
// voice timings (seconds in the voice file), injected by liv_build.py from assets/liv/voix_livre.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 23.0;
const GR = '#12B76A', RD = '#F04438';
const head = (id, html, top = 210, size = 92) => `<div id="${id}" class="abs hd" style="left:50px;right:50px;top:${top}px;text-align:center;font:800 ${size}px Poppins;letter-spacing:-.025em;line-height:1.08;visibility:hidden">${html}</div>`;
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1430px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const CANV = id => `<canvas id="${id}" class="lay" width="1080" height="1920"></canvas>`;
const O_ = s => `<span style="color:#FF6B00">${s}</span>`, G_ = s => `<span style="color:${GR}">${s}</span>`;
const obj = (id, src, x, label) => `<div id="${id}" class="abs" style="left:${x}px;top:1060px;width:420px;text-align:center;visibility:hidden"><img src="${src}" style="width:400px;filter:drop-shadow(0 40px 40px rgba(0,0,0,.55))"><div style="font:800 52px Poppins;margin-top:6px">${label}</div></div>`;
// timeline: 12 h 00 at x=110 → 13 h 00 at x=970
const TX = m => 110 + m / 60 * 860;
H += `<div id="bg" class="lay" style="background:radial-gradient(ellipse 80% 55% at 50% 46%,#6a3110 0%,#33170a 38%,#120905 70%,#050302 100%)"></div>
<div id="glow" class="abs" style="left:-260px;top:300px;width:1600px;height:1500px;background:radial-gradient(circle,rgba(255,107,0,.4),rgba(255,107,0,0) 58%)"></div>
${CANV('ck')}
<div id="s2" class="lay"><div id="chip" class="abs" style="left:240px;top:640px;width:600px;height:150px;border-radius:75px;background:#fff;color:#111;display:flex;align-items:center;justify-content:center;gap:22px;font:800 64px Poppins;box-shadow:0 30px 70px rgba(0,0,0,.45)">${ic('clock', 70, OR, 2.4)}Livré à 12 h 30</div>
${obj('oplat', 'assets/cs/obj_plat.png', 90, 'Repas')}${obj('ocol', 'assets/cs/obj_colis.png', 570, 'Colis')}</div>
<div id="s3" class="lay">
<div id="win" class="abs" style="left:${TX(30)}px;top:960px;width:${TX(45) - TX(30)}px;height:240px;border-radius:26px;background:rgba(255,107,0,.22);border:4px solid #FF6B00;box-shadow:0 0 60px rgba(255,107,0,.45)"></div>
<div id="winl" class="abs" style="left:${TX(37.5) - 300}px;top:890px;width:600px;text-align:center;font:800 42px Poppins;color:#FF8A2A;white-space:nowrap">Ton créneau · 15 min</div>
<div class="abs" style="left:110px;top:1180px;width:860px;height:12px;border-radius:6px;background:rgba(255,255,255,.18)"></div>
${[0, 15, 30, 45, 60].map(m => `<div class="abs" style="left:${TX(m) - 3}px;top:1170px;width:6px;height:32px;border-radius:3px;background:rgba(255,255,255,.5)"></div>`).join('')}
${[[0, '12 h 00'], [30, '12 h 30'], [60, '13 h 00']].map(([m, s]) => `<div class="abs" style="left:${TX(m) - 100}px;top:1220px;width:200px;text-align:center;font:700 36px Inter;color:#E8E2DC">${s}</div>`).join('')}
<div id="ok" class="abs" style="left:0;top:0;padding:16px 30px;border-radius:30px;background:${GR};color:#fff;font:800 40px Poppins;display:flex;align-items:center;gap:12px;box-shadow:0 20px 50px rgba(0,0,0,.4);visibility:hidden">${ic('check', 40, '#fff', 3.4)}Livré</div>
<div id="late" class="abs" style="left:0;top:0;padding:16px 30px;border-radius:30px;background:${RD};color:#fff;font:800 38px Poppins;box-shadow:0 20px 50px rgba(0,0,0,.4);visibility:hidden">Après le créneau</div>
<div id="cpn" class="abs" style="left:130px;top:1340px;width:820px;height:300px;border-radius:40px;background:#fff;color:#111;padding:36px 46px;box-shadow:0 40px 80px rgba(0,0,0,.45);visibility:hidden">
<div style="display:flex;align-items:center;gap:26px"><div style="font:900 120px Poppins;color:${GR};letter-spacing:-.04em;line-height:1">−10&nbsp;%</div>
<div style="font:700 34px Inter;line-height:1.25">sur ta prochaine course<br>ou livraison de colis</div></div>
<div style="font:600 30px Inter;color:#777;margin-top:26px">Valable 30 jours</div></div>
<div id="stamp" class="abs" style="left:560px;top:1560px;padding:14px 28px;border-radius:22px;border:7px solid ${GR};color:${GR};background:rgba(231,246,239,.94);font:900 50px Poppins;letter-spacing:.04em;visibility:hidden">AUTOMATIQUE</div></div>
${CANV('fx')}
${head('h0', `Tu commandes<br>à ${O_('11 h…')}`, 170, 110)}${head('h1', `…livré à<br>${O_('12 h 30&nbsp;?')}`, 170, 110)}
${head('h2', `Tu programmes<br>ta ${O_('livraison.')}`, 200, 100)}${head('h3', `C'est toi qui<br>${O_('choisis l\'heure.')}`, 200, 100)}
${head('h4', `Un créneau de<br>${O_('15 minutes.')}`, 200, 100)}${head('h5', `Le livreur arrive<br>${O_('après le créneau&nbsp;?')}`, 200, 88)}
${head('h6', `${G_('−10&nbsp;%')} sur ta<br>prochaine course.`, 200, 96)}
<div id="sEnd" class="lay">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:360px;top:420px;width:360px;height:360px;filter:drop-shadow(0 0 50px rgba(255,107,0,.55))">
<div id="eword" class="abs" style="left:0;right:0;top:830px;text-align:center;font:900 150px Poppins;letter-spacing:-.03em;line-height:1">OJA</div>
<div id="eslo" class="abs" style="left:0;right:0;top:1040px;text-align:center;font:800 84px Poppins;letter-spacing:-.02em">Livré à ${O_('ton heure.')}</div>
<div id="ecta" class="abs" style="left:0;right:0;top:1320px;text-align:center;font:600 42px Inter;color:#E8E2DC">Télécharge OJA</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}
<div id="emen" class="abs" style="left:60px;right:60px;top:1610px;text-align:center;font:500 26px Inter;color:#A39C96;line-height:1.35">Livraison programmée (repas et colis) : créneau de 15 min. Si le livreur arrive après le créneau, −10 % automatique sur ta prochaine course ou livraison de colis, valable 30 jours.</div></div>
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
function hd(id, t, a, b) {
  const p = P(t, a, .4, E.oQ), q = P(t, b - .28, .28, E.iC), e = el(id);
  e.style.opacity = p * (1 - q); e.style.transform = `translateY(${(1 - p) * 40 - q * 20}px)`; e.style.filter = `blur(${(1 - p) * 14 + q * 10}px)`;
  e.style.visibility = t >= a && t < b ? 'visible' : 'hidden';
}
function popIn(id, t, a, d = .5, dy = 80, x = 0, y = 0) {
  const p = P(t, a, d, E.oB), e = el(id);
  e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.opacity = clamp(p * 1.5); e.style.transform = `translate(${x}px,${y + (1 - p) * dy}px) scale(${lerp(.8, 1, p)})`;
  return p;
}

/* ---------- scenes ---------- */
function sceneClock(t) {      // 11 h 00 → 12 h 30
  const c = el('ck').getContext('2d'); c.clearRect(0, 0, 1080, 1920);
  const cx = 540, cy = 1000, R = 330, ap = P(t, .1, .6, E.oB);
  const m = 90 * P(t, V('hook') + .5, V('midi') + .5 - V('hook') - .5, E.ioC);
  c.save(); c.translate(cx, cy); c.scale(lerp(.7, 1, ap), lerp(.7, 1, ap)); c.globalAlpha = clamp(ap * 1.5);
  const g = c.createRadialGradient(0, 0, R * .2, 0, 0, R); g.addColorStop(0, '#2a1508'); g.addColorStop(1, '#170b05'); c.fillStyle = g;
  c.beginPath(); c.arc(0, 0, R, 0, Math.PI * 2); c.fill();
  c.lineWidth = 14; c.strokeStyle = '#FF6B00'; c.shadowColor = 'rgba(255,107,0,.8)'; c.shadowBlur = 40; c.stroke(); c.shadowBlur = 0;
  // the elapsed time as an orange sweep
  c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R - 24, -Math.PI / 2, -Math.PI / 2 + m / 60 * Math.PI * 2); c.closePath(); c.fillStyle = 'rgba(255,107,0,.16)'; c.fill();
  for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2, l = i % 5 ? 14 : 34; c.strokeStyle = i % 5 ? 'rgba(255,255,255,.35)' : '#fff'; c.lineWidth = i % 5 ? 3 : 7;
    c.beginPath(); c.moveTo(Math.sin(a) * (R - 40), -Math.cos(a) * (R - 40)); c.lineTo(Math.sin(a) * (R - 40 - l), -Math.cos(a) * (R - 40 - l)); c.stroke(); }
  const hand = (ang, len, w, col) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(-Math.sin(ang) * 30, Math.cos(ang) * 30); c.lineTo(Math.sin(ang) * len, -Math.cos(ang) * len); c.stroke(); };
  hand((11 + m / 60) / 12 * Math.PI * 2, R * .5, 18, '#fff'); hand(m / 60 * Math.PI * 2, R * .74, 10, '#FF8A2A');
  c.fillStyle = '#FF6B00'; c.beginPath(); c.arc(0, 0, 22, 0, Math.PI * 2); c.fill();
  c.restore();
  const hh = 11 + Math.floor(m / 60), mm = Math.floor(m % 60);
  c.save(); c.globalAlpha = clamp(ap * 1.5); c.font = '800 96px Poppins'; c.textAlign = 'center'; c.fillStyle = '#fff';
  c.fillText(`${hh} h ${String(mm).padStart(2, '0')}`, cx, cy + R + 150); c.restore();
}
function sceneProg(t) {       // « Livré à 12 h 30 », big in the middle, then up above the meal and the parcel
  const up = P(t, V('repas') - .35, .5, E.ioC), p = P(t, V('prog') - .05, .55, E.oB), e = el('chip');
  e.style.opacity = clamp(p * 1.5); e.style.transform = `translateY(${(1 - p) * 100 + (1 - up) * 330}px) scale(${lerp(.8, 1, p) * lerp(1.3, 1, up)})`;
  popIn('oplat', t, V('repas') - .05, .55, 140); popIn('ocol', t, V('repas') + .45, .55, 140);
}
function rider(c, x, y, w, t, v) {
  const h = w * 690 / 930;
  if (v > 0) { const tr = []; for (let i = 0; i <= 30; i++) tr.push([x - w * .45 - i * 14, y - h * .35, Math.pow(1 - i / 30, 1.5) * clamp(v)]); ribbon(c, tr, 6); }
  c.drawImage(IMG.moto, x - w / 2, y - h, w, h);
}
function sceneSlot(t, cf) {   // the rider on the timeline: inside the slot, then after it
  const late = t >= V('retard') - .1;
  const a = late ? V('retard') + .1 : V('creneau') + .25, d = late ? 1.3 : 1.1, mEnd = late ? 52 : 38;
  const k = P(t, a, d, E.oQ), m = lerp(-14, mEnd, k), v = 1 - P(t, a + d * .55, d * .45);
  rider(cf, TX(m), 1172, 300, t, k > 0 && k < 1 ? v : 0);
  const okA = V('creneau') + 1.3; el('ok').style.visibility = !late && t >= okA ? 'visible' : 'hidden';
  if (!late) { const p = P(t, okA, .4, E.oB); el('ok').style.transform = `translate(${TX(38) - 90}px,${770 - p * 20}px) scale(${lerp(.5, 1, p)})`; el('ok').style.opacity = clamp(p * 2); }
  const lA = V('retard') + 1.3; el('late').style.visibility = late && t >= lA ? 'visible' : 'hidden';
  if (late) { const p = P(t, lA, .4, E.oB); el('late').style.transform = `translate(${TX(52) - 240}px,${770 - p * 20}px) scale(${lerp(.5, 1, p)})`; el('late').style.opacity = clamp(p * 2); }
  el('win').style.borderColor = late && t >= lA ? 'rgba(255,107,0,.5)' : '#FF6B00';
  popIn('cpn', t, V('dix') - .1, .55, 120);
  const sp = P(t, V('auto') - .1, .35, E.oB), e = el('stamp');
  e.style.visibility = t >= V('auto') - .1 ? 'visible' : 'hidden'; e.style.transform = `rotate(${lerp(-25, -7, sp)}deg) scale(${lerp(2.2, 1, sp)})`; e.style.opacity = clamp(sp * 2);
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
const SPANS = () => ({ ck: [0, V('prog') - .1], s2: [V('prog') - .1, V('creneau') - .1], s3: [V('creneau') - .1, V('endA') - .2], sEnd: [V('endA') - .3, DUR2] });
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'); cf.clearRect(0, 0, 1080, 1920);
  const sp = SPANS();
  for (const k in sp) el(k).style.display = t >= sp[k][0] && t < sp[k][1] ? 'block' : 'none';
  el('glow').style.opacity = .55 + .25 * Math.sin(t * 1.1);
  if (el('ck').style.display === 'block') sceneClock(t);
  if (el('s2').style.display === 'block') sceneProg(t);
  if (el('s3').style.display === 'block') sceneSlot(t, cf);
  if (el('sEnd').style.display === 'block') sceneEnd(t, cf);
  hd('h0', t, V('hook') - .3, V('midi') - .1); hd('h1', t, V('midi') - .05, V('prog') - .1);
  hd('h2', t, V('prog') - .05, V('choisis') - .1); hd('h3', t, V('choisis') - .05, V('creneau') - .1);
  hd('h4', t, V('creneau') - .05, V('retard') - .1); hd('h5', t, V('retard') - .05, V('dix') - .1); hd('h6', t, V('dix') - .05, V('endA') - .25);
  let fl = 0;
  for (const [a, d, m] of [[V('prog') - .25, .3, .4], [V('creneau') - .25, .3, .3], [V('endA') - .35, .3, .35]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .25, E.lin), P(t, DUR2 - .45, .45, E.lin)));
  const R = rng(Math.floor(t * 24) + 1); el('grain').style.transform = `translate(${-R() * 100}px,${-R() * 100}px)`;
};
