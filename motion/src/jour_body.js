/* ============================================================
   OJA — « Une journée à Cotonou », film de lancement 16:9 (1920 × 1080), 56 s, voice: Isac (assets/jour/voix_journee.mp3, from 0.6 s).
   Style of the reference brand film the team sent (POV story, big time stamps, day-to-night colour cycle, word-by-word
   blur-in text, chat bubbles, glow and bokeh, logo reveal with light rays, feature mini-scenes, orbit, closing map).
   Act 1: a day of hassle (07 h 12 haggling at the junction, 12 h 40 no time to eat, 16 h 05 a parcel for Calavi, evening).
   Act 2: « Voici OJA » and live features only: price shown before riding, meal paid with MoMo, parcel rider followed
   live, the end-of-ride question, a replacement driver at the same price. Act 3: Benin map, « Tout ton Bénin… ».
   No amount, no invented figure.
   ============================================================ */
// VERT is set by jour_build.py: false for the 16:9 film, true for the 9:16 version (same story, positions below)
const VERT = /*VERT*/false;
const VW_ = VERT ? 1080 : 1920, VH_ = VERT ? 1920 : 1080, VO = 0.6;
const LY = (h, v) => VERT ? v : h;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
// the heroine of the day (generated with ElevenLabs from one reference portrait), one photo per problem scene
const HV = VERT ? '_v' : '';
const HER = { car: imgL(`assets/jour/h_carrefour${HV}.jpg`), midi: imgL(`assets/jour/h_midi${HV}.jpg`), colis: imgL(`assets/jour/h_colis${HV}.jpg`), soir: imgL(`assets/jour/h_soir${HV}.jpg`), appli: imgL(`assets/jour/h_appli${HV}.jpg`), fin: imgL(`assets/jour/h_fin${HV}.jpg`) };
const IMG = { car: imgL('assets/car.png'), moto: imgL('assets/moto.png'), tri: imgL('assets/tricycle.png'), plat: imgL('assets/cs/obj_plat.png'), colis: imgL('assets/cs/obj_colis.png'), logo: imgL('assets/mk_logo.png') };
// voice timings (seconds in the voice file), injected by jour_build.py from assets/jour/voix_journee.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 56.0;
const GR = '#12B76A', OJ = '#FF6B00';

/* ---------- text: words that blur in one after the other; *word* is highlighted ---------- */
const wordsHTML = s => s.split(/(\*[^*]+\*)/).map(seg => seg.startsWith('*') ? seg.slice(1, -1).split(' ').map(w => `<span class="w" style="color:${OJ}">${w}</span>`).join(' ') : seg.split(' ').filter(Boolean).map(w => `<span class="w">${w}</span>`).join(' ')).join(' ');
const LINES = {};
const line = (id, txt, y, size = 64, extra = '', yv, sizev) => { LINES[id] = 1; if (VERT) { y = yv ?? 1500; size = sizev ?? 62; extra = 'left:60px;right:60px'; } return `<div id="${id}" class="abs" style="left:120px;right:120px;top:${y}px;text-align:center;font:700 ${size}px Poppins;letter-spacing:-.015em;line-height:1.15;color:#fff;visibility:hidden;${extra}">${wordsHTML(txt)}</div>`; };
const WCACHE = {};
function say(id, t, a, b) {
  const e = el(id); const on = t >= a - .05 && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const ws = WCACHE[id] || (WCACHE[id] = [...e.querySelectorAll('.w')]); const q = P(t, b - .35, .35, E.iC);
  ws.forEach((w, i) => { const p = P(t, a + i * .07, .45, E.oQ); w.style.opacity = p * (1 - q); w.style.filter = `blur(${(1 - p) * 16 + q * 12}px)`; w.style.transform = `translateY(${(1 - p) * 26}px)`; });
}

/* ---------- layout ---------- */
const bub = (id, txt, side, x, y, avatar) => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;display:flex;align-items:flex-end;gap:16px;${side === 'r' ? 'flex-direction:row-reverse;' : ''}visibility:hidden">${avatar ? `<img src="${avatar}" style="width:76px;height:76px;border-radius:50%;border:3px solid #fff">` : ''}
<div style="max-width:620px;padding:22px 30px;border-radius:30px;${side === 'r' ? 'border-bottom-right-radius:8px;background:#DCF8C6' : 'border-bottom-left-radius:8px;background:#fff'};color:#111;font:600 40px Inter;line-height:1.2;box-shadow:0 20px 50px rgba(0,0,0,.35)">${txt}</div></div>`;
const card = (id, x, y, w, h, inner, extra = '') => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:40px;background:#fff;color:#111;box-shadow:0 40px 90px rgba(0,0,0,.4);visibility:hidden;${extra}">${inner}</div>`;
const MW = LY(1100, 960), MH = LY(560, 900);
const VEH = [['assets/moto.png', 'Zem', 300], ['assets/tricycle.png', 'Tricycle', 230], ['assets/car.png', 'Voiture', 320]];
const ORB = [['assets/moto.png', 'Zem.'], ['assets/tricycle.png', 'Tricycle.'], ['assets/car.png', 'Voiture.'], ['assets/cs/obj_plat.png', 'Repas.'], ['assets/cs/obj_colis.png', 'Colis.']];
document.documentElement.style.width = document.body.style.width = VW_ + 'px'; document.documentElement.style.height = document.body.style.height = VH_ + 'px';
stage.style.width = VW_ + 'px'; stage.style.height = VH_ + 'px';
H += `<canvas id="atm" class="abs" style="left:0;top:0" width="${VW_}" height="${VH_}"></canvas>
<div id="clk" class="abs" style="left:0;right:0;top:250px;text-align:center;color:#fff;visibility:hidden"><div id="clkd" style="font:600 30px Inter;letter-spacing:.32em;opacity:.8">MARDI</div><div id="clkt" style="font:800 230px Poppins;letter-spacing:-.03em;line-height:1;text-shadow:0 0 60px rgba(255,255,255,.35)">07:12</div></div>
<svg id="ring" class="abs" style="left:620px;top:60px;visibility:hidden" width="680" height="680" viewBox="0 0 680 680"><circle cx="340" cy="340" r="320" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="6"/><circle id="ringp" cx="340" cy="340" r="320" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-dasharray="2011" stroke-dashoffset="2011" transform="rotate(-90 340 340)"/></svg>
${bub('b0', 'C\'est combien pour Ganhi&nbsp;?', 'r', LY(1250, 380), LY(300, 1040))}${bub('b1', 'Ajoute un peu, c\'est l\'essence…', 'l', LY(1020, 50), LY(450, 1190), 'assets/jour/zem_face.png')}${bub('b2', 'Fais-moi un prix&nbsp;!', 'r', LY(1440, 600), LY(600, 1360))}
<div id="big" class="abs" style="left:${LY(980, 30)}px;right:30px;top:${LY(290, 1230)}px;text-align:center;font:900 ${LY(270, 230)}px Poppins;letter-spacing:-.05em;line-height:1;color:#fff;visibility:hidden">10 min</div>
<img id="iplat" src="assets/cs/obj_plat.png" class="abs" style="left:1440px;top:420px;width:400px;display:none;opacity:0;filter:blur(6px) grayscale(.4)">
<div id="route" class="abs" style="left:${LY(560, 0)}px;top:${LY(300, 1060)}px;width:${LY(1320, 1080)}px;height:420px;visibility:hidden">
<svg class="abs" style="left:${LY(300, 0)}px;top:0" width="1020" height="420"><path id="rpath" d="${LY('M20,250 C300,80 650,330 900,150', 'M330,360 C480,160 640,330 820,150')}" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="6" stroke-dasharray="4 18" stroke-linecap="round"/></svg>
<div class="abs" style="left:${LY(1190, 800)}px;top:${LY(70, 20)}px;text-align:center;font:700 38px Poppins">${'<div style="width:90px;height:90px;margin:0 auto 10px;border-radius:50%;border:4px dashed rgba(255,255,255,.8);display:grid;place-items:center;font:800 54px Poppins">?</div>'}Calavi</div></div>
${line('L0', 'Cotonou se réveille.', 640, 64, '', 1060)}${line('L1', 'Tu dois être à Ganhi à 8 h.', 640, 64, '', 1060)}
${line('L2', 'Au carrefour, ça recommence.', 860, 64, 'left:960px;right:40px')}${line('L3', 'Le prix monte, tu discutes.', 860, 64, 'left:960px;right:40px')}<div id="L4s" class="abs" style="left:${LY(980, 30)}px;right:30px;top:${LY(620, 1480)}px;text-align:center;font:700 64px Poppins;color:#fff;opacity:0">perdues.</div>
${line('L5', 'Tu as *faim.*', 700, 64, 'left:60px;right:900px')}${line('L6', 'Mais pas le temps de sortir.', 700, 64, 'left:60px;right:900px')}
${line('L7', 'Ta sœur attend un colis à *Calavi.*', 820, 64, 'left:760px;right:60px')}${line('L8', 'Et personne pour l\'envoyer.', 820, 64, 'left:760px;right:60px')}
${line('L9', 'Le soir tombe.', 700, 64, 'left:60px;right:900px')}${line('L10', 'Tu as passé la journée à te débrouiller.', 700, 64, 'left:60px;right:900px')}
${line('L11', 'Et si tout était dans *une seule appli&nbsp;?*', 430, 84, 'left:60px;right:860px', 1440, 76)}
<div id="rev" class="abs" style="left:0;right:0;top:${LY(260, 640)}px;text-align:center;visibility:hidden"><img id="revl" src="assets/mk_logo.png" style="width:300px;height:300px;filter:drop-shadow(0 0 60px rgba(255,107,0,.9))"><div id="revw" style="font:900 200px Poppins;letter-spacing:-.04em;line-height:1;color:#fff;margin-top:-10px">OJA</div></div>
<div id="bug" class="abs" style="left:60px;top:46px;display:flex;align-items:center;gap:14px;font:900 46px Poppins;color:#fff;opacity:0"><img src="assets/mk_logo.png" style="width:66px;height:66px">OJA</div>
${VEH.map(([src, n, w], i) => card('vc' + i, LY(420 + i * 380, 20 + i * 350), LY(210, 600), LY(340, 340), 470, `<div style="height:260px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:10px"><img src="${src}" style="width:${LY(w, w * .92)}px"></div>
<div style="text-align:center;font:800 46px Poppins">${n}</div><div style="display:flex;justify-content:center;margin-top:24px"><div style="position:relative;width:220px;height:62px;border-radius:31px;background:#F1F2F4;overflow:hidden"><div class="abs" style="inset:0;display:flex;align-items:center;justify-content:center;gap:8px;font:800 26px Inter;color:#9AA0AA">${ic('lock', 26, '#9AA0AA', 2.4)}Prix</div>
<div id="vcf${i}" class="abs" style="inset:0;background:${GR};color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font:800 26px Inter;clip-path:inset(0 100% 0 0)">${ic('check', 28, '#fff', 3)}Prix fixé</div></div></div>`, 'border:5px solid transparent')).join('')}
${card('rc', LY(560, 60), LY(200, 560), LY(800, 960), 470, `<div style="display:flex;height:100%;align-items:center;gap:30px;padding:0 40px"><img src="assets/cs/obj_plat.png" style="width:330px">
<div style="flex:1"><div style="font:800 46px Poppins">Ta commande</div>${['Commande acceptée', 'En route'].map((s, i) => `<div id="rr${i}" style="display:flex;align-items:center;gap:14px;font:600 32px Inter;margin-top:22px;opacity:0"><span style="width:44px;height:44px;border-radius:50%;background:${GR};display:grid;place-items:center">${ic('check', 26, '#fff', 3.4)}</span>${s}</div>`).join('')}
<div id="momo" style="display:inline-block;margin-top:30px;padding:14px 26px;border-radius:30px;background:#FFCC00;color:#111;font:800 32px Inter;opacity:0">Payé par MoMo</div></div></div>`)}
${card('mc', LY(410, 60), LY(170, 420), MW, MH, `<canvas id="mapc" class="abs" style="left:0;top:0;border-radius:40px" width="${MW}" height="${MH}"></canvas>
<div class="abs" style="left:34px;top:30px;display:flex;align-items:center;gap:12px;padding:10px 22px;border-radius:24px;background:#111;color:#fff;font:800 26px Inter;letter-spacing:.12em"><span id="live" style="width:16px;height:16px;border-radius:50%;background:#F04438"></span>EN DIRECT</div>`, 'overflow:hidden;background:#0f1320')}
${card('qc', LY(560, 60), LY(170, 560), LY(800, 960), 520, `<div style="padding:44px 50px;text-align:center"><div style="display:flex;align-items:center;justify-content:center;gap:14px;font:800 34px Inter;color:#0B7A5E"><span style="width:50px;height:50px;border-radius:50%;background:${GR};display:grid;place-items:center">${ic('check', 28, '#fff', 3)}</span>Course terminée</div>
<div style="height:2px;background:#EEE;margin:30px 0"></div><div id="qq" style="font:700 42px Inter;line-height:1.25;padding:14px;border-radius:20px">Le chauffeur a-t-il demandé plus d'argent&nbsp;?</div>
<div style="display:flex;justify-content:center;gap:30px;margin-top:34px">${['OUI', 'NON'].map(s => `<span style="padding:18px 54px;border-radius:40px;border:3px solid #DDD;font:800 32px Inter">${s}</span>`).join('')}</div></div>`)}
<canvas id="road" class="abs" style="left:0;top:0;visibility:hidden" width="${VW_}" height="${VH_}"></canvas>
<div id="same" class="abs" style="left:${LY(1180, 290)}px;top:${LY(200, 760)}px;padding:18px 34px;border-radius:24px;border:7px solid ${GR};color:${GR};background:rgba(231,246,239,.95);font:900 54px Poppins;display:flex;align-items:center;gap:14px;visibility:hidden">${ic('check', 52, GR, 3.4)}MÊME PRIX</div>
${line('L12', 'Tu choisis ta course.', 800, 64, '', 1180)}${line('L13', 'Le prix s\'affiche *avant de monter.*', 800, 64, '', 1180)}
${line('L14', 'Ton repas arrive, payé par *MoMo.*', 800, 64, '', 1180)}
${line('L15', 'Ton colis traverse Cotonou,', 820, 64, '', 1420)}${line('L16', 'et tu suis le livreur *en direct.*', 820, 64, '', 1420)}
${line('L17', 'À la fin de chaque course, *une question.*', 800, 64, '', 1200)}
${line('L18', 'Le moteur lâche&nbsp;?', 800, 64, '', 1240)}${line('L19', 'Un autre chauffeur OJA finit le trajet.', 800, 64, '', 1240)}${line('L20', 'Au *même prix.*', 800, 64, '', 1240)}
<div id="orb" class="abs" style="left:0;top:0;width:${VW_}px;height:${VH_}px;visibility:hidden"><img src="assets/mk_logo.png" class="abs" style="left:${LY(840, 420)}px;top:${LY(300, 700)}px;width:240px;height:240px;filter:drop-shadow(0 0 50px rgba(255,107,0,.8))">
${ORB.map(([src], i) => `<div id="ob${i}" class="abs" style="left:0;top:0;width:180px;height:180px;margin:-90px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 20px 50px rgba(0,0,0,.35)"><img src="${src}" style="width:${i === 2 ? 150 : 120}px"></div>`).join('')}
${ORB.map(([, n], i) => `<div id="on${i}" class="abs" style="left:0;right:0;top:${LY(800, 1300)}px;text-align:center;font:800 110px Poppins;letter-spacing:-.03em;color:#fff;opacity:0">${n}</div>`).join('')}</div>
<div id="fin" class="abs" style="left:0;top:0;width:${VW_}px;height:${VH_}px;visibility:hidden">
<div class="abs" style="left:${LY(980, 70)}px;top:${LY(200, 1180)}px;width:${LY(860, 940)}px"><div style="display:flex;align-items:center;gap:26px"><img id="fl" src="assets/mk_logo.png" style="width:170px;height:170px"><div id="fw" style="font:900 170px Poppins;letter-spacing:-.04em;line-height:1;color:#fff">OJA</div></div>
<div id="fs" style="font:800 76px Poppins;letter-spacing:-.02em;line-height:1.1;color:#fff;margin-top:40px">Tout ton Bénin<br>dans <span style="color:${OJ}">une seule appli.</span></div>
<div id="fst" style="display:flex;gap:24px;margin-top:56px">${[['phone', 'Télécharger sur', 'App Store'], ['play', 'Disponible sur', 'Google Play']].map(([icn, sm, big]) => `<div style="width:330px;height:104px;border-radius:26px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:18px;padding:0 26px;color:#fff">${ic(icn, 46, '#fff', 1.8)}<div><div style="font:500 20px Inter;opacity:.75">${sm}</div><div style="font:700 34px Poppins;line-height:1.1">${big}</div></div></div>`).join('')}</div></div>
<div id="fm" class="abs" style="left:${LY(120, 60)}px;right:${LY(120, 60)}px;top:${LY(1000, 1790)}px;text-align:center;font:500 22px Inter;color:rgba(255,255,255,.6)">Prix calculé avant la course. OJA Market : paiement MTN MoMo. En cas de panne, le prix total de la course ne change pas. Personnes des images générées par IA.</div></div>
<div id="flash" class="lay" style="width:${VW_}px;height:${VH_}px;background:radial-gradient(circle at 50% 45%,#fff,rgba(255,170,90,.85) 35%,rgba(255,107,0,0) 70%);opacity:0;z-index:40"></div>
<div id="fade" style="width:${VW_}px;height:${VH_}px"></div>`;
stage.innerHTML = H;

/* ---------- atmosphere: palette by time of day, glow blobs, bokeh, extras ---------- */
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
const PAL = {
  dawn: ['#1c0b03', '#a8501a', '#ff9a3c', '#ffd27a'], street: ['#140303', '#6e0d07', '#ff3b2f', '#ff8a2a'], noon: ['#3a2b12', '#d9a24a', '#fff1c2', '#ffd27a'],
  dusk: ['#120822', '#5a2a6e', '#c46bff', '#ff7aa8'], night: ['#02030a', '#0a1230', '#2b4cff', '#6a3cff'], void: ['#000000', '#040302', '#ff6b00', '#ff9a4d'],
  brand: ['#1a0700', '#d65400', '#ffb36b', '#ff6b00'], dark: ['#0d0502', '#3d1503', '#ff6b00', '#ff9a4d']
};
const PKEYS = () => [[0, 'dawn'], [V('carref') - .2, 'street'], [V('midi') - .2, 'noon'], [V('seize') - .2, 'dusk'], [V('soir') - .2, 'night'], [V('siTout') - .2, 'void'], [V('voici') - .05, 'brand'], [V('fin') - .2, 'dark'], [V('moteur') - .2, 'brand'], [V('endA') - .3, 'dark']];
function palette(t) {
  const K = PKEYS(); let i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
  const cur = PAL[K[i][1]], prv = PAL[K[Math.max(0, i - 1)][1]], k = i ? P(t, K[i][0], .8, E.ioC) : 1;
  return [cur.map((c, j) => mix(hex(prv[j]), hex(c), k)), K[i][1], k];
}
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const BOK = (() => { const r = rng(4); return Array.from({ length: 70 }, () => ({ x: r() * VW_, y: r() * VH_, z: .3 + r() * .9, s: .2 + r(), ph: r() * 6.28 })); })();
const STARS = (() => { const r = rng(8); return Array.from({ length: 160 }, () => [r() * LY(960, 1080), r() * LY(1080, 560), .5 + r() * 1.8, r() * 6.28]); })();
function atmosphere(t) {
  const c = el('atm').getContext('2d'), [p, name] = palette(t);
  const g = c.createLinearGradient(0, 0, 0, VH_); g.addColorStop(0, rgba(p[0], 1)); g.addColorStop(1, rgba(p[1], 1)); c.fillStyle = g; c.fillRect(0, 0, VW_, VH_);
  heroine(c, t, p);
  c.save(); c.globalCompositeOperation = 'lighter';
  // soft glow blobs drifting
  [[.25, .3, 700, 2], [.75, .65, 800, 3], [.5, 1.05, 900, 2]].forEach(([fx, fy, R, ci], i) => {
    const x = VW_ * fx + Math.sin(t * .23 + i * 2) * 120, y = VH_ * fy + Math.cos(t * .19 + i) * 60, gg = c.createRadialGradient(x, y, 0, x, y, R);
    gg.addColorStop(0, rgba(p[ci], name === 'void' ? .05 : .32)); gg.addColorStop(1, rgba(p[ci], 0)); c.fillStyle = gg; c.fillRect(x - R, y - R, 2 * R, 2 * R); });
  // bokeh
  BOK.forEach((b, i) => { const x = (b.x + t * 20 * b.z) % (VW_ + 80) - 40, y = b.y + Math.sin(t * .5 + b.ph) * 20, r = 6 + b.s * 34 * b.z, a = (name === 'void' ? .05 : .22) * b.z * (.6 + .4 * Math.sin(t * 1.3 + b.ph));
    const gg = c.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, rgba(p[3], a)); gg.addColorStop(.7, rgba(p[3], a * .5)); gg.addColorStop(1, rgba(p[3], 0)); c.fillStyle = gg; c.fillRect(x - r, y - r, 2 * r, 2 * r); });
  c.restore();
  const vis = (a, b) => P(t, a - .3, .6) * (1 - P(t, b - .3, .6));
  // dawn: the sun rising at the bottom
  let a = vis(0, V('carref')); if (a > 0) { const sx = VW_ / 2, y = VH_ + 100 - P(t, 0, 5, E.oQ) * LY(220, 420), gg = c.createRadialGradient(sx, y, 0, sx, y, LY(520, 700)); gg.addColorStop(0, `rgba(255,230,170,${.9 * a})`); gg.addColorStop(.25, `rgba(255,160,70,${.45 * a})`); gg.addColorStop(1, 'rgba(255,120,40,0)'); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = gg; c.fillRect(0, 0, VW_, VH_); c.restore(); }
  // street: horizontal light trails of the traffic
  a = vis(V('carref'), V('midi')); if (a > 0) { c.save(); c.beginPath(); VERT ? c.rect(0, 980, 1080, 940) : c.rect(960, 0, 960, 1080); c.clip(); c.globalCompositeOperation = 'lighter'; const r = rng(17);
    for (let k = 0; k < 40; k++) { const y = LY(120, 1000) + r() * 900, sp = 600 + r() * 1400, x = ((r() * 3000 + t * sp) % 3000) - 600, l = 200 + r() * 600, col = r() < .7 ? '255,80,40' : '255,230,200';
      const gg = c.createLinearGradient(x, 0, x + l, 0); gg.addColorStop(0, `rgba(${col},0)`); gg.addColorStop(1, `rgba(${col},${(.25 + r() * .4) * a})`); c.fillStyle = gg; c.fillRect(x, y, l, 2 + r() * 5); }
    c.restore(); }
  // dusk: a big pale moon on the left
  a = vis(V('seize'), V('soir') + .4); if (a > 0) { const x = LY(1720, 960), y = LY(150, 120) + (1 - P(t, V('seize') - .3, 2, E.oQ)) * 120, gg = c.createRadialGradient(x, y, 0, x, y, LY(260, 170));
    gg.addColorStop(0, `rgba(255,255,255,${a})`); gg.addColorStop(.45, `rgba(255,250,245,${.95 * a})`); gg.addColorStop(.5, `rgba(255,200,230,${.35 * a})`); gg.addColorStop(1, 'rgba(255,150,220,0)'); c.fillStyle = gg; c.fillRect(x - 260, y - 260, 520, 520); }
  // night: stars
  a = vis(V('soir'), V('voici')); if (a > 0) STARS.forEach(([x, y, s, ph]) => { c.fillStyle = `rgba(255,255,255,${a * (.35 + .5 * Math.abs(Math.sin(t * 1.4 + ph)))})`; c.fillRect(x, y, s, s); });
  // the question: one point of light grows in the dark
  a = vis(V('siTout'), V('voici') + .2); if (a > 0) { const k = P(t, V('siTout'), V('voici') - V('siTout'), E.iC), R = 30 + k * 380, qx = LY(960, 540), qy = LY(540, 1260), gg = c.createRadialGradient(qx, qy, 0, qx, qy, R);
    gg.addColorStop(0, `rgba(255,230,200,${a})`); gg.addColorStop(.2, `rgba(255,140,40,${.6 * a})`); gg.addColorStop(1, 'rgba(255,107,0,0)'); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = gg; c.fillRect(0, 0, VW_, VH_); c.restore(); }
  // reveal and features: slow light rays behind
  a = vis(V('voici') - .1, V('course') + .6) + .35 * vis(V('liste') - .2, V('endA') + .2); if (a > 0) { c.save(); c.globalCompositeOperation = 'lighter'; c.translate(LY(960, 540), LY(420, 820));
    for (let k = 0; k < 18; k++) { c.rotate(Math.PI * 2 / 18); const ang = t * .08, gg = c.createLinearGradient(0, 0, 1300, 0); gg.addColorStop(0, `rgba(255,200,140,${.22 * a})`); gg.addColorStop(1, 'rgba(255,107,0,0)');
      c.save(); c.rotate(ang); c.fillStyle = gg; c.beginPath(); c.moveTo(0, 0); c.lineTo(1300, -40); c.lineTo(1300, 40); c.closePath(); c.fill(); c.restore(); }
    c.restore(); }
  // on the orange brand palette, a dark band under the text lines keeps the white and orange words readable
  const w = brandW(t); if (w > 0) { const y0 = LY(600, 1000), sg = c.createLinearGradient(0, y0, 0, VH_); sg.addColorStop(0, 'rgba(26,6,0,0)'); sg.addColorStop(.45, `rgba(26,6,0,${.6 * w})`); sg.addColorStop(1, `rgba(26,6,0,${.75 * w})`); c.fillStyle = sg; c.fillRect(0, y0, VW_, VH_ - y0); }
}
function brandW(t) {
  const K = PKEYS(); let i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
  const k = i ? P(t, K[i][0], .8, E.ioC) : 1; return (K[i][1] === 'brand' ? k : 0) + (i && K[i - 1][1] === 'brand' ? 1 - k : 0);
}

// [from, to, photo, side of the heroine]
const HSHOW = () => [[V('carref') - .1, V('midi') - .1, 'car', 'L'], [V('midi') - .1, V('seize') - .1, 'midi', 'R'], [V('seize') - .1, V('soir') - .1, 'colis', 'L'], [V('soir') - .1, V('siTout') - .1, 'soir', 'R'], [V('siTout') - .1, V('voici') - .05, 'appli', 'R'], [V('endA') - .3, DUR2 + 1, 'fin', 'L']];
function heroine(c, t, p) {
  HSHOW().forEach(([a, b, k, side]) => {
    const al = P(t, a - .2, .6, E.ioC) * (1 - P(t, b - .35, .45, E.iC)); if (al <= 0) return;
    const im = HER[k], sc = 1.04 + .06 * clamp((t - a) / Math.min(b - a, 7)), w = VW_ * sc, h = VH_ * sc;
    c.save(); c.globalAlpha = al * (k === 'appli' ? .85 : .95); c.drawImage(im, (VW_ - w) / 2 + (side === 'L' ? 20 : -20) * (1 - sc), (VH_ - h) / 2, w, h);
    c.globalAlpha = al * (k === 'fin' ? .18 : .35); c.globalCompositeOperation = 'overlay'; c.fillStyle = rgba(p[1], 1); c.fillRect(0, 0, VW_, VH_);
    c.globalCompositeOperation = 'source-over'; c.globalAlpha = al;
    if (VERT) { const tg = c.createLinearGradient(0, 0, 0, 520); tg.addColorStop(0, rgba(p[0], .75)); tg.addColorStop(1, rgba(p[0], 0)); c.fillStyle = tg; c.fillRect(0, 0, VW_, 520);
      const bg = c.createLinearGradient(0, 960, 0, VH_); bg.addColorStop(0, rgba(p[0], 0)); bg.addColorStop(.45, rgba(p[0], .78)); bg.addColorStop(1, rgba(p[0], .95)); c.fillStyle = bg; c.fillRect(0, 960, VW_, VH_ - 960); c.restore(); return; }
    const g = side === 'L' ? c.createLinearGradient(1920, 0, 600, 0) : c.createLinearGradient(0, 0, 1320, 0);
    g.addColorStop(0, rgba(p[0], .9)); g.addColorStop(.45, rgba(p[0], .55)); g.addColorStop(1, rgba(p[0], 0)); c.fillStyle = g; c.fillRect(0, 0, 1920, 1080);
    const v = c.createLinearGradient(0, 600, 0, 1080); v.addColorStop(0, rgba(p[0], 0)); v.addColorStop(1, rgba(p[0], .7)); c.fillStyle = v; c.fillRect(0, 600, 1920, 480);
    c.restore();
  });
}

/* ---------- scene helpers ---------- */
function pop(id, t, a, b, dy = 60) {
  const e = el(id), on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return 0;
  const p = P(t, a, .55, E.oB), q = P(t, b - .35, .35, E.iC); e.style.opacity = clamp(p * 1.5) * (1 - q); e.style.transform = `translateY(${(1 - p) * dy}px) scale(${lerp(.85, 1, p) * lerp(1, .94, q)})`; e.style.filter = `blur(${q * 10}px)`;
  return p;
}
function clock(t) {
  const S = [[V('t0') - .2, V('carref') - .15, '07:12', 'big', 960], [V('carref'), V('midi') - .15, '07:31', 'top', 1440], [V('midi') - .1, V('seize') - .15, '12:40', 'big', 520], [V('seize') - .1, V('soir') - .15, '16:05', 'top', 1340], [V('soir') - .1, V('siTout') - .2, '19:48', 'big', 520]];
  const s = S.find(([a, b]) => t >= a && t < b), e = el('clk');
  if (!s) { e.style.visibility = 'hidden'; el('ring').style.visibility = 'hidden'; return; }
  const [a, b, txt, mode0, cx0] = s, cx = LY(cx0, 540), mode = VERT && txt !== '07:12' ? 'vtop' : mode0, p = P(t, a, .6, E.oQ), q = P(t, b - .35, .35, E.iC); e.style.visibility = 'visible'; e.style.left = (cx - 600) + 'px'; e.style.right = 'auto'; e.style.width = '1200px';
  el('ring').style.left = (cx - 340) + 'px';
  el('clkt').textContent = txt; el('clkt').style.fontSize = mode === 'big' ? '230px' : mode === 'vtop' ? '160px' : '120px'; el('clkd').style.display = mode === 'top' ? 'none' : 'block';
  e.style.top = mode === 'big' ? LY('250px', '680px') : mode === 'vtop' ? '110px' : '90px'; e.style.opacity = p * (1 - q); e.style.filter = `blur(${(1 - p) * 20 + q * 14}px)`; e.style.transform = `scale(${lerp(1.08, 1, p)})`;
  const ringOn = txt === '12:40' && !VERT; el('ring').style.visibility = ringOn ? 'visible' : 'hidden';
  if (ringOn) { el('ring').style.opacity = p * (1 - q); el('ringp').style.strokeDashoffset = 2011 * (1 - P(t, a + .3, b - a - .6, E.lin)); }
}
function chat(t) {
  [['b0', V('combien') - .1], ['b1', V('combien') + .9], ['b2', V('combien') + 2.0]].forEach(([id, a]) => {
    const e = el(id), on = t >= a && t < V('perdues') + .1; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
    const p = P(t, a, .45, E.oB), q = P(t, V('perdues') - .3, .4, E.iC); e.style.opacity = clamp(p * 1.5) * (1 - q); e.style.transform = `translateY(${(1 - p) * 40}px) scale(${lerp(.8, 1, p)})`; e.style.filter = `blur(${q * 18}px)`;
  });
  const bp = P(t, V('perdues') - .05, .7, E.oQ), bq = P(t, V('midi') - .45, .35), e = el('big'), on = t >= V('perdues') - .05 && t < V('midi') - .1;
  e.style.visibility = on ? 'visible' : 'hidden'; e.style.opacity = bp * (1 - bq) * .95; e.style.filter = `blur(${(1 - bp) * 30 + bq * 20}px)`; e.style.transform = `scale(${lerp(1.3, 1, bp)})`; e.style.color = `rgb(255,${Math.round(lerp(255, 120, bp))},${Math.round(lerp(255, 90, bp))})`;
  el('L4s').style.opacity = P(t, V('perdues') + .5, .4) * (1 - bq);
}
function vehicles(t) {
  const sel = t < V('vz') - .05 ? -1 : t < V('vt') ? 0 : t < V('vv') + .05 ? 1 : 2;
  for (let i = 0; i < 3; i++) { pop('vc' + i, t, V('course') - .05 + i * .12, V('repas') - .1, 80); el('vc' + i).style.borderColor = i === sel && t < V('prix') ? OJ : 'transparent';
    el('vcf' + i).style.clipPath = `inset(0 ${100 - P(t, V('prix') + .1 + i * .15, .4, E.oQ) * 100}% 0 0)`; }
}
function meal(t) {
  pop('rc', t, V('repas') - .1, V('colis') - .1, 80);
  [0, 1].forEach(i => { el('rr' + i).style.opacity = P(t, V('repas') + .3 + i * .35, .35); });
  const m = P(t, V('repas') + 1.0, .4, E.oB); el('momo').style.opacity = clamp(m * 1.5); el('momo').style.transform = `scale(${lerp(.6, 1, m)})`;
}
function parcel(t) {
  const p = pop('mc', t, V('colis') - .1, V('fin') - .1, 80); if (!p) return;
  const c = el('mapc').getContext('2d'); c.fillStyle = '#0f1320'; c.fillRect(0, 0, MW, MH);
  const R = rng(5); c.strokeStyle = '#1e2638';
  for (let i = 0; i < 14; i++) { c.lineWidth = 4 + R() * 10; const y = R() * MH; c.beginPath(); c.moveTo(-20, y); c.lineTo(MW + 20, y - 160 + (R() - .5) * 60); c.stroke(); }
  for (let i = 0; i < 12; i++) { c.lineWidth = 4 + R() * 10; const x = R() * MW; c.beginPath(); c.moveTo(x, -20); c.lineTo(x + 200, MH + 20); c.stroke(); }
  c.fillStyle = '#16314a'; c.beginPath(); c.moveTo(0, MH - 90); c.bezierCurveTo(MW * .27, MH - 120, MW * .64, MH - 40, MW, MH - 90); c.lineTo(MW, MH); c.lineTo(0, MH); c.fill();
  const [X0, Y0, X1, Y1] = LY([170, 420, 930, 190], [220, 720, 740, 230]), pt = u => [lerp(X0, X1, u), lerp(Y0, Y1, u) - Math.sin(u * Math.PI) * 120];
  c.strokeStyle = 'rgba(255,107,0,.35)'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); for (let i = 0; i <= 60; i++) { const [x, y] = pt(i / 60); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
  const k = P(t, V('colis') + .3, 3.0, E.ioC); c.strokeStyle = OJ; c.beginPath(); for (let i = 0; i <= 60; i++) { const [x, y] = pt(k * i / 60); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
  c.font = '800 34px Poppins'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Cotonou', X0, Y0 + 60); c.fillText('Abomey-Calavi', X1, Y1 - 50);
  [[X0, Y0], [X1, Y1]].forEach(([x, y]) => { c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y - 10, 14, 0, Math.PI * 2); c.fill(); });
  const [rx, ry] = pt(k); c.save(); c.globalCompositeOperation = 'lighter'; const gg = c.createRadialGradient(rx, ry, 0, rx, ry, 90); gg.addColorStop(0, 'rgba(255,140,40,.8)'); gg.addColorStop(1, 'rgba(255,107,0,0)'); c.fillStyle = gg; c.fillRect(rx - 90, ry - 90, 180, 180); c.restore();
  c.drawImage(IMG.moto, rx - 75, ry - 95, 150, 111);
  el('live').style.opacity = .4 + .6 * Math.abs(Math.sin(t * 3));
}
function question(t) {
  pop('qc', t, V('fin') - .1, V('moteur') - .1, 80);
  const g = P(t, V('question') - .1, .4) * (1 - P(t, V('moteur') - .6, .3)); el('qq').style.background = `rgba(255,107,0,${.14 * g})`; el('qq').style.boxShadow = `0 0 0 ${4 * g}px rgba(255,107,0,${.8 * g})`;
}
function breakdown(t) {
  const on = t >= V('moteur') - .1 && t < V('liste') - .1, e = el('road'); e.style.visibility = on ? 'visible' : 'hidden'; if (!on) { el('same').style.visibility = 'hidden'; return; }
  const c = e.getContext('2d'); c.clearRect(0, 0, VW_, VH_); const BASE = LY(740, 1100), op = P(t, V('moteur') - .1, .5) * (1 - P(t, V('liste') - .45, .35)); c.globalAlpha = op;
  c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(0, BASE + 6, VW_, 4);
  const w = LY(640, 460), h = w * 301 / 823, stop = P(t, V('moteur') - .1, .8, E.oQ), side = P(t, V('autre') - .1, .8, E.ioC);
  const x1 = LY(lerp(1300, 820, stop) - side * 420, lerp(1000, 560, stop) - side * 300);
  c.save(); c.drawImage(IMG.car, x1 - w / 2, BASE - h, w, h); c.globalCompositeOperation = 'source-atop'; c.fillStyle = `rgba(10,8,8,${.45 * side})`; c.fillRect(x1 - w / 2, BASE - h, w, h); c.restore();
  if (t > V('moteur') + .5) { const on2 = Math.floor((t - V('moteur')) * 3) % 2 === 0 ? 1 : 0; c.save(); c.globalCompositeOperation = 'lighter';
    for (const fx of [-.42, .46]) { const x = x1 + fx * w, y = BASE - h * .5, gg = c.createRadialGradient(x, y, 0, x, y, 120); gg.addColorStop(0, `rgba(255,180,60,${.9 * on2})`); gg.addColorStop(1, 'rgba(255,120,0,0)'); c.fillStyle = gg; c.fillRect(x - 120, y - 120, 240, 240); } c.restore(); }
  const k2 = P(t, V('autre') + .1, 1.0, E.oQ); if (k2 > 0) c.drawImage(IMG.car, LY(lerp(2100, 1330, k2), lerp(1500, 800, k2)) - w / 2, BASE - h, w, h);
  c.globalAlpha = 1;
  const sp = P(t, V('meme') - .1, .35, E.oB), s = el('same'); s.style.visibility = t >= V('meme') - .1 && t < V('liste') - .1 ? 'visible' : 'hidden';
  s.style.transform = `rotate(${lerp(-20, -6, sp)}deg) scale(${lerp(2, 1, sp)})`; s.style.opacity = clamp(sp * 2) * (1 - P(t, V('liste') - .45, .35));
}
function orbit(t) {
  const on = t >= V('liste') - .2 && t < V('endA') - .1, e = el('orb'); e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const p = P(t, V('liste') - .2, .6, E.oQ), q = P(t, V('endA') - .45, .35); e.style.opacity = p * (1 - q);
  const step = (V('endA') - .2 - V('liste')) / 5;
  ORB.forEach((_, i) => { const a0 = V('liste') + i * step, ang = -Math.PI / 2 + i * Math.PI * 2 / 5 + t * .35, x = LY(960, 540) + Math.cos(ang) * LY(560, 400), y = LY(420, 820) + Math.sin(ang) * LY(270, 330);
    const pi = P(t, a0 - .15, .4, E.oB), act = t >= a0 && t < a0 + step; const ob = el('ob' + i);
    ob.style.transform = `translate(${x}px,${y}px) scale(${lerp(.3, 1, pi) * (act ? 1.18 : 1)})`; ob.style.opacity = clamp(pi * 1.5); ob.style.boxShadow = act ? '0 0 0 8px rgba(255,107,0,.9),0 20px 50px rgba(0,0,0,.35)' : '0 20px 50px rgba(0,0,0,.35)';
    const n = el('on' + i), np = P(t, a0, .3, E.oQ), nq = P(t, a0 + step - .1, .2); n.style.opacity = act ? np * (1 - nq) : 0; n.style.transform = `translateY(${(1 - np) * 30}px)`; n.style.filter = `blur(${(1 - np) * 12}px)`; });
}
function finale(t) {
  const on = t >= V('endA') - .3, e = el('fin'); e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  // her smiling photo is drawn by heroine() under the glows; the texts come on the free side
  const lp = P(t, V('endA') - .2, .6, E.oB); el('fl').style.transform = `scale(${lerp(.5, 1, lp)})`; el('fl').style.opacity = clamp(lp * 1.5);
  el('fw').style.clipPath = `inset(-20% ${100 - P(t, V('endA'), .5, E.oQ) * 100}% -20% 0)`;
  const sp = P(t, V('endB'), .7, E.oQ); el('fs').style.opacity = sp; el('fs').style.transform = `translateY(${(1 - sp) * 30}px)`; el('fs').style.filter = `blur(${(1 - sp) * 12}px)`;
  const st = P(t, V('endB') + 2.2, .6, E.oQ); el('fst').style.opacity = st; el('fst').style.transform = `translateY(${(1 - st) * 30}px)`;
  el('fm').style.opacity = P(t, V('endB') + 2.6, .6) * .9;
}

/* ---------- master ---------- */
window.renderAt = function (t) {
  atmosphere(t); clock(t); chat(t);
  // A: the day
  say('L0', t, V('t0') + .9, V('ganhi') - .1); say('L1', t, V('ganhi'), V('carref') - .15);
  say('L2', t, V('carref'), V('combien') - .1); say('L3', t, V('combien') + .9, V('perdues') - .1);
  say('L5', t, V('faim'), V('pastemps') - .1); say('L6', t, V('pastemps'), V('seize') - .15);
  const ip = P(t, V('pastemps') - .2, .6) * (1 - P(t, V('seize') - .45, .35)); el('iplat').style.opacity = ip * .55; el('iplat').style.transform = `translateY(${(1 - ip) * 40}px)`;
  pop('route', t, V('soeur') - .1, V('soir') - .15, 40); el('rpath').style.stroke = t >= V('personne') ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.75)';
  say('L7', t, V('soeur'), V('personne') - .1); say('L8', t, V('personne'), V('soir') - .15);
  say('L9', t, V('soir'), V('debrouiller') - .1); say('L10', t, V('debrouiller'), V('siTout') - .2);
  say('L11', t, V('siTout'), V('voici') - .15);
  // B: OJA
  const rv = el('rev'), ron = t >= V('voici') - .1 && t < V('course') + .1; rv.style.visibility = ron ? 'visible' : 'hidden';
  if (ron) { const p = P(t, V('voici') - .1, .7, E.oB), q = P(t, V('course') - .3, .4, E.iC); rv.style.opacity = clamp(p * 1.5) * (1 - q); rv.style.transform = `scale(${lerp(.6, 1, p) * lerp(1, 1.15, q)})`; rv.style.filter = `blur(${(1 - clamp(p)) * 20 + q * 16}px)`; }
  el('bug').style.opacity = P(t, V('course'), .6) * (1 - P(t, V('endA') - .5, .4));
  vehicles(t); say('L12', t, V('course'), V('prix') - .1); say('L13', t, V('prix'), V('repas') - .15);
  meal(t); say('L14', t, V('repas'), V('colis') - .15);
  parcel(t); say('L15', t, V('colis'), V('direct') - .1); say('L16', t, V('direct'), V('fin') - .15);
  question(t); say('L17', t, V('fin'), V('moteur') - .15);
  breakdown(t); say('L18', t, V('moteur'), V('autre') - .1); say('L19', t, V('autre'), V('meme') - .1); say('L20', t, V('meme'), V('liste') - .15);
  orbit(t); finale(t);
  let fl = 0;
  for (const [a, d, m] of [[V('voici') - .2, .35, .85], [V('endA') - .35, .3, .3]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .4, E.lin), P(t, DUR2 - .6, .6, E.lin)));
};
