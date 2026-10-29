/* ============================================================
   OJA — « Le local devient visible », film lieux 16:9 (1920 × 1080) and 9:16, 52 s, voice: Isac (assets/lieux/voix_lieux.mp3, from 0.6 s).
   Same brand-film style as « Une journée à Cotonou » (big time stamps, colour of the hour, word-by-word blur-in text,
   bubbles, glow and bokeh, one generated heroine): a dressmaker at the end of a von in Akpakpa whom nobody finds.
   Act 1: 09 h 00 she opens, 11 h 20 a client lost between three blue shops (split screen + map), 14 h 00 the empty
   workshop, the message « Laisse, j'ai trouvé ailleurs ». Act 2 (live features only): add a place (name, category,
   exact point, photos), search with everyday words, public places added by everyone, published when two people give
   the same name at the same spot or after OJA team validation, report an error. No amount, no figure, no store-version
   feature (« C'est mon commerce »), no place Défis (dependency). Workshop and place names are fictional.
   ============================================================ */
// VERT is set by lieu_build.py: false for the 16:9 film, true for the 9:16 version (same story, positions below)
const VERT = /*VERT*/false;
const VW_ = VERT ? 1080 : 1920, VH_ = VERT ? 1920 : 1080, VO = 0.6;
const LY = (h, v) => VERT ? v : h;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
// the dressmaker (generated with ElevenLabs from one reference portrait) and the lost client
const HV = VERT ? '_v' : '';
const HER = { ouvre: imgL(`assets/lieux/h_ouvre${HV}.jpg`), appel: imgL(`assets/lieux/h_appel${HV}.jpg`), vide: imgL(`assets/lieux/h_vide${HV}.jpg`), msg: imgL(`assets/lieux/h_msg${HV}.jpg`), fin: imgL(`assets/lieux/h_fin${HV}.jpg`) };
const CLI = imgL(`assets/lieux/cliente${HV}.jpg`), APT = imgL('assets/lieux/h_appel_t.jpg');
// voice timings (seconds in the voice file), injected by lieu_build.py from assets/lieux/voix_lieux.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 52.0;
const GR = '#12B76A', OJ = '#FF6B00', BLU = '#2F6FD6';
ICONS.flag = '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/>';

/* ---------- text: words that blur in one after the other; *word* is highlighted ---------- */
const wordsHTML = s => s.split(/(\*[^*]+\*)/).map(seg => seg.startsWith('*') ? seg.slice(1, -1).split(' ').map(w => `<span class="w" style="color:${OJ}">${w}</span>`).join(' ') : seg.split(' ').filter(Boolean).map(w => `<span class="w">${w}</span>`).join(' ')).join(' ');
const line = (id, txt, y, size = 64, extra = '', yv, sizev) => { if (VERT) { y = yv ?? 1500; size = sizev ?? 62; extra = 'left:60px;right:60px'; } return `<div id="${id}" class="abs" style="left:120px;right:120px;top:${y}px;text-align:center;font:700 ${size}px Poppins;letter-spacing:-.015em;line-height:1.15;color:#fff;visibility:hidden;${extra}">${wordsHTML(txt)}</div>`; };
const WCACHE = {};
function say(id, t, a, b) {
  const e = el(id); const on = t >= a - .05 && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const ws = WCACHE[id] || (WCACHE[id] = [...e.querySelectorAll('.w')]); const q = P(t, b - .35, .35, E.iC);
  ws.forEach((w, i) => { const p = P(t, a + i * .07, .45, E.oQ); w.style.opacity = p * (1 - q); w.style.filter = `blur(${(1 - p) * 16 + q * 12}px)`; w.style.transform = `translateY(${(1 - p) * 26}px)`; });
}

/* ---------- layout ---------- */
const bub = (id, txt, side, x, y) => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;visibility:hidden">
<div style="padding:22px 30px;border-radius:30px;${side === 'r' ? 'border-bottom-right-radius:8px;background:#DCF8C6' : 'border-bottom-left-radius:8px;background:#fff'};color:#111;font:600 40px Inter;line-height:1.2;white-space:nowrap;box-shadow:0 20px 50px rgba(0,0,0,.35)">${txt}</div></div>`;
const card = (id, x, y, w, h, inner, extra = '') => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:40px;background:#fff;color:#111;box-shadow:0 40px 90px rgba(0,0,0,.4);visibility:hidden;${extra}">${inner}</div>`;
const lab = s => `<div style="font:700 22px Inter;letter-spacing:.14em;color:#8A8F98;margin-bottom:12px">${s}</div>`;
const pinSVG = (w, col, inner = '') => `<svg width="${w}" height="${w * 1.3}" viewBox="0 0 40 52"><path d="M20 51C20 51 3 31 3 19a17 17 0 0 1 34 0c0 12-17 32-17 32z" fill="${col}" stroke="#fff" stroke-width="2.5"/>${inner || '<circle cx="20" cy="19" r="7" fill="#fff"/>'}</svg>`;
// map card sizes
const LMW = LY(1100, 960), LMH = LY(600, 860), PMW = LY(1100, 960), PMH = LY(620, 940);
const CATS = ['Restaurant', 'Couture', 'Boutique', 'Garage', 'Coiffure'];
// public places on the community map: [label, icon, colour, u, v, mark]
const PUB = [['Pharmacie', 'plus', GR, .27, .30, 'listep'], ['Marché', 'store', '#E8590C', .70, .26, 'marche'], ['Arrêt de zem', 'pin', '#E3B600', .78, .68, 'arret']];
const ATL = [.42, .62];   // the dressmaker's workshop on the community map
const VAX = LY([110, 1210], [40, 420]), VAY = LY([190, 190], [280, 470]), VAW = LY(600, 620);   // the two « same name » cards
const CROWD = [[.12, .55], [.38, .12], [.55, .42], [.90, .40], [.60, .86], [.20, .86]];
document.documentElement.style.width = document.body.style.width = VW_ + 'px'; document.documentElement.style.height = document.body.style.height = VH_ + 'px';
stage.style.width = VW_ + 'px'; stage.style.height = VH_ + 'px';
H += `<canvas id="atm" class="abs" style="left:0;top:0" width="${VW_}" height="${VH_}"></canvas>
<div id="clk" class="abs" style="left:0;right:0;top:250px;text-align:center;color:#fff;visibility:hidden"><div id="clkd" style="font:600 30px Inter;letter-spacing:.32em;opacity:.8">MARDI</div><div id="clkt" style="font:800 230px Poppins;letter-spacing:-.03em;line-height:1;text-shadow:0 0 60px rgba(255,255,255,.35)">09:00</div></div>
<svg id="ring" class="abs" style="left:1000px;top:60px;visibility:hidden" width="680" height="680" viewBox="0 0 680 680"><circle cx="340" cy="340" r="320" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="6"/><circle id="ringp" cx="340" cy="340" r="320" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-dasharray="2011" stroke-dashoffset="2011" transform="rotate(-90 340 340)"/></svg>
${line('L0', 'Tu ouvres ton atelier,', 640, 64, 'left:900px;right:60px', 1480)}${line('L1', 'au fond d\'une von, à Akpakpa.', 640, 64, 'left:900px;right:60px', 1480)}
${bub('b0', 'Je suis devant<br>la boutique bleue.', 'l', LY(1010, 40), LY(800, 1010))}${bub('b1', 'Laquelle&nbsp;?<br>Il y en a trois.', 'r', LY(330, 40), LY(800, 740))}
${card('lc', LY(410, 60), LY(150, 360), LMW, LMH, `<canvas id="lmap" class="abs" style="left:0;top:0;border-radius:40px" width="${LMW}" height="${LMH}"></canvas>
<div id="lq" class="abs" style="left:0;top:0;width:110px;height:110px;margin:-55px;border-radius:50%;background:#F04438;color:#fff;display:grid;place-items:center;font:900 70px Poppins;box-shadow:0 16px 40px rgba(240,68,56,.5);opacity:0">?</div>`, 'overflow:hidden;background:#EFE9DD')}
${line('L2', 'Tu expliques. Elle tourne.', 820, 64, '', 1340)}${line('L3', '*Elle se perd.*', 820, 64, '', 1340)}
${line('L4', 'L\'atelier est vide.', 820, 64, 'left:960px;right:40px')}${line('L5', 'Tu es là, mais *personne* ne te trouve.', 820, 64, 'left:960px;right:40px')}
${line('L6', 'Et puis ce message…', 820, 64, 'left:60px;right:960px', 1430)}
<div id="ntf" class="abs" style="left:${LY(110, 60)}px;top:${LY(300, 1110)}px;width:${LY(800, 960)}px;padding:30px 34px;border-radius:36px;background:rgba(255,255,255,.94);color:#111;box-shadow:0 30px 80px rgba(0,0,0,.45);visibility:hidden">
<div style="display:flex;align-items:center;gap:20px"><div style="width:78px;height:78px;border-radius:50%;background:#D0D5DD;display:grid;place-items:center">${ic('user', 44, '#667085', 2.2)}</div>
<div style="flex:1"><div style="display:flex;justify-content:space-between;font:700 32px Inter"><span>Cliente</span><span style="font:500 28px Inter;color:#8A8F98">15:47</span></div>
<div style="font:600 42px Inter;line-height:1.2;margin-top:8px">Laisse, j'ai trouvé ailleurs.</div></div></div></div>
${line('L7', 'Et si ton atelier était *sur la carte&nbsp;?*', 700, 84, '', 1280, 76)}
<div id="bpin" class="abs" style="left:${LY(960, 540) - 85}px;top:${LY(470, 1060) - 221}px;visibility:hidden;filter:drop-shadow(0 24px 40px rgba(255,107,0,.6))">${pinSVG(170, OJ)}</div>
${[0, 1].map(i => `<div id="rip${i}" class="abs" style="left:${LY(960, 540)}px;top:${LY(470, 1060)}px;width:300px;height:110px;margin:-55px -150px;border-radius:50%;border:4px solid ${OJ};opacity:0"></div>`).join('')}
<div id="bug" class="abs" style="left:60px;top:46px;display:flex;align-items:center;gap:14px;font:900 46px Poppins;color:#fff;opacity:0"><img src="assets/mk_logo.png" style="width:66px;height:66px">OJA</div>
${card('fc', LY(340, 60), LY(110, 200), LY(1240, 960), LY(660, 1170), `<div style="padding:${LY('40px 48px', '44px 50px')}">
<div style="display:flex;align-items:center;gap:18px;font:800 46px Poppins"><span style="width:62px;height:62px;border-radius:50%;background:${OJ};display:grid;place-items:center">${ic('plus', 36, '#fff', 3.2)}</span>Ajouter un lieu</div>
<div style="display:flex;flex-direction:${LY('row', 'column')};gap:${LY(48, 34)}px;margin-top:${LY(34, 40)}px">
<div style="width:${LY(560, 860)}px">${lab('NOM DU LIEU')}<div id="fnm" style="height:84px;border-radius:22px;border:3px solid #E4E4E7;display:flex;align-items:center;padding:0 26px;font:700 38px Inter;color:#111"><span id="fnt"></span><span id="fcar" style="width:3px;height:44px;background:${OJ};margin-left:3px"></span></div>
<div style="height:${LY(30, 34)}px"></div>${lab('CATÉGORIE')}<div style="display:flex;flex-wrap:wrap;gap:14px">${CATS.map((s, i) => `<span id="ct${i}" style="padding:14px 26px;border-radius:30px;border:3px solid #E4E4E7;font:700 30px Inter;color:#444">${s}</span>`).join('')}</div></div>
<div style="width:${LY(536, 860)}px">${lab('POINT EXACT')}<div style="position:relative;width:${LY(536, 860)}px;height:${LY(200, 250)}px;border-radius:24px;overflow:hidden"><canvas id="fmap" width="${LY(536, 860)}" height="${LY(200, 250)}"></canvas>
<div id="fpin" class="abs" style="left:${LY(268, 430) - 27}px;top:${LY(112, 140) - 70}px;opacity:0">${pinSVG(54, OJ)}</div></div>
<div style="height:${LY(26, 34)}px"></div>${lab('PHOTOS')}<div style="display:flex;gap:18px">${[1, 2, 3].map(i => `<img id="ph${i}" src="assets/lieux/p${i}.jpg" style="width:${LY(150, 200)}px;height:${LY(150, 200)}px;border-radius:20px;object-fit:cover;opacity:0">`).join('')}
<div style="width:${LY(150, 200)}px;height:${LY(150, 200)}px;border-radius:20px;border:3px dashed #D0D5DD;display:grid;place-items:center">${ic('camera', 46, '#B0B5BD', 2)}</div></div></div></div></div>`)}
${line('L8', 'Avec OJA, tu ajoutes *ton lieu.*', 820, 64, '', 1460)}
<div id="sb" class="abs" style="left:${LY(360, 60)}px;top:${LY(200, 520)}px;width:${LY(1200, 960)}px;height:120px;border-radius:60px;background:#fff;color:#111;display:flex;align-items:center;gap:22px;padding:0 40px;box-sizing:border-box;box-shadow:0 30px 80px rgba(0,0,0,.4);visibility:hidden">${ic('search', 50, '#667085', 2.6)}
<span id="sph" style="font:500 ${LY(42, 38)}px Inter;color:#9AA0AA">Rechercher un lieu</span><span id="stx" style="font:700 ${LY(42, 38)}px Inter"></span><span id="scar" style="width:3px;height:48px;background:${OJ}"></span></div>
${card('sr', LY(360, 60), LY(360, 680), LY(1200, 960), 230, `<div style="display:flex;align-items:center;gap:30px;height:100%;padding:0 34px"><img src="assets/lieux/p2.jpg" style="width:166px;height:166px;border-radius:24px;object-fit:cover">
<div style="flex:1"><div style="font:800 ${LY(46, 40)}px Poppins;line-height:1.1">Atelier Couture Grâce</div><div style="font:600 30px Inter;color:#667085;margin-top:10px;display:flex;align-items:center;gap:10px">${ic('pin', 30, OJ, 2.4)}Couture · Akpakpa</div></div>
<div id="srok" style="width:84px;height:84px;border-radius:50%;background:${GR};display:grid;place-items:center">${ic('check', 50, '#fff', 3.2)}</div></div>`, 'border-radius:36px')}
${line('L9', 'On te trouve avec *les mots de tous les jours.*', 820, 64, '', 1460)}
${card('pc', LY(410, 60), LY(130, 340), PMW, PMH, `<canvas id="pmap" class="abs" style="left:0;top:0;border-radius:40px" width="${PMW}" height="${PMH}"></canvas>
<div class="abs" style="left:${ATL[0] * PMW - 30}px;top:${ATL[1] * PMH - 78}px">${pinSVG(60, OJ)}</div><div class="abs" style="left:${ATL[0] * PMW - 150}px;width:300px;top:${ATL[1] * PMH + 2}px;text-align:center"><span style="padding:8px 16px;border-radius:16px;background:#fff;font:700 22px Inter;box-shadow:0 6px 18px rgba(0,0,0,.15)">Atelier Couture Grâce</span></div>
${PUB.map(([n, icn, col, u, v], i) => `<div id="pp${i}" class="abs" style="left:${u * PMW - 40}px;top:${v * PMH - 104}px;width:80px;opacity:0"><div style="position:relative">${pinSVG(80, col, ' ')}<div class="abs" style="left:20px;top:18px;width:40px;height:40px;display:grid;place-items:center">${ic(icn, 34, '#fff', 3)}</div></div></div>
<div id="pl${i}" class="abs" style="left:${u * PMW - 150}px;width:300px;top:${v * PMH + 8}px;text-align:center;opacity:0"><span style="padding:10px 20px;border-radius:18px;background:#111;color:#fff;font:700 26px Inter">${n}</span></div>`).join('')}
${CROWD.map(([u, v], i) => `<div id="cw${i}" class="abs" style="left:${u * PMW - 34}px;top:${v * PMH - 34}px;width:68px;height:68px;border-radius:50%;background:${['#FDE68A', '#BFDBFE', '#FBCFE8', '#BBF7D0', '#DDD6FE', '#FED7AA'][i]};border:4px solid #fff;display:grid;place-items:center;box-shadow:0 8px 20px rgba(0,0,0,.2);opacity:0">${ic('user', 34, '#344054', 2.4)}<span class="abs" style="right:-10px;top:-10px;width:32px;height:32px;border-radius:50%;background:${OJ};display:grid;place-items:center">${ic('plus', 20, '#fff', 3.4)}</span></div>`).join('')}`, 'overflow:hidden;background:#EFE9DD')}
${line('L10', 'Les lieux publics aussi.', 820, 64, '', 1360)}${line('L11', 'Ajoutés par *tout le monde.*', 820, 64, '', 1360)}
<div id="val" class="abs" style="left:0;top:0;width:${VW_}px;height:${VH_}px;visibility:hidden">
<svg class="abs" style="left:0;top:0" width="${VW_}" height="${VH_}"><path id="vl0" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round"/><path id="vl1" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round"/></svg>
${[0, 1].map(i => `<div id="va${i}" class="abs" style="left:${VAX[i]}px;top:${VAY[i]}px;width:${VAW}px;padding:24px 28px;border-radius:32px;background:#fff;color:#111;display:flex;align-items:center;gap:22px;box-sizing:border-box;box-shadow:0 30px 70px rgba(0,0,0,.4)">
<div style="width:84px;height:84px;flex:none;border-radius:50%;background:${['#BFDBFE', '#FBCFE8'][i]};display:grid;place-items:center">${ic('user', 46, '#344054', 2.2)}</div><div><div style="font:600 24px Inter;color:#8A8F98">Nom donné</div><div style="font:800 38px Poppins;line-height:1.15">Marché du quartier</div></div></div>`).join('')}
<div id="vp" class="abs" style="left:${LY(960, 540) - 60}px;top:${LY(600, 1010) - 156}px">${pinSVG(120, '#E8590C', ' ')}<div class="abs" style="left:30px;top:27px;width:60px;height:60px;display:grid;place-items:center">${ic('store', 50, '#fff', 2.6)}</div></div>
<div id="vring" class="abs" style="left:${LY(960, 540)}px;top:${LY(600, 1010)}px;width:260px;height:90px;margin:-45px -130px;border-radius:50%;border:5px solid #fff;opacity:0"></div>
<div id="vteam" class="abs" style="left:0;right:0;top:${LY(650, 1230)}px;text-align:center;opacity:0"><span style="display:inline-flex;align-items:center;gap:14px;padding:18px 32px;border-radius:40px;background:#111;color:#fff;font:700 34px Inter;border:3px solid rgba(255,255,255,.25)">${ic('shield', 40, OJ, 2.6)}ou validé par l'équipe OJA</span></div>
<div id="vst" class="abs" style="left:${LY(1050, 310)}px;top:${LY(470, 1050)}px;width:460px;padding:18px 0;border-radius:24px;border:7px solid ${GR};color:${GR};background:rgba(231,246,239,.96);font:900 64px Poppins;display:flex;align-items:center;justify-content:center;gap:14px;opacity:0">${ic('check', 60, GR, 3.4)}PUBLIÉ</div></div>
${line('L12', 'Même nom, *même endroit.*', 860, 64, '', 1460)}${line('L13', 'Ou validé par *l\'équipe OJA.*', 860, 64, '', 1460)}${line('L14', 'Le lieu est *publié.*', 860, 64, '', 1460)}
${card('rc', LY(560, 60), LY(150, 380), LY(800, 960), LY(580, 760), `<div style="height:${LY(220, 330)}px;border-radius:40px 40px 0 0;overflow:hidden;position:relative"><canvas id="rmap" width="${LY(800, 960)}" height="${LY(220, 330)}"></canvas><div class="abs" style="left:${LY(400, 480) - 34}px;top:${LY(110, 165) - 88}px">${pinSVG(68, '#E8590C', ' ')}<div class="abs" style="left:17px;top:15px;width:34px;height:34px;display:grid;place-items:center">${ic('store', 28, '#fff', 2.6)}</div></div></div>
<div style="padding:${LY('30px 44px', '40px 50px')}"><div style="font:800 ${LY(48, 54)}px Poppins">Marché du quartier</div><div style="font:600 30px Inter;color:#667085;margin-top:8px">Marché · lieu public</div>
<div style="position:relative;margin-top:${LY(30, 50)}px;height:96px;border-radius:30px;overflow:hidden"><div id="rbtn" class="abs" style="inset:0;border:3px solid #F04438;border-radius:30px;color:#F04438;display:flex;align-items:center;justify-content:center;gap:14px;font:800 34px Inter">${ic('flag', 38, '#F04438', 2.6)}Signaler une erreur</div>
<div id="rok" class="abs" style="inset:0;border-radius:30px;background:${GR};color:#fff;display:flex;align-items:center;justify-content:center;gap:14px;font:800 34px Inter;clip-path:circle(0% at 50% 50%)">${ic('check', 40, '#fff', 3.2)}Signalement envoyé</div></div></div>
<div id="rtap" class="abs" style="left:${LY(400, 480)}px;top:${LY(444, 593)}px;width:90px;height:90px;margin:-45px;border-radius:50%;background:rgba(255,255,255,.5);border:4px solid #fff;opacity:0"></div>`)}
${line('L15', 'Une erreur sur une fiche&nbsp;?', 820, 64, '', 1420)}${line('L16', 'Tu *la signales.*', 820, 64, '', 1420)}
<div id="fin" class="abs" style="left:0;top:0;width:${VW_}px;height:${VH_}px;visibility:hidden">
<div class="abs" style="left:${LY(1000, 70)}px;top:${LY(220, 1160)}px;width:${LY(860, 940)}px"><div style="display:flex;align-items:center;gap:26px"><img id="fl" src="assets/mk_logo.png" style="width:170px;height:170px"><div id="fw" style="font:900 170px Poppins;letter-spacing:-.04em;line-height:1;color:#fff">OJA</div></div>
<div id="fs" style="font:800 84px Poppins;letter-spacing:-.02em;line-height:1.08;color:#fff;margin-top:40px">Le local devient<br><span style="color:${OJ}">visible.</span></div>
<div id="fst" style="display:flex;gap:24px;margin-top:56px">${[['phone', 'Télécharger sur', 'App Store'], ['play', 'Disponible sur', 'Google Play']].map(([icn, sm, big]) => `<div style="width:360px;height:104px;border-radius:26px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:18px;padding:0 26px;color:#fff;white-space:nowrap;box-sizing:border-box">${ic(icn, 46, '#fff', 1.8)}<div><div style="font:500 20px Inter;opacity:.75">${sm}</div><div style="font:700 34px Poppins;line-height:1.1">${big}</div></div></div>`).join('')}</div></div>
<div id="fm" class="abs" style="left:${LY(120, 60)}px;right:${LY(120, 60)}px;top:${LY(1000, 1770)}px;text-align:center;font:500 22px Inter;line-height:1.35;color:rgba(255,255,255,.62)">Lieux publics : publiés quand deux personnes donnent le même nom au même endroit, ou après validation par l'équipe OJA. Noms de lieux fictifs. Personnes des images générées par IA.</div></div>
<div id="flash" class="lay" style="width:${VW_}px;height:${VH_}px;background:radial-gradient(circle at 50% 45%,#fff,rgba(255,170,90,.85) 35%,rgba(255,107,0,0) 70%);opacity:0;z-index:40"></div>
<div id="fade" style="width:${VW_}px;height:${VH_}px"></div>`;
stage.innerHTML = H;

/* ---------- atmosphere: palette by time of day, glow blobs, bokeh, extras ---------- */
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
const PAL = {
  dawn: ['#1c0b03', '#a8501a', '#ff9a3c', '#ffd27a'], noon: ['#3a2b12', '#d9a24a', '#fff1c2', '#ffd27a'], sand: ['#1e1406', '#5c3c12', '#ffc46b', '#ffe3a8'], after: ['#1f1206', '#8a4a14', '#ffb35c', '#ffd9a0'],
  dusk: ['#0b0a24', '#2c2f6e', '#6b7cff', '#b08cff'], void: ['#000000', '#040302', '#ff6b00', '#ff9a4d'],
  plum: ['#0b0410', '#2a0d26', '#ff6b00', '#ff9a4d'], dark: ['#0d0502', '#3d1503', '#ff6b00', '#ff9a4d']
};
const PKEYS = () => [[0, 'dawn'], [V('onze') - .2, 'noon'], [V('expl') - .2, 'sand'], [V('quatorze') - .2, 'after'], [V('msg') - .2, 'dusk'], [V('siAt') - .2, 'void'], [V('ajoute') - .05, 'dark'],
  [V('mots') - .2, 'plum'], [V('publics') - .2, 'dark'], [V('deux') - .2, 'plum'], [V('erreur') - .2, 'dark'], [V('endA') - .3, 'dark']];
function palette(t) {
  const K = PKEYS(); let i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
  const cur = PAL[K[i][1]], prv = PAL[K[Math.max(0, i - 1)][1]], k = i ? P(t, K[i][0], .8, E.ioC) : 1;
  return [cur.map((c, j) => mix(hex(prv[j]), hex(c), k)), K[i][1], k];
}
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const BOK = (() => { const r = rng(4); return Array.from({ length: 70 }, () => ({ x: r() * VW_, y: r() * VH_, z: .3 + r() * .9, s: .2 + r(), ph: r() * 6.28 })); })();
const GRID = (() => { const r = rng(21), L = []; for (let i = 0; i < 16; i++) { const y = r() * VH_; L.push([-40, y, VW_ + 40, y + (r() - .5) * 300, r()]); } for (let i = 0; i < 14; i++) { const x = r() * VW_; L.push([x, -40, x + (r() - .5) * 400, VH_ + 40, r()]); } return L; })();
function atmosphere(t) {
  const c = el('atm').getContext('2d'), [p, name] = palette(t);
  const g = c.createLinearGradient(0, 0, 0, VH_); g.addColorStop(0, rgba(p[0], 1)); g.addColorStop(1, rgba(p[1], 1)); c.fillStyle = g; c.fillRect(0, 0, VW_, VH_);
  heroine(c, t, p); split(c, t, p);
  c.save(); c.globalCompositeOperation = 'lighter';
  [[.25, .3, 700, 2], [.75, .65, 800, 3], [.5, 1.05, 900, 2]].forEach(([fx, fy, R, ci], i) => {
    const x = VW_ * fx + Math.sin(t * .23 + i * 2) * 120, y = VH_ * fy + Math.cos(t * .19 + i) * 60, gg = c.createRadialGradient(x, y, 0, x, y, R);
    gg.addColorStop(0, rgba(p[ci], name === 'void' ? .05 : .28)); gg.addColorStop(1, rgba(p[ci], 0)); c.fillStyle = gg; c.fillRect(x - R, y - R, 2 * R, 2 * R); });
  BOK.forEach(b => { const x = (b.x + t * 20 * b.z) % (VW_ + 80) - 40, y = b.y + Math.sin(t * .5 + b.ph) * 20, r = 6 + b.s * 34 * b.z, a = (name === 'void' ? .05 : .2) * b.z * (.6 + .4 * Math.sin(t * 1.3 + b.ph));
    const gg = c.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, rgba(p[3], a)); gg.addColorStop(.7, rgba(p[3], a * .5)); gg.addColorStop(1, rgba(p[3], 0)); c.fillStyle = gg; c.fillRect(x - r, y - r, 2 * r, 2 * r); });
  c.restore();
  const vis = (a, b) => P(t, a - .3, .6) * (1 - P(t, b - .3, .6));
  // 09:00: the sun coming up behind the von
  let a = vis(0, V('onze')); if (a > 0) { const sx = LY(1500, 760), y = LY(380, 520) - P(t, 0, 5, E.oQ) * 80, gg = c.createRadialGradient(sx, y, 0, sx, y, LY(560, 520)); gg.addColorStop(0, `rgba(255,230,170,${.55 * a})`); gg.addColorStop(.3, `rgba(255,160,70,${.25 * a})`); gg.addColorStop(1, 'rgba(255,120,40,0)'); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = gg; c.fillRect(0, 0, VW_, VH_); c.restore(); }
  // « sur la carte ? »: fine orange map lines draw themselves in the dark, the pin lands
  a = vis(V('siAt'), V('ajoute')); if (a > 0) { const k = P(t, V('siAt'), 1.6, E.oQ); c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
    GRID.forEach(([x0, y0, x1, y1, r], i) => { const kk = clamp(k * 1.4 - i * .02); if (kk <= 0) return; c.strokeStyle = `rgba(255,140,60,${(.12 + r * .2) * a})`; c.lineWidth = 1.5 + r * 3; c.beginPath(); c.moveTo(x0, y0); c.lineTo(lerp(x0, x1, kk), lerp(y0, y1, kk)); c.stroke(); });
    const lp = P(t, V('carte') - .1, .5, E.oB); if (lp > 0) { const qx = LY(960, 540), qy = LY(470, 1060), R = 60 + lp * 420, gg = c.createRadialGradient(qx, qy, 0, qx, qy, R); gg.addColorStop(0, `rgba(255,200,150,${.7 * a})`); gg.addColorStop(.25, `rgba(255,120,30,${.35 * a})`); gg.addColorStop(1, 'rgba(255,107,0,0)'); c.fillStyle = gg; c.fillRect(0, 0, VW_, VH_); }
    c.restore(); }
  // the features: slow light rays behind
  a = .7 * vis(V('ajoute') - .1, V('ajoute') + 1.6) + .3 * vis(V('ajoute') + 1.4, V('endA') + .2); if (a > 0) { c.save(); c.globalCompositeOperation = 'lighter'; c.translate(LY(960, 540), LY(440, 860));
    for (let k = 0; k < 18; k++) { c.rotate(Math.PI * 2 / 18); const gg = c.createLinearGradient(0, 0, 1300, 0); gg.addColorStop(0, `rgba(255,200,140,${.22 * a})`); gg.addColorStop(1, 'rgba(255,107,0,0)');
      c.save(); c.rotate(t * .08); c.fillStyle = gg; c.beginPath(); c.moveTo(0, 0); c.lineTo(1300, -40); c.lineTo(1300, 40); c.closePath(); c.fill(); c.restore(); }
    c.restore(); }
}

// [from, to, photo, side of the heroine]
const HSHOW = () => [[-.5, V('onze') - .1, 'ouvre', 'L'], [V('onze') - .1, V('expl') - .1, 'appel', 'L'], [V('quatorze') - .1, V('msg') - .1, 'vide', 'L'], [V('msg') - .1, V('siAt') - .1, 'msg', 'R'], [V('endA') - .3, DUR2 + 1, 'fin', 'L']];
function heroine(c, t, p) {
  HSHOW().forEach(([a, b, k, side]) => {
    const al = P(t, a - .2, .6, E.ioC) * (1 - P(t, b - .35, .45, E.iC)); if (al <= 0) return;
    const im = HER[k], sc = 1.04 + .06 * clamp((t - a) / Math.min(b - a, 7)), w = VW_ * sc, h = VH_ * sc;
    c.save(); c.globalAlpha = al * .95; c.drawImage(im, (VW_ - w) / 2 + (side === 'L' ? 20 : -20) * (1 - sc), (VH_ - h) / 2, w, h);
    c.globalAlpha = al * (k === 'fin' ? .18 : .3); c.globalCompositeOperation = 'overlay'; c.fillStyle = rgba(p[1], 1); c.fillRect(0, 0, VW_, VH_);
    c.globalCompositeOperation = 'source-over'; c.globalAlpha = al;
    if (VERT) { const tg = c.createLinearGradient(0, 0, 0, 480); tg.addColorStop(0, rgba(p[0], .7)); tg.addColorStop(1, rgba(p[0], 0)); c.fillStyle = tg; c.fillRect(0, 0, VW_, 480);
      const bg = c.createLinearGradient(0, 1000, 0, VH_); bg.addColorStop(0, rgba(p[0], 0)); bg.addColorStop(.45, rgba(p[0], .75)); bg.addColorStop(1, rgba(p[0], .95)); c.fillStyle = bg; c.fillRect(0, 1000, VW_, VH_ - 1000); c.restore(); return; }
    const g = side === 'L' ? c.createLinearGradient(1920, 0, 600, 0) : c.createLinearGradient(0, 0, 1320, 0);
    g.addColorStop(0, rgba(p[0], k === 'fin' ? .94 : .9)); g.addColorStop(.45, rgba(p[0], k === 'fin' ? .72 : .55)); g.addColorStop(1, rgba(p[0], 0)); c.fillStyle = g; c.fillRect(0, 0, 1920, 1080);
    const v = c.createLinearGradient(0, 600, 0, 1080); v.addColorStop(0, rgba(p[0], 0)); v.addColorStop(1, rgba(p[0], .7)); c.fillStyle = v; c.fillRect(0, 600, 1920, 480);
    c.restore();
  });
}
// 11:20 split screen: the client slides in (right half in 16:9, bottom half in 9:16), each one on the phone
function split(c, t, p) {
  const a = V('appelle') - .15, b = V('expl') - .1; if (t < a || t >= b + .1) return;
  const k = P(t, a, .7, E.ioC), al = 1 - P(t, b - .35, .45, E.iC);
  c.save(); c.globalAlpha = al;
  if (VERT) {
    c.globalAlpha = al * k; c.drawImage(APT, 0, 0, 1080, 960); c.globalAlpha = al;
    const tg = c.createLinearGradient(0, 0, 0, 300); tg.addColorStop(0, rgba(p[0], .55)); tg.addColorStop(1, rgba(p[0], 0)); c.fillStyle = tg; c.fillRect(0, 0, 1080, 300);
    const y = 960 + (1 - k) * 960; c.drawImage(CLI, 0, y, 1080, 960);
    const bg = c.createLinearGradient(0, y + 560, 0, y + 960); bg.addColorStop(0, rgba(p[0], 0)); bg.addColorStop(1, rgba(p[0], .55)); c.fillStyle = bg; c.fillRect(0, y + 560, 1080, 400);
    c.fillStyle = '#fff'; c.fillRect(0, y - 3, 1080, 6);
  } else {
    const x = 960 + (1 - k) * 960; c.drawImage(CLI, x, 0, 960, 1080);
    const bg = c.createLinearGradient(0, 640, 0, 1080); bg.addColorStop(0, rgba(p[0], 0)); bg.addColorStop(1, rgba(p[0], .6)); c.fillStyle = bg; c.fillRect(x, 640, 960, 440);
    c.fillStyle = '#fff'; c.fillRect(x - 3, 0, 6, 1080);
  }
  c.globalAlpha = al * .22; c.globalCompositeOperation = 'overlay'; c.fillStyle = rgba(p[1], 1); c.fillRect(0, 0, VW_, VH_);
  c.restore();
}

/* ---------- ivory fine-line street maps ---------- */
function streets(c, W, H, seed, n = 1) {
  c.fillStyle = '#EFE9DD'; c.fillRect(0, 0, W, H);
  const R = rng(seed); c.fillStyle = '#E4DCCB';
  for (let i = 0; i < 18 * n; i++) { const x = R() * W, y = R() * H; c.fillRect(x, y, 40 + R() * 120, 30 + R() * 90); }
  const road = (w, pts) => { c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#D6CDBA'; c.lineWidth = w + 4; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
    c.strokeStyle = '#fff'; c.lineWidth = w; c.stroke(); };
  for (let i = 0; i < 4; i++) { const y = (i + .5 + (R() - .5) * .5) * H / 4; road(10 + R() * 14, [[-20, y], [W + 20, y + (R() - .5) * 80]]); }
  for (let i = 0; i < 5; i++) { const x = (i + .5 + (R() - .5) * .5) * W / 5; road(8 + R() * 12, [[x, -20], [x + (R() - .5) * 120, H + 20]]); }
  c.fillStyle = '#BFD7EA'; c.beginPath(); c.moveTo(0, H * .93); c.bezierCurveTo(W * .3, H * .88, W * .65, H * .98, W, H * .9); c.lineTo(W, H); c.lineTo(0, H); c.fill();
}
// the lost client: three identical blue shops, a dotted wandering path, the workshop hidden at the end of a von
const LPATH = [[.04, .80], [.46, .80], [.46, .52], [.60, .52], [.72, .52], [.72, .26], [.82, .26], [.72, .26], [.30, .26], [.18, .26], [.18, .52]];
const BSHOPS = [[.30, .26], [.60, .52], [.82, .26]];
function lostMap(t) {
  const p = pop('lc', t, V('expl') - .1, V('quatorze') - .1, 80); if (!p) return;
  const c = el('lmap').getContext('2d'), W = LMW, H = LMH, X = u => u * W, Y = v => v * H; c.clearRect(0, 0, W, H);
  c.fillStyle = '#EFE9DD'; c.fillRect(0, 0, W, H); c.lineCap = 'round'; c.lineJoin = 'round';
  const road = (w, pts) => { c.strokeStyle = '#D6CDBA'; c.lineWidth = w + 4; c.beginPath(); pts.forEach(([u, v], i) => i ? c.lineTo(X(u), Y(v)) : c.moveTo(X(u), Y(v))); c.stroke(); c.strokeStyle = '#fff'; c.lineWidth = w; c.stroke(); };
  const R = rng(9); c.fillStyle = '#E4DCCB'; for (let i = 0; i < 26; i++) c.fillRect(R() * W, R() * H, 50 + R() * 110, 30 + R() * 70);
  road(24, [[-.05, .80], [1.05, .80]]); road(20, [[-.05, .52], [1.05, .52]]); road(20, [[-.05, .26], [1.05, .26]]);
  [.18, .46, .72, .92].forEach(u => road(18, [[u, -.05], [u, 1.05]]));
  // the von: a narrow sandy alley, the workshop at its end is not on any map (dashed, faint)
  c.setLineDash([6, 8]); c.strokeStyle = '#CBB994'; c.lineWidth = 8; c.beginPath(); c.moveTo(X(.56), Y(.26)); c.lineTo(X(.56), Y(.07)); c.stroke(); c.setLineDash([]);
  c.setLineDash([8, 8]); c.strokeStyle = 'rgba(255,107,0,.55)'; c.lineWidth = 3; c.strokeRect(X(.56) - 34, Y(.07) - 30, 68, 50); c.setLineDash([]);
  c.font = '700 20px Inter'; c.fillStyle = 'rgba(255,107,0,.7)'; c.textAlign = 'left'; c.fillText('ton atelier', X(.56) + 44, Y(.07) + 6);
  BSHOPS.forEach(([u, v]) => { const x = X(u) - 34, y = Y(v) - 82; c.fillStyle = BLU; c.fillRect(x, y, 68, 54); c.fillStyle = '#fff'; for (let k = 0; k < 4; k++) c.fillRect(x + k * 17, y, 9, 14); c.fillStyle = '#1D4E9E'; c.fillRect(x + 24, y + 26, 20, 28); });
  // path drawn as she walks
  const seg = LPATH.slice(1).map((q, i) => Math.hypot((q[0] - LPATH[i][0]) * W, (q[1] - LPATH[i][1]) * H)), tot = seg.reduce((s, x) => s + x, 0);
  const k = P(t, V('expl') + .2, V('perd') + .3 - V('expl'), E.ioC); let rem = k * tot, pts = [[X(LPATH[0][0]), Y(LPATH[0][1])]];
  for (let i = 0; i < seg.length && rem > 0; i++) { const f = Math.min(1, rem / seg[i]); pts.push([X(lerp(LPATH[i][0], LPATH[i + 1][0], f)), Y(lerp(LPATH[i][1], LPATH[i + 1][1], f))]); rem -= seg[i]; }
  c.setLineDash([2, 16]); c.strokeStyle = '#F04438'; c.lineWidth = 7; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); c.setLineDash([]);
  const [hx, hy] = pts[pts.length - 1]; c.fillStyle = '#fff'; c.beginPath(); c.arc(hx, hy, 17, 0, 7); c.fill(); c.fillStyle = '#F04438'; c.beginPath(); c.arc(hx, hy, 11, 0, 7); c.fill();
  const q = P(t, V('perd') + .2, .45, E.oB), e = el('lq'); e.style.opacity = clamp(q * 1.5); e.style.transform = `translate(${X(.18)}px,${Y(.52) - 80}px) scale(${lerp(.3, 1, q)})`;
}

/* ---------- scene helpers ---------- */
function pop(id, t, a, b, dy = 60) {
  const e = el(id), on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return 0;
  const p = P(t, a, .55, E.oB), q = P(t, b - .35, .35, E.iC); e.style.opacity = clamp(p * 1.5) * (1 - q); e.style.transform = `translateY(${(1 - p) * dy}px) scale(${lerp(.85, 1, p) * lerp(1, .94, q)})`; e.style.filter = `blur(${q * 10}px)`;
  return p;
}
const popIn = (e, p, s0 = .4) => { e.style.opacity = clamp(p * 1.5); e.style.transform = `scale(${lerp(s0, 1, p)})`; };
function clock(t) {
  // [from, to, time, mode, centre x in 16:9]; in 9:16 every stamp sits at the top (the photos fill the frame)
  const S = [[V('t0') - .2, V('onze') - .15, '09:00', 'big', 1340], [V('onze') - .1, VERT ? V('appelle') - .1 : V('expl') - .15, '11:20', 'top', 960], [V('quatorze') - .1, V('msg') - .15, '14:00', 'big', 1340]];
  const s = S.find(([a, b]) => t >= a && t < b), e = el('clk');
  if (!s) { e.style.visibility = 'hidden'; el('ring').style.visibility = 'hidden'; return; }
  const [a, b, txt, mode0, cx0] = s, cx = LY(cx0, 540), mode = VERT ? 'vtop' : mode0, p = P(t, a, .6, E.oQ), q = P(t, b - .35, .35, E.iC); e.style.visibility = 'visible'; e.style.left = (cx - 600) + 'px'; e.style.right = 'auto'; e.style.width = '1200px';
  el('clkt').textContent = txt; el('clkt').style.fontSize = mode === 'big' ? '230px' : mode === 'vtop' ? '160px' : '120px'; el('clkd').style.display = mode === 'top' ? 'none' : 'block';
  e.style.top = mode === 'big' ? '250px' : mode === 'vtop' ? '110px' : '70px'; e.style.opacity = p * (1 - q); e.style.filter = `blur(${(1 - p) * 20 + q * 14}px)`; e.style.transform = `scale(${lerp(1.08, 1, p)})`;
  const ringOn = txt === '14:00' && !VERT; el('ring').style.visibility = ringOn ? 'visible' : 'hidden';
  if (ringOn) { el('ring').style.left = (cx - 340) + 'px'; el('ring').style.opacity = p * (1 - q); el('ringp').style.strokeDashoffset = 2011 * (1 - P(t, a + .3, b - a - .6, E.lin)); }
}
function call(t) {
  [['b0', V('bleue') - .1], ['b1', V('laquelle') - .1]].forEach(([id, a]) => {
    const e = el(id), b = V('expl') - .1, on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
    const p = P(t, a, .45, E.oB), q = P(t, b - .35, .35, E.iC); e.style.opacity = clamp(p * 1.5) * (1 - q); e.style.transform = `translateY(${(1 - p) * 40}px) scale(${lerp(.8, 1, p)})`; e.style.filter = `blur(${q * 18}px)`;
  });
}
function notif(t) {
  const e = el('ntf'), a = V('ailleurs') - .4, b = V('siAt') - .15, on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const p = P(t, a, .6, E.oB), q = P(t, b - .35, .35, E.iC); e.style.opacity = clamp(p * 1.4) * (1 - q); e.style.transform = `translateY(${(1 - p) * -80}px) scale(${lerp(.92, 1, p)})`; e.style.filter = `blur(${(1 - clamp(p * 1.3)) * 14 + q * 12}px)`;
}
function bigPin(t) {
  const e = el('bpin'), a = V('carte') - .45, b = V('ajoute') - .1, on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden';
  [0, 1].forEach(i => { const r = el('rip' + i), k = P(t, V('carte') - .1 + i * .35, 1.1, E.oQ); r.style.opacity = on && k > 0 ? (1 - k) * .9 : 0; r.style.transform = `scale(${lerp(.3, 2.2, k)})`; });
  if (!on) return;
  const k = P(t, a, .4, E.iC), bo = P(t, a + .4, .35, E.oB), q = P(t, b - .35, .35, E.iC);
  e.style.transform = `translateY(${(1 - k) * -700}px) scale(${k < 1 ? 1 : lerp(1.15, 1, bo)},${k < 1 ? 1.1 : lerp(.85, 1, bo)})`; e.style.transformOrigin = '50% 100%'; e.style.opacity = 1 - q;
}
const NAME = 'Atelier Couture Grâce', QUERY = 'l\'atelier derrière la pharmacie';
function form(t) {
  const p = pop('fc', t, V('ajoute') - .1, V('mots') + .5, 80); if (!p) return;
  const n = Math.round(P(t, V('nom'), .55, E.lin) * NAME.length); el('fnt').textContent = NAME.slice(0, n);
  el('fcar').style.opacity = n < NAME.length && Math.floor(t * 3) % 2 === 0 ? 1 : n < NAME.length ? .2 : 0;
  el('fnm').style.borderColor = t >= V('nom') - .1 && t < V('cat') ? OJ : '#E4E4E7';
  const cs = P(t, V('cat'), .3, E.oB); CATS.forEach((_, i) => { const e = el('ct' + i), on = i === 1 && cs > 0; e.style.background = on ? OJ : '#fff'; e.style.color = on ? '#fff' : '#444'; e.style.borderColor = on ? OJ : '#E4E4E7'; e.style.transform = `scale(${on ? lerp(1.15, 1, cs) : 1})`; });
  const c = el('fmap').getContext('2d'); streets(c, LY(536, 860), LY(200, 250), 31, .5);
  const fp = P(t, V('point'), .45, E.oB), fe = el('fpin'); fe.style.opacity = clamp(fp * 2); fe.style.transform = `translateY(${(1 - Math.min(1, P(t, V('point'), .3, E.iC))) * -120}px)`;
  [1, 2, 3].forEach(i => popIn(el('ph' + i), P(t, V('photos') + (i - 1) * .16, .4, E.oB), .5));
}
function search(t) {
  const a = V('mots') + .35, b = V('publics') - .1; pop('sb', t, a, b, 60); const pr = pop('sr', t, V('derriere') + 1.05, b, 60);
  const n = Math.round(P(t, V('derriere') - .05, .95, E.lin) * QUERY.length); el('stx').textContent = QUERY.slice(0, n); el('sph').style.display = n ? 'none' : 'inline';
  el('scar').style.opacity = Math.floor(t * 3) % 2 === 0 ? 1 : .15;
  if (pr) popIn(el('srok'), P(t, V('derriere') + 1.35, .4, E.oB), .3);
}
function community(t) {
  const p = pop('pc', t, V('publics') - .1, V('deux') - .1, 80); if (!p) return;
  streets(el('pmap').getContext('2d'), PMW, PMH, 44);
  PUB.forEach((pb, i) => { const k = P(t, V(pb[5]) - .05, .45, E.oB), e = el('pp' + i); e.style.opacity = clamp(k * 2); e.style.transform = `translateY(${(1 - Math.min(1, P(t, V(pb[5]) - .05, .25, E.iC))) * -90}px)`; el('pl' + i).style.opacity = P(t, V(pb[5]) + .15, .3); });
  CROWD.forEach((_, i) => popIn(el('cw' + i), P(t, V('tous') - .1 + i * .13, .4, E.oB), .3));
}
function validate(t) {
  const on = t >= V('deux') - .1 && t < V('erreur') - .1, e = el('val'); e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  e.style.opacity = P(t, V('deux') - .1, .4) * (1 - P(t, V('erreur') - .45, .35));
  const PX = LY(960, 540), PY = LY(600, 1010) - 60;
  [0, 1].forEach(i => { const k = P(t, V('deux') + i * 1.0, .5, E.oB), c = el('va' + i); c.style.opacity = clamp(k * 1.5); c.style.transform = `translateY(${(1 - k) * 50}px) scale(${lerp(.85, 1, k)})`;
    const sx = VAX[i] + VAW * LY(.5, [.25, .75][i]), sy = VAY[i] + 132, lk = P(t, V('deux') + .4 + i * 1.0, .7, E.ioC);
    el('vl' + i).setAttribute('d', `M${sx},${sy} Q${(sx + PX) / 2},${sy + 120} ${lerp(sx, PX, lk)},${lerp(sy, PY, lk)}`); el('vl' + i).style.opacity = lk > 0 ? 1 : 0; });
  const pk = P(t, V('deux') + 1.6, .45, E.oB); el('vp').style.transform = `scale(${lerp(1, 1.12, pk) - .12 * P(t, V('deux') + 2.05, .3)})`;
  const rk = P(t, V('deux') + 1.6, .9, E.oQ); el('vring').style.opacity = rk > 0 ? (1 - rk) : 0; el('vring').style.transform = `scale(${lerp(.4, 1.8, rk)})`;
  const tk = P(t, V('valide') - .1, .45, E.oB); el('vteam').style.opacity = clamp(tk * 1.5); el('vteam').style.transform = `translateY(${(1 - tk) * 30}px)`;
  const sp = P(t, V('publie') + .35, .35, E.oB), st = el('vst'); st.style.opacity = clamp(sp * 2); st.style.transform = `rotate(${lerp(-20, -6, sp)}deg) scale(${lerp(2, 1, sp)})`;
}
function report(t) {
  const p = pop('rc', t, V('erreur') - .1, V('endA') - .1, 80); if (!p) return;
  streets(el('rmap').getContext('2d'), LY(800, 960), LY(220, 330), 57, .6);
  const tp = P(t, V('signale') + .1, .5, E.oQ), tap = el('rtap'); tap.style.opacity = tp > 0 && tp < 1 ? (1 - tp) : 0; tap.style.transform = `scale(${lerp(.4, 1.6, tp)})`;
  el('rok').style.clipPath = `circle(${P(t, V('signale') + .25, .5, E.oQ) * 75}% at 50% 50%)`;
}
function finale(t) {
  const on = t >= V('endA') - .3, e = el('fin'); e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  // her smiling photo is drawn by heroine() under the glows; the texts come on the free side
  const lp = P(t, V('endA') - .2, .6, E.oB); el('fl').style.transform = `scale(${lerp(.5, 1, lp)})`; el('fl').style.opacity = clamp(lp * 1.5);
  el('fw').style.clipPath = `inset(-20% ${100 - P(t, V('endA'), .5, E.oQ) * 100}% -20% 0)`;
  const sp = P(t, V('endB'), .7, E.oQ); el('fs').style.opacity = sp; el('fs').style.transform = `translateY(${(1 - sp) * 30}px)`; el('fs').style.filter = `blur(${(1 - sp) * 12}px)`;
  const st = P(t, V('endB') + 1.7, .6, E.oQ); el('fst').style.opacity = st; el('fst').style.transform = `translateY(${(1 - st) * 30}px)`;
  el('fm').style.opacity = P(t, V('endB') + 2.1, .6) * .9;
}

/* ---------- master ---------- */
window.renderAt = function (t) {
  atmosphere(t); clock(t); call(t);
  // A: the day
  say('L0', t, V('t0') + .9, V('von') - .1); say('L1', t, V('von'), V('onze') - .15);
  lostMap(t); say('L2', t, V('expl'), V('perd') - .1); say('L3', t, V('perd'), V('quatorze') - .15);
  say('L4', t, V('vide'), V('tuesla') - .1); say('L5', t, V('tuesla'), V('msg') - .15);
  say('L6', t, V('msg'), V('siAt') - .15); notif(t);
  say('L7', t, V('siAt'), V('ajoute') - .15); bigPin(t);
  // B: OJA
  el('bug').style.opacity = P(t, V('ajoute'), .6) * (1 - P(t, V('endA') - .5, .4));
  form(t); say('L8', t, V('ajoute'), V('mots') - .15);
  search(t); say('L9', t, V('mots'), V('publics') - .15);
  community(t); say('L10', t, V('publics'), V('tous') - .1); say('L11', t, V('tous'), V('deux') - .15);
  validate(t); say('L12', t, V('deux'), V('valide') - .1); say('L13', t, V('valide'), V('publie') - .1); say('L14', t, V('publie'), V('erreur') - .15);
  report(t); say('L15', t, V('erreur'), V('signale') - .1); say('L16', t, V('signale'), V('endA') - .15);
  finale(t);
  let fl = 0;
  for (const [a, d, m] of [[V('ajoute') - .2, .35, .7], [V('endA') - .35, .3, .3]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .4, E.lin), P(t, DUR2 - .6, .6, E.lin)));
};
