import { useEffect, useRef, useState } from 'react'

const CARDS = [
  { key: 'comics', title: 'Comic art, inked and coloured by hand.', img: 'images/work/comic.webp', pos: '62% 30%', action: 'comics' },
  { key: 'cards', title: 'Official Upper Deck sketch cards.', img: 'images/work/upper-deck.webp', pos: '50% 40%', action: 'cards' },
  { key: 'vfx', title: 'Compositing for film and television.', img: 'images/work/compositing.webp', pos: '50% 50%', href: '#vfx' },
  { key: 'anim', title: 'Animated openings, redesigned.', img: 'images/moving-image.webp', pos: '50% 45%', action: 'videos' },
]

/** "Get the highlights": carosello a scatti con lo scroll nativo, punti e frecce. */
export function Highlights({ open }) {
  const track = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const items = [...track.current.children]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(items.indexOf(e.target))),
      { root: track.current, threshold: 0.6 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (i) => {
    const el = track.current.children[Math.max(0, Math.min(CARDS.length - 1, i))]
    track.current.scrollTo({ left: el.offsetLeft - track.current.offsetLeft - parseFloat(getComputedStyle(track.current).scrollPaddingLeft || 0), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <section id="highlights" className="highlights" aria-labelledby="hl-title">
      <h2 id="hl-title" className="section-title wrap">Get the highlights.</h2>
      <ul ref={track} className="highlights__track">
        {CARDS.map((c) => {
          const body = (
            <>
              <img src={c.img} alt="" loading="lazy" decoding="async" style={{ objectPosition: c.pos }} />
              <span className="hl-card__title">{c.title}</span>
              <span className="hl-card__plus" aria-hidden="true" />
            </>
          )
          return (
            <li key={c.key} className="hl-card">
              {c.href
                ? <a className="hl-card__inner" href={c.href} aria-label={c.title}>{body}</a>
                : <button type="button" className="hl-card__inner" onClick={() => open(c.action)} aria-label={`Open: ${c.title}`}>{body}</button>}
            </li>
          )
        })}
      </ul>
      <div className="highlights__controls">
        <div className="dots" role="tablist" aria-label="Highlights">
          {CARDS.map((c, i) => (
            <button key={c.key} type="button" role="tab" aria-selected={active === i} aria-label={`Highlight ${i + 1} of ${CARDS.length}`} className="dots__dot" onClick={() => go(i)} />
          ))}
        </div>
        <div className="arrows">
          <button type="button" className="round" aria-label="Previous" onClick={() => go(active - 1)} disabled={active === 0}>‹</button>
          <button type="button" className="round" aria-label="Next" onClick={() => go(active + 1)} disabled={active === CARDS.length - 1}>›</button>
        </div>
      </div>
    </section>
  )
}
