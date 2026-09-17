import { useEffect, useMemo, useState } from 'react'
import './ComicsGallery.css'

const fallbackImages = [
  'zatanna.webp', 'blackcat.webp', 'IMG_20260603_124730.webp', 'IMG_20260603_124738.webp',
  'batman-1.webp', 'batman-2.webp', 'halloween.webp', 'he-man_2017.webp', 'optimus-1.webp',
  'optimus-2.webp', 'optimusprime.webp', 'skeletor_2017.webp', 'PXL_20260603_074231656~2.webp', 'rogue.webp', 'scarlet.webp',
  'soundwave.webp', 'spiderman.webp', 'witchblade.webp', 'wolverine.webp',
]

const base = '/images/work/comics/'

function instagramMediaToItems(posts) {
  return posts.flatMap((post) => {
    const children = post.children?.data || []
    const media = children.length ? children : [post]
    return media
      .filter((item) => item.media_url || item.thumbnail_url)
      .map((item, index) => ({
        id: `${post.id}-${item.id || index}`,
        src: item.media_url || item.thumbnail_url,
        alt: post.caption?.split('\n')[0]?.trim() || 'Instagram artwork',
        href: post.permalink,
      }))
  })
}

export function ComicsGallery({ open, onClose }) {
  const [zoomed, setZoomed] = useState(null)
  const [instagramItems, setInstagramItems] = useState([])

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

  useEffect(() => {
    if (!open) return undefined
    let cancelled = false
    fetch('/api/instagram')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!cancelled && data?.posts?.length) setInstagramItems(instagramMediaToItems(data.posts))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [open])

  const items = useMemo(() => instagramItems.length ? instagramItems : fallbackImages.map((name) => ({
    id: name, src: `${base}${encodeURIComponent(name)}`, alt: name, href: null,
  })), [instagramItems])

  if (!open) return null

  return (
    <div className="comics-gallery" role="dialog" aria-modal="true" aria-label="Comic Arts and Illustration gallery">
      <header className="comics-gallery__header">
        <button type="button" className="comics-gallery__back" onClick={onClose}>
          <span aria-hidden="true">←</span> Back
        </button>
        <p className="comics-gallery__count">{items.length} works</p>
        <button type="button" className="comics-gallery__close" onClick={onClose} aria-label="Close gallery">Close</button>
      </header>

      <div className="comics-gallery__track" onClick={() => zoomed !== null && setZoomed(null)}>
        {items.map((item, index) => (
          <button
            type="button"
            className={`comics-gallery__item${zoomed === index ? ' is-zoomed' : ''}`}
            key={item.id}
            onClick={(event) => {
              event.stopPropagation()
              setZoomed(zoomed === index ? null : index)
            }}
            aria-label={zoomed === index ? 'Reduce image' : 'Enlarge image'}
          >
            <img src={item.src} alt={item.alt} draggable="false" />
          </button>
        ))}
      </div>

      <p className="comics-gallery__hint">Click an image to enlarge · click again to return</p>
    </div>
  )
}
