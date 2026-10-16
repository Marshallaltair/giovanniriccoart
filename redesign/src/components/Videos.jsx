import { useState } from 'react'
import { Dialog } from './Dialog.jsx'
import { videos } from '../content.js'
import { social } from '@data/social.js'

function Video({ v, rank }) {
  const [play, setPlay] = useState(false)
  return (
    <li className="video">
      <div className="video__frame">
        {play ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <button type="button" className="video__poster" onClick={() => setPlay(true)}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="video__play">Play</span>
            <span className="visually-hidden">{v.title}</span>
          </button>
        )}
      </div>
      <p className="video__meta"><span className="video__rank">{rank}</span>{v.title}<span className="video__views">{v.views.toLocaleString('en-US')} views</span></p>
    </li>
  )
}

export function Videos({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} label="Animations" className="sheet--page">
      <div className="sheet__bar">
        <h2 className="sheet__title">Most viewed on YouTube</h2>
        <a className="sheet__count ink-link" href={social.youtube.url} target="_blank" rel="noopener noreferrer">{social.youtube.handle}</a>
        <form method="dialog"><button className="btn" type="submit">Close</button></form>
      </div>
      <ol className="videos">{videos.map((v, i) => <Video key={v.id} v={v} rank={i + 1} />)}</ol>
    </Dialog>
  )
}
