/* ============================================================
   OJA chauffeurs — « Arrête de tourner à vide », version éditoriale (magazine), 9:16, 25 s, same voice as
   chv_body.js (assets/chv/voix_chauffeur_vide.mp3, from 0.5 s).
   Full-screen portraits of three OJA drivers (moto, tricycle, car; generated with ElevenLabs, said in the mention),
   serif headlines (Playfair Display), fine chapter labels « N° 01 », hairlines, ivory cards, mask wipes.
   Same live benefits only, no amount: clients find you, price fixed before the ride, hot zones, the statement.
   ============================================================ */
const VO = 0.5;
const PRE = [];
// voice timings (seconds in the voice file), injected by edt_build.py from assets/chv/voix_chauffeur_vide.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 25.0;
const BK = '#0B0B0C', IV = '#F4EFE6', MU = '#B9B1A6';
const SERIF = "'Playfair Display',serif", THIN = "'Inter Tight',Inter,sans-serif";
// photos: [file, focal x %, focal y %]
const PH = { moto: ['assets/edt/moto.jpg', 50, 55], tri: ['assets/edt/tricycle.jpg', 50, 55], car: ['assets/edt/voiture.jpg', 50, 55] };
const em = s => `<em style="font-style:italic;color:${OR}">${s}</em>`;
const photo = (id, k) => `<div id="${id}" class="lay" style="overflow:hidden;display:none"><img id="${id}i" src="${PH[k][0]}" class="abs" style="left:0;top:0;width:1080px;height:1920px;object-fit:cover;object-position:${PH[k][1]}% ${PH[k][2]}%;transform-origin:50% 60%">
<div class="lay" style="background:linear-gradient(rgba(11,11,12,.55),rgba(11,11,12,0) 22%,rgba(11,11,12,0) 50%,rgba(11,11,12,.88) 82%,rgba(11,11,12,.96))"></div></div>`;
// a headline made of lines that rise out of a mask, bottom-left aligned
const lines = (id, arr, top, size = 104, col = IV) => `<div id="${id}" class="abs" style="left:70px;right:70px;top:${top}px;font:500 ${size}px ${SERIF};line-height:1.04;letter-spacing:-.01em;color:${col};visibility:hidden">${arr.map((l, i) => `<div style="overflow:hidden;padding-bottom:.08em"><div id="${id}l${i}">${l}</div></div>`).join('')}</div>`;
const sub = (id, txt, top, col = IV) => `<div id="${id}" class="abs" style="left:72px;right:70px;top:${top}px;font:300 38px ${THIN};color:${col};letter-spacing:.01em;opacity:0">${txt}</div>`;
const chap = (id, n, label, col = IV) => `<div id="${id}" class="abs" style="left:72px;top:150px;display:flex;align-items:center;gap:22px;font:500 24px ${THIN};letter-spacing:.32em;color:${col};visibility:hidden"><span>N° ${n}</span><span id="${id}r" style="display:block;height:1px;width:110px;background:${col};transform-origin:0 50%"></span><span>${label}</span></div>`;
const ROWS = ['07 h 42', '08 h 15', '09 h 03', '10 h 20'];
H += `<div id="bg" class="lay" style="background:${BK}"></div>
${photo('pA', 'moto')}${photo('pB', 'tri')}${photo('pC', 'car')}
<div id="sMap" class="lay" style="display:none;background:${IV}"><canvas id="mapc" class="lay" width="1080" height="1920"></canvas></div>
<div id="pD" class="lay" style="overflow:hidden;display:none"><img id="pDi" src="assets/edt/moto2.jpg" class="abs" style="left:0;top:0;width:1080px;height:1920px;object-fit:cover;object-position:${PH.moto[1]}% ${PH.moto[2]}%;filter:brightness(.42) saturate(.8)"></div>
<div id="rcpt" class="abs" style="left:150px;top:470px;width:780px;padding:46px 54px 40px;background:${IV};color:${BK};box-shadow:0 50px 100px rgba(0,0,0,.55);visibility:hidden">
<div style="font:500 26px ${THIN};letter-spacing:.32em;color:#7a736b">OJA · CHAUFFEUR</div>
<div style="font:500 66px ${SERIF};margin-top:8px">Relevé du jour</div>
<div style="height:1px;background:${BK};opacity:.25;margin:26px 0 8px"></div>
${ROWS.map((h, i) => `<div id="rr${i}" style="display:flex;align-items:center;gap:16px;height:84px;font:400 34px ${THIN};visibility:hidden"><span>Course · ${h}</span><span style="flex:1;border-bottom:2px dotted rgba(11,11,12,.3);transform:translateY(8px)"></span><span style="width:120px;height:30px;border-radius:4px;background:rgba(11,11,12,.16);filter:blur(2px)"></span></div>`).join('')}
<div style="height:1px;background:${BK};opacity:.25;margin:14px 0"></div>
<div id="rtot" style="display:flex;align-items:center;gap:16px;font:500 40px ${SERIF};visibility:hidden"><span>Total</span><span style="flex:1"></span><span style="width:190px;height:40px;border-radius:4px;background:${OR};opacity:.55;filter:blur(2.5px)"></span></div>
<div style="font:300 22px ${THIN};color:#8a837a;margin-top:22px">Montants masqués</div></div>
<div id="tri3" class="lay" style="display:none">${[['moto', 'Moto'], ['tri', 'Tricycle'], ['car', 'Voiture']].map(([k, n], i) => `<div id="t3${i}" class="abs" style="left:${i * 360}px;top:0;width:360px;height:1920px;overflow:hidden;border-right:${i < 2 ? `2px solid ${BK}` : 'none'}"><img src="${PH[k][0]}" class="abs" style="left:-360px;top:0;width:1080px;height:1920px;object-fit:cover;object-position:${PH[k][1]}% ${PH[k][2]}%">
<div class="lay" style="width:360px;background:linear-gradient(rgba(11,11,12,.7),rgba(11,11,12,0) 26%,rgba(11,11,12,0) 50%,rgba(11,11,12,.93) 68%,rgba(11,11,12,.97))"></div>
<div class="abs" style="left:0;right:0;top:250px;text-align:center;font:500 26px ${THIN};letter-spacing:.32em;color:${IV}">${n.toUpperCase()}</div></div>`).join('')}</div>
<div id="tk" class="abs" style="left:560px;top:300px;width:440px;padding:26px 30px;background:${IV};color:${BK};box-shadow:0 30px 70px rgba(0,0,0,.45);visibility:hidden">
<div style="display:flex;align-items:center;gap:14px;font:500 22px ${THIN};letter-spacing:.28em;color:#7a736b">${ic('lock', 26, '#7a736b', 2)}PRIX FIXÉ</div>
<div style="font:500 40px ${SERIF};margin-top:10px">avant le départ</div>
<div style="display:flex;gap:12px;margin-top:18px">${[150, 90, 60].map(w => `<div style="width:${w}px;height:16px;background:rgba(11,11,12,.12)"></div>`).join('')}</div></div>
<canvas id="fx" class="lay" width="1080" height="1920"></canvas>
<div id="brand" class="abs" style="left:72px;right:72px;top:1800px;display:flex;justify-content:space-between;font:500 22px ${THIN};letter-spacing:.32em;color:${IV};opacity:.75"><span>OJA — CHAUFFEURS</span><span id="pg">01 / 05</span></div>
${chap('c0', '00', 'CHAUFFEURS OJA')}${chap('c1', '01', 'LES CLIENTS')}${chap('c2', '02', 'LE PRIX')}${chap('c3', '03', 'ZONES CHAUDES', BK)}${chap('c4', '04', 'LE RELEVÉ')}${chap('c5', '05', 'TOUS LES VÉHICULES')}
${lines('h0', ['Arrête de', `tourner ${em('à vide.')}`], 1330, 118)}
${lines('h1', ['Les clients', em('te trouvent.')], 1380, 112)}
${lines('h2', ['Le prix est fixé', em('avant le départ.')], 1380, 100)}${sub('s2', 'Plus de bagarre pour le prix.', 1620)}
${lines('h3', ['Là où les clients', em('attendent.')], 1330, 100, BK)}${sub('s3', 'Moins d\'essence brûlée à chercher.', 1570, BK)}
${lines('h4', ['Tout ce que', em('tu gagnes.')], 1380, 108)}${sub('s4', 'Course par course, dans ton relevé.', 1620)}
${lines('h5', ['Moto, tricycle', em('ou voiture.')], 1380, 104)}${lines('h6', [em('Inscris-toi'), 'sur OJA.'], 1380, 112)}
<div id="sEnd" class="lay" style="display:none;background:${IV};color:${BK}">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:420px;top:300px;width:240px;height:240px">
<div id="eword" class="abs" style="left:0;right:0;top:560px;text-align:center;font:900 120px Poppins;letter-spacing:-.03em;line-height:1">OJA</div>
<div id="eslo" class="abs" style="left:0;right:0;top:730px;text-align:center;font:500 92px ${SERIF};line-height:1.05">On roule<br>${em('ensemble.')}</div>
<div id="erule" class="abs" style="left:440px;top:1000px;width:200px;height:1px;background:${BK};transform-origin:50% 50%"></div>
<div id="ecta" class="abs" style="left:0;right:0;top:1040px;text-align:center;font:500 28px ${THIN};letter-spacing:.34em">DEVIENS CHAUFFEUR OJA</div>
${[['phone', 'Télécharger sur', 'App Store', 150], ['play', 'Disponible sur', 'Google Play', 560]].map(([icn, sm, big, x], i) => `<div id="est${i}" class="abs" style="left:${x}px;top:1180px;width:370px;height:112px;border:2px solid ${BK};display:flex;align-items:center;gap:18px;padding:0 28px">${ic(icn, 46, BK, 1.8)}<div><div style="font:400 20px ${THIN};opacity:.7">${sm}</div><div style="font:500 36px ${SERIF};line-height:1.1">${big}</div></div></div>`).join('')}
<div id="emen" class="abs" style="left:90px;right:90px;top:1640px;text-align:center;font:300 24px ${THIN};color:#6f685f;line-height:1.45">Zones chaudes : l'appli montre où sont les clients. Prix de la course calculé avant le départ. Montants du relevé masqués. Chauffeurs des photos générés par IA.</div></div>
<div id="fade"></div>`;
stage.innerHTML = H;

/* ---------- helpers ---------- */
function rise(id, t, a, b, n) {        // lines rise out of their mask one after the other, then slide away
  const e = el(id); e.style.visibility = t >= a && t < b ? 'visible' : 'hidden'; if (t < a || t >= b) return;
  const q = P(t, b - .35, .35, E.iC);
  for (let i = 0; i < n; i++) { const p = P(t, a + i * .12, .6, E.oQ); el(id + 'l' + i).style.transform = `translateY(${(1 - p) * 110 - q * 110}%)`; }
}
function fadeSub(id, t, a, b) { const p = P(t, a, .5, E.oQ) * (1 - P(t, b - .3, .3)); el(id).style.opacity = p; el(id).style.transform = `translateY(${(1 - P(t, a, .5, E.oQ)) * 20}px)`; }
function chapter(id, t, a, b) {
  const e = el(id); e.style.visibility = t >= a && t < b ? 'visible' : 'hidden'; if (t < a || t >= b) return;
  const p = P(t, a, .5, E.oQ), q = P(t, b - .3, .3); e.style.opacity = p * (1 - q); el(id + 'r').style.transform = `scaleX(${P(t, a + .1, .7, E.ioC)})`;
}
function wipe(id, t, a, b, push = [1.0, 1.08]) {   // photo revealed from the bottom by a mask, slow push-in
  const e = el(id), on = t >= a && t < b; e.style.display = on ? 'block' : 'none'; if (!on) return;
  const p = P(t, a, .75, E.ioC); e.style.clipPath = `inset(${(1 - p) * 100}% 0 0 0)`;
  el(id + 'i').style.transform = `scale(${lerp(push[0], push[1], clamp((t - a) / (b - a)))}) translateY(${(1 - p) * 60}px)`;
}
function hair(c, t, a, y, col) {       // a hairline drawn across the frame on each chapter change
  const p = P(t, a, .6, E.ioC), q = P(t, a + .6, .4); if (p <= 0 || q >= 1) return;
  c.save(); c.globalAlpha = 1 - q; c.fillStyle = col; c.fillRect(0, y, 1080 * p, 2); c.restore();
}

/* ---------- the map: fine-line cartography on ivory paper ---------- */
function sceneMap(t) {
  const c = el('mapc').getContext('2d'); c.fillStyle = IV; c.fillRect(0, 0, 1080, 1920);
  const R = rng(23), dp = P(t, V('zones') - .1, 1.2, E.oQ);
  c.strokeStyle = 'rgba(11,11,12,.16)';
  for (let i = 0; i < 22; i++) { c.lineWidth = R() < .2 ? 3 : 1.2; const y = 200 + R() * 1300; c.beginPath(); c.moveTo(-40, y); c.lineTo(-40 + 1160 * dp, y - 300 * dp + (R() - .5) * 60); c.stroke(); }
  for (let i = 0; i < 18; i++) { c.lineWidth = R() < .2 ? 3 : 1.2; const x = R() * 1080; c.beginPath(); c.moveTo(x, 180); c.lineTo(x + 320 * dp, 180 + 1400 * dp); c.stroke(); }
  c.strokeStyle = 'rgba(11,11,12,.35)'; c.lineWidth = 2; c.strokeRect(60, 230, 960, 1040);
  const Z = [[300, 480, 'Dantokpa'], [770, 600, 'Akpakpa'], [400, 900, 'Ganhi'], [820, 1080, 'Cadjèhoun']];
  Z.forEach(([x, y, n], i) => { const p = P(t, V('zones') + .3 + i * .22, .7, E.oQ); if (p <= 0) return;
    const pul = 1 + .06 * Math.sin(t * 3.5 + i), rr = 150 * p * pul, g = c.createRadialGradient(x, y, 0, x, y, rr);
    g.addColorStop(0, 'rgba(255,107,0,.42)'); g.addColorStop(1, 'rgba(255,107,0,0)'); c.fillStyle = g; c.fillRect(x - rr, y - rr, rr * 2, rr * 2);
    c.fillStyle = OR; c.beginPath(); c.arc(x, y, 9 * p, 0, Math.PI * 2); c.fill();
    c.globalAlpha = p; c.font = `italic 500 40px ${SERIF}`; c.fillStyle = BK; c.textAlign = 'left'; c.fillText(n, x + 26, y - 18); c.globalAlpha = 1; });
  // the driver's route to Ganhi, a thin orange line
  const k = P(t, V('attendent'), 1.5, E.ioC), sx = 120, sy = 1220, ex = 400, ey = 900;
  if (k > 0) { c.strokeStyle = OR; c.lineWidth = 5; c.setLineDash([]); c.beginPath();
    for (let i = 0; i <= 40; i++) { const u = k * i / 40, x = lerp(sx, ex, u) + Math.sin(u * Math.PI) * 90, y = lerp(sy, ey, u); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
    const x = lerp(sx, ex, k) + Math.sin(k * Math.PI) * 90, y = lerp(sy, ey, k); c.fillStyle = BK; c.beginPath(); c.arc(x, y, 16, 0, Math.PI * 2); c.fill(); c.fillStyle = IV; c.beginPath(); c.arc(x, y, 6, 0, Math.PI * 2); c.fill(); }
  el('sMap').style.clipPath = `inset(${(1 - P(t, V('zones') - .15, .75, E.ioC)) * 100}% 0 0 0)`;
}
function sceneEnd(t) {
  const a = V('endA') - .3, p = P(t, a, .8, E.ioC); el('sEnd').style.clipPath = `inset(${(1 - p) * 100}% 0 0 0)`;
  const lp = P(t, V('endA'), .7, E.oQ); el('elogo').style.opacity = lp; el('elogo').style.transform = `translateY(${(1 - lp) * 30}px)`;
  el('eword').style.clipPath = `inset(-20% ${100 - P(t, V('endA') + .1, .6, E.oQ) * 100}% -20% 0)`;
  const sp = P(t, V('endB'), .7, E.oQ); el('eslo').style.opacity = sp; el('eslo').style.transform = `translateY(${(1 - sp) * 30}px)`;
  el('erule').style.transform = `scaleX(${P(t, V('endB') + .6, .7, E.ioC)})`;
  const cp = P(t, V('endB') + 1.0, .6, E.oQ); el('ecta').style.opacity = cp;
  for (let i = 0; i < 2; i++) { const q = P(t, V('endB') + 1.3 + i * .15, .6, E.oQ); el('est' + i).style.opacity = q; el('est' + i).style.transform = `translateY(${(1 - q) * 30}px)`; }
  O('emen', P(t, V('endB') + 1.8, .6));
}

/* ---------- master ---------- */
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'); cf.clearRect(0, 0, 1080, 1920);
  const T1 = V('trouvent') - .1, T2 = V('prix') - .1, T3 = V('zones') - .15, T4 = V('gagnes') - .1, T5 = V('vehic') - .1, T6 = V('endA') - .3;
  wipe('pA', t, 0, T1 + .8, [1.12, 1.0]); if (t < .75) el('pA').style.clipPath = 'none';
  wipe('pB', t, T1, T2 + .8); wipe('pC', t, T2, T3 + .8, [1.0, 1.06]);
  el('sMap').style.display = t >= T3 && t < T4 + .8 ? 'block' : 'none'; if (el('sMap').style.display === 'block') sceneMap(t);
  // statement: dimmed portrait, ivory receipt
  el('pD').style.display = t >= T4 && t < T5 + .8 ? 'block' : 'none';
  if (el('pD').style.display === 'block') { el('pD').style.clipPath = `inset(${(1 - P(t, T4, .75, E.ioC)) * 100}% 0 0 0)`; el('pDi').style.transform = `scale(${lerp(1.15, 1.05, clamp((t - T4) / 3.5))})`; }
  const rp = P(t, V('gagnes') + .2, .7, E.oQ), rq = P(t, T5 - .2, .35, E.iC), r = el('rcpt');
  r.style.visibility = t >= V('gagnes') + .2 && t < T5 + .2 ? 'visible' : 'hidden'; r.style.opacity = rp * (1 - rq); r.style.transform = `translateY(${(1 - rp) * 80}px) rotate(${lerp(-3, -1.2, rp)}deg)`;
  ROWS.forEach((_, i) => { const a = V('gagnes') + .7 + i * .3, p = P(t, a, .4, E.oQ), e = el('rr' + i); e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.opacity = p; });
  el('rtot').style.visibility = t >= V('releve') - .6 ? 'visible' : 'hidden'; el('rtot').style.opacity = P(t, V('releve') - .6, .5);
  // triptych: three strips slide in one after another
  el('tri3').style.display = t >= T5 && t < T6 + .9 ? 'block' : 'none';
  [0, 1, 2].forEach(i => { const p = P(t, T5 + i * .22, .7, E.ioC); el('t3' + i).style.clipPath = `inset(${i % 2 ? 0 : (1 - p) * 100}% 0 ${i % 2 ? (1 - p) * 100 : 0}% 0)`; });
  // the ticket next to the car driver
  const kp = P(t, V('prix') + .4, .6, E.oQ), kq = P(t, T3 - .1, .3); el('tk').style.visibility = t >= V('prix') + .4 && t < T3 + .2 ? 'visible' : 'hidden';
  el('tk').style.opacity = kp * (1 - kq); el('tk').style.transform = `translateY(${(1 - kp) * 40}px)`;
  // chapter labels, hairlines, headlines
  chapter('c0', t, .2, T1); chapter('c1', t, T1 + .3, T2); chapter('c2', t, T2 + .3, T3); chapter('c3', t, T3 + .3, T4); chapter('c4', t, T4 + .3, T5); chapter('c5', t, T5 + .3, T6);
  [T1, T2, T3, T4, T5].forEach(a => hair(cf, t, a + .1, 1300, t >= T3 && t < T4 ? BK : IV));
  rise('h0', t, V('hook') - .1, T1, 2); rise('h1', t, V('trouvent') + .05, T2, 2); rise('h2', t, V('prix') + .05, T3, 2); fadeSub('s2', t, V('bagarre'), T3);
  rise('h3', t, V('zones') + .15, T4, 2); fadeSub('s3', t, V('essence'), T4); rise('h4', t, V('gagnes') + .05, T5, 2); fadeSub('s4', t, V('releve') - .9, T5);
  rise('h5', t, V('vehic') + .1, V('inscris') - .05, 2); rise('h6', t, V('inscris'), T6, 2);
  const onMap = t >= T3 + .4 && t < T4; el('brand').style.color = onMap ? BK : IV; el('brand').style.opacity = t < T6 ? .75 : 0;
  el('pg').textContent = `0${t < T1 ? 0 : t < T2 ? 1 : t < T3 ? 2 : t < T4 ? 3 : t < T5 ? 4 : 5} / 05`;
  el('sEnd').style.display = t >= T6 ? 'block' : 'none'; if (t >= T6) sceneEnd(t);
  O('fade', Math.max(1 - P(t, 0, .25, E.lin), P(t, DUR2 - .45, .45, E.lin)));
};
