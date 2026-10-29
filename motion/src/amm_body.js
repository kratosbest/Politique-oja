/* ============================================================
   OJA — « Arrête de marchander », 9:16, 23 s, voice: Isac (assets/amm/voix_marchander.mp3, from 0.5 s).
   Hook on a real zem clip with haggling bubbles, the real ride-choice screen (no amount: « Prix fixé »),
   the OJA rider, the real end-of-ride question « Le chauffeur a-t-il demandé plus d'argent ? », logo.
   ============================================================ */
const CX = 540, CY = 960, PER = 2600, VO = 0.5;
ICONS.chevR = '<path d="m9 18 6-6-6-6"/>';
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const IMG = { moto: imgL('assets/moto.png') };
const HOOKF = Array.from({ length: 60 }, (_, i) => imgL(`assets/ammf/f${String(i + 1).padStart(4, '0')}.jpg`));
// voice timings (seconds in the voice file), injected by amm_build.py from assets/amm/voix_marchander.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 23.0;

/* ---------- passenger screens, as in the app, without amounts ---------- */
const RIDES = [['assets/moto.png', 'MOTO'], ['assets/tricycle.png', 'TRICYCLE'], ['assets/car.png', 'VOITURE']];
const mapBg = () => `<svg class="abs" style="left:0;top:0" width="408" height="420" viewBox="0 0 408 420"><rect width="408" height="420" fill="#1E2533"/>
<g stroke="#2E3850" stroke-width="10" fill="none"><path d="M-10,90 L420,60"/><path d="M-10,250 L420,210"/><path d="M90,-10 L130,430"/><path d="M290,-10 L330,430"/></g>
<g stroke="#273046" stroke-width="4" fill="none"><path d="M-10,170 L420,135"/><path d="M200,-10 L230,430"/><path d="M-10,340 L420,300"/></g>
<path d="M120,330 C160,260 220,250 250,180 S300,120 312,96" stroke="${OR}" stroke-width="6" fill="none" stroke-linecap="round"/>
<circle cx="120" cy="330" r="9" fill="#3B82F6" stroke="#fff" stroke-width="3"/><circle cx="312" cy="96" r="9" fill="#22C55E" stroke="#fff" stroke-width="3"/></svg>`;
function scrRide(p) {
  return `${mapBg()}${sbar('#fff')}
<div class="abs" style="left:0;right:0;top:250px;bottom:0;border-radius:26px 26px 0 0;background:#1B1B1D;color:#eee">
<div style="width:60px;height:5px;border-radius:3px;background:#444;margin:12px auto 0"></div>
<div style="text-align:center;font:800 18px Inter;margin-top:14px">Choisissez votre course</div>
<div style="display:flex;align-items:center;gap:8px;margin:14px 18px 0;font:700 15px Inter">${ic('pin', 18, OR, 2)}Carrefour Saint-Michel, Cotonou</div>
<div style="margin:6px 18px 0;font:600 13px Inter;color:#aaa">≈ 6 min · 2,4 km</div>
<div style="margin:16px 14px 0;border-radius:22px;background:#fff;padding:6px;color:#111">${RIDES.map(([src, n], i) => `<div id="${p}r${i}" style="display:flex;align-items:center;gap:12px;height:86px;padding:0 10px;border-radius:16px;border:2px solid transparent">
<div style="width:66px;height:50px;display:grid;place-items:center"><img src="${src}" style="max-width:66px;max-height:50px"></div>
<div style="flex:1"><b style="font:800 16px Inter">${n}</b><div style="font:500 12px Inter;color:#666;margin-top:3px">Trajet : ≈ 6 min</div></div>
<div id="${p}pp${i}" style="position:relative;width:118px;height:36px;border-radius:18px;background:#F1F2F4;overflow:hidden"><div class="abs" style="inset:0;display:flex;align-items:center;justify-content:center;gap:5px;font:800 13px Inter;color:#9AA0AA">${ic('lock', 14, '#9AA0AA', 2.4)}Prix</div>
<div id="${p}pf${i}" class="abs" style="inset:0;background:#12B76A;color:#fff;display:flex;align-items:center;justify-content:center;gap:5px;font:800 13px Inter;clip-path:inset(0 100% 0 0)">${ic('check', 15, '#fff', 3)}Prix fixé</div></div></div>`).join('')}</div>
<div id="${p}btn" class="abs" style="left:14px;right:14px;bottom:18px;height:58px;border-radius:18px;background:${OR};display:flex;align-items:center;justify-content:center;gap:8px;color:#111;font:800 17px Inter">Choisir <span id="${p}bt">MOTO</span>${ic('chevR', 20, '#111', 2.4)}</div></div>
${tapEl(p)}`;
}
function scrRate(p) {
  return `${mapBg()}${sbar('#fff')}
<div class="abs" style="left:0;right:0;top:330px;bottom:0;border-radius:26px 26px 0 0;background:#fff;color:#1d1f24;padding:24px 18px;text-align:center;box-shadow:0 -10px 30px rgba(0,0,0,.25)">
<div style="font:800 15px Inter;letter-spacing:.04em">ARRIVÉ À DESTINATION</div>
<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-top:12px;font:800 18px Inter;color:#0B7A5E"><span style="width:34px;height:34px;border-radius:50%;background:#12B76A;display:grid;place-items:center">${ic('check', 18, '#fff', 3)}</span>Course terminée</div>
<div style="height:1px;background:#EEE;margin:18px 0"></div>
<div id="${p}q" style="font:700 16px Inter;padding:8px 6px;border-radius:14px">Le chauffeur a-t-il demandé plus d'argent ?</div>
<div style="display:flex;justify-content:center;gap:20px;margin-top:14px"><span style="padding:12px 30px;border-radius:24px;border:1.5px solid #DDD;font:800 15px Inter">OUI</span><span id="${p}no" style="position:relative;padding:12px 30px;border-radius:24px;border:1.5px solid #DDD;font:800 15px Inter;overflow:hidden">NON<span id="${p}nof" class="abs" style="inset:0;background:#E7F6EF;border-radius:24px;color:#0B7A5E;display:flex;align-items:center;justify-content:center;gap:6px;opacity:0">${ic('check', 15, '#12B76A', 3)}NON</span></span></div>
<div style="font:500 15px Inter;margin-top:22px">Notez votre chauffeur</div>
<div style="display:flex;justify-content:center;gap:16px;margin-top:10px">${[0, 1, 2, 3, 4].map(i => `<span id="${p}s${i}">${ic('star', 36, '#F59E0B', 2)}</span>`).join('')}</div>
<div id="${p}val" style="margin-top:22px;height:54px;border-radius:16px;background:#E3E4E6;color:#999;display:grid;place-items:center;font:800 15px Inter;letter-spacing:.04em">VALIDER ET FERMER</div>
<div style="font:700 15px Inter;color:#C2410C;margin-top:14px">Ignorer</div></div>
${tapEl(p)}`;
}

/* ---------- layout ---------- */
const scr = (id, inner) => `<div id="${id}" class="abs" style="left:0;top:0;width:408px;height:878px;background:#F6F6F6;overflow:hidden">${inner}</div>`;
const head = (id, html, top = 210, size = 92) => `<div id="${id}" class="abs hd" style="left:50px;right:50px;top:${top}px;text-align:center;font:800 ${size}px Poppins;letter-spacing:-.025em;line-height:1.08;visibility:hidden">${html}</div>`;
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1430px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const CANV = id => `<canvas id="${id}" class="lay" width="1080" height="1920"></canvas>`;
const bubble = (id, txt, x, y, w, bg, col, tail) => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;padding:26px 34px;border-radius:44px;background:${bg};color:${col};font:800 50px Poppins;line-height:1.1;box-shadow:0 24px 50px rgba(0,0,0,.35);visibility:hidden">${txt}<div class="abs" style="${tail};width:0;height:0;border:22px solid transparent"></div></div>`;
H += `<div id="bg" class="lay" style="background:radial-gradient(ellipse 80% 55% at 50% 46%,#6a3110 0%,#33170a 38%,#120905 70%,#050302 100%)"></div>
<div id="glow" class="abs" style="left:-260px;top:300px;width:1600px;height:1500px;background:radial-gradient(circle,rgba(255,107,0,.4),rgba(255,107,0,0) 58%)"></div>
<div id="s1" class="lay" style="overflow:hidden"><canvas id="hookc" class="lay" width="1080" height="1920"></canvas>
<div class="lay" style="background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 62%,rgba(0,0,0,.6))"></div>
${bubble('b0', 'C\'est combien&nbsp;?', 560, 980, 460, '#fff', '#111', 'left:-30px;bottom:30px;border-right-color:#fff')}
${bubble('b1', 'Mon frère,<br>c\'est l\'essence…', 20, 840, 470, '#FFD21F', '#111', 'right:-30px;top:30px;border-left-color:#FFD21F')}
${bubble('b2', 'Eh&nbsp;! Fais doucement&nbsp;!', 470, 1180, 560, '#fff', '#111', 'left:-30px;top:40px;border-right-color:#fff')}</div>
<canvas id="mtc" class="lay" width="1080" height="1920"></canvas>
<div id="sA" class="lay" style="perspective:${PER}px;perspective-origin:${CX}px ${CY}px">
<div id="ph" class="ip" style="left:${CX - 215}px;top:${CY - 450}px"><div class="scr">${scr('sR', scrRide('r'))}${scr('sT', scrRate('t'))}<div class="isl"></div>
<div id="phsh" class="abs" style="inset:0;z-index:19;background:linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.28) 48%,rgba(255,255,255,0) 56%);background-size:300% 100%;pointer-events:none"></div></div></div></div>
${CANV('fx')}
${head('h0', 'Arrête de<br><span style="color:#FF6B00">marchander&nbsp;!</span>', 120, 120)}
${head('h1', 'Moto · Tricycle · Voiture', 190, 78)}${head('h2', 'Le prix,<br><span style="color:#FF6B00">avant de monter.</span>', 150, 96)}
${head('h3', 'Tu montes.<br><span style="color:#FF6B00">Tu pars.</span>', 170, 110)}${head('h4', 'Plus de discussion<br><span style="color:#FF6B00">au bord de la route.</span>', 170, 84)}
${head('h5', 'À l\'arrivée…', 190, 96)}${head('h6', 'Le chauffeur a-t-il<br>demandé <span style="color:#FF6B00">plus d\'argent&nbsp;?</span>', 130, 78)}
${head('h7', 'Tu réponds<br><span style="color:#12B76A">en un clic.</span>', 150, 96)}
<div id="sEnd" class="lay">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:360px;top:420px;width:360px;height:360px;filter:drop-shadow(0 0 50px rgba(255,107,0,.55))">
<div id="eword" class="abs" style="left:0;right:0;top:830px;text-align:center;font:900 150px Poppins;letter-spacing:-.03em;line-height:1">OJA</div>
<div id="eslo" class="abs" style="left:0;right:0;top:1040px;text-align:center;font:800 70px Poppins;letter-spacing:-.02em">Le prix, <span style="color:#FF6B00">avant de monter.</span></div>
<div id="ecta" class="abs" style="left:0;right:0;top:1320px;text-align:center;font:600 42px Inter;color:#E8E2DC">Télécharge OJA</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}
<div id="emen" class="abs" style="left:60px;right:60px;top:1640px;text-align:center;font:500 26px Inter;color:#A39C96">Prix calculé avant la course. Majoration de 25 % entre 23 h et 6 h.</div></div>
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
function posIn(id) { let e = el(id), x = e.offsetWidth / 2, y = e.offsetHeight / 2; while (e && !/^s[RT]$/.test(e.id)) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; } return [x, y]; }

/* ---------- scenes ---------- */
function scene1(t) {          // hook on the zem clip
  const c = el('hookc').getContext('2d'), f = HOOKF[clamp(Math.floor(t * 24), 0, 59)], z = 1.04 + .06 * P(t, 0, 2.4, E.lin);
  c.drawImage(f, 540 - 540 * z, 960 - 960 * z, 1080 * z, 1920 * z);
  [[.15, 'b0'], [.6, 'b1'], [1.1, 'b2']].forEach(([a, id]) => { const p = P(t, a, .45, E.oB), e = el(id);
    e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.transform = `scale(${lerp(.4, 1, p)})`; e.style.opacity = clamp(p * 1.6) * (1 - P(t, V('choisis') - .45, .3)); });
}
function sceneMoto(t) {       // the rider passes, light trail
  const c = el('mtc').getContext('2d'), t0 = V('montes') - .1;
  const g = c.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0a0706'); g.addColorStop(.5, '#1c100a'); g.addColorStop(1, '#080605'); c.fillStyle = g; c.fillRect(0, 0, 1080, 1920);
  c.save(); c.globalCompositeOperation = 'lighter'; const r = rng(31);
  for (let k = 0; k < 46; k++) { const x0 = r() * 1600, y = 300 + r() * 1300, rad = 10 + r() * 60, col = r() < .6 ? '255,150,60' : '255,230,200', a = .25 + r() * .6, sp = .5 + r();
    const xx = ((x0 + (t - t0) * 2600 * sp) % 1700) - 300, gr = c.createRadialGradient(xx, y, 0, xx, y, rad);
    gr.addColorStop(0, `rgba(${col},${a * .5})`); gr.addColorStop(.7, `rgba(${col},${a * .25})`); gr.addColorStop(1, `rgba(${col},0)`); c.fillStyle = gr; c.fillRect(xx - rad, y - rad, rad * 2, rad * 2); }
  const rg = c.createLinearGradient(0, 1250, 0, 1920); rg.addColorStop(0, 'rgba(255,120,40,.12)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = rg; c.fillRect(0, 1250, 1080, 670);
  const r2 = rng(77);
  for (let k = 0; k < 26; k++) { const y = 1260 + r2() * 600, x = ((r2() * 2000 + (t - t0) * 4200) % 2200) - 600, l = 160 + r2() * 380; c.strokeStyle = `rgba(255,${150 + r2() * 90},90,${.12 + r2() * .2})`; c.lineWidth = 2 + r2() * 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + l, y); c.stroke(); }
  c.restore();
  const kf = [[t0, 1500], [t0 + .55, 560], [V('disc') + .2, 500], [V('arr') - .1, -900]], X = tt => KF(tt, kf, E.ioC);
  const x = X(t), v = (X(t) - X(t - 1 / 48)) * 48, w = 1040, h = w * 690 / 930, y = 1420 - h;
  const tr = []; for (let i = 0; i <= 40; i++) tr.push([x + 300 + i * 22 * clamp(Math.abs(v) / 2500, .3, 1.6), y + 190 + Math.sin(i * .2) * 6, Math.pow(1 - i / 40, 1.5) * .9]);
  ribbon(c, tr, 9);
  const blur = clamp(Math.abs(v) / 2600, 0, 1);
  for (let k = 4; k >= 1; k--) { c.globalAlpha = .13 * blur; c.drawImage(IMG.moto, x - w / 2 + k * 26 * blur * (v < 0 ? 1 : -1), y, w, h); }
  c.globalAlpha = 1; c.drawImage(IMG.moto, x - w / 2, y, w, h);
}
function sceneA(t) {          // phone: ride choice, then end of ride
  const ride = t < V('montes') - .1;
  O('sR', ride ? 1 : 0); O('sT', ride ? 0 : 1);
  let o;
  if (ride) { const k = P(t, V('choisis') - .1, .7, E.oQ); o = pose(1.3, 1230, 470); o.y += (1 - k) * 1400; o.ry = lerp(-22, -5, k) + Math.sin(t * 1.3) * 2; o.rx = 6 * (1 - k); }
  else { const k = P(t, V('arr') - .1, .7, E.oQ), z = P(t, V('quest') - .2, .6, E.ioC); const a = pose(1.2, 1250, 470), b = pose(1.45, 1280, 560);
    o = { s: lerp(a.s, b.s, z), y: lerp(a.y, b.y, z) + (1 - k) * 1400, ry: lerp(22, 4, k) + Math.sin(t * 1.3) * 2, rx: 6 * (1 - k) }; }
  o.g = .35 + .25 * Math.sin(t * 2.4); phoneT(o);
  el('phsh').style.backgroundPosition = `${lerp(130, -30, (t * .5) % 1)}% 0`;
  // ride rows on the words, then « Prix fixé »
  const sel = t < V('tri') ? 0 : t < V('voit') ? 1 : 2, on = t >= V('moto') - .05;
  for (let i = 0; i < 3; i++) {
    const r = el('rr' + i), act = on && i === sel && t < V('prix');
    r.style.borderColor = act ? OR : 'transparent'; r.style.background = act ? '#FFF1E6' : 'transparent';
    el('rpf' + i).style.clipPath = `inset(0 ${100 - P(t, V('prix') + .1 + i * .14, .35, E.oQ) * 100}% 0 0)`;
  }
  el('rbt').textContent = ['MOTO', 'TRICYCLE', 'VOITURE'][on ? sel : 0];
  const bg = P(t, V('prix') + .9, .4) * (1 - P(t, V('montes') - .5, .3)); el('rbtn').style.boxShadow = `0 0 0 ${4 * bg}px rgba(255,160,60,.9),0 0 ${40 * bg}px rgba(255,107,0,.8)`;
  tapAt('rtap', t, V('montes') - .45, ...posIn('rbtn'));
  // end of ride: the question, then « NON » in one tap, then the stars
  const qg = P(t, V('quest') - .05, .4) * (1 - P(t, V('clic') + .4, .4));
  el('tq').style.background = `rgba(255,107,0,${.14 * qg})`; el('tq').style.boxShadow = `0 0 0 ${3 * qg}px rgba(255,107,0,${.8 * qg})`;
  tapAt('ttap', t, V('clic') - .1, ...posIn('tno')); O('tnof', P(t, V('clic'), .2));
  for (let i = 0; i < 5; i++) el('ts' + i).style.transform = `scale(${1 + .25 * Math.sin(Math.PI * P(t, V('clic') + .55 + i * .08, .25, E.lin))})`;
  const vp = P(t, V('clic') + .95, .3); el('tval').style.background = vp > .5 ? INK : '#E3E4E6'; el('tval').style.color = vp > .5 ? '#fff' : '#999';
}
function sceneEnd(t, cf) {
  const h = P(t, V('endA') - .2, .55, E.ioC), sm = u => [lerp(330, 750, u), 1000 + Math.sin(u * Math.PI) * 44 - u * 10];
  const pts = []; for (let i = 0; i <= 100; i++) { const u = h * i / 100, q = sm(u); pts.push([q[0], q[1], Math.pow(i / 100, .5)]); }
  ribbon(cf, pts, 8);
  if (h > .97) { const e = sm(1); ribbon(cf, [[e[0] - 40, e[1] - 26, 1], [e[0], e[1], 1], [e[0] - 35, e[1] + 26, 1]], 8, 1); }
  if (h < 1) { const q = sm(h); flare(cf, q[0], q[1], 150, 1); }
  const lp = P(t, V('endA') - .3, .55, E.oB);
  el('elogo').style.transform = `scale(${lerp(.55, 1, lp)})`; el('elogo').style.opacity = clamp(lp * 1.5); el('elogo').style.filter = `drop-shadow(0 0 50px rgba(255,107,0,.55)) blur(${(1 - clamp(lp)) * 14}px)`;
  el('eword').style.clipPath = `inset(-20% ${100 - P(t, V('endA') - .15, .5, E.oQ) * 100}% -20% 0)`;
  const sp = P(t, V('endB'), .5, E.oQ); el('eslo').style.opacity = sp; el('eslo').style.transform = `translateY(${(1 - sp) * 30}px)`;
  const cp = P(t, V('endB') + 2.1, .5, E.oQ); el('ecta').style.opacity = cp; el('ecta').style.transform = `translateY(${(1 - cp) * 30}px)`;
  for (let i = 0; i < 2; i++) { const p = P(t, V('endB') + 2.3 + i * .12, .5, E.oB); el('est' + i).style.opacity = clamp(p); el('est' + i).style.transform = `translateY(${(1 - p) * 60}px)`; }
  O('emen', P(t, V('endB') + 2.6, .5));
}

/* ---------- master ---------- */
const SPANS = () => ({ s1: [0, V('choisis') - .1], mtc: [V('montes') - .1, V('arr') - .1], sA: [V('choisis') - .1, V('endA') - .2], sEnd: [V('endA') - .3, DUR2] });
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'); cf.clearRect(0, 0, 1080, 1920);
  const sp = SPANS();
  for (const k in sp) el(k).style.display = t >= sp[k][0] && t < sp[k][1] ? 'block' : 'none';
  if (t >= V('montes') - .1 && t < V('arr') - .1) el('sA').style.display = 'none';
  el('glow').style.opacity = .55 + .25 * Math.sin(t * 1.1);
  if (el('s1').style.display === 'block') scene1(t);
  if (el('mtc').style.display === 'block') sceneMoto(t);
  if (el('sA').style.display === 'block') sceneA(t);
  if (el('sEnd').style.display === 'block') sceneEnd(t, cf);
  hd('h0', t, V('hook') - .2, V('choisis') - .1);
  hd('h1', t, V('choisis') + .1, V('prix') - .1); hd('h2', t, V('prix') - .05, V('montes') - .1);
  hd('h3', t, V('montes'), V('disc') - .05); hd('h4', t, V('disc'), V('arr') - .1);
  hd('h5', t, V('arr'), V('quest') - .25); hd('h6', t, V('quest') - .2, V('clic') - .05); hd('h7', t, V('clic'), V('endA') - .25);
  let fl = 0;
  for (const [a, d, m] of [[V('choisis') - .25, .3, .5], [V('endA') - .3, .3, .35]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .25, E.lin), P(t, DUR2 - .45, .45, E.lin)));
  const R = rng(Math.floor(t * 24) + 1); el('grain').style.transform = `translate(${-R() * 100}px,${-R() * 100}px)`;
};
