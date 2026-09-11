import { useEffect, useRef, useState } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery.js'
import { Media } from '../ui/Media.jsx'
import { socialList } from '../../data/social.js'
import './SocialLinks.css'

/** ELSEWHERE — i quattro canali come sezione visiva. */
export function SocialLinks() {
  const fine = useFinePointer()
  const [active, setActive] = useState(null)
  const list = useRef(null)

  useEffect(() => {
    if (fine) return undefined
    const rows = [...list.current.querySelectorAll('[data-index]')]
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(Number(entry.target.dataset.index))), { rootMargin: '-45% 0px -45% 0px' })
    rows.forEach((row) => io.observe(row))
    return () => io.disconnect()
  }, [fine])

  return (
    <section id="elsewhere" className="elsewhere" aria-labelledby="elsewhere-title" data-active={active != null}>
      <h2 id="elsewhere-title" className="visually-hidden">Elsewhere</h2>
      <div className="elsewhere__bg" aria-hidden="true">
        {socialList.map((s, i) => <div key={s.id} className={`elsewhere__layer elsewhere__layer--${s.id}`} data-active={active === i}>{s.image ? <Media image={s.image} alt="" /> : null}</div>)}
      </div>
      <ul ref={list} className="elsewhere__list" onPointerLeave={() => fine && setActive(null)}>
        {socialList.map((s, i) => (
          <li key={s.id} data-index={i}>
            <a href={s.url} className="elsewhere__link" data-active={active === i} target="_blank" rel="noopener noreferrer" data-cursor="Open" onPointerEnter={() => fine && setActive(i)} onFocus={() => setActive(i)}>
              <span className="elsewhere__name">{s.label}</span>
              <span className="elsewhere__meta"><span>{s.handle}</span><span className="elsewhere__note">{s.note}</span></span>
              <span className="elsewhere__arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
