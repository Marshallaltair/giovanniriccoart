/**
 * PROFILO — unica fonte per testi biografici, SEO e schema.org.
 */
export const TODO = 'TODO_CONTENT'

export const profile = {
  name: 'Giovanni Ricco',
  firstName: 'Giovanni',
  lastName: 'Ricco',
  url: 'https://giovanniriccoart.com',
  descriptor: 'Illustrator & Senior VFX Compositor',
  location: 'Rome, Italy',

  hero: {
    image: null,
    alt: '',
  },

  portrait: {
    image: '/images/portrait.jpeg',
    alt: 'Portrait of Giovanni Ricco',
  },

  statement:
    'I work between drawing and visual effects: from comics, storyboards and illustration to compositing for film and television. I build images layer by layer, with the same attention to structure, rhythm and detail that guides a page of comics.',

  about: [
    'Giovanni Ricco is an illustrator and senior VFX compositor based in Rome. His visual background began with comics, 2D animation and industrial design, followed by storyboards and motion graphics for advertising.',
    'His first VFX work was with Franco Zeffirelli. Since then, he has worked freelance with VFX studios and film and television productions in Italy and internationally, with a focus on digital compositing and shot finishing.',
    'Alongside VFX, he creates illustration and trading card artwork, including work for Upper Deck. He also teaches compositing, matte painting and VFX supervision.',
  ],

  clients: ['Netflix', 'Disney', 'Sky', 'Fox', 'Warner Bros.'],

  experience: [
    { role: 'Senior VFX Compositor', place: 'Blackstone Studio VFX' },
    { role: 'Trading Card Artist', place: 'Upper Deck' },
    { role: 'Freelance VFX Compositor', place: 'VFX studios, film & television productions' },
    { role: 'VFX Artist', place: 'Franco Zeffirelli production' },
    { role: 'Storyboard Artist & Motion Graphics Designer', place: 'Advertising' },
  ],

  teaching: {
    subjects: ['compositing', 'matte painting', 'VFX supervision'],
    places: ["Scuola d'Arte Cinematografica Gian Maria Volonté"],
  },

  education: [
    { title: 'Industrial Design', place: 'Sapienza Università di Roma' },
  ],

  tools: ['Nuke'],

  email: null,

  seo: {
    title: 'Giovanni Ricco — Illustrator & VFX Compositor in Rome',
    description:
      'Giovanni Ricco is a Rome-based illustrator and senior VFX compositor specializing in comics, trading card art, Nuke compositing, matte painting, film and television visual effects.',
    ogImage: '/og-image.jpg',
    locale: 'en_US',
  },
}
