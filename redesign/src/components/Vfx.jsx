import { useState } from 'react'
import { filmography } from '@data/filmography.js'
import { social } from '@data/social.js'
import { asset, logos, showreel } from '../content.js'

function Showreel() {
  const [play, setPlay] = useState(false)
  return (
    <div className="reel">
      {play ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${showreel.id}?autoplay=1&rel=0`} title={`Giovanni Ricco, ${showreel.title}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <button type="button" className="reel__poster" onClick={() => setPlay(true)}>
          <img src={`https://i.ytimg.com/vi/${showreel.id}/maxresdefault.jpg`} alt="" loading="lazy" />
          <span className="reel__play">Play showreel</span>
        </button>
      )}
    </div>
  )
}

/**
 * Il capitolo VFX: qui la pagina diventa lo schermo del viewer.
 * Unico cambio di tema del sito, fatto con un'accensione dello schermo.
 */
export function Vfx() {
  return (
    <section id="vfx" className="vfx" aria-labelledby="vfx-title">
      <div className="vfx__screen">
        <header className="vfx__head">
          <h2 id="vfx-title" className="vfx__title">VFX compositing for film and television</h2>
          <p className="vfx__lede">Digital compositing and shot finishing in Nuke, for feature films and series in Italy and abroad.</p>
        </header>

        <Showreel />

        <div className="credits">
          <div className="credits__head">
            <h3 className="credits__title">Selected credits</h3>
            <a className="ink-link ink-link--light" href={social.imdb.url} target="_blank" rel="noopener noreferrer">Full credits on IMDb</a>
          </div>
          <ol className="credits__grid">
            {filmography.map((f) => (
              <li key={f.id} className="credit">
                <div className="credit__poster">{f.image ? <img src={asset(f.image)} alt={`Poster for ${f.title}`} loading="lazy" decoding="async" /> : null}</div>
                <p className="credit__name">{f.title}</p>
                <p className="credit__meta"><span className="mono">{f.year}</span> {f.role}</p>
                <p className="credit__by">{f.by}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="logos" aria-label="Selected productions and VFX studios">
          <p className="logos__label">Productions and studios I have worked with</p>
          <div className="logos__viewport">
            <ul className="logos__track">
              {[...logos, ...logos].map((l, i) => (
                <li key={`${l.name}-${i}`} aria-hidden={i >= logos.length}>
                  <img src={l.src} alt={i < logos.length ? l.name : ''} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
