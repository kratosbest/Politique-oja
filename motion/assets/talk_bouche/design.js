// « Le bouche-à-oreille » (take IMG_1187, for shop owners): the design of the edit for oja_talk.html?v=bouche.
// Avant = black and white (our parents, the old shop, the market), Aujourd'hui = colour with a flash.
window.DESIGN = ({ W, WE, END }) => {
  const c = 'center', O = '#FF6B00', CR = '#F3E6D3';
  const T = {
    fais: W('faisaient') - .08, par: W('par', 2) - .08, ca: W('Ça') - .08, auj: W("Aujourd'hui") - .04, ville: W('ville') - .3,
    et: W('et') - .08, ce: W('Ce') - .08, av: W('Avant') - .08, si: W('Si') - .08, sinon: W('Sinon') - .08, mets: W('Mets') - .08,
    map: W('map') - .3 };
  return {
    head: [545, 900],
    fr: { close: [1.75, 540, 880], med: [1.35, 540, 960], wide: [1.12, 540, 1000] },
    images: { boutique: 'assets/biz_epicerie.jpg', market: 'assets/biz_market.jpg', rondpoint: 'assets/bj_rondpoint.jpg',
      portonovo: 'assets/bj/ph_portonovo.jpg', appli: 'assets/jour/h_appli_v.jpg', vide: 'assets/lieux/h_vide_v.jpg' },
    shots: [
      [0, { A: 'close', bw: 1 }], [T.fais, { B: 'card', img: 'boutique', bw: 1, rot: -3 }], [T.par, { A: 'med', bw: 1 }],
      [T.ca, { B: 'card', img: 'market', bw: 1, rot: 3 }],
      [T.auj, { A: 'close' }], [T.ville, { B: 'cards', imgs: ['rondpoint', 'portonovo'] }], [T.et, { A: 'wide' }],
      [T.ce, { B: 'cover', img: 'appli' }], [T.av, { A: 'med' }], [T.si, { B: 'app', screen: 'search', query: 'maquis' }],
      [T.sinon, { B: 'cover', img: 'vide', bw: 1 }], [T.mets, { B: 'app', screen: 'ajout', tap: .9 }], [T.map, { A: 'close' }]],
    flash: [T.auj],
    music: [[0, 'low'], [T.auj, 'full'], [T.sinon, 'low'], [T.mets, 'full']],
    fx: [
      { type: 'behind', text: 'AVANT', size: 330, color: CR, y: 380, t0: W('Nos') - .04, t1: T.fais, vx: -20 },
      { type: 'frag', t0: W('par', 2), t1: T.ca },
      { type: 'orbit', text: 'ILS CHERCHENT  •  ', t0: T.av + .1, t1: T.si, cx: 540, cy: 560, rx: 340, ry: 95, tilt: -.08, speed: 1.6, size: 80, color: O },
      { type: 'vanish', text: "QUELQU'UN D'AUTRE.", x: 540, y: 960, size: 118, t0: W('quelqu') - .05, t1: T.mets },
      { type: 'behind', text: 'MAP OJA', size: 250, color: O, y: 470, t0: W('map') - .04, t1: END },
      { type: 'stamp', text: "C'EST GRATUIT.", x: 540, y: 1420, t0: W("c'est", 2) - .04, t1: END },
    ],
    words: [
      [W('Nos') - .04, T.fais, 'Nos parents', 'script', 180, 540, 1400, { align: c }],
      [W('faisaient') - .04, T.par, 'faisaient connaître', 'sans', 72, 540, 290, { align: c }],
      [W('boutique') - .1, T.par, 'LEUR BOUTIQUE', 'cond', 170, 540, 1660, { align: c, anim: 'wipe' }],
      [W('par', 2) - .04, T.ca, 'par le', 'sans', 80, 110, 1360, {}],
      [W('bouche') - .03, T.ca, 'BOUCHE-À-OREILLE.', 'cond', 150, 540, 1500, { align: c, color: CR }],
      [W('Ça') - .04, T.auj, 'Ça marchait…', 'script', 170, 540, 300, { align: c }],
      [W('parce') - .04, T.auj, 'parce que tout le monde', 'sans', 64, 540, 1560, { weight: 700, align: c }],
      [W('connaissait') - .1, T.auj, 'SE CONNAISSAIT.', 'cond', 150, 540, 1700, { align: c, anim: 'wipe' }],
      [W("Aujourd'hui") - .03, T.ville, "AUJOURD'HUI,", 'cond', 175, 540, 330, { align: c, color: O }],
      [W('la') - .04, W('les') - .05, 'la ville', 'script', 170, 540, 270, { align: c }],
      [W('grandit') - .03, W('les') - .05, 'GRANDIT,', 'cond', 200, 540, 1650, { align: c, color: O }],
      [W('les') - .04, T.et, 'les quartiers', 'script', 160, 540, 270, { align: c }],
      [W('changent') - .03, T.et, 'CHANGENT.', 'cond', 200, 540, 1650, { align: c, color: O }],
      [W('et') - .04, T.ce, 'et les clients', 'sans', 74, 540, 1320, { align: c }],
      [W('ne') - .04, T.ce, 'ne connaissent pas', 'sans', 64, 540, 1410, { weight: 700, align: c }],
      [W('ta') - .03, T.ce, 'TA VON.', 'cond', 220, 540, 1570, { align: c, color: O }],
      [W('Ce') - .04, T.av, "ce qu'ils ont,", 'script', 160, 540, 290, { align: c }],
      [W("c'est") - .04, T.av, "C'EST UN", 'cond', 150, 540, 1520, { align: c, anim: 'wipe' }],
      [W('téléphone') - .03, T.av, 'TÉLÉPHONE.', 'cond', 210, 540, 1690, { align: c, color: O }],
      [W('Avant') - .04, T.si, 'Avant de se déplacer,', 'sans', 70, 540, 225, { weight: 700, align: c }],
      [W('Si') - .04, T.sinon, 'Si tu es', 'sans', 80, 540, 200, { align: c }],
      [W('en') - .03, W('ils', 2) - .05, 'EN LIGNE,', 'cond', 170, 540, 340, { align: c, color: O }],
      [W('ils', 2) - .03, T.sinon, 'ILS TE TROUVENT.', 'cond', 150, 540, 340, { align: c }],
      [W('Sinon') - .04, T.mets, 'Sinon,', 'script', 180, 540, 300, { align: c }],
      [W('ils', 3) - .04, T.mets, 'ils trouvent', 'sans', 76, 540, 800, { align: c }],
      [W('Mets') - .04, T.map, 'Mets ton', 'sans', 92, 540, 215, { align: c }],
      [W('commerce') - .03, T.map, 'COMMERCE', 'cond', 170, 540, 345, { align: c, color: O, anim: 'wipe' }],
      [W('sur') - .04, END, 'sur la', 'script', 160, 540, 230, { align: c }],
    ],
    end: { k: "Ton commerce mérite d'être trouvé", h2: 'Ajoute-le sur<br>la <span>MAP OJA</span>', g: "C'est gratuit." },
  };
};
