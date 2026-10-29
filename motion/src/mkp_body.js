/* ============================================================
   OJA Market — launch spot, 9:16, 20.5 s.
   Light ribbon around the phone, real OJA Market screens, menu cards flying out, the dish,
   Mobile Money payment, 3D route over Cotonou, the OJA rider, the dish delivered on the table,
   two slogans and the logo.
   ============================================================ */
const CX = 540, CY = 960, PER = 2600;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const IMG = { moto: imgL('assets/moto.png') };
const ORG = '255,107,0';

/* ---------- menu card identical to the menu grid item (used for the flying copies) ---------- */
const MBG = ['#FFE7D1', '#FFE7D1', '#FFE9B8', '#FFE0E0'];
function menuCard(id, i, x, y) {
  const [k, n, pr, old] = MENU[i];
  return `<div id="${id}" class="a-card" style="position:absolute;left:${x}px;top:${y}px;width:182px;height:282px;padding:10px;color:#111;font-family:Inter;opacity:0">${fv(k, 162, 150, 16, MBG[i])}
${old ? `<div class="abs" style="left:18px;top:18px;padding:4px 10px;border-radius:10px;background:#E8112D;color:#fff;font:800 12px Inter">Promo</div>` : ''}
<div style="font:700 11px Inter;color:#888;margin-top:10px;letter-spacing:.06em">CHEZ TANTI</div><div style="font:800 16px Poppins;margin-top:2px">${n}</div>
<div style="font:800 16px Inter;margin-top:8px;color:${old ? '#E8112D' : '#111'}">${old ? `<s style="color:#999;font-weight:600;font-size:13px">${old}</s> ` : ''}${pr} <span style="font-size:12px">XOF</span></div>
<div class="abs" style="right:10px;bottom:10px;width:42px;height:42px;border-radius:50%;background:#FF6B00;display:grid;place-items:center">${ic('bag', 20, '#fff', 2.2)}</div></div>`;
}
const scr = (id, inner) => `<div id="${id}" class="abs" style="left:0;top:0;width:408px;height:878px;background:#F6F6F6;overflow:hidden">${inner}</div>`;
const chip = (inner, bg = 'rgba(255,255,255,.1)', c = '#fff') => `<span style="display:inline-flex;align-items:center;gap:12px;padding:16px 28px;border-radius:40px;background:${bg};color:${c};font:700 32px Inter">${inner}</span>`;
const words = (s, cls = '') => s.split(' ').map(w => `<span class="tw ${cls}" style="display:inline-block">${w}</span>`).join(' ');
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1420px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const CANV = id => `<canvas id="${id}" class="lay" width="1080" height="1920"></canvas>`;

/* ---------- layers (bottom → top) ---------- */
H += `<div id="bg" class="lay" style="background:radial-gradient(ellipse 80% 55% at 50% 46%,#6a3110 0%,#33170a 38%,#120905 70%,#050302 100%)"></div>
<div id="sTab" class="lay" style="overflow:hidden"><img id="tabimg" src="assets/mkp/table.jpg" class="lay"></div>
${CANV('mapc')}
${CANV('mtc')}
${CANV('rbb')}
<div id="sA" class="lay" style="perspective:${PER}px;perspective-origin:${CX}px ${CY}px">
<div id="ph" class="ip" style="left:${CX - 215}px;top:${CY - 450}px"><div class="scr">${scr('sH', scrHome('h'))}${scr('sM', scrMenu('m'))}${scr('sC', scrCheckout('c'))}<div class="isl"></div>
<div id="phsh" class="abs" style="inset:0;z-index:19;background:linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.3) 48%,rgba(255,255,255,0) 56%);background-size:300% 100%;pointer-events:none"></div></div>
${[0, 1, 2, 3].map(i => menuCard('fc' + i, i, 11 + 16 + (i % 2) * 194, 11 + 250 + Math.floor(i / 2) * 294)).join('')}
</div></div>
<div id="sHero" class="lay">
<div id="hglow" class="abs" style="left:-260px;top:60px;width:1600px;height:1500px;background:radial-gradient(circle,rgba(255,107,0,.5),rgba(255,107,0,0) 58%)"></div>
<div class="abs" style="left:90px;top:300px;width:900px;height:785px;perspective:1800px"><div id="hplat" class="abs" style="inset:0">
<img src="assets/cs/obj_plat.png" style="position:absolute;width:900px;height:785px;filter:drop-shadow(0 60px 50px rgba(0,0,0,.6))">
<div id="hshine" class="abs" style="inset:0;-webkit-mask-image:url(assets/cs/obj_plat.png);-webkit-mask-size:100% 100%;background:linear-gradient(105deg,rgba(255,255,255,0) 42%,rgba(255,236,210,.6) 50%,rgba(255,255,255,0) 58%);background-size:300% 100%;mix-blend-mode:screen"></div></div></div>
<div class="abs" style="left:0;right:0;top:1150px;text-align:center">
<div id="hx0" style="font:700 30px Inter;letter-spacing:.24em;color:#FF8A1F">MAQUIS CHEZ TANTI</div>
<div id="hx1" style="font:800 108px Poppins;letter-spacing:-.02em;margin-top:4px;line-height:1.1">Poulet braisé</div>
<div id="hx2" style="font:800 156px Poppins;letter-spacing:-.03em;line-height:1;margin-top:14px">3 500<span style="font-size:54px;color:#FF8A1F;letter-spacing:0"> XOF</span></div>
<div id="hx3" style="margin-top:40px;display:flex;justify-content:center;gap:18px">${chip('<span style="color:#F5B000">★</span> 4,9')}${chip(ic('nav', 30, '#fff', 2.2) + 'Livraison OJA', '#FF6B00')}</div></div></div>
<div id="sTobj" class="lay" style="overflow:hidden"><div id="tgrp" class="lay">
<div id="tshad" class="abs" style="left:250px;top:1170px;width:580px;height:110px;border-radius:50%;background:radial-gradient(ellipse,rgba(0,0,0,.85),rgba(0,0,0,0) 70%)"></div>
<div id="tplat" class="abs" style="left:180px;top:612px;width:720px;height:628px"><img src="assets/cs/obj_plat.png" style="position:absolute;width:720px;height:628px;filter:brightness(.93) saturate(1.05)">
<img id="tlogo" src="assets/mkp/plat_logo.png" style="position:absolute;width:720px;height:628px;opacity:0"></div></div></div>
${CANV('fx')}
<div id="trk" class="abs" style="left:50px;right:50px;top:110px;padding:34px 36px;border-radius:40px;background:rgba(14,16,22,.82);border:1.5px solid rgba(255,255,255,.12);box-shadow:0 30px 60px rgba(0,0,0,.5)">
<div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font:800 46px Poppins">Votre commande arrive</div><div style="font:500 28px Inter;color:#9AA0B4;margin-top:4px">Maquis Chez Tanti → Haie Vive</div></div>
<div style="font:900 64px Poppins;color:#FF6B00;white-space:nowrap"><span id="eta">12</span><span style="font-size:30px"> min</span></div></div>
<div style="display:flex;gap:12px;margin-top:30px">${[0, 1, 2, 3].map(i => `<div style="flex:1;height:14px;border-radius:7px;background:rgba(255,255,255,.12);overflow:hidden"><div id="tb${i}" style="height:14px;width:0;background:#FF6B00;border-radius:7px;box-shadow:0 0 16px #FF6B00"></div></div>`).join('')}</div>
<div style="display:flex;justify-content:space-between;font:600 24px Inter;color:#8A90A2;margin-top:14px">${['Acceptée', 'Préparation', 'En route', 'Livrée'].map((s, i) => `<span id="tl${i}">${s}</span>`).join('')}</div>
<div style="display:flex;align-items:center;gap:20px;margin-top:28px"><div style="width:84px;height:84px;border-radius:50%;background:linear-gradient(135deg,#FF8A1F,#C2410C);display:grid;place-items:center;font:800 30px Poppins">KA</div><div><div style="font:800 32px Inter">Koffi · Livreur OJA</div><div style="font:500 26px Inter;color:#9AA0B4">Moto · ★ 4,9</div></div></div></div>
<div id="notif" class="abs" style="left:36px;right:36px;top:80px;padding:28px 30px;border-radius:44px;background:rgba(40,36,34,.78);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);border:1px solid rgba(255,255,255,.14);display:flex;gap:24px;align-items:center;box-shadow:0 30px 60px rgba(0,0,0,.45)">
<div style="width:96px;height:96px;border-radius:24px;background:#fff;display:grid;place-items:center;flex:none"><img src="assets/mk_logo.png" style="width:84px"></div>
<div style="flex:1"><div style="display:flex;justify-content:space-between;font:600 26px Inter;color:#C9C4C0"><span style="font-weight:800;color:#fff">OJA</span><span>maintenant</span></div>
<div style="font:800 34px Inter;margin-top:4px">Commande livrée</div><div style="font:500 28px Inter;color:#E2DDD8;margin-top:2px">Votre poulet braisé est arrivé. Bon appétit !</div></div></div>
<div id="tx1" class="abs" style="left:0;right:0;top:760px;text-align:center;font:800 132px Poppins;letter-spacing:-.03em;line-height:1.12;filter:drop-shadow(0 0 30px rgba(255,170,90,.35))"><div>${words('Tout ce que')}</div><div>${words('vous aimez.')}</div></div>
<div id="tx2" class="abs" style="left:0;right:0;top:760px;text-align:center;font:800 132px Poppins;letter-spacing:-.03em;line-height:1.12;filter:drop-shadow(0 0 30px rgba(255,170,90,.35))"><div>${words('De Cotonou')}</div><div>${words('à Parakou.')}</div></div>
<div id="sEnd" class="lay">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:350px;top:470px;width:380px;height:380px;filter:drop-shadow(0 0 50px rgba(255,107,0,.55))">
<div id="eword" class="abs" style="left:0;right:0;top:900px;text-align:center;font:900 136px Poppins;letter-spacing:-.03em;line-height:1"><span>OJA</span> <span style="color:#FF6B00">Market</span></div>
<div id="ecta" class="abs" style="left:0;right:0;top:1310px;text-align:center;font:600 42px Inter;color:#E8E2DC">Téléchargez l'app OJA</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}</div>
<div id="flash" class="lay" style="background:radial-gradient(circle at 50% 50%,#fff3e0,rgba(255,140,40,.85) 40%,rgba(255,107,0,0) 75%);opacity:0;z-index:40"></div>
<canvas id="grain" width="1280" height="2120"></canvas><div id="vig"></div><div id="fade"></div>`;
stage.innerHTML = H;

/* ---------- grain texture ---------- */
(() => { const g = el('grain').getContext('2d'), d = g.createImageData(1280, 2120), r = rng(5);
  for (let i = 0; i < d.data.length; i += 4) { const v = r() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); })();

/* ---------- light ribbon ---------- */
const RBP = [[7, .045, '255,107,0'], [3.4, .12, '255,120,20'], [1.7, .42, '255,168,64'], [.62, .95, '255,242,220']];
// pts: [x, y, alpha, depth]; with two contexts, chunks with depth > 0 go to the front one
function ribbon(cf, cb, pts, w, chunk = 5) {
  for (const c of [cf, cb]) if (c) { c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'butt'; c.lineJoin = 'round'; }
  for (const [m, al, col] of RBP) {
    for (let i = 0; i < pts.length - 1; i += chunk) {
      const j = Math.min(pts.length - 1, i + chunk); let a = 0, z = 0;
      for (let k = i; k <= j; k++) { a += pts[k][2]; z += pts[k][3] || 0; }
      a = a / (j - i + 1) * al; if (a < .003) continue;
      const c = cb && z <= 0 ? cb : cf; if (!c) continue;
      c.lineWidth = w * m; c.strokeStyle = `rgba(${col},${a})`; c.beginPath(); c.moveTo(pts[i][0], pts[i][1]);
      for (let k = i + 1; k <= j; k++) c.lineTo(pts[k][0], pts[k][1]);
      c.stroke();
    }
  }
  for (const c of [cf, cb]) if (c) c.restore();
}
function flare(c, x, y, r, a, col = ORG) {
  if (a <= .002) return;
  c.save(); c.globalCompositeOperation = 'lighter';
  let g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(255,248,235,${a})`); g.addColorStop(.18, `rgba(255,190,110,${a * .7})`); g.addColorStop(.5, `rgba(${col},${a * .22})`); g.addColorStop(1, `rgba(${col},0)`);
  c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
  c.restore();
}
// generic 2D path sampled on u ∈ [h - tail, h], alpha ramps towards the head
function trail(fn, h, tail, n, fade = 1, pw = 1.6) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const u = h - tail + tail * i / n; if (u < 0 || u > 1) continue; const q = fn(u); pts.push([q[0], q[1], Math.pow(i / n, pw) * fade, q[2] || 0]); }
  return pts;
}
const proj = (x, y, z) => { const s = PER / (PER - z); return [CX + x * s, CY + y * s, z]; };

/* ---------- phone ---------- */
function phoneT(o) {
  el('ph').style.transform = `translate3d(${o.x || 0}px,${o.y || 0}px,${o.z || 0}px) rotateX(${o.rx || 0}deg) rotateY(${o.ry || 0}deg) rotateZ(${o.rz || 0}deg) scale3d(${o.s},${o.s},${o.s})`;
  const g = o.g || 0;
  el('ph').style.boxShadow = `0 0 0 2px #0c0c0e inset,0 0 0 ${2 + 2 * g}px rgba(255,150,60,${.9 * g}),0 0 ${70 * g}px rgba(255,107,0,${.6 * g}),0 80px 140px rgba(0,0,0,.5)`;
}
const FC = [[-200, -372, 260, -8, 22, -6], [205, -252, 160, 6, -20, 5], [-195, 54, 380, 10, 18, 4], [205, 174, 200, -6, -24, -5]];
function sceneA(t, cf, cb) {
  // phone pose
  let s, x = 0, y = 0, z = 0, rx, ry, rz = 0, g;
  if (t < 3.0) {
    const k = P(t, 1.55, 1.25, E.ioC);
    s = lerp(KF(t, [[0, 1.3], [1.6, 1.42]], E.ioC), 2.55, k);
    ry = lerp(KF(t, [[0, -24], [1.6, -10]], E.ioC), 0, k); rx = lerp(KF(t, [[0, 9], [1.6, 5]], E.ioC), 0, k);
    y = lerp(Math.sin(t * 1.6) * 8, (450 - 203) * 2.55 - 110, k);
    g = KF(t, [[.2, 0], [1.2, 1], [1.7, .7], [2.6, .3]]);
  } else if (t < 5.45) {
    const k = P(t, 2.95, .7, E.ioC), f = P(t, 4.75, .6, E.iC);
    s = lerp(2.55, 1.1, k); y = lerp((450 - 203) * 2.55 - 110, 0, k) + Math.sin(t * 1.4) * 6;
    ry = lerp(0, KF(t, [[3.4, -12], [5.4, 12]], E.ioC), k); rx = lerp(0, 4, k);
    ry *= 1 - f; rx *= 1 - f; z = -700 * f; g = .25 + .5 * P(t, 3.4, .5) - .75 * f;
  } else {
    const k = P(t, 6.75, .5, E.oQ), out = P(t, 7.95, .4, E.iC);
    s = lerp(3.2, 2.3, k) - out * .7; const fy = 718;
    y = (450 - fy) * s; ry = lerp(-8, -3, P(t, 6.75, 1.5, E.oC)); rx = lerp(8, 2, k); z = -900 * out;
    g = .5 + .5 * Math.sin(t * 9) * (t < 7.5 ? 1 : 0);
  }
  phoneT({ s, x, y, z, rx, ry, rz, g });
  // screens
  const sw = P(t, 3.0, .38, E.ioC);
  el('sH').style.transform = `translateX(${-120 * sw}px)`; el('sH').style.filter = `brightness(${1 - .3 * sw})`;
  el('sM').style.transform = `translateX(${408 * (1 - sw)}px)`; O('sM', t >= 3.0 && t < 6 ? 1 : 0);
  O('sC', t >= 6 ? 1 : 0); O('sH', t < 6 ? 1 : 0);
  el('phsh').style.backgroundPosition = `${lerp(130, -30, (t * .55) % 1)}% 0`;
  // search typing
  const q = 'Poulet braisé', n = Math.round(P(t, 1.95, .85, E.lin) * q.length);
  el('hq').textContent = t < 1.92 ? 'Rechercher un plat ou une boutique' : q.slice(0, n);
  el('hq').style.color = t < 1.92 ? '#777' : '#111'; el('hq').style.fontWeight = t < 1.92 ? 500 : 700;
  el('hcur').style.opacity = t > 1.85 && t < 3.0 && (Math.floor(t * 3.2) % 2 === 0 || (t > 1.95 && t < 2.8)) ? 1 : 0;
  el('hcur').style.marginLeft = t < 1.92 ? '-10px' : '2px';
  const sg = KF(t, [[1.3, 0], [1.6, 1], [2.9, 1], [3.1, 0]]);
  el('hsbx').style.boxShadow = `0 0 0 ${3 * sg}px rgba(255,140,40,${sg}),0 0 ${34 * sg}px rgba(255,107,0,${.7 * sg})`;
  // highlight of the dish in the menu, then the cards fly out
  const hl = KF(t, [[3.35, 0], [3.55, 1], [3.9, 1]]);
  el('mit2').style.boxShadow = `0 0 0 ${4 * hl}px #FF6B00,0 0 ${30 * hl}px rgba(255,107,0,${.7 * hl})`;
  const fly = t >= 3.85 && t < 6;
  for (let i = 0; i < 4; i++) {
    const id = 'fc' + i, [dx, dy, dz, ax, ay, az] = FC[i], p = P(t, 3.85 + i * .07, .75, E.oQ);
    const fl = Math.sin(t * 2 + i * 1.7) * 10 * p;
    let X = dx * p, Y = dy * p + fl, Z = dz * p + 1, RX = ax * p, RY = ay * p, RZ = az * p, op = fly ? 1 : 0;
    if (i === 2) { const c = P(t, 4.8, .62, E.iC); X = lerp(X, 97, c); Y = lerp(Y, -246, c); Z = Z + 2100 * c; RX *= 1 - c; RY *= 1 - c; RZ *= 1 - c; }
    else { const c = P(t, 4.8, .5, E.iC); Z -= 900 * c; op *= 1 - c; }
    el(id).style.transform = `translate3d(${X}px,${Y}px,${Z}px) rotateX(${RX}deg) rotateY(${RY}deg) rotateZ(${RZ}deg)`;
    O(id, op);
    el(id).style.boxShadow = p > 0 ? `0 ${30 * p}px ${60 * p}px rgba(0,0,0,${.35 * p}),0 0 0 ${i === 2 ? 3 : 0}px #FF6B00` : 'none';
  }
  // checkout: pay
  const pg = t > 6.9 && t < 7.5 ? .5 + .5 * Math.sin((t - 6.9) * 12) : 0;
  el('cpay').style.boxShadow = `0 0 0 ${4 * pg}px rgba(255,160,60,.9),0 0 ${40 * pg}px rgba(255,107,0,.8)`;
  const tp = (t - 7.42) / .45;
  if (tp > 0 && tp < 1) { el('ctap').style.transform = `translate(293px,794px) scale(${.5 + tp * 1.3})`; O('ctap', 1 - tp); } else O('ctap', 0);
  const pd = P(t, 7.52, .3, E.oC);
  el('cpaid').style.clipPath = `circle(${pd * 75}% at 50% 50%)`;
  el('cpay').style.transform = `scale(${1 + .08 * Math.sin(Math.PI * P(t, 7.5, .3, E.lin))})`;
  // intro ribbon around the phone
  if (t < 2.2) {
    const h = KF(t, [[.08, 0], [1.5, 1]], E.ioC), fade = 1 - P(t, 1.45, .55, E.lin);
    const pts = trail(u => { const th = -Math.PI * .95 + u * Math.PI * 2.35, R = 470 + 70 * Math.sin(u * 3.2); return proj(R * Math.cos(th), lerp(820, -620, u), R * Math.sin(th)); }, h, .5, 150, fade);
    ribbon(cf, cb, pts, 9);
    const hd = pts[pts.length - 1]; if (hd && t < 1.6) flare(hd[3] > 0 ? cf : cb, hd[0], hd[1], 120, .9 * fade);
  }
  // pay → streak that dives into the map
  if (t > 7.6 && t < 9.0) {
    const h = P(t, 7.62, 1.1, E.ioC), fade = 1 - P(t, 8.7, .22, E.lin);
    const bz = (a, b, c, d, u) => (1 - u) ** 3 * a + 3 * (1 - u) ** 2 * u * b + 3 * (1 - u) * u * u * c + u ** 3 * d;
    const pts = trail(u => [bz(745, 960, 120, 540, u), bz(1160, 260, 380, 1180, u), 1], h, .42, 140, fade);
    ribbon(cf, null, pts, 10);
    const hd = pts[pts.length - 1]; if (hd) flare(cf, hd[0], hd[1], 160, fade);
  }
}

/* ---------- hero dish ---------- */
function sceneHero(t, cf) {
  const k = P(t, 5.35, .7, E.oQ);
  el('hplat').style.transform = `translateY(${(1 - k) * 80 + Math.sin(t * 1.8) * 10}px) rotateY(${lerp(-26, 0, k) + Math.sin(t * 1.3) * 5}deg) rotateX(${Math.sin(t * 1.1) * 3}deg) scale(${lerp(1.5, 1, k)})`;
  el('hplat').style.filter = `blur(${(1 - k) * 14}px)`;
  el('hshine').style.backgroundPosition = `${lerp(140, -40, P(t, 5.75, .8, E.ioC))}% 0`;
  O('hglow', .5 + .5 * k);
  for (let i = 0; i < 4; i++) { const p = P(t, 5.7 + i * .1, .5, E.oQ); el('hx' + i).style.transform = `translateY(${(1 - p) * 60}px)`; el('hx' + i).style.opacity = p; el('hx' + i).style.filter = `blur(${(1 - p) * 10}px)`; }
}

/* ---------- 3D map of Cotonou ---------- */
const CELL = 130, RW = 40, LAG = 2;   // lagoon occupies block column i = LAG
const BLD = (() => { const r = rng(229), b = [];
  for (let i = -12; i < 12; i++) for (let j = -9; j < 20; j++) {
    if (i === LAG) continue;
    const x0 = i * CELL + RW / 2, x1 = (i + 1) * CELL - RW / 2, z0 = j * CELL + RW / 2, z1 = (j + 1) * CELL - RW / 2;
    const nx = r() < .55 ? 2 : 1, nz = r() < .55 ? 2 : 1, gp = 7;
    for (let a = 0; a < nx; a++) for (let c = 0; c < nz; c++) {
      if (r() < .1) continue;
      const bx0 = lerp(x0, x1, a / nx) + (a ? gp : 0), bx1 = lerp(x0, x1, (a + 1) / nx) - (a < nx - 1 ? gp : 0);
      const bz0 = lerp(z0, z1, c / nz) + (c ? gp : 0), bz1 = lerp(z0, z1, (c + 1) / nz) - (c < nz - 1 ? gp : 0);
      const tall = Math.abs(i + 1) < 3 && j > 5 && j < 10 ? 2.4 : 1;
      b.push([bx0, bx1, bz0, bz1, 12 + Math.pow(r(), 2.4) * 95 * tall, .85 + r() * .3]);
    }
  }
  return b; })();
const RT = [[4, 7], [4, 5], [1, 5], [1, 3], [-2, 3], [-2, 0], [-4, 0]].map(([i, j]) => [i * CELL, j * CELL]);
const RTL = (() => { const l = [0]; for (let i = 1; i < RT.length; i++) l.push(l[i - 1] + Math.hypot(RT[i][0] - RT[i - 1][0], RT[i][1] - RT[i - 1][1])); return l; })();
function routeAt(u) {
  const d = clamp(u) * RTL[RTL.length - 1];
  for (let i = 1; i < RT.length; i++) if (d <= RTL[i] + 1e-6) { const q = (d - RTL[i - 1]) / (RTL[i] - RTL[i - 1]); return [lerp(RT[i - 1][0], RT[i][0], q), lerp(RT[i - 1][1], RT[i][1], q)]; }
  return RT[RT.length - 1];
}
const headU = t => P(t, 9.15, 2.25, E.ioC);
let CAM;
function setCam(t) {
  const desc = P(t, 8.7, 1.1, E.oC), hd = routeAt(headU(t));
  const tg = [lerp(0, hd[0], .45), 0, lerp(3.5 * CELL, hd[1], .45) + 60];
  const yaw = lerp(-.42, .18, P(t, 8.7, 3, E.ioC)), dist = lerp(1900, 1080, desc), hgt = lerp(2900, 1180, desc);
  const pos = [tg[0] - Math.sin(yaw) * dist, hgt, tg[2] - Math.cos(yaw) * dist];
  let f = [tg[0] - pos[0], tg[1] - pos[1], tg[2] - pos[2]]; const fl = Math.hypot(...f); f = f.map(v => v / fl);
  let r = [f[2], 0, -f[0]]; const rl = Math.hypot(...r); r = r.map(v => v / rl);
  const u = [f[1] * r[2] - f[2] * r[1], f[2] * r[0] - f[0] * r[2], f[0] * r[1] - f[1] * r[0]];
  CAM = { pos, f, r, u, F: 1150, cy: 1080 };
}
function P3(x, y, z) {
  const d0 = x - CAM.pos[0], d1 = y - CAM.pos[1], d2 = z - CAM.pos[2];
  const zc = d0 * CAM.f[0] + d1 * CAM.f[1] + d2 * CAM.f[2]; if (zc < 40) return null;
  const xc = d0 * CAM.r[0] + d1 * CAM.r[1] + d2 * CAM.r[2], yc = d0 * CAM.u[0] + d1 * CAM.u[1] + d2 * CAM.u[2];
  return [540 + CAM.F * xc / zc, CAM.cy - CAM.F * yc / zc, zc];
}
const mixc = (a, b, k) => a.map((v, i) => Math.round(lerp(v, b[i], k)));
function poly(c, ps, fill) { c.fillStyle = fill; c.beginPath(); c.moveTo(ps[0][0], ps[0][1]); for (let i = 1; i < ps.length; i++) c.lineTo(ps[i][0], ps[i][1]); c.closePath(); c.fill(); }
function mapLine(c, a, b, step, col, w, maxA) {
  const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[2] - a[2]) / step)); let prev = null;
  for (let i = 0; i <= n; i++) {
    const q = P3(lerp(a[0], b[0], i / n), lerp(a[1], b[1], i / n), lerp(a[2], b[2], i / n));
    if (q && prev) { const al = maxA * clamp(1 - (q[2] - 900) / 2600); if (al > .01) { c.strokeStyle = `rgba(${col},${al})`; c.lineWidth = w * clamp(1300 / q[2], .3, 1.6); c.beginPath(); c.moveTo(prev[0], prev[1]); c.lineTo(q[0], q[1]); c.stroke(); } }
    prev = q;
  }
}
function sceneMap(t) {
  const c = el('mapc').getContext('2d'); setCam(t);
  // sky / fog
  const sky = c.createLinearGradient(0, 0, 0, 1920); sky.addColorStop(0, '#120c0a'); sky.addColorStop(.35, '#0b0d12'); sky.addColorStop(1, '#07090d');
  c.fillStyle = sky; c.fillRect(0, 0, 1080, 1920);
  // lagoon
  const lx0 = LAG * CELL + 6, lx1 = (LAG + 1) * CELL - 6, wz0 = -9 * CELL, wz1 = 20 * CELL;
  for (let j = -9; j < 20; j++) {
    const a = P3(lx0, 0, j * CELL), b = P3(lx1, 0, j * CELL), d = P3(lx1, 0, (j + 1) * CELL), e = P3(lx0, 0, (j + 1) * CELL);
    if (a && b && d && e) { const al = clamp(1 - (a[2] - 900) / 2600); poly(c, [a, b, d, e], `rgba(16,52,78,${.9 * al})`); }
  }
  c.save(); c.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 14; k++) { const zz = wz0 + ((k * 211 + t * 90) % (wz1 - wz0)); mapLine(c, [lx0 + 20, 0, zz], [lx1 - 20, 0, zz + 30], 60, '120,190,230', 2, .22); }
  // streets
  c.lineCap = 'round';
  for (let i = -12; i <= 12; i++) { mapLine(c, [i * CELL, 0, -9 * CELL], [i * CELL, 0, 20 * CELL], CELL / 2, '40,120,170', 14, .16); mapLine(c, [i * CELL, 0, -9 * CELL], [i * CELL, 0, 20 * CELL], CELL / 2, '90,190,240', 3, .5); }
  for (let j = -9; j <= 20; j++) {
    const segs = [[-12 * CELL, LAG * CELL], [(LAG + 1) * CELL, 12 * CELL]];
    if (j % 4 === 1) segs.splice(0, 2, [-12 * CELL, 12 * CELL]);   // bridges over the lagoon
    for (const [xa, xb] of segs) { mapLine(c, [xa, 0, j * CELL], [xb, 0, j * CELL], CELL / 2, '40,120,170', 14, .16); mapLine(c, [xa, 0, j * CELL], [xb, 0, j * CELL], CELL / 2, '90,190,240', 3, .5); }
  }
  c.restore();
  // buildings (painter's algorithm)
  const hd = routeAt(headU(t)), cp = CAM.pos, list = [];
  for (const b of BLD) {
    const mx = (b[0] + b[1]) / 2, mz = (b[2] + b[3]) / 2, q = P3(mx, b[4] / 2, mz);
    if (!q || q[0] < -260 || q[0] > 1340 || q[1] < -260 || q[1] > 2200) continue;
    list.push([q[2], b, mx, mz]);
  }
  list.sort((a, b) => b[0] - a[0]);
  for (const [dz, b, mx, mz] of list) {
    const [x0, x1, z0, z1, h, tone] = b;
    const fog = clamp((dz - 1000) / 2600), lit = Math.exp(-((mx - hd[0]) ** 2 + (mz - hd[1]) ** 2) / (2 * 190 ** 2)) * (t > 9.1 ? 1 : 0);
    const col = (base) => { let v = base.map(x => x * tone); v = mixc(v, [255, 120, 30], lit * .55); v = mixc(v, [10, 12, 16], fog); return `rgb(${v[0]},${v[1]},${v[2]})`; };
    const p = (x, y, z) => P3(x, y, z);
    const faces = [];
    if (cp[0] < x0) faces.push([[x0, 0, z0], [x0, 0, z1], [x0, h, z1], [x0, h, z0], [34, 41, 52]]);
    if (cp[0] > x1) faces.push([[x1, 0, z0], [x1, 0, z1], [x1, h, z1], [x1, h, z0], [34, 41, 52]]);
    if (cp[2] < z0) faces.push([[x0, 0, z0], [x1, 0, z0], [x1, h, z0], [x0, h, z0], [26, 31, 40]]);
    if (cp[2] > z1) faces.push([[x0, 0, z1], [x1, 0, z1], [x1, h, z1], [x0, h, z1], [26, 31, 40]]);
    faces.push([[x0, h, z0], [x1, h, z0], [x1, h, z1], [x0, h, z1], [58, 68, 84]]);
    for (const fc of faces) { const ps = fc.slice(0, 4).map(v => p(...v)); if (ps.some(v => !v)) continue; poly(c, ps, col(fc[4])); }
    // rim light on the roof edge
    const e0 = p(x0, h, z0), e1 = p(x1, h, z0); if (e0 && e1 && fog < .8) { c.strokeStyle = `rgba(150,170,200,${.18 * (1 - fog)})`; c.lineWidth = 1; c.beginPath(); c.moveTo(e0[0], e0[1]); c.lineTo(e1[0], e1[1]); c.stroke(); }
  }
  // route
  const hu = headU(t), pts = [], N = 160;
  for (let i = 0; i <= N; i++) { const u = hu * i / N, g = routeAt(u), q = P3(g[0], 3, g[1]); if (q) pts.push([q[0], q[1], .55 + .45 * Math.pow(i / N, 3), 1]); }
  if (pts.length > 1) ribbon(c, null, pts, 8, 4);
  // start / end pins
  const A = P3(RT[0][0], 3, RT[0][1]), Bp = P3(RT[RT.length - 1][0], 3, RT[RT.length - 1][1]);
  const lab = (q, txt, a, dy) => { if (!q || a <= 0) return; c.save(); c.globalAlpha = a; c.font = '700 30px Inter'; const w = c.measureText(txt).width + 44; const x = q[0] - w / 2, y = q[1] - dy - 60;
    c.fillStyle = 'rgba(14,16,22,.85)'; c.beginPath(); c.roundRect(x, y, w, 56, 28); c.fill(); c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 1.5; c.stroke(); c.fillStyle = '#fff'; c.fillText(txt, x + 22, y + 39); c.restore(); };
  const ap = P(t, 9.0, .4);
  if (A) { c.fillStyle = `rgba(255,255,255,${ap})`; c.beginPath(); c.arc(A[0], A[1], 13, 0, 7); c.fill(); c.strokeStyle = `rgba(255,107,0,${ap})`; c.lineWidth = 6; c.stroke(); }
  lab(A, 'Maquis Chez Tanti', ap, 6);
  if (Bp) { const pu = (t * 1.6) % 1; c.strokeStyle = `rgba(255,107,0,${(1 - pu) * .8})`; c.lineWidth = 4; c.beginPath(); c.ellipse(Bp[0], Bp[1], 20 + pu * 70, (20 + pu * 70) * .55, 0, 0, 7); c.stroke();
    c.fillStyle = '#FF6B00'; c.beginPath(); c.arc(Bp[0], Bp[1], 15, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 5; c.stroke(); }
  lab(Bp, 'Haie Vive', P(t, 9.3, .4), 10);
  const H0 = P3(hd[0], 3, hd[1]); if (H0) { flare(c, H0[0], H0[1], 150, .95); c.fillStyle = '#fff'; c.beginPath(); c.arc(H0[0], H0[1], 9, 0, 7); c.fill(); }
  // tracker
  const tk = P(t, 9.0, .5, E.oQ), tx = 1 - P(t, 11.3, .22, E.iC);
  el('trk').style.transform = `translateY(${(1 - tk) * -60}px)`; el('trk').style.opacity = tk * tx;
  const fills = [1, 1, hu, P(t, 11.25, .15)];
  fills.forEach((v, i) => { el('tb' + i).style.width = `${v * 100}%`; el('tl' + i).style.color = v > .02 ? '#FFB27A' : '#8A90A2'; });
  el('eta').textContent = Math.max(1, Math.round(lerp(12, 1, hu)));
}

/* ---------- the rider ---------- */
const BOK = (() => { const r = rng(31); return Array.from({ length: 46 }, () => [r() * 1600, 300 + r() * 1300, 10 + r() * 60, r() < .6 ? '255,150,60' : '255,230,200', .25 + r() * .6, .5 + r()]); })();
const motoX = t => KF(t, [[11.55, 1600], [11.98, 600], [12.14, 500], [12.5, -800]], E.ioC);
function sceneMoto(t) {
  const c = el('mtc').getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0a0706'); g.addColorStop(.5, '#1c100a'); g.addColorStop(1, '#080605'); c.fillStyle = g; c.fillRect(0, 0, 1080, 1920);
  c.save(); c.globalCompositeOperation = 'lighter';
  for (const [x, y, r, col, a, sp] of BOK) {
    const xx = ((x + (t - 11.5) * 2600 * sp) % 1700) - 300, gr = c.createRadialGradient(xx, y, 0, xx, y, r);
    gr.addColorStop(0, `rgba(${col},${a * .5})`); gr.addColorStop(.7, `rgba(${col},${a * .25})`); gr.addColorStop(1, `rgba(${col},0)`); c.fillStyle = gr; c.fillRect(xx - r * 3, y - r, r * 6, r * 2);
  }
  // road with reflections
  const rg = c.createLinearGradient(0, 1250, 0, 1920); rg.addColorStop(0, 'rgba(255,120,40,.12)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = rg; c.fillRect(0, 1250, 1080, 670);
  const r = rng(77);
  for (let k = 0; k < 26; k++) { const y = 1260 + r() * 600, x = ((r() * 2000 + (t - 11.5) * 4200) % 2200) - 600, l = 160 + r() * 380; c.strokeStyle = `rgba(255,${150 + r() * 90},90,${.12 + r() * .2})`; c.lineWidth = 2 + r() * 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + l, y); c.stroke(); }
  c.restore();
  const x = motoX(t), v = (motoX(t) - motoX(t - 1 / 48)) * 48, w = 1040, h = w * 690 / 930, y = 1265 - h;
  // light trail from the delivery box
  const tr = []; for (let i = 0; i <= 40; i++) tr.push([x + 300 + i * 22 * clamp(Math.abs(v) / 2500, .3, 1.6), y + 190 + Math.sin(i * .2) * 6, Math.pow(1 - i / 40, 1.5) * .9, 1]);
  ribbon(c, null, tr.reverse(), 9);
  const blur = clamp(Math.abs(v) / 2600, 0, 1);
  for (let k = 4; k >= 1; k--) { c.globalAlpha = .13 * blur; c.drawImage(IMG.moto, x - w / 2 + k * 26 * blur, y, w, h); }
  c.globalAlpha = 1; c.drawImage(IMG.moto, x - w / 2, y, w, h);
  // ground shadow
  const sg = c.createRadialGradient(x, 1265, 0, x, 1265, 420); sg.addColorStop(0, 'rgba(0,0,0,.55)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
  c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = sg; c.fillRect(x - 420, 1235, 840, 60); c.restore();
}

/* ---------- the dish on the table ---------- */
function sceneTable(t, cf, cb) {
  const zs = lerp(1, 1.08, P(t, 12.45, 2.3, E.lin)), tf = `translate(${540 * (1 - zs)}px,${1000 * (1 - zs)}px) scale(${zs})`;
  el('tabimg').style.transform = tf; el('tgrp').style.transform = tf;
  for (const c of [cf, cb]) c.setTransform(zs, 0, 0, zs, 540 * (1 - zs), 1000 * (1 - zs));
  const land = P(t, 12.45, .4, E.oB);
  el('tplat').style.transform = `translateY(${(1 - land) * -70}px) scale(${lerp(1.06, 1, land)})`;
  el('tshad').style.opacity = .3 + .7 * land;
  // landing ring of light on the table
  const rp = P(t, 12.6, .7, E.oC);
  if (rp > 0 && rp < 1) { cf.save(); cf.globalCompositeOperation = 'lighter'; cf.strokeStyle = `rgba(255,140,40,${(1 - rp) * .7})`; cf.lineWidth = 6; cf.beginPath(); cf.ellipse(540, 1215, 200 + rp * 420, (200 + rp * 420) * .2, 0, 0, 7); cf.stroke(); cf.restore(); }
  // ribbon wrapping the box
  const h = KF(t, [[12.55, 0], [13.45, 1]], E.ioC), fade = 1 - P(t, 13.4, .5, E.lin);
  if (t > 12.5 && fade > 0) {
    const pts = trail(u => { const th = Math.PI - u * Math.PI * 2.3; return [540 + 430 * Math.cos(th), 1105 - 70 * u + 105 * Math.sin(th), Math.sin(th)]; }, h, .38, 140, fade);
    ribbon(cf, cb, pts, 9);
    const hd = pts[pts.length - 1]; if (hd) flare(hd[3] > 0 ? cf : cb, hd[0], hd[1], 130, fade);
  }
  const lg = P(t, 12.78, .3, E.oC);
  el('tlogo').style.opacity = lg; el('tlogo').style.filter = `brightness(${1 + 1.6 * (1 - lg)})`;
  for (const c of [cf, cb]) c.setTransform(1, 0, 0, 1, 0, 0);
  const nk = P(t, 13.45, .55, E.oB);
  el('notif').style.transform = `translateY(${(1 - nk) * -300}px) scale(${lerp(.92, 1, nk)})`; O('notif', t > 13.4 ? 1 : 0);
}

/* ---------- slogans ---------- */
function textIn(id, t, t0, t1) {
  const ws = el(id).querySelectorAll('.tw');
  ws.forEach((w, i) => { const p = P(t, t0 + i * .11, .55, E.oQ), o = P(t, t1 - .25 + i * .03, .25, E.iC);
    w.style.opacity = p * (1 - o); w.style.transform = `translateY(${(1 - p) * 40 - o * 30}px)`; w.style.filter = `blur(${(1 - p) * 16 + o * 14}px)`; });
}
function sceneText(t, cf) {
  if (t >= 14.6 && t < 16.3) {
    textIn('tx1', t, 14.7, 16.3); O('tx1', 1);
    const h = P(t, 15.1, .7, E.ioC), fade = 1 - P(t, 15.9, .4, E.lin);
    const pts = trail(u => [lerp(190, 890, u), 1092 + Math.sin(u * Math.PI) * 14, 1], h, h, 90, fade, .8);
    ribbon(cf, null, pts, 7); const hd = pts[pts.length - 1]; if (hd && h < 1) flare(cf, hd[0], hd[1], 130, fade);
  } else O('tx1', 0);
  if (t >= 16.3 && t < 17.8) {
    textIn('tx2', t, 16.35, 17.85); O('tx2', 1);
    const h = P(t, 16.75, .65, E.ioC), fade = 1 - P(t, 17.5, .3, E.lin);
    const sm = u => [lerp(200, 880, u), 1110 + Math.sin(u * Math.PI) * 80 - u * 20, 1];
    const pts = trail(sm, h, h, 100, fade, .7); ribbon(cf, null, pts, 9);
    if (h > .97) { const e = sm(1), a = fade; ribbon(cf, null, [[e[0] - 46, e[1] - 30, a], [e[0], e[1], a], [e[0] - 40, e[1] + 30, a]], 9, 1); }
    const hd = pts[pts.length - 1]; if (hd && h < 1) flare(cf, hd[0], hd[1], 150, fade);
  } else O('tx2', 0);
}

/* ---------- end card ---------- */
function sceneEnd(t, cf) {
  const h = P(t, 17.85, .55, E.ioC);
  const sm = u => [lerp(250, 830, u), 1078 + Math.sin(u * Math.PI) * 70 - u * 16, 1];
  const pts = trail(sm, h, h, 100, 1, .5); ribbon(cf, null, pts, 9);
  if (h > .97) { const e = sm(1); ribbon(cf, null, [[e[0] - 46, e[1] - 30, 1], [e[0], e[1], 1], [e[0] - 40, e[1] + 30, 1]], 9, 1); }
  const hd = pts[pts.length - 1]; if (hd && h < 1) flare(cf, hd[0], hd[1], 160, 1);
  const lp = P(t, 18.05, .6, E.oB);
  el('elogo').style.transform = `scale(${lerp(.55, 1, lp)})`; el('elogo').style.opacity = clamp(lp * 1.5); el('elogo').style.filter = `drop-shadow(0 0 50px rgba(255,107,0,.55)) blur(${(1 - clamp(lp)) * 14}px)`;
  const wp = P(t, 18.2, .55, E.oQ);
  el('eword').style.clipPath = `inset(-20% ${100 - wp * 100}% -20% 0)`;
  const cp = P(t, 18.75, .5, E.oQ); el('ecta').style.opacity = cp; el('ecta').style.transform = `translateY(${(1 - cp) * 30}px)`;
  for (let i = 0; i < 2; i++) { const p = P(t, 18.95 + i * .12, .5, E.oB); el('est' + i).style.opacity = clamp(p); el('est' + i).style.transform = `translateY(${(1 - p) * 60}px)`; }
}

/* ---------- master ---------- */
const SPANS = { sA: [0, 5.45, 6.75, 8.35], sHero: [5.4, 6.8], mapc: [8.6, 11.6], mtc: [11.55, 12.5], sTab: [12.45, 14.65], sTobj: [12.45, 14.65], sEnd: [17.75, 20.5] };
const on = (k, t) => { const s = SPANS[k]; for (let i = 0; i < s.length; i += 2) if (t >= s[i] && t < s[i + 1]) return true; return false; };
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'), cb = el('rbb').getContext('2d');
  cf.setTransform(1, 0, 0, 1, 0, 0); cb.setTransform(1, 0, 0, 1, 0, 0); cf.clearRect(0, 0, 1080, 1920); cb.clearRect(0, 0, 1080, 1920);
  for (const k in SPANS) el(k).style.display = on(k, t) ? 'block' : 'none';
  el('bg').style.opacity = KF(t, [[0, .55], [.8, 1], [8.3, 1], [8.7, 0], [14.6, 0], [14.9, .7], [20.5, .7]], E.lin);
  if (on('sA', t) || (t > 7.6 && t < 9)) sceneA(t, cf, cb);
  if (on('sHero', t)) sceneHero(t, cf);
  if (on('mapc', t)) { sceneMap(t); el('mapc').style.opacity = P(t, 8.6, .35, E.lin); }
  el('trk').style.display = t >= 9 && t < 11.55 ? 'block' : 'none';
  if (on('mtc', t)) sceneMoto(t);
  if (on('sTab', t)) sceneTable(t, cf, cb);
  el('notif').style.display = t >= 13.4 && t < 14.65 ? 'flex' : 'none';
  sceneText(t, cf);
  if (on('sEnd', t)) sceneEnd(t, cf);
  // cut flashes
  let fl = 0;
  for (const [a, d, m] of [[5.32, .35, 1], [8.66, .32, .55], [11.45, .22, .6], [12.42, .25, .7]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .35, E.lin), P(t, 20.1, .4, E.lin)));
  const R = rng(Math.floor(t * 24) + 1); el('grain').style.transform = `translate(${-R() * 100}px,${-R() * 100}px)`;
};
