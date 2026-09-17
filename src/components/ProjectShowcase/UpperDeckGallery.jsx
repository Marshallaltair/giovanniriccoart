import { useEffect, useState } from 'react'
import './UpperDeckGallery.css'

const base = '/images/work/upper-deck/'
const manifestUrl = `${base}manifest.json`

export function UpperDeckGallery({ open, onClose }) {
  const [images, setImages] = useState([])
  const [zoomed, setZoomed] = useState(null)

  useEffect(() => {
    if (!open) return undefined

    let cancelled = false
    fetch(manifestUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load Upper Deck manifest')
        return response.json()
      })
      .then((items) => {
        if (!cancelled) setImages(Array.isArray(items) ? items : [])
      })
      .catch(() => {
        if (!cancelled) setImages([])
      })

    return () => {
      cancelled = true
    }
  }, [open])

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
