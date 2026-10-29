/* ============================================================
   OJA — Défis des lieux avec la mascotte, 9:16, 33 s, voice: Isac (assets/dfl/voix_defis.mp3, from 0.5 s).
   The mascot (keyed Google Flow clips assets/mc/c*_NNN.webp, 24 fps) guides: add places on the OJA map, each place
   confirmed by the OJA team counts, the 3 / 10 / 25 tiers (−15 / −20 / −25 %, caps 500 / 1 000 / 1 500 F) and their
   badges, « Mon lieu a aidé 10 personnes » (−20 %, cap 500 F, 3 times a month), the 3 Guides of the month, logo.
   Every percentage is shown with its cap (kit rule). Depends on the Défis being active in Benin with a monthly budget.
   ============================================================ */
const VO = 0.5;
const PRE = [];
// voice timings (seconds in the voice file), injected by dfl_build.py from assets/dfl/voix_defis.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 33.0;
const LIGHT = '#FFF2E8', ANTH = '#1C1C1E', GR = '#12B76A', OL = '#FF9A4D';

/* ---------- map and pins (as in the mascot tutorial) ---------- */
function cityMap(w, h, seed, opt = {}) {
  const R = rng(seed); let s = `<rect width="${w}" height="${h}" fill="#F1ECE5"/>`;
  for (let i = 0; i < 40; i++) { const x = R() * w, y = R() * h; s += `<rect x="${x}" y="${y}" width="${30 + R() * 70}" height="${20 + R() * 50}" rx="6" fill="#E8E2D9"/>`; }
  for (let i = 0; i < 18; i++) { const y = R() * h; s += `<path d="M-40,${y} L${w + 40},${y - w * .25 + (R() - .5) * 80}" stroke="#fff" stroke-width="${4 + R() * 6}" fill="none"/>`; }
  for (let i = 0; i < 18; i++) { const x = R() * w; s += `<path d="M${x},-40 L${x + h * .3},${h + 40}" stroke="#fff" stroke-width="${4 + R() * 6}" fill="none"/>`; }
  s += `<path d="M-40,${h * .86} C${w * .3},${h * .82} ${w * .6},${h * .9} ${w + 40},${h * .84} L${w + 40},${h + 40} L-40,${h + 40}Z" fill="#CFE3F2"/>`;
  s += `<path d="M${w * .62},-40 C${w * .64},${h * .25} ${w * .58},${h * .45} ${w * .63},${h * .65} S${w * .66},${h * .8} ${w * .67},${h + 40}" stroke="#CFE3F2" stroke-width="${w * .035}" fill="none"/>`;
  s += `<rect x="${w * .1}" y="${h * .55}" width="${w * .12}" height="${h * .1}" rx="12" fill="#D8EBD5"/><rect x="${w * .78}" y="${h * .2}" width="${w * .1}" height="${h * .12}" rx="12" fill="#D8EBD5"/>`;
  if (opt.labels) s += `<g font-family="Inter" font-weight="700" font-size="${opt.labels}" fill="#9A8F84" letter-spacing="4"><text x="${w * .12}" y="${h * .3}">CADJÈHOUN</text><text x="${w * .38}" y="${h * .2}">DANTOKPA</text><text x="${w * .4}" y="${h * .72}">GANHI</text><text x="${w * .72}" y="${h * .55}">AKPAKPA</text><text x="${w * .06}" y="${h * .8}">FIDJROSSÈ</text></g>`;
  return s;
}
const PINC = (c = OR, s = 40) => `<svg viewBox="0 0 24 30" width="${s}" height="${s * 1.25}" style="display:block;overflow:visible;filter:drop-shadow(0 ${s * .15}px ${s * .15}px rgba(0,0,0,.25))"><path d="M12 29s10-9.2 10-17A10 10 0 0 0 2 12c0 7.8 10 17 10 17Z" fill="${c}" stroke="#fff" stroke-width="1.4"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>`;
const CROWN = s => `<svg viewBox="0 0 24 18" width="${s}" height="${s * .75}"><path d="M2 16h20l1.5-12-6.5 5-5-8-5 8-6.5-5Z" fill="#F5B300" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>`;

/* ---------- the mascot (Flow clips keyed to alpha WebP, 192 frames at 24 fps) ---------- */
const CLIPF = 192;
// [stageStart, stageEnd, clip, clipStart]
const SEG = () => [[0, V('ajoute') - .1, 6, 0], [V('ajoute') - .1, V('t1') - .1, 10, 0], [V('t1') - .1, V('t2'), 2, 0], [V('t2'), V('t3'), 9, 1.0],
  [V('t3'), V('aide') - .1, 8, 1.2], [V('aide') - .1, V('guides') - .1, 7, 0], [V('guides') - .1, V('endA') - .2, 11, 0], [V('endA') - .2, DUR2 + 1, 1, 1.8]];
function clipFrame(t) {
  const S = SEG(), sg = S.find(([a, b]) => t >= a && t < b) || S[S.length - 1];
  return [sg[2], Math.min(CLIPF, Math.max(1, Math.round((sg[3] + t - sg[0]) * 24) + 1)), t - sg[0]];
}
const vmascot = id => `<div id="${id}" class="abs" style="left:0;top:0;width:612px;height:960px;transform-origin:306px 926px;z-index:8">
<div class="abs" style="left:146px;top:900px;width:320px;height:52px;border-radius:50%;background:radial-gradient(ellipse,rgba(60,25,5,.38),rgba(60,25,5,0) 70%)"></div>
<img id="${id}i" class="abs" style="left:0;top:0;width:612px;height:960px"></div>`;
function vbody(id, t, x, y, s, a = 1) {
  const [c, f, since] = clipFrame(t), src = `assets/mc/c${c}_${String(f).padStart(3, '0')}.webp`;
  const im = el(id + 'i'); if (im.getAttribute('src') !== src) im.setAttribute('src', src);
  const popk = since < .22 && t > .3 ? 1 - .04 * Math.sin(since / .22 * Math.PI) : 1;
  el(id).style.transform = `translate(${x - 306}px,${y - 926}px) scale(${s * popk})`; el(id).style.opacity = a;
}
window.waitFrame = () => Promise.all([...document.querySelectorAll('img[id$="i"]')].filter(i => i.offsetParent !== null && i.getAttribute('src')).map(i => i.decode().catch(() => 0)));

/* ---------- layout ---------- */
const head = (id, html, top = 190, size = 92) => `<div id="${id}" class="abs hd" style="left:50px;right:50px;top:${top}px;text-align:center;font:800 ${size}px Poppins;letter-spacing:-.025em;line-height:1.08;color:${ANTH};visibility:hidden">${html}</div>`;
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1440px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const O_ = s => `<span style="color:${OR}">${s}</span>`, G_ = s => `<span style="color:${GR}">${s}</span>`;
const TIERS = [['3', '−15&nbsp;%', 'jusqu\'à 500&nbsp;F', 'Éclaireur'], ['10', '−20&nbsp;%', 'jusqu\'à 1&nbsp;000&nbsp;F', 'Guide de quartier'], ['25', '−25&nbsp;%', 'jusqu\'à 1&nbsp;500&nbsp;F', 'Cartographe']];
const tier = ([n, pc, cap, badge], i) => `<div id="tr${i}" class="abs" style="left:70px;top:${470 + i * 270}px;width:940px;height:236px;border-radius:40px;background:#fff;box-shadow:0 24px 60px rgba(120,60,20,.16);display:flex;align-items:center;gap:30px;padding:0 36px;visibility:hidden">
<div style="position:relative;width:150px;height:150px;flex:none;display:grid;place-items:center">${PINC(OR, 120)}<div class="abs" style="left:0;right:0;top:22px;text-align:center;font:900 ${n.length > 1 ? 44 : 52}px Poppins;color:${OR}"><span style="background:#fff;border-radius:50%;display:inline-block;width:74px;height:74px;line-height:74px">${n}</span></div></div>
<div style="flex:1"><div style="font:800 38px Poppins;color:${ANTH};line-height:1.1">${n} lieux</div><div style="font:900 80px Poppins;color:${OR};letter-spacing:-.03em;line-height:1.05">${pc}</div><div style="font:700 32px Inter;color:#6b6660;white-space:nowrap">${cap}</div></div>
<div id="tb${i}" style="flex:none;width:200px;text-align:center;visibility:hidden"><div style="width:96px;height:96px;margin:0 auto;border-radius:50%;background:linear-gradient(135deg,#FFD36B,#F59E0B);display:grid;place-items:center;box-shadow:0 10px 24px rgba(245,158,11,.45)">${ic('star', 54, '#fff', 2.4)}</div><div style="font:800 24px Inter;color:${ANTH};margin-top:10px;line-height:1.15">${badge}</div></div></div>`;
const CARD = (id, top, big, small) => `<div id="${id}" class="abs" style="left:110px;right:110px;top:${top}px;height:200px;border-radius:40px;background:#fff;box-shadow:0 24px 60px rgba(120,60,20,.16);display:flex;flex-direction:column;align-items:center;justify-content:center;visibility:hidden"><div style="font:900 80px Poppins;color:${OR};letter-spacing:-.03em;line-height:1">${big}</div><div style="font:700 34px Inter;color:#6b6660;margin-top:14px">${small}</div></div>`;
const MAPPINS = [[250, 820], [700, 700], [520, 1080], [860, 1000], [180, 1180]];
H += `<div id="bg" class="lay" style="background:${LIGHT}"></div>
<div id="map" class="lay"><svg class="abs" style="left:0;top:0" width="1080" height="1920" viewBox="0 0 1080 1920">${cityMap(1080, 1920, 51, { labels: 26 })}</svg>
<div id="mapw" class="lay" style="background:radial-gradient(ellipse at 50% 55%,rgba(255,242,232,.15),rgba(255,242,232,.92) 72%)"></div>
${MAPPINS.map(([x, y], i) => `<div id="mp${i}" class="abs" style="left:${x - 45}px;top:${y - 112}px;width:90px;height:112px;transform-origin:50% 100%;visibility:hidden">${PINC(OR, 90)}</div>`).join('')}
<div id="plus" class="abs" style="left:0;top:0;padding:12px 24px;border-radius:26px;background:${OR};color:#fff;font:800 34px Poppins;box-shadow:0 12px 30px rgba(255,107,0,.35);visibility:hidden">+1 lieu</div>
<div id="conf" class="abs" style="left:250px;top:410px;padding:20px 30px;border-radius:30px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.18);display:flex;align-items:center;gap:16px;font:800 32px Inter;color:${ANTH};visibility:hidden"><span style="width:52px;height:52px;border-radius:50%;background:${GR};display:grid;place-items:center">${ic('check', 30, '#fff', 3.4)}</span>Confirmé par l'équipe OJA</div></div>
<div id="s3" class="lay">${TIERS.map(tier).join('')}</div>
<div id="s4" class="lay"><div id="bigpin" class="abs" style="left:440px;top:560px;width:200px;height:250px;transform-origin:50% 100%">${PINC(OR, 200)}</div>
${Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI * 2 / 10, x = 540 + Math.cos(a) * 330, y = 700 + Math.sin(a) * 260; return `<div id="pp${i}" class="abs" style="left:${x - 46}px;top:${y - 46}px;width:92px;height:92px;border-radius:50%;background:#fff;box-shadow:0 10px 26px rgba(0,0,0,.15);display:grid;place-items:center;visibility:hidden">${ic('user', 48, i % 2 ? OR : ANTH, 2.2)}</div>`; }).join('')}
${CARD('c4', 1050, '−20&nbsp;%', 'jusqu\'à 500&nbsp;F · 3 fois par mois')}</div>
<div id="s5" class="lay">${[[1, 540, 450, 330], [2, 250, 570, 210], [3, 830, 630, 150]].map(([r, x, y, hh]) => `<div id="pd${r}" class="abs" style="left:${x - 130}px;top:${y}px;width:260px;visibility:hidden"><div style="display:flex;justify-content:center;margin-bottom:8px">${r === 1 ? CROWN(90) : ''}</div><div style="display:flex;justify-content:center">${PINC(r === 1 ? OR : OL, 100)}</div><div style="height:${hh}px;margin-top:14px;border-radius:24px 24px 0 0;background:${r === 1 ? OR : '#FFD7BA'};display:grid;place-items:center;font:900 90px Poppins;color:#fff">${r}</div></div>`).join('')}
${CARD('c5', 1080, 'Une course offerte', 'jusqu\'à 1&nbsp;500&nbsp;F · au moins 3 lieux')}</div>
${vmascot('mm')}
<canvas id="fx" class="lay" width="1080" height="1920" style="z-index:9"></canvas>
${head('h0', `Tu connais bien<br>ton ${O_('quartier&nbsp;?')}`, 170, 100)}${head('h1', `Ça peut te<br>${O_('rapporter&nbsp;!')}`, 170, 110)}
${head('h2', `Ajoute des lieux<br>sur la ${O_('carte OJA.')}`, 170, 96)}${head('h3', `Chaque lieu ${G_('confirmé')}<br>compte pour tes défis.`, 170, 84)}
${head('h4', `Plus tu ajoutes,<br>plus tu ${O_('gagnes.')}`, 170, 96)}${head('h5', `Ton lieu a aidé<br>${O_('10 personnes&nbsp;?')}`, 170, 96)}
${head('h6', `Les 3 meilleurs<br>${O_('guides du mois')}`, 170, 96)}
<div id="sEnd" class="lay" style="z-index:7">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:400px;top:150px;width:280px;height:280px;filter:drop-shadow(0 0 40px rgba(255,107,0,.35))">
<div id="eword" class="abs" style="left:0;right:0;top:440px;text-align:center;font:900 140px Poppins;letter-spacing:-.03em;line-height:1;color:${ANTH}">OJA</div>
<div id="eslo" class="abs" style="left:0;right:0;top:610px;text-align:center;font:800 74px Poppins;letter-spacing:-.02em;color:${ANTH}">Le local devient ${O_('visible.')}</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}
<div id="emen" class="abs" style="left:60px;right:60px;top:1610px;text-align:center;font:500 26px Inter;color:#7d746c;line-height:1.35">Défis OJA : réductions à usage unique, plafonnées, valables 30 jours, selon budget disponible. Un lieu compte après confirmation par l'équipe OJA. Course offerte jusqu'à 1 500 F ; le prix ne descend jamais sous 100 F.</div></div>
<div id="flash" class="lay" style="background:radial-gradient(circle at 50% 50%,#fff,rgba(255,200,150,.8) 40%,rgba(255,170,100,0) 75%);opacity:0;z-index:40"></div>
<div id="fade"></div>`;
stage.innerHTML = H;

/* ---------- helpers ---------- */
function hd(id, t, a, b) {
  const p = P(t, a, .4, E.oQ), q = P(t, b - .28, .28, E.iC), e = el(id);
  e.style.opacity = p * (1 - q); e.style.transform = `translateY(${(1 - p) * 40 - q * 20}px)`; e.style.filter = `blur(${(1 - p) * 14 + q * 10}px)`;
  e.style.visibility = t >= a && t < b ? 'visible' : 'hidden';
}
function popIn(id, t, a, d = .5, dy = 80, s0 = .8) {
  const p = P(t, a, d, E.oB), e = el(id);
  e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.opacity = clamp(p * 1.5); e.style.transform = `translateY(${(1 - p) * dy}px) scale(${lerp(s0, 1, p)})`;
  return p;
}
function sparks(c, x, y, t, a, n = 14, col = '255,180,60') {   // little burst of stars
  const q = (t - a) / .7; if (q < 0 || q > 1) return;
  for (let i = 0; i < n; i++) { const an = i / n * Math.PI * 2, r = 40 + q * 150, px = x + Math.cos(an) * r, py = y + Math.sin(an) * r;
    c.fillStyle = `rgba(${col},${1 - q})`; c.beginPath(); c.arc(px, py, 9 * (1 - q) + 2, 0, Math.PI * 2); c.fill(); }
}

/* ---------- scenes ---------- */
function sceneMap(t, cf) {     // hook on the washed map, then pins dropping, « +1 lieu », « Confirmé par l'équipe OJA »
  const open = P(t, V('ajoute') - .3, .6, E.ioC); el('mapw').style.opacity = 1 - open * .85;
  const DROPS = [V('ajoute') + .3, V('ajoute') + .75, V('ajoute') + 1.2, V('confirme') + .9, V('confirme') + 1.3];
  MAPPINS.forEach(([x, y], i) => { const a = DROPS[i], p = P(t, a, .45, E.oB), e = el('mp' + i);
    e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.transform = `translateY(${(1 - p) * -260}px) scale(${lerp(.6, 1, p)},${lerp(1.3, 1, p)})`; e.style.opacity = clamp(p * 2);
    sparks(cf, x, y - 30, t, a + .35, 10); });
  let k = -1; DROPS.forEach((a, i) => { if (t >= a + .2 && t < a + .75) k = i; });
  const e = el('plus'); e.style.visibility = k >= 0 ? 'visible' : 'hidden';
  if (k >= 0) { const q = (t - DROPS[k] - .2) / .55; e.style.transform = `translate(${MAPPINS[k][0] + 40}px,${MAPPINS[k][1] - 190 - q * 50}px)`; e.style.opacity = Math.sin(Math.PI * clamp(q)); }
  popIn('conf', t, V('confirme') + .15, .5, 60);
}
function sceneTiers(t, cf) {   // 3 / 10 / 25 places, then a badge on each tier
  [V('t1') - .05, V('t2') - .05, V('t3') - .05].forEach((a, i) => { popIn('tr' + i, t, a, .55, 120); });
  [0, 1, 2].forEach(i => { const a = V('badge') + i * .25, p = P(t, a, .45, E.oB), e = el('tb' + i);
    e.style.visibility = t >= a ? 'visible' : 'hidden'; e.style.transform = `scale(${lerp(.2, 1, p)}) rotate(${(1 - p) * -40}deg)`; e.style.opacity = clamp(p * 2);
    sparks(cf, 880, 588 + i * 270, t, a + .2, 12); });
}
function sceneHelped(t) {      // the place helped 10 people
  const bp = popIn('bigpin', t, V('aide') - .1, .55, 120, .5);
  for (let i = 0; i < 10; i++) popIn('pp' + i, t, V('aide') + .3 + i * .12, .4, 30, .3);
  popIn('c4', t, V('aide') + 2.0, .5, 80);
}
function scenePodium(t) {      // the 3 Guides of the month
  [[3, 0], [2, .15], [1, .3]].forEach(([r, d]) => popIn('pd' + r, t, V('guides') - .05 + d, .55, 160));
  popIn('c5', t, V('guides') + 1.4, .5, 80);
}
function sceneEnd(t) {
  const lp = P(t, V('endA') - .3, .55, E.oB);
  el('elogo').style.transform = `scale(${lerp(.55, 1, lp)})`; el('elogo').style.opacity = clamp(lp * 1.5);
  el('eword').style.clipPath = `inset(-20% ${100 - P(t, V('endA') - .1, .5, E.oQ) * 100}% -20% 0)`;
  const sp = P(t, V('endB') + .2, .5, E.oQ); el('eslo').style.opacity = sp; el('eslo').style.transform = `translateY(${(1 - sp) * 30}px)`;
  for (let i = 0; i < 2; i++) { const p = P(t, V('endB') + 1.8 + i * .12, .5, E.oB); el('est' + i).style.opacity = clamp(p); el('est' + i).style.transform = `translateY(${(1 - p) * 60}px)`; }
  O('emen', P(t, V('endB') + 2.1, .5));
}

/* ---------- master ---------- */
const SPANS = () => ({ map: [0, V('t1') - .1], s3: [V('t1') - .1, V('aide') - .1], s4: [V('aide') - .1, V('guides') - .1], s5: [V('guides') - .1, V('endA') - .2], sEnd: [V('endA') - .3, DUR2] });
// mascot placement per scene: [from, x, foot y, scale]
const MPOS = () => [[0, 540, 1840, 1.2], [V('ajoute') - .1, 200, 1880, .78], [V('t1') - .1, 540, 1900, .62], [V('aide') - .1, 540, 1900, .6], [V('endA') - .3, 540, 1420, .7]];
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'); cf.clearRect(0, 0, 1080, 1920);
  const sp = SPANS();
  for (const k in sp) el(k).style.display = t >= sp[k][0] && t < sp[k][1] ? 'block' : 'none';
  if (el('map').style.display === 'block') sceneMap(t, cf);
  if (el('s3').style.display === 'block') sceneTiers(t, cf);
  if (el('s4').style.display === 'block') sceneHelped(t);
  if (el('s5').style.display === 'block') scenePodium(t);
  if (el('sEnd').style.display === 'block') sceneEnd(t);
  // mascot: lands at the start, then glides between its spots
  const M = MPOS(); let i = 0; while (i + 1 < M.length && t >= M[i + 1][0]) i++;
  const cur = M[i], prv = M[Math.max(0, i - 1)], k = i ? P(t, cur[0], .55, E.ioC) : 1;
  const land = P(t, .05, .55, E.oB);
  vbody('mm', t, lerp(prv[1], cur[1], k), lerp(prv[2], cur[2], k) - (1 - land) * 900, lerp(prv[3], cur[3], k), clamp(land * 3) * (1 - P(t, DUR2 - .5, .4)));
  hd('h0', t, V('hook') - .2, V('rapporte') - .1); hd('h1', t, V('rapporte') - .05, V('ajoute') - .1);
  hd('h2', t, V('ajoute') - .05, V('confirme') - .1); hd('h3', t, V('confirme') - .05, V('t1') - .1);
  hd('h4', t, V('t1') - .05, V('aide') - .1); hd('h5', t, V('aide') - .05, V('guides') - .1); hd('h6', t, V('guides') - .05, V('endA') - .25);
  let fl = 0;
  for (const [a, d, m] of [[V('t1') - .25, .3, .35], [V('aide') - .25, .3, .3], [V('guides') - .25, .3, .3], [V('endA') - .35, .3, .35]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .25, E.lin), P(t, DUR2 - .45, .45, E.lin)));
};
