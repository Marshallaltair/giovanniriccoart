import { useEffect, useState } from 'react'
import { Dialog } from './Dialog.jsx'

/**
 * Galleria come una tavola: le opere impaginate in colonne con i bordi delle vignette.
 * Un clic apre il viewer a schermo pieno con avanti/indietro (frecce, swipe, tasti).
 */
export function Gallery({ open, onClose, title, items }) {
  const [current, setCurrent] = useState(null)
  const list = items ?? []
  const n = list.length

  useEffect(() => { if (!open) setCurrent(null) }, [open])
  useEffect(() => {
    if (current === null) return undefined
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % n)
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, n])

  return (
    <Dialog open={open} onClose={onClose} label={title} className="sheet--page">
      <div className="sheet__bar">
        <h2 className="sheet__title">{title}</h2>
        <p className="sheet__count">{items ? `${n} works` : 'Loading works'}</p>
        <form method="dialog"><button className="btn" type="submit">Close</button></form>
      </div>
      <ul className="page-grid">
        {list.map((item, i) => (
          <li key={item.src} className="page-grid__cell">
            <button type="button" className="page-grid__btn" onClick={() => setCurrent(i)} aria-label={`Open ${item.alt}, ${i + 1} of ${n}`}>
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable="false" />
            </button>
          </li>
        ))}
      </ul>

      {current !== null ? (
        <div
          className="viewer"
          role="group"
          aria-label={`${title}, image ${current + 1} of ${n}`}
          onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setCurrent(null) } }}
          onPointerDown={(e) => { e.currentTarget.dataset.x = e.clientX }}
          onPointerUp={(e) => {
            const dx = e.clientX - Number(e.currentTarget.dataset.x || e.clientX)
            if (Math.abs(dx) > 50) setCurrent((c) => (dx < 0 ? (c + 1) % n : (c - 1 + n) % n))
          }}
        >
          <img className="viewer__img" src={list[current].src} alt={list[current].alt} draggable="false" />
          <div className="viewer__bar">
            <button type="button" className="btn btn--dark" onClick={() => setCurrent((c) => (c - 1 + n) % n)}>Previous</button>
            <p className="viewer__count">{current + 1} of {n}</p>
            <button type="button" className="btn btn--dark" onClick={() => setCurrent((c) => (c + 1) % n)}>Next</button>
            <button type="button" className="btn btn--dark viewer__close" autoFocus onClick={() => setCurrent(null)}>Back to page</button>
          </div>
        </div>
      ) : null}
    </Dialog>
  )
}
