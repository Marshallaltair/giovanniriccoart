import { useEffect, useState } from 'react'
import { Dialog } from './Dialog.jsx'
import { comics, upperDeckManifest, videos } from '../content.js'
import { useJson } from '../hooks.js'
import { social } from '@data/social.js'

function Gallery({ title, items }) {
  const [current, setCurrent] = useState(null)
  const n = items?.length ?? 0
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
    <>
      <div className="sheet__bar">
        <h2 className="sheet__title">{title}</h2>
        <p className="sheet__meta">{items ? `${n} works` : 'Loading'}</p>
        <form method="dialog"><button className="round" type="submit" aria-label="Close">✕</button></form>
      </div>
      <ul className="grid">
        {(items ?? []).map((it, i) => (
          <li key={it.src}>
            <button type="button" className="grid__btn" onClick={() => setCurrent(i)} aria-label={`Open ${it.alt}, ${i + 1} of ${n}`}>
              <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>
      {current !== null ? (
        <div
          className="lightbox"
          role="group"
          aria-label={`Image ${current + 1} of ${n}`}
          onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setCurrent(null) } }}
          onPointerDown={(e) => { e.currentTarget.dataset.x = e.clientX }}
          onPointerUp={(e) => {
            const dx = e.clientX - Number(e.currentTarget.dataset.x || e.clientX)
            if (Math.abs(dx) > 50) setCurrent((c) => (dx < 0 ? (c + 1) % n : (c - 1 + n) % n))
          }}
        >
          <img key={current} className="lightbox__img" src={items[current].src} alt={items[current].alt} />
          <div className="lightbox__bar">
            <button type="button" className="round" aria-label="Previous" onClick={() => setCurrent((c) => (c - 1 + n) % n)}>‹</button>
            <p className="lightbox__count">{current + 1} / {n}</p>
            <button type="button" className="round" aria-label="Next" onClick={() => setCurrent((c) => (c + 1) % n)}>›</button>
            <button type="button" className="pill pill--ghost lightbox__close" autoFocus onClick={() => setCurrent(null)}>Done</button>
          </div>
        </div>
      ) : null}
    </>
  )
}

function Video({ v }) {
  const [play, setPlay] = useState(false)
  return (
    <li className="video">
      <div className="video__frame">
        {play ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <button type="button" className="video__poster" onClick={() => setPlay(true)} aria-label={`Play ${v.title}`}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="play" aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="video__title">{v.title}</p>
      <p className="video__views">{v.views.toLocaleString('en-US')} views</p>
    </li>
  )
}

export function Sheets({ sheet, close }) {
  const ud = useJson(upperDeckManifest, sheet === 'cards')
  const udItems = ud?.map((name, i, all) => ({ src: `images/work/upper-deck/${encodeURIComponent(name)}`, alt: `Upper Deck card by Giovanni Ricco, ${i + 1} of ${all.length}` }))
  return (
    <>
      <Dialog open={sheet === 'comics'} onClose={close} label="Comic art gallery"><Gallery title="Comic art and commissions" items={comics} /></Dialog>
      <Dialog open={sheet === 'cards'} onClose={close} label="Upper Deck gallery"><Gallery title="Upper Deck trading cards" items={udItems} /></Dialog>
      <Dialog open={sheet === 'videos'} onClose={close} label="Animations">
        <div className="sheet__bar">
          <h2 className="sheet__title">Animations</h2>
          <a className="sheet__meta more" href={social.youtube.url} target="_blank" rel="noopener noreferrer">{social.youtube.handle}</a>
          <form method="dialog"><button className="round" type="submit" aria-label="Close">✕</button></form>
        </div>
        <ol className="videos">{videos.map((v) => <Video key={v.id} v={v} />)}</ol>
      </Dialog>
    </>
  )
}
