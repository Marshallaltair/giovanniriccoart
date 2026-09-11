import { useState } from 'react'
import './YouTubeTop.css'

const videos = [
  { id: 'FKXJO_2Eokw', title: 'He-man and The Masters Of The Universe opening theme 1984 redesign FULLHD', views: 149135 },
  { id: 'pA1D2iFPscY', title: 'She-ra Princess of Power theme opening redesign in fullhd', views: 125026 },
  { id: '6OYaYzL6DP0', title: 'He-man and The Masters of the Universe opening theme "pure design"', views: 102955 },
  { id: 'vh_vKSTXWLQ', title: 'THOR VS IRONMAN 2009', views: 85793 },
  { id: 'ibxP-ety2xc', title: 'He-man and The Masters Of The Universe opening theme 1983 remake FULLHD', views: 18203 },
]

function VideoCard({ video, rank }) {
  const [playing, setPlaying] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`

  return (
    <article className="yt-top__card">
      <div className="yt-top__media">
        {playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" /> : (
          <button type="button" className="yt-top__poster" onClick={() => setPlaying(true)} data-cursor="Play">
            <img src={thumbnail} alt="" loading="lazy" />
            <span className="yt-top__play" aria-hidden="true">▶</span>
            <span className="visually-hidden">Play {video.title}</span>
          </button>
        )}
      </div>
      <div className="yt-top__info">
        <span className="yt-top__rank">{String(rank).padStart(2, '0')}</span>
        <h3>{video.title}</h3>
        <span className="yt-top__views">{video.views.toLocaleString('en-US')} views</span>
      </div>
    </article>
  )
}

export function YouTubeTop() {
  return (
    <section id="most-viewed" className="yt-top" aria-labelledby="yt-top-title">
      <div className="yt-top__header">
        <span className="eyebrow">YouTube</span>
        <h2 id="yt-top-title" className="section-title">Most viewed</h2>
        <a className="yt-top__channel link link--static" href="https://www.youtube.com/@GiovanniRiccodesign" target="_blank" rel="noopener noreferrer" data-cursor="Open">@GiovanniRiccodesign ↗</a>
      </div>
      <div className="yt-top__grid">
        {videos.map((video, index) => <VideoCard key={video.id} video={video} rank={index + 1} />)}
      </div>
    </section>
  )
}
