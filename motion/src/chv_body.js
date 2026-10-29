/* ============================================================
   OJA chauffeurs — « Arrête de tourner à vide » (idées 26–29 du kit, sans montant), 9:16, 25 s, voice: Isac
   (assets/chv/voix_chauffeur_vide.mp3, from 0.5 s).
   Only driver benefits that are live and need no amount: clients find you, price fixed before the ride (no more
   haggling), hot zones show where clients wait, every ride in the statement (amounts blurred), moto/tricycle/car.
   No ristourne, flat rate, relay ride or MoMo payout here (amounts or release still pending).
   ============================================================ */
const CX = 540, CY = 960, VO = 0.5;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const IMG = { moto: imgL('assets/moto.png'), car: imgL('assets/car.png') };
// voice timings (seconds in the voice file), injected by chv_build.py from assets/chv/voix_chauffeur_vide.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 25.0;
const GR = '#12B76A', RD = '#F04438';
const head = (id, html, top = 210, size = 92) => `<div id="${id}" class="abs hd" style="left:50px;right:50px;top:${top}px;text-align:center;font:800 ${size}px Poppins;letter-spacing:-.025em;line-height:1.08;visibility:hidden">${html}</div>`;
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1430px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const CANV = id => `<canvas id="${id}" class="lay" width="1080" height="1920"></canvas>`;
const O_ = s => `<span style="color:#FF6B00">${s}</span>`;
const bubble = (id, txt, x, y, w, bg, tail) => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;padding:26px 34px;border-radius:44px;background:${bg};color:#111;font:800 50px Poppins;line-height:1.1;box-shadow:0 24px 50px rgba(0,0,0,.35);visibility:hidden">${txt}<div class="abs" style="${tail};width:0;height:0;border:22px solid transparent"></div><div id="${id}x" class="abs" style="left:-10px;right:-10px;top:50%;height:12px;margin-top:-6px;border-radius:6px;background:${RD};transform-origin:0 50%;transform:scaleX(0)"></div></div>`;
const CLI = [[230, 640], [850, 700], [200, 1180], [880, 1220]];
const ROWS = [['bike', 'Course · 07 h 42'], ['car', 'Course · 08 h 15'], ['bike', 'Course · 09 h 03'], ['car', 'Course · 10 h 20']];
const VEH = [['assets/moto.png', 'Moto', 30, 340], ['assets/tricycle.png', 'Tricycle', 395, 290], ['assets/car.png', 'Voiture', 690, 370]];
H += `<div id="bg" class="lay" style="background:radial-gradient(ellipse 80% 55% at 50% 46%,#6a3110 0%,#33170a 38%,#120905 70%,#050302 100%)"></div>
<div id="glow" class="abs" style="left:-260px;top:300px;width:1600px;height:1500px;background:radial-gradient(circle,rgba(255,107,0,.4),rgba(255,107,0,0) 58%)"></div>
${CANV('rd')}
<div id="s2" class="lay">
<div id="drv" class="abs" style="left:430px;top:820px;width:220px;height:220px;border-radius:50%;background:#FF6B00;display:grid;place-items:center;box-shadow:0 0 0 14px rgba(255,107,0,.25),0 30px 70px rgba(0,0,0,.5)">${ic('car', 120, '#fff', 2)}</div>
${CLI.map(([x, y], i) => `<div id="cl${i}" class="abs" style="left:${x - 70}px;top:${y - 70}px;width:140px;height:140px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 20px 50px rgba(0,0,0,.4);visibility:hidden">${ic('user', 76, '#111', 2.2)}</div>`).join('')}
${bubble('b0', 'Fais-moi<br>un prix…', 80, 620, 440, '#fff', 'right:-30px;top:40px;border-left-color:#fff')}
${bubble('b1', 'Ah non, c\'est<br>trop peu&nbsp;!', 520, 900, 480, '#FFD21F', 'left:-30px;top:40px;border-right-color:#FFD21F')}
<div id="tk" class="abs" style="left:150px;top:1180px;width:780px;height:250px;border-radius:40px;background:#fff;color:#111;padding:40px 46px;box-shadow:0 40px 80px rgba(0,0,0,.45);visibility:hidden">
<div style="display:flex;align-items:center;gap:16px;font:800 30px Inter;letter-spacing:.1em;color:#666">${ic('lock', 34, '#666', 2.4)}PRIX FIXÉ AVANT LE DÉPART</div>
<div style="display:flex;gap:16px;margin-top:40px">${[260, 150, 110].map(w => `<div style="width:${w}px;height:52px;border-radius:26px;background:#ECEDEF"></div>`).join('')}</div></div></div>
<div id="s4" class="lay"><div id="rel" class="abs" style="left:110px;top:520px;width:860px;border-radius:44px;background:#fff;color:#111;padding:40px 44px;box-shadow:0 40px 80px rgba(0,0,0,.45);visibility:hidden">
<div style="display:flex;align-items:center;justify-content:space-between"><div style="font:800 48px Poppins">Mon relevé</div><div style="font:600 30px Inter;color:#888">Aujourd'hui</div></div>
${ROWS.map(([icn, l], i) => `<div id="rw${i}" style="display:flex;align-items:center;gap:22px;height:118px;border-bottom:2px solid #F0F0F0;border-radius:18px;padding:0 10px;visibility:hidden"><div style="width:72px;height:72px;border-radius:50%;background:#FFF1E6;display:grid;place-items:center">${ic(icn, 40, OR, 2.2)}</div><div style="flex:1;font:700 36px Inter">${l}</div><div style="width:150px;height:44px;border-radius:22px;background:#E7F6EF;filter:blur(1px)"></div></div>`).join('')}
<div id="rtot" style="display:flex;align-items:center;justify-content:space-between;margin-top:26px;visibility:hidden"><div style="font:800 40px Poppins">Total du jour</div><div style="width:220px;height:56px;border-radius:28px;background:#12B76A;opacity:.85;filter:blur(1.5px)"></div></div>
<div style="font:500 24px Inter;color:#999;margin-top:18px">Montants masqués</div></div></div>
<div id="s5" class="lay">${VEH.map(([src, n, x, w], i) => `<div id="vh${i}" class="abs" style="left:${x}px;top:980px;width:${w}px;text-align:center;visibility:hidden"><div style="height:320px;display:flex;align-items:flex-end;justify-content:center"><img src="${src}" style="width:${w}px;filter:drop-shadow(0 30px 30px rgba(0,0,0,.55))"></div><div style="font:800 46px Poppins;margin-top:20px">${n}</div></div>`).join('')}</div>
${CANV('fx')}
${head('h0', `Chauffeur, arrête de<br>${O_('tourner à vide&nbsp;!')}`, 190, 96)}
${head('h1', `Avec OJA, les clients<br>${O_('te trouvent.')}`, 200, 88)}${head('h2', `Le prix est fixé<br>${O_('avant le départ.')}`, 200, 92)}
${head('h3', `Plus de ${O_('bagarre')}<br>pour le prix.`, 200, 100)}
${head('h4', `Les ${O_('zones chaudes')}<br>te montrent les clients.`, 170, 84)}${head('h5', `Moins d'essence<br>${O_('brûlée à chercher.')}`, 170, 92)}
${head('h6', `Tu vois ${O_('tout')}<br>ce que tu gagnes.`, 200, 100)}
${head('h7', `Moto, tricycle<br>${O_('ou voiture&nbsp;?')}`, 220, 100)}${head('h8', `${O_('Inscris-toi')}<br>sur OJA.`, 220, 110)}
<div id="sEnd" class="lay">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:360px;top:420px;width:360px;height:360px;filter:drop-shadow(0 0 50px rgba(255,107,0,.55))">
<div id="eword" class="abs" style="left:0;right:0;top:830px;text-align:center;font:900 150px Poppins;letter-spacing:-.03em;line-height:1">OJA</div>
<div id="eslo" class="abs" style="left:0;right:0;top:1040px;text-align:center;font:800 84px Poppins;letter-spacing:-.02em">On roule ${O_('ensemble&nbsp;!')}</div>
<div id="ecta" class="abs" style="left:0;right:0;top:1320px;text-align:center;font:700 44px Inter;color:#E8E2DC">Deviens chauffeur OJA</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}
<div id="emen" class="abs" style="left:60px;right:60px;top:1620px;text-align:center;font:500 26px Inter;color:#A39C96;line-height:1.35">Zones chaudes : l'appli montre où sont les clients. Prix de la course calculé avant le départ. Montants du relevé masqués.</div></div>
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
function popIn(id, t, a, d = .5, dy = 80, out = 1e9) {
  const p = P(t, a, d, E.oB), q = P(t, out, .3, E.iC), e = el(id);
  e.style.visibility = t >= a && q < 1 ? 'visible' : 'hidden'; e.style.opacity = clamp(p * 1.5) * (1 - q); e.style.transform = `translateY(${(1 - p) * dy}px) scale(${lerp(.8, 1, p) * lerp(1, .9, q)})`;
  return p;
}
function gauge(c, x, y, r, lvl, a) {          // fuel gauge: lvl 1 = full, 0 = empty
  if (a <= 0) return;
  c.save(); c.globalAlpha = a; c.translate(x, y); c.lineCap = 'round';
  c.lineWidth = 26; c.strokeStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.arc(0, 0, r, Math.PI, 2 * Math.PI); c.stroke();
  c.strokeStyle = RD; c.beginPath(); c.arc(0, 0, r, Math.PI, Math.PI * 1.22); c.stroke();
  c.strokeStyle = '#FF6B00'; c.beginPath(); c.arc(0, 0, r, Math.PI * 1.25, Math.PI * (1 + Math.max(.25, lvl))); c.stroke();
  const an = Math.PI * (1 + lvl); c.strokeStyle = '#fff'; c.lineWidth = 10; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(an) * (r - 40), Math.sin(an) * (r - 40)); c.stroke();
  c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, 20, 0, Math.PI * 2); c.fill();
  c.font = '800 48px Poppins'; c.textAlign = 'center'; c.fillStyle = RD; c.fillText('E', -r, 64); c.fillStyle = '#fff'; c.fillText('F', r, 64);
  c.restore();
}

/* ---------- scenes ---------- */
function sceneHook(t) {       // the moto passes again and again, the fuel needle drops
  const c = el('rd').getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0a0706'); g.addColorStop(.5, '#1c100a'); g.addColorStop(1, '#080605'); c.fillStyle = g; c.fillRect(0, 0, 1080, 1920);
  c.save(); c.globalCompositeOperation = 'lighter'; const r2 = rng(77);
  for (let k = 0; k < 26; k++) { const y = 1130 + r2() * 240, x = ((r2() * 2000 + t * 3200) % 2200) - 600, l = 160 + r2() * 380; c.strokeStyle = `rgba(255,${150 + r2() * 90},90,${.12 + r2() * .2})`; c.lineWidth = 2 + r2() * 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + l, y); c.stroke(); }
  c.restore();
  const w = 760, h = w * 690 / 930;
  for (const a of [.15, 1.2]) { const q = (t - a) / 1.0; if (q < 0 || q > 1) continue;
    const x = lerp(1500, -500, E.ioC(q)); const tr = []; for (let i = 0; i <= 40; i++) tr.push([x + 300 + i * 22, 1110 - h * .35, Math.pow(1 - i / 40, 1.5) * .9]); ribbon(c, tr, 9);
    c.drawImage(IMG.moto, x - w / 2, 1130 - h, w, h); }
  gauge(c, 540, 1600, 230, lerp(.62, .1, P(t, .3, V('trouvent') - .6, E.ioC)), clamp(t * 3));
}
function sceneFind(t, cf) {   // clients ping the driver, then haggling crossed out, « Prix fixé »
  const sw = P(t, V('prix') - .25, .4, E.iC);
  const dp = P(t, V('trouvent') - .05, .5, E.oB); el('drv').style.opacity = clamp(dp * 1.5) * (1 - sw); el('drv').style.transform = `scale(${lerp(.5, 1, dp) * (1 + .05 * Math.sin(t * 6))})`;
  CLI.forEach(([x, y], i) => { const a = V('trouvent') + .25 + i * .22, p = P(t, a, .45, E.oB), e = el('cl' + i);
    e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.opacity = clamp(p * 1.5) * (1 - sw); e.style.transform = `scale(${lerp(.3, 1, p)})`;
    if (t >= a + .2 && sw < 1) { const q = ((t - a - .2) % 1.1) / 1.1, px = lerp(x, 540, q), py = lerp(y, 930, q); cf.save(); cf.globalAlpha = (1 - sw); flare(cf, px, py, 70, .8 * Math.sin(Math.PI * q)); cf.restore(); } });
  popIn('b0', t, V('prix') + .05, .45, 60, V('bagarre') + .55); popIn('b1', t, V('prix') + .45, .45, 60, V('bagarre') + .55);
  el('b0x').style.transform = `scaleX(${P(t, V('bagarre') - .05, .3, E.oQ)})`; el('b1x').style.transform = `scaleX(${P(t, V('bagarre') + .1, .3, E.oQ)})`;
  popIn('tk', t, V('bagarre') + .35, .55, 120);
}
function sceneZones(t) {      // dark city map, hot zones pulse, the driver heads to the nearest one
  const c = el('rd').getContext('2d');
  c.fillStyle = '#0d1018'; c.fillRect(0, 0, 1080, 1920);
  const R = rng(19); c.strokeStyle = '#1d2433';
  for (let i = 0; i < 16; i++) { c.lineWidth = 6 + R() * 10; const y = 300 + R() * 1500; c.beginPath(); c.moveTo(-40, y); c.lineTo(1120, y - 260 + (R() - .5) * 80); c.stroke(); }
  for (let i = 0; i < 14; i++) { c.lineWidth = 6 + R() * 10; const x = R() * 1080; c.beginPath(); c.moveTo(x, 260); c.lineTo(x + 380, 1960); c.stroke(); }
  const Z = [[300, 720, 'DANTOKPA'], [760, 900, 'AKPAKPA'], [380, 1250, 'GANHI'], [800, 1420, 'CADJÈHOUN']];
  Z.forEach(([x, y, n], i) => { const p = P(t, V('zones') + .2 + i * .25, .6, E.oQ), pul = 1 + .08 * Math.sin(t * 4 + i);
    if (p <= 0) return;
    c.save(); c.globalCompositeOperation = 'lighter'; const rr = 230 * p * pul, g = c.createRadialGradient(x, y, 0, x, y, rr);
    g.addColorStop(0, 'rgba(255,107,0,.75)'); g.addColorStop(.5, 'rgba(255,107,0,.3)'); g.addColorStop(1, 'rgba(255,107,0,0)'); c.fillStyle = g; c.fillRect(x - rr, y - rr, rr * 2, rr * 2); c.restore();
    const r2 = rng(40 + i); c.fillStyle = '#fff'; for (let k = 0; k < 5; k++) { const a = r2() * 6.28, d = r2() * 90 * p; c.globalAlpha = p; c.beginPath(); c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 9, 0, Math.PI * 2); c.fill(); }
    c.globalAlpha = p; c.font = '800 34px Inter'; c.textAlign = 'center'; c.fillStyle = '#FFD2B0'; c.fillText(n, x, y - 120); c.globalAlpha = 1; });
  // the driver: from the outskirts to Ganhi
  const k = P(t, V('attendent') + .1, 1.6, E.ioC), sx = 140, sy = 1700, ex = 380, ey = 1300;
  const px = lerp(sx, ex, k), py = lerp(sy, ey, k) - Math.sin(Math.PI * k) * 120;
  if (k > 0) { const tr = []; for (let i = 0; i <= 40; i++) { const u = k * (1 - i / 40); tr.push([lerp(sx, ex, u), lerp(sy, ey, u) - Math.sin(Math.PI * u) * 120, Math.pow(1 - i / 40, 1.2)]); } ribbon(c, tr, 7); }
  c.fillStyle = '#FF6B00'; c.strokeStyle = '#fff'; c.lineWidth = 8; c.beginPath(); c.arc(px, py, 50, 0, Math.PI * 2); c.fill(); c.stroke();
  c.drawImage(IMG.car, px - 36, py - 14, 72, 26);
  gauge(c, 540, 1760, 130, lerp(.2, .8, P(t, V('essence'), .8, E.oQ)), P(t, V('essence') - .1, .4));
}
function sceneStatement(t) {  // « Mon relevé », rows course by course (amounts blurred)
  popIn('rel', t, V('gagnes') - .05, .55, 120);
  ROWS.forEach((_, i) => { const a = V('gagnes') + .5 + i * .35, p = P(t, a, .4, E.oB), e = el('rw' + i);
    e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.opacity = clamp(p * 1.5); e.style.transform = `translateX(${(1 - p) * 60}px)`;
    const hl = Math.sin(Math.PI * P(t, V('releve') - 1.4 + i * .3, .45, E.lin)); e.style.background = `rgba(255,107,0,${.12 * hl})`; });
  popIn('rtot', t, V('gagnes') + 2.0, .45, 30);
}
function sceneVehicles(t) {
  [V('vehic') - .05, V('vehic') + .45, V('vehic') + 1.0].forEach((a, i) => popIn('vh' + i, t, a, .55, 140));
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
  const cp = P(t, V('endB') + 1.2, .5, E.oQ); el('ecta').style.opacity = cp; el('ecta').style.transform = `translateY(${(1 - cp) * 30}px)`;
  for (let i = 0; i < 2; i++) { const p = P(t, V('endB') + 1.4 + i * .12, .5, E.oB); el('est' + i).style.opacity = clamp(p); el('est' + i).style.transform = `translateY(${(1 - p) * 60}px)`; }
  O('emen', P(t, V('endB') + 1.7, .5));
}

/* ---------- master ---------- */
const SPANS = () => ({ s2: [V('trouvent') - .1, V('zones') - .1], s4: [V('gagnes') - .1, V('vehic') - .1], s5: [V('vehic') - .1, V('endA') - .2], sEnd: [V('endA') - .3, DUR2] });
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'); cf.clearRect(0, 0, 1080, 1920);
  const sp = SPANS();
  for (const k in sp) el(k).style.display = t >= sp[k][0] && t < sp[k][1] ? 'block' : 'none';
  const road = t < V('trouvent') - .1, zones = t >= V('zones') - .1 && t < V('gagnes') - .1;
  el('rd').style.display = road || zones ? 'block' : 'none';
  el('glow').style.opacity = .55 + .25 * Math.sin(t * 1.1);
  if (road) sceneHook(t);
  if (zones) sceneZones(t);
  if (el('s2').style.display === 'block') sceneFind(t, cf);
  if (el('s4').style.display === 'block') sceneStatement(t);
  if (el('s5').style.display === 'block') sceneVehicles(t);
  if (el('sEnd').style.display === 'block') sceneEnd(t, cf);
  hd('h0', t, V('hook') - .3, V('trouvent') - .1); hd('h1', t, V('trouvent') - .05, V('prix') - .1);
  hd('h2', t, V('prix') - .05, V('bagarre') - .1); hd('h3', t, V('bagarre') - .05, V('zones') - .1);
  hd('h4', t, V('zones') - .05, V('essence') - .1); hd('h5', t, V('essence') - .05, V('gagnes') - .1);
  hd('h6', t, V('gagnes') - .05, V('vehic') - .1); hd('h7', t, V('vehic') - .05, V('inscris') - .1); hd('h8', t, V('inscris') - .05, V('endA') - .25);
  let fl = 0;
  for (const [a, d, m] of [[V('trouvent') - .25, .3, .4], [V('zones') - .25, .3, .3], [V('gagnes') - .25, .3, .3], [V('vehic') - .25, .3, .3], [V('endA') - .35, .3, .35]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .25, E.lin), P(t, DUR2 - .45, .45, E.lin)));
  const R = rng(Math.floor(t * 24) + 1); el('grain').style.transform = `translate(${-R() * 100}px,${-R() * 100}px)`;
};
