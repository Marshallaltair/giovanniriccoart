import { useEffect } from 'react'
import './Showreel.css'

const YOUTUBE = 'https://www.youtube.com/watch?v=_AM4_J3ZbMg'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/_AM4_J3ZbMg?rel=0&modestbranding=1'

export function Showreel() {
  useEffect(() => {
    const block = (event) => event.preventDefault()
    document.addEventListener('contextmenu', block)
    return () => document.removeEventListener('contextmenu', block)
  }, [])

  return (
    <section id="showreel" className="showreel" aria-labelledby="showreel-title">
      <div className="showreel__head">
        <h2 id="showreel-title">VFX Showreel 2026</h2>
        <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="showreel__link" data-cursor="Open">
          Watch on YouTube ↗
        </a>
      </div>
      <div className="showreel__video" onContextMenu={(event) => event.preventDefault()}>
        <iframe
          src={YOUTUBE_EMBED}
          title="Giovanni Ricco, VFX Showreel 2026"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  )
}
