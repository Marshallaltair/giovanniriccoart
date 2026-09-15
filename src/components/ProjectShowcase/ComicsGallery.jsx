import { useEffect, useState } from 'react'
import './ComicsGallery.css'

const images = [
  'zatanna.jpg',
  'blackcat.webp',
  'IMG_20260603_124730.jpg',
  'IMG_20260603_124738.jpg',
  'batman-1.jpg',
  'batman-2.jpg',
  'halloween.jpg',
  'optimus-1.jpg',
  'optimus-2.jpg',
  'PXL_20260603_074231656~2.jpg',
  'rogue.webp',
  'scarlet.webp',
  'soundwave.JPG',
  'spiderman.webp',
  'witchblade.webp',
  'wolverine.webp',
]

const base = '/images/work/comics/'

export function ComicsGallery({ open, onClose }) {
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
    <div className="comics-gallery" role="dialog" aria-modal="true" aria-label="Comic Arts and Illustration gallery">
      <header className="comics-gallery__header">
        <button type="button" className="comics-gallery__back" onClick={onClose}>
          <span aria-hidden="true">←</span> Back
        </button>
        <p className="comics-gallery__count">{images.length} works</p>
        <button type="button" className="comics-gallery__close" onClick={onClose} aria-label="Close gallery">Close</button>
      </header>

      <div className="comics-gallery__track" onClick={() => zoomed !== null && setZoomed(null)}>
        {images.map((name, index) => (
          <button
            type="button"
            className={`comics-gallery__item${zoomed === index ? ' is-zoomed' : ''}`}
            key={name}
            onClick={(event) => {
              event.stopPropagation()
              setZoomed(zoomed === index ? null : index)
            }}
            aria-label={zoomed === index ? 'Reduce image' : 'Enlarge image'}
          >
            <img src={`${base}${encodeURIComponent(name)}`} alt={name} draggable="false" />
          </button>
        ))}
      </div>

      <p className="comics-gallery__hint">Click an image to enlarge · click again to return</p>
    </div>
  )
}
