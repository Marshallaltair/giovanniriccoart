import { comics, upperDeckManifest } from '../content.js'
import { useJson } from '../hooks.js'
import { projects } from '@data/projects.js'

const byId = Object.fromEntries(projects.map((p) => [p.id, p]))

/** Due capitoli artistici, ognuno con un'anteprima e il link alla galleria completa. */
export function Chapters({ open }) {
  const ud = useJson(upperDeckManifest, true)
  const cards = (ud ?? []).slice(0, 10).map((n) => `images/work/upper-deck/${encodeURIComponent(n)}`)

  return (
    <>
      <section id="comics" className="chapter wrap" aria-labelledby="comics-title">
        <header className="chapter__head">
          <h2 id="comics-title" className="chapter__title">Comic art and commissions.</h2>
          <p className="chapter__sub">{byId['artist-proofs']?.description}</p>
          <button type="button" className="more" onClick={() => open('comics')}>Open the gallery</button>
        </header>
        <div className="mosaic">
          {comics.slice(0, 5).map((c, i) => (
            <button key={c.src} type="button" className={`mosaic__cell mosaic__cell--${i}`} onClick={() => open('comics')} aria-label="Open the comic art gallery">
              <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </section>

      <section id="cards" className="chapter" aria-labelledby="cards-title">
        <header className="chapter__head wrap">
          <h2 id="cards-title" className="chapter__title">Upper Deck trading cards.</h2>
          <p className="chapter__sub">{byId['upper-deck']?.description} Sketch cards and artist proofs.</p>
          <button type="button" className="more" onClick={() => open('cards')}>See all {ud ? ud.length : ''} cards</button>
        </header>
        <ul className="shelf shelf--cards" aria-label="Upper Deck cards preview">
          {cards.map((src, i) => (
            <li key={src}>
              <button type="button" className="shelf__card" onClick={() => open('cards')} aria-label={`Open the Upper Deck gallery, card ${i + 1}`}>
                <img src={src} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
