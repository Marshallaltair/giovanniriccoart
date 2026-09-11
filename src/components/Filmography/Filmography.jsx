import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.js'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery.js'
import { RevealText } from '../ui/RevealText.jsx'
import { Media } from '../ui/Media.jsx'
import { filmography } from '../../data/filmography.js'
import { social } from '../../data/social.js'
import './Filmography.css'

export function Filmography() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(null)
  const preview = useRef(null)
  const hasStills = filmography.some((f) => f.image)

  useEffect(() => {
    if (!fine || reduced || !hasStills) return undefined
    const el = preview.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' })
    const move = (e) => { xTo(e.clientX + 24); yTo(e.clientY - el.offsetHeight / 2) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [fine, reduced, hasStills])

  const activeFilm = active != null ? filmography[active] : null

  return (
    <>
      <section id="films" className="films" aria-labelledby="films-title" style={{ '--tone': activeFilm?.tone ?? 'var(--ink)' }} data-active={active != null}>
        <div className="films__head">
          <RevealText id="films-title" className="films__title" lines={['Selected', 'credits']} />
          <a href={social.imdb.url} className="films__imdb link link--static" target="_blank" rel="noopener noreferrer" data-cursor="Open">Full credits on IMDb</a>
        </div>
        <ol className="films__grid" onPointerLeave={() => setActive(null)}>
          {filmography.map((film, i) => (
            <li key={film.id} className="films__card" data-active={active === i || open === i} onPointerEnter={() => fine && setActive(i)}>
              <button type="button" className="films__card-button" aria-expanded={open === i} aria-controls={`film-${film.id}`} onClick={() => setOpen(open === i ? null : i)} data-cursor="Open">
                <span className="films__poster">{film.image ? <Media image={film.image} alt={`Poster for ${film.title}`} /> : <span className="films__poster-placeholder" aria-hidden="true" />}</span>
                <span className="films__meta"><span className="films__year">{film.year}</span><span className="films__type">{film.type}</span></span>
                <span className="films__name">{film.title}</span>
                <span className="films__role">{film.role}</span>
                <span className="films__by">{film.by}</span>
              </button>
              <div id={`film-${film.id}`} className="films__detail" hidden={open !== i}><span>{film.role}</span><span>{film.type}, {film.by}</span></div>
            </li>
          ))}
        </ol>
        {fine && hasStills ? <div ref={preview} className="films__preview" data-visible={Boolean(activeFilm?.image)} aria-hidden="true">{filmography.map((film) => <div key={film.id} className="films__preview-item" data-active={activeFilm?.id === film.id}><Media image={film.image} alt="" /></div>)}</div> : null}
      </section>
    </>
  )
}
