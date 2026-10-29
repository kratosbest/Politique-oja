/* ============================================================
   OJA — « Même trajet, 25 % moins cher » (idée 3 du kit, OJA Partage), 9:16, 20 s, voice: Isac (assets/prt/voix_partage.mp3, from 0.5 s).
   Hook on a photo of two friends in the back seat (generated with ElevenLabs, not real people), the two of them
   step into the same OJA car, price bars « Prix normal » vs « OJA Partage » (−25 %, no amount), « CO₂ évité » card, logo.
   ============================================================ */
const CX = 540, CY = 960, VO = 0.5;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const IMG = { car: imgL('assets/car.png'), f: imgL('assets/prt/face_f.png'), m: imgL('assets/prt/face_m.png') };
// voice timings (seconds in the voice file), injected by prt_build.py from assets/prt/voix_partage.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 20.0;
const GR = '#12B76A';
const head = (id, html, top = 210, size = 92) => `<div id="${id}" class="abs hd" style="left:50px;right:50px;top:${top}px;text-align:center;font:800 ${size}px Poppins;letter-spacing:-.025em;line-height:1.08;visibility:hidden;text-shadow:0 6px 30px rgba(0,0,0,.45)">${html}</div>`;
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1430px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const CANV = id => `<canvas id="${id}" class="lay" width="1080" height="1920"></canvas>`;
const bar = (id, label, col, y, fill) => `<div id="${id}" class="abs" style="left:110px;top:${y}px;width:860px;visibility:hidden">
<div style="font:800 44px Poppins;color:${col};margin-bottom:22px">${label}</div>
<div style="position:relative;height:110px;border-radius:55px;background:rgba(255,255,255,.08);overflow:hidden">
<div id="${id}f" class="abs" style="left:0;top:0;bottom:0;width:0;border-radius:55px;background:${fill}"></div></div></div>`;
H += `<div id="bg" class="lay" style="background:radial-gradient(ellipse 80% 55% at 50% 46%,#6a3110 0%,#33170a 38%,#120905 70%,#050302 100%)"></div>
<div id="glow" class="abs" style="left:-260px;top:300px;width:1600px;height:1500px;background:radial-gradient(circle,rgba(255,107,0,.4),rgba(255,107,0,0) 58%)"></div>
<div id="s1" class="lay" style="overflow:hidden"><img id="amis" src="assets/prt/amis.jpg" class="abs" style="left:0;top:0;width:1080px;height:1920px;transform-origin:50% 62%">
<div class="lay" style="background:linear-gradient(rgba(0,0,0,.72),rgba(0,0,0,.25) 28%,rgba(0,0,0,0) 45%,rgba(0,0,0,0) 75%,rgba(0,0,0,.45))"></div>
<div id="chip" class="abs" style="left:290px;top:1600px;width:500px;height:110px;border-radius:55px;background:#fff;color:#111;display:flex;align-items:center;justify-content:center;gap:16px;font:800 44px Poppins;box-shadow:0 24px 60px rgba(0,0,0,.45);visibility:hidden">${ic('pin', 50, OR, 2.4)}Abomey-Calavi</div></div>
${CANV('rd')}
<div id="s3" class="lay">${bar('b0', 'Prix normal', '#E8E2DC', 700, '#8F8A86')}${bar('b1', 'OJA Partage', '#FF6B00', 1000, 'linear-gradient(90deg,#FF8A2A,#FF6B00)')}
<div id="gap" class="abs" style="left:755px;top:1070px;width:215px;height:110px;border-radius:0 55px 55px 0;border:5px dashed rgba(255,255,255,.55);border-left:none;visibility:hidden"></div>
<div id="badge" class="abs" style="left:660px;top:1230px;padding:20px 38px;border-radius:30px;background:${GR};color:#fff;font:900 80px Poppins;box-shadow:0 24px 60px rgba(0,0,0,.45);visibility:hidden">−25&nbsp;%</div></div>
<div id="s4" class="lay"><div id="co2" class="abs" style="left:150px;top:760px;width:780px;height:330px;border-radius:44px;background:#fff;color:#111;padding:44px 48px;box-shadow:0 40px 80px rgba(0,0,0,.45);visibility:hidden">
<div style="display:flex;align-items:center;gap:28px"><div id="leaf" style="width:130px;height:130px;border-radius:50%;background:#E7F6EF;display:grid;place-items:center">${ic('leaf', 74, GR, 2.4)}</div>
<div><div style="font:800 54px Poppins">CO₂ évité</div><div style="display:flex;align-items:center;gap:14px;margin-top:16px"><div style="width:220px;height:46px;border-radius:23px;background:#ECEDEF"></div>
<div id="ok" style="width:52px;height:52px;border-radius:50%;background:${GR};display:grid;place-items:center">${ic('check', 30, '#fff', 3.4)}</div></div></div></div>
<div style="font:600 28px Inter;color:#777;margin-top:34px">Affiché pour chaque trajet partagé</div></div></div>
${CANV('fx')}
${head('h0', 'Même trajet,<br><span style="color:#FF6B00">25&nbsp;% moins cher.</span>', 170, 104)}
${head('h1', 'Toi et ton ami,<br>vous allez <span style="color:#FF6B00">à Calavi&nbsp;?</span>', 170, 96)}
${head('h2', 'Avec<br><span style="color:#FF6B00">OJA Partage…</span>', 200, 110)}${head('h3', 'Vous montez dans<br><span style="color:#FF6B00">la même voiture.</span>', 200, 92)}
${head('h4', '<span style="color:#FF6B00">25&nbsp;% moins cher</span><br>que le prix normal.', 200, 92)}
${head('h5', 'Et le <span style="color:#12B76A">CO₂ évité</span><br>s\'affiche.', 220, 96)}
<div id="sEnd" class="lay">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:360px;top:400px;width:360px;height:360px;filter:drop-shadow(0 0 50px rgba(255,107,0,.55))">
<div id="eword" class="abs" style="left:0;right:0;top:810px;text-align:center;font:900 132px Poppins;letter-spacing:-.03em;line-height:1">OJA <span style="color:#FF6B00">Partage</span></div>
<div id="eslo" class="abs" style="left:0;right:0;top:1040px;text-align:center;font:800 84px Poppins;letter-spacing:-.02em">Moins cher <span style="color:#FF6B00">à deux.</span></div>
<div id="ecta" class="abs" style="left:0;right:0;top:1320px;text-align:center;font:600 42px Inter;color:#E8E2DC">Télécharge OJA</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}
<div id="emen" class="abs" style="left:60px;right:60px;top:1620px;text-align:center;font:500 26px Inter;color:#A39C96;line-height:1.35">OJA Partage : trajet partagé en voiture, prix 25 % moins cher que le prix normal du même trajet. Personnes de l'image générées par IA.</div></div>
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
function popIn(id, t, a, d = .5, dy = 80) {
  const p = P(t, a, d, E.oB), e = el(id);
  e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.opacity = clamp(p * 1.5); e.style.transform = `translateY(${(1 - p) * dy}px) scale(${lerp(.8, 1, p)})`;
  return p;
}

/* ---------- scenes ---------- */
function scene1(t) {          // the two friends, slow push-in; « Abomey-Calavi » on « Calavi »
  el('amis').style.transform = `scale(${lerp(1.0, 1.1, clamp(t / (V('avec') - .1)))})`;
  popIn('chip', t, V('calavi') - .1, .5, 60);
}
const BASE = 1420;
function avatar(c, img, x, y, r, a, label) {
  if (a <= 0 || r <= 1) return;
  c.save(); c.globalAlpha = a;
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 40; c.shadowOffsetY = 18;
  c.beginPath(); c.arc(x, y, r + 8, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill(); c.shadowColor = 'transparent';
  c.drawImage(img, x - r, y - r, r * 2, r * 2);
  if (label && r > 60) { c.font = '800 40px Poppins'; c.textAlign = 'center'; c.fillStyle = '#fff'; c.fillText(label, x, y + r + 66); }
  c.restore();
}
function sceneRoad(t) {       // the OJA car stops, both friends step in, the car leaves together
  const c = el('rd').getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0a0706'); g.addColorStop(.5, '#1c100a'); g.addColorStop(1, '#080605'); c.fillStyle = g; c.fillRect(0, 0, 1080, 1920);
  const t0 = V('avec') - .1, go = P(t, V('voit') + .45, .9, E.iC);
  c.save(); c.globalCompositeOperation = 'lighter'; const r = rng(31);
  for (let k = 0; k < 46; k++) { const x0 = r() * 1700, y = 300 + r() * 1100, rad = 10 + r() * 60, col = r() < .6 ? '255,150,60' : '255,230,200', a = .25 + r() * .6, sp = .5 + r();
    const xx = ((x0 + (t - t0) * 300 * sp + go * 900 * sp) % 1700) - 300, gr = c.createRadialGradient(xx, y, 0, xx, y, rad);
    gr.addColorStop(0, `rgba(${col},${a * .5})`); gr.addColorStop(.7, `rgba(${col},${a * .25})`); gr.addColorStop(1, `rgba(${col},0)`); c.fillStyle = gr; c.fillRect(xx - rad, y - rad, rad * 2, rad * 2); }
  const rg = c.createLinearGradient(0, BASE - 20, 0, 1920); rg.addColorStop(0, 'rgba(255,120,40,.13)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = rg; c.fillRect(0, BASE - 20, 1080, 1920 - BASE);
  c.restore();
  const w = 860, h = w * 301 / 823;
  const x = KF(t, [[t0, 1500], [t0 + .7, 560], [V('voit') + .45, 560], [V('voit') + 1.35, -700]], E.ioC);
  if (x > 540 && t < t0 + .8) { const tr = []; for (let i = 0; i <= 40; i++) tr.push([x + 380 + i * 20, BASE - 110, Math.pow(1 - i / 40, 1.5) * .9]); ribbon(c, tr, 8); }
  if (go > 0) { const tr = []; for (let i = 0; i <= 40; i++) tr.push([x + 380 + i * 24, BASE - 110, Math.pow(1 - i / 40, 1.5) * .9 * Math.sin(Math.PI * go)]); ribbon(c, tr, 9); }
  const bump = Math.sin(Math.PI * P(t, V('montez') + .5, .3, E.lin)) * 10 + Math.sin(Math.PI * P(t, V('montez') + .62, .3, E.lin)) * 8;
  c.drawImage(IMG.car, x - w / 2, BASE - h + bump, w, h);
  // the two friends wait on the kerb, then hop into the car's rear window
  const hop = P(t, V('montez') - .05, .75, E.lin), win = [x + 20, BASE - h * .62];
  [[IMG.f, 300, 'Toi', 0], [IMG.m, 780, 'Ton ami', .12]].forEach(([img, ax, lab, dl]) => {
    const p = P(t, V('avec') + .15 + dl, .5, E.oB), q = P(t, V('montez') - .05 + dl, .6, E.ioC);
    const ay = 760, px = lerp(ax, win[0], q), py = lerp(ay, win[1], q) - Math.sin(Math.PI * q) * 220;
    avatar(c, img, px, py, lerp(150, 24, q) * lerp(.4, 1, p), clamp(p * 1.5) * (1 - clamp((q - .82) / .18)), q < .2 ? lab : '');
  });
  if (hop > 0 && hop < 1) flare(c, win[0], win[1], 160, Math.sin(Math.PI * hop) * .6);
}
function sceneBars(t) {       // « Prix normal » full, « OJA Partage » three quarters of it, « −25 % »
  popIn('b0', t, V('prix') - .05, .5); popIn('b1', t, V('prix') + .25, .5);
  el('b0f').style.width = `${P(t, V('prix') + .15, .7, E.oQ) * 100}%`;
  el('b1f').style.width = `${P(t, V('prix') + .55, .9, E.oQ) * 75}%`;
  const gp = P(t, V('prix') + 1.4, .4); el('gap').style.visibility = gp > 0 ? 'visible' : 'hidden'; el('gap').style.opacity = gp;
  const sp = P(t, V('normal') - .25, .35, E.oB), e = el('badge');
  e.style.visibility = t >= V('normal') - .25 ? 'visible' : 'hidden'; e.style.transform = `rotate(${lerp(-25, -6, sp)}deg) scale(${lerp(2.2, 1, sp)})`; e.style.opacity = clamp(sp * 2);
}
function sceneCO2(t, cf) {    // the « CO₂ évité » card, leaves drifting up
  popIn('co2', t, V('co2') - .15, .5);
  el('leaf').style.transform = `rotate(${Math.sin(t * 2) * 8}deg) scale(${1 + .12 * Math.sin(Math.PI * P(t, V('evite'), .5, E.lin))})`;
  el('ok').style.transform = `scale(${P(t, V('evite') + .2, .35, E.oB)})`;
  const r = rng(12), t0 = V('co2');
  for (let i = 0; i < 22; i++) {
    const b = t0 + r() * 2.4, age = t - b, life = 1.6 + r() * .8, x0 = 120 + r() * 840, sz = 16 + r() * 22, rot = r() * 6; if (age < 0 || age > life) continue;
    const q = age / life, x = x0 + Math.sin(q * 6 + rot) * 40, y = 1300 - q * 700;
    cf.save(); cf.translate(x, y); cf.rotate(rot + q * 3); cf.globalAlpha = Math.sin(Math.PI * q) * .85; cf.fillStyle = i % 3 ? '#2BD48A' : '#12B76A';
    cf.beginPath(); cf.ellipse(0, 0, sz, sz * .45, 0, 0, Math.PI * 2); cf.fill(); cf.restore();
  }
}
function sceneEnd(t, cf) {
  const h = P(t, V('endA') - .25, .55, E.ioC), sm = u => [lerp(250, 830, u), 980 + Math.sin(u * Math.PI) * 44 - u * 10];
  const pts = []; for (let i = 0; i <= 100; i++) { const u = h * i / 100, q = sm(u); pts.push([q[0], q[1], Math.pow(i / 100, .5)]); }
  ribbon(cf, pts, 8);
  if (h > .97) { const e = sm(1); ribbon(cf, [[e[0] - 40, e[1] - 26, 1], [e[0], e[1], 1], [e[0] - 35, e[1] + 26, 1]], 8, 1); }
  if (h < 1) { const q = sm(h); flare(cf, q[0], q[1], 150, 1); }
  const lp = P(t, V('endA') - .3, .55, E.oB);
  el('elogo').style.transform = `scale(${lerp(.55, 1, lp)})`; el('elogo').style.opacity = clamp(lp * 1.5); el('elogo').style.filter = `drop-shadow(0 0 50px rgba(255,107,0,.55)) blur(${(1 - clamp(lp)) * 14}px)`;
  el('eword').style.clipPath = `inset(-20% ${100 - P(t, V('endA') - .15, .6, E.oQ) * 100}% -20% 0)`;
  const sp = P(t, V('endB'), .5, E.oQ); el('eslo').style.opacity = sp; el('eslo').style.transform = `translateY(${(1 - sp) * 30}px)`;
  const cp = P(t, V('endB') + 1.6, .5, E.oQ); el('ecta').style.opacity = cp; el('ecta').style.transform = `translateY(${(1 - cp) * 30}px)`;
  for (let i = 0; i < 2; i++) { const p = P(t, V('endB') + 1.8 + i * .12, .5, E.oB); el('est' + i).style.opacity = clamp(p); el('est' + i).style.transform = `translateY(${(1 - p) * 60}px)`; }
  O('emen', P(t, V('endB') + 2.1, .5));
}

/* ---------- master ---------- */
const SPANS = () => ({ s1: [0, V('avec') - .1], rd: [V('avec') - .1, V('prix') - .1], s3: [V('prix') - .1, V('co2') - .1], s4: [V('co2') - .1, V('endA') - .2], sEnd: [V('endA') - .3, DUR2] });
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'); cf.clearRect(0, 0, 1080, 1920);
  const sp = SPANS();
  for (const k in sp) el(k).style.display = t >= sp[k][0] && t < sp[k][1] ? 'block' : 'none';
  el('glow').style.opacity = .55 + .25 * Math.sin(t * 1.1);
  if (el('s1').style.display === 'block') scene1(t);
  if (el('rd').style.display === 'block') sceneRoad(t);
  if (el('s3').style.display === 'block') sceneBars(t);
  if (el('s4').style.display === 'block') sceneCO2(t, cf);
  if (el('sEnd').style.display === 'block') sceneEnd(t, cf);
  hd('h0', t, V('hook') - .3, V('ami') - .1); hd('h1', t, V('ami') - .05, V('avec') - .1);
  hd('h2', t, V('avec') - .05, V('montez') - .1); hd('h3', t, V('montez') - .05, V('prix') - .1);
  hd('h4', t, V('prix') - .05, V('co2') - .1); hd('h5', t, V('co2') - .12, V('endA') - .25);
  let fl = 0;
  for (const [a, d, m] of [[V('avec') - .25, .3, .4], [V('prix') - .25, .3, .3], [V('co2') - .25, .3, .3], [V('endA') - .35, .3, .35]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .25, E.lin), P(t, DUR2 - .45, .45, E.lin)));
  const R = rng(Math.floor(t * 24) + 1); el('grain').style.transform = `translate(${-R() * 100}px,${-R() * 100}px)`;
};
