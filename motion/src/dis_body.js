/* ============================================================
   OJA — « Il t'a demandé plus d'argent ? Dis-le à OJA. » (idée 2 du kit), 9:16, 14 s, voice: Isac (assets/dis/voix_disle.mp3, from 0.5 s).
   Hook: the price ticket and a « + ? » that should not be there; « Dis-le à OJA » in a speech bubble;
   the real end-of-ride question of the app, « OUI » in one tap, « Valider »; logo. No amount, no driver blamed.
   ============================================================ */
const CX = 540, CY = 960, PER = 2600, VO = 0.5;
const PRE = [];                                     // images to wait for before rendering (the page tail reads it)
// voice timings (seconds in the voice file), injected by dis_build.py from assets/dis/voix_disle.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 14.0;

/* ---------- end-of-ride screen, as in the app ---------- */
const mapBg = () => `<svg class="abs" style="left:0;top:0" width="408" height="420" viewBox="0 0 408 420"><rect width="408" height="420" fill="#1E2533"/>
<g stroke="#2E3850" stroke-width="10" fill="none"><path d="M-10,90 L420,60"/><path d="M-10,250 L420,210"/><path d="M90,-10 L130,430"/><path d="M290,-10 L330,430"/></g>
<g stroke="#273046" stroke-width="4" fill="none"><path d="M-10,170 L420,135"/><path d="M200,-10 L230,430"/><path d="M-10,340 L420,300"/></g>
<path d="M120,330 C160,260 220,250 250,180 S300,120 312,96" stroke="${OR}" stroke-width="6" fill="none" stroke-linecap="round"/>
<circle cx="120" cy="330" r="9" fill="#3B82F6" stroke="#fff" stroke-width="3"/><circle cx="312" cy="96" r="9" fill="#22C55E" stroke="#fff" stroke-width="3"/></svg>`;
function scrRate(p) {
  return `${mapBg()}${sbar('#fff')}
<div class="abs" style="left:0;right:0;top:330px;bottom:0;border-radius:26px 26px 0 0;background:#fff;color:#1d1f24;padding:24px 18px;text-align:center;box-shadow:0 -10px 30px rgba(0,0,0,.25)">
<div style="font:800 15px Inter;letter-spacing:.04em">ARRIVÉ À DESTINATION</div>
<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-top:12px;font:800 18px Inter;color:#0B7A5E"><span style="width:34px;height:34px;border-radius:50%;background:#12B76A;display:grid;place-items:center">${ic('check', 18, '#fff', 3)}</span>Course terminée</div>
<div style="height:1px;background:#EEE;margin:18px 0"></div>
<div id="${p}q" style="font:700 16px Inter;padding:8px 6px;border-radius:14px">Le chauffeur a-t-il demandé plus d'argent ?</div>
<div style="display:flex;justify-content:center;gap:20px;margin-top:14px"><span id="${p}yes" style="position:relative;padding:12px 30px;border-radius:24px;border:1.5px solid #DDD;font:800 15px Inter;overflow:hidden">OUI<span id="${p}yesf" class="abs" style="inset:0;background:#FFF1E6;border-radius:24px;color:#C2410C;display:flex;align-items:center;justify-content:center;gap:6px;opacity:0">${ic('check', 15, OR, 3)}OUI</span></span><span style="padding:12px 30px;border-radius:24px;border:1.5px solid #DDD;font:800 15px Inter">NON</span></div>
<div style="font:500 15px Inter;margin-top:22px">Notez votre chauffeur</div>
<div style="display:flex;justify-content:center;gap:16px;margin-top:10px">${[0, 1, 2, 3, 4].map(i => `<span>${ic('star', 36, '#F59E0B', 2)}</span>`).join('')}</div>
<div id="${p}val" style="margin-top:22px;height:54px;border-radius:16px;background:#E3E4E6;color:#999;display:grid;place-items:center;font:800 15px Inter;letter-spacing:.04em">VALIDER ET FERMER</div>
<div style="font:700 15px Inter;color:#C2410C;margin-top:14px">Ignorer</div></div>
${tapEl(p)}`;
}

/* ---------- layout ---------- */
const scr = (id, inner) => `<div id="${id}" class="abs" style="left:0;top:0;width:408px;height:878px;background:#F6F6F6;overflow:hidden">${inner}</div>`;
const head = (id, html, top = 210, size = 92) => `<div id="${id}" class="abs hd" style="left:50px;right:50px;top:${top}px;text-align:center;font:800 ${size}px Poppins;letter-spacing:-.025em;line-height:1.08;visibility:hidden">${html}</div>`;
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1430px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const CANV = id => `<canvas id="${id}" class="lay" width="1080" height="1920"></canvas>`;
H += `<div id="bg" class="lay" style="background:radial-gradient(ellipse 80% 55% at 50% 46%,#6a3110 0%,#33170a 38%,#120905 70%,#050302 100%)"></div>
<div id="glow" class="abs" style="left:-260px;top:300px;width:1600px;height:1500px;background:radial-gradient(circle,rgba(255,107,0,.4),rgba(255,107,0,0) 58%)"></div>
<div id="s1" class="lay">
<div id="tk" class="abs" style="left:150px;top:880px;width:780px;height:250px;border-radius:40px;background:#fff;color:#111;padding:40px 46px;box-shadow:0 40px 80px rgba(0,0,0,.45)">
<div style="display:flex;align-items:center;gap:16px;font:800 30px Inter;letter-spacing:.12em;color:#666">${ic('lock', 34, '#666', 2.4)}PRIX AFFICHÉ</div>
<div style="display:flex;gap:16px;margin-top:40px">${[260, 150, 110].map(w => `<div style="width:${w}px;height:52px;border-radius:26px;background:#ECEDEF"></div>`).join('')}</div></div>
<div id="pill" class="abs" style="left:700px;top:790px;width:240px;height:150px;border-radius:75px;background:#FFD21F;color:#111;display:grid;place-items:center;font:900 92px Poppins;box-shadow:0 24px 50px rgba(0,0,0,.4);visibility:hidden">+&nbsp;?</div>
<div id="bub" class="abs" style="left:290px;top:760px;width:500px;height:430px;visibility:hidden">
<div class="abs" style="inset:0 0 70px 0;border-radius:90px;background:#fff;box-shadow:0 40px 90px rgba(0,0,0,.5),0 0 80px rgba(255,107,0,.35)"></div>
<div class="abs" style="left:90px;bottom:8px;width:0;height:0;border-left:30px solid transparent;border-right:60px solid transparent;border-top:80px solid #fff;transform:skewX(-18deg)"></div>
<img src="assets/mk_logo.png" class="abs" style="left:85px;top:-20px;width:330px;height:330px"></div></div>
<div id="sA" class="lay" style="perspective:${PER}px;perspective-origin:${CX}px ${CY}px">
<div id="ph" class="ip" style="left:${CX - 215}px;top:${CY - 450}px"><div class="scr">${scr('sT', scrRate('t'))}<div class="isl"></div>
<div id="phsh" class="abs" style="inset:0;z-index:19;background:linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.28) 48%,rgba(255,255,255,0) 56%);background-size:300% 100%;pointer-events:none"></div></div></div></div>
${CANV('fx')}
${head('h0', 'Il t\'a demandé<br><span style="color:#FF6B00">plus d\'argent&nbsp;?</span>', 260, 100)}
${head('h1', 'Dis-le<br>à <span style="color:#FF6B00">OJA.</span>', 230, 130)}
${head('h2', 'Après chaque<br>course…', 150, 100)}${head('h3', 'OJA te pose<br><span style="color:#FF6B00">la question.</span>', 150, 100)}
${head('h4', 'Tu réponds<br><span style="color:#12B76A">en un clic.</span>', 150, 100)}${head('h5', 'Ta réponse<br><span style="color:#FF6B00">compte.</span>', 150, 100)}
<div id="sEnd" class="lay">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:360px;top:420px;width:360px;height:360px;filter:drop-shadow(0 0 50px rgba(255,107,0,.55))">
<div id="eword" class="abs" style="left:0;right:0;top:830px;text-align:center;font:900 150px Poppins;letter-spacing:-.03em;line-height:1">OJA</div>
<div id="eslo" class="abs" style="left:0;right:0;top:1040px;text-align:center;font:800 84px Poppins;letter-spacing:-.02em">On <span style="color:#FF6B00">t'écoute.</span></div>
<div id="ecta" class="abs" style="left:0;right:0;top:1320px;text-align:center;font:600 42px Inter;color:#E8E2DC">Télécharge OJA</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}
<div id="emen" class="abs" style="left:60px;right:60px;top:1620px;text-align:center;font:500 26px Inter;color:#A39C96;line-height:1.35">À la fin de chaque course, l'appli OJA te demande si le chauffeur a demandé plus d'argent.</div></div>
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
function posIn(id) { let e = el(id), x = e.offsetWidth / 2, y = e.offsetHeight / 2; while (e && e.id !== 'sT') { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; } return [x, y]; }

/* ---------- scenes ---------- */
function scene1(t) {          // the price ticket, a « + ? » that should not be there, then « Dis-le à OJA »
  const go = P(t, V('dis') - .4, .3, E.iC);
  const tp = P(t, .1, .6, E.oB); el('tk').style.opacity = clamp(tp * 1.5) * (1 - go);
  const sh = t > V('argent') + .2 ? Math.sin(t * 40) * 5 * (1 - P(t, V('argent') + .2, .8)) : 0;
  el('tk').style.transform = `translate(${sh}px,${(1 - tp) * 120 + go * 260}px) scale(${lerp(.85, 1, tp)}) rotate(${-2 + sh * .2}deg)`;
  const pp = P(t, V('argent') + .2, .45, E.oB), e = el('pill');
  e.style.visibility = t >= V('argent') + .2 ? 'visible' : 'hidden';
  e.style.opacity = clamp(pp * 2) * (1 - go);
  e.style.transform = `translateY(${go * 260}px) rotate(${Math.sin(t * 9) * 7 * pp}deg) scale(${lerp(.3, 1, pp)})`;
  const bp = P(t, V('dis') - .05, .55, E.oB), b = el('bub');
  b.style.visibility = t >= V('dis') - .05 ? 'visible' : 'hidden';
  b.style.opacity = clamp(bp * 2); b.style.transform = `translateY(${(1 - bp) * 140 + Math.sin(t * 2.2) * 8}px) scale(${lerp(.4, 1, bp)})`;
}
function sceneA(t) {          // phone: the question, « OUI » in one tap, then « Valider et fermer »
  const k = P(t, V('apres') - .1, .7, E.oQ), z = P(t, V('quest') - .2, .6, E.ioC);
  const a = pose(1.2, 1260, 470), b = pose(1.5, 1290, 560);
  const o = { s: lerp(a.s, b.s, z), y: lerp(a.y, b.y, z) + (1 - k) * 1400, ry: lerp(22, 4, k) + Math.sin(t * 1.3) * 2, rx: 6 * (1 - k) };
  o.g = .35 + .25 * Math.sin(t * 2.4); phoneT(o);
  el('phsh').style.backgroundPosition = `${lerp(130, -30, (t * .5) % 1)}% 0`;
  const qg = P(t, V('quest') - .05, .4) * (1 - P(t, V('clic') + .5, .4));
  el('tq').style.background = `rgba(255,107,0,${.14 * qg})`; el('tq').style.boxShadow = `0 0 0 ${3 * qg}px rgba(255,107,0,${.8 * qg})`;
  tapAt('ttap', t, V('clic') + .15, ...posIn('tyes')); O('tyesf', P(t, V('clic') + .25, .2));
  const vp = P(t, V('clic') + .7, .3); el('tval').style.background = vp > .5 ? INK : '#E3E4E6'; el('tval').style.color = vp > .5 ? '#fff' : '#999';
  if (t >= V('compte') + .2) tapAt('ttap', t, V('compte') + .25, ...posIn('tval'));
  const vg = P(t, V('compte') + .35, .3) * (1 - P(t, V('endA') - .6, .3)); el('tval').style.boxShadow = `0 0 0 ${4 * vg}px rgba(255,160,60,.9),0 0 ${36 * vg}px rgba(255,107,0,.7)`;
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
const SPANS = () => ({ s1: [0, V('apres') - .1], sA: [V('apres') - .1, V('endA') - .2], sEnd: [V('endA') - .3, DUR2] });
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'); cf.clearRect(0, 0, 1080, 1920);
  const sp = SPANS();
  for (const k in sp) el(k).style.display = t >= sp[k][0] && t < sp[k][1] ? 'block' : 'none';
  el('glow').style.opacity = .55 + .25 * Math.sin(t * 1.1);
  if (el('s1').style.display === 'block') scene1(t);
  if (el('sA').style.display === 'block') sceneA(t);
  if (el('sEnd').style.display === 'block') sceneEnd(t, cf);
  hd('h0', t, V('hook') - .3, V('dis') - .1); hd('h1', t, V('dis') - .05, V('apres') - .1);
  hd('h2', t, V('apres'), V('quest') - .2); hd('h3', t, V('quest') - .15, V('clic') - .05);
  hd('h4', t, V('clic'), V('compte') - .05); hd('h5', t, V('compte'), V('endA') - .25);
  let fl = 0;
  for (const [a, d, m] of [[V('apres') - .25, .3, .4], [V('endA') - .35, .3, .35]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .25, E.lin), P(t, DUR2 - .45, .45, E.lin)));
  const R = rng(Math.floor(t * 24) + 1); el('grain').style.transform = `translate(${-R() * 100}px,${-R() * 100}px)`;
};
