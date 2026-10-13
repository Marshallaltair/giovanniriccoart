/**
 * Contenuti che nel sito originale vivono dentro i componenti.
 * I dati principali (profilo, progetti, filmografia, social) arrivano da ../src/data.
 */
export const comics = [
  'zatanna.webp', 'he-man_2017.webp', 'skeletor_2017.webp', 'optimusprime.webp', 'blackcat.webp',
  'IMG_20260603_124730.webp', 'IMG_20260603_124738.webp', 'batman-1.webp', 'batman-2.webp',
  'halloween.webp', 'optimus-1.webp', 'optimus-2.webp', 'PXL_20260603_074231656~2.webp',
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

export const logos = [
  { name: 'Netflix', src: 'images/logos/Netflix.png' },
  { name: 'Mediaset', src: 'images/logos/mediaset.png' },
  { name: 'Blackstone Studio VFX', src: 'images/logos/blackstone-vfx.png' },
  { name: 'Augustus Color', src: 'images/logos/augustus-color.png' },
  { name: 'Alps Studios', src: 'images/logos/alps-studios.png' },
  { name: 'Disney+', src: 'images/logos/disneyplus.png' },
  { name: 'RAI', src: 'images/logos/RAI.png' },
  { name: 'Rai Cinema', src: 'images/logos/raicinema.png' },
]

/** I percorsi nei dati iniziano con "/": li rendiamo relativi così la build funziona in qualunque cartella. */
export const asset = (path) => (path ? path.replace(/^\//, '') : path)
