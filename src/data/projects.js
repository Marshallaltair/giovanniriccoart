import { TODO } from './profile.js'
import { social } from './social.js'

/** Selected work shown on the homepage. */
export const projects = [
  {
    id: 'upper-deck',
    title: 'Upper Deck Trading Card Art',
    year: TODO,
    category: 'Illustration',
    description: 'Original illustration created for official Upper Deck trading cards.',
    image: '/images/work/upper-deck.webp',
    alt: 'Upper Deck Trading Card Art',
    link: null,
    focus: '50% 40%',
    tone: '#1d2126',
  },
  {
    id: 'artist-proofs',
    title: 'Comic Arts Illustration Commissions',
    year: 'Ongoing',
    category: 'Illustration',
    description: 'Comic art, signed artist proofs, illustrations and private commissions for collectors. Enquiries welcome.',
    image: null,
    alt: 'Comic Arts, Illustrations & Commissions',
    link: social.instagram.url,
    focus: '50% 50%',
    tone: '#221e1b',
  },
  {
    id: 'compositing',
    title: 'VFX Compositing for Film & Television',
    year: TODO,
    category: 'Visual Effects',
    description: 'Digital compositing and shot finishing in Nuke for feature films and television series.',
    image: null,
    alt: 'VFX Compositing for Film & Television',
    link: null,
    focus: '50% 50%',
    tone: '#1b1d1f',
  },
]
