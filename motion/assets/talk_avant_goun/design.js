// « Avant / Maintenant » en goun (take IMG_1190): the design of the edit for oja_talk.html?v=avant_goun.
// Derrick explains the four ideas in Goun (95 s). Each chapter opens on its French title: « AVANT » in black and white,
// then a flash into colour with « MAINTENANT ». The French words he says inside the Goun (téléphone, map, Internet,
// application, télécharger…) pop on screen when he says them; pictures and the app come in on those words.
window.DESIGN = ({ W, WE, END }) => {
  const c = 'center', O = '#FF6B00', CR = '#F3E6D3';
  const at = t => TK.segs.reduce((best, s) => Math.abs(s.t - t) < Math.abs(best - t) ? s.t : best, 0);   // the cut nearest to t
  const C1 = 0, C2 = at(7.05), C3 = at(18.61), C4 = at(48.63), AV = 1.8;    // chapters, and how long « AVANT » lasts
  // a new framing at every cut (pieces shorter than 1.2 s keep the previous one)
  const cyc = ['med', 'close', 'wide', 'close']; const base = []; let k = 0, last = -9;
  TK.segs.forEach(s => { if (s.t - last >= 1.2) { base.push([s.t, { A: cyc[k++ % 4] }]); last = s.t; } });
  // inserts [from, to, shot] replace the framings in between
  const ins = [
    [C1, C1 + AV, { A: 'close', bw: 1 }], [W('téléphone') - .12, C2, { B: 'cover', img: 'phone' }],
    [C2, C2 + AV, { B: 'card', img: 'market', bw: 1, rot: -3 }], [W('map') - .9, C3, { B: 'app', screen: 'map' }],
    [C3, C3 + AV, { B: 'cover', img: 'traffic', bw: 1, spin: 5 }], [W('map', 2) - .12, W('map', 2) + 2.2, { B: 'app', screen: 'sheet', tap: 1.0 }],
    [W('directement') - .1, W('directement') + 1.8, { B: 'cover', img: 'zem' }],
    [C4, C4 + 2.7, { A: 'close' }], [C4 + 2.7, C4 + 5.9, { A: 'med' }], [W('téléphone', 2) - .12, W('téléphone', 2) + 2.3, { B: 'cover', img: 'appli' }],
    [W('application') - .12, W('application') + 1.9, { B: 'app', screen: 'search', query: 'boutique' }], [W('app', 3) - .2, W('app', 3) + 2.8, { A: 'close' }]];
  const shots = base.filter(([t]) => !ins.some(([a, b]) => t >= a && t < b));
  ins.forEach(([a, b, sp]) => { shots.push([a, sp]);
    if (!ins.some(([a2]) => Math.abs(a2 - b) < .01)) { const prev = base.filter(([t]) => t <= b).pop(); shots.push([b, { ...(prev ? prev[1] : { A: 'med' }) }]); } });
  shots.sort((x, y) => x[0] - y[0]);
  for (let i = shots.length - 2; i >= 0; i--) if (shots[i + 1][0] - shots[i][0] < .3) shots.splice(i, 1);   // no flash frames between two shots
  return {
    head: [560, 920],
    fr: { close: [1.7, 555, 900], med: [1.32, 555, 980], wide: [1.1, 550, 1020] },
    images: { market: 'assets/biz_market.jpg', traffic: 'assets/zem/h_attente.jpg', phone: 'assets/zem/h_phone.jpg',
      appli: 'assets/jour/h_appli_v.jpg', zem: 'assets/edt/moto.jpg' },
    shots,
    flash: [C1 + AV, C2 + AV, C3 + AV],
    music: [[C1, 'low'], [C1 + AV, 'full'], [C2, 'low'], [C2 + AV, 'full'], [C3, 'low'], [C3 + AV, 'full']],
    fx: [
      { type: 'behind', text: 'AVANT,', size: 330, color: CR, y: 400, t0: C1 + .02, t1: C1 + AV, vx: -20 },
      { type: 'frag', t0: C3 + 7.4, t1: C3 + 10.4 },
      { type: 'behind', text: 'CHANGE.', size: 280, color: O, y: 500, t0: C4 + .05, t1: C4 + 2.7 },
      { type: 'orbit', text: 'EN LIGNE  •  ', t0: C4 + 2.8, t1: C4 + 5.9, cx: 555, cy: 690, rx: 340, ry: 95, tilt: -.08, speed: 1.6, size: 86, color: '#fff' },
      { type: 'orbit', text: 'INTERNET  •  ', t0: W('Internet') - .1, t1: W('Internet', 2) + 1.4, cx: 555, cy: 690, rx: 340, ry: 95, tilt: .08, speed: -1.5, size: 84, color: O },
      { type: 'frag', t0: C4 + 21.5, t1: C4 + 24.5 },
      { type: 'behind', text: 'OJA APP', size: 260, color: O, y: 520, t0: W('app', 3) - .05, t1: W('app', 3) + 2.8 },
    ],
    words: [
      [C1 + .3, C1 + AV, "« c'est où ? »", 'script', 150, 540, 1420, { align: c }],
      [C1 + AV, C1 + 4.6, 'MAINTENANT,', 'cond', 170, 540, 250, { align: c, color: O }],
      [C1 + AV + .2, C1 + 4.6, 'je cherche.', 'script', 150, 540, 1420, { align: c }],
      [W('téléphone') - .03, C2, 'TÉLÉPHONE.', 'cond', 210, 540, 1690, { align: c, color: O }],
      [C2 + .02, C2 + AV, 'AVANT,', 'cond', 200, 540, 300, { align: c, color: CR }],
      [C2 + .2, C2 + AV, 'demande au vendeur.', 'script', 140, 540, 1700, { align: c }],
      [C2 + AV, C2 + 4.5, 'MAINTENANT,', 'cond', 170, 540, 250, { align: c, color: O }],
      [C2 + AV + .2, C2 + 4.5, 'la map.', 'script', 170, 540, 1420, { align: c }],
      [W('map') - .03, C3, 'LA MAP', 'cond', 210, 540, 330, { align: c, color: O }],
      [C3 + .02, C3 + AV, 'AVANT,', 'cond', 200, 540, 300, { align: c, color: CR }],
      [C3 + .2, C3 + AV, 'je tourne une heure.', 'script', 130, 540, 1700, { align: c }],
      [C3 + AV, C3 + 4.6, 'MAINTENANT,', 'cond', 170, 540, 250, { align: c, color: O }],
      [C3 + AV + .2, C3 + 4.6, 'ITINÉRAIRE.', 'cond', 150, 540, 1450, { align: c, anim: 'wipe' }],
      [W('map', 2) - .03, W('map', 2) + 2.2, 'sur la map', 'script', 150, 540, 300, { align: c }],
      [W('directement') - .03, W('directement') + 1.8, 'DIRECTEMENT.', 'cond', 190, 540, 1650, { align: c, color: O }],
      [C4 + .1, C4 + 2.7, 'Le monde', 'script', 170, 540, 240, { align: c }],
      [C4 + 2.9, C4 + 5.9, 'tout se trouve', 'sans', 80, 540, 1420, { align: c }],
      [W('téléphone', 2) - .03, W('téléphone', 2) + 2.3, 'TÉLÉPHONE.', 'cond', 210, 540, 1690, { align: c, color: O }],
      [W('Android') - .03, W('Android') + 1.6, 'ANDROID', 'cond', 190, 540, 1500, { align: c, color: O }],
      [W('Internet') - .03, W('Internet') + 1.6, 'INTERNET', 'cond', 200, 540, 1500, { align: c, color: O }],
      [W('Internet', 2) - .03, W('Internet', 2) + 1.4, 'INTERNET', 'cond', 200, 540, 1500, { align: c }],
      [W('Internet', 3) - .03, W('Internet', 3) + 1.6, 'INTERNET', 'cond', 200, 540, 1500, { align: c, color: O, anim: 'wipe' }],
      [W('application') - .03, W('application') + 1.9, 'APPLICATION', 'cond', 150, 540, 330, { align: c, color: O }],
      [W('Donc') - .03, W('télécharger') - .05, 'donc…', 'script', 150, 540, 1450, { align: c }],
      [W('télécharger') - .03, W('app', 3) - .2, 'TÉLÉCHARGE', 'cond', 190, 540, 1500, { align: c, color: O }],
      [W('app', 3) - .05, W('app', 3) + 2.8, 'télécharge', 'script', 150, 540, 250, { align: c }],
    ],
    end: { k: 'Le monde change', h2: 'Tout se trouve<br>sur la <span>MAP OJA</span>', g: '' },
  };
};
