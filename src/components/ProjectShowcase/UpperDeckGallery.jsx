import { useEffect, useState } from 'react'
import './UpperDeckGallery.css'

const images = [
  'card-01.gif', 'card- 010.png', 'card-011.gif', 'card-012.jpg',
  'card-013.png', 'card-014.gif', 'card-015.jpg', 'card-016.png',
  'card-017.gif', 'card-018.jpg', 'card-019.png', 'card-02.jpg',
  'card-020.jpg', 'card-021.png', 'card-022.jpg', 'card-023.png',
  'card-024.png', 'card-025.png', 'card-026.png', 'card-03.png',
  'card- 04.png', 'card- 05.png', 'card- 06.png', 'card- 07.png',
  'card- 08.png', 'card- 09.png',
]

const base = '/images/work/upper-deck/'

export function UpperDeckGallery({ open, onClose }) {
  const [zoomed, setZoomed] = useState(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        if (zoomed !== null) setZoomed(null)
        else onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, zoomed])

  if (!open) return null

  return (
    <div className="ud-gallery" role="dialog" aria-modal="true" aria-label="Upper Deck Trading Card gallery">
      <header className="ud-gallery__header">
        <button type="button" className="ud-gallery__back" onClick={onClose}>
          <span aria-hidden="true">←</span> Back
        </button>
        <p className="ud-gallery__count">{images.length} works</p>
        <button type="button" className="ud-gallery__close" onClick={onClose} aria-label="Close gallery">Close</button>
      </header>

      <div className="ud-gallery__track" onClick={() => zoomed !== null && setZoomed(null)}>
        {images.map((name, index) => (
          <button
            type="button"
            className={`ud-gallery__item${zoomed === index ? ' is-zoomed' : ''}`}
            key={name}
            onClick={(event) => {
              event.stopPropagation()
              setZoomed(zoomed === index ? null : index)
            }}
            aria-label={zoomed === index ? 'Reduce image' : 'Enlarge image'}
          >
            <img src={`${base}${encodeURIComponent(name).replace(/%2F/g, '/')}`} alt={name} draggable="false" />
          </button>
        ))}
      </div>

      <p className="ud-gallery__hint">Click an image to enlarge · click again to return</p>
    </div>
  )
}
