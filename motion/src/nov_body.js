/* ============================================================
   OJA — NOVOJA « Ce qui dort chez toi vaut de l'argent », film 16:9 (1920 × 1080) and 9:16, 57 s, voice: Isac (assets/nov/voix_novoja.mp3, from 0.6 s).
   Same brand-film style as « Une journée à Cotonou » and « Le local devient visible » (big time stamps, colour of the hour,
   word-by-word blur-in text, bubbles, glow and bokeh, one generated hero): a man whose old fridge sleeps in his courtyard.
   Act 1: 08 h 00 the fridge, 11 h 00 « envoie-moi d'abord les frais de transport », the memory of a seller who never
   answered, 18 h 00 still there. Act 2 (kit NOVOJA): publish an object, chat in the app, protected payment (OJA keeps the
   money until the buyer confirms receipt, then the seller is paid), OJA can deliver, disputes arbitrated by the OJA team,
   gifts. No amount, no price, no figure; the seller payout channel (MoMo) is not named (MTN disbursement dependency).
   ============================================================ */
// VERT is set by nov_build.py: false for the 16:9 film, true for the 9:16 version (same story, positions below)
const VERT = /*VERT*/false;
const VW_ = VERT ? 1080 : 1920, VH_ = VERT ? 1920 : 1080, VO = 0.6;
const LY = (h, v) => VERT ? v : h;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
// the hero (generated with ElevenLabs from one reference portrait), one photo per scene
const HV = VERT ? '_v' : '';
// (in 9:16 the dusk shot pans from the fridge to him, and the gift shot is shown as a photo card over its blurred self)
const HER = { frigo: imgL(`assets/nov/h_frigo${HV}.jpg`), groupe: imgL(`assets/nov/h_groupe${HV}.jpg`), soir: imgL('assets/nov/h_soir.jpg'), don: imgL('assets/nov/h_don.jpg'), fin: imgL(`assets/nov/h_fin${HV}.jpg`) };
// voice timings (seconds in the voice file), injected by nov_build.py from assets/nov/voix_novoja.mp3.json
const W_ = /*VOICE_MARKS*/{};
const V = k => W_[k] + VO;
const DUR2 = 57.0;
const GR = '#12B76A', OJ = '#FF6B00';
ICONS.unlock = '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>';

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
const avatar = (s, bg, col = '#344054') => `<div style="width:${s}px;height:${s}px;flex:none;border-radius:50%;background:${bg};display:grid;place-items:center">${ic('user', s * .55, col, 2.2)}</div>`;
const bub = (id, txt, side, x, y, av = '') => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;display:flex;align-items:flex-end;gap:14px;visibility:hidden">${av}
<div style="padding:22px 30px;border-radius:30px;${side === 'r' ? 'border-bottom-right-radius:8px;background:#DCF8C6' : 'border-bottom-left-radius:8px;background:#fff'};color:#111;font:600 40px Inter;line-height:1.2;white-space:nowrap;box-shadow:0 20px 50px rgba(0,0,0,.35)">${txt}</div></div>`;
const msg = (id, txt, side) => `<div id="${id}" style="display:flex;justify-content:${side === 'r' ? 'flex-end' : 'flex-start'};margin-top:16px;opacity:0"><div style="max-width:80%;padding:16px 24px;border-radius:24px;${side === 'r' ? 'border-bottom-right-radius:6px;background:#DCF8C6' : 'border-bottom-left-radius:6px;background:#F1F2F4'};font:600 34px Inter;line-height:1.2">${txt}${side === 'r' ? '<span style="font:600 22px Inter;color:#98A2B3;margin-left:12px">✓✓</span>' : ''}</div></div>`;
const card = (id, x, y, w, h, inner, extra = '') => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:40px;background:#fff;color:#111;box-shadow:0 40px 90px rgba(0,0,0,.4);visibility:hidden;${extra}">${inner}</div>`;
const lab = s => `<div style="font:700 22px Inter;letter-spacing:.14em;color:#8A8F98;margin-bottom:12px">${s}</div>`;
const novMark = (s, c = OJ) => `<span style="display:inline-grid;place-items:center;flex:none;width:${s}px;height:${s}px;border-radius:${s * .3}px;background:${c}">${ic('recycle', s * .62, '#fff', 2.2)}</span>`;
const chip = (id, txt, icn, bg, col, extra = '') => `<div id="${id}" class="abs" style="display:flex;align-items:center;gap:12px;padding:14px 26px;border-radius:40px;background:${bg};color:${col};font:800 32px Inter;white-space:nowrap;box-shadow:0 14px 34px rgba(0,0,0,.3);opacity:0;${extra}">${icn ? ic(icn, 34, col, 3) : ''}${txt}</div>`;
const CATS = ['Électroménager', 'Meubles', 'Vêtements', 'Téléphones'];
const DESC = 'Frigo, il marche bien.';
// protected payment diagram: buyer, OJA, seller
const NA = LY([380, 380], [540, 360]), NS = LY([960, 380], [540, 760]), NT = LY([1540, 380], [540, 1160]);
const node = (id, [x, y], inner, lbl, bg = '#fff') => `<div id="${id}" class="abs" style="left:${x - 85}px;top:${y - 85}px;width:170px;height:170px;border-radius:50%;background:${bg};display:grid;place-items:center;box-shadow:0 24px 60px rgba(0,0,0,.4)">${inner}</div>
<div class="abs" style="left:${x - 160}px;width:320px;top:${y + 100}px;text-align:center;font:800 36px Poppins;color:#fff">${lbl}</div>`;
document.documentElement.style.width = document.body.style.width = VW_ + 'px'; document.documentElement.style.height = document.body.style.height = VH_ + 'px';
stage.style.width = VW_ + 'px'; stage.style.height = VH_ + 'px';
H += `<canvas id="atm" class="abs" style="left:0;top:0" width="${VW_}" height="${VH_}"></canvas>
<div id="clk" class="abs" style="left:0;right:0;top:250px;text-align:center;color:#fff;visibility:hidden"><div id="clkd" style="font:600 30px Inter;letter-spacing:.32em;opacity:.8">SAMEDI</div><div id="clkt" style="font:800 230px Poppins;letter-spacing:-.03em;line-height:1;text-shadow:0 0 60px rgba(255,255,255,.35)">08:00</div></div>
${line('L0', 'Le vieux frigo dort dans ta cour.', 640, 64, 'left:900px;right:60px', 1480)}${line('L1', 'Il marche encore… mais il prend toute la place.', 640, 64, 'left:900px;right:60px', 1480)}
<div id="gch" class="abs" style="left:${LY(120, 60)}px;top:${LY(170, 960)}px;display:flex;align-items:center;gap:12px;padding:12px 24px;border-radius:30px;background:rgba(0,0,0,.55);color:#fff;font:700 28px Inter;visibility:hidden">${ic('users', 32, '#fff', 2.4)}Groupe · Ventes du quartier</div>
${bub('g0', 'Frigo à vendre. Il marche bien.', 'r', LY(330, 330), LY(250, 1040))}${bub('g1', 'Je le prends&nbsp;!', 'l', LY(120, 60), LY(390, 1170), avatar(70, '#D0D5DD', '#667085'))}${bub('g2', 'Envoie-moi d\'abord<br>les frais de transport.', 'l', LY(120, 60), LY(510, 1290), avatar(70, '#D0D5DD', '#667085'))}
${line('L2', 'Tu le proposes dans un groupe.', 820, 64, 'left:60px;right:960px', 1560)}
${card('mc', LY(610, 90), LY(110, 340), LY(700, 900), LY(620, 820), `<div style="display:flex;align-items:center;gap:20px;padding:30px 36px;border-bottom:2px solid #E7E2D8">${avatar(76, '#D0D5DD', '#667085')}<div><div style="font:800 36px Poppins">Vendeur</div><div style="font:600 26px Inter;color:#8A8F98">Téléphone d'occasion</div></div></div>
<div style="padding:10px 36px">${msg('m0', 'C\'est payé.', 'r')}${msg('m1', 'Tu livres quand&nbsp;?', 'r')}${msg('m2', 'Allô&nbsp;?', 'r')}${msg('m3', 'Tu es là&nbsp;?', 'r')}
<div id="m4" style="text-align:center;margin-top:26px;opacity:0"><span style="padding:10px 24px;border-radius:20px;background:#E7E2D8;font:700 26px Inter;color:#6B6458">Aucune réponse</span></div></div>`, 'background:#F6F2EA;filter:grayscale(.55) sepia(.15)')}
${line('L3', 'Tu connais l\'histoire.', 800, 64, '', 1300)}${line('L4', 'Une fois, tu as payé d\'avance…', 800, 64, '', 1300)}${line('L5', 'et le vendeur n\'a *plus jamais répondu.*', 800, 64, '', 1300)}
${line('L6', 'Le frigo est toujours là.', 930)}${line('L7', 'Et la *confiance* est partie.', 930)}
${line('L8', 'Et si l\'argent attendait *la livraison&nbsp;?*', 700, 84, '', 1280, 76)}
<div id="bsh" class="abs" style="left:${LY(960, 540) - 90}px;top:${LY(450, 1040) - 200}px;width:180px;height:200px;visibility:hidden;filter:drop-shadow(0 24px 40px rgba(255,107,0,.6))"><svg width="180" height="200" viewBox="0 0 24 26"><path d="M12 1 3 4.5v7c0 6 3.8 10.6 9 12.5 5.2-1.9 9-6.5 9-12.5v-7z" fill="${OJ}" stroke="#fff" stroke-width=".9"/></svg>
<div class="abs" style="left:50px;top:52px;width:80px;height:80px;display:grid;place-items:center">${ic('lock', 72, '#fff', 2.4)}</div></div>
<div id="bug" class="abs" style="left:60px;top:46px;display:flex;align-items:center;gap:14px;font:900 46px Poppins;color:#fff;opacity:0"><img src="assets/mk_logo.png" style="width:66px;height:66px">OJA</div>
${card('pc', LY(340, 60), LY(110, 200), LY(1240, 960), LY(660, 1180), `<div style="padding:${LY('40px 48px', '44px 50px')}">
<div style="display:flex;align-items:center;gap:18px;font:800 46px Poppins">${novMark(64)}Publier un objet<span style="margin-left:auto;font:800 26px Inter;letter-spacing:.12em;color:${OJ}">NOVOJA</span></div>
<div style="display:flex;flex-direction:${LY('row', 'column')};gap:${LY(48, 36)}px;margin-top:${LY(34, 40)}px">
<div style="width:${LY(560, 860)}px">${lab('PHOTOS')}<div style="display:flex;gap:16px">${[1, 2, 3].map(i => `<img id="ph${i}" src="assets/nov/p${i}.jpg" style="width:${LY(160, 200)}px;height:${LY(160, 200)}px;border-radius:20px;object-fit:cover;opacity:0">`).join('')}
<div style="width:${LY(160, 200)}px;height:${LY(160, 200)}px;border-radius:20px;border:3px dashed #D0D5DD;display:grid;place-items:center">${ic('camera', 46, '#B0B5BD', 2)}</div></div>
<div style="height:${LY(30, 36)}px"></div>${lab('DESCRIPTION')}<div id="fds" style="height:84px;border-radius:22px;border:3px solid #E4E4E7;display:flex;align-items:center;padding:0 26px;font:700 36px Inter;color:#111"><span id="fdt"></span><span id="fcar" style="width:3px;height:44px;background:${OJ};margin-left:3px"></span></div></div>
<div style="width:${LY(536, 860)}px">${lab('TYPE D\'ANNONCE')}<div style="display:flex;height:84px;border-radius:22px;background:#F1F2F4;padding:6px;gap:6px">${['Vendre', 'Donner'].map((s, i) => `<div id="ty${i}" style="flex:1;border-radius:18px;display:grid;place-items:center;font:800 32px Inter;color:#667085">${s}</div>`).join('')}</div>
<div style="height:${LY(30, 36)}px"></div>${lab('CATÉGORIE')}<div style="display:flex;flex-wrap:wrap;gap:14px">${CATS.map((s, i) => `<span id="ct${i}" style="padding:12px 24px;border-radius:30px;border:3px solid #E4E4E7;font:700 28px Inter;color:#444">${s}</span>`).join('')}</div>
<div id="onl" style="margin-top:${LY(30, 40)}px;display:inline-flex;align-items:center;gap:14px;padding:16px 30px;border-radius:40px;background:${GR};color:#fff;font:800 34px Inter;opacity:0">${ic('check', 38, '#fff', 3.2)}Annonce en ligne</div></div></div></div>`)}
${line('L9', 'Sur NOVOJA, dans OJA, tu publies *ton objet.*', 820, 64, '', 1460)}
${card('cc', LY(560, 90), LY(140, 360), LY(800, 900), LY(560, 700), `<div style="display:flex;align-items:center;gap:20px;padding:30px 36px;border-bottom:2px solid #EEE">${avatar(76, '#BFDBFE')}<div><div style="font:800 36px Poppins">Acheteur</div><div style="font:600 26px Inter;color:#8A8F98;display:flex;align-items:center;gap:8px">${novMark(30)}Discussion NOVOJA · Frigo</div></div></div>
<div style="padding:16px 36px">${msg('c0', 'Il marche toujours&nbsp;?', 'l')}${msg('c1', 'Oui, il marche bien.', 'r')}${msg('c2', 'Je le prends. Je paie dans l\'appli.', 'l')}</div>`)}
${line('L10', 'L\'acheteur discute avec toi, *dans l\'appli.*', 800, 64, '', 1260)}
<div id="esc" class="abs" style="left:0;top:0;width:${VW_}px;height:${VH_}px;visibility:hidden">
<svg class="abs" style="left:0;top:0" width="${VW_}" height="${VH_}"><path d="${VERT ? `M200,${NT[1]} L200,${NA[1]}` : `M${NT[0]},640 L${NA[0]},640`}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round"/>
<path id="ln0" d="M${NA[0]},${NA[1]} L${NS[0]},${NS[1]}" stroke="rgba(255,255,255,.25)" stroke-width="4"/><path id="ln1" d="M${NS[0]},${NS[1]} L${NT[0]},${NT[1]}" stroke="rgba(255,255,255,.25)" stroke-width="4"/></svg>
${node('nA', NA, avatar(120, '#BFDBFE'), 'Acheteur')}${node('nT', NT, avatar(120, '#FDE68A'), 'Toi')}
<img id="moto" src="assets/moto.png" class="abs" style="left:0;top:0;width:200px;opacity:0">
<div id="coin" class="abs" style="left:0;top:0;width:100px;height:100px;margin:-50px;border-radius:50%;background:#fff;border:6px solid ${OJ};display:grid;place-items:center;box-shadow:0 0 40px rgba(255,170,90,.8);opacity:0">${ic('wallet', 50, OJ, 2.4)}</div>
<div id="nS" class="abs" style="left:${NS[0] - 100}px;top:${NS[1] - 112}px;width:200px;height:224px;filter:drop-shadow(0 24px 50px rgba(255,107,0,.55))"><svg width="200" height="224" viewBox="0 0 24 26"><path d="M12 1 3 4.5v7c0 6 3.8 10.6 9 12.5 5.2-1.9 9-6.5 9-12.5v-7z" fill="${OJ}" stroke="#fff" stroke-width=".8"/></svg>
<div id="slk" class="abs" style="left:58px;top:58px;width:84px;height:84px;display:grid;place-items:center">${ic('unlock', 76, '#fff', 2.4)}</div><div id="slc" class="abs" style="left:58px;top:58px;width:84px;height:84px;display:grid;place-items:center;opacity:0">${ic('lock', 76, '#fff', 2.4)}</div></div>
<div class="abs" style="left:${NS[0] - 160}px;width:320px;top:${NS[1] + 122}px;text-align:center;font:800 36px Poppins;color:#fff">OJA</div>
${chip('kg', 'Argent gardé', 'lock', '#111', '#fff', VERT ? `left:${NS[0] + 130}px;top:${NS[1] - 36}px` : `left:${NS[0] - 150}px;top:${NS[1] - 200}px`)}
${chip('kl', 'Livraison OJA', '', 'rgba(0,0,0,.6)', '#fff', VERT ? 'left:60px;top:1400px' : `left:${(NA[0] + NT[0]) / 2 - 130}px;top:690px`)}
${chip('kr', 'Objet reçu', 'check', GR, '#fff', VERT ? `left:${NA[0] + 130}px;top:${NA[1] - 36}px` : `left:${NA[0] - 120}px;top:${NA[1] - 170}px`)}
${chip('kp', 'Tu es payé', 'check', GR, '#fff', VERT ? `left:${NT[0] + 130}px;top:${NT[1] - 36}px` : `left:${NT[0] - 130}px;top:${NT[1] - 170}px`)}</div>
${line('L11', 'Il paie… mais c\'est *OJA qui garde l\'argent.*', 860, 64, '', 1560)}${line('L12', 'OJA peut même *livrer.*', 860, 64, '', 1560)}${line('L13', 'Il reçoit le frigo, il confirme.', 860, 64, '', 1560)}${line('L14', 'Et là seulement, *tu es payé.*', 860, 64, '', 1560)}
${card('dc', LY(560, 90), LY(170, 400), LY(800, 900), LY(500, 620), `<div style="padding:${LY('40px 46px', '48px 52px')}"><div style="display:flex;align-items:center;gap:20px;font:800 50px Poppins"><span style="width:84px;height:84px;border-radius:50%;background:${OJ};display:grid;place-items:center">${ic('users', 46, '#fff', 2.4)}</span>Un souci&nbsp;?</div>
${[['shield', 'L\'équipe OJA arbitre'], ['back', 'L\'acheteur est remboursé si besoin']].map(([icn, s], i) => `<div id="dr${i}" style="display:flex;align-items:center;gap:18px;margin-top:${i ? 22 : 40}px;padding:22px 26px;border-radius:24px;background:#F6F7F9;font:700 34px Inter;opacity:0">${ic(icn, 40, OJ, 2.6)}${s}</div>`).join('')}
<div id="dr2" style="margin-top:20px;font:600 24px Inter;color:#8A8F98;opacity:0">Remboursement au numéro qui a payé.</div></div>`)}
${line('L15', 'Un souci&nbsp;? *L\'équipe OJA* arbitre.', 800, 64, '', 1260)}
<div id="dph" class="abs" style="left:60px;top:330px;width:960px;height:540px;border-radius:32px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.5);visibility:hidden"><img src="assets/nov/h_don.jpg" style="width:100%;height:100%;object-fit:cover"></div>
<div id="dn" class="abs" style="left:${LY(1440, 60)}px;top:${LY(70, 930)}px;width:${LY(420, 960)}px;text-align:${LY('right', 'left')};visibility:hidden"><div id="dnb" style="display:inline-flex;align-items:center;gap:14px;padding:16px 32px;border-radius:40px;background:${GR};color:#fff;font:900 44px Poppins">${ic('heart', 44, '#fff', 2.8)}DON</div>
<div style="display:flex;flex-wrap:wrap;justify-content:${LY('flex-end', 'flex-start')};gap:16px;margin-top:24px">${['Vêtements', 'Livres', 'Bébé'].map((s, i) => `<span id="dc${i}" style="padding:14px 28px;border-radius:30px;background:rgba(255,255,255,.94);color:#111;font:700 32px Inter;opacity:0">${s}</span>`).join('')}</div></div>
${line('L16', 'Ce qui ne se vend pas, *tu peux le donner.*', 930, 64, '', 1500)}
<div id="fin" class="abs" style="left:0;top:0;width:${VW_}px;height:${VH_}px;visibility:hidden">
<div class="abs" style="left:${LY(1000, 70)}px;top:${LY(190, 1090)}px;width:${LY(880, 940)}px"><div style="display:flex;align-items:center;gap:26px"><span id="fl">${novMark(140)}</span><div id="fw" style="font:900 136px Poppins;letter-spacing:-.04em;line-height:1;color:#fff">NOVOJA</div></div>
<div id="fsub" style="display:flex;align-items:center;gap:14px;margin-top:18px;font:700 40px Poppins;color:rgba(255,255,255,.85)">dans l'appli<img src="assets/mk_logo.png" style="width:54px;height:54px">OJA</div>
<div id="fs" style="font:800 76px Poppins;letter-spacing:-.02em;line-height:1.1;color:#fff;margin-top:34px">Ce qui dort chez toi<br><span style="color:${OJ}">vaut de l'argent.</span></div>
<div id="fst" style="display:flex;gap:24px;margin-top:48px">${[['phone', 'Télécharger sur', 'App Store'], ['play', 'Disponible sur', 'Google Play']].map(([icn, sm, big]) => `<div style="width:360px;height:104px;border-radius:26px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:18px;padding:0 26px;color:#fff;white-space:nowrap;box-sizing:border-box">${ic(icn, 46, '#fff', 1.8)}<div><div style="font:500 20px Inter;opacity:.75">${sm}</div><div style="font:700 34px Poppins;line-height:1.1">${big}</div></div></div>`).join('')}</div></div>
<div id="fm" class="abs" style="left:${LY(120, 60)}px;right:${LY(120, 60)}px;top:${LY(1000, 1790)}px;text-align:center;font:500 22px Inter;line-height:1.35;color:rgba(255,255,255,.62)">Paiement protégé NOVOJA : l'argent est remis au vendeur après confirmation de réception. Litiges arbitrés par l'équipe OJA. Personnes des images générées par IA.</div></div>
<div id="flash" class="lay" style="width:${VW_}px;height:${VH_}px;background:radial-gradient(circle at 50% 45%,#fff,rgba(255,170,90,.85) 35%,rgba(255,107,0,0) 70%);opacity:0;z-index:40"></div>
<div id="fade" style="width:${VW_}px;height:${VH_}px"></div>`;
stage.innerHTML = H;

/* ---------- atmosphere: palette by time of day, glow blobs, bokeh, extras ---------- */
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
const PAL = {
  dawn: ['#1c0b03', '#a8501a', '#ff9a3c', '#ffd27a'], noon: ['#2e2210', '#a8792e', '#fff1c2', '#ffd27a'], mem: ['#07080b', '#1d2027', '#6b7280', '#9aa3b2'],
  dusk: ['#120822', '#5a2a6e', '#c46bff', '#ff7aa8'], void: ['#000000', '#040302', '#ff6b00', '#ff9a4d'], after: ['#1f1206', '#8a4a14', '#ffb35c', '#ffd9a0'],
  plum: ['#0b0410', '#2a0d26', '#ff6b00', '#ff9a4d'], dark: ['#0d0502', '#3d1503', '#ff6b00', '#ff9a4d']
};
const PKEYS = () => [[0, 'dawn'], [V('onze') - .2, 'noon'], [V('histoire') - .2, 'mem'], [V('dixhuit') - .2, 'dusk'], [V('siArg') - .2, 'void'], [V('surN') - .05, 'dark'],
  [V('ach') - .2, 'plum'], [V('paie') - .2, 'dark'], [V('souci') - .2, 'plum'], [V('donne') - .2, 'after'], [V('endA') - .3, 'dark']];
function palette(t) {
  const K = PKEYS(); let i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
  const cur = PAL[K[i][1]], prv = PAL[K[Math.max(0, i - 1)][1]], k = i ? P(t, K[i][0], .8, E.ioC) : 1;
  return [cur.map((c, j) => mix(hex(prv[j]), hex(c), k)), K[i][1], k];
}
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const BOK = (() => { const r = rng(4); return Array.from({ length: 70 }, () => ({ x: r() * VW_, y: r() * VH_, z: .3 + r() * .9, s: .2 + r(), ph: r() * 6.28 })); })();
function atmosphere(t) {
  const c = el('atm').getContext('2d'), [p, name] = palette(t);
  const g = c.createLinearGradient(0, 0, 0, VH_); g.addColorStop(0, rgba(p[0], 1)); g.addColorStop(1, rgba(p[1], 1)); c.fillStyle = g; c.fillRect(0, 0, VW_, VH_);
  heroine(c, t, p);
  c.save(); c.globalCompositeOperation = 'lighter';
  [[.25, .3, 700, 2], [.75, .65, 800, 3], [.5, 1.05, 900, 2]].forEach(([fx, fy, R, ci], i) => {
    const x = VW_ * fx + Math.sin(t * .23 + i * 2) * 120, y = VH_ * fy + Math.cos(t * .19 + i) * 60, gg = c.createRadialGradient(x, y, 0, x, y, R);
    gg.addColorStop(0, rgba(p[ci], name === 'void' ? .05 : name === 'mem' ? .12 : .28)); gg.addColorStop(1, rgba(p[ci], 0)); c.fillStyle = gg; c.fillRect(x - R, y - R, 2 * R, 2 * R); });
  BOK.forEach(b => { const x = (b.x + t * 20 * b.z) % (VW_ + 80) - 40, y = b.y + Math.sin(t * .5 + b.ph) * 20, r = 6 + b.s * 34 * b.z, a = (name === 'void' ? .05 : .2) * b.z * (.6 + .4 * Math.sin(t * 1.3 + b.ph));
    const gg = c.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, rgba(p[3], a)); gg.addColorStop(.7, rgba(p[3], a * .5)); gg.addColorStop(1, rgba(p[3], 0)); c.fillStyle = gg; c.fillRect(x - r, y - r, 2 * r, 2 * r); });
  c.restore();
  const vis = (a, b) => P(t, a - .3, .6) * (1 - P(t, b - .3, .6));
  // 08:00: morning sun over the courtyard
  let a = vis(0, V('onze')); if (a > 0) { const sx = LY(1500, 760), y = LY(380, 520) - P(t, 0, 5, E.oQ) * 80, gg = c.createRadialGradient(sx, y, 0, sx, y, LY(560, 520)); gg.addColorStop(0, `rgba(255,230,170,${.5 * a})`); gg.addColorStop(.3, `rgba(255,160,70,${.22 * a})`); gg.addColorStop(1, 'rgba(255,120,40,0)'); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = gg; c.fillRect(0, 0, VW_, VH_); c.restore(); }
  // « Et si l'argent attendait la livraison ? »: dashed vault rings turning around the shield
  a = vis(V('siArg'), V('surN')); if (a > 0) { const cx = LY(960, 540), cy = LY(350, 940); c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
    [[170, 1, [6, 18]], [250, -.6, [2, 22]], [340, .4, [30, 26]]].forEach(([R, sp, dash], i) => { const k = P(t, V('siArg') + i * .2, .8, E.oQ); c.setLineDash(dash); c.lineDashOffset = -t * 40 * sp; c.strokeStyle = `rgba(255,140,60,${(.5 - i * .12) * a * k})`; c.lineWidth = 4 - i; c.beginPath(); c.arc(cx, cy, R * lerp(.7, 1, k), 0, Math.PI * 2); c.stroke(); });
    c.setLineDash([]); const lp = P(t, V('livraison') - .1, .5, E.oB); if (lp > 0) { const R = 60 + lp * 420, gg = c.createRadialGradient(cx, cy, 0, cx, cy, R); gg.addColorStop(0, `rgba(255,200,150,${.6 * a})`); gg.addColorStop(.25, `rgba(255,120,30,${.3 * a})`); gg.addColorStop(1, 'rgba(255,107,0,0)'); c.fillStyle = gg; c.fillRect(0, 0, VW_, VH_); }
    c.restore(); }
  // the features: slow light rays behind
  a = .7 * vis(V('surN') - .1, V('surN') + 1.6) + .3 * vis(V('surN') + 1.4, V('donne')); if (a > 0) { c.save(); c.globalCompositeOperation = 'lighter'; c.translate(LY(960, 540), LY(440, 860));
    for (let k = 0; k < 18; k++) { c.rotate(Math.PI * 2 / 18); const gg = c.createLinearGradient(0, 0, 1300, 0); gg.addColorStop(0, `rgba(255,200,140,${.22 * a})`); gg.addColorStop(1, 'rgba(255,107,0,0)');
      c.save(); c.rotate(t * .08); c.fillStyle = gg; c.beginPath(); c.moveTo(0, 0); c.lineTo(1300, -40); c.lineTo(1300, 40); c.closePath(); c.fill(); c.restore(); }
    c.restore(); }
}

// [from, to, photo, side of the hero]
const HSHOW = () => [[-.5, V('onze') - .1, 'frigo', 'L'], [V('onze') - .1, V('histoire') - .1, 'groupe', 'R'], [V('dixhuit') - .1, V('siArg') - .1, 'soir', 'N'], [V('donne') - .1, V('endA') - .3, 'don', 'N'], [V('endA') - .3, DUR2 + 1, 'fin', 'L']];
function heroine(c, t, p) {
  HSHOW().forEach(([a, b, k, side]) => {
    const al = P(t, a - .2, .6, E.ioC) * (1 - P(t, b - .35, .45, E.iC)); if (al <= 0) return;
    const im = HER[k], sc = 1.04 + .06 * clamp((t - a) / Math.min(b - a, 7)), w = VW_ * sc, h = VH_ * sc;
    c.save(); c.globalAlpha = al * .95;
    if (VERT && (k === 'soir' || k === 'don')) {
      const s2 = VH_ / 1080 * sc, cx = k === 'soir' ? lerp(1500, 620, P(t, V('dixhuit') + .4, V('confiance') + .5 - V('dixhuit'), E.ioC)) : 960;
      if (k === 'don') c.filter = 'blur(16px) brightness(.7)';
      c.drawImage(im, 540 - cx * s2, (VH_ - 1080 * s2) / 2, 1920 * s2, 1080 * s2); c.filter = 'none';
    } else c.drawImage(im, (VW_ - w) / 2 + (side === 'L' ? 20 : -20) * (1 - sc), (VH_ - h) / 2, w, h);
    c.globalAlpha = al * (k === 'fin' ? .18 : .3); c.globalCompositeOperation = 'overlay'; c.fillStyle = rgba(p[1], 1); c.fillRect(0, 0, VW_, VH_);
    c.globalCompositeOperation = 'source-over'; c.globalAlpha = al;
    if (VERT) { const tg = c.createLinearGradient(0, 0, 0, 480); tg.addColorStop(0, rgba(p[0], .7)); tg.addColorStop(1, rgba(p[0], 0)); c.fillStyle = tg; c.fillRect(0, 0, VW_, 480);
      const bg = c.createLinearGradient(0, 960, 0, VH_); bg.addColorStop(0, rgba(p[0], 0)); bg.addColorStop(.45, rgba(p[0], .75)); bg.addColorStop(1, rgba(p[0], .95)); c.fillStyle = bg; c.fillRect(0, 960, VW_, VH_ - 960); c.restore(); return; }
    // side darkening for the texts (none on the dusk and gift shots; on the last shot it comes after a beat, so the fridge leaving is seen)
    if (side !== 'N') { const g = side === 'L' ? c.createLinearGradient(1920, 0, 600, 0) : c.createLinearGradient(0, 0, 1320, 0);
      g.addColorStop(0, rgba(p[0], k === 'fin' ? .94 : .9)); g.addColorStop(.45, rgba(p[0], k === 'fin' ? .72 : .55)); g.addColorStop(1, rgba(p[0], 0)); c.fillStyle = g;
      c.globalAlpha = al * (k === 'fin' ? P(t, V('endA') + .1, .7, E.ioC) : 1); c.fillRect(0, 0, 1920, 1080); c.globalAlpha = al; }
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
const popIn = (e, p, s0 = .4) => { e.style.opacity = clamp(p * 1.5); e.style.transform = `scale(${lerp(s0, 1, p)})`; };
const slideIn = (e, p) => { e.style.opacity = clamp(p * 1.5); e.style.transform = `translateY(${(1 - p) * 24}px)`; };
function clock(t) {
  // [from, to, time, mode, centre x in 16:9]; in 9:16 every stamp sits at the top (the photos fill the frame)
  const S = [[V('t0') - .2, V('onze') - .15, '08:00', 'big', 1340], [V('onze') - .1, VERT ? V('propose') - .1 : V('histoire') - .15, '11:00', 'top', 640], [V('dixhuit') - .1, V('siArg') - .15, '18:00', 'top', 1110]];
  const s = S.find(([a, b]) => t >= a && t < b), e = el('clk');
  if (!s) { e.style.visibility = 'hidden'; return; }
  const [a, b, txt, mode0, cx0] = s, cx = LY(cx0, 540), mode = VERT ? (txt === '18:00' ? 'vtop' : 'vlow') : mode0, p = P(t, a, .6, E.oQ), q = P(t, b - .35, .35, E.iC); e.style.visibility = 'visible'; e.style.left = (cx - 600) + 'px'; e.style.right = 'auto'; e.style.width = '1200px';
  el('clkt').textContent = txt; el('clkt').style.fontSize = mode === 'big' ? '230px' : mode[0] === 'v' ? '160px' : '120px'; el('clkd').style.display = mode === 'top' ? 'none' : 'block';
  e.style.top = mode === 'big' ? '250px' : mode === 'vtop' ? '110px' : mode === 'vlow' ? '1150px' : '50px'; e.style.opacity = p * (1 - q); e.style.filter = `blur(${(1 - p) * 20 + q * 14}px)`; e.style.transform = `scale(${lerp(1.08, 1, p)})`;
}
function group(t) {
  const b = V('histoire') - .1, ch = el('gch'), on = t >= V('propose') - .2 && t < b; ch.style.visibility = on ? 'visible' : 'hidden'; if (on) ch.style.opacity = P(t, V('propose') - .2, .4) * (1 - P(t, b - .35, .35));
  [['g0', V('propose') + .3], ['g1', V('prends') - .1], ['g2', V('prends') + 1.1]].forEach(([id, a]) => {
    const e = el(id), on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
    const p = P(t, a, .45, E.oB), q = P(t, b - .35, .35, E.iC); e.style.opacity = clamp(p * 1.5) * (1 - q); e.style.transform = `translateY(${(1 - p) * 40}px) scale(${lerp(.8, 1, p)})`; e.style.filter = `blur(${q * 18}px)`;
  });
}
function memory(t) {
  const p = pop('mc', t, V('histoire') - .1, V('dixhuit') - .1, 60); if (!p) return;
  [[0, V('avance') + .5], [1, V('avance') + 1.3], [2, V('vendeur') + .2], [3, V('vendeur') + .9]].forEach(([i, a]) => slideIn(el('m' + i), P(t, a, .35, E.oB)));
  el('m4').style.opacity = P(t, V('vendeur') + 1.6, .5);
}
function shieldDrop(t) {
  const e = el('bsh'), a = V('livraison') - .45, b = V('surN') - .1, on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const k = P(t, a, .4, E.iC), bo = P(t, a + .4, .35, E.oB), q = P(t, b - .35, .35, E.iC);
  e.style.transform = `translateY(${(1 - k) * -700}px) scale(${k < 1 ? 1 : lerp(1.15, 1, bo)},${k < 1 ? 1.1 : lerp(.85, 1, bo)})`; e.style.transformOrigin = '50% 100%'; e.style.opacity = 1 - q;
}
function publish(t) {
  const p = pop('pc', t, V('surN') - .1, V('ach') + .4, 80); if (!p) return;
  [1, 2, 3].forEach(i => popIn(el('ph' + i), P(t, V('photos') + (i - 1) * .16, .4, E.oB), .5));
  const n = Math.round(P(t, V('desc'), .7, E.lin) * DESC.length); el('fdt').textContent = DESC.slice(0, n);
  el('fcar').style.opacity = n < DESC.length && t > V('desc') - .4 ? (Math.floor(t * 3) % 2 === 0 ? 1 : .2) : 0; el('fds').style.borderColor = t >= V('desc') - .1 && t < V('ligne') ? OJ : '#E4E4E7';
  const sel = t >= V('publies'); el('ty0').style.background = sel ? OJ : 'transparent'; el('ty0').style.color = sel ? '#fff' : '#667085'; el('ty1').style.background = 'transparent';
  const cs = P(t, V('publies') + .5, .3, E.oB); CATS.forEach((_, i) => { const e = el('ct' + i), on = i === 0 && cs > 0; e.style.background = on ? OJ : '#fff'; e.style.color = on ? '#fff' : '#444'; e.style.borderColor = on ? OJ : '#E4E4E7'; e.style.transform = `scale(${on ? lerp(1.12, 1, cs) : 1})`; });
  popIn(el('onl'), P(t, V('ligne'), .45, E.oB), .5);
}
function chat(t) {
  const p = pop('cc', t, V('ach') - .1, V('paie') + .2, 80); if (!p) return;
  [[0, V('ach') + .5], [1, V('ach') + 1.3], [2, V('paie') - .7]].forEach(([i, a]) => slideIn(el('c' + i), P(t, a, .35, E.oB)));
}
function escrow(t) {
  const on = t >= V('paie') - .1 && t < V('souci') + .45, e = el('esc'); e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  e.style.opacity = P(t, V('paie') - .1, .45) * (1 - P(t, V('souci') + .1, .35));
  ['nA', 'nS', 'nT'].forEach((id, i) => { const k = P(t, V('paie') - .1 + i * .12, .5, E.oB); el(id).style.transform = `scale(${lerp(.4, 1, k)})`; el(id).style.opacity = clamp(k * 1.5); });
  // the money: buyer -> OJA (kept), then OJA -> seller once the buyer confirms
  const T2 = V('confirme') + .75, k1 = P(t, V('paie') + .2, .8, E.ioC), k2 = P(t, T2, .7, E.ioC), cn = el('coin');
  const [x, y] = k2 > 0 ? [lerp(NS[0], NT[0], k2), lerp(NS[1], NT[1], k2)] : [lerp(NA[0], NS[0], k1), lerp(NA[1], NS[1], k1)];
  cn.style.opacity = t >= V('paie') + .1 && (k1 < 1 || k2 > 0) ? 1 : 0; cn.style.transform = `translate(${x}px,${y}px) scale(${k2 > 0 ? lerp(.7, 1, k2) : lerp(1, .7, k1)})`;
  const locked = t >= V('garde') - .2 && t < T2 - .1; el('slc').style.opacity = locked ? 1 : 0; el('slk').style.opacity = locked ? 0 : 1;
  el('nS').style.transform = `scale(${1 + .1 * Math.sin(Math.PI * clamp((t - V('garde') + .2) / .35)) + .1 * Math.sin(Math.PI * clamp((t - T2 + .1) / .35))})`;
  el('ln0').style.stroke = k1 > 0 && k1 < 1 ? 'rgba(255,170,90,.9)' : 'rgba(255,255,255,.25)'; el('ln1').style.stroke = k2 > 0 && k2 < 1 ? 'rgba(255,170,90,.9)' : 'rgba(255,255,255,.25)';
  popIn(el('kg'), P(t, V('garde') - .1, .4, E.oB), .5); el('kg').style.opacity = clamp(P(t, V('garde') - .1, .4, E.oB) * 1.5) * (1 - P(t, T2 - .1, .3));
  // OJA delivery from the seller to the buyer
  const km = P(t, V('livrer') - .1, V('recoit') + .5 - V('livrer'), E.ioC), mo = el('moto');
  const mx = VERT ? 200 : lerp(NT[0], NA[0], km), my = VERT ? lerp(NT[1], NA[1], km) : 640;
  mo.style.opacity = km > 0 && t < V('confirme') + .3 ? 1 - P(t, V('confirme'), .3) : 0; mo.style.transform = `translate(${mx - 100}px,${my - 130}px) scaleX(${VERT ? 1 : -1})`;
  el('kl').style.opacity = P(t, V('livrer'), .4) * (1 - P(t, V('confirme'), .3));
  popIn(el('kr'), P(t, V('confirme') - .05, .4, E.oB), .5);
  el('nA').style.boxShadow = t >= V('confirme') ? `0 0 0 8px ${GR},0 24px 60px rgba(0,0,0,.4)` : '0 24px 60px rgba(0,0,0,.4)';
  popIn(el('kp'), P(t, T2 + .75, .4, E.oB), .5);
  el('nT').style.boxShadow = t >= T2 + .7 ? `0 0 0 8px ${GR},0 0 60px rgba(18,183,106,.6)` : '0 24px 60px rgba(0,0,0,.4)';
}
function dispute(t) {
  const p = pop('dc', t, V('souci') + .2, V('donne') - .1, 80); if (!p) return;
  slideIn(el('dr0'), P(t, V('arbitre'), .4, E.oB)); slideIn(el('dr1'), P(t, V('rembourse'), .4, E.oB)); el('dr2').style.opacity = P(t, V('rembourse') + .5, .4);
}
function gift(t) {
  const e = el('dn'), a = V('donne') + .1, b = V('endA') - .35, on = t >= a && t < b; if (VERT) pop('dph', t, V('donne') - .1, b, 60);
  e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  e.style.opacity = 1 - P(t, b - .35, .35); popIn(el('dnb'), P(t, a, .45, E.oB), .5);
  [0, 1, 2].forEach(i => popIn(el('dc' + i), P(t, V('donner') - .2 + i * .15, .4, E.oB), .5));
}
function finale(t) {
  const on = t >= V('endA') - .3, e = el('fin'); e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  // his smiling photo is drawn by heroine() under the glows; the texts come on the free side
  const lp = P(t, V('endA') - .2, .6, E.oB); el('fl').style.display = 'inline-block'; el('fl').style.transform = `scale(${lerp(.5, 1, lp)})`; el('fl').style.opacity = clamp(lp * 1.5);
  el('fw').style.clipPath = `inset(-20% ${100 - P(t, V('endA'), .5, E.oQ) * 100}% -20% 0)`;
  const sb = P(t, V('endA') + .5, .5, E.oQ); el('fsub').style.opacity = sb; el('fsub').style.transform = `translateY(${(1 - sb) * 20}px)`;
  const sp = P(t, V('endB'), .7, E.oQ); el('fs').style.opacity = sp; el('fs').style.transform = `translateY(${(1 - sp) * 30}px)`; el('fs').style.filter = `blur(${(1 - sp) * 12}px)`;
  const st = P(t, V('endB') + 1.9, .6, E.oQ); el('fst').style.opacity = st; el('fst').style.transform = `translateY(${(1 - st) * 30}px)`;
  el('fm').style.opacity = P(t, V('endB') + 2.3, .6) * .9;
}

/* ---------- master ---------- */
window.renderAt = function (t) {
  atmosphere(t); clock(t); group(t);
  // A: the fridge that sleeps
  say('L0', t, V('frigo'), V('marche') - .1); say('L1', t, V('marche'), V('onze') - .15);
  say('L2', t, V('propose'), V('prends') - .15);
  memory(t); say('L3', t, V('histoire'), V('avance') - .1); say('L4', t, V('avance'), V('vendeur') - .1); say('L5', t, V('vendeur'), V('dixhuit') - .15);
  say('L6', t, V('dixhuit') + 1.0, V('confiance') - .1); say('L7', t, V('confiance'), V('siArg') - .15);
  say('L8', t, V('siArg'), V('surN') - .15); shieldDrop(t);
  // B: NOVOJA
  el('bug').style.opacity = P(t, V('surN'), .6) * (1 - P(t, V('donne') - .5, .4));
  publish(t); say('L9', t, V('surN'), V('ach') - .15);
  chat(t); say('L10', t, V('ach'), V('paie') - .15);
  escrow(t); say('L11', t, V('paie'), V('livrer') - .1); say('L12', t, V('livrer'), V('recoit') - .1); say('L13', t, V('recoit'), V('paye') - .1); say('L14', t, V('paye'), V('souci') - .15);
  dispute(t); say('L15', t, V('souci'), V('donne') - .15);
  gift(t); say('L16', t, V('donne'), V('endA') - .35);
  finale(t);
  let fl = 0;
  for (const [a, d, m] of [[V('surN') - .2, .35, .7], [V('endA') - .35, .3, .3]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .4, E.lin), P(t, DUR2 - .6, .6, E.lin)));
};
