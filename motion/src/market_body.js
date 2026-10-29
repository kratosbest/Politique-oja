/* ============================================================
   BUILD DOM — OJA Market (food & shops delivery, 50 s VO + logo outro)
   ============================================================ */
Object.assign(ICONS, {
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  back: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  recycle: '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
});
const st0 = document.createElement('style');
st0.textContent = `
.ip{position:absolute;width:430px;height:900px;border-radius:74px;padding:11px;background:linear-gradient(145deg,#8d8d93,#3a3a3f 30%,#1c1c1f 60%,#77777d);box-shadow:0 0 0 2px #0c0c0e inset,0 80px 140px rgba(0,0,0,.5);transform-style:preserve-3d}
.ip .scr{position:relative;width:408px;height:878px;border-radius:63px;overflow:hidden;background:#F6F6F6;color:#111;font-family:Inter}
.ip .isl{position:absolute;top:12px;left:50%;width:122px;height:36px;margin-left:-61px;border-radius:20px;background:#000;z-index:20}
.ip .glare{position:absolute;inset:0;border-radius:63px;background:linear-gradient(115deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.22) 45%,rgba(255,255,255,0) 60%);z-index:21;pointer-events:none}
.sb{position:absolute;top:17px;left:36px;right:30px;display:flex;justify-content:space-between;font:600 17px Inter;z-index:19}
.a-card{background:#fff;border-radius:22px;box-shadow:0 4px 14px rgba(0,0,0,.06)}
.a-chip{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:20px;background:#fff;border:1.5px solid #ECECEC;font:600 15px Inter;white-space:nowrap}
.a-chip.on{background:#C2410C;border-color:#C2410C;color:#fff}
.emo{display:grid;place-items:center;font-family:'Noto Color Emoji';line-height:1}
.stk{position:absolute;display:grid;place-items:center;border-radius:50%;background:#fff;box-shadow:0 24px 50px rgba(0,0,0,.25);font-family:'Noto Color Emoji';line-height:1;overflow:hidden}
.stk img{width:100%;height:100%;object-fit:cover}
.tile{position:absolute;width:380px;height:470px;border-radius:44px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.18);background:#fff;color:#111}
.hl3{color:#FF6B00}.hly{color:#FFC83D}
`;
document.head.appendChild(st0);
const stage = $('stage');
let H = '';
const PHOTO = { shawarma: 'assets/food_shawarma.jpg', croissant: 'assets/food_croissant.jpg' };
// food visual: photo or emoji tile
const fv = (k, w, h, r = 18, bg = '#FFE7D1') => PHOTO[k] ? `<div style="width:${w}px;height:${h}px;border-radius:${r}px;overflow:hidden"><img src="${PHOTO[k]}" style="width:100%;height:100%;object-fit:cover;display:block"></div>`
  : `<div class="emo" style="width:${w}px;height:${h}px;border-radius:${r}px;background:${bg};font-size:${Math.min(w, h) * .55}px">${k}</div>`;
const sticker = (id, k, s, x, y, bg = '#fff') => `<div id="${id}" class="stk" style="left:${x - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s}px;background:${bg};font-size:${s * .56}px">${PHOTO[k] ? `<img src="${PHOTO[k]}">` : k}</div>`;
const sbar = (c = '#111') => `<div class="sb" style="color:${c}"><span>9:41</span><span style="display:flex;gap:6px;align-items:center"><svg width="20" height="13" viewBox="0 0 22 14"><rect x="0" y="9" width="4" height="5" rx="1" fill="${c}"/><rect x="6" y="6" width="4" height="8" rx="1" fill="${c}"/><rect x="12" y="3" width="4" height="11" rx="1" fill="${c}"/><rect x="18" y="0" width="4" height="14" rx="1" fill="${c}"/></svg><svg width="28" height="13" viewBox="0 0 30 14"><rect x=".5" y=".5" width="25" height="13" rx="4" fill="none" stroke="${c}" opacity=".6"/><rect x="3" y="3" width="17" height="8" rx="2" fill="${c}"/></svg></span></div>`;
const iphone = (id, inner, x, y) => `<div id="${id}" class="ip" style="left:${x}px;top:${y}px"><div class="scr">${inner}<div class="isl"></div></div><div class="glare" id="${id}g"></div></div>`;

const RESTOS = [['shawarma', 'Shawarma House', 'Fast food · 1,2 km', '4.8'], ['🥘', 'Maquis Chez Tanti', 'Cuisine locale · 0,8 km', '4.9'], ['croissant', 'Boulangerie du Coin', 'Viennoiseries · 1,5 km', '4.7'], ['🍔', 'Burger Station', 'Fast food · 2,1 km', '4.6'], ['🍕', 'Pizza Fidjrossè', 'Pizzeria · 2,4 km', '4.8']];
const SHOPS = [['🛒', 'Supermarché'], ['💊', 'Pharmacie'], ['👗', 'Mode'], ['📱', 'Électronique'], ['💄', 'Beauté'], ['🏠', 'Maison']];
function scrHome(p) {
  return `${sbar('#fff')}
<div class="abs" style="left:0;top:0;width:408px;height:150px;background:#FF6B00"></div>
<div class="abs" style="left:18px;top:62px;width:52px;height:52px;border-radius:16px;background:rgba(255,255,255,.2);display:grid;place-items:center">${ic('grid', 24, '#fff', 2.2)}</div>
<div class="abs" style="left:0;right:0;top:66px;display:flex;justify-content:center;align-items:center;gap:8px"><img src="assets/mk_logo.png" style="width:40px;height:40px;background:#fff;border-radius:50%;padding:2px"><span style="font:900 30px Poppins;color:#fff">OJA</span><span style="padding:3px 10px;border-radius:8px;background:rgba(255,255,255,.25);color:#fff;font:700 15px Inter">Market</span></div>
<div class="abs" style="right:18px;top:62px;width:52px;height:52px;border-radius:16px;background:rgba(255,255,255,.2);display:grid;place-items:center">${ic('map', 24, '#fff', 2.2)}</div>
<div class="abs a-card" style="left:16px;right:16px;top:164px;height:56px;border:2px solid #C2410C;display:flex;align-items:center;gap:12px;padding:0 16px;font:500 16px Inter;color:#777">${ic('search', 22, '#111', 2.4)}Rechercher un plat ou une boutique</div>
<div class="abs a-card" style="left:16px;right:16px;top:232px;height:78px;display:flex;align-items:center;gap:14px;padding:0 16px">
<div style="width:48px;height:48px;border-radius:14px;background:#FFF1E6;display:grid;place-items:center">${ic('bag', 24, '#C2410C', 2.2)}</div>
<div style="flex:1"><div style="font:800 20px Poppins">Oja Marketplace</div><div style="font:500 13px Inter;color:#666">Restaurants et boutiques proches de vous.</div></div>${ic('nav', 22, '#C2410C', 2.2, '#C2410C')}</div>
<div class="abs a-card" style="left:16px;right:16px;top:322px;height:52px;padding:4px"><div id="${p}seg" class="abs" style="left:4px;top:4px;width:184px;height:44px;border-radius:16px;background:#C2410C"></div>
<div class="abs" style="left:4px;top:4px;width:184px;height:44px;display:flex;align-items:center;justify-content:center;gap:8px;font:700 16px Inter" id="${p}sr">${ic('utensils', 18, 'currentColor', 2.2)}Restaurants</div>
<div class="abs" style="left:188px;top:4px;width:184px;height:44px;display:flex;align-items:center;justify-content:center;gap:8px;font:700 16px Inter" id="${p}sm">${ic('store', 18, 'currentColor', 2.2)}Magasins</div></div>
<div class="abs" style="left:16px;top:388px;display:flex;gap:8px"><span class="a-chip on">Tous</span><span class="a-chip">Ouverts</span><span class="a-chip">Top notés</span><span class="a-chip">Promos</span></div>
<div class="abs" style="left:0;top:440px;width:408px;height:350px;overflow:hidden">
<div id="${p}rl" class="abs" style="left:16px;top:0;width:376px">${RESTOS.map(([k, n, m, r], i) => `<div class="a-card" style="position:relative;height:220px;margin-bottom:14px;overflow:hidden">${fv(k, 376, 140, 0, ['#FFE7D1', '#FFE9B8', '#FFE7D1', '#FFE0E0', '#E3F4E8'][i])}
<div class="abs" style="right:12px;top:12px;padding:5px 12px;border-radius:14px;background:#12B76A;color:#fff;font:800 12px Inter">OUVERT</div>
<div id="${p}hrt${i}" class="abs" style="right:14px;top:156px">${ic('heart', 26, '#999', 2.2)}</div>
<div style="padding:12px 16px 0"><div style="font:800 19px Poppins">${n}</div><div style="font:500 13px Inter;color:#777;margin-top:2px">${m} · <span style="color:#F59E0B">★</span> ${r}</div></div></div>`).join('')}</div>
<div id="${p}sl" class="abs" style="left:16px;top:0;width:376px;opacity:0">
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">${SHOPS.map(([e, n], i) => `<div id="${p}sh${i}" class="a-card" style="height:112px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px"><div class="emo" style="font-size:42px">${e}</div><div style="font:700 13px Inter">${n}</div></div>`).join('')}</div>
<div class="a-card" style="margin-top:12px;height:96px;display:flex;align-items:center;gap:14px;padding:0 14px"><div class="emo" style="width:68px;height:68px;border-radius:16px;background:#E3F4E8;font-size:40px">🛍️</div><div><div style="font:800 17px Poppins">Boutique Ganhi Center</div><div style="font:500 13px Inter;color:#777">Mode & accessoires · 1,1 km</div></div></div></div></div>
<div class="abs" style="left:14px;right:14px;top:796px;height:66px;border-radius:24px;background:#1E1E22;display:flex;justify-content:space-around;align-items:center;color:#ddd;font:600 11px Inter">
${[['home', 'Accueil'], ['recycle', 'NOVOJA'], ['car', 'Transport'], ['store', 'Market'], ['user', 'Profil']].map(([icn, lb], i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;${i === 3 ? 'color:#FF8A1F' : ''}">${ic(icn, 20, i === 3 ? '#FF8A1F' : '#ddd', 2)}${lb}</div>`).join('')}</div>
<div id="${p}tap" class="abs" style="left:0;top:0;width:70px;height:70px;margin:-35px;border-radius:50%;background:rgba(255,107,0,.35);border:3px solid #FF6B00;opacity:0;z-index:18"></div>`;
}
const MENU = [['shawarma', 'Shawarma poulet', '2 500', '3 000'], ['croissant', 'Croissants x3', '1 000', '1 200'], ['🍗', 'Poulet braisé', '3 500', ''], ['🥤', 'Jus de bissap', '700', '']];
function scrMenu(p) {
  return `${sbar()}
<div class="abs" style="left:18px;top:56px;width:52px;height:52px;border-radius:16px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.1);display:grid;place-items:center">${ic('back', 24, '#111', 2.4)}</div>
<div class="abs" style="left:86px;top:66px;font:800 24px Poppins">Maquis Chez Tanti</div>
<div class="abs a-card" style="left:16px;right:16px;top:124px;height:54px;display:flex;align-items:center;gap:12px;padding:0 16px;font:500 16px Inter;color:#777">${ic('search', 22, '#111', 2.4)}Rechercher un plat, une boisson…</div>
<div class="abs" style="left:16px;top:192px;display:flex;gap:8px"><span class="a-chip" style="background:#111;color:#fff;border-color:#111">Tout 4</span><span class="a-chip">Promos 2</span><span class="a-chip">Disponibles 4</span></div>
<div class="abs" style="left:16px;top:250px;width:376px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
${MENU.map(([k, n, pr, old], i) => `<div id="${p}it${i}" class="a-card" style="position:relative;height:282px;padding:10px">${fv(k, 162, 150, 16, ['#FFE7D1', '#FFE7D1', '#FFE9B8', '#FFE0E0'][i])}
${old ? `<div class="abs" style="left:18px;top:18px;padding:4px 10px;border-radius:10px;background:#E8112D;color:#fff;font:800 12px Inter">Promo</div>` : ''}
<div style="font:700 11px Inter;color:#888;margin-top:10px;letter-spacing:.06em">CHEZ TANTI</div><div style="font:800 16px Poppins;margin-top:2px">${n}</div>
<div style="font:800 16px Inter;margin-top:8px;color:${old ? '#E8112D' : '#111'}">${old ? `<s style="color:#999;font-weight:600;font-size:13px">${old}</s> ` : ''}${pr} <span style="font-size:12px">XOF</span></div>
<div class="abs" style="right:10px;bottom:10px;width:42px;height:42px;border-radius:50%;background:#FF6B00;display:grid;place-items:center">${ic('bag', 20, '#fff', 2.2)}</div></div>`).join('')}</div>
<div id="${p}cart" class="abs" style="left:16px;right:16px;top:790px;height:66px;border-radius:22px;background:#111;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 20px;font:700 17px Inter;z-index:5">
<span style="display:flex;align-items:center;gap:10px"><span style="width:30px;height:30px;border-radius:50%;background:#FF6B00;display:grid;place-items:center;font:800 15px Inter">1</span>Voir le panier</span><span>2 500 XOF</span></div>
<div id="${p}tap" class="abs" style="left:0;top:0;width:70px;height:70px;margin:-35px;border-radius:50%;background:rgba(255,107,0,.35);border:3px solid #FF6B00;opacity:0;z-index:18"></div>`;
}
function scrCheckout(p) {
  return `${sbar()}
<div class="abs" style="left:18px;top:56px;width:52px;height:52px;border-radius:16px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.1);display:grid;place-items:center">${ic('back', 24, '#111', 2.4)}</div>
<div class="abs" style="left:86px;top:66px;font:800 24px Poppins">Paiement OJA</div>
<div class="abs" style="left:16px;top:124px;width:184px;height:74px;border-radius:20px;border:2px solid #FF6B00;background:#FFF1E6;padding:12px 14px"><div style="font:800 16px Inter;color:#E85D00">Livraison OJA</div><div style="font:600 14px Inter;color:#E85D00">800 XOF</div></div>
<div class="abs a-card" style="left:208px;top:124px;width:184px;height:74px;padding:12px 14px"><div style="font:800 16px Inter">À emporter</div><div style="font:600 14px Inter;color:#777">Gratuit</div></div>
<div class="abs" style="left:16px;right:16px;top:212px;height:70px;border-radius:20px;background:#FFE4D2;display:flex;align-items:center;gap:12px;padding:0 16px;font:700 15px Inter">${ic('lock', 24, '#111', 2.2)}Paiement Mobile Money sécurisé après validation.</div>
<div class="abs a-card" style="left:16px;right:16px;top:296px;height:62px;display:flex;align-items:center;gap:12px;padding:0 16px;font:600 17px Inter">${ic('pin', 22, '#111', 2.2)}Haie Vive, Cotonou</div>
<div class="abs" style="left:18px;top:376px;font:800 18px Inter">Choisissez votre mode de livraison</div>
<div id="${p}velo" class="abs" style="left:16px;right:16px;top:410px;height:104px;border-radius:20px;border:2px solid #12B76A;background:#E7F6EF;padding:14px 16px">
<div style="display:flex;justify-content:space-between"><b style="font:800 18px Inter">Vélo</b><b style="font:800 17px Inter;color:#12B76A">800 XOF</b></div><div style="font:500 13px Inter;color:#555;margin-top:4px;width:280px">Livraison économique confiée à un livreur à vélo.</div>
<div class="abs" style="right:16px;top:50px;width:26px;height:26px;border-radius:50%;border:3px solid #12B76A;display:grid;place-items:center"><div style="width:12px;height:12px;border-radius:50%;background:#12B76A"></div></div></div>
<div class="abs a-card" style="left:16px;right:16px;top:526px;height:104px;padding:14px 16px;border:1.5px solid #E2E2E2">
<div style="display:flex;justify-content:space-between"><b style="font:800 18px Inter">Livraison OJA</b><b style="font:800 17px Inter;color:#E85D00">1 200 XOF</b></div><div style="font:500 13px Inter;color:#555;margin-top:4px;width:280px">Moto, tricycle ou voiture : OJA choisit le véhicule disponible.</div></div>
<div class="abs a-card" style="left:16px;right:16px;top:644px;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font:700 16px Inter"><span>Commande · 1 article</span><span style="color:#E85D00">2 500 XOF</span></div>
<div class="abs" style="left:0;right:0;top:730px;bottom:0;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 18px 20px">
<div><div style="font:500 13px Inter;color:#666">Mobile Money sécurisé</div><div style="font:800 20px Inter">Total 3 300 XOF</div></div>
<div id="${p}pay" style="position:relative;overflow:hidden;padding:18px 22px;border-radius:18px;background:#C2410C;color:#fff;font:800 17px Inter">PAYER 3 300 XOF<div id="${p}paid" class="abs" style="inset:0;background:#12B76A;display:flex;align-items:center;justify-content:center;gap:6px">${ic('check', 22, '#fff', 3)}Payé</div></div></div>
<div id="${p}tap" class="abs" style="left:0;top:0;width:70px;height:70px;margin:-35px;border-radius:50%;background:rgba(255,107,0,.35);border:3px solid #FF6B00;opacity:0;z-index:18"></div>`;
}
const TRK = 'M70,470 C120,380 170,420 210,330 S300,260 330,170';
function scrTrack(p) {
  return `${sbar()}
<svg class="abs" style="left:0;top:0" width="408" height="600" viewBox="0 0 408 600"><rect width="408" height="600" fill="#EDE8E1"/>
<g stroke="#fff" stroke-width="12" fill="none"><path d="M-20,140 L430,90"/><path d="M-20,300 L430,260"/><path d="M-20,470 L430,430"/><path d="M90,-20 L130,620"/><path d="M250,-20 L300,620"/><path d="M-20,560 C120,520 280,560 430,520"/></g>
<g stroke="#fff" stroke-width="5" fill="none" opacity=".9"><path d="M-20,210 L430,175"/><path d="M-20,385 L430,345"/><path d="M40,-20 L70,620"/><path d="M180,-20 L215,620"/><path d="M350,-20 L380,620"/></g>
<rect x="300" y="360" width="80" height="60" rx="10" fill="#CFE8D2"/><rect x="20" y="20" width="60" height="90" rx="10" fill="#CFE8D2"/>
<path id="${p}rt" d="${TRK}" stroke="#FF6B00" stroke-width="7" fill="none" stroke-linecap="round"/>
<circle cx="70" cy="470" r="12" fill="#111" stroke="#fff" stroke-width="4"/>
<g transform="translate(330,170)"><circle r="20" fill="#FF6B00" opacity=".25"/><circle r="11" fill="#FF6B00" stroke="#fff" stroke-width="4"/></g>
<g id="${p}cur"><circle r="22" fill="#fff" stroke="#FF6B00" stroke-width="3"/><text y="9" text-anchor="middle" font-size="24" font-family="Noto Color Emoji">🛵</text></g></svg>
<div class="abs" style="left:0;right:0;top:560px;bottom:0;border-radius:28px 28px 0 0;background:#fff;box-shadow:0 -8px 24px rgba(0,0,0,.08);padding:22px 20px">
<div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font:800 22px Poppins">Votre commande arrive</div><div style="font:500 14px Inter;color:#777">Maquis Chez Tanti → Haie Vive</div></div><div style="font:900 30px Poppins;color:#FF6B00"><span id="${p}eta">12</span><span style="font-size:16px"> min</span></div></div>
<div style="display:flex;gap:6px;margin-top:18px">${[0, 1, 2, 3].map(i => `<div style="flex:1;height:8px;border-radius:4px;background:#EEE;overflow:hidden"><div id="${p}st${i}" style="height:8px;width:0;background:#FF6B00"></div></div>`).join('')}</div>
<div style="display:flex;justify-content:space-between;font:600 12px Inter;color:#888;margin-top:8px"><span>Acceptée</span><span>Préparation</span><span>En route</span><span>Livrée</span></div>
<div style="display:flex;align-items:center;gap:12px;margin-top:18px"><div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#FF8A1F,#C2410C);display:grid;place-items:center;color:#fff;font:800 18px Poppins">KA</div><div><div style="font:800 17px Inter">Koffi · Livreur OJA</div><div style="font:500 13px Inter;color:#777">Moto · ★ 4,9</div></div></div></div>`;
}

/* S0 — "Vos restaurants préférés sont maintenant à portée de main. En un seul clic avec OJA Market." */
const ORB = [['shawarma', 150, '#fff'], ['🍔', 130, '#FFE9B8'], ['croissant', 140, '#fff'], ['🍕', 120, '#FFE0E0'], ['🥘', 130, '#FFE7D1'], ['🍦', 110, '#E3F4E8'], ['🥤', 110, '#FFE7D1']];
H += `<div class="scene" id="s0" style="background:radial-gradient(ellipse at 65% 45%,#3A2414 0%,#141414 60%)">
<div id="s0glow" class="abs" style="left:880px;top:-60px;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,.45),rgba(255,107,0,0) 62%)"></div>
${ORB.map(([k, s, bg], i) => sticker('s0o' + i, k, s, 0, 0, bg)).join('')}
${iphone('s0ph', scrHome('h0'), 1250, 90)}
<div id="s0t" class="abs H" style="left:130px;top:300px;color:#fff;font-size:104px"><div>${W('Vos restaurants')}</div><div>${W('préférés,')}</div><div>${W('à portée de *main.*', 'hl3')}</div></div>
<div id="s0u" class="abs H" style="left:130px;top:330px;color:#fff;font-size:120px"><div>${W('En un seul')}</div><div>${W('*clic.*', 'hl3')}</div></div>
<div id="s0lock" class="abs" style="left:130px;top:640px;display:flex;align-items:center;gap:22px"><div style="width:130px;height:130px;border-radius:50%;background:#fff;display:grid;place-items:center"><img src="assets/mk_logo.png" style="width:112px"></div><div class="H" style="font-size:96px;color:#fff">OJA <span style="color:#FF6B00">Market</span></div></div>
<div id="s0burst" class="abs" style="left:0;top:0;width:10px;height:10px;border-radius:50%;background:#FF6B00"></div>
</div>`;

/* S2 — "Envie de votre plat préféré ? Plus besoin de vous déplacer." */
H += `<div class="scene" id="s2" style="background:radial-gradient(circle at 60% 45%,#FF8A2E 0%,#FF6B00 45%,#D94F00 100%)">
${[['shawarma', 300, 1400, 330], ['croissant', 220, 1690, 680], ['🍗', 200, 1150, 760], ['🍕', 180, 1720, 250]].map(([k, s, x, y], i) => sticker('s2f' + i, k, s, x, y, ['#fff', '#fff', '#FFE7D1', '#FFE0E0'][i])).join('')}
<div id="s2a" class="abs H" style="left:140px;top:330px;font-size:130px;color:#fff"><div>${W('Envie de votre')}</div><div style="color:#141414">${W('plat préféré ?')}</div></div>
<div id="s2b" class="abs H" style="left:140px;top:300px;font-size:130px;color:#fff"><div>${W('Plus besoin de')}</div><div style="color:#141414">${W('vous déplacer.')}</div></div>
<div id="s2home" class="abs c" style="left:1320px;top:250px;width:380px;height:380px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 40px 80px rgba(120,40,0,.35)"><div class="emo" style="font-size:210px">🏠</div></div>
<div id="s2moto" class="abs" style="left:0;top:560px;width:560px"><img src="assets/moto.png" style="width:560px;display:block;filter:drop-shadow(0 30px 30px rgba(80,20,0,.4))"></div>
${[0, 1, 2, 3].map(k => `<div class="abs s2ln" style="left:0;top:${640 + k * 60}px;height:${6 + k % 2 * 4}px;width:${240 + k * 90}px;border-radius:6px;background:rgba(255,255,255,.55)"></div>`).join('')}
</div>`;

/* S3 — app flow: ouvrez / découvrez / choisissez / commandez / faites-vous livrer */
const STEPS = ['Ouvrez OJA', 'Découvrez', 'Choisissez', 'Commandez', 'Faites-vous livrer'];
H += `<div class="scene" id="s3" style="background:#141414">
<div class="abs" style="inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 2px,transparent 2px);background-size:46px 46px"></div>
<div id="s3glow" class="abs" style="left:780px;top:-100px;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,.32),rgba(255,107,0,0) 62%)"></div>
${STEPS.map((s, i) => `<div id="s3s${i}" class="abs" style="left:140px;top:${200 + i * 140}px;display:flex;align-items:center;gap:28px"><div class="H s3n" style="width:96px;height:96px;border-radius:28px;background:#242424;color:#777;display:grid;place-items:center;font-size:40px">0${i + 1}</div><div class="H s3l" style="font-size:66px;color:#fff">${s}</div></div>`).join('')}
<div id="s3wrap" class="abs" style="left:1180px;top:90px;width:430px;height:900px;transform-style:preserve-3d">
${iphone('s3pA', scrHome('h3'), 0, 0)}${iphone('s3pB', scrMenu('m3'), 0, 0)}${iphone('s3pC', scrCheckout('c3'), 0, 0)}${iphone('s3pD', scrTrack('t3'), 0, 0)}</div>
${[['🛵', 1720, 240], ['📍', 1060, 820]].map(([e, x, y], i) => sticker('s3k' + i, e, 130, x, y, '#fff')).join('')}
</div>`;

/* S4 — catégories */
const CATS = [['🍲', 'Restaurants', 'du quartier', '#FFE7D1'], ['shawarma', 'Fast food', 'rapide & bon', '#fff'], ['🥘', 'Cuisine', 'locale', '#FFE9B8'], ['❤️', 'Vos bonnes', 'adresses', '#FFE0E0']];
H += `<div class="scene" id="s4" style="background:#FFFFFF;color:#111">
${[0, 1, 2].map(i => `<div id="s4b${i}" class="abs" style="left:${[-200, 1500, 700][i]}px;top:${[-250, 600, 820][i]}px;width:${[700, 620, 520][i]}px;height:${[700, 620, 520][i]}px;border-radius:50%;background:${['#FFF1E6', '#FFF6D6', '#FFE8E0'][i]}"></div>`).join('')}
<div id="s4t" class="abs H" style="left:0;top:90px;width:1920px;text-align:center;font-size:84px">${W('Tous vos *goûts,* un seul endroit.', 'hl3')}</div>
${CATS.map(([k, a, b, bg], i) => `<div id="s4c${i}" class="tile c" style="left:${140 + i * 420}px;top:300px"><div style="height:300px;background:${bg};display:grid;place-items:center">${PHOTO[k] ? `<img src="${PHOTO[k]}" style="width:380px;height:300px;object-fit:cover">` : `<div class="emo" style="font-size:190px">${k}</div>`}</div>
<div style="padding:28px 32px"><div class="H" style="font-size:46px">${a}</div><div style="font:600 30px Inter;color:#FF6B00;margin-top:4px">${b}</div></div></div>`).join('')}
</div>`;

/* S5 — favoris */
H += `<div class="scene" id="s5" style="background:radial-gradient(ellipse at 70% 40%,#FFE0CC 0%,#FFF7F0 60%);color:#111">
${[0, 1, 2, 3, 4, 5].map(i => `<div id="s5h${i}" class="abs emo" style="left:0;top:0;font-size:${60 + (i % 3) * 30}px">❤️</div>`).join('')}
<div id="s5t" class="abs H" style="left:140px;top:300px;font-size:96px"><div>${W('Retrouvez vos')}</div><div>${W('restaurants *préférés*', 'hl3')}</div></div>
<div id="s5s" class="abs" style="left:144px;top:560px;font:600 44px Inter;color:#555">${W('directement sur OJA Market.')}</div>
${iphone('s5ph', scrHome('h5'), 1250, 90)}
</div>`;

/* S6 — réseau de livraison OJA + véhicules */
const NET = [[260, 300], [520, 210], [820, 330], [1100, 220], [1400, 320], [1680, 240], [380, 560], [700, 620], [1000, 520], [1300, 600], [1600, 540]];
const LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [6, 7], [7, 8], [8, 9], [9, 10], [2, 8], [1, 7], [3, 9], [4, 10], [5, 10], [2, 7]];
H += `<div class="scene" id="s6" style="background:#F3EEE7;color:#111">
<svg class="abs" style="left:0;top:0" width="1920" height="1080" viewBox="0 0 1920 1080">
<g stroke="#fff" stroke-width="18" fill="none">${[120, 400, 700, 980].map(y => `<path d="M-50,${y} L1970,${y - 80}"/>`).join('')}${[200, 620, 1040, 1460, 1800].map(x => `<path d="M${x},-50 L${x + 120},1130"/>`).join('')}</g>
${LINKS.map(([a, b], i) => `<path id="s6l${i}" d="M${NET[a][0]},${NET[a][1]} L${NET[b][0]},${NET[b][1]}" stroke="#FF6B00" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}
${NET.map(([x, y], i) => `<g id="s6n${i}" transform="translate(${x},${y})"><circle r="26" fill="#fff" stroke="#FF6B00" stroke-width="5"/><circle r="9" fill="#FF6B00"/></g>`).join('')}
${[0, 1, 2, 3].map(i => `<g id="s6c${i}"><circle r="20" fill="#141414"/><text y="8" text-anchor="middle" font-size="22" font-family="Noto Color Emoji">${['🛵', '🚲', '🛵', '🚗'][i]}</text></g>`).join('')}</svg>
<div id="s6t" class="abs H" style="left:0;top:80px;width:1920px;text-align:center;font-size:72px">${W('Prise en charge par le *réseau OJA*', 'hl3')}</div>
<div id="s6band" class="abs" style="left:0;top:700px;width:1920px;height:380px;background:#141414"></div>
${[['🚲', 'À vélo'], ['moto', 'À moto'], ['tricycle', 'En tricycle'], ['car', 'En voiture']].map(([k, lb], i) => `<div id="s6v${i}" class="abs" style="left:${130 + i * 430}px;top:730px;width:400px;height:310px;text-align:center;color:#fff">
<div style="height:220px;display:flex;align-items:flex-end;justify-content:center">${k === '🚲' ? `<div class="emo" style="font-size:170px">🚲</div>` : `<img src="assets/${k}.png" style="max-width:${k === 'car' ? 400 : 300}px;max-height:210px">`}</div><div class="H" style="font-size:52px;margin-top:10px">${lb}</div></div>`).join('')}
<div id="s6need" class="pill" style="left:810px;top:640px;background:#FF6B00;color:#fff;font:800 30px Poppins;padding:14px 30px">selon le besoin</div>
</div>`;

/* S7 — boutiques, commerces, produits */
H += `<div class="scene" id="s7" style="background:#141414">
<div class="abs" style="inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 2px,transparent 2px);background-size:46px 46px"></div>
<div class="abs" style="left:780px;top:-100px;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,rgba(255,200,61,.22),rgba(255,200,61,0) 62%)"></div>
<div id="s7t" class="abs H" style="left:130px;top:170px;font-size:92px;color:#fff"><div>${W('Et OJA Market,')}</div><div style="font-size:64px;color:#bbb">${W("ce n'est pas seulement")}</div><div style="font-size:64px;color:#bbb">${W('les restaurants.')}</div></div>
${['Boutiques', 'Commerces', 'Produits'].map((w, i) => `<div id="s7w${i}" class="abs H" style="left:130px;top:${560 + i * 120}px;font-size:96px;color:${['#FF6B00', '#FFC83D', '#fff'][i]}">${w}</div>`).join('')}
<div id="s7near" class="pill" style="left:134px;top:930px;background:#fff;color:#141414;font-size:30px">${ic('pin', 30, '#FF6B00', 2.4)}près de chez vous</div>
${[0, 1, 2].map(i => `<div id="s7r${i}" class="abs" style="left:1415px;top:540px;width:10px;height:10px;border-radius:50%;border:4px solid rgba(255,200,61,.8)"></div>`).join('')}
${iphone('s7ph', scrHome('h7'), 1200, 90)}
${[['🛒', 1080, 230], ['📱', 1760, 330], ['👟', 1780, 760], ['💊', 1080, 820], ['🧴', 1720, 560]].map(([e, x, y], i) => sticker('s7k' + i, e, 130, x, y, '#fff')).join('')}
</div>`;

/* S8 — "Un restaurant ? Un produit ? Une envie ? À un clic." */
const CUT = [['Un restaurant ?', '#FF6B00', '#fff', 'shawarma'], ['Un produit ?', '#FFC83D', '#141414', '🛍️'], ['Une envie ?', '#141414', '#fff', '🍦'], ['À un clic.', '#fff', '#141414', 'tap']];
H += `<div class="scene" id="s8">${CUT.map(([txt, bg, fg, k], i) => `<div id="s8f${i}" class="abs" style="inset:0;background:${bg};display:none">
<div id="s8t${i}" class="abs H" style="left:130px;top:0;height:1080px;display:flex;align-items:center;font-size:140px;color:${fg};letter-spacing:-.03em">${L(txt)}</div>
<div id="s8i${i}" class="abs c" style="left:1400px;top:320px;width:440px;height:440px">${k === 'tap' ? `<div style="width:440px;height:440px;border-radius:50%;background:#FF6B00;display:grid;place-items:center">${ic('hand', 250, '#fff', 1.6)}</div>` : sticker('s8k' + i, k, 440, 220, 220, i === 2 ? '#2a2a2a' : '#fff')}</div></div>`).join('')}</div>`;

/* S9 — "Commandez local, faites-vous livrer simplement. OJA Market." */
H += `<div class="scene" id="s9" style="background:radial-gradient(ellipse at 30% 30%,#2A1C12 0%,#141414 60%)">
<div id="s9a" class="abs H" style="left:140px;top:300px;font-size:120px;color:#fff"><div>${W('Commandez *local,*', 'hl3')}</div><div style="font-size:96px">${W('faites-vous livrer *simplement.*', 'hly')}</div></div>
<div id="s9pin" class="abs c" style="left:1600px;top:120px;width:220px;height:275px;transform-origin:50% 100%"><svg viewBox="0 0 24 30" width="220" height="275"><path d="M12 29s10-9.2 10-17A10 10 0 0 0 2 12c0 7.8 10 17 10 17Z" fill="#FF6B00"/><circle cx="12" cy="12" r="6.5" fill="#fff"/></svg><div class="abs" style="left:62px;top:58px;width:96px;height:64px;overflow:hidden;border-radius:8px">${flag(96, 64)}</div></div>
<div id="s9lock" class="abs" style="left:0;top:0;width:1920px;height:1080px;display:flex;align-items:center;justify-content:center;gap:34px"><div style="width:240px;height:240px;border-radius:50%;background:#fff;display:grid;place-items:center"><img src="assets/mk_logo.png" style="width:210px"></div><div class="H" style="font-size:170px;color:#fff">OJA <span style="color:#FF6B00">Market</span></div></div>
</div>`;

/* S10 — trois iPhone en éventail */
H += `<div class="scene" id="s10" style="background:radial-gradient(ellipse at 50% 100%,#FF8A2E 0%,#FF6B00 35%,#141414 80%)">
<div id="s10t" class="abs H" style="left:0;top:70px;width:1920px;text-align:center;font-size:80px;color:#fff">${W('Vos restaurants et vos commerces,')}</div>
<div id="s10u" class="abs H" style="left:0;top:170px;width:1920px;text-align:center;font-size:80px;color:#FFC83D">${W('à portée de clic.')}</div>
${iphone('s10a', scrMenu('m10'), 560, 330)}${iphone('s10c', scrCheckout('c10'), 930, 330)}${iphone('s10b', scrHome('h10'), 745, 300)}
</div>`;

/* S11 — logo animé + téléchargement */
H += `<div class="scene" id="s11" style="background:#FFFFFF;color:#141414">
<div id="s11bg" class="abs" style="left:560px;top:-20px;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,#FFE4CF,rgba(255,228,207,0) 70%)"></div>
${[0, 1, 2].map(i => `<div id="s11r${i}" class="abs" style="left:960px;top:360px;width:10px;height:10px;border-radius:50%;border:4px solid rgba(255,107,0,.5)"></div>`).join('')}
<div id="s11logo" class="abs" style="left:700px;top:40px;width:520px;height:520px">
<img id="s11map" src="assets/mk_map.png" class="abs" style="left:0;top:0;width:520px;height:520px">
<img id="s11str" src="assets/mk_streak.png" class="abs" style="left:0;top:0;width:520px;height:520px">
<img id="s11pin" src="assets/mk_pin.png" class="abs" style="left:0;top:0;width:520px;height:520px;transform-origin:50% 75%"></div>
<div id="s11w" class="abs H" style="left:0;top:560px;width:1920px;text-align:center;font-size:120px">${L('OJA')}<span style="display:inline-block;width:30px"></span><span class="hl3">${L('Market')}</span></div>
<div id="s11s" class="abs" style="left:0;top:710px;width:1920px;text-align:center;font:600 48px Inter;color:#555">${W('Le local devient *visible.*', 'hl3')}</div>
<div id="s11st0" class="store" style="left:600px;top:830px">${ic('phone', 50, '#fff', 1.8)}<div><small>Télécharger sur</small><b>App Store</b></div></div>
<div id="s11st1" class="store" style="left:990px;top:830px">${ic('play', 46, '#fff', 1.8, '#fff')}<div><small>Disponible sur</small><b>Google Play</b></div></div>
<div id="s11cta" class="pill" style="left:810px;top:960px;background:#FF6B00;color:#fff;font:800 28px Poppins;padding:14px 30px 14px 18px">${flag(48, 32)}Téléchargez OJA · Bénin</div>
</div>`;

H += `<div id="wipe" class="abs" style="inset:0;z-index:40;pointer-events:none">${[0, 1, 2].map(i => `<div id="wb${i}" class="band" style="display:none"></div>`).join('')}</div>
<canvas id="grain" width="512" height="512"></canvas><div id="vig"></div><div id="fade"></div>`;
stage.innerHTML = H;
(() => { const c = $('grain'), g = c.getContext('2d'), im = g.createImageData(512, 512), R = rng(99); for (let i = 0; i < im.data.length; i += 4) { const v = R() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } g.putImageData(im, 0, 0); c.style.width = '2120px'; c.style.height = '1280px'; c.style.imageRendering = 'pixelated'; })();
const tRt = $('t3rt'), tRtL = tRt.getTotalLength(); tRt.style.strokeDasharray = `${tRtL} ${tRtL}`;
const s6L = LINKS.map((_, i) => { const p = $('s6l' + i), l = p.getTotalLength(); p.style.strokeDasharray = `${l} ${l}`; return [p, l]; });

/* ============================================================
   SCENES
   ============================================================ */
const SC = [['s0', 0, 5.15], ['s2', 4.85, 8.05], ['s3', 8.05, 14.95], ['s4', 14.95, 19.4], ['s5', 19.4, 23.1], ['s6', 23.1, 30.3], ['s7', 30.3, 36.97], ['s8', 36.97, 40.39], ['s9', 40.39, 44.05], ['s10', 44.05, 47.82], ['s11', 47.82, 99]];
const WIPES = [[7.78, ['#FF6B00', '#FFC83D', '#141414']], [14.66, ['#141414', '#FF6B00', '#FFFFFF']], [19.12, ['#FFFFFF', '#FF6B00', '#FFF7F0']], [22.82, ['#141414', '#FF6B00', '#F3EEE7']], [30.02, ['#F3EEE7', '#FFC83D', '#141414']], [43.77, ['#141414', '#FFC83D', '#FF6B00']]];
function circleClip(id, t, t0, d, cx, cy, e = E.ioC) {
  const p = P(t, t0, d, e); const r = p * 2300;
  el(id).style.clipPath = p >= 1 ? 'none' : `circle(${r}px at ${cx}px ${cy}px)`;
}
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
function glare(id, ry) { const g = el(id + 'g'); if (g) g.style.backgroundPosition = '0 0', g.style.transform = `translateX(${ry * 6}px)`; }
function listScroll(p, y) { el(p + 'rl').style.transform = `translateY(${-y}px)`; }
function seg(p, k) { el(p + 'seg').style.transform = `translateX(${k * 184}px)`; el(p + 'sr').style.color = k < .5 ? '#fff' : '#111'; el(p + 'sm').style.color = k >= .5 ? '#fff' : '#111'; O(p + 'rl', 1 - k); O(p + 'sl', k); }
['h0', 'h3', 'h5', 'h7', 'h10'].forEach(p => seg(p, 0));

function uS0(t) {
  T('s0glow', { s: 1 + .06 * Math.sin(t * 1.4) });
  const ph = P(t, 0, 1.3, E.oE);
  const ry = lerp(-200, -16, ph) + Math.sin(t * .9) * 5, rx = lerp(20, 6, ph);
  T('s0ph', { y: (1 - ph) * 200, s: lerp(.6, 1, ph), ry, rx, r: lerp(-10, 2, ph) }); glare('s0ph', ry);
  listScroll('h0', P(t, 1.3, 1.6, E.ioC) * 240);
  ORB.forEach((_, i) => {
    const a = i / ORB.length * Math.PI * 2 + t * .55, R = 400, cx = 1490, cy = 540;
    const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R * .55, z = Math.sin(a);
    const p = pop(t, .25 + i * .07, .6, E.oB2);
    T('s0o' + i, { x: x, y: y, s: p * (.8 + .25 * z), o: p > 0 ? 1 : 0 });
    el('s0o' + i).style.zIndex = z > 0 ? 6 : 1;
  });
  el('s0ph').style.zIndex = 3;
  wordsIn('s0t', t, .08, .08, .55, E.oE, 2.6, .3);
  wordsIn('s0u', t, 2.75, .1, .55, E.oB, 4.7, .25);
  tap('h0tap', t, 3.35, 294, 830);
  const lk = pop(t, 4.0, .55, E.oB2);
  T('s0lock', { s: lk, o: clamp(lk * 3) * (1 - P(t, 4.75, .2)), x: (1 - lk) * -60 });
  const b = P(t, 4.8, .35, E.iC); T('s0burst', { x: 1544, y: 920, s: b * 500, o: b > 0 ? 1 : 0 });
}
function uS2(t) {
  const lt = t;
  wordsIn('s2a', t, 5.15, .08, .55, E.oE, 6.45, .3);
  wordsIn('s2b', t, 6.62, .08, .55, E.oE);
  [0, 1, 2, 3].forEach(i => { const p = pop(t, 5.2 + i * .12, .6, E.oB2); T('s2f' + i, { s: p * (1 + .04 * Math.sin(t * 3 + i)), y: Math.sin(t * 2 + i) * 14, r: Math.sin(t * 1.5 + i) * 8, o: p > 0 ? 1 - P(t, 6.45, .3) : 0 }); });
  const h = pop(t, 6.7, .6, E.oB2); T('s2home', { s: h, o: h > 0 ? 1 : 0, r: Math.sin(t * 2) * 4 });
  const m = P(t, 6.8, 1.1, E.oE); T('s2moto', { x: lerp(2000, 820, m), y: Math.sin(t * 20) * 2, o: t > 6.8 ? 1 : 0 });
  document.querySelectorAll('.s2ln').forEach((ln, k) => { ln.style.transform = `translateX(${lerp(2300, 1300 + k * 40, m) + ((t * 900 + k * 300) % 400)}px)`; ln.style.opacity = t > 6.8 ? (1 - m * .6) : 0; });
}
const S3T = [8.05, 9.2, 11.2, 13.05, 13.85];
function uS3(t) {
  T('s3glow', { s: 1 + .05 * Math.sin(t * 1.3) });
  const act = S3T.filter(a => t >= a).length - 1;
  S3T.forEach((a, i) => { const p = P(t, a - .05, .5, E.oE); T('s3s' + i, { x: (1 - p) * -80, o: p * (i === act ? 1 : .45) }); const e = el('s3s' + i); e.querySelector('.s3n').style.background = i === act ? '#FF6B00' : '#242424'; e.querySelector('.s3n').style.color = i === act ? '#fff' : '#777'; e.querySelector('.s3l').style.color = i === act ? '#fff' : '#9a9a9a'; });
  const w = P(t, 8.05, .9, E.oE);
  T('s3wrap', { y: (1 - w) * 900, rx: 5, ry: Math.sin(t * .8) * 6 - 10 });
  // screen flips: each phone rotates in around Y at its step
  const flips = [[8.05, 11.2], [11.2, 13.05], [13.05, 13.85], [13.85, 99]];
  ['s3pA', 's3pB', 's3pC', 's3pD'].forEach((id, i) => {
    const [a, b] = flips[i], inP = i === 0 ? 1 : P(t, a - .12, .42, E.oC), out = P(t, b - .12, .3, E.iC);
    const ry = -90 * (1 - inP) + 90 * out;
    T(id, { ry, o: t >= a - .12 && t < b + .2 && Math.abs(ry) < 89 ? 1 : 0 }); glare(id, ry);
  });
  listScroll('h3', P(t, 9.3, 1.6, E.ioC) * 380);
  seg('h3', KF(t, [[10.1, 0], [10.35, 1], [10.85, 1], [11.05, 0]], E.ioC));
  tap('m3tap', t, 12.35, 368, 510);
  T('m3it0', { s: t > 12.4 && t < 12.6 ? .96 : 1 });
  T('m3cart', { y: (1 - P(t, 12.5, .4, E.oB)) * 140 });
  tap('c3tap', t, 13.35, 300, 800);
  el('c3paid').style.clipPath = `circle(${P(t, 13.45, .3, E.oC) * 260}px at 50% 50%)`;
  const cp = P(t, 13.9, 1.1, E.ioC), pt = tRt.getPointAtLength(tRtL * (1 - cp));
  tRt.style.strokeDashoffset = 0; $('t3cur').setAttribute('transform', `translate(${pt.x},${pt.y})`);
  el('t3eta').textContent = Math.max(1, Math.round(lerp(12, 8, cp)));
  [0, 1, 2, 3].forEach(i => { el('t3st' + i).style.width = (i < 2 ? 100 : i === 2 ? P(t, 13.95, .9) * 100 : 0) + '%'; });
  [0, 1].forEach(i => { const p = pop(t, 9.4 + i * 2.4, .6, E.oB2); T('s3k' + i, { s: p, y: Math.sin(t * 2 + i) * 12, o: p > 0 ? 1 : 0 }); });
}
function uS4(t) {
  [0, 1, 2].forEach(i => T('s4b' + i, { x: Math.sin(t * .5 + i) * 30, y: Math.cos(t * .6 + i) * 20 }));
  wordsIn('s4t', t, 15.0, .07, .5);
  [15.05, 16.25, 16.85, 17.8].forEach((a, i) => { const p = P(t, a, .7, E.oB); T('s4c' + i, { ry: (1 - p) * -100, y: (1 - p) * 120 + Math.sin(t * 1.8 + i) * 6, o: clamp((t - a) * 5), s: lerp(.8, 1, p) }); });
}
function uS5(t) {
  wordsIn('s5t', t, 19.45, .08, .55); wordsIn('s5s', t, 20.9, .05, .5);
  const ph = P(t, 19.4, .9, E.oE), ry = lerp(40, -14, ph) + Math.sin(t) * 4;
  T('s5ph', { y: (1 - ph) * 700, ry, rx: 5, r: 3 }); glare('s5ph', ry);
  listScroll('h5', 0);
  [[0, 20.4], [1, 21.0], [2, 21.6]].forEach(([i, a]) => { const on = t > a; el('h5hrt' + i).innerHTML = ic('heart', 26, on ? '#E8112D' : '#999', 2.2, on ? '#E8112D' : 'none'); T('h5hrt' + i, { s: on ? 1 + .6 * Math.max(0, 1 - (t - a) * 3) : 1 }); });
  for (let i = 0; i < 6; i++) { const a = 20.4 + i * .3, p = P(t, a, 1.6, E.oC); T('s5h' + i, { x: 1470 + (i - 2.5) * 80 + Math.sin(t * 2 + i) * 30, y: 560 - p * 460, s: pop(t, a, .4) * (1 - p * .3), o: t < a ? 0 : 1 - P(t, a + 1.2, .4) }); }
}
function uS6(t) {
  wordsIn('s6t', t, 23.15, .07, .5);
  s6L.forEach(([p, l], i) => { p.style.strokeDashoffset = l * (1 - P(t, 23.4 + i * .08, .5, E.oC)); });
  NET.forEach((_, i) => { const s = pop(t, 23.3 + i * .06, .45, E.oB2); $('s6n' + i).setAttribute('transform', `translate(${NET[i][0]},${NET[i][1]}) scale(${s * (1 + .08 * Math.sin(t * 4 + i))})`); });
  [[0, 2], [6, 3], [10, 1], [4, 0]].forEach(([li, k], i) => { const [p, l] = s6L[li]; const q = ((t - 24.3 + i * .37) % 1.6) / 1.6; const pt = p.getPointAtLength(l * clamp(q)); $('s6c' + i).setAttribute('transform', `translate(${pt.x},${pt.y}) scale(${t > 24.3 ? 1 : 0})`); });
  const bd = P(t, 26.4, .5, E.oE); T('s6band', { y: (1 - bd) * 400 });
  [26.7, 27.4, 28.1, 28.9].forEach((a, i) => { const p = pop(t, a, .55); T('s6v' + i, { y: (1 - p) * 300, o: clamp(p * 3) }); });
  T('s6need', { s: pop(t, 29.55, .5, E.oB2), o: t > 29.55 ? 1 : 0 });
}
function uS7(t) {
  wordsIn('s7t', t, 30.35, .08, .5);
  const ph = P(t, 30.3, .9, E.oE), ry = lerp(-60, -12, ph) + Math.sin(t * .9) * 5;
  T('s7ph', { y: (1 - ph) * 800, ry, rx: 5 }); glare('s7ph', ry);
  seg('h7', P(t, 31.9, .45, E.ioC));
  tap('h7tap', t, 31.8, 280, 348);
  for (let i = 0; i < 6; i++) T('h7sh' + i, { s: pop(t, 32.2 + i * .07, .4, E.oB2) });
  [33.8, 34.5, 35.3].forEach((a, i) => { const p = P(t, a, .5, E.oE); T('s7w' + i, { x: (1 - p) * -120, o: p }); });
  T('s7near', { s: pop(t, 36.0, .45), o: t > 36 ? 1 : 0 });
  for (let i = 0; i < 3; i++) { const p = t < 36 ? 0 : ((t - 36 + i * .35) % 1) / 1; const r = 80 + p * 700; const e = el('s7r' + i); e.style.width = e.style.height = r + 'px'; T(e, { x: -r / 2, y: -r / 2, o: t < 36 ? 0 : (1 - p) * .8 }); }
  [0, 1, 2, 3, 4].forEach(i => { const p = pop(t, 33.0 + i * .18, .5, E.oB2); T('s7k' + i, { s: p, y: Math.sin(t * 2 + i) * 12, r: Math.sin(t + i) * 8, o: p > 0 ? 1 : 0 }); });
}
const S8T = [36.97, 37.91, 38.74, 39.55, 40.39];
function uS8(t) {
  for (let i = 0; i < 4; i++) {
    const on = t >= S8T[i] && t < S8T[i + 1]; el('s8f' + i).style.display = on ? 'block' : 'none'; if (!on) continue;
    const lt = t - S8T[i];
    el('s8t' + i).querySelectorAll('.wi').forEach((w, k) => { const q = P(lt, k * .02, .35, E.oE); w.style.transform = `translateY(${(1 - q) * 110}%)`; });
    const p = P(lt, 0, .5, E.oB2); T('s8i' + i, { s: p * (1 + lt * .05), r: (1 - p) * 30 + Math.sin(t * 3) * 3 });
  }
}
function uS9(t) {
  wordsIn('s9a', t, 40.45, .09, .55, E.oE, 42.75, .3);
  const d = P(t, 40.5, .55, E.oBo); T('s9pin', { y: (1 - d) * -500, o: t > 40.5 ? 1 - P(t, 42.75, .2) : 0 });
  const lk = pop(t, 42.95, .55, E.oB2); T('s9lock', { s: lerp(1.4, 1, lk), o: clamp(lk * 2) });
}
function uS10(t) {
  wordsIn('s10t', t, 44.05, .07, .5); wordsIn('s10u', t, 46.1, .08, .5);
  const p = P(t, 44.1, 1.0, E.oE), sw = Math.sin(t * .9) * 4;
  T('s10a', { x: (1 - p) * 200 - p * 330, y: (1 - p) * 700 + 60, r: -10 * p, ry: 22 * p + sw, s: .92 });
  T('s10c', { x: (1 - p) * -200 + p * 330, y: (1 - p) * 700 + 60, r: 10 * p, ry: -22 * p + sw, s: .92 });
  T('s10b', { y: (1 - P(t, 44.25, 1.0, E.oE)) * 800, ry: sw * 2, rx: 4 });
  ['s10a', 's10b', 's10c'].forEach(id => glare(id, sw * 3));
  listScroll('h10', P(t, 45, 2.5, E.ioC) * 300);
}
function uS11(t) {
  circleClip('s11', t, 47.82, .5, 960, 340);
  const mp = P(t, 47.9, .6, E.oC);
  el('s11map').style.clipPath = `inset(0 ${(1 - mp) * 100}% 0 0)`;
  const dp = P(t, 48.1, .75, E.oBo), sq = t > 48.5 ? Math.exp(-(t - 48.5) * 9) * Math.sin((t - 48.5) * 30) : 0;
  T('s11pin', { y: (1 - dp) * -620, sx: 1 + sq * .1, sy: 1 - sq * .1, o: t > 48.1 ? 1 : 0 });
  const sp = P(t, 48.55, .5, E.oE); T('s11str', { x: (1 - sp) * 80, o: sp });
  T('s11logo', { s: 1 + .015 * Math.sin(t * 2.2) * (t > 49 ? 1 : 0), y: Math.sin(t * 1.8) * 5 * (t > 49 ? 1 : 0) });
  for (let i = 0; i < 3; i++) { const p = t < 48.55 ? 0 : ((t - 48.55 + i * .5) % 1.5) / 1.5; const r = 200 + p * 900; const e = el('s11r' + i); e.style.width = e.style.height = r + 'px'; T(e, { x: -r / 2, y: -r / 2, o: t < 48.55 ? 0 : (1 - p) * .7 }); }
  el('s11w').querySelectorAll('.wi').forEach((w, k) => { const q = P(t, 48.6 + k * .04, .45, E.oB); w.style.transform = `translateY(${(1 - q) * 110}%)`; });
  wordsIn('s11s', t, 48.95, .1, .55);
  [50.6, 50.75].forEach((a, i) => { const p = pop(t, a, .55); T('s11st' + i, { y: (1 - p) * 80, o: clamp(p * 2) }); });
  const c = pop(t, 51.1, .55, E.oB2); T('s11cta', { s: c * (1 + .03 * Math.sin(t * 5) * (t > 52 ? 1 : 0)), o: clamp(c * 2) });
  O('fade', P(t, 54.55, .45, E.lin));
}
const UPD = { s0: uS0, s2: uS2, s3: uS3, s4: uS4, s5: uS5, s6: uS6, s7: uS7, s8: uS8, s9: uS9, s10: uS10, s11: uS11 };

