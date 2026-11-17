// « Avant / Maintenant » (take IMG_1186): the design of the edit for oja_talk.html?v=avant. Each « Avant » is in black and
// white with muffled music, each « Maintenant » flashes into colour with the app and the full beat.
window.DESIGN = ({ W, WE, END }) => {
  const c = 'center', O = '#FF6B00', CR = '#F3E6D3';
  const M1 = W('Maintenant') - .06, A2 = W('Avant', 2) - .06, M2 = W('Maintenant', 2) - .06, A3 = W('Avant', 3) - .06, M3 = W('Maintenant', 3) - .06;
  const T = { monde: W('monde') - .25, tout: W('Tout') - .08, sec: W('quelques') - .25, tel: W('Télécharge') - .06 };
  return {
    head: [545, 900],
    fr: { close: [1.75, 540, 880], med: [1.35, 540, 960], wide: [1.12, 540, 1000] },
    images: { market: 'assets/biz_market.jpg', traffic: 'assets/zem/h_attente.jpg' },
    shots: [
      [0, { A: 'close', bw: 1 }], [M1, { B: 'app', screen: 'search', query: 'pharmacie' }],
      [A2, { B: 'card', img: 'market', bw: 1, rot: -3 }], [M2, { B: 'app', screen: 'map' }],
      [A3, { B: 'cover', img: 'traffic', bw: 1, spin: 6 }], [M3, { B: 'app', screen: 'sheet', tap: 1.0 }],
      [T.monde, { A: 'close' }], [T.tout, { A: 'med' }], [T.sec, { A: 'wide' }], [T.tel, { A: 'close' }]],
    flash: [M1, M2, M3],
    music: [[0, 'low'], [M1, 'full'], [A2, 'low'], [M2, 'full'], [A3, 'low'], [M3, 'full']],
    fx: [
      { type: 'behind', text: 'AVANT,', size: 330, color: CR, y: 380, t0: W('Avant') - .04, t1: M1, vx: -20 },
      { type: 'behind', text: 'CHANGE.', size: 280, color: O, y: 470, t0: W('change') - .04, t1: T.tout },
      { type: 'orbit', text: 'EN LIGNE  •  ', t0: T.tout + .1, t1: T.sec, cx: 540, cy: 560, rx: 340, ry: 95, tilt: -.08, speed: 1.6, size: 86, color: '#fff' },
      { type: 'behind', text: 'OJA APP', size: 260, color: O, y: 480, t0: W('Oja') - .04, t1: END },
    ],
    words: [
      [W("c'est") - .04, M1, "C'EST OÙ ?", 'cond', 210, 540, 1500, { align: c }],
      [M1 + .02, A2, 'MAINTENANT,', 'cond', 160, 540, 215, { align: c, color: O }],
      [W('je') - .04, A2, 'je cherche.', 'script', 140, 540, 355, { align: c }],
      [A2 + .02, M2, 'AVANT,', 'cond', 200, 540, 300, { align: c, color: CR }],
      [W('demande') - .04, M2, 'demande au vendeur.', 'script', 140, 540, 1700, { align: c }],
      [M2 + .02, A3, 'MAINTENANT,', 'cond', 160, 540, 215, { align: c, color: O }],
      [W('regarde') - .1, A3, 'je regarde la map.', 'script', 120, 540, 355, { align: c }],
      [A3 + .02, M3, 'AVANT,', 'cond', 200, 540, 300, { align: c, color: CR }],
      [W('tourne') - .1, M3, 'je tourne', 'sans', 80, 540, 1520, { align: c }],
      [W('une') - .03, M3, 'UNE HEURE.', 'cond', 200, 540, 1665, { align: c, anim: 'wipe' }],
      [M3 + .02, T.monde, 'MAINTENANT,', 'cond', 150, 540, 200, { align: c, color: O }],
      [W("j'appuie") - .04, T.monde, "j'appuie sur", 'sans', 64, 540, 300, { align: c }],
      [W('Itinéraire') - .03, T.monde, 'ITINÉRAIRE.', 'cond', 118, 540, 418, { align: c, color: O }],
      [W('monde') - .2, T.tout, 'Le monde', 'script', 170, 540, 215, { align: c }],
      [W('Tout') - .04, T.sec, 'tout se trouve', 'sans', 80, 540, 1380, { align: c }],
      [W('En', 2) - .04, T.tel, 'en quelques', 'sans', 72, 540, 1330, { align: c }],
      [W('secondes') - .03, T.tel, 'SECONDES.', 'cond', 210, 540, 1480, { align: c, color: O }],
      [W('Télécharge') - .03, END, 'Télécharge', 'script', 170, 540, 230, { align: c }],
    ],
    end: { k: 'Le monde change', h2: 'Tout se trouve<br>sur la <span>MAP OJA</span>', g: '' },
  };
};
