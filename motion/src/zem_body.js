/* ============================================================
   OJA — « Zémidjan, avec OJA ça change », awareness film for motorcycle-taxi drivers, 9:16 (1080 × 1920), 57 s,
   voice: Isac (assets/zem/voix_zem.mp3, from 0.6 s).
   New « reportage » style, after the street post the team sent: full-bleed photos with a slow push-in, big uppercase
   lines (white, then zem yellow), a small letter-spaced kicker, hard cuts with a short flash. One generated zem
   (yellow Cotonou shirt, no readable number or plate) in every shot.
   Story, built on the contrast the team asked for: before, he struggles (rides around empty under the sun, waits at the
   junction, dull dusty grade); with OJA it is easy (he waits calmly in the shade, the client orders, the ride arrives, he
   goes straight to the client who gets on: no more riding around empty, vivid grade). Then hot zones, sign-up from the
   phone (the real two steps and documents of the driver app), the formula (without pass: OJA takes a commission on each
   ride; unlimited pass for 1 day, 1 week or 1 month: 0 % commission).
   No amount (pass prices and the commission rate are set by OJA for Benin), no payout channel named.
   ============================================================ */
const VO = 0.6, DUR2 = 57.0, FW = 1080, HH = 1920;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const PH = { vide: imgL('assets/zem/h_vide.jpg'), attente: imgL('assets/zem/h_attente.jpg'), tranquille: imgL('assets/zem/h_tranquille.jpg'), phone: imgL('assets/zem/h_phone.jpg'), rejoint: imgL('assets/zem/h_rejoint.jpg'),
  client: imgL('assets/zem/h_client.jpg'), trafic: imgL('assets/zem/h_trafic.jpg'), papiers: imgL('assets/zem/h_papiers.jpg'), fin: imgL('assets/zem/h_fin.jpg') };
// the struggle (before OJA) is graded dull and dusty; everything after « Avec OJA, ça change » is vivid
const DULL = { vide: 1, attente: 1 };
// voice timings (seconds in the voice file), injected by zem_build.py from assets/zem/voix_zem.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const YE = '#FFC400', OJ = '#FF6B00', GR = '#12B76A';

/* ---------- reportage text: kicker + big uppercase lines that rise out of a mask ---------- */
const TX = {};
const title = (id, kicker, l1, l2, y = 1160, size = 100) => { TX[id] = 1; return `<div id="${id}" class="abs" style="left:64px;right:150px;top:${y}px;visibility:hidden">
${kicker ? `<div class="k" style="display:flex;align-items:center;gap:16px;font:700 32px Poppins;letter-spacing:.34em;color:${YE};margin-bottom:18px"><span style="width:46px;height:6px;background:${YE};border-radius:3px"></span>${kicker}</div>` : ''}
${[l1, l2].filter(Boolean).map((s, i) => `<div style="overflow:hidden;padding-bottom:6px"><div class="ln" style="font:900 ${size}px Poppins;line-height:1.0;letter-spacing:-.01em;text-transform:uppercase;color:${i ? YE : '#fff'};text-shadow:0 6px 30px rgba(0,0,0,.45)">${s}</div></div>`).join('')}</div>`; };
const TCACHE = {};
function show(id, t, a, b) {
  const e = el(id), on = t >= a - .02 && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const c = TCACHE[id] || (TCACHE[id] = { k: e.querySelector('.k'), ln: [...e.querySelectorAll('.ln')] }), q = P(t, b - .25, .25, E.iC);
  if (c.k) { const p = P(t, a, .4, E.oQ); c.k.style.opacity = p * (1 - q); c.k.style.transform = `translateX(${(1 - p) * -30}px)`; }
  c.ln.forEach((l, i) => { const p = P(t, a + .08 + i * .12, .5, E.oQ); l.style.transform = `translateY(${(1 - p) * 110 + q * -110}%)`; });
}

/* ---------- UI cards (recreated from the OJA driver app) ---------- */
const card = (id, x, y, w, inner, extra = '') => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;border-radius:40px;background:#fff;color:#111;box-shadow:0 40px 100px rgba(0,0,0,.5);visibility:hidden;${extra}">${inner}</div>`;
const row = (id, icn, txt, sub = '') => `<div id="${id}" style="display:flex;align-items:center;gap:18px;padding:12px 20px;border-radius:20px;background:#F7F7F8;margin-top:12px">
<span style="width:52px;height:52px;flex:none;border-radius:50%;background:#FFF1E6;display:grid;place-items:center">${ic(icn, 28, OJ, 2.4)}</span><div style="flex:1"><div style="font:700 30px Inter">${txt}</div>${sub ? `<div style="font:500 22px Inter;color:#8A8F98">${sub}</div>` : ''}</div>
<span class="ck" style="width:46px;height:46px;border-radius:50%;background:${GR};display:grid;place-items:center;opacity:0">${ic('check', 28, '#fff', 3.4)}</span></div>`;
const DOCS = [['user', 'Pièce d\'identité'], ['tag', 'Permis de conduire'], ['clip', 'Carte grise'], ['gear', 'Visite technique'], ['shield', 'Attestation d\'assurance'], ['box', 'TVM']];
const ZONES = [['Dantokpa', .62, .36, 1], ['Ganhi', .42, .62, .8], ['Akpakpa', .80, .55, .9], ['Cadjèhoun', .2, .74, .7]];
const MW = 940, MH = 760;
document.documentElement.style.width = document.body.style.width = FW + 'px'; document.documentElement.style.height = document.body.style.height = HH + 'px';
stage.style.width = FW + 'px'; stage.style.height = HH + 'px';
H += `<canvas id="ph" class="abs" style="left:0;top:0" width="${FW}" height="${HH}"></canvas>
<div id="bug" class="abs" style="left:56px;top:70px;display:flex;align-items:center;gap:14px;font:900 46px Poppins;color:#fff;opacity:0"><img src="assets/mk_logo.png" style="width:66px;height:66px">OJA</div>
${title('T0', 'COTONOU', 'Zémidjan,', 'ton métier n\'est pas facile.', 1160, 96)}${title('T1', 'SOUS LE SOLEIL', 'Tu cherches le client', 'de rue en rue…', 1160, 92)}
${title('T2', 'SOUS LE SOLEIL', 'Et souvent,', 'tu tournes à vide.')}${title('T3', 'AU CARREFOUR', 'Tu attends.', 'Le temps passe, l\'essence part.', 1160, 92)}
<div id="rev" class="abs" style="left:0;right:0;top:640px;text-align:center;visibility:hidden"><img id="revl" src="assets/mk_logo.png" style="width:260px;height:260px;filter:drop-shadow(0 0 60px rgba(255,107,0,.9))">
<div style="overflow:hidden;margin-top:30px"><div class="ln" style="font:900 120px Poppins;line-height:1;color:#fff;text-transform:uppercase">Avec OJA,</div></div><div style="overflow:hidden"><div class="ln" style="font:900 120px Poppins;line-height:1.05;color:${OJ};text-transform:uppercase">ça change.</div></div></div>
${title('T4', 'AVEC OJA', 'Tu restes tranquille.', 'Le client vient à toi.', 1160, 92)}
${card('rc', 90, 300, 900, `<div style="padding:44px 48px"><div style="display:flex;align-items:center;gap:20px"><span style="width:88px;height:88px;border-radius:26px;background:#FFF1E6;display:grid;place-items:center">${ic('bike', 52, OJ, 2.2)}</span>
<div><div style="font:800 46px Poppins">Nouvelle course</div><div style="font:600 26px Inter;color:#8A8F98">Zem · près de toi</div></div><span id="rcp" style="margin-left:auto;width:22px;height:22px;border-radius:50%;background:${OJ}"></span></div>
<div style="position:relative;margin-top:34px;padding-left:56px"><div class="abs" style="left:17px;top:30px;width:4px;height:86px;background:#E4E4E7"></div>
<div style="display:flex;align-items:center;gap:16px;font:700 36px Inter"><span class="abs" style="left:6px;width:26px;height:26px;border-radius:50%;border:6px solid ${GR}"></span>Carrefour Étoile Rouge</div>
<div style="display:flex;align-items:center;gap:16px;font:700 36px Inter;margin-top:48px"><span class="abs" style="left:6px;width:26px;height:26px;border-radius:6px;background:${OJ}"></span>Marché Dantokpa</div></div>
<div style="position:relative;margin-top:44px;height:110px;border-radius:30px;overflow:hidden"><div class="abs" style="inset:0;background:${OJ};color:#fff;display:grid;place-items:center;font:800 42px Inter">Accepter</div>
<div id="rcok" class="abs" style="inset:0;background:${GR};color:#fff;display:flex;align-items:center;justify-content:center;gap:16px;font:800 42px Inter;clip-path:circle(0% at 50% 50%)">${ic('check', 46, '#fff', 3.2)}Course acceptée</div>
<div id="rctap" class="abs" style="left:450px;top:55px;width:110px;height:110px;margin:-55px;border-radius:50%;background:rgba(255,255,255,.5);border:5px solid #fff;opacity:0"></div></div></div>`)}
${title('T5', 'AVEC OJA', 'La course arrive,', 'tu acceptes.')}${title('T5b', 'AVEC OJA', 'Tu vas droit', 'vers le client.')}${title('T5c', 'AVEC OJA', 'Il t\'attend,', 'il monte.')}${title('T5d', 'AVEC OJA', 'Fini,', 'la balade à vide.')}
${card('mc', 70, 280, MW, `<canvas id="mapc" style="display:block;border-radius:40px" width="${MW}" height="${MH}"></canvas>
<div class="abs" style="left:30px;top:28px;display:flex;align-items:center;gap:12px;padding:12px 24px;border-radius:24px;background:#111;color:#fff;font:800 26px Inter;letter-spacing:.12em"><span id="mlive" style="width:16px;height:16px;border-radius:50%;background:#F04438"></span>ZONES CHAUDES</div>
${ZONES.map(([n, u, v], i) => `<div id="zl${i}" class="abs" style="left:${u * MW - 150}px;width:300px;top:${v * MH + 46}px;text-align:center;opacity:0"><span style="padding:8px 18px;border-radius:16px;background:rgba(255,255,255,.95);font:800 26px Inter;color:#111">${n}</span></div>`).join('')}`, 'overflow:hidden;background:#0f1320')}
${title('T6', 'ZONES CHAUDES', 'OJA te montre', 'où sont les clients.')}
${card('s1', 90, 260, 900, `<div style="padding:40px 46px"><div style="font:700 24px Inter;letter-spacing:.2em;color:${OJ}">ÉTAPE 1/2</div><div style="font:800 52px Poppins;margin-top:6px">Devenir chauffeur</div>
<div style="margin-top:26px;font:600 22px Inter;color:#8A8F98">Nom complet</div><div id="s1n" style="height:84px;border-radius:22px;border:3px solid #E4E4E7;display:flex;align-items:center;padding:0 24px;font:700 36px Inter;margin-top:8px"></div>
<div style="margin-top:20px;font:600 22px Inter;color:#8A8F98">Numéro de téléphone</div><div id="s1t" style="height:84px;border-radius:22px;border:3px solid #E4E4E7;display:flex;align-items:center;gap:14px;padding:0 24px;font:700 36px Inter;margin-top:8px"><span style="color:#8A8F98">+229</span><span id="s1tv"></span></div></div>`)}
${card('s2', 90, 190, 900, `<div style="padding:40px 46px"><div style="font:700 24px Inter;letter-spacing:.2em;color:${OJ}">ÉTAPE FINALE</div><div style="font:800 52px Poppins;margin-top:6px">Véhicule &amp; identité</div>
${row('s2v', 'bike', 'Type de véhicule', 'Moto')}<div style="margin-top:22px;font:700 22px Inter;letter-spacing:.14em;color:#8A8F98">DOCUMENTS EN PHOTO</div>${DOCS.map(([icn, s], i) => row('s2d' + i, icn, s)).join('')}</div>`)}
${title('T7', 'INSCRIPTION', 'Depuis', 'ton téléphone.')}
${title('T8', 'TA FORMULE', 'Ensuite,', 'tu choisis.')}
${card('fa', 90, 230, 900, `<div style="padding:36px 44px;display:flex;align-items:center;gap:26px"><span style="width:96px;height:96px;flex:none;border-radius:28px;background:#F1F2F4;display:grid;place-items:center">${ic('chart', 52, '#667085', 2.2)}</span>
<div><div style="font:800 46px Poppins">Sans pass</div><div style="font:600 30px Inter;color:#667085;margin-top:4px">OJA prend une commission<br>sur chaque course.</div></div></div>`)}
${card('fb', 90, 520, 900, `<div style="padding:40px 44px"><div style="display:flex;align-items:center;gap:22px"><span style="width:96px;height:96px;flex:none;border-radius:28px;background:#fff;display:grid;place-items:center">${ic('zap', 56, OJ, 2.4)}</span><div style="font:900 56px Poppins;color:#fff">Pass illimité</div></div>
<div style="display:flex;align-items:baseline;gap:20px;margin-top:20px;color:#fff"><div id="fbz" style="font:900 200px Poppins;line-height:1;letter-spacing:-.04em">0 %</div><div style="font:800 40px Poppins;line-height:1.1">de<br>commission</div></div>
<div style="display:flex;gap:16px;margin-top:26px">${['24 H', '7 JOURS', '1 MOIS'].map((s, i) => `<div id="fd${i}" style="flex:1;height:96px;border-radius:26px;border:4px solid rgba(255,255,255,.55);display:grid;place-items:center;font:900 38px Poppins;color:#fff">${s}</div>`).join('')}</div></div>`, `background:linear-gradient(150deg,#FF8A2B,${OJ} 55%,#E04F00)`)}
${title('T9', 'SANS PASS', 'Une commission', 'sur chaque course.')}${title('T10', 'PASS ILLIMITÉ', 'Zéro', 'pour cent.')}${title('T11', 'PASS ILLIMITÉ', 'Chaque course', 'est pour toi.')}
${title('T13', 'OJA', 'Zémidjan,', 'roule avec OJA.', 940, 96)}
<div id="cta" class="abs" style="left:64px;right:64px;top:1330px;visibility:hidden"><div style="font:800 54px Poppins;color:#fff">Les clients t'attendent.</div>
<div style="display:inline-flex;align-items:center;gap:14px;margin-top:26px;padding:18px 30px;border-radius:40px;background:${OJ};color:#fff;font:800 34px Inter">${ic('bike', 40, '#fff', 2.4)}Télécharge OJA · « Je suis chauffeur »</div>
<div style="display:flex;gap:22px;margin-top:30px">${[['phone', 'Télécharger sur', 'App Store'], ['play', 'Disponible sur', 'Google Play']].map(([icn, sm, big]) => `<div style="width:340px;height:100px;border-radius:26px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:18px;padding:0 24px;color:#fff;white-space:nowrap;box-sizing:border-box">${ic(icn, 44, '#fff', 1.8)}<div><div style="font:500 20px Inter;opacity:.75">${sm}</div><div style="font:700 32px Poppins;line-height:1.1">${big}</div></div></div>`).join('')}</div></div>
<div id="fm" class="abs" style="left:60px;right:60px;top:1790px;text-align:center;font:500 21px Inter;line-height:1.35;color:rgba(255,255,255,.62);opacity:0">Inscription : pièce d'identité, permis, carte grise, visite technique, assurance et TVM demandés. Prix des pass et taux de commission fixés par OJA. Personnes des images générées par IA.</div>
<div id="flash" class="lay" style="width:${FW}px;height:${HH}px;background:#fff;opacity:0;z-index:40"></div>
<div id="fade" style="width:${FW}px;height:${HH}px"></div>`;
stage.innerHTML = H;

/* ---------- photos: cover, slow push-in, punch on each cut; blurred and dimmed under the app cards ---------- */
// [from, to, photo, focus y (0..1) for the push-in, blur from]
const SHOTS = () => [[0, V('carrefour') - .05, 'vide'], [V('carrefour') - .05, V('change') - .1, 'attente'], [V('tranq') - .1, V('commande') - .1, 'tranquille'], [V('commande') - .1, V('droit') - .1, 'phone', V('course') - .3],
  [V('droit') - .1, V('monte') - .05, 'rejoint'], [V('monte') - .05, V('fini') - .05, 'client'], [V('fini') - .05, V('montre') - .1, 'trafic'], [V('montre') - .1, V('inscr') - .1, 'trafic', -1],
  [V('inscr') - .1, V('formule') - .1, 'papiers', V('nom') - .6], [V('formule') - .1, V('endA') - .1, 'tranquille', V('sans') - .4], [V('endA') - .1, DUR2 + 1, 'fin']];
function photos(t) {
  const c = el('ph').getContext('2d'); c.fillStyle = '#0a0705'; c.fillRect(0, 0, FW, HH);
  const s = SHOTS().find(([a, b]) => t >= a && t < b);
  if (s) {
    const [a, b, k, bl] = s, im = PH[k], u = t - a, punch = 1 + .08 * (1 - P(t, a, .35, E.oQ)), sc = (1.02 + .05 * clamp(u / 9)) * punch, w = FW * sc, h = HH * sc;
    const blur = bl === undefined ? 0 : bl < 0 ? 1 : P(t, bl, .5, E.ioC);
    c.save(); const fl = []; if (DULL[k]) fl.push('saturate(.5) sepia(.22) contrast(1.06)'); if (blur > 0) fl.push(`blur(${blur * 22}px) brightness(${1 - blur * .45})`); if (fl.length) c.filter = fl.join(' ');
    c.drawImage(im, (FW - w) / 2, (HH - h) / 2 - (sc - 1) * HH * .1, w, h); c.restore();
    const g = c.createLinearGradient(0, 900, 0, HH); g.addColorStop(0, 'rgba(8,5,3,0)'); g.addColorStop(.5, 'rgba(8,5,3,.62)'); g.addColorStop(1, 'rgba(8,5,3,.92)'); c.fillStyle = g; c.fillRect(0, 900, FW, HH - 900);
    const tg = c.createLinearGradient(0, 0, 0, 300); tg.addColorStop(0, 'rgba(8,5,3,.5)'); tg.addColorStop(1, 'rgba(8,5,3,0)'); c.fillStyle = tg; c.fillRect(0, 0, FW, 300);
  }
  // « Maintenant, il y a OJA »: dark orange stage with rays
  const r = P(t, V('change') - .15, .3) * (1 - P(t, V('tranq') - .25, .25));
  if (r > 0) { c.save(); c.globalAlpha = r; const g = c.createRadialGradient(540, 820, 0, 540, 820, 1300); g.addColorStop(0, '#5a2200'); g.addColorStop(.6, '#1a0700'); g.addColorStop(1, '#080302'); c.fillStyle = g; c.fillRect(0, 0, FW, HH);
    c.globalCompositeOperation = 'lighter'; c.translate(540, 820);
    for (let k = 0; k < 16; k++) { c.rotate(Math.PI * 2 / 16); const gg = c.createLinearGradient(0, 0, 1400, 0); gg.addColorStop(0, 'rgba(255,190,120,.28)'); gg.addColorStop(1, 'rgba(255,107,0,0)'); c.save(); c.rotate(t * .1); c.fillStyle = gg; c.beginPath(); c.moveTo(0, 0); c.lineTo(1400, -46); c.lineTo(1400, 46); c.closePath(); c.fill(); c.restore(); }
    c.restore(); }
}
function cutFlash(t) {
  let f = 0; for (const a of [V('carrefour') - .05, V('change') - .15, V('tranq') - .1, V('commande') - .1, V('droit') - .1, V('monte') - .05, V('fini') - .05, V('montre') - .1, V('inscr') - .1, V('formule') - .1, V('endA') - .1]) f = Math.max(f, .55 * (1 - clamp((t - a) / .18)) * (t >= a ? 1 : 0));
  O('flash', f);
}

/* ---------- scenes ---------- */
function pop(id, t, a, b, dy = 80) {
  const e = el(id), on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return 0;
  const p = P(t, a, .5, E.oB), q = P(t, b - .3, .3, E.iC); e.style.opacity = clamp(p * 1.5) * (1 - q); e.style.transform = `translateY(${(1 - p) * dy}px) scale(${lerp(.9, 1, p) * lerp(1, .95, q)})`;
  return p;
}
function reveal(t) {
  const e = el('rev'), a = V('change') - .1, b = V('tranq') - .15, on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const p = P(t, a, .5, E.oB), q = P(t, b - .25, .25, E.iC); el('revl').style.transform = `scale(${lerp(.4, 1, p)})`; el('revl').style.opacity = clamp(p * 1.5) * (1 - q);
  [...e.querySelectorAll('.ln')].forEach((l, i) => { const k = P(t, a + .25 + i * .18, .45, E.oQ); l.style.transform = `translateY(${(1 - k) * 110 - q * 110}%)`; });
}
function ride(t) {
  const p = pop('rc', t, V('course') - .1, V('droit') - .1); if (!p) return;
  el('rcp').style.opacity = .35 + .65 * Math.abs(Math.sin(t * 4));
  const tp = P(t, V('acceptes') - .05, .45, E.oQ), tap = el('rctap'); tap.style.opacity = tp > 0 && tp < 1 ? 1 - tp : 0; tap.style.transform = `scale(${lerp(.4, 1.6, tp)})`;
  el('rcok').style.clipPath = `circle(${P(t, V('acceptes') + .1, .45, E.oQ) * 80}% at 50% 50%)`;
}
function zones(t) {
  const p = pop('mc', t, V('montre') - .1, V('inscr') - .1); if (!p) return;
  const c = el('mapc').getContext('2d'); c.fillStyle = '#0f1320'; c.fillRect(0, 0, MW, MH);
  const R = rng(7); c.strokeStyle = '#1e2638'; c.lineCap = 'round';
  for (let i = 0; i < 16; i++) { c.lineWidth = 4 + R() * 10; const y = R() * MH; c.beginPath(); c.moveTo(-20, y); c.lineTo(MW + 20, y - 140 + (R() - .5) * 80); c.stroke(); }
  for (let i = 0; i < 14; i++) { c.lineWidth = 4 + R() * 10; const x = R() * MW; c.beginPath(); c.moveTo(x, -20); c.lineTo(x + 180, MH + 20); c.stroke(); }
  c.fillStyle = '#16314a'; c.beginPath(); c.moveTo(0, MH - 70); c.bezierCurveTo(MW * .3, MH - 100, MW * .65, MH - 30, MW, MH - 80); c.lineTo(MW, MH); c.lineTo(0, MH); c.fill();
  c.save(); c.globalCompositeOperation = 'lighter';
  ZONES.forEach(([, u, v, s], i) => { const k = P(t, V('zones') - .5 + i * .15, .6, E.oQ), x = u * MW, y = v * MH, R2 = (110 + 40 * Math.sin(t * 2.4 + i)) * s * k;
    if (R2 <= 0) return; const g = c.createRadialGradient(x, y, 0, x, y, R2); g.addColorStop(0, 'rgba(255,90,40,.85)'); g.addColorStop(.45, 'rgba(255,140,0,.45)'); g.addColorStop(1, 'rgba(255,107,0,0)'); c.fillStyle = g; c.fillRect(x - R2, y - R2, 2 * R2, 2 * R2); });
  c.restore();
  ZONES.forEach((_, i) => { el('zl' + i).style.opacity = P(t, V('zones') - .3 + i * .15, .35); });
  // the zem (yellow dot) heads for the nearest hot zone
  const k = P(t, V('montre') + .4, 2.2, E.ioC), x = lerp(.3 * MW, .58 * MW, k), y = lerp(.2 * MH, .34 * MH, k);
  c.fillStyle = 'rgba(255,196,0,.3)'; c.beginPath(); c.arc(x, y, 30 + 8 * Math.sin(t * 5), 0, 7); c.fill(); c.fillStyle = YE; c.beginPath(); c.arc(x, y, 16, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 4; c.stroke();
  el('mlive').style.opacity = .4 + .6 * Math.abs(Math.sin(t * 3));
}
const NAME = 'Koffi Agossou', TEL = '•• •• •• ••';
function signup(t) {
  const p1 = pop('s1', t, V('inscr') + .3, V('moto') - .05);
  if (p1) { const n = Math.round(P(t, V('nom') - .1, .5, E.lin) * NAME.length); el('s1n').textContent = NAME.slice(0, n); el('s1n').style.borderColor = t >= V('nom') - .1 && t < V('numero') ? OJ : '#E4E4E7';
    const m = Math.round(P(t, V('numero') - .05, .45, E.lin) * TEL.length); el('s1tv').textContent = TEL.slice(0, m); el('s1t').style.borderColor = t >= V('numero') - .05 ? OJ : '#E4E4E7'; }
  const p2 = pop('s2', t, V('moto') - .05, V('formule') - .1); if (!p2) return;
  const ck = (id, a) => { const e = el(id).querySelector('.ck'), k = P(t, a, .3, E.oB); e.style.opacity = clamp(k * 1.5); e.style.transform = `scale(${lerp(.3, 1, k)})`; };
  ck('s2v', V('moto') + .3); DOCS.forEach((_, i) => ck('s2d' + i, V('papiers') + .2 + i * .17));
}
function formula(t) {
  const pa = pop('fa', t, V('sans') - .15, V('endA') - .1), pb = pop('fb', t, V('avec') - .15, V('endA') - .1);
  if (pa) { const dim = P(t, V('avec') - .1, .4, E.ioC); el('fa').style.opacity = clamp(pa * 1.5) * lerp(1, .55, dim) * (1 - P(t, V('endA') - .4, .3)); el('fa').style.filter = `grayscale(${dim})`; }
  if (pb) { const z = P(t, V('zero') - .1, .5, E.oB); el('fbz').style.transform = `scale(${lerp(.6, 1, z)})`; el('fbz').style.opacity = clamp(z * 1.5);
    [['jour1', 0], ['semaine', 1], ['mois', 2]].forEach(([k, i]) => { const on = t >= V(k) - .05; const d = el('fd' + i); d.style.background = on ? '#fff' : 'transparent'; d.style.color = on ? OJ : '#fff'; d.style.borderColor = on ? '#fff' : 'rgba(255,255,255,.55)'; d.style.transform = `scale(${on ? lerp(1.12, 1, P(t, V(k) - .05, .3, E.oB)) : 1})`; }); }
}
function finale(t) {
  const a = V('endB') - .2, e = el('cta'), on = t >= a; e.style.visibility = on ? 'visible' : 'hidden';
  if (on) { const p = P(t, a, .5, E.oQ); e.style.opacity = p; e.style.transform = `translateY(${(1 - p) * 40}px)`; }
  el('fm').style.opacity = P(t, V('endB') + 1.4, .6) * .9;
}

/* ---------- master ---------- */
window.renderAt = function (t) {
  photos(t); cutFlash(t);
  // before: the struggle
  show('T0', t, V('t0'), V('soleil') - .05); show('T1', t, V('soleil'), V('vide') - .05);
  show('T2', t, V('vide'), V('carrefour') - .1); show('T3', t, V('carrefour'), V('change') - .15);
  // with OJA: the client comes to him
  reveal(t);
  el('bug').style.opacity = P(t, V('tranq'), .5) * (1 - P(t, V('endA') - .4, .3));
  show('T4', t, V('tranq'), V('commande') - .1); ride(t); show('T5', t, V('commande'), V('droit') - .15);
  show('T5b', t, V('droit'), V('monte') - .1); show('T5c', t, V('monte'), V('fini') - .1); show('T5d', t, V('fini'), V('montre') - .15);
  zones(t); show('T6', t, V('montre'), V('inscr') - .15);
  signup(t); show('T7', t, V('inscr'), V('formule') - .15);
  show('T8', t, V('formule'), V('sans') - .1); formula(t); show('T9', t, V('sans'), V('avec') - .1); show('T10', t, V('avec'), V('pourtoi') - .1); show('T11', t, V('pourtoi'), V('endA') - .15);
  show('T13', t, V('endA'), DUR2 + 1); finale(t);
  O('fade', Math.max(1 - P(t, 0, .3, E.lin), P(t, DUR2 - .6, .6, E.lin)));
};
