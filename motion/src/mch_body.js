/* ============================================================
   OJA Marchand — « Tu cuisines, OJA livre », 9:16, 29.5 s, voice: Isac (assets/mch/voix_marchand.mp3, from 0.4 s).
   Real OJA Marchand screens (dashboard, catalogue, orders) without any amount, the dish, the OJA rider,
   the four delivery vehicles on the words of the voice, MoMo / cash, local-name search, logo.
   ============================================================ */
const CX = 540, CY = 960, PER = 2600, VO = 0.4;
const PRE = [];
const imgL = src => { const i = new Image(); i.src = src; PRE.push(i); return i; };
const IMG = { moto: imgL('assets/moto.png') };
// voice timings (seconds in the voice file, from its alignment)
const W_ = { cuis: 0.0, livre: 1.12, resto: 2.75, maquis: 3.32, bout: 4.04, marchand: 4.85, prod: 7.12, photo: 8.72, ouvert: 10.21, cmd: 11.07, acc: 12.44,
  livreur: 13.08, velo: 15.2, moto: 15.88, tri: 16.56, voit: 17.36, momo: 19.04, esp: 19.8, trouv: 20.52, endA: 23.07, endB: 24.24 };
const V = k => W_[k] + VO;

/* ---------- OJA Marchand screens, as in the app, without amounts ---------- */
const PHOTO2 = { poulet: 'assets/mkp/food_poulet.jpg', shawarma: 'assets/food_shawarma.jpg', croissant: 'assets/food_croissant.jpg' };
const ph = (k, s, r = 16, bg = '#FFE7D1') => PHOTO2[k] ? `<div style="width:${s}px;height:${s}px;border-radius:${r}px;overflow:hidden;flex:none"><img src="${PHOTO2[k]}" style="width:100%;height:100%;object-fit:cover"></div>`
  : `<div class="emo" style="width:${s}px;height:${s}px;border-radius:${r}px;background:${bg};font-size:${s * .55}px;flex:none">${k}</div>`;
function scrDash2(p) {
  return `${sbar()}
<div class="abs" style="left:20px;top:58px"><div style="font:500 14px Inter;color:#777">Bonjour 👋</div><div style="font:800 24px Poppins">Maquis Chez Tanti</div></div>
<div id="${p}pill" class="abs" style="right:18px;top:66px;padding:8px 14px;border-radius:16px;font:800 13px Inter;display:flex;align-items:center;gap:6px"><span id="${p}dot" style="width:8px;height:8px;border-radius:50%"></span><span id="${p}pt">Fermé</span></div>
<div id="${p}big" class="abs" style="left:16px;right:16px;top:124px;height:170px;border-radius:24px;padding:20px 22px;color:#fff">
<div style="font:600 15px Inter;opacity:.9">Votre boutique est</div><div id="${p}st" style="font:900 40px Poppins;margin-top:2px">fermée</div>
<div id="${p}sw" class="abs" style="right:22px;top:58px;width:92px;height:52px;border-radius:26px;background:rgba(255,255,255,.3)"><div id="${p}knob" class="abs" style="left:5px;top:5px;width:42px;height:42px;border-radius:50%;background:#fff;box-shadow:0 4px 10px rgba(0,0,0,.2)"></div></div>
<div style="font:600 13px Inter;opacity:.9;margin-top:14px">Un bouton pour ouvrir ou fermer.</div></div>
<div class="abs" style="left:16px;top:308px;width:182px;height:104px;border-radius:20px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.06);padding:16px"><div style="width:40px;height:40px;border-radius:12px;background:#FFE9DA;display:grid;place-items:center">${ic('box', 20, OR, 2.2)}</div><div style="font:800 15px Inter;margin-top:8px">Catalogue</div></div>
<div class="abs" style="left:210px;top:308px;width:182px;height:104px;border-radius:20px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.06);padding:16px"><div style="width:40px;height:40px;border-radius:12px;background:#E8F1FF;display:grid;place-items:center">${ic('clip', 20, '#1D63D8', 2.2)}</div><div style="font:800 15px Inter;margin-top:8px">Commandes</div></div>
<div class="abs" style="left:16px;right:16px;top:428px">${[['poulet', 'Poulet braisé'], ['shawarma', 'Shawarma poulet'], ['croissant', 'Croissants x3']].map(([k, n]) => `<div class="a-card" style="height:84px;margin-bottom:10px;display:flex;align-items:center;gap:14px;padding:0 14px">${ph(k, 58, 14)}<div style="flex:1;font:800 16px Poppins">${n}</div><span style="padding:4px 10px;border-radius:10px;background:#E7F6EF;color:#0B7A5E;font:700 12px Inter">Disponible</span></div>`).join('')}</div>
${NAVM(p, 0)}${tapEl(p)}`;
}
function scrForm(p) {
  return `${sbar()}
<div class="abs" style="left:20px;top:58px"><div style="font:800 24px Poppins">Catalogue boutique</div><div style="font:500 13px Inter;color:#777">Produits, photos et disponibilité</div></div>
<div class="abs" style="left:16px;right:16px;top:130px">${[['shawarma', 'Shawarma poulet'], ['croissant', 'Croissants x3'], ['🥤', 'Jus de bissap']].map(([k, n]) => `<div class="a-card" style="height:96px;margin-bottom:12px;display:flex;align-items:center;gap:14px;padding:0 14px">${ph(k, 70, 16)}<div style="flex:1;font:800 16px Poppins">${n}</div><div style="width:46px;height:28px;border-radius:14px;background:#12B76A;position:relative"><div style="position:absolute;right:3px;top:3px;width:22px;height:22px;border-radius:50%;background:#fff"></div></div></div>`).join('')}</div>
<div id="${p}sheet" class="abs" style="left:0;right:0;top:230px;height:648px;border-radius:30px 30px 0 0;background:#fff;box-shadow:0 -20px 50px rgba(0,0,0,.2);padding:22px 20px;z-index:8">
<div style="width:60px;height:5px;border-radius:3px;background:#ddd;margin:0 auto 16px"></div><div style="font:800 22px Poppins">Nouveau produit</div>
<div style="display:flex;gap:12px;margin-top:18px"><div style="position:relative;width:150px;height:150px;border-radius:22px;border:2px dashed #ccc;display:grid;place-items:center;overflow:hidden">${ic('camera', 34, '#aaa', 2)}<img id="${p}img" src="assets/mkp/food_poulet.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0"></div>
<div style="flex:1;font:500 14px Inter;color:#777;padding-top:10px">Ajoutez une photo de votre produit.</div></div>
<div style="font:700 13px Inter;color:#777;margin-top:20px">Nom</div><div class="a-card" style="height:56px;margin-top:6px;display:flex;align-items:center;padding:0 14px;font:700 18px Inter;border:1.5px solid #eee"><span id="${p}typ"></span><span id="${p}cur" style="display:inline-block;width:3px;height:24px;background:${OR};margin-left:2px"></span></div>
<div style="font:700 13px Inter;color:#777;margin-top:16px">Catégorie</div><div class="a-card" style="height:56px;margin-top:6px;display:flex;align-items:center;padding:0 14px;font:600 17px Inter;border:1.5px solid #eee">Plats</div>
<div id="${p}save" style="position:relative;margin-top:26px;height:62px;border-radius:20px;background:${INK};color:#fff;display:grid;place-items:center;font:800 18px Inter;overflow:hidden">Enregistrer<div id="${p}ok" class="abs" style="inset:0;background:#12B76A;display:flex;align-items:center;justify-content:center;gap:8px;clip-path:circle(0% at 50% 50%)">${ic('check', 22, '#fff', 3)}Produit ajouté</div></div></div>
${NAVM(p, 4)}${tapEl(p)}`;
}
const STEPS2 = ['Reçue', 'Acceptée', 'En préparation', 'Prête', 'Livrée'];
function scrOrder2(p) {
  return `${sbar()}
<div class="abs" style="left:20px;top:58px"><div style="font:800 24px Poppins">Nouvelles commandes</div><div style="font:500 13px Inter;color:#777">Acceptez rapidement les demandes entrantes</div></div>
<div class="abs" style="left:14px;right:14px;top:130px;border-radius:26px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:18px">
<div style="display:flex;align-items:center;gap:8px"><b style="font:900 20px Inter">#3C24A4</b><span style="padding:4px 10px;border-radius:12px;background:#E8F1FF;color:#1D63D8;font:700 12px Inter">🛵 Livraison</span><span style="padding:4px 10px;border-radius:12px;border:1.5px solid #12B76A;background:#E7F6EF;color:#0B7A5E;font:700 12px Inter">Payée ✓</span></div>
<div style="margin-top:14px;border-radius:18px;background:#FFF1E6;padding:12px 14px;font:600 15px Inter">
<div style="display:flex;align-items:center;gap:12px">${ph('poulet', 46, 12)}<span>2× Poulet braisé</span></div><div style="display:flex;align-items:center;gap:12px;margin-top:10px">${ph('🥤', 46, 12)}<span>1× Jus de bissap</span></div></div>
<div id="${p}btns" style="display:flex;gap:10px;margin-top:14px"><div style="flex:1;height:56px;border-radius:18px;border:2px solid #E8112D;color:#E8112D;display:grid;place-items:center;font:800 16px Inter">Refuser</div><div id="${p}acc" style="flex:1;height:56px;border-radius:18px;background:#12B76A;color:#fff;display:grid;place-items:center;font:800 16px Inter">Accepter</div></div>
<div id="${p}prog" class="abs" style="left:18px;right:18px;bottom:18px;height:56px;border-radius:18px;background:${INK};color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font:800 16px Inter;opacity:0">${ic('timer', 20, OR, 2.4)}<span>En préparation</span></div></div>
<div class="abs" style="left:24px;right:20px;top:500px">${STEPS2.map((s, i) => `<div style="display:flex;align-items:center;gap:12px;height:50px"><div id="${p}dot${i}" style="width:32px;height:32px;border-radius:50%;background:#E5E7EB;display:grid;place-items:center">${ic('check', 17, '#fff', 3)}</div><span id="${p}lb${i}" style="font:700 16px Inter;color:#999">${s}</span></div>`).join('')}</div>
${NAVM(p, 1)}${tapEl(p)}`;
}

/* ---------- layout ---------- */
const scr = (id, inner) => `<div id="${id}" class="abs" style="left:0;top:0;width:408px;height:878px;background:#F6F6F6;overflow:hidden">${inner}</div>`;
const head = (id, html, top = 210, size = 92) => `<div id="${id}" class="abs hd" style="left:60px;right:60px;top:${top}px;text-align:center;font:800 ${size}px Poppins;letter-spacing:-.025em;line-height:1.08">${html}</div>`;
const store = (id, x, icn, sm, big) => `<div id="${id}" class="abs" style="left:${x}px;top:1430px;width:400px;height:120px;border-radius:30px;background:#141414;border:2px solid #333;display:flex;align-items:center;gap:20px;padding:0 30px;color:#fff">${ic(icn, 54, '#fff', 1.8)}<div><div style="font:500 22px Inter;opacity:.75">${sm}</div><div style="font:700 40px Poppins;line-height:1.1">${big}</div></div></div>`;
const CANV = id => `<canvas id="${id}" class="lay" width="1080" height="1920"></canvas>`;
const CARDS = [['restaurant', 'Restaurant'], ['maquis', 'Maquis'], ['boutique', 'Boutique']];
const VEH = [['bike', 'Vélo'], ['assets/moto.png', 'Moto'], ['assets/tricycle.png', 'Tricycle'], ['assets/car.png', 'Voiture']];
H += `<div id="bg" class="lay" style="background:radial-gradient(ellipse 80% 55% at 50% 46%,#6a3110 0%,#33170a 38%,#120905 70%,#050302 100%)"></div>
<div id="glow" class="abs" style="left:-260px;top:300px;width:1600px;height:1500px;background:radial-gradient(circle,rgba(255,107,0,.42),rgba(255,107,0,0) 58%)"></div>
${CANV('rbb')}
<div id="s1" class="lay">
<img id="s1plat" src="assets/cs/obj_plat.png" class="abs" style="left:110px;top:560px;width:860px;filter:drop-shadow(0 60px 50px rgba(0,0,0,.6))">
<img id="s1moto" src="assets/moto.png" class="abs" style="left:90px;top:1010px;width:900px">
</div>
<div id="s2" class="lay">${CARDS.map(([k, n], i) => `<div id="cd${i}" class="abs" style="left:375px;top:620px;width:330px;height:412px;border-radius:34px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.5);border:3px solid rgba(255,255,255,.9)"><img src="assets/mch/card_${k}.jpg" style="width:100%;height:100%;object-fit:cover"><div class="abs" style="left:0;right:0;bottom:0;padding:60px 22px 18px;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.75));font:800 34px Poppins;color:#fff">${n}</div></div>`).join('')}</div>
<div id="sA" class="lay" style="perspective:${PER}px;perspective-origin:${CX}px ${CY}px">
<div id="ph" class="ip" style="left:${CX - 215}px;top:${CY - 450}px"><div class="scr">${scr('sD', scrDash2('d'))}${scr('sF', scrForm('f'))}${scr('sO', scrOrder2('o'))}<div class="isl"></div>
<div id="phsh" class="abs" style="inset:0;z-index:19;background:linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.28) 48%,rgba(255,255,255,0) 56%);background-size:300% 100%;pointer-events:none"></div></div></div></div>
<img id="s4moto" src="assets/moto.png" class="abs" style="left:420px;top:880px;width:700px">
<div id="veh" class="abs" style="left:40px;right:40px;top:1480px;display:flex;justify-content:space-between">${VEH.map(([s, n], i) => `<div id="vh${i}" style="width:230px;display:flex;flex-direction:column;align-items:center;gap:12px"><div style="width:190px;height:190px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 20px 50px rgba(0,0,0,.4);overflow:hidden">${s.startsWith('assets') ? `<img src="${s}" style="width:170px">` : ic(s, 100, OR, 2)}</div><div style="font:800 34px Poppins;color:#fff">${n}</div></div>`).join('')}</div>
<div id="s5" class="lay">
<div id="pay0" class="abs" style="left:90px;top:560px;width:420px;height:300px;border-radius:44px;background:#FFCC00;color:#111;padding:40px 36px;box-shadow:0 40px 80px rgba(0,0,0,.45)"><div style="width:96px;height:96px;border-radius:28px;background:rgba(0,0,0,.08);display:grid;place-items:center">${ic('phone', 54, '#111', 2.2)}</div><div style="font:900 56px Poppins;margin-top:28px;line-height:1">MoMo</div><div style="font:600 26px Inter;margin-top:8px">MTN Mobile Money</div></div>
<div id="pay1" class="abs" style="left:570px;top:560px;width:420px;height:300px;border-radius:44px;background:#12B76A;color:#fff;padding:40px 36px;box-shadow:0 40px 80px rgba(0,0,0,.45)"><div style="width:96px;height:96px;border-radius:28px;background:rgba(255,255,255,.18);display:grid;place-items:center">${ic('wallet', 54, '#fff', 2.2)}</div><div style="font:900 56px Poppins;margin-top:28px;line-height:1">Espèces</div><div style="font:600 26px Inter;margin-top:8px">à la livraison</div></div>
<div id="srch" class="abs" style="left:70px;right:70px;top:1000px;height:124px;border-radius:62px;background:#fff;color:#111;display:flex;align-items:center;gap:22px;padding:0 40px;box-shadow:0 30px 70px rgba(0,0,0,.45);border:4px solid ${OR}">${ic('search', 46, '#111', 2.6)}<span id="qtxt" style="font:600 38px Inter;white-space:nowrap"></span><span id="qcur" style="display:inline-block;width:4px;height:46px;background:${OR}"></span></div>
<div id="res" class="abs" style="left:70px;right:70px;top:1170px;height:200px;border-radius:40px;background:#fff;color:#111;display:flex;align-items:center;gap:26px;padding:0 30px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><div style="width:140px;height:140px;border-radius:28px;overflow:hidden;flex:none"><img src="assets/mkp/food_poulet.jpg" style="width:100%;height:100%;object-fit:cover"></div>
<div style="flex:1"><div style="font:800 42px Poppins">Maquis Chez Tanti</div><div style="display:flex;gap:12px;margin-top:10px"><span style="padding:6px 16px;border-radius:16px;background:#E7F6EF;color:#0B7A5E;font:800 24px Inter">Ouvert</span><span style="padding:6px 16px;border-radius:16px;background:#FFF1E6;color:#C2410C;font:700 24px Inter">🛵 Livraison OJA</span></div></div></div></div>
${CANV('fx')}
<div id="notif" class="abs" style="left:36px;right:36px;top:70px;padding:28px 30px;border-radius:44px;background:rgba(40,36,34,.82);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);border:1px solid rgba(255,255,255,.14);display:flex;gap:24px;align-items:center;box-shadow:0 30px 60px rgba(0,0,0,.45);z-index:30">
<div style="width:96px;height:96px;border-radius:24px;background:#fff;display:grid;place-items:center;flex:none"><img src="assets/mk_logo.png" style="width:84px"></div>
<div style="flex:1"><div style="display:flex;justify-content:space-between;font:600 26px Inter;color:#C9C4C0"><span style="font-weight:800;color:#fff">OJA Marchand</span><span>maintenant</span></div>
<div style="font:800 36px Inter;margin-top:4px">Nouvelle commande</div><div style="font:500 28px Inter;color:#E2DDD8;margin-top:2px">2 articles · Livraison OJA</div></div></div>
${head('h1', 'Tu cuisines&nbsp;?', 230, 128)}${head('h2', 'OJA <span style="color:#FF6B00">livre.</span>', 230, 128)}
${head('h3', 'Ton commerce<br>sur <span style="color:#FF6B00">OJA Marchand</span>', 150, 84)}
${head('h4', 'Ajoute tes produits', 150, 84)}${head('h5', 'Appuie sur <span style="color:#12B76A">« Ouvert »</span>', 150, 84)}
${head('h6', 'Une commande&nbsp;?<br><span style="color:#12B76A">Accepte.</span>', 330, 84)}${head('h7', 'Un livreur OJA<br><span style="color:#FF6B00">vient la chercher</span>', 150, 84)}
${head('h8', 'Tes clients paient', 330, 84)}${head('h9', 'Ils te trouvent,<br><span style="color:#FF6B00">même sans ton nom</span>', 700, 76)}
<div id="sEnd" class="lay">
<img id="elogo" src="assets/mk_logo.png" class="abs" style="left:360px;top:420px;width:360px;height:360px;filter:drop-shadow(0 0 50px rgba(255,107,0,.55))">
<div id="eword" class="abs" style="left:0;right:0;top:830px;text-align:center;font:900 124px Poppins;letter-spacing:-.03em;line-height:1"><span>OJA</span> <span style="color:#FF6B00">Marchand</span></div>
<div id="eslo" class="abs" style="left:0;right:0;top:1030px;text-align:center;font:800 64px Poppins;letter-spacing:-.02em">Tu cuisines. <span style="color:#FF6B00">OJA livre.</span></div>
<div id="ecta" class="abs" style="left:0;right:0;top:1320px;text-align:center;font:600 42px Inter;color:#E8E2DC">Télécharge OJA Marchand</div>
${store('est0', 120, 'phone', 'Télécharger sur', 'App Store')}${store('est1', 560, 'play', 'Disponible sur', 'Google Play')}
<div id="emen" class="abs" style="left:60px;right:60px;top:1640px;text-align:center;font:500 26px Inter;color:#A39C96">Boutique en ligne après validation du dossier par l'équipe OJA.</div></div>
<div id="flash" class="lay" style="background:radial-gradient(circle at 50% 50%,#fff3e0,rgba(255,140,40,.85) 40%,rgba(255,107,0,0) 75%);opacity:0;z-index:40"></div>
<canvas id="grain" width="1280" height="2120"></canvas><div id="vig"></div><div id="fade"></div>`;
stage.innerHTML = H;
(() => { const g = el('grain').getContext('2d'), d = g.createImageData(1280, 2120), r = rng(5);
  for (let i = 0; i < d.data.length; i += 4) { const v = r() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); })();

/* ---------- light ribbon (same as the Market spot) ---------- */
const ORG = '255,107,0';
const RBP = [[7, .045, '255,107,0'], [3.4, .12, '255,120,20'], [1.7, .42, '255,168,64'], [.62, .95, '255,242,220']];
function ribbon(cf, cb, pts, w, chunk = 5) {
  for (const c of [cf, cb]) if (c) { c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'butt'; c.lineJoin = 'round'; }
  for (const [m, al, col] of RBP) for (let i = 0; i < pts.length - 1; i += chunk) {
    const j = Math.min(pts.length - 1, i + chunk); let a = 0, z = 0;
    for (let k = i; k <= j; k++) { a += pts[k][2]; z += pts[k][3] || 0; }
    a = a / (j - i + 1) * al; if (a < .003) continue;
    const c = cb && z <= 0 ? cb : cf; if (!c) continue;
    c.lineWidth = w * m; c.strokeStyle = `rgba(${col},${a})`; c.beginPath(); c.moveTo(pts[i][0], pts[i][1]);
    for (let k = i + 1; k <= j; k++) c.lineTo(pts[k][0], pts[k][1]);
    c.stroke();
  }
  for (const c of [cf, cb]) if (c) c.restore();
}
function flare(c, x, y, r, a, col = ORG) {
  if (a <= .002) return;
  c.save(); c.globalCompositeOperation = 'lighter';
  const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(255,248,235,${a})`); g.addColorStop(.18, `rgba(255,190,110,${a * .7})`); g.addColorStop(.5, `rgba(${col},${a * .22})`); g.addColorStop(1, `rgba(${col},0)`);
  c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); c.restore();
}
function trail(fn, h, tail, n, fade = 1, pw = 1.6) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const u = h - tail + tail * i / n; if (u < 0 || u > 1) continue; const q = fn(u); pts.push([q[0], q[1], Math.pow(i / n, pw) * fade, q[2] || 0]); }
  return pts;
}

/* ---------- helpers ---------- */
function phoneT(o) {
  el('ph').style.transform = `translate3d(${o.x || 0}px,${o.y || 0}px,${o.z || 0}px) rotateX(${o.rx || 0}deg) rotateY(${o.ry || 0}deg) scale3d(${o.s},${o.s},${o.s})`;
  const g = o.g || 0;
  el('ph').style.boxShadow = `0 0 0 2px #0c0c0e inset,0 0 0 ${2 + 2 * g}px rgba(255,150,60,${.9 * g}),0 0 ${70 * g}px rgba(255,107,0,${.6 * g}),0 80px 140px rgba(0,0,0,.5)`;
}
const pose = (s, cy, fy, x = 0) => ({ s, x, y: (cy - CY) + (450 - fy) * s });
function hd(id, t, a, b) {          // headline in/out
  const p = P(t, a, .45, E.oQ), q = P(t, b - .3, .3, E.iC), e = el(id);
  e.style.opacity = p * (1 - q); e.style.transform = `translateY(${(1 - p) * 40 - q * 20}px)`; e.style.filter = `blur(${(1 - p) * 14 + q * 10}px)`;
  e.style.visibility = t >= a && t < b ? 'visible' : 'hidden';
}
function tapAt(id, t, a, x, y) { const q = (t - a) / .45; if (q > 0 && q < 1) { el(id).style.transform = `translate(${x}px,${y}px) scale(${.5 + q * 1.3})`; O(id, 1 - q); } else O(id, 0); }
const pop = (t, a, d = .5) => P(t, a, d, E.oB);
// centre of an element in screen coordinates (408 × 878), walking up the offsetParent chain to the screen
function posIn(id) { let e = el(id), x = e.offsetWidth / 2, y = e.offsetHeight / 2; while (e && !/^s[DFO]$/.test(e.id)) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; } return [x, y]; }

/* ---------- scenes ---------- */
function scene1(t, cf, cb) {   // 0 – 3.15: « Tu cuisines ? » → « OJA livre. »
  const k = P(t, .1, .9, E.oQ), out = P(t, 1.45, .4, E.iC);
  el('s1plat').style.transform = `translateY(${(1 - k) * 60 + Math.sin(t * 2) * 8 - out * 120}px) scale(${lerp(1.15, 1, k) * (1 - .35 * out)})`;
  el('s1plat').style.opacity = 1 - out; el('s1plat').style.filter = `drop-shadow(0 60px 50px rgba(0,0,0,.6)) blur(${(1 - k) * 10 + out * 8}px)`;
  const mx = KF(t, [[1.45, 1300], [2.0, 0], [3.15, -40]], E.oQ), mv = Math.abs(mx - KF(t - 1 / 48, [[1.45, 1300], [2.0, 0], [3.15, -40]], E.oQ)) * 48;
  el('s1moto').style.transform = `translateX(${mx}px) scale(${1 + .04 * Math.sin(t * 9) * (t > 2 ? 0 : 1)})`; el('s1moto').style.opacity = t > 1.45 ? 1 : 0;
  el('s1moto').style.filter = `blur(${clamp(mv / 1500, 0, 1) * 6}px)`;
  if (t > 1.45 && t < 3.15) {
    const tr = []; for (let i = 0; i <= 40; i++) tr.push([mx + 90 + 600 + i * 26, 1010 + 170 + Math.sin(i * .25) * 5, Math.pow(1 - i / 40, 1.5) * (1 - P(t, 2.6, .5)), 1]);
    ribbon(cf, null, tr.reverse(), 9);
  }
}
const CPOS = [[-345, -40, -8], [0, 30, 0], [345, -40, 8]];
function scene2(t) {           // 3.15 – 7.5: cards, then the phone
  CARDS.forEach((_, i) => {
    const a = [V('resto'), V('maquis'), V('bout')][i] - .1, p = pop(t, a, .55), go = P(t, V('marchand') - .1, .6, E.iC);
    const [dx, dy, r] = CPOS[i];
    el('cd' + i).style.transform = `translate(${dx * p}px,${dy * p - go * 560 + (1 - p) * 300}px) rotate(${r * p}deg) scale(${lerp(.6, 1, p) * (1 - .3 * go)})`;
    el('cd' + i).style.opacity = clamp(p * 1.4) * (1 - go);
  });
}
function sceneA(t, cf) {        // phone: 5.0 – 18.6
  let o;
  const enter = P(t, V('marchand') - .15, .8, E.oQ);
  if (t < V('prod') - .1) { o = pose(1.2, 1200, 450); o.y += (1 - enter) * 1300; o.ry = lerp(-25, -6, enter); o.rx = 6 * (1 - enter); }
  else if (t < V('ouvert') - .55) { const k = P(t, V('prod') - .1, .6, E.ioC); const a = pose(1.2, 1200, 450), b = pose(1.32, 1210, 520); o = { s: lerp(a.s, b.s, k), x: 0, y: lerp(a.y, b.y, k), ry: lerp(-6, 0, k) }; }
  else if (t < V('cmd') - .05) { const k = P(t, V('ouvert') - .55, .5, E.ioC); const a = pose(1.32, 1210, 520), b = pose(1.55, 1150, 250); o = { s: lerp(a.s, b.s, k), x: 0, y: lerp(a.y, b.y, k), ry: 0 }; }
  else { const k = P(t, V('cmd') - .05, .55, E.ioC), sh = P(t, V('livreur') - .1, .7, E.ioC); const a = pose(1.55, 1150, 250), b = pose(1.2, 1180, 450), c = pose(.78, 1000, 450, -250);
    o = { s: lerp(lerp(a.s, b.s, k), c.s, sh), x: lerp(0, c.x, sh), y: lerp(lerp(a.y, b.y, k), c.y, sh), ry: lerp(0, 14, sh) };
    const out = P(t, V('momo') - .6, .45, E.iC); o.y += out * 1500; }
  o.ry = (o.ry || 0) + Math.sin(t * 1.3) * 2; o.g = .35 + .25 * Math.sin(t * 2.4);
  phoneT(o);
  el('phsh').style.backgroundPosition = `${lerp(130, -30, (t * .5) % 1)}% 0`;
  // screens: dashboard → form → dashboard (open) → order
  const scr = t < V('prod') - .1 ? 'sD' : t < V('ouvert') - .5 ? 'sF' : t < V('cmd') + .05 ? 'sD' : 'sO';
  for (const s of ['sD', 'sF', 'sO']) O(s, s === scr ? 1 : 0);
  // form: sheet slides, name typed, photo, save
  const sh = P(t, V('prod') + .05, .45, E.oQ); el('fsheet').style.transform = `translateY(${(1 - sh) * 650}px)`;
  const q = 'Poulet braisé', n = Math.round(P(t, V('prod') + .45, .95, E.lin) * q.length);
  el('ftyp').textContent = q.slice(0, n); el('fcur').style.opacity = Math.floor(t * 3) % 2 ? 1 : .2;
  const im = P(t, V('photo') - .05, .3, E.oQ); el('fimg').style.opacity = im; el('fimg').style.transform = `scale(${lerp(1.3, 1, im)})`;
  tapAt('ftap', t, V('photo') + .45, ...posIn('fsave')); el('fok').style.clipPath = `circle(${P(t, V('photo') + .55, .3) * 75}% at 50% 50%)`;
  // open switch
  const on = P(t, V('ouvert') - .02, .3, E.oQ);
  el('dpill').style.background = on > .5 ? '#E7F6EF' : '#F1F1F1'; el('dpill').style.color = on > .5 ? '#0B7A5E' : '#777'; el('ddot').style.background = on > .5 ? '#12B76A' : '#aaa'; el('dpt').textContent = on > .5 ? 'Ouvert' : 'Fermé';
  el('dbig').style.background = on > .5 ? 'linear-gradient(135deg,#19C37D,#0B9A5E)' : 'linear-gradient(135deg,#8E8E93,#5E5E63)';
  el('dst').textContent = on > .5 ? 'ouverte' : 'fermée'; el('dknob').style.transform = `translateX(${on * 40}px)`;
  el('dbig').style.boxShadow = `0 0 0 ${4 * on * (1 - P(t, V('ouvert') + .6, .5))}px #12B76A`;
  tapAt('dtap', t, V('ouvert') - .08, ...posIn('dsw'));
  // order: accept → steps
  const ac = P(t, V('acc') + .05, .3); tapAt('otap', t, V('acc') - .05, ...posIn('oacc'));
  el('oacc').style.transform = `scale(${1 + .08 * Math.sin(Math.PI * P(t, V('acc'), .3, E.lin))})`;
  O('obtns', 1 - ac); O('oprog', ac);
  for (let i = 0; i < 5; i++) { const d = [V('cmd'), V('acc') + .1, V('acc') + .5, V('livreur') + 1.6, 99][i], on2 = t >= d;
    el('odot' + i).style.background = on2 ? '#12B76A' : '#E5E7EB'; el('olb' + i).style.color = on2 ? '#111' : '#999'; }
}
function scene4(t, cf) {        // rider + vehicles: 13.2 – 18.6
  const a = V('livreur') + .05, k = P(t, a, .8, E.oQ), out = P(t, V('momo') - .6, .45, E.iC);
  const mx = lerp(900, 0, k), mv = (lerp(900, 0, k) - lerp(900, 0, P(t - 1 / 48, a, .8, E.oQ))) * 48;
  el('s4moto').style.transform = `translateX(${mx + out * 900}px)`; el('s4moto').style.filter = `blur(${clamp(Math.abs(mv) / 1800, 0, 1) * 6}px) drop-shadow(0 30px 40px rgba(0,0,0,.5))`;
  O('s4moto', t > a && out < 1 ? 1 : 0);
  if (k > 0 && k < 1) { const tr = []; for (let i = 0; i <= 40; i++) tr.push([420 + mx + 470 + i * 24, 880 + 130, Math.pow(1 - i / 40, 1.5) * (1 - k * .6), 1]); ribbon(cf, null, tr.reverse(), 8); }
  [V('velo'), V('moto'), V('tri'), V('voit')].forEach((d, i) => { const p = pop(t, d - .08, .5); el('vh' + i).style.transform = `translateY(${(1 - p) * 120 + out * 500}px) scale(${lerp(.5, 1, p)})`; el('vh' + i).style.opacity = clamp(p * 1.5) * (1 - out); });
}
function scene5(t) {            // 18.6 – 23.45: MoMo / cash, search
  const up = P(t, V('trouv') - .2, .5, E.ioC), out = P(t, V('endA') - .35, .35, E.iC);
  [V('momo'), V('esp')].forEach((d, i) => { const p = pop(t, d - .1, .5); el('pay' + i).style.transform = `translateY(${(1 - p) * 200 - up * 330}px) scale(${lerp(.6, 1, p) * (1 - .35 * up)}) rotate(${(i ? 3 : -3) * p}deg)`; el('pay' + i).style.opacity = clamp(p * 1.4) * (1 - out); });
  const sp = P(t, V('trouv') - .1, .45, E.oQ); el('srch').style.transform = `translateY(${(1 - sp) * 200 + out * -100}px)`; el('srch').style.opacity = sp * (1 - out);
  const qs = 'maquis derrière la pharmacie', n = Math.round(P(t, V('trouv') + .2, 1.2, E.lin) * qs.length);
  el('qtxt').textContent = qs.slice(0, n); el('qcur').style.opacity = Math.floor(t * 3) % 2 ? 1 : .2;
  const rp = pop(t, V('trouv') + 1.5, .5); el('res').style.transform = `translateY(${(1 - rp) * 120 + out * -100}px) scale(${lerp(.8, 1, rp)})`; el('res').style.opacity = clamp(rp * 1.4) * (1 - out);
}
function sceneEnd(t, cf) {
  const h = P(t, V('endA') - .15, .55, E.ioC);
  const sm = u => [lerp(250, 830, u), 1000 + Math.sin(u * Math.PI) * 50 - u * 12, 1];
  const pts = trail(sm, h, h, 100, 1, .5); ribbon(cf, null, pts, 8);
  if (h > .97) { const e = sm(1); ribbon(cf, null, [[e[0] - 40, e[1] - 26, 1], [e[0], e[1], 1], [e[0] - 35, e[1] + 26, 1]], 8, 1); }
  const hd0 = pts[pts.length - 1]; if (hd0 && h < 1) flare(cf, hd0[0], hd0[1], 150, 1);
  const lp = P(t, V('endA') - .1, .6, E.oB);
  el('elogo').style.transform = `scale(${lerp(.55, 1, lp)})`; el('elogo').style.opacity = clamp(lp * 1.5); el('elogo').style.filter = `drop-shadow(0 0 50px rgba(255,107,0,.55)) blur(${(1 - clamp(lp)) * 14}px)`;
  el('eword').style.clipPath = `inset(-20% ${100 - P(t, V('endA'), .55, E.oQ) * 100}% -20% 0)`;
  const sp = P(t, V('endB'), .5, E.oQ); el('eslo').style.opacity = sp; el('eslo').style.transform = `translateY(${(1 - sp) * 30}px)`;
  const cp = P(t, 26.9, .5, E.oQ); el('ecta').style.opacity = cp; el('ecta').style.transform = `translateY(${(1 - cp) * 30}px)`;
  for (let i = 0; i < 2; i++) { const p = P(t, 27.1 + i * .12, .5, E.oB); el('est' + i).style.opacity = clamp(p); el('est' + i).style.transform = `translateY(${(1 - p) * 60}px)`; }
  O('emen', P(t, 27.4, .5));
}

/* ---------- master ---------- */
const DUR2 = 29.5;
const SPANS = { s1: [0, 3.15], s2: [3.0, 7.6], sA: [5.0, 18.9], s4moto: [13.3, 18.9], veh: [15.4, 18.9], s5: [19.0, 23.5], sEnd: [23.35, 29.5] };
const on = (k, t) => { const s = SPANS[k]; return t >= s[0] && t < s[1]; };
window.renderAt = function (t) {
  const cf = el('fx').getContext('2d'), cb = el('rbb').getContext('2d');
  cf.clearRect(0, 0, 1080, 1920); cb.clearRect(0, 0, 1080, 1920);
  for (const k in SPANS) el(k).style.display = on(k, t) ? 'block' : 'none';
  if (on('veh', t)) el('veh').style.display = 'flex';
  el('glow').style.opacity = .55 + .25 * Math.sin(t * 1.1);
  if (on('s1', t)) scene1(t, cf, cb);
  if (on('s2', t)) scene2(t);
  if (on('sA', t)) sceneA(t, cf);
  if (on('s4moto', t)) scene4(t, cf);
  if (on('s5', t)) scene5(t);
  if (on('sEnd', t)) sceneEnd(t, cf);
  hd('h1', t, V('cuis') - .05, 1.5); hd('h2', t, V('livre'), 3.15);
  hd('h3', t, V('marchand') + .4, V('prod') - .05); hd('h4', t, V('prod'), V('ouvert') - .55); hd('h5', t, V('ouvert') - .5, V('cmd'));
  hd('h6', t, V('cmd'), V('livreur') - .1); hd('h7', t, V('livreur'), V('momo') - .5); hd('h8', t, V('momo') - .45, V('trouv') - .2); hd('h9', t, V('trouv') - .1, V('endA') - .3);
  const nk = P(t, V('cmd') - .05, .5, E.oB), nout = P(t, V('acc') + .3, .4, E.iC);
  el('notif').style.transform = `translateY(${(1 - nk) * -320 - nout * 320}px)`; el('notif').style.display = t > V('cmd') - .1 && nout < 1 ? 'flex' : 'none';
  let fl = 0;
  for (const [a, d, m] of [[V('livre') - .05, .3, .5], [V('endA') - .25, .35, .6]]) fl = Math.max(fl, m * Math.sin(Math.PI * clamp((t - a) / d)));
  O('flash', fl);
  O('fade', Math.max(1 - P(t, 0, .3, E.lin), P(t, DUR2 - .45, .45, E.lin)));
  const R = rng(Math.floor(t * 24) + 1); el('grain').style.transform = `translate(${-R() * 100}px,${-R() * 100}px)`;
};
