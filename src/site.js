import '@fontsource-variable/inter'
import './site.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { LinearFilter, Mesh, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, ShaderMaterial, TextureLoader, Vector2, WebGLRenderer } from 'three'

window.gsap = gsap
window.ScrollTrigger = ScrollTrigger
window.Lenis = Lenis
window.THREE = { LinearFilter, Mesh, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, ShaderMaterial, TextureLoader, Vector2, WebGLRenderer }
document.documentElement.classList.add(matchMedia('(prefers-reduced-motion: reduce)').matches ? 'rm' : 'mo');

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const HAS_GSAP = !!window.gsap && !!window.ScrollTrigger;
  const MOTION = !RM && HAS_GSAP;
  if (!MOTION) document.documentElement.classList.add('rm');
  $('#yr').textContent = new Date().getFullYear();

  /* ================= data ================= */
  const C = [[1355,1800],[854,1000],[968,1000],[1321,1000],[1400,1108],[1355,1800],[1355,1800],[1187,1800],[1225,1800],[1400,1347],[1355,1800],[1355,1800],[1196,1800],[1039,1441],[1196,1800],[1201,1800],[1209,1800],[1214,1800],[1178,1800],[782,1000],[788,1000],[750,1000],[758,1000],[1028,1000],[658,1000],[666,1000],[665,1000],[750,1000],[675,1000],[672,1000]];
  const T = ['Zatanna','He-Man','Skeletor','Optimus Prime','Black Cat and Spider-Man sketch cover','Harley Quinn sketch cover','Poison Ivy sketch cover','Batman sketch cover','Batman','Halloween commission','Optimus Prime sketch cover','Optimus Prime sketch cover','Spider-Man','Rogue sketch cover','Scarlet Witch sketch cover','Soundwave sketch cover','Spider-Man sketch cover','Witchblade sketch cover','Wolverine sketch cover','Flash and Green Lantern','Slam Dunk sketch cover','Pegasus Seiya','Pegasus Seiya','Cygnus Hyoga','Scarlet Witch sketch cover','Poison Ivy sketch cover','Baroness sketch cover','Evangelion','Optimus Prime sketch cover','Optimus Prime head sketch cover'];
  const comics = C.map((d, i) => ({ src: `img/comic-${pad(i + 1)}.webp`, thumb: `img/comic-${pad(i + 1)}-s.webp`, ar: d[0] / d[1], title: T[i], alt: `${T[i]}, comic art by Giovanni Ricco` }));
  const NC = 178;
  const cards = Array.from({ length: NC }, (_, i) => ({ src: `img/card-${pad(i + 1, 3)}.webp`, thumb: `img/card-${pad(i + 1, 3)}.webp`, alt: `Upper Deck sketch card by Giovanni Ricco, ${i + 1} of ${NC}` }));
  const credits = [
    ['cliffhanger','2026','Cliffhanger','Feature film','Visual effects','Jaume Collet-Serra'],
    ['pendragon','2026','The Pendragon Cycle: Rise of the Merlin','Series','VFX compositor','Augustus Color'],
    ['ritual','2023','The Ritual Killer','Feature film','Digital compositor','George Gallo'],
    ['suspiria','2018','Suspiria','Feature film','Visual effects','Luca Guadagnino'],
    ['diabolik','2021','Diabolik','Feature film','Visual effects','Manetti Bros.'],
    ['domani','2023',"C'è ancora domani",'Feature film','Digital compositor','Paola Cortellesi'],
    ['suburra','2017','Suburra: la serie','Series','Visual effects','Netflix'],
    ['ricciardi','2021','Il commissario Ricciardi','Series','Digital compositor','Rai 1'],
    ['petra','2020','Petra','Series','Visual effects','Maria Sole Tognazzi'],
    ['mektoub','2017','Mektoub, My Love: Canto Uno','Feature film','Compositor','Abdellatif Kechiche'],
    ['cortina','2024','Cortina Express','Feature film','Digital compositor','Eros Puglielli'],
    ['eterno','2024','Eterno visionario','Feature film','Visual effects','Michele Placido'],
    ['river','2022','Across the River and Into the Trees','Feature film','Digital compositor','Paula Ortiz'],
    ['well','2023','The Well','Feature film','Visual effects','Federico Zampaglione'],
    ['natale','2022','Odio il Natale','Series','Visual effects','Netflix'],
  ];
  const extraFilms = [["tt39373684", "2026", "Peccato", "Series", "Digital compositor", ""], ["tt43704267", "2026", "Be Brave", "Feature film", "Digital compositor", ""], ["tt36895992", "2026", "Nel tepore del ballo", "Feature film", "Digital compositor", ""], ["tt1742179", "2026", "Starbright", "Feature film", "Digital compositor", ""], ["tt29058981", "2026", "Prima di noi", "Series", "VFX artist", ""], ["tt36291373", "2025", "Tutta colpa del rock", "Feature film", "VFX artist", ""], ["tt32579850", "2025", "Tutto quello che ho", "Series", "Visual effects", ""], ["tt32424202", "2025", "L'ultima sfida", "Feature film", "Visual effects", ""], ["tt19389872", "2024", "Natale con i Puffins", "Feature film", "Compositor", ""], ["tt29547746", "2024", "The Count of Monte Cristo", "Series", "Visual effects", ""], ["tt33830362", "2024", "Nato il sei ottobre", "TV film", "Digital compositor", ""], ["tt22984224", "2023", "Sono Lillo", "Series", "Digital compositor", ""], ["tt26543517", "2024", "L'Italia chiamò", "Series", "Visual effects", ""], ["tt21611760", "2023", "La voce che hai dentro", "Series", "Digital compositor", ""], ["tt22534820", "2023", "Shake", "Series", "VFX artist", ""], ["tt13424004", "2023", "Christian", "Series", "Visual effects", ""], ["tt20865278", "2023", "Tramite amicizia", "Feature film", "VFX artist", ""], ["tt18250292", "2023", "Black Out 2", "Series", "Visual effects", ""], ["tt1661394", "2023", "La seconda via", "Feature film", "VFX compositor", ""], ["tt6134022", "2023", "La porta rossa", "Series", "Digital compositor", ""], ["tt15766394", "2022", "Il Principe di Roma", "Feature film", "Digital compositor", ""], ["tt7527028", "2022", "The Tiger's Nest", "Feature film", "VFX artist", ""], ["tt16088368", "2022", "Con chi viaggi", "Feature film", "Digital compositor", ""], ["tt14845950", "2022", "Altrimenti ci arrabbiamo", "Feature film", "Digital compositor", ""], ["tt13657040", "2022", "L'Ora - Inchiostro contro piombo", "Series", "Compositor", ""], ["tt14732120", "2022", "Monterossi", "Series", "Digital compositor", ""], ["tt15004918", "2021", "Luce dei tuoi occhi", "Series", "Digital compositor", ""], ["tt13833722", "2021", "Dietro la notte", "Feature film", "Digital compositor", ""], ["tt12792460", "2020", "Paolo Conte - Via con me", "Documentary", "Visual effects", ""], ["tt9670890", "2019", "Tensione superficiale", "Feature film", "Digital compositor", ""], ["tt5699258", "2017", "La strada di casa", "Series", "Visual effects, compositor", ""], ["tt9840382", "2019", "Se mi vuoi bene", "Feature film", "Digital artist", ""], ["tt9260446", "2019", "Ma cosa ci dice il cervello", "Feature film", "Digital compositor", ""], ["tt7197558", "2018", "Nero a metà", "Series", "Digital compositor", ""], ["tt7548328", "2018", "Red Land", "Feature film", "Digital compositor", ""], ["tt4656810", "2017", "The Broken Key", "Feature film", "Digital artist", ""], ["tt6591340", "2017", "Zeffirelli's Inferno", "Video", "Digital artist", ""], ["tt3764194", "2014", "Fratelli unici", "Feature film", "Digital artist", ""], ["tt3004278", "2013", "Un fantastico via vai", "Feature film", "Digital artist", ""], ["tt1667438", "2011", "Mozzarella Stories", "Feature film", "Graphic artist", ""], ["tt2015340", "2011", "Cose dell'altro mondo", "Feature film", "Graphics and animation", ""], ["tt4947672", "2016", "Caffè", "Feature film", "Graphic artist", ""], ["tt15856106", "2021", "Lussu", "Feature film", "Digital artist", ""], ["tt15210486", "2021", "Fino all'ultimo battito", "Series", "Digital compositor", ""], ["tt13710628", "2021", "Fratelli Caputo", "Series", "Digital compositor", ""], ["tt1585270", "2010", "Rasputin", "Feature film", "Animation and graphics", ""]];
  const posterKey = { eterno: 'tt27813775', river: 'tt5652768', well: 'tt26754354', natale: 'tt23556972' };
  const films = [...credits, ...extraFilms];
  const videos = [
    ['FKXJO_2Eokw','He-Man opening theme, 1984 redesign',149135,'50% 40%'],
    ['pA1D2iFPscY','She-Ra Princess of Power opening, redesign',125026,'30% 60%'],
    ['6OYaYzL6DP0','He-Man opening theme, "pure design"',102955,'70% 30%'],
    ['vh_vKSTXWLQ','Thor vs Iron Man, 2009',85793,'20% 20%'],
    ['ibxP-ety2xc','He-Man opening theme, 1983 remake',18203,'80% 70%'],
  ];

  /* ================= smooth scroll ================= */
  let lenis = null;
  if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);
  if (MOTION && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href'); const el = id.length > 1 && $(id);
    if (!el) return; e.preventDefault();
    if (lenis) lenis.scrollTo(el, { duration: 1.6 }); else el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
  }));

  /* ================= cursor ================= */
  window.__cursor = () => {};
  if (FINE && MOTION) {
    document.documentElement.classList.add('has-cursor');
    const cur = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), lab = $('#curLabel');
    let mx = -100, my = -100, rx = mx, ry = my, glHover = false;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; }, { passive: true });
    gsap.ticker.add(() => { rx += (mx - rx) * .2; ry += (my - ry) * .2; ring.style.transform = `translate(${rx}px,${ry}px)`; });
    let domHover = false;
    document.addEventListener('pointerover', (e) => { const t = e.target.closest('[data-cursor]'); domHover = !!t; if (t) lab.textContent = t.dataset.cursor; cur.classList.toggle('big', domHover || glHover); });
    window.__cursor = (on, txt) => { glHover = on; if (on && txt) lab.textContent = txt; cur.classList.toggle('big', domHover || glHover); };
  }

  /* ================= gallery dialog ================= */
  const sheet = $('#sheet'), thumbs = $('#thumbs'), lb = $('#lb'), lbImg = $('#lbImg');
  let gal = [], gi = 0;
  const preload = (src) => { const im = new Image(); im.src = src; };
  const showLb = (i) => { gi = (i + gal.length) % gal.length; lbImg.classList.remove('swap'); void lbImg.offsetWidth; lbImg.classList.add('swap'); lbImg.src = gal[gi].src; lbImg.alt = gal[gi].alt; $('#lbCount').textContent = `${gi + 1} / ${gal.length}`; lb.hidden = false; preload(gal[(gi + 1) % gal.length].src); };
  const openGallery = (name, i) => {
    gal = name === 'comics' ? comics : cards;
    $('#sheetTitle').textContent = name === 'comics' ? 'Comic art and commissions' : 'Upper Deck trading cards';
    $('#sheetMeta').textContent = `${gal.length} works`;
    thumbs.innerHTML = gal.map((g, k) => `<li><button type="button" data-k="${k}" aria-label="Open ${g.alt}"><img src="${g.thumb}" alt="" loading="lazy" decoding="async"></button></li>`).join('');
    lb.hidden = true; $('#ba').hidden = name !== 'comics'; if (name === 'comics') buildBA(); if (!sheet.open) sheet.showModal(); if (lenis) lenis.stop(); if (name === 'comics') sweepBA();
    if (typeof i === 'number' && !isNaN(i)) showLb(i); else $('#sheetClose').focus();
  };
  sheet.addEventListener('close', () => { if (lenis) lenis.start(); });
  const BA = [['Baroness', 665, 1000, 1], ['Optimus Prime', 675, 1000, 3], ['Optimus Prime head', 672, 1000, 4], ['Evangelion', 750, 1000, 2]];
  let baBuilt = false;
  const setCmp = (c, v) => { v = Math.max(0, Math.min(100, v)); c.style.setProperty('--x', v + '%'); c._x = v; const k = c.querySelector('.knob'); k.setAttribute('aria-valuenow', Math.round(v)); k.setAttribute('aria-valuetext', `${Math.round(v)} percent linework`); };
  const buildBA = () => {
    if (baBuilt) return; baBuilt = true;
    $('#baGrid').innerHTML = BA.map(([t, w, h, n]) => `<div class="cmp" style="--ar:${w}/${h}"><img src="img/ba-${n}-b.webp" alt="${t}, finished colour by Giovanni Ricco" loading="lazy"><div class="a"><img src="img/ba-${n}-a.webp" alt="${t}, linework by Giovanni Ricco" loading="lazy"></div><span class="tag tag--a">Ink</span><span class="tag tag--b">Colour</span><button class="knob" type="button" role="slider" aria-label="${t}: compare linework and colour" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><span aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg></span></button></div>`).join('');
    $$('.cmp').forEach((c) => {
      c._x = 50; let down = false;
      const at = (e) => { const r = c.getBoundingClientRect(); return (e.clientX - r.left) / r.width * 100; };
      c.addEventListener('pointerdown', (e) => { down = true; if (c._tw) c._tw.kill(); c.setPointerCapture(e.pointerId); setCmp(c, at(e)); });
      c.addEventListener('pointermove', (e) => { if (down) setCmp(c, at(e)); else if (e.pointerType === 'mouse') setCmp(c, at(e)); });
      c.addEventListener('pointerup', () => { down = false; });
      c.addEventListener('pointercancel', () => { down = false; });
      c.querySelector('.knob').addEventListener('keydown', (e) => { const st = e.shiftKey ? 10 : 3; if (e.key === 'ArrowLeft') { setCmp(c, c._x - st); e.preventDefault(); } if (e.key === 'ArrowRight') { setCmp(c, c._x + st); e.preventDefault(); } });
    });
  };
  const sweepBA = () => {
    if (!MOTION) return;
    $$('.cmp').forEach((c, i) => { const o = { v: 50 }; c._tw = gsap.timeline({ delay: .5 + i * .12 }).to(o, { v: 88, duration: .7, ease: 'power2.inOut', onUpdate: () => setCmp(c, o.v) }).to(o, { v: 12, duration: 1, ease: 'power2.inOut', onUpdate: () => setCmp(c, o.v) }).to(o, { v: 50, duration: .8, ease: 'power2.inOut', onUpdate: () => setCmp(c, o.v) }); });
  };
  thumbs.addEventListener('click', (e) => { const b = e.target.closest('button[data-k]'); if (b) showLb(+b.dataset.k); });
  document.addEventListener('click', (e) => {
    const g = e.target.closest('[data-gal]'); if (g) { if (g.dataset.dragged === '1') return; openGallery(g.dataset.gal, +g.dataset.i); return; }
    const o = e.target.closest('[data-open]'); if (o) openGallery(o.dataset.open);
  });
  $('#sheetClose').onclick = () => sheet.close();
  $('#lbPrev').onclick = () => showLb(gi - 1);
  $('#lbNext').onclick = () => showLb(gi + 1);
  $('#lbDone').onclick = () => { lb.hidden = true; const b = thumbs.querySelector(`[data-k="${gi}"]`); if (b) { b.scrollIntoView({ block: 'center' }); b.focus(); } };
  sheet.addEventListener('keydown', (e) => { if (lb.hidden) return; if (e.key === 'ArrowRight') { showLb(gi + 1); e.preventDefault(); } if (e.key === 'ArrowLeft') { showLb(gi - 1); e.preventDefault(); } if (e.key === 'Escape') { e.preventDefault(); $('#lbDone').click(); } });
  sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });
  let sx = null; lb.addEventListener('pointerdown', (e) => { sx = e.clientX; }); lb.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) showLb(dx < 0 ? gi + 1 : gi - 1); });

  /* ================= loader ================= */
  const loaderDone = (() => { let fired = false; const cbs = []; return { on: (f) => fired ? f() : cbs.push(f), fire: () => { if (fired) return; fired = true; cbs.forEach((f) => f()); } }; })();
  const setLoad = (p) => { const n = $('#loadN'), bar = $('#loadBar'); if (!n || !bar) return; n.textContent = pad(Math.round(p * 100), 3); bar.style.transform = `scaleX(${p})`; };
  const closeLoader = () => {
    const L = $('#loader'); if (!L || L.dataset.done) return; L.dataset.done = 1;
    if (!MOTION) { L.remove(); loaderDone.fire(); return; }
    gsap.timeline({ onComplete: () => L.remove() })
      .to('.loader__c', { opacity: 0, y: -20, duration: .35, ease: 'power2.in' })
      .to('.loader__half--t', { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '<.15')
      .to('.loader__half--b', { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<')
      .add(() => loaderDone.fire(), '-=.6');
  };
  setTimeout(closeLoader, 4500);

  /* ================= HERO: WebGL flythrough ================= */
  const plates = [];
  const pickC = [18, 26, 1, 22, 16, 27, 4, 20, 14, 29, 2, 23, 10, 28, 12, 7, 21, 15, 0, 17, 25, 9, 5, 3, 13, 24];
  const pickK = [0, 42, 72, 96, 120, 150, 166, 13, 57, 80, 110, 140];
  for (let i = 0, a = 0, b = 0; plates.length < 22; i++) {
    if (i % 3 === 2 && b < pickK.length) { const k = pickK[b++]; plates.push({ src: cards[k].src, ar: 590 / 820, gal: 'cards', i: k }); }
    else if (a < pickC.length) { const k = pickC[a++]; plates.push({ src: comics[k].thumb, ar: comics[k].ar, gal: 'comics', i: k }); }
    else if (b < pickK.length) { const k = pickK[b++]; plates.push({ src: cards[k].src, ar: 590 / 820, gal: 'cards', i: k }); }
    else break;
  }
  $('#collage').innerHTML = plates.slice(0, 12).map((p) => `<img src="${p.src}" alt="" loading="lazy">`).join('');

  let gl = null;
  const initGL = () => {
    const THREE = window.THREE; const canvas = $('#gl');
    if (!THREE || !MOTION) return null;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); } catch (e) { return null; }
    if (!renderer.getContext()) return null;
    document.documentElement.classList.add('gl');
    const mobile = innerWidth < 760;
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setClearColor(0x08090b, 1);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(mobile ? 70 : 52, 1, .1, 100);
    const GAP = 2.7, START = 6;
    const vert = `uniform float uVel; varying vec2 vUv; varying float vD;
      void main(){ vUv=uv; vec3 p=position; float b=sin(uv.x*3.14159); p.z+=b*uVel*0.9; p.y+=b*uVel*0.12;
      vec4 mv=modelViewMatrix*vec4(p,1.); vD=-mv.z; gl_Position=projectionMatrix*mv; }`;
    const frag = `uniform sampler2D uTex; uniform float uVel; uniform float uHover; uniform float uReady; varying vec2 vUv; varying float vD;
      void main(){ float s=0.0025+abs(uVel)*0.05+uHover*0.004; vec2 uv=vUv;
      vec3 c=vec3(texture2D(uTex,uv+vec2(s,0.)).r, texture2D(uTex,uv).g, texture2D(uTex,uv-vec2(s,0.)).b);
      c=mix(c, c*1.1+0.03, uHover);
      float fog=smoothstep(26.,7.,vD)*smoothstep(0.35,2.2,vD)*uReady;
      vec3 bg=vec3(0.031,0.035,0.043); float e=step(0.006,uv.x)*step(uv.x,0.994)*step(0.006,uv.y)*step(uv.y,0.994);
      vec3 col=mix(vec3(0.26,0.5,0.72),c,e); gl_FragColor=vec4(mix(bg,col,fog),1.); }`;
    const geo = new THREE.PlaneGeometry(1, 1, 24, 1);
    const tl = new THREE.TextureLoader();
    const meshes = []; let loaded = 0;
    const rnd = (n) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };
    const done = () => { loaded++; setLoad(loaded / plates.length); if (loaded === plates.length) closeLoader(); };
    plates.forEach((p, i) => {
      const u = { uTex: { value: null }, uVel: { value: 0 }, uHover: { value: 0 }, uReady: { value: 0 } };
      const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ uniforms: u, vertexShader: vert, fragmentShader: frag }));
      m.visible = false;
      const h = p.gal === 'cards' ? 1.95 : 2.45;
      m.scale.set(h * p.ar, h, 1);
      const side = i % 2 ? 1 : -1;
      m.position.set(side * ((mobile ? .62 : 1.05) + rnd(i) * (mobile ? .3 : .75)), (rnd(i + 9) - .5) * (mobile ? 2.2 : 1.5), -i * GAP - (mobile ? 2 : 0));
      m.rotation.y = -side * (0.18 + rnd(i + 3) * .2);
      m.rotation.z = (rnd(i + 5) - .5) * .12;
      m.userData = p; scene.add(m); meshes.push(m);
      tl.load(p.src, (t) => { t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; u.uTex.value = t; m.visible = true; gsap.to(u.uReady, { value: 1, duration: 1.4, ease: 'power2.out' }); done(); }, undefined, done);
    });
    const END = -18 * GAP + 0.6 - (mobile ? 2 : 0);
    const size = () => { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    size(); addEventListener('resize', size);
    let target = 0, cur = 0, prev = 0, vel = 0, mx = 0, my = 0, cmx = 0, cmy = 0, running = true, hovered = null, t0 = performance.now();
    const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(-9, -9);
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width * 2 - 1; my = (e.clientY - r.top) / r.height * 2 - 1; ndc.set(mx, -my); });
    hero.addEventListener('pointerleave', () => { ndc.set(-9, -9); mx = my = 0; });
    hero.addEventListener('click', () => { if (hovered) openGallery(hovered.userData.gal, hovered.userData.i); });
    const tick = () => {
      if (!running) return;
      cur += (target - cur) * 0.075;
      const v = (cur - prev) * 40; prev = cur; vel += (v - vel) * 0.12;
      const idle = (performance.now() - t0) / 1000;
      cmx += (mx - cmx) * .05; cmy += (my - cmy) * .05;
      camera.position.set(cmx * .6 + Math.sin(idle * .3) * .12, -cmy * .35 + Math.cos(idle * .25) * .08, START + (END - START) * Math.min(1, cur / .7) - Math.pow(Math.max(0, (cur - .7) / .3), 2) * 16);
      camera.rotation.set(-cmy * .06, -cmx * .1, cmx * .02 + vel * .05);
      let h = null;
      if (FINE) { ray.setFromCamera(ndc, camera); const hit = ray.intersectObjects(meshes)[0]; h = hit && hit.distance < 14 ? hit.object : null; }
      if (h !== hovered) { hovered = h; window.__cursor(!!h, 'View'); hero.style.cursor = h ? 'pointer' : ''; }
      const vv = Math.max(-1.2, Math.min(1.2, vel));
      meshes.forEach((m) => { const u = m.material.uniforms; u.uVel.value = vv; u.uHover.value += ((m === hovered ? 1 : 0) - u.uHover.value) * .12; });
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);
    return { setProgress: (p) => { target = p; }, run: (on) => { running = on; } };
  };
  try { gl = initGL(); } catch (e) { console.warn(e); gl = null; }
  if (!gl) {
    const imgs = $$('#collage img'); let n = 0;
    const one = () => { n++; setLoad(n / imgs.length); if (n >= imgs.length) closeLoader(); };
    imgs.forEach((im) => { im.loading = 'eager'; if (im.complete) one(); else { im.onload = one; im.onerror = one; } });
    if (!imgs.length) closeLoader();
  }

  if (MOTION) {
    gsap.set(['.ln1', '.ln2'], { yPercent: 110 });
    gsap.set(['.hero__line', '.hero__tag', '#hint'], { opacity: 0, y: 16 });
    loaderDone.on(() => {
      gsap.to('.ln1', { yPercent: 0, duration: 1.3, ease: 'expo.out' });
      gsap.to('.ln2', { yPercent: 0, duration: 1.3, ease: 'expo.out', delay: .1 });
      gsap.to(['.hero__line', '.hero__tag', '#hint'], { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .08, delay: .5 });
    });
    const heroLen = () => innerHeight * (innerWidth < 760 ? 2.7 : 3.3);
    const htl = gsap.timeline({ defaults: { ease: 'none' } });
    htl.to('#heroTitle', { scale: 1.6, opacity: 0, filter: 'blur(12px)', ease: 'power1.in', duration: .2 }, 0)
      .to('#hint', { opacity: 0, duration: .08 }, 0)
      .fromTo('#heroEnd', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .11 }, .52)
      .to('#heroEnd', { opacity: 0, y: -40, duration: .12 }, .76)
      .to('#gl', { opacity: 0, duration: .14 }, .86);
    ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: () => '+=' + heroLen(), pin: true, scrub: true, animation: htl,
      onUpdate: (s) => { if (gl) gl.setProgress(s.progress); },
      onToggle: (s) => { if (gl) gl.run(s.isActive || s.progress < 1); } });
  } else closeLoader();

  /* ================= MANIFESTO ================= */
  const mani = $('#mani');
  const keyW = new Set(['drawing', 'visual', 'effects:', 'layer', 'page', 'comics.']);
  mani.innerHTML = mani.textContent.trim().split(/\s+/).map((w) => `<span class="w${keyW.has(w) ? ' k' : ''}">${w}</span>`).join(' ');
  const mw = $$('.w', mani);
  if (MOTION) {
    ScrollTrigger.create({ trigger: mani, start: 'top 82%', end: 'bottom 45%', scrub: true, onUpdate: (s) => { const lit = Math.round(s.progress * mw.length); mw.forEach((w, i) => w.classList.toggle('on', i < lit)); } });
    $$('.float').forEach((f) => { const sp = +f.dataset.speed; gsap.fromTo(f, { y: -sp * 90, rotate: sp * 3 }, { y: sp * 90, rotate: -sp * 3, ease: 'none', scrollTrigger: { trigger: '.mani', start: 'top bottom', end: 'bottom top', scrub: true } }); });
  } else mw.forEach((w) => w.classList.add('on'));

  /* ================= COMICS: horizontal ================= */
  const track = $('#hzTrack');
  const order = [18, 27, 0, 16, 22, 1, 28];
  track.insertAdjacentHTML('beforeend', order.map((k, n) => `<button class="pnl" type="button" data-gal="comics" data-i="${k}" data-cursor="View" style="--ar:${comics[k].ar.toFixed(3)}" aria-label="Open ${comics[k].alt}"><img src="${comics[k].thumb}" alt="" loading="lazy" decoding="async"><span class="pnl__n">${pad(n + 1)}</span><span class="pnl__t">${comics[k].title}</span></button>`).join('') + `<div class="hz__more"><button class="btn btn--holo" type="button" data-open="comics" data-cursor="Open">View the gallery <span aria-hidden="true">→</span></button><span>All 30 pieces, with ink-to-colour comparisons</span></div>`);
  if (MOTION) {
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const hz = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.hz', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, onUpdate: (s) => { $('#hzBar').style.transform = `scaleX(${s.progress})`; } } });
    $$('.pnl', track).forEach((p, n) => {
      gsap.fromTo($('img', p), { xPercent: -7 }, { xPercent: 7, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: hz, start: 'left right', end: 'right left', scrub: true } });
      gsap.fromTo(p, { rotate: (n % 2 ? 1 : -1) * 6, y: 70 }, { rotate: 0, y: 0, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: hz, start: 'left 110%', end: 'left 55%', scrub: true } });
    });
  }

  /* ================= CARDS: 3D ring ================= */
  const ringEl = $('#ring'), NR = 20, step = 360 / NR;
  const ringPick = Array.from({ length: NR }, (_, i) => Math.floor(i * NC / NR));
  ringEl.innerHTML = ringPick.map((k, i) => `<button class="rc" type="button" data-gal="cards" data-i="${k}" style="transform:rotateY(${i * step}deg) translateZ(var(--R))" aria-label="Open ${cards[k].alt}"><span class="rc__f"><img src="${cards[k].src}" alt="" decoding="async"></span><span class="rc__b" aria-hidden="true"><span>GR</span></span></button>`).join('');
  const rcs = $$('.rc', ringEl);
  let scrollRot = 0, dragRot = 0, dragV = 0, lastRot = null;
  const applyRing = () => {
    const rot = scrollRot + dragRot;
    if (rot === lastRot) return; lastRot = rot;
    ringEl.style.transform = `translateZ(calc(-1 * var(--R))) rotateX(-6deg) rotateY(${rot}deg)`;
    rcs.forEach((c, i) => {
      const a = ((i * step + rot) % 360 + 360) % 360, r = a * Math.PI / 180, f = Math.cos(r);
      c.style.setProperty('--br', (0.32 + 0.68 * Math.max(0, f)).toFixed(3));
      c.style.setProperty('--gl', Math.max(0, f * f * f).toFixed(3));
      c.style.setProperty('--hp', (50 + Math.sin(r) * 60).toFixed(1) + '%');
      c.tabIndex = f > .5 ? 0 : -1;
    });
  };
  applyRing();
  const st3 = $('#stage3d'); let dX = null, moved = 0;
  st3.addEventListener('pointerdown', (e) => { dX = e.clientX; moved = 0; dragV = 0; });
  addEventListener('pointermove', (e) => { if (dX === null) return; const dx = e.clientX - dX; dX = e.clientX; moved += Math.abs(dx); dragV = dx * .25; dragRot += dragV; applyRing(); });
  addEventListener('pointerup', () => { if (dX === null) return; dX = null; const d = moved > 6 ? '1' : '0'; rcs.forEach((c) => c.dataset.dragged = d); setTimeout(() => rcs.forEach((c) => c.dataset.dragged = '0'), 60); });
  const inertia = () => { if (dX === null && Math.abs(dragV) > .02) { dragV *= .94; dragRot += dragV; applyRing(); } requestAnimationFrame(inertia); };
  inertia();
  if (MOTION) {
    ScrollTrigger.create({ trigger: '.ring-sec', start: 'top top', end: () => '+=' + innerHeight * 2.2, pin: '.ring-pin', scrub: true, onUpdate: (s) => { scrollRot = -s.progress * 300; applyRing(); } });
    gsap.fromTo('.big178', { scale: .7, opacity: 0 }, { scale: 1.05, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.ring-sec', start: 'top bottom', end: 'top top', scrub: true } });
  } else { scrollRot = -20; applyRing(); }

  /* ================= MARQUEE (velocity-driven) ================= */
  const fill = (el, w) => { const s = w.map((x) => `<span>${x}</span>`).join(''); el.innerHTML = s + s + s + s; };
  const logoRow = (el, L) => { const one = L.map(([n, ar, k]) => `<span class="logo" style="--ar:${ar};--k:${k};--m:url(/img/logo-${n}.png)"></span>`).join(''); el.innerHTML = one + one + one + one; };
  logoRow($('#mq1'), [['netflix', 3.721, .55], ['disney', 1.829, 1], ['sky', 1.65, .8], ['fox', 2.367, .78], ['wb', .958, 1.12], ['prime', 3.264, .66]]);
  logoRow($('#mq2'), [['mediaset', 4.639, .46], ['rai', 1.8, .82], ['raicinema', 3.283, .58], ['upperdeck', 1.306, 1.05], ['netflix', 3.721, .55], ['fox', 2.367, .78]]);
  if (MOTION) {
    const t1 = gsap.to('#mq1', { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
    const t2 = gsap.fromTo('#mq2', { xPercent: -50 }, { xPercent: 0, duration: 44, ease: 'none', repeat: -1 });
    let boost = 1, dir = 1;
    ScrollTrigger.create({ trigger: '.mq', start: 'top bottom', end: 'bottom top', onUpdate: (s) => { dir = s.direction; boost = Math.max(-7, Math.min(7, s.getVelocity() / 160)); } });
    const sk = gsap.quickSetter('.mq__row', 'skewX', 'deg');
    gsap.ticker.add(() => { boost += (dir - boost) * .05; t1.timeScale(boost); t2.timeScale(boost); sk(Math.max(-14, Math.min(14, -(boost - dir) * 2.4))); });
    $$('.stat .n').forEach((n) => gsap.fromTo(n, { fontStretch: '50%' }, { fontStretch: '120%', ease: 'none', scrollTrigger: { trigger: n, start: 'top 92%', end: 'top 45%', scrub: true } }));
  }

  /* ================= REEL ================= */
  if (MOTION) {
    gsap.timeline({ scrollTrigger: { trigger: '.reel', start: 'top top', end: 'bottom bottom', scrub: true } })
      .fromTo('#reelWin', { clipPath: 'inset(22% 26% 22% 26% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut' }, 0)
      .fromTo('#reelWin img', { scale: 1.3 }, { scale: 1, ease: 'power2.inOut' }, 0)
      .fromTo('.reel__title h2', { scale: .8 }, { scale: 1, ease: 'power2.inOut' }, 0);
  }

  /* ================= FILMS: poster wall ================= */
  const wall = $('#wall');
  const NCOL = innerWidth < 760 ? 4 : 7;
  const cols = Array.from({ length: NCOL }, () => []);
  const pkey = (c) => posterKey[c[0]] || c[0];
  const fOrder = films.map((c, i) => i).sort((a, b) => (+films[b][1] - +films[a][1]) || (a - b));
  // Fixed slots [column, row] for the headline credits: centre and right of the screen while the wall is in view
  const SLOTS = NCOL === 7
    ? { ritual: [3, 5], cliffhanger: [3, 6], eterno: [3, 7], mektoub: [2, 5], pendragon: [2, 6], suburra: [2, 7], cortina: [4, 4], diabolik: [4, 5], natale: [4, 6], domani: [4, 7], ricciardi: [5, 5], petra: [5, 6], suspiria: [5, 7], well: [3, 4], river: [2, 4] }
    : { ritual: [1, 9], cliffhanger: [1, 10], pendragon: [1, 11], mektoub: [1, 12], diabolik: [2, 9], natale: [2, 10], domani: [2, 11], suspiria: [2, 12], suburra: [0, 12], ricciardi: [0, 11], petra: [0, 13], cortina: [1, 8], eterno: [2, 8], well: [0, 10], river: [1, 13] };
  const ROWS = Math.ceil(films.length / NCOL) + 1;
  const grid = Array.from({ length: NCOL }, () => Array(ROWS).fill(null));
  const placed = new Set();
  films.forEach((c, k) => { const sl = SLOTS[c[0]]; if (sl) { grid[sl[0]][sl[1]] = k; placed.add(k); } });
  const rest = fOrder.filter((k) => !placed.has(k));
  for (let r = 0; r < ROWS && rest.length; r++) for (let c = 0; c < NCOL && rest.length; c++) if (grid[c][r] === null) grid[c][r] = rest.shift();
  grid.forEach((col, ci) => col.forEach((k) => { if (k !== null) cols[ci].push(k); }));
  wall.innerHTML = cols.map((ids, ci) => {
    const seq = ids;
    return `<div class="films__col" data-col="${ci}">` + seq.map((k, n) => { const c = films[k]; return `<button type="button" class="pst" data-film="${k}" data-cursor="View" aria-label="${c[2]}, ${c[1]}"><img src="img/poster-${pkey(c)}.webp" alt="" loading="lazy" decoding="async"><span class="pst__cap"><b>${c[2]}</b><small>${c[1]} · ${c[4]}</small></span></button>`; }).join('') + `</div>`;
  }).join('');
  if (MOTION) {
    $$('.films__col', wall).forEach((col, ci) => {
      const dir = ci % 2 ? 1 : -1;
      gsap.fromTo(col, { yPercent: dir > 0 ? -30 : -6 }, { yPercent: dir > 0 ? -6 : -30, ease: 'none', scrollTrigger: { trigger: '.films', start: 'top bottom', end: 'bottom top', scrub: .6 } });
    });
    gsap.set('.films__wall', { xPercent: innerWidth < 760 ? -40 : -42, yPercent: -50 });
    gsap.fromTo('.films__wall', { rotateX: 22, rotateZ: -12, scale: 1.05 }, { rotateX: 12, rotateZ: -6, scale: .95, ease: 'none', scrollTrigger: { trigger: '.films', start: 'top bottom', end: 'bottom top', scrub: true } });
  }
  const fd = $('#film');
  const openFilm = (k) => {
    const [id, yr, t, type, role, by] = films[k];
    const forLabel = ['Netflix', 'Rai 1', 'Augustus Color'].includes(by) ? 'For' : 'Directed by';
    $('#filmImg').src = `img/poster-${pkey(films[k])}.webp`; $('#filmImg').alt = `Poster for ${t}`;
    $('#filmT').textContent = t;
    $('#filmMeta').innerHTML = `<dt>Year</dt><dd>${yr}</dd><dt>Type</dt><dd>${type}</dd><dt>Role</dt><dd>${role}</dd>` + (by ? `<dt>${forLabel}</dt><dd>${by}</dd>` : '');
    fd.dataset.k = k;
    if (!fd.open) fd.showModal(); if (lenis) lenis.stop();
  };
  wall.addEventListener('click', (e) => { const b = e.target.closest('[data-film]'); if (b) openFilm(+b.dataset.film); });
  fd.addEventListener('close', () => { if (lenis) lenis.start(); });
  fd.addEventListener('click', (e) => { if (e.target === fd) fd.close(); });
  $('#filmClose').onclick = () => fd.close();
  $('#filmPrev').onclick = () => openFilm(fOrder[(fOrder.indexOf(+fd.dataset.k) - 1 + films.length) % films.length]);
  $('#filmNext').onclick = () => openFilm(fOrder[(fOrder.indexOf(+fd.dataset.k) + 1) % films.length]);
  fd.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') $('#filmNext').click(); if (e.key === 'ArrowLeft') $('#filmPrev').click(); });

  /* ================= NODE GRAPH ================= */
  const ng = $('#ng'), svg = $('#wires');
  const feats = credits.filter((c) => c[3] === 'Feature film'), series = credits.filter((c) => c[3] === 'Series');
  const nodes = [];
  feats.forEach((c, i) => nodes.push({ id: c[0], kind: 'read', x: 16 + i * 121, y: 28 + (i % 2) * 56, c, to: 'mF' }));
  series.forEach((c, i) => nodes.push({ id: c[0], kind: 'read series', x: 620 + i * 121, y: 196 + (i % 2) * 46, c, to: 'mS' }));
  nodes.push({ id: 'mF', kind: 'merge', x: 290, y: 300, label: 'Merge1', sub: 'over · 10 inputs', to: 'mA' });
  nodes.push({ id: 'mS', kind: 'merge', x: 860, y: 350, label: 'Merge2', sub: 'over · 5 inputs', to: 'mA' });
  nodes.push({ id: 'mA', kind: 'merge', x: 572, y: 420, label: 'Merge3', sub: 'plus', to: 'gr' });
  nodes.push({ id: 'gr', kind: 'grade', x: 572, y: 492, label: 'Grade1', sub: '15+ years', to: 'wr' });
  nodes.push({ id: 'wr', kind: 'write', x: 545, y: 566, label: 'Write1', sub: 'giovanni_ricco.####.exr', to: 'vw' });
  nodes.push({ id: 'vw', kind: 'viewer', x: 830, y: 566, label: 'Viewer1', sub: 'open showreel' });
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  ng.insertAdjacentHTML('beforeend', nodes.map((n) => {
    const inner = n.c ? `<b>${n.c[2]}</b><small>Read · ${n.c[1]}</small>` : `<b>${n.label}</b><small>${n.sub}</small>`;
    return `<button type="button" class="node ${n.kind}" id="n-${n.id}" style="left:${n.x}px;top:${n.y}px">${inner}</button>`;
  }).join(''));
  nodes.forEach((n) => { n.el = $('#n-' + n.id); });
  let sel = null;
  const chainOf = (n) => { const out = []; let c = n; while (c && c.to) { out.push(c.id); c = byId[c.to]; } return out; };
  const drawWires = () => {
    const hot = sel ? chainOf(sel) : [];
    svg.innerHTML = nodes.filter((n) => n.to).map((n) => {
      const a = n.el, t = byId[n.to], b = t.el;
      let d;
      if (n.id === 'wr') { const y1 = n.y + a.offsetHeight / 2, y2 = t.y + b.offsetHeight / 2, x1 = n.x + a.offsetWidth, x2 = t.x; d = `M${x1},${y1} C${x1 + 60},${y1} ${x2 - 60},${y2} ${x2},${y2}`; }
      else { const x1 = n.x + a.offsetWidth / 2, y1 = n.y + a.offsetHeight, x2 = t.x + b.offsetWidth / 2, y2 = t.y; d = `M${x1},${y1} C${x1},${y1 + 70} ${x2},${y2 - 70} ${x2},${y2}`; }
      return `<path d="${d}" class="${hot.includes(n.id) ? 'hot' : ''}"/>` + (!n.c ? `<path d="${d}" class="flow"/>` : '');
    }).join('');
  };
  const props = $('#props');
  const select = (n) => {
    sel = n; nodes.forEach((m) => m.el.classList.toggle('sel', m === n));
    if (n.c) {
      const [id, yr, t, type, role, by] = n.c;
      const forLabel = ['Netflix', 'Rai 1', 'Augustus Color'].includes(by) ? 'For' : 'Directed by';
      props.innerHTML = `<span class="mono">Properties · Read${credits.indexOf(n.c) + 1}</span><h3>${t}</h3><dl><dt>Year</dt><dd>${yr}</dd><dt>Type</dt><dd>${type}</dd><dt>Role</dt><dd>${role}</dd><dt>${forLabel}</dt><dd>${by}</dd></dl><span class="file">file: /plates/${id}_${yr}/${id}.####.exr</span>`;
    } else if (n.id === 'vw') {
      props.innerHTML = `<span class="mono">Properties · Viewer1</span><h3>VFX Showreel 2026</h3><p class="lede" style="font-size:1rem">The output of this script. Watch it on YouTube.</p><div><a class="btn" href="https://www.youtube.com/watch?v=_AM4_J3ZbMg" target="_blank" rel="noopener noreferrer">Play the showreel ↗</a></div>`;
    } else {
      const ins = nodes.filter((m) => m.to === n.id).length;
      props.innerHTML = `<span class="mono">Properties · ${n.label}</span><h3>${n.label}</h3><dl><dt>Node</dt><dd>${n.kind}</dd><dt>Inputs</dt><dd>${ins || 1}</dd><dt>Note</dt><dd>${n.sub}</dd></dl>`;
    }
    drawWires();
  };
  let Z = 1;
  nodes.forEach((n) => {
    let sx0 = null, sy0, ox, oy, mv = 0;
    n.el.addEventListener('pointerdown', (e) => { n.el.setPointerCapture(e.pointerId); sx0 = e.clientX; sy0 = e.clientY; ox = n.x; oy = n.y; mv = 0; });
    n.el.addEventListener('pointermove', (e) => { if (sx0 == null) return; const dx = (e.clientX - sx0) / Z, dy = (e.clientY - sy0) / Z; mv = Math.max(mv, Math.abs(dx) + Math.abs(dy)); if (mv < 4) return; n.x = Math.max(0, Math.min(1240 - n.el.offsetWidth, ox + dx)); n.y = Math.max(0, Math.min(640 - n.el.offsetHeight, oy + dy)); n.el.style.left = n.x + 'px'; n.el.style.top = n.y + 'px'; drawWires(); });
    n.el.addEventListener('pointerup', () => { sx0 = null; });
    n.el.addEventListener('click', () => { if (mv > 4) return; select(n); });
    n.el.addEventListener('focus', () => { if (sel !== n) select(n); });
  });
  select(byId.cliffhanger);
  const fitGraph = () => { const w = ng.parentElement.clientWidth; Z = Math.max(.62, Math.min(1, w / 1240)); ng.style.zoom = Z; };
  fitGraph(); addEventListener('resize', fitGraph);
  if (document.fonts) document.fonts.ready.then(drawWires);

  /* ================= ANIMATIONS ================= */
  const maxV = Math.max(...videos.map((v) => v[2]));
  $('#alist').innerHTML = videos.map((v, i) => `<li><a href="https://www.youtube.com/watch?v=${v[0]}" target="_blank" rel="noopener noreferrer" data-pos="${v[3]}" data-cursor="Watch"><span class="i">${pad(i + 1)}</span><span class="t">${v[1]}</span><span class="v">${v[2].toLocaleString('en-US')} views</span><span class="bar" aria-hidden="true"><i style="--w:${(v[2] / maxV * 100).toFixed(1)}%"></i></span></a></li>`).join('');
  /* ================= ABOUT ================= */
  if (MOTION) {
    gsap.fromTo('#portrait img', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '#portrait', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('#portrait', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '#portrait', start: 'top 85%' } });
    gsap.from('.about__text p', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: .12, scrollTrigger: { trigger: '.about__text', start: 'top 85%' } });
  }


  /* ================= FACE: scrub the head turn with the cursor ================= */
  (() => {
    const sec = $('#face'), v = $('#faceV');
    const FPS = 24, FRAMES = 124, CENTER = 75, LAST = FRAMES - 1, HEAD = { x: .557, y: .42 }, VW = 1920, VH = 1080, FOLLOW = .16;
    const small = matchMedia('(max-width: 899.98px), (max-aspect-ratio: 1/1)').matches;
    v.poster = small ? 'media/face-center-sm.webp' : 'media/face-center-lg.webp';
    if (RM) return;
    const clamp = (x) => Math.max(-1, Math.min(1, x));
    const frameAt = (nx) => { const n = clamp(nx * 1.15); return n < 0 ? CENTER + n * CENTER : CENTER + n * (LAST - CENTER); };
    const headX = () => { const r = v.getBoundingClientRect(); const s = Math.max(r.width / VW, r.height / VH); const px = parseFloat(getComputedStyle(v).objectPosition.split(' ')[0]) / 100; return r.left + (r.width - VW * s) * px + HEAD.x * VW * s; };
    let target = CENTER, cur = CENTER, shown = -1, visible = false, loaded = false, drift = !FINE, pausedUntil = 0, primed = false;
    const seek = (f) => { if (v.readyState < 1 || v.seeking) return false; const d = v.duration || FRAMES / FPS; v.currentTime = Math.min((f + .5) / FPS, d - .001); return true; };
    const prime = () => { if (primed) return; const p = v.play(); if (p) p.then(() => { primed = true; v.pause(); shown = -1; }).catch(() => {}); };
    const load = () => { if (loaded) return; loaded = true; v.preload = 'auto'; v.src = small ? 'media/face-sm.mp4' : 'media/face-lg.mp4'; v.addEventListener('loadedmetadata', () => { shown = -1; prime(); }, { once: true }); };
    new IntersectionObserver(([e]) => { if (e.isIntersecting) load(); }, { rootMargin: '900px 0px' }).observe(sec);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(sec);
    const track = (x) => { const h = headX(); const dx = x - h; target = frameAt(dx < 0 ? dx / Math.max(h, 1) : dx / Math.max(innerWidth - h, 1)); };
    if (FINE) {
      let back = 0;
      addEventListener('pointermove', (e) => { if (!visible) return; clearTimeout(back); track(e.clientX); sec.classList.add('used'); }, { passive: true });
      document.documentElement.addEventListener('pointerleave', () => { back = setTimeout(() => { target = CENTER; }, 600); });
    } else {
      const touch = (e) => { const t = e.touches ? e.touches[0] : e; if (!t) return; prime(); pausedUntil = Date.now() + 3500; track(t.clientX); sec.classList.add('used'); };
      sec.addEventListener('touchstart', touch, { passive: true }); sec.addEventListener('touchmove', touch, { passive: true });
      $('#faceHint').textContent = 'Touch to make her look';
    }
    let prev = 0;
    const loop = (now) => {
      requestAnimationFrame(loop);
      if (!visible || !loaded) { prev = 0; return; }
      const dt = prev ? Math.min(now - prev, 64) : 16.7; prev = now;
      if (drift && Date.now() > pausedUntil) target = frameAt(Math.sin(now / 1700) * .8);
      cur += (target - cur) * (1 - Math.pow(1 - FOLLOW, dt / 16.7));
      if (Math.abs(target - cur) < .04) cur = target;
      const f = Math.round(cur);
      if (f !== shown && seek(f)) shown = f;
    };
    requestAnimationFrame(loop);
  })();

  /* ================= CONTACT: fisheye type ================= */
  const fish = $('#fish');
  $$('.row', fish).forEach((r) => { r.innerHTML = [...r.textContent].map((ch) => ch === ' ' ? ' ' : `<span class="ch">${ch}</span>`).join(''); });
  const chs = $$('.ch', fish);
  if (MOTION) {
    let px = 0, py = 0, idle = true, cache = [], vis = false;
    const measure = () => { cache = chs.map((c) => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); };
    const sec = $('#face');
    sec.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; idle = false; }, { passive: true });
    sec.addEventListener('pointerleave', () => { idle = true; });
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(fish);
    const cur = chs.map(() => 60);
    let frame = 0;
    gsap.ticker.add((time) => {
      if (!vis) return;
      if (frame++ % 10 === 0) measure();
      const fr = fish.getBoundingClientRect();
      chs.forEach((c, i) => {
        let tgt;
        if (idle) { const wx = fr.left + fr.width * (0.5 + 0.48 * Math.sin(time / 1.5)); const d = Math.abs(cache[i][0] - wx); tgt = 55 + 80 * Math.exp(-(d * d) / (2 * 150 * 150)); }
        else { const dx = cache[i][0] - px, dy = (cache[i][1] - py) * 1.3, d2 = dx * dx + dy * dy; tgt = 50 + 100 * Math.exp(-d2 / (2 * 180 * 180)); }
        cur[i] += (tgt - cur[i]) * .14;
        c.style.fontWeight = Math.round(Math.min(900, 200 + (cur[i] - 50) * 7)); c.style.transform = `scaleY(${(1 + (cur[i] - 50) / 900).toFixed(3)})`;
      });
    });
  }

  const mail = 'creativericco@gmail.com';
  $('#copyMail').onclick = async (e) => { const b = e.currentTarget; try { await navigator.clipboard.writeText(mail); b.textContent = 'Copied'; } catch { const r = document.createRange(); r.selectNodeContents($('#mail')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selected, press Ctrl+C'; } setTimeout(() => (b.textContent = 'Copy address'), 2200); };
  $('#form').addEventListener('submit', async (e) => {
    e.preventDefault(); const f = e.currentTarget, status = $('#status'), btn = f.querySelector('button[type=submit]');
    const bad = [...f.elements].find((el) => el.required && !el.checkValidity());
    if (bad) { status.textContent = bad.type === 'email' ? 'Enter an email address like name@example.com.' : `Fill in ${bad.name}.`; bad.focus(); return; }
    btn.disabled = true; btn.textContent = 'Sending'; status.textContent = '';
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: f.name.value, email: f.email.value, message: f.message.value }) });
      if (!r.ok) throw new Error();
      f.reset(); status.textContent = 'Message sent. I will reply by email.';
    } catch {
      status.textContent = `The message did not go through. Write to ${mail}.`;
    } finally { btn.disabled = false; btn.textContent = 'Send message'; }
  });

  /* ================= HUD timecode ================= */
  const secs = $$('[data-sec]');
  const hud = () => {
    const H = document.documentElement.scrollHeight - innerHeight; const p = H > 0 ? Math.min(1, Math.max(0, scrollY / H)) : 0;
    const f = Math.round(p * 2879);
    $('#hudFr').textContent = 'F ' + pad(f + 1, 4);
    $('#hudTc').textContent = `00:${pad(Math.floor(f / 1440))}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
    let a = secs[0]; for (const s of secs) if (s.getBoundingClientRect().top <= innerHeight * .4) a = s;
    $('#hudSec').textContent = a.dataset.sec;
  };
  if (lenis) lenis.on('scroll', hud); else addEventListener('scroll', hud, { passive: true });
  hud();
  if (HAS_GSAP) { addEventListener('load', () => ScrollTrigger.refresh()); if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh()); }
})();
