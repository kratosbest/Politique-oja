/* ============================================================
   OJA MERCHANT — app for restaurants & merchants (54.4 s VO + logo outro)
   (prelude from market_body.js provides iphone(), sbar(), fv(), sticker(), scrHome()…)
   ============================================================ */
Object.assign(ICONS, {
  chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  bellr: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M22 8c0-2.3-.8-4.3-2-6"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/>',
  clip: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  gear: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  minus: '<path d="M5 12h14"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
});
const OR = '#FF6B00', INK = '#0F0F12', PEARL = '#F7F5F2', DK = '#0D0D10';
const st2 = document.createElement('style'); st2.textContent = `
.hlo{color:${OR}}.hlk{color:${INK}}
.glass{position:absolute;border-radius:28px;background:rgba(255,255,255,.82);border:1.5px solid rgba(255,255,255,.95);box-shadow:0 30px 70px rgba(80,40,10,.14);color:${INK}}
.mesh{position:absolute;border-radius:50%;filter:blur(2px)}
.kpi{font:900 44px Poppins;letter-spacing:-.02em}
`; document.head.appendChild(st2);
const meshBg = (id) => `<div id="${id}" class="abs" style="inset:0;background:${PEARL}">
<div class="mesh" style="left:-240px;top:-300px;width:900px;height:900px;background:radial-gradient(circle,rgba(255,138,46,.32),rgba(255,138,46,0) 65%)"></div>
<div class="mesh" style="left:1300px;top:500px;width:1000px;height:1000px;background:radial-gradient(circle,rgba(255,196,140,.45),rgba(255,196,140,0) 65%)"></div>
<div class="abs" style="inset:0;background-image:linear-gradient(rgba(15,15,18,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(15,15,18,.045) 1px,transparent 1px);background-size:96px 96px"></div></div>`;
const darkBg = `<div class="abs" style="inset:0;background:radial-gradient(ellipse at 60% 45%,#3A1E0C 0%,${DK} 62%)"></div><div class="abs" style="inset:0;background-image:radial-gradient(rgba(255,255,255,.06) 2px,transparent 2px);background-size:46px 46px"></div>`;
const mark = (s = 90) => `<span style="display:inline-grid;place-items:center;width:${s}px;height:${s}px;border-radius:50%;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.18)"><img src="assets/mk_logo.png" style="width:${s * .86}px"></span>`;
const NAVM = (p, act) => `<div class="abs" style="left:0;right:0;top:800px;height:78px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-around;align-items:center;font:600 11px Inter;color:#444">
${[['grid', 'Accueil'], ['bell', 'Nouvelles'], ['clip', 'En cours'], ['box', 'Prêtes'], ['gear', 'Réglages']].map(([icn, lb], i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;${i === act ? `color:${OR}` : ''}"><div style="padding:5px 16px;border-radius:14px;${i === act ? 'background:#FFE9DA' : ''}">${ic(icn, 21, i === act ? OR : '#444', 2)}</div>${lb}</div>`).join('')}</div>`;
const tapEl = p => `<div id="${p}tap" class="abs" style="left:0;top:0;width:70px;height:70px;margin:-35px;border-radius:50%;background:rgba(255,107,0,.3);border:3px solid ${OR};opacity:0;z-index:18"></div>`;

function scrDash(p) {
  return `${sbar()}
<div class="abs" style="left:20px;top:58px"><div style="font:500 14px Inter;color:#777">Bonjour 👋</div><div style="font:800 24px Poppins">Maquis Chez Tanti</div></div>
<div class="abs" style="right:18px;top:66px;padding:8px 14px;border-radius:16px;background:#E7F6EF;color:#0B7A5E;font:800 13px Inter;display:flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:#12B76A"></span>Ouvert</div>
<div class="abs" style="left:16px;right:16px;top:124px;height:150px;border-radius:24px;background:linear-gradient(135deg,#FF8A1F,#E85D00);color:#fff;padding:18px 20px">
<div style="font:600 14px Inter;opacity:.9">Ventes du jour</div><div style="font:900 36px Poppins;margin-top:2px"><span id="${p}sales">48 500</span> <span style="font-size:18px">XOF</span></div>
<div style="font:700 13px Inter;margin-top:6px;display:inline-flex;gap:6px;align-items:center;padding:4px 10px;border-radius:10px;background:rgba(255,255,255,.2)">${ic('up', 16, '#fff', 2.6)}+18 % vs hier</div></div>
<div class="abs" style="left:16px;top:288px;width:182px;height:96px;border-radius:20px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.06);padding:14px 16px"><div style="font:600 13px Inter;color:#777">Commandes</div><div style="font:900 30px Poppins" id="${p}ord">23</div></div>
<div class="abs" style="left:210px;top:288px;width:182px;height:96px;border-radius:20px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.06);padding:14px 16px"><div style="font:600 13px Inter;color:#777">En préparation</div><div style="font:900 30px Poppins;color:${OR}">4</div></div>
<div class="abs" style="left:16px;right:16px;top:398px;height:200px;border-radius:22px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.06);padding:16px 18px"><div style="font:800 16px Inter">Ventes de la semaine</div>
<div class="abs" style="left:18px;right:18px;bottom:18px;height:120px;display:flex;align-items:flex-end;gap:12px">${[45, 62, 50, 78, 66, 92, 100].map((h, i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px"><div id="${p}bar${i}" style="width:100%;height:${h}px;border-radius:8px;background:${i === 6 ? OR : '#FFD9BF'};transform-origin:50% 100%"></div><span style="font:600 11px Inter;color:#999">${'LMMJVSD'[i]}</span></div>`).join('')}</div></div>
<div class="abs" style="left:16px;right:16px;top:612px;height:76px;border-radius:20px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.06);display:flex;align-items:center;gap:14px;padding:0 16px">
<div style="width:46px;height:46px;border-radius:14px;background:#FFE9DA;display:grid;place-items:center">${ic('bellr', 22, OR, 2.2)}</div><div style="flex:1"><div style="font:800 15px Inter">Nouvelle commande</div><div style="font:500 13px Inter;color:#777">#3C24A4 · 2 articles · 5 700 XOF</div></div>${ic('arrow', 18, '#999', 2.4)}</div>
<div class="abs" style="left:16px;right:16px;top:700px;height:76px;border-radius:20px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.06);display:flex;align-items:center;gap:14px;padding:0 16px">
<div style="width:46px;height:46px;border-radius:14px;background:#E7F6EF;display:grid;place-items:center">${ic('wallet', 22, '#12B76A', 2.2)}</div><div style="flex:1"><div style="font:800 15px Inter">Solde disponible</div><div style="font:500 13px Inter;color:#777">125 450 XOF</div></div>${ic('arrow', 18, '#999', 2.4)}</div>
${NAVM(p, 0)}${tapEl(p)}`;
}
const CAT = [['shawarma', 'Shawarma poulet', '2 500', 18], ['croissant', 'Croissants x3', '1 000', 25], ['🍗', 'Poulet braisé', '3 500', 12], ['🥤', 'Jus de bissap', '700', 40]];
function scrCatalog(p) {
  return `${sbar()}
<div class="abs" style="left:20px;top:58px"><div style="font:800 24px Poppins">Catalogue boutique</div><div style="font:500 13px Inter;color:#777">Produits, prix, photos et stocks</div></div>
<div class="abs" style="left:16px;top:130px;display:flex;gap:8px"><span class="a-chip on" style="background:${INK};border-color:${INK}">Tout 4</span><span class="a-chip">Plats</span><span class="a-chip">Boissons</span><span class="a-chip">Desserts</span></div>
<div class="abs" style="left:16px;right:16px;top:186px">${CAT.map(([k, n, pr, s], i) => `<div id="${p}r${i}" class="a-card" style="position:relative;height:104px;margin-bottom:12px;display:flex;align-items:center;gap:14px;padding:0 14px">${fv(k, 76, 76, 16, ['#FFE7D1', '#FFE7D1', '#FFE9B8', '#FFE0E0'][i])}
<div style="flex:1"><div style="font:800 16px Poppins">${n}</div><div style="font:800 16px Inter;color:#C2410C;margin-top:2px"><span id="${p}pr${i}">${pr}</span> <span style="font-size:12px">XOF</span></div>
<div style="display:inline-flex;align-items:center;gap:6px;margin-top:4px;padding:3px 10px;border-radius:10px;background:#F3F4F6;font:700 12px Inter;color:#444">Stock <span id="${p}st${i}">${s}</span></div></div>
<div style="width:46px;height:28px;border-radius:14px;background:#12B76A;position:relative"><div style="position:absolute;right:3px;top:3px;width:22px;height:22px;border-radius:50%;background:#fff"></div></div></div>`).join('')}</div>
<div id="${p}add" class="abs" style="left:16px;right:16px;top:690px;height:62px;border-radius:20px;background:${OR};color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font:800 18px Inter">${ic('plus', 22, '#fff', 3)}Ajouter un produit</div>
<div id="${p}form" class="abs" style="left:0;right:0;top:200px;height:678px;border-radius:30px 30px 0 0;background:#fff;box-shadow:0 -20px 50px rgba(0,0,0,.2);padding:22px 20px;z-index:8">
<div style="width:60px;height:5px;border-radius:3px;background:#ddd;margin:0 auto 16px"></div><div style="font:800 22px Poppins">Nouveau produit</div>
<div style="display:flex;gap:10px;margin-top:16px"><div id="${p}fph" style="width:110px;height:110px;border-radius:20px;background:#FFE9B8;display:grid;place-items:center;overflow:hidden"><span class="emo" style="font-size:70px">🍗</span></div><div style="width:110px;height:110px;border-radius:20px;border:2px dashed #ccc;display:grid;place-items:center">${ic('camera', 30, '#aaa', 2)}</div></div>
<div style="font:700 13px Inter;color:#777;margin-top:16px">Nom</div><div class="a-card" style="height:52px;margin-top:6px;display:flex;align-items:center;padding:0 14px;font:600 17px Inter;border:1.5px solid #eee"><span id="${p}typ"></span><span id="${p}cur" style="display:inline-block;width:3px;height:22px;background:${OR};margin-left:2px"></span></div>
<div style="display:flex;gap:10px;margin-top:14px"><div style="flex:1"><div style="font:700 13px Inter;color:#777">Prix</div><div class="a-card" style="height:52px;margin-top:6px;display:flex;align-items:center;padding:0 14px;font:800 18px Inter;color:#C2410C;border:1.5px solid #eee"><span id="${p}fpr">0</span>&nbsp;XOF</div></div>
<div style="flex:1"><div style="font:700 13px Inter;color:#777">Stock</div><div class="a-card" style="height:52px;margin-top:6px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;border:1.5px solid #eee"><span style="width:32px;height:32px;border-radius:10px;background:#F3F4F6;display:grid;place-items:center">${ic('minus', 18, '#111', 2.6)}</span><b id="${p}fst" style="font:800 18px Inter">0</b><span style="width:32px;height:32px;border-radius:10px;background:${OR};display:grid;place-items:center">${ic('plus', 18, '#fff', 2.6)}</span></div></div></div>
<div id="${p}save" style="position:relative;margin-top:22px;height:60px;border-radius:20px;background:${INK};color:#fff;display:grid;place-items:center;font:800 18px Inter;overflow:hidden">Enregistrer<div id="${p}ok" class="abs" style="inset:0;background:#12B76A;display:flex;align-items:center;justify-content:center;gap:8px">${ic('check', 22, '#fff', 3)}Produit ajouté</div></div></div>
${NAVM(p, 4)}${tapEl(p)}`;
}
const STEPS = ['Reçue', 'Acceptée', 'En préparation', 'Prête', 'Livrée'];
function scrOrder(p) {
  return `${sbar()}
<div class="abs" style="left:20px;top:58px"><div style="font:800 24px Poppins">Nouvelles commandes</div><div style="font:500 13px Inter;color:#777">Acceptez rapidement les demandes entrantes</div></div>
<div id="${p}card" class="abs" style="left:14px;right:14px;top:130px;border-radius:26px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:18px">
<div style="display:flex;align-items:center;gap:8px"><b style="font:900 20px Inter">#3C24A4</b><span style="padding:4px 10px;border-radius:12px;background:#E8F1FF;color:#1D63D8;font:700 12px Inter">🛵 Livraison</span><span style="padding:4px 10px;border-radius:12px;border:1.5px solid #12B76A;background:#E7F6EF;color:#0B7A5E;font:700 12px Inter">Payée ✓</span></div>
<div style="margin-top:14px;border-radius:18px;background:#FFF1E6;padding:12px 14px;font:500 14px Inter">
<div style="display:flex;justify-content:space-between"><span>2× Shawarma poulet</span><b>5 000</b></div><div style="display:flex;justify-content:space-between;margin-top:6px"><span>1× Jus de bissap</span><b>700</b></div>
<div style="display:flex;justify-content:space-between;margin-top:8px;color:#1D63D8"><span>Livraison prépayée Mobile Money</span><b>800</b></div>
<div style="height:1px;background:#F2D9C8;margin:10px 0"></div><div style="display:flex;justify-content:space-between;font:800 15px Inter"><span>Votre gain</span><span style="color:#0B7A5E">5 700 XOF</span></div></div>
<div id="${p}btns" style="display:flex;gap:10px;margin-top:14px"><div style="flex:1;height:54px;border-radius:18px;border:2px solid #E8112D;color:#E8112D;display:grid;place-items:center;font:800 16px Inter">Refuser</div><div id="${p}acc" style="flex:1;height:54px;border-radius:18px;background:#12B76A;color:#fff;display:grid;place-items:center;font:800 16px Inter">Accepter</div></div>
<div id="${p}prog" class="abs" style="left:18px;right:18px;bottom:18px;height:54px;border-radius:18px;background:${INK};color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font:800 16px Inter">${ic('timer', 20, OR, 2.4)}<span id="${p}stat">En préparation</span></div></div>
<div class="abs" style="left:20px;right:20px;top:540px">${STEPS.map((s, i) => `<div style="display:flex;align-items:center;gap:12px;height:46px"><div id="${p}dot${i}" style="width:30px;height:30px;border-radius:50%;background:#E5E7EB;display:grid;place-items:center">${ic('check', 16, '#fff', 3)}</div><span id="${p}lb${i}" style="font:700 15px Inter;color:#999">${s}</span></div>`).join('')}</div>
${NAVM(p, 1)}${tapEl(p)}`;
}
function scrRevenue(p) {
  return `${sbar()}
<div class="abs" style="left:20px;top:58px"><div style="font:800 23px Poppins">Revenus & reversements</div><div style="font:500 13px Inter;color:#777">Vos gains, séparés des paiements clients</div></div>
<div class="abs" style="left:16px;right:16px;top:124px;height:236px;border-radius:26px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.07);text-align:center;padding-top:22px">
<div style="font:800 14px Inter;letter-spacing:.12em;color:#444">DISPONIBLE</div><div style="font:900 40px Poppins;margin-top:6px"><span id="${p}bal">0</span> <span style="font-size:20px">XOF</span></div>
<div style="font:500 13px Inter;color:#666;margin:6px 26px 0">Commandes payées protégées jusqu'à la remise.</div>
<div style="display:flex;gap:10px;margin:14px 18px 0"><div style="flex:1;height:50px;border-radius:16px;background:${OR};color:#fff;display:grid;place-items:center;font:800 16px Inter">Retirer</div><div style="flex:1;height:50px;border-radius:16px;border:1.5px solid #ddd;display:grid;place-items:center;font:700 16px Inter">Tout retirer</div></div></div>
<div class="abs" style="left:20px;top:378px;font:800 18px Inter">Historique</div>
<div class="abs" style="left:16px;right:16px;top:410px">${[['5 700', 'Commande #3C24A4', 'Il y a 2 min'], ['3 500', 'Commande #3C24A1', 'Il y a 18 min'], ['8 200', 'Commande #3C249F', 'Il y a 40 min'], ['2 500', 'Commande #3C249A', 'Il y a 1 h']].map(([a, b, c], i) => `<div id="${p}h${i}" class="a-card" style="height:80px;margin-bottom:10px;display:flex;align-items:center;gap:14px;padding:0 16px"><div style="width:44px;height:44px;border-radius:14px;background:#E7F6EF;display:grid;place-items:center">${ic('up', 20, '#12B76A', 2.6)}</div><div style="flex:1"><div style="font:800 16px Inter">+${a} XOF</div><div style="font:500 12px Inter;color:#777">${b} · ${c}</div></div><span style="font:700 12px Inter;color:#0B7A5E">Disponible</span></div>`).join('')}</div>
${NAVM(p, 0)}${tapEl(p)}`;
}
Object.assign(ICONS, { up: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>', tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5"/>', arrow: '<path d="m9 18 6-6-6-6"/>', camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>' });

/* S0 — hook: restaurateur / commerçant / vendeur ? */
const HOOK = [['Restaurateur', 'shawarma', OR], ['Commerçant', '🛍️', '#FFC83D'], ['Vendeur', '📦', '#fff']];
H += `<div class="scene" id="s0">${darkBg}
<div id="s0sweep" class="abs" style="left:-600px;top:-200px;width:500px;height:1500px;background:linear-gradient(90deg,rgba(255,138,46,0),rgba(255,138,46,.35),rgba(255,138,46,0));transform:rotate(18deg)"></div>
<div id="s0k" class="abs" style="left:140px;top:250px;font:700 34px Inter;color:#bbb;letter-spacing:.2em">VOUS ÊTES</div>
${HOOK.map(([w, k, c], i) => `<div id="s0w${i}" class="abs H" style="left:140px;top:330px;font-size:150px;color:${c};letter-spacing:-.04em">${L(w)}</div>${sticker('s0i' + i, k, 330, 1580, 540, i === 2 ? '#1E1E22' : '#fff')}`).join('')}
<div id="s0q" class="abs H" style="left:140px;top:560px;font-size:96px;color:#fff">${W('…ou les trois *?*')}</div>
</div>`;

/* S1 — faites grandir votre activité avec OJA Merchant */
H += `<div class="scene" id="s1">${meshBg('s1bg')}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" viewBox="0 0 1920 1080">
${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect id="s1b${i}" x="${1020 + i * 120}" y="${900 - (140 + i * 90)}" width="80" height="${140 + i * 90}" rx="18" fill="${i === 6 ? OR : '#FFD2B0'}"/>`).join('')}
<path id="s1ln" d="M980,800 C1150,760 1250,700 1380,640 S1600,420 1800,240" stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"/>
<circle id="s1dot" r="18" fill="${OR}" stroke="#fff" stroke-width="6"/></svg>
<div id="s1t" class="abs H" style="left:140px;top:280px;font-size:118px;color:${INK}"><div>${W('Faites grandir')}</div><div>${W('votre *activité.*')}</div></div>
<div id="s1lock" class="abs" style="left:140px;top:620px;display:flex;align-items:center;gap:24px">${mark(120)}<div class="H" style="font-size:104px;color:${INK}">OJA <span class="hlo">Merchant</span></div></div>
</div>`;

/* S2 — écosystème OJA + visible sur OJA Market */
const ECO = [['store', 'OJA Market', 1590, 230], ['users', 'Clients', 1720, 560], ['bike', 'Livreurs OJA', 1560, 860], ['wallet', 'Paiements', 330, 880], ['zap', 'NOVOJA', 260, 560]];
H += `<div class="scene" id="s2">${meshBg('s2bg')}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" viewBox="0 0 1920 1080">${ECO.map(([, , x, y], i) => `<path id="s2l${i}" d="M960,560 L${x},${y}" stroke="${OR}" stroke-width="4" stroke-dasharray="10 12" fill="none" opacity=".6"/>`).join('')}</svg>
${ECO.map(([icn, lb, x, y], i) => `<div id="s2n${i}" class="glass" style="left:${x - 130}px;top:${y - 48}px;width:260px;height:96px;display:flex;align-items:center;gap:14px;padding:0 18px"><div style="width:56px;height:56px;border-radius:18px;background:${INK};display:grid;place-items:center">${ic(icn, 28, OR, 2.2)}</div><div style="font:800 24px Poppins">${lb}</div></div>`).join('')}
${[0, 1, 2, 3, 4].map(i => `<div id="s2p${i}" class="abs" style="left:0;top:0;width:16px;height:16px;margin:-8px;border-radius:50%;background:${OR};box-shadow:0 0 18px ${OR}"></div>`).join('')}
<div id="s2t" class="abs H" style="left:0;top:70px;width:1920px;text-align:center;font-size:78px;color:${INK}">${W('Votre commerce rejoint *l\'écosystème OJA*')}</div>
<div id="s2u" class="abs H" style="left:0;top:70px;width:1920px;text-align:center;font-size:78px;color:${INK}">${W('Visible par les clients sur *OJA Market*')}</div>
<div id="s2wrap" class="abs" style="left:745px;top:150px;width:430px;height:900px">${iphone('s2pA', scrDash('d2'), 0, 0)}</div>
<div id="s2wrapB" class="abs" style="left:1240px;top:170px;width:430px;height:900px">${iphone('s2pB', scrHome('h2'), 0, 0)}</div>
</div>`;

/* S3 — produits, prix, stocks */
H += `<div class="scene" id="s3">${meshBg('s3bg')}
<div id="s3t" class="abs H" style="left:140px;top:230px;font-size:96px;color:${INK}"><div>${W('Ajoutez vos')}</div><div>${W('*produits.*')}</div></div>
${[['tag', 'Gérez vos prix', '3 000 → 3 500 XOF'], ['box', 'Suivez vos stocks', 'Stock 12 → 20']].map(([icn, a, b], i) => `<div id="s3f${i}" class="glass" style="left:140px;top:${520 + i * 170}px;width:620px;height:140px;display:flex;align-items:center;gap:22px;padding:0 28px"><div style="width:84px;height:84px;border-radius:24px;background:${OR};display:grid;place-items:center">${ic(icn, 42, '#fff', 2.2)}</div><div><div style="font:800 34px Poppins">${a}</div><div style="font:700 24px Inter;color:#C2410C" id="s3fv${i}">${b}</div></div></div>`).join('')}
<div id="s3wrap" class="abs" style="left:1180px;top:90px;width:430px;height:900px">${iphone('s3ph', scrCatalog('c3'), 0, 0)}</div>
${[['🍗', 980, 250], ['shawarma', 1780, 320], ['🥤', 1760, 800]].map(([k, x, y], i) => sticker('s3k' + i, k, 150, x, y, '#fff')).join('')}
</div>`;

/* S4 — recevez vos commandes · une seule application */
H += `<div class="scene" id="s4">${darkBg}
<div id="s4t" class="abs H" style="left:140px;top:260px;font-size:100px;color:#fff"><div>${W('Recevez et suivez')}</div><div>${W('vos *commandes*')}</div></div>
<div id="s4s" class="abs" style="left:144px;top:520px;font:600 44px Inter;color:#cfcfd6">${W('depuis une seule application.')}</div>
${[0, 1, 2, 3, 4].map(i => `<div id="s4o${i}" class="abs" style="left:0;top:0;width:330px;height:96px;border-radius:24px;background:#fff;display:flex;align-items:center;gap:14px;padding:0 18px;box-shadow:0 20px 50px rgba(0,0,0,.4)"><div style="width:54px;height:54px;border-radius:16px;background:#FFE9DA;display:grid;place-items:center">${ic('bellr', 26, OR, 2.2)}</div><div><div style="font:800 19px Inter;color:#111">#3C24${['A4', 'A1', '9F', '9A', '97'][i]}</div><div style="font:600 15px Inter;color:#777">${['5 700', '3 500', '8 200', '2 500', '4 300'][i]} XOF</div></div></div>`).join('')}
<div id="s4wrap" class="abs" style="left:1180px;top:90px;width:430px;height:900px">${iphone('s4ph', scrDash('d4'), 0, 0)}</div>
</div>`;

/* S5 — nouvelle commande en temps réel */
H += `<div class="scene" id="s5">${meshBg('s5bg')}
${[0, 1, 2].map(i => `<div id="s5r${i}" class="abs" style="left:1395px;top:200px;width:10px;height:10px;border-radius:50%;border:4px solid rgba(255,107,0,.6)"></div>`).join('')}
<div id="s5n" class="abs" style="left:1100px;top:40px;width:600px;height:130px;border-radius:32px;background:${INK};color:#fff;display:flex;align-items:center;gap:20px;padding:0 26px;box-shadow:0 30px 70px rgba(0,0,0,.35);z-index:5">
<div style="width:76px;height:76px;border-radius:22px;background:${OR};display:grid;place-items:center">${ic('bellr', 40, '#fff', 2.2)}</div><div><div style="font:800 30px Poppins">Nouvelle commande</div><div style="font:600 22px Inter;color:#bbb">#3C24A4 · 5 700 XOF · payée</div></div></div>
<div id="s5t" class="abs H" style="left:140px;top:250px;font-size:84px;color:${INK}"><div>${W('Une nouvelle')}</div><div>${W('*commande* arrive ?')}</div></div>
<div id="s5steps" class="abs" style="left:140px;top:520px">${['Vous la voyez', 'Vous la préparez', 'Prise en charge', 'Livrée'].map((s, i) => `<div id="s5s${i}" style="display:flex;align-items:center;gap:22px;height:96px"><div class="s5d" style="width:66px;height:66px;border-radius:22px;background:#EDEAE6;display:grid;place-items:center;font:900 26px Poppins;color:#999">${i + 1}</div><div class="s5l" style="font:800 48px Poppins;color:#999">${s}</div></div>`).join('')}</div>
<div id="s5wrap" class="abs" style="left:1180px;top:150px;width:430px;height:900px">${iphone('s5ph', scrOrder('o5'), 0, 0)}</div>
<div id="s5moto" class="abs" style="left:1550px;top:760px;width:300px"><img src="assets/moto.png" style="width:300px;filter:drop-shadow(0 20px 20px rgba(0,0,0,.3))"></div>
</div>`;

/* S6 — paiements, ventes, opérations */
H += `<div class="scene" id="s6">${meshBg('s6bg')}
<div id="s6t" class="abs H" style="left:0;top:70px;width:1920px;text-align:center;font-size:80px;color:${INK}">${W('Une vision *claire* de votre activité')}</div>
<div id="s6wrap" class="abs" style="left:745px;top:190px;width:430px;height:900px">${iphone('s6ph', scrRevenue('r6'), 0, 0)}</div>
${[['wallet', 'Paiements', 'Mobile Money sécurisé', 140, 300], ['chart', 'Ventes', '+18 % cette semaine', 140, 560], ['clip', 'Opérations', '23 commandes · 0 litige', 1280, 380]].map(([icn, a, b, x, y], i) => `<div id="s6c${i}" class="glass" style="left:${x}px;top:${y}px;width:500px;height:200px;padding:28px 30px">
<div style="display:flex;align-items:center;gap:16px"><div style="width:66px;height:66px;border-radius:20px;background:${INK};display:grid;place-items:center">${ic(icn, 34, OR, 2.2)}</div><div style="font:800 38px Poppins">${a}</div></div><div style="font:700 26px Inter;color:#C2410C;margin-top:18px">${b}</div></div>`).join('')}
<div id="s6g" class="glass" style="left:1280px;top:640px;width:500px;height:260px;padding:24px 28px"><div style="font:800 26px Poppins">Chiffre d'affaires</div>
<svg width="444" height="170" viewBox="0 0 444 170" style="margin-top:10px"><path d="M0,150 L0,150 C60,140 90,120 140,110 S230,70 280,80 S380,30 444,14 L444,170 L0,170Z" fill="rgba(255,107,0,.12)"/><path id="s6ln" d="M0,150 C60,140 90,120 140,110 S230,70 280,80 S380,30 444,14" stroke="${OR}" stroke-width="6" fill="none" stroke-linecap="round"/></svg></div>
</div>`;

/* S7 — types de commerces */
const TYPES = [['🍲', 'Restaurants'], ['🛍️', 'Boutiques'], ['🛒', 'Alimentation'], ['👗', 'Mode'], ['💄', 'Beauté'], ['📱', 'Électronique'], ['🏪', 'Commerce de quartier']];
H += `<div class="scene" id="s7">${darkBg}
${TYPES.map(([e, n], i) => { const row = i < 4 ? 0 : 1, col = row ? i - 4 : i; const x = row ? 330 + col * 430 : 120 + col * 430, y = row ? 590 : 170; return `<div id="s7c${i}" class="abs c" style="left:${x}px;top:${y}px;width:${i === 6 ? 520 : 400}px;height:340px;border-radius:40px;background:linear-gradient(160deg,#232328,#16161A);border:1.5px solid rgba(255,255,255,.08);text-align:center;color:#fff"><div class="emo" style="height:230px;font-size:150px">${e}</div><div class="H" style="font-size:${i === 6 ? 40 : 46}px">${n}</div></div>`; }).join('')}
</div>`;

/* S8 — vendre plus / clients autour de vous */
const AV = [[-330, -120], [-260, 170], [-40, -280], [210, -230], [340, 40], [250, 250], [-30, 300], [-380, 30]];
H += `<div class="scene" id="s8">${meshBg('s8bg')}
<div id="s8t" class="abs H" style="left:140px;top:250px;font-size:104px;color:${INK}"><div>${W('Les outils pour')}</div><div>${W('*vendre plus.*')}</div></div>
<div id="s8s" class="abs" style="left:144px;top:530px;font:600 46px Inter;color:#555;width:760px">${W('Touchez davantage de clients autour de vous.')}</div>
<div id="s8cnt" class="glass" style="left:140px;top:720px;width:540px;height:170px;padding:26px 32px"><div style="font:700 24px Inter;color:#777">Clients ce mois-ci</div><div class="kpi" style="font-size:64px;color:${OR}">+<span id="s8n">0</span></div></div>
${[0, 1, 2].map(i => `<div id="s8r${i}" class="abs" style="left:1420px;top:540px;width:10px;height:10px;border-radius:50%;border:4px solid rgba(255,107,0,.5)"></div>`).join('')}
<div id="s8shop" class="abs c" style="left:1320px;top:440px;width:200px;height:200px;border-radius:60px;background:${OR};display:grid;place-items:center;box-shadow:0 30px 70px rgba(255,107,0,.4)"><span class="emo" style="font-size:110px">🏪</span></div>
${AV.map(([dx, dy], i) => `<div id="s8a${i}" class="abs c" style="left:${1420 + dx - 42}px;top:${540 + dy - 42}px;width:84px;height:84px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 14px 30px rgba(0,0,0,.15)">${ic('user', 40, [OR, INK, '#12B76A', '#1D63D8'][i % 4], 2.4)}</div>`).join('')}
</div>`;

/* S9 — moins de complications / plus de visibilité / plus d'opportunités */
const TRIAD = [['Moins de', 'complications.', PEARL, INK, '−'], ['Plus de', 'visibilité.', OR, '#fff', '+'], ['Plus', "d'opportunités.", DK, '#fff', '+']];
H += `<div class="scene" id="s9">${TRIAD.map(([a, b, bg, fg, sg], i) => `<div id="s9f${i}" class="abs" style="inset:0;background:${bg};display:none">
<div class="abs H" style="left:1180px;top:110px;font-size:900px;line-height:.8;color:${i === 1 ? 'rgba(255,255,255,.16)' : i === 0 ? 'rgba(255,107,0,.12)' : 'rgba(255,107,0,.2)'}" id="s9g${i}">${sg}</div>
<div id="s9t${i}" class="abs H" style="left:140px;top:300px;font-size:150px;color:${fg};letter-spacing:-.03em"><div style="font-size:100px;opacity:.75">${W(a)}</div><div>${L(b)}</div></div></div>`).join('')}</div>`;

/* S10 — finale: iPhones alignés */
H += `<div class="scene" id="s10">${darkBg}
<div id="s10t" class="abs H" style="left:0;top:60px;width:1920px;text-align:center;font-size:80px;color:#fff">${W('Votre commerce *dans votre poche,*')}</div>
<div id="s10u" class="abs H" style="left:0;top:160px;width:1920px;text-align:center;font-size:70px;color:#FFC83D">${W('vos clients à portée de clic.')}</div>
${[['A', scrCatalog('c10')], ['B', scrOrder('o10')], ['C', scrDash('d10')], ['D', scrRevenue('r10')], ['E', scrHome('h10')]].map(([k, sc]) => `<div id="s10w${k}" class="abs" style="left:745px;top:290px;width:430px;height:900px">${iphone('s10p' + k, sc, 0, 0)}</div>`).join('')}
</div>`;

/* S11 — logo OJA Marketplace / Merchant + CTA */
const LG = [['sky', 'inset(0 0 73% 0)'], ['map', 'inset(50% 4% 30% 4%)'], ['sgl', 'inset(31% 59% 42% 13%)'], ['sgr', 'inset(31% 13% 42% 59%)'], ['pin', 'ellipse(18% 24% at 50% 40%)'], ['ban', 'inset(58% 6% 16% 6%)'], ['tag', 'inset(83% 0 0 0)']];
H += `<div class="scene" id="s11" style="background:${PEARL}">${meshBg('s11bg')}
<div id="s11glow" class="abs" style="left:560px;top:-60px;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(255,138,46,.35),rgba(255,138,46,0) 65%)"></div>
<div id="s11logo" class="abs" style="left:700px;top:20px;width:520px;height:520px">${LG.map(([k, cp]) => `<img id="s11${k}" src="assets/merchant_logo.png" class="abs" style="left:0;top:0;width:520px;height:520px;clip-path:${cp}">`).join('')}
<div id="s11shine" class="abs" style="left:0;top:0;width:520px;height:520px;overflow:hidden;-webkit-mask:url(assets/merchant_logo.png) center/contain no-repeat;mask:url(assets/merchant_logo.png) center/contain no-repeat"><div id="s11sh" class="abs" style="left:-200px;top:-100px;width:140px;height:800px;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.75),rgba(255,255,255,0));transform:rotate(20deg)"></div></div></div>
<div id="s11w" class="abs H" style="left:0;top:560px;width:1920px;text-align:center;font-size:118px;color:${INK}">${L('OJA')}<span style="display:inline-block;width:28px"></span><span class="hlo">${L('Merchant')}</span></div>
<div id="s11s" class="abs" style="left:0;top:705px;width:1920px;text-align:center;font:600 46px Inter;color:#555">${W('Le local devient *visible.*', 'hlo')}</div>
<div id="s11st0" class="store" style="left:600px;top:810px">${ic('phone', 50, '#fff', 1.8)}<div><small>Télécharger sur</small><b>App Store</b></div></div>
<div id="s11st1" class="store" style="left:990px;top:810px">${ic('play', 46, '#fff', 1.8, '#fff')}<div><small>Disponible sur</small><b>Google Play</b></div></div>
<div class="abs" style="left:0;top:950px;width:1920px;display:flex;justify-content:center"><div id="s11cta" class="pill" style="position:relative;background:${OR};color:#fff;font:800 30px Poppins;padding:14px 32px 14px 18px">${flag(48, 32)}Téléchargez OJA Merchant</div></div>
</div>`;

H += `<div id="wipe" class="abs" style="inset:0;z-index:40;pointer-events:none">${[0, 1, 2].map(i => `<div id="wb${i}" class="band" style="display:none"></div>`).join('')}</div>
<canvas id="grain" width="512" height="512"></canvas><div id="vig"></div><div id="fade"></div>`;
stage.innerHTML = H;
(() => { const c = $('grain'), g = c.getContext('2d'), im = g.createImageData(512, 512), R = rng(99); for (let i = 0; i < im.data.length; i += 4) { const v = R() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } g.putImageData(im, 0, 0); c.style.width = '2120px'; c.style.height = '1280px'; c.style.imageRendering = 'pixelated'; })();
const prep = id => { const p = $(id), l = p.getTotalLength(); p.style.strokeDasharray = `${l} ${l}`; return [p, l]; };
const s1ln = prep('s1ln'), s6ln = prep('s6ln');
['h2', 'h10'].forEach(p => { el(p + 'seg').style.transform = 'translateX(0)'; el(p + 'sr').style.color = '#fff'; el(p + 'sm').style.color = '#111'; O(p + 'sl', 0); });

/* ============================================================
   SCENES
   ============================================================ */
const SC = [['s0', 0, 2.42], ['s1', 2.42, 5.47], ['s2', 5.47, 12.42], ['s3', 12.42, 15.62], ['s4', 15.62, 19.17], ['s5', 19.17, 25.88], ['s6', 25.88, 32.85], ['s7', 32.85, 38.15], ['s8', 38.15, 43.29], ['s9', 43.29, 47.22], ['s10', 47.22, 51.8], ['s11', 51.8, 99]];
const WIPES = [[5.19, [PEARL, OR, INK]], [12.14, [PEARL, OR, INK]], [15.34, [DK, OR, PEARL]], [25.6, [PEARL, OR, INK]], [32.57, [DK, OR, PEARL]], [37.87, [PEARL, OR, DK]]];
function circleClip(id, t, t0, d, cx, cy, e = E.ioC) { const p = P(t, t0, d, e); el(id).style.clipPath = p >= 1 ? 'none' : `circle(${p * 2300}px at ${cx}px ${cy}px)`; }
function wipes(t) {
  let active = null;
  for (const w of WIPES) if (t >= w[0] - .01 && t < w[0] + .75) active = w;
  for (let i = 0; i < 3; i++) {
    const b = el('wb' + i);
    if (!active) { b.style.display = 'none'; continue; }
    const t0 = active[0]; b.style.display = 'block'; b.style.background = active[1][i];
    const inP = P(t, t0 + i * .05, .22, E.oC), outP = P(t, t0 + .3 + (2 - i) * .05, .26, E.iC);
    b.style.transform = `translateX(${(1 - inP) * 2500 - outP * 2500}px) skewX(-12deg)`;
  }
}
const pop = (t, a, d = .5, e = E.oB) => P(t, a, d, e);
function tap(id, t, a, x, y) { const q = (t - a) / .45; if (q < 0 || q > 1) { O(id, 0); return; } T(id, { x, y, s: .5 + q * 1.3, o: 1 - q }); }
function glare(id, ry) { const g = el(id + 'g'); if (g) g.style.transform = `translateX(${ry * 6}px)`; }
function phoneIn(wrap, ph, t, a, from = -60, base = -12) { const p = P(t, a, .95, E.oE), ry = lerp(from, base, p) + Math.sin(t * .9) * 4; T(wrap, { y: (1 - p) * 750, s: lerp(.85, 1, p) }); T(ph, { ry, rx: 5 }); glare(ph, ry); }
function rings(pre, t, a, cx, cy, maxR = 900, per = 1.3) { for (let i = 0; i < 3; i++) { const p = t < a ? 0 : ((t - a + i * per / 3) % per) / per; const r = 120 + p * maxR; const e = el(pre + i); e.style.width = e.style.height = r + 'px'; e.style.left = (cx - r / 2) + 'px'; e.style.top = (cy - r / 2) + 'px'; O(e, t < a ? 0 : (1 - p) * .8); } }
function countTo(id, t, a, d, to) { el(id).textContent = fmt(to * P(t, a, d, E.oQ)); }

const S0T = [0.25, 1.0, 1.65, 2.42];
function uS0(t) {
  T('s0sweep', { x: ((t * 1600) % 3200) }); T('s0k', { o: P(t, .05, .3), x: (1 - P(t, .05, .5, E.oE)) * -60 });
  for (let i = 0; i < 3; i++) {
    const a = S0T[i], b = S0T[i + 1], on = t >= a && t < b - .02;
    const lt = t - a;
    el('s0w' + i).querySelectorAll('.wi').forEach((w, k) => { const q = P(lt, k * .018, .32, E.oE); w.style.transform = `translateY(${(1 - q) * 110}%)`; });
    O('s0w' + i, on ? 1 : 0);
    const p = pop(lt, 0, .45, E.oB2); T('s0i' + i, { s: on ? p : 0, r: (1 - p) * 40 + Math.sin(t * 3) * 4, o: on ? 1 : 0 });
  }
  O('s0q', 0);
}
function uS1(t) {
  for (let i = 0; i < 7; i++) { const p = pop(t, 2.5 + i * .08, .5, E.oB); const b = $('s1b' + i); b.setAttribute('transform', `translate(0,${(1 - p) * 700})`); }
  const [p, l] = s1ln; const lp = P(t, 2.8, 1.3, E.ioC); p.style.strokeDashoffset = l * (1 - lp);
  const pt = p.getPointAtLength(l * lp); $('s1dot').setAttribute('transform', `translate(${pt.x},${pt.y}) scale(${lp > 0 ? 1 : 0})`);
  wordsIn('s1t', t, 2.45, .09, .55);
  const lk = pop(t, 4.25, .6, E.oB2); T('s1lock', { s: lk, o: clamp(lk * 3), x: (1 - lk) * -80 });
}
function uS2(t) {
  wordsIn('s2t', t, 5.5, .06, .5, E.oE, 8.7, .3);
  wordsIn('s2u', t, 9.0, .06, .5);
  const mv = P(t, 8.8, .8, E.ioC);
  T('s2wrap', { x: lerp(0, -420, mv) });
  phoneIn('s2wrap', 's2pA', t, 5.5, -40, lerp(-8, 16, mv));
  const pb = P(t, 9.0, .9, E.oE), ryb = lerp(60, -14, pb) + Math.sin(t) * 4; T('s2wrapB', { y: (1 - pb) * 1000, x: lerp(300, 0, pb), o: t > 8.95 ? 1 : 0 }); T('s2pB', { ry: ryb, rx: 5 }); glare('s2pB', ryb);
  ECO.forEach(([, , x, y], i) => {
    const p = pop(t, 6.2 + i * .25, .5, E.oB2);
    T('s2n' + i, { s: p * (1 - mv * .0), o: clamp(p * 3) * (1 - mv), y: Math.sin(t * 2 + i) * 6 });
    O('s2l' + i, clamp(p) * .7 * (1 - mv));
    const q = ((t - 6.6 - i * .2) % 1.2) / 1.2, on = t > 6.6 && mv < .5;
    T('s2p' + i, { x: lerp(960, x, clamp(q)), y: lerp(560, y, clamp(q)), o: on ? Math.sin(clamp(q) * Math.PI) : 0 });
  });
  el('h2rl').style.transform = `translateY(${-P(t, 10.3, 1.5, E.ioC) * 230}px)`;
}
function uS3(t) {
  wordsIn('s3t', t, 12.45, .1, .5);
  [13.6, 14.55].forEach((a, i) => { const p = P(t, a, .5, E.oE); T('s3f' + i, { x: (1 - p) * -200, o: p }); });
  phoneIn('s3wrap', 's3ph', t, 12.42, 50, -12);
  const f = P(t, 12.65, .45, E.oE); T('c3form', { y: (1 - f) * 700 });
  const txt = 'Poulet braisé', n = Math.floor(P(t, 12.95, .55, E.lin) * txt.length); el('c3typ').textContent = txt.slice(0, n);
  O('c3cur', Math.floor(t * 3) % 2 === 0 ? 1 : 0);
  el('c3fpr').textContent = t < 13.65 ? '0' : fmt(Math.round(lerp(3000, 3500, P(t, 13.85, .4)) / 100) * 100);
  el('c3fst').textContent = Math.round(lerp(0, 20, P(t, 14.6, .6, E.oC)));
  tap('c3tap', t, 14.75, 330, 562);
  el('c3ok').style.clipPath = `circle(${P(t, 15.15, .3, E.oC) * 260}px at 50% 50%)`;
  [0, 1, 2].forEach(i => { const p = pop(t, 12.9 + i * .2, .5, E.oB2); T('s3k' + i, { s: p, y: Math.sin(t * 2 + i) * 12, r: Math.sin(t + i) * 8, o: p > 0 ? 1 : 0 }); });
}
function uS4(t) {
  wordsIn('s4t', t, 15.65, .08, .5); wordsIn('s4s', t, 17.4, .05, .45);
  phoneIn('s4wrap', 's4ph', t, 15.62, -60, -12);
  for (let i = 0; i < 5; i++) {
    const a = 16.2 + i * .35, p = P(t, a, .9, E.ioC), R = rng(i + 11);
    const x0 = 200 + R() * 700, y0 = 650 + R() * 280;
    T('s4o' + i, { x: lerp(x0, 1260, p), y: lerp(y0, 760, p), s: lerp(1, .3, p), o: t < a - .4 ? 0 : (t < a ? clamp((t - a + .4) * 3) : 1 - P(t, a + .7, .2)) });
  }
  countTo('d4ord', t, 16.4, 2.4, 23);
}
const S5ST = [20.5, 21.85, 22.95, 25.0];
function uS5(t) {
  wordsIn('s5t', t, 19.2, .08, .45);
  const n = P(t, 19.2, .5, E.oB); T('s5n', { y: (1 - n) * -260, o: clamp(n * 3), s: 1 + .03 * Math.sin(t * 8) * (t < 20.6 ? 1 : 0) });
  rings('s5r', t, 19.4, 1400, 105, 700, 1.1);
  phoneIn('s5wrap', 's5ph', t, 19.25, 40, -12);
  const act = S5ST.filter(a => t >= a).length - 1;
  S5ST.forEach((a, i) => { const p = P(t, a - .05, .45, E.oE), e = el('s5s' + i); T(e, { x: (1 - p) * -80, o: clamp(p * 2) * (i === act ? 1 : .5) }); e.querySelector('.s5d').style.background = i <= act ? OR : '#EDEAE6'; e.querySelector('.s5d').style.color = i <= act ? '#fff' : '#999'; e.querySelector('.s5l').style.color = i === act ? INK : '#999'; });
  tap('o5tap', t, 21.75, 300, 512);
  O('o5btns', t < 21.95 ? 1 : 0); O('o5prog', t >= 21.95 ? 1 : 0);
  el('o5stat').textContent = t < 22.95 ? 'En préparation' : t < 24.0 ? 'Prête · livreur assigné' : t < 25.0 ? 'Livreur en route' : 'Livrée ✓';
  el('o5prog').style.background = t >= 25.0 ? '#12B76A' : INK;
  const lvl = t < 20.5 ? 0 : t < 21.95 ? 1 : t < 22.95 ? 2 : t < 24.0 ? 3 : t < 25.0 ? 4 : 5;
  STEPS.forEach((_, i) => { el('o5dot' + i).style.background = i < lvl ? '#12B76A' : '#E5E7EB'; el('o5lb' + i).style.color = i < lvl ? '#111' : '#999'; });
  const m = P(t, 23.5, 2.0, E.ioC); T('s5moto', { x: lerp(500, -560, m), y: Math.sin(t * 22) * 2, o: t > 23.4 && t < 25.6 ? 1 : 0 });
}
function uS6(t) {
  wordsIn('s6t', t, 25.9, .07, .5);
  phoneIn('s6wrap', 's6ph', t, 25.9, -50, -6);
  countTo('r6bal', t, 26.3, 2.2, 125450);
  [0, 1, 2, 3].forEach(i => { const p = pop(t, 27.0 + i * .2, .45); T('r6h' + i, { s: p, o: clamp(p * 2) }); });
  [28.1, 28.9, 29.6].forEach((a, i) => { const p = pop(t, a, .55, E.oB); T('s6c' + i, { x: (1 - p) * (i < 2 ? -300 : 300), o: clamp(p * 3), y: Math.sin(t * 1.6 + i) * 6 }); });
  const g = pop(t, 30.4, .55, E.oB); T('s6g', { y: (1 - g) * 300, o: clamp(g * 3) });
  const [p, l] = s6ln; p.style.strokeDashoffset = l * (1 - P(t, 30.6, 1.4, E.ioC));
}
const S7T = [32.9, 33.8, 34.5, 35.5, 36.0, 36.6, 37.3];
function uS7(t) { S7T.forEach((a, i) => { const p = P(t, a, .6, E.oB), act = t >= a && (i === 6 || t < S7T[i + 1]); T('s7c' + i, { ry: (1 - p) * -95, y: (1 - p) * 140 + Math.sin(t * 1.6 + i) * 5, o: clamp((t - a) * 5), s: act ? 1.06 : 1 }); el('s7c' + i).style.borderColor = act ? OR : 'rgba(255,255,255,.08)'; el('s7c' + i).style.boxShadow = act ? '0 0 60px rgba(255,107,0,.35)' : 'none'; }); }
function uS8(t) {
  wordsIn('s8t', t, 38.2, .1, .5); wordsIn('s8s', t, 40.65, .05, .45);
  T('s8cnt', { y: (1 - P(t, 39.0, .5, E.oE)) * 200, o: P(t, 39.0, .3) }); countTo('s8n', t, 39.2, 3.5, 1250);
  T('s8shop', { s: pop(t, 38.4, .55, E.oB2), r: Math.sin(t * 2) * 4 });
  rings('s8r', t, 40.6, 1420, 540, 900, 1.4);
  AV.forEach((_, i) => { const p = pop(t, 40.75 + i * .14, .45, E.oB2); T('s8a' + i, { s: p, y: Math.sin(t * 2 + i) * 8, o: p > 0 ? 1 : 0 }); });
}
const S9T = [43.29, 44.58, 45.9, 47.22];
function uS9(t) {
  for (let i = 0; i < 3; i++) {
    const on = t >= S9T[i] && t < S9T[i + 1]; el('s9f' + i).style.display = on ? 'block' : 'none'; if (!on) continue;
    const lt = t - S9T[i];
    el('s9t' + i).querySelectorAll('div:first-child .wi').forEach((w, k) => { const q = P(lt, k * .06, .4, E.oE); w.style.transform = `translateY(${(1 - q) * 110}%)`; w.style.visibility = 'visible'; });
    el('s9t' + i).querySelectorAll('div:last-child .wi').forEach((w, k) => { const q = P(lt, .08 + k * .02, .35, E.oE); w.style.transform = `translateY(${(1 - q) * 110}%)`; });
    T('s9g' + i, { s: lerp(1.3, 1, P(lt, 0, .5, E.oE)) + lt * .04, r: lt * 6, o: P(lt, 0, .3) });
  }
}
function uS10(t) {
  wordsIn('s10t', t, 47.3, .07, .5); wordsIn('s10u', t, 49.9, .07, .5);
  const K = ['A', 'B', 'C', 'D', 'E'], pos = [-2, -1, 0, 1, 2];
  K.forEach((k, i) => {
    const d = pos[i], p = P(t, 47.25 + Math.abs(d) * .12, 1.0, E.oE), sw = Math.sin(t * .8 + i) * 3;
    const spread = lerp(0, 1, P(t, 47.6, 1.2, E.ioC));
    T('s10w' + k, { x: d * 360 * spread, y: (1 - p) * 800 + Math.abs(d) * 70 * spread, s: d === 0 ? 1 : .86 });
    T('s10p' + k, { ry: -d * 18 * spread + sw, r: d * 5 * spread, rx: 4 }); glare('s10p' + k, -d * 18 + sw);
    el('s10w' + k).style.zIndex = 10 - Math.abs(d);
  });
  ['c10', 'o10', 'd10', 'r10'].forEach(() => 0);
  countTo('d10sales', t, 47.6, 2.5, 48500); countTo('r10bal', t, 47.6, 2.5, 125450);
}
function uS11(t) {
  circleClip('s11', t, 51.8, .5, 960, 280);
  T('s11glow', { s: 1 + .06 * Math.sin(t * 2), o: P(t, 51.9, .6) });
  const sky = P(t, 51.95, .6, E.oE); T('s11sky', { y: (1 - sky) * 60, o: sky });
  el('s11map').style.clipPath = `inset(50% ${4 + (1 - P(t, 52.15, .55, E.oC)) * 92}% 30% 4%)`;
  const sl = P(t, 52.35, .55, E.oB); T('s11sgl', { x: (1 - sl) * -240, o: clamp(sl * 2) }); T('s11sgr', { x: (1 - sl) * 240, o: clamp(sl * 2) });
  const dp = P(t, 52.55, .7, E.oBo), sq = t > 53.0 ? Math.exp(-(t - 53.0) * 9) * Math.sin((t - 53.0) * 30) : 0; el('s11pin').style.transformOrigin = '50% 70%'; T('s11pin', { y: (1 - dp) * -560, sx: 1 + sq * .08, sy: 1 - sq * .08, o: t > 52.55 ? 1 : 0 });
  const bn = P(t, 53.0, .5, E.oB); el('s11ban').style.transformOrigin = '50% 72%'; T('s11ban', { sx: bn, o: clamp(bn * 3) });
  T('s11tag', { o: P(t, 53.35, .4), y: (1 - P(t, 53.35, .5, E.oE)) * 20 });
  T('s11sh', { x: lerp(-100, 900, P(t, 53.7, .9, E.ioC)) });
  T('s11logo', { y: Math.sin(t * 1.8) * 5 * (t > 54 ? 1 : 0), s: 1 + .01 * Math.sin(t * 2.2) });
  el('s11w').querySelectorAll('.wi').forEach((w, k) => { const q = P(t, 53.5 + k * .04, .45, E.oB); w.style.transform = `translateY(${(1 - q) * 110}%)`; });
  wordsIn('s11s', t, 53.95, .1, .5);
  [55.6, 55.75].forEach((a, i) => { const p = pop(t, a, .55); T('s11st' + i, { y: (1 - p) * 80, o: clamp(p * 2) }); });
  const c = pop(t, 56.1, .55, E.oB2); T('s11cta', { s: c * (1 + .03 * Math.sin(t * 5) * (t > 57 ? 1 : 0)), o: clamp(c * 2) });
  O('fade', P(t, 59.05, .45, E.lin));
}
const UPD = { s0: uS0, s1: uS1, s2: uS2, s3: uS3, s4: uS4, s5: uS5, s6: uS6, s7: uS7, s8: uS8, s9: uS9, s10: uS10, s11: uS11 };
