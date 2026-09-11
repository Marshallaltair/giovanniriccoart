/**
 * Canali pubblici di Giovanni Ricco.
 * Alimentano: sezione "Elsewhere", menu, footer e schema.org `sameAs`.
 *
 * image: sfondo mostrato all'hover (opzionale). Se null viene usato il tono.
 */
export const social = {
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    handle: '@giovanniriccoart',
    url: 'https://instagram.com/giovanniriccoart',
    note: 'Illustration, trading cards and work in progress',
    image: null,
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/giovanniricco',
    url: 'https://www.linkedin.com/in/giovanniricco',
    note: 'Professional work and studio experience',
    image: null,
  },
  imdb: {
    id: 'imdb',
    label: 'IMDb',
    handle: 'nm4150481',
    url: 'https://www.imdb.com/name/nm4150481/',
    note: 'Full film and television credits',
    image: null,
  },
  youtube: {
    id: 'youtube',
    label: 'YouTube',
    handle: '@GiovanniRiccodesign',
    url: 'https://www.youtube.com/@GiovanniRiccodesign',
    note: 'Video, motion and visual work',
    image: null,
    // ID canale verificato dalla pagina pubblica del canale.
    channelId: 'UC-nlXpDaA5ARTiTgKkNGbRw',
    // Video mostrato nella sezione "Moving image".
    featuredVideoId: 'BwP3EUIEsVI',
  },
}

/** Ordine di visualizzazione. */
export const socialList = [social.instagram, social.linkedin, social.imdb, social.youtube]
