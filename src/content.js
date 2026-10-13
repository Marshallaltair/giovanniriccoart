import logo0 from './assets/logos/netflix.png'
import logo1 from './assets/logos/mediaset.png'
import logo4 from './assets/logos/disneyplus.png'
import logo5 from './assets/logos/rai.png'
import logo6 from './assets/logos/raicinema.png'
import logo7 from './assets/logos/primevideo.png'
import logo8 from './assets/logos/upperdeck.png'

/**
 * Contenuti che nel sito originale vivono dentro i componenti.
 * I dati principali (profilo, progetti, filmografia, social) arrivano da ../src/data.
 */
export const comics = [
  'zatanna.webp', 'he-man_2017.webp', 'skeletor_2017.webp', 'optimusprime.webp', 'blackcat.webp',
  'IMG_20260603_124730.webp', 'IMG_20260603_124738.webp', 'batman-1.webp', 'batman-2.webp',
  'halloween.webp', 'optimus-1.webp', 'optimus-2.webp', 'PXL_20260603_074231656-2.webp',
  'rogue.webp', 'scarlet.webp', 'soundwave.webp', 'spiderman.webp', 'witchblade.webp', 'wolverine.webp',
].map((name) => ({ src: `images/work/comics/${encodeURIComponent(name)}`, alt: 'Comic art illustration by Giovanni Ricco' }))

export const upperDeckManifest = 'images/work/upper-deck/manifest.json'

export const showreel = { id: '_AM4_J3ZbMg', title: 'VFX Showreel 2026' }

export const videos = [
  { id: 'FKXJO_2Eokw', title: 'He-Man and the Masters of the Universe opening theme, 1984 redesign', views: 149135 },
  { id: 'pA1D2iFPscY', title: 'She-Ra Princess of Power opening theme, redesign', views: 125026 },
  { id: '6OYaYzL6DP0', title: 'He-Man and the Masters of the Universe opening theme, "pure design"', views: 102955 },
  { id: 'vh_vKSTXWLQ', title: 'Thor vs Iron Man, 2009', views: 85793 },
  { id: 'ibxP-ety2xc', title: 'He-Man and the Masters of the Universe opening theme, 1983 remake', views: 18203 },
]

// Loghi ritagliati, resi bianchi e bilanciati otticamente: width è la larghezza su desktop in px
export const logos = [
  { name: 'Netflix', src: logo0, width: 188 },
  { name: 'Prime Video', src: logo7, width: 196 },
  { name: 'Disney+', src: logo4, width: 175 },
  { name: 'Mediaset', src: logo1, width: 236 },
  { name: 'RAI', src: logo5, width: 88 },
  { name: 'Rai Cinema', src: logo6, width: 183 },
  { name: 'Upper Deck', src: logo8, width: 110 },
]

/** I percorsi nei dati iniziano con "/": li rendiamo relativi così la build funziona in qualunque cartella. */
export const asset = (path) => (path ? path.replace(/^\//, '') : path)
