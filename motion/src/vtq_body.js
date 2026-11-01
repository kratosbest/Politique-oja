/* ============================================================
   OJA — « Vendez tranquille », awareness film for the women who sell live on social media, 9:16 (1080 × 1920), 49.5 s.
   Voices: the seller (Alimata, assets/vtq/voix_vendeuse.mp3, from 0.6 s), then the OJA narrator (Isac, voix_oja.mp3, from 24.6 s).
   Photos generated with Nano Banana 2 Lite in ElevenLabs (same seller in every scene, from assets/vtq/vtq_ref.jpg); five scenes
   play Veo clips the team made in Google Flow from those photos (clips_vtq/, frames extracted to assets/vtqf/, see README).
   The live clip comes with the live interface Veo drew (kept at the team's request), so the page adds no live overlay of its own;
   the end stays a photo.
   Story: she sells live; a client sends a fake Mobile Money screenshot; another says he will pay when the courier arrives,
   then stops answering (dull grade, TikTok-style captions). With OJA (team-confirmed): the client pays the order by Mobile Money
   in the app, an unpaid order never reaches the seller's Oja Merchant, the courier leaves with an order already paid (the
   delivery fee may still be paid to the courier on arrival: footnote), and the seller withdraws her money in Oja Merchant.
   No amount on screen.
   ============================================================ */
const VA = 0.6, VB = 24.6, DUR2 = 49.5, FW = 1080, HH = 1920;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const PH = { live: imgL('assets/vtq/v_live.jpg'), doute: imgL('assets/vtq/v_doute.jpg'), colere: imgL('assets/vtq/v_colere.jpg'), livreur: imgL('assets/vtq/v_livreur.jpg'),
  tranquille: imgL('assets/vtq/v_tranquille.jpg'), colis: imgL('assets/vtq/v_colis.jpg'), fin: imgL('assets/vtq/v_fin.jpg') };
// the frauds are graded dull and dusty; the live and everything after « Avec OJA, c'est fini » are vivid
const DULL = { doute: 1, colere: 1, livreur: 1 };
// Veo clips (8 s, 24 fps, 188 frames each), drawn frame by frame; a frame that is not decoded yet is drawn on the next waitFrame
const CLIP = { live: 'c_live', doute: 'c_doute', colere: 'c_colere', livreur: 'c_livreur', tranquille: 'c_tranquille', colis: 'c_colis' }, CLIPN = 188;
const FCACHE = new Map(); let pend = null, lastT = 0;
function frame(c, u) {
  const i = Math.max(1, Math.min(CLIPN, Math.floor(u * 24) + 1)), src = `assets/vtqf/${c}/f${String(i).padStart(3, '0')}.jpg`;
  let im = FCACHE.get(src); if (!im) { im = new Image(); im.src = src; FCACHE.set(src, im); if (FCACHE.size > 48) FCACHE.delete(FCACHE.keys().next().value); }
  return im;
}
window.waitFrame = async () => { if (pend) { const p = pend; pend = null; await p.decode().catch(() => 0); photos(lastT); } };
// voice timings (seconds in each voice file), injected by vtq_build.py from the .mp3.json alignments
const WA_ = /*VOICE_A*/{}, WB_ = /*VOICE_B*/{};
const A = k => WA_[k] + VA, B = k => WB_[k] + VB;
const OJ = '#FF6B00', OJ2 = '#FF8A1F', GR = '#12B76A', RD = '#F04438', YE = '#FFD400';
Object.assign(ICONS, {
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  call: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  bank: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="m12 2 8 5H4Z"/>',
});

/* ---------- reportage text (OJA part): kicker + big uppercase lines that rise out of a mask ---------- */
const title = (id, kicker, l1, l2, y = 1160, size = 96) => `<div id="${id}" class="abs" style="left:64px;right:120px;top:${y}px;visibility:hidden">
${kicker ? `<div class="k" style="display:flex;align-items:center;gap:16px;font:700 32px Poppins;letter-spacing:.3em;color:${OJ2};margin-bottom:18px"><span style="width:46px;height:6px;background:${OJ2};border-radius:3px"></span>${kicker}</div>` : ''}
${[l1, l2].filter(Boolean).map((s, i) => `<div style="overflow:hidden;padding-bottom:6px"><div class="ln" style="font:900 ${size}px Poppins;line-height:1.0;letter-spacing:-.01em;text-transform:uppercase;color:${i ? OJ2 : '#fff'};text-shadow:0 6px 30px rgba(0,0,0,.45)">${s}</div></div>`).join('')}</div>`;
const TCACHE = {};
function show(id, t, a, b) {
  const e = el(id), on = t >= a - .02 && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const c = TCACHE[id] || (TCACHE[id] = { k: e.querySelector('.k'), ln: [...e.querySelectorAll('.ln')] }), q = P(t, b - .25, .25, E.iC);
  if (c.k) { const p = P(t, a, .4, E.oQ); c.k.style.opacity = p * (1 - q); c.k.style.transform = `translateX(${(1 - p) * -30}px)`; }
  c.ln.forEach((l, i) => { const p = P(t, a + .08 + i * .12, .5, E.oQ); l.style.transform = `translateY(${(1 - p) * 110 + q * -110}%)`; });
}

/* ---------- the seller's part: TikTok-style captions of what she says ---------- */
const CAPS = () => [[A('live'), A('wax'), 'Bonsoir la famille,', 'on est en direct !'], [A('wax'), A('mais'), 'Ce wax-là, il en reste trois.', 'Qui prend ?'],
  [A('mais'), A('client'), 'Mais je dois vous dire', 'une chose.'], [A('client'), A('verifie'), 'Un client m\'envoie', 'sa capture Mobile Money.'],
  [A('verifie'), A('fausse'), 'Je vérifie…', 'rien n\'est arrivé.'], [A('fausse'), A('autre'), 'C\'est une', 'fausse capture !'],
  [A('autre'), A('arrive'), 'Un autre : « Je paie', 'quand le livreur arrive. »'], [A('arrive'), A('deplac'), 'Le livreur arrive…', 'il ne décroche plus.'],
  [A('deplac'), A('fatig'), 'Et le déplacement,', 'c\'est encore moi qui paie.'], [A('fatig'), B('fini') - .35, 'Vraiment,', 'on est fatiguées !']];
const OUT = [...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `${(Math.cos(a) * 4).toFixed(1)}px ${(Math.sin(a) * 4).toFixed(1)}px 0 #000`; }).join(',') + ',0 8px 24px rgba(0,0,0,.6)';
// live comments (first names and words are made up) and hearts
const COMS = [[1.0, 'Afi', '#F79009', 'Je prends !'], [1.9, 'Sènan', '#2E90FA', 'Il reste le bleu ?'], [2.8, 'Koffi', '#12B76A', 'Livraison à Calavi ?'],
  [3.6, 'Rachida', '#EE46BC', 'Envoie ton numéro Mobile Money'], [4.5, 'Mawuli', '#7A5AF8', 'Moi aussi je veux'], [5.3, 'Edwige', '#F04438', 'Mets-moi deux !']];
const HR = rng(11), HEARTS = [...Array(14)].map((_, i) => [.6 + i * .38 + HR() * .2, HR() * 70, ['#FF4D6D', '#FF8A1F', '#FFD400', '#fff'][i % 4], .7 + HR() * .5]);

/* ---------- UI cards ---------- */
const card = (id, x, y, w, inner, extra = '') => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;border-radius:40px;background:#fff;color:#111;box-shadow:0 40px 100px rgba(0,0,0,.5);visibility:hidden;${extra}">${inner}</div>`;
const kv = (k, v, vc = '#111') => `<div style="display:flex;justify-content:space-between;align-items:center;padding:18px 0;border-top:2px solid #F2F4F7;font:600 30px Inter"><span style="color:#667085">${k}</span><span style="font-weight:800;color:${vc}">${v}</span></div>`;
const pill = (id, bg, icn, txt, extra = '') => `<div id="${id}" class="abs" style="display:inline-flex;align-items:center;gap:14px;padding:16px 28px;border-radius:40px;background:${bg};color:#fff;font:800 34px Inter;box-shadow:0 20px 50px rgba(0,0,0,.45);visibility:hidden;${extra}">${ic(icn, 38, '#fff', 3)}${txt}</div>`;
document.documentElement.style.width = document.body.style.width = FW + 'px'; document.documentElement.style.height = document.body.style.height = HH + 'px';
stage.style.width = FW + 'px'; stage.style.height = HH + 'px';
H += `<canvas id="ph" class="abs" style="left:0;top:0" width="${FW}" height="${HH}"></canvas>
<div id="lv" class="abs" style="left:0;top:0;width:${FW}px;height:${HH}px">
<div class="abs" style="left:48px;top:70px;display:flex;align-items:center;gap:12px;padding:12px 24px;border-radius:14px;background:${RD};color:#fff;font:800 30px Inter;letter-spacing:.08em"><span id="lvdot" style="width:16px;height:16px;border-radius:50%;background:#fff"></span>EN DIRECT</div>
${COMS.map(([, n, c, s], i) => `<div id="cm${i}" class="abs" style="left:44px;top:0;display:flex;align-items:center;gap:16px;max-width:760px;opacity:0"><span style="width:58px;height:58px;flex:none;border-radius:50%;background:${c};display:grid;place-items:center;font:800 28px Inter;color:#fff">${n[0]}</span>
<div style="padding:12px 22px;border-radius:24px;background:rgba(0,0,0,.42)"><div style="font:700 24px Inter;color:rgba(255,255,255,.75)">${n}</div><div style="font:700 32px Inter;color:#fff">${s}</div></div></div>`).join('')}
${HEARTS.map((_, i) => `<div id="hz${i}" class="abs" style="left:0;top:0;opacity:0">${ic('heart', 64, HEARTS[i][2], 0, HEARTS[i][2])}</div>`).join('')}</div>
${card('sc', 150, 250, 780, `<div style="padding:40px 44px 26px"><div style="display:flex;align-items:center;gap:20px"><span style="width:84px;height:84px;flex:none;border-radius:50%;background:${GR};display:grid;place-items:center">${ic('check', 48, '#fff', 3.4)}</span>
<div><div style="font:800 46px Poppins">Transfert réussi</div><div style="font:600 26px Inter;color:#667085">Mobile Money · aujourd'hui</div></div></div>
<div style="margin-top:26px">${kv('Montant', '••••• FCFA')}${kv('Destinataire', 'Boutique')}${kv('Référence', '••••••••')}${kv('Statut', 'Réussi', GR)}</div></div>`, 'transform-origin:50% 40%')}
<div id="stamp" class="abs" style="left:140px;top:520px;width:800px;text-align:center;white-space:nowrap;padding:18px 0;border:12px solid ${RD};border-radius:26px;color:${RD};font:900 66px Poppins;letter-spacing:.02em;background:rgba(255,255,255,.9);visibility:hidden">FAUSSE CAPTURE</div>
${pill('scr', RD, 'x', 'Rien reçu sur mon compte', 'left:200px;top:930px')}
${card('bub', 90, 150, 900, `<div style="padding:30px 34px;display:flex;gap:22px;align-items:flex-start"><span style="width:76px;height:76px;flex:none;border-radius:50%;background:#E4E7EC;display:grid;place-items:center">${ic('user', 42, '#667085', 2.4)}</span>
<div><div style="font:700 26px Inter;color:#667085">Client</div><div style="margin-top:8px;padding:22px 28px;border-radius:8px 30px 30px 30px;background:#F2F4F7;font:700 38px Inter;line-height:1.25">Je paie quand le livreur arrive.</div>
<div style="margin-top:8px;font:600 22px Inter;color:#98A2B3">Vu ✓✓</div></div></div>`)}
${card('call', 140, 170, 800, `<div style="padding:34px 40px;display:flex;align-items:center;gap:26px"><div style="position:relative;width:110px;height:110px;flex:none">
<div id="callr" class="abs" style="inset:0;border-radius:50%;border:6px solid ${GR}"></div><div class="abs" style="inset:12px;border-radius:50%;background:#344054;display:grid;place-items:center">${ic('user', 48, '#fff', 2.2)}</div></div>
<div style="flex:1"><div style="font:800 46px Poppins;color:#fff">Client</div><div id="calls" style="font:700 32px Inter;color:#98A2B3">Appel en cours…</div></div>
<span id="callb" style="width:96px;height:96px;flex:none;border-radius:50%;background:${RD};display:grid;place-items:center">${ic('call', 46, '#fff', 2.2)}</span></div>`, 'background:#1d2230')}
<div id="rev" class="abs" style="left:0;right:0;top:640px;text-align:center;visibility:hidden"><img id="revl" src="assets/mk_logo.png" style="width:260px;height:260px;filter:drop-shadow(0 0 60px rgba(255,107,0,.9))">
<div style="overflow:hidden;margin-top:30px"><div class="ln" style="font:900 120px Poppins;line-height:1;color:#fff;text-transform:uppercase">Avec OJA,</div></div><div style="overflow:hidden"><div class="ln" style="font:900 120px Poppins;line-height:1.05;color:${OJ};text-transform:uppercase">c'est fini.</div></div></div>
<div id="bug" class="abs" style="left:56px;top:70px;display:flex;align-items:center;gap:14px;font:900 46px Poppins;color:#fff;opacity:0"><img src="assets/mk_logo.png" style="width:66px;height:66px">OJA</div>
${card('ck', 90, 250, 900, `<div style="padding:40px 46px"><div style="display:flex;align-items:center;gap:20px"><span style="width:88px;height:88px;border-radius:26px;background:#FFF1E6;display:grid;place-items:center">${ic('bag', 48, OJ, 2.2)}</span>
<div><div style="font:800 48px Poppins">Paiement OJA</div><div style="font:600 26px Inter;color:#8A8F98">Commande OJA Market</div></div></div>
<div style="display:flex;align-items:center;gap:20px;margin-top:30px;padding:24px 28px;border-radius:26px;background:#FFF1E6;color:#9A3412;font:700 30px Inter;line-height:1.3">${ic('lock', 44, OJ, 2.4)}<span>Paiement Mobile Money sécurisé après validation de la commande.</span></div>
<div style="display:flex;align-items:center;gap:18px;margin-top:20px;padding:22px 28px;border-radius:26px;border:3px solid #E4E7EC;font:700 34px Inter">${ic('phone', 40, GR, 2.4)}Mobile Money<span style="margin-left:auto;color:#98A2B3">›</span></div>
<div style="position:relative;margin-top:26px;height:110px;border-radius:30px;overflow:hidden"><div class="abs" style="inset:0;background:${OJ};color:#fff;display:grid;place-items:center;font:800 40px Inter">Payer par Mobile Money</div>
<div id="ckok" class="abs" style="inset:0;background:${GR};color:#fff;display:flex;align-items:center;justify-content:center;gap:16px;font:800 40px Inter;clip-path:circle(0% at 50% 50%)">${ic('check', 46, '#fff', 3.2)}Paiement confirmé</div>
<div id="cktap" class="abs" style="left:450px;top:55px;width:110px;height:110px;margin:-55px;border-radius:50%;background:rgba(255,255,255,.5);border:5px solid #fff;opacity:0"></div></div></div>`)}
${card('mc', 90, 250, 900, `<div style="padding:40px 44px"><div style="font:800 52px Poppins;color:#fff">Ma boutique</div><div style="font:600 26px Inter;color:#98A2B3">Votre espace de gestion Oja Merchant</div>
<div style="display:flex;gap:18px;margin-top:30px">${[['bell', 'Nouvelles', '#F79009'], ['clock', 'En cours', '#2E90FA'], ['box', 'Prêtes', GR]].map(([icn, s, c], i) => `<div id="mk${i}" style="flex:1;padding:22px;border-radius:28px;background:#262c3d;border:3px solid #2f3648"><span style="width:62px;height:62px;border-radius:18px;background:${c}22;display:grid;place-items:center">${ic(icn, 34, c, 2.4)}</span>
<div class="n" style="font:800 64px Poppins;color:#fff;margin-top:12px;line-height:1">0</div><div style="font:600 26px Inter;color:#98A2B3">${s}</div></div>`).join('')}</div>
<div id="mrow" style="display:flex;align-items:center;gap:20px;margin-top:24px;padding:24px 26px;border-radius:28px;background:#fff;color:#111"><span style="width:72px;height:72px;flex:none;border-radius:22px;background:#FFF1E6;display:grid;place-items:center">${ic('bag', 40, OJ, 2.2)}</span>
<div style="flex:1"><div style="font:800 36px Inter">Nouvelle commande</div><div style="font:600 26px Inter;color:#667085">OJA Market · Wax</div></div>
<span style="display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:30px;background:#ECFDF3;color:#067647;font:800 28px Inter">${ic('check', 30, '#067647', 3)}Payée</span></div></div>`, 'background:#1d2230')}
${pill('paid', GR, 'check', 'Commande déjà payée', 'left:250px;top:880px')}
${card('rv', 90, 300, 900, `<div style="padding:40px 44px"><div style="display:flex;align-items:center;gap:22px"><span style="width:92px;height:92px;flex:none;border-radius:28px;background:#0c3b2a;display:grid;place-items:center">${ic('bank', 50, '#32D583', 2.2)}</span>
<div><div style="font:800 44px Poppins;color:#fff">Revenus &amp; reversements</div><div style="font:600 27px Inter;color:#98A2B3">Consultez vos ventes et vos gains retirables.</div></div></div>
<div style="display:flex;align-items:center;justify-content:space-between;margin-top:30px;padding:26px 30px;border-radius:28px;background:#262c3d"><span style="font:700 32px Inter;color:#98A2B3">Gains retirables</span><span style="font:800 40px Inter;color:#fff;letter-spacing:.1em">•••••</span></div>
<div style="position:relative;margin-top:22px;height:108px;border-radius:30px;overflow:hidden"><div id="rvb" class="abs" style="inset:0;background:${OJ};color:#fff;display:flex;align-items:center;justify-content:center;gap:14px;font:800 40px Inter">${ic('wallet', 44, '#fff', 2.4)}Retirer mes gains</div>
<div id="rvtap" class="abs" style="left:450px;top:54px;width:110px;height:110px;margin:-55px;border-radius:50%;background:rgba(255,255,255,.5);border:5px solid #fff;opacity:0"></div></div></div>`, 'background:#1d2230')}
${title('T1', 'AVEC OJA', 'Ton client paie', 'dans l\'appli.')}${title('T2', 'SANS PAIEMENT', 'Pas de paiement,', 'pas de commande.', 1160, 84)}
${title('T3', 'FINI LES FAUSSES CAPTURES', 'Plus de capture', 'à vérifier.')}${title('T4', 'LE LIVREUR PART', 'Commande', 'déjà payée.')}
${title('T5', 'TES REVENUS', 'Ton argent,', 'tu le retires.')}${title('T6', 'VENDEUSES', 'Mettez votre boutique', 'sur OJA.', 880, 84)}
<div id="cap" class="abs" style="left:40px;right:40px;top:1270px;text-align:center;visibility:hidden"><div id="cap1" style="font:900 62px Poppins;line-height:1.12;color:#fff;text-shadow:${OUT}"></div><div id="cap2" style="font:900 62px Poppins;line-height:1.12;color:${YE};text-shadow:${OUT}"></div></div>
<div id="cta" class="abs" style="left:64px;right:64px;top:1300px;visibility:hidden"><div style="font:800 60px Poppins;color:#fff">Vendez tranquille.</div>
<div style="display:inline-flex;align-items:center;gap:14px;margin-top:24px;padding:18px 30px;border-radius:40px;background:${OJ};color:#fff;font:800 32px Inter">${ic('store', 38, '#fff', 2.4)}Crée ta boutique dans Oja App</div>
<div style="display:flex;gap:22px;margin-top:28px">${[['phone', 'Télécharger sur', 'App Store'], ['play', 'Disponible sur', 'Google Play']].map(([icn, sm, big]) => `<div style="width:340px;height:100px;border-radius:26px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:18px;padding:0 24px;color:#fff;white-space:nowrap;box-sizing:border-box">${ic(icn, 44, '#fff', 1.8)}<div><div style="font:500 20px Inter;opacity:.75">${sm}</div><div style="font:700 32px Poppins;line-height:1.1">${big}</div></div></div>`).join('')}</div></div>
<div id="fm" class="abs" style="left:60px;right:60px;top:1780px;text-align:center;font:500 21px Inter;line-height:1.35;color:rgba(255,255,255,.62);opacity:0">Mise en situation, personnes des images générées par IA. La commande est payée dans l'appli ; les frais de livraison peuvent être réglés au livreur à l'arrivée.</div>
<div id="flash" class="lay" style="width:${FW}px;height:${HH}px;background:#fff;opacity:0;z-index:40"></div>
<div id="fade" style="width:${FW}px;height:${HH}px"></div>`;
stage.innerHTML = H;

/* ---------- photos: cover, slow push-in, punch on each cut; blurred and dimmed under the cards ---------- */
// [from, to, photo, blur from (-1: blurred all along, undefined: sharp), clip time at the start of the shot (undefined: the photo)]
// live: « Bonsoir » at 0.46 s in the clip, 0.68 s in the voice; colere: in the clip she says « Un autre » at 0.54 s and « Vraiment » at 5.86 s, so her lips follow the seller's voice
const SHOTS = () => [[0, A('mais') - .1, 'live', undefined, -.3], [A('mais') - .1, A('autre') - .1, 'doute', A('client') - .1, 0], [A('autre') - .1, A('arrive') - .1, 'colere', undefined, .44],
  [A('arrive') - .1, A('fatig') - .1, 'livreur', undefined, 1.2], [A('fatig') - .1, B('fini') - .15, 'colere', undefined, 5.76], [B('client') - .2, B('livreur') - .1, 'tranquille', B('momo') - .6, 0],
  [B('livreur') - .1, B('argent') - .1, 'colis', undefined, 0], [B('argent') - .1, B('vend') - .1, 'tranquille', -1, 4], [B('vend') - .1, DUR2 + 1, 'fin']];
const CUTS = () => SHOTS().slice(1).map(s => s[0]).concat([B('fini') - .15]);
function photos(t) {
  const c = el('ph').getContext('2d'); c.fillStyle = '#0a0705'; c.fillRect(0, 0, FW, HH);
  const s = SHOTS().find(([a, b]) => t >= a && t < b);
  if (s) {
    const [a, , k, bl, c0] = s, u = t - a, punch = 1 + .08 * (1 - P(t, a, .35, E.oQ)), clip = c0 !== undefined && CLIP[k];
    let im = PH[k]; if (clip) { const f = frame(CLIP[k], c0 + u); if (f.complete && f.naturalWidth) im = f; else pend = f; }
    const sc = (clip ? 1 : 1.02 + .05 * clamp(u / 9)) * punch, w = FW * sc, h = HH * sc;
    const blur = bl === undefined ? 0 : bl < 0 ? 1 : P(t, bl, .5, E.ioC);
    c.save(); const fl = []; if (DULL[k]) fl.push('saturate(.5) sepia(.22) contrast(1.06)'); if (blur > 0) fl.push(`blur(${blur * 22}px) brightness(${1 - blur * .45})`); if (fl.length) c.filter = fl.join(' ');
    c.drawImage(im, (FW - w) / 2, (HH - h) / 2 - (sc - 1) * HH * .1, w, h); c.restore();
    const g = c.createLinearGradient(0, 900, 0, HH); g.addColorStop(0, 'rgba(8,5,3,0)'); g.addColorStop(.5, 'rgba(8,5,3,.6)'); g.addColorStop(1, 'rgba(8,5,3,.92)'); c.fillStyle = g; c.fillRect(0, 900, FW, HH - 900);
    const tg = c.createLinearGradient(0, 0, 0, 300); tg.addColorStop(0, 'rgba(8,5,3,.5)'); tg.addColorStop(1, 'rgba(8,5,3,0)'); c.fillStyle = tg; c.fillRect(0, 0, FW, 300);
  }
  // « Avec OJA, c'est fini »: dark orange stage with rays
  const r = P(t, B('fini') - .15, .3) * (1 - P(t, B('client') - .25, .25));
  if (r > 0) { c.save(); c.globalAlpha = r; const g = c.createRadialGradient(540, 820, 0, 540, 820, 1300); g.addColorStop(0, '#5a2200'); g.addColorStop(.6, '#1a0700'); g.addColorStop(1, '#080302'); c.fillStyle = g; c.fillRect(0, 0, FW, HH);
    c.globalCompositeOperation = 'lighter'; c.translate(540, 820);
    for (let k = 0; k < 16; k++) { c.rotate(Math.PI * 2 / 16); const gg = c.createLinearGradient(0, 0, 1400, 0); gg.addColorStop(0, 'rgba(255,190,120,.28)'); gg.addColorStop(1, 'rgba(255,107,0,0)'); c.save(); c.rotate(t * .1); c.fillStyle = gg; c.beginPath(); c.moveTo(0, 0); c.lineTo(1400, -46); c.lineTo(1400, 46); c.closePath(); c.fill(); c.restore(); }
    c.restore(); }
}
function cutFlash(t) {
  let f = 0; for (const a of CUTS()) f = Math.max(f, .55 * (1 - clamp((t - a) / .18)) * (t >= a ? 1 : 0));
  O('flash', f);
}

/* ---------- the seller's part ---------- */
let capLast = -1;
function captions(t) {
  const cs = CAPS(), i = cs.findIndex(([a, b]) => t >= a - .05 && t < b - .05), e = el('cap');
  e.style.visibility = i < 0 ? 'hidden' : 'visible'; if (i < 0) return;
  e.style.top = (t < A('mais') - .1 ? 190 : 1270) + 'px';   // during the live clip: above her head, clear of its comments
  if (i !== capLast) { el('cap1').textContent = cs[i][2]; el('cap2').textContent = cs[i][3]; capLast = i; }
  const p = P(t, cs[i][0] - .05, .22, E.oB); e.style.transform = `scale(${lerp(.82, 1, p)})`; e.style.opacity = clamp(p * 2);
}
function live(t) {
  const end = A('mais') - .1, on = t < end && !CLIP.live; el('lv').style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  el('lvdot').style.opacity = .3 + .7 * (Math.sin(t * 6) > 0 ? 1 : 0);
  const shown = COMS.filter(([a]) => t >= a).length;
  COMS.forEach(([a], i) => { const e = el('cm' + i); if (t < a) { e.style.opacity = 0; return; }
    const pos = shown - 1 - i, p = P(t, a, .3, E.oQ), y = 1760 - 112 * pos - (1 - p) * -40; e.style.top = y - 56 + 'px';
    e.style.opacity = clamp(p * 1.5) * (pos > 2 ? 0 : pos > 1 ? .55 : 1) * (1 - P(t, end - .3, .3)); });
  HEARTS.forEach(([a, dx, , s], i) => { const e = el('hz' + i), u = (t - a) / 2.2; if (u < 0 || u > 1) { e.style.opacity = 0; return; }
    e.style.opacity = Math.sin(u * Math.PI) * .95; e.style.transform = `translate(${930 + dx + Math.sin(u * 9 + i) * 26}px,${1760 - u * 620}px) scale(${s * lerp(.6, 1.1, clamp(u * 3))})`; });
}
function pop(id, t, a, b, dy = 80) {
  const e = el(id), on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return 0;
  const p = P(t, a, .5, E.oB), q = P(t, b - .3, .3, E.iC); e.style.opacity = clamp(p * 1.5) * (1 - q); e.style.transform = `translateY(${(1 - p) * dy}px) scale(${lerp(.9, 1, p) * lerp(1, .95, q)})`;
  return p;
}
function fake(t) {
  const b = A('autre') - .15, p = pop('sc', t, A('client') + .2, b);
  if (p) { const sh = t >= A('fausse') - .05 ? Math.sin((t - A('fausse')) * 70) * 14 * (1 - P(t, A('fausse'), .35)) : 0;
    el('sc').style.transform += ` rotate(-3deg) translateX(${sh}px)`; }
  pop('scr', t, A('rien') - .05, b, 40);
  const s = el('stamp'), a = A('fausse') - .05, on = t >= a && t < b; s.style.visibility = on ? 'visible' : 'hidden';
  if (on) { const k = P(t, a, .28, E.oQ); s.style.transform = `rotate(-12deg) scale(${lerp(2.2, 1, k)})`; s.style.opacity = clamp(k * 2) * (1 - P(t, b - .3, .3)); }
}
function call(t) {
  pop('bub', t, A('autre') + .25, A('arrive') - .15);
  const p = pop('call', t, A('arrive') + .1, A('fatig') - .15); if (!p) return;
  const off = t >= A('decroche');
  el('calls').textContent = off ? 'Ne répond pas' : 'Appel en cours…'; el('calls').style.color = off ? '#FDA29B' : '#98A2B3';
  const r = el('callr'); r.style.borderColor = off ? RD : GR; r.style.transform = `scale(${off ? 1 : 1 + .14 * Math.abs(Math.sin(t * 4))})`; r.style.opacity = off ? 1 : .5 + .5 * Math.abs(Math.cos(t * 4));
}

/* ---------- the OJA part ---------- */
function reveal(t) {
  const e = el('rev'), a = B('fini') - .1, b = B('client') - .15, on = t >= a && t < b; e.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  const p = P(t, a, .5, E.oB), q = P(t, b - .25, .25, E.iC); el('revl').style.transform = `scale(${lerp(.4, 1, p)})`; el('revl').style.opacity = clamp(p * 1.5) * (1 - q);
  [...e.querySelectorAll('.ln')].forEach((l, i) => { const k = P(t, a + .25 + i * .18, .45, E.oQ); l.style.transform = `translateY(${(1 - k) * 110 - q * 110}%)`; });
}
function checkout(t) {
  const p = pop('ck', t, B('momo') - .6, B('sans') - .1); if (!p) return;
  const tp = P(t, B('momo') + .35, .45, E.oQ), tap = el('cktap'); tap.style.opacity = tp > 0 && tp < 1 ? 1 - tp : 0; tap.style.transform = `scale(${lerp(.4, 1.6, tp)})`;
  el('ckok').style.clipPath = `circle(${P(t, B('momo') + .5, .45, E.oQ) * 80}% at 50% 50%)`;
}
function merchant(t) {
  const p = pop('mc', t, B('sans') - .05, B('livreur') - .1); if (!p) return;
  const k = P(t, B('sans') + .6, .4, E.oB), n = t >= B('sans') + .6;
  const box = el('mk0'); box.querySelector('.n').textContent = n ? '1' : '0'; box.style.borderColor = n ? '#F79009' : '#2f3648'; box.style.transform = `scale(${n ? lerp(1.1, 1, k) : 1})`;
  const r = el('mrow'); r.style.opacity = clamp(k * 1.5); r.style.transform = `translateY(${(1 - k) * 40}px)`;
}
function revenus(t) {
  const p = pop('rv', t, B('argent') + .1, B('vend') - .1); if (!p) return;
  const tp = P(t, B('retires') + .3, .45, E.oQ), tap = el('rvtap'); tap.style.opacity = tp > 0 && tp < 1 ? 1 - tp : 0; tap.style.transform = `scale(${lerp(.4, 1.6, tp)})`;
  el('rvb').style.transform = `scale(${t >= B('retires') + .3 && t < B('retires') + .6 ? .96 : 1})`;
}
function finale(t) {
  const a = B('tranq') - .2, e = el('cta'), on = t >= a; e.style.visibility = on ? 'visible' : 'hidden';
  if (on) { const p = P(t, a, .5, E.oQ); e.style.opacity = p; e.style.transform = `translateY(${(1 - p) * 40}px)`; }
  el('fm').style.opacity = P(t, B('tranq') + 1.2, .6) * .9;
}

/* ---------- master ---------- */
window.renderAt = function (t) {
  lastT = t; photos(t); cutFlash(t);
  // the seller: her live, then the frauds she denounces
  live(t); captions(t); fake(t); call(t);
  // with OJA
  reveal(t);
  el('bug').style.opacity = P(t, B('client'), .5) * (1 - P(t, B('vend') - .4, .3));
  show('T1', t, B('client') - .1, B('sans') - .1); checkout(t);
  show('T2', t, B('sans'), B('capt') - .1); merchant(t); show('T3', t, B('capt'), B('livreur') - .15);
  pop('paid', t, B('livreur') + .5, B('argent') - .1, 40); show('T4', t, B('livreur'), B('argent') - .15);
  revenus(t); show('T5', t, B('argent'), B('vend') - .15);
  show('T6', t, B('vend'), DUR2 + 1); finale(t);
  O('fade', Math.max(1 - P(t, 0, .3, E.lin), P(t, DUR2 - .6, .6, E.lin)));
};
