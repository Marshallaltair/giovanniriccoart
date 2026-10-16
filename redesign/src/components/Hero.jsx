import { profile } from '@data/profile.js'
import { CompWipe } from './CompWipe.jsx'
import pencil from '../assets/comic-pencil.webp'

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero__name">{profile.name}</h1>
      <div className="hero__row">
        <p className="hero__descriptor">{profile.descriptor}<span>{profile.location}</span></p>
        <p className="hero__hint">Drag across the page to compare the pencil pass with the final colour.</p>
      </div>
      <CompWipe src="images/work/comic.webp" pencil={pencil} alt="Zatanna comic art by Giovanni Ricco, inked and coloured" />
    </section>
  )
}
