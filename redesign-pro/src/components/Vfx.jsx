import { useState } from 'react'
import { filmography } from '@data/filmography.js'
import { social } from '@data/social.js'
import { asset, logos, showreel } from '../content.js'

export function Vfx() {
  const [play, setPlay] = useState(false)
  return (
    <section id="vfx" className="vfx" aria-labelledby="vfx-title">
      <header className="chapter__head wrap">
        <h2 id="vfx-title" className="chapter__title">Visual effects for film and television.</h2>
        <p className="chapter__sub">Digital compositing and shot finishing in Nuke, for feature films and series in Italy and abroad.</p>
      </header>

      <div className="wrap">
        <div className="reel">
          {play ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${showreel.id}?autoplay=1&rel=0`} title={`Giovanni Ricco, ${showreel.title}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          ) : (
            <button type="button" className="reel__poster" onClick={() => setPlay(true)} aria-label={`Play ${showreel.title}`}>
              <img src="images/work/compositing.webp" alt="" loading="lazy" />
              <span className="reel__label">{showreel.title}</span>
              <span className="play play--big" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="shelf-head wrap">
        <h3 className="shelf-head__title">Selected credits</h3>
        <a className="more" href={social.imdb.url} target="_blank" rel="noopener noreferrer">Full credits on IMDb</a>
      </div>
      <ul className="shelf shelf--posters" aria-label="Selected credits">
        {filmography.map((f) => (
          <li key={f.id} className="poster">
            <div className="poster__img">{f.image ? <img src={asset(f.image)} alt={`Poster for ${f.title}`} loading="lazy" decoding="async" /> : null}</div>
            <p className="poster__title">{f.title}</p>
            <p className="poster__meta">{f.year}, {f.role.toLowerCase()}</p>
          </li>
        ))}
      </ul>

      <div className="logos wrap" aria-label="Productions and studios">
        <ul className="logos__row">
          {logos.map((l) => <li key={l.name} style={{ '--w': `${l.width}px` }}><img src={l.src} alt={l.name} loading="lazy" /></li>)}
        </ul>
      </div>
    </section>
  )
}
