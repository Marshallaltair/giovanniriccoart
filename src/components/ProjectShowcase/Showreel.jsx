import { useEffect } from 'react'
import './Showreel.css'

const LINKEDIN = 'https://www.linkedin.com/posts/giovanniricco_showreel-2026-to-be-honest-i-never-feel-activity-7470044816517545985-5x6h?utm_source=share&utm_medium=member_desktop&rcm=ACoAAA3efekBliB_4lCia15aOccPn7-ZklihpGI'

export function Showreel() {
  useEffect(() => {
    const block = (event) => event.preventDefault()
    document.addEventListener('contextmenu', block)
    return () => document.removeEventListener('contextmenu', block)
  }, [])

  return (
    <section id="showreel" className="showreel" aria-labelledby="showreel-title">
      <div className="showreel__head">
        <div>
          <p className="showreel__eyebrow">VFX Compositing</p>
          <h2 id="showreel-title">Showreel 2026</h2>
        </div>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="showreel__link" data-cursor="Open">
          Watch on LinkedIn ↗
        </a>
      </div>
      <div className="showreel__video" onContextMenu={(event) => event.preventDefault()}>
        <video controls controlsList="nodownload noplaybackrate" disablePictureInPicture playsInline preload="metadata" draggable="false">
          <source src="/videos/Showreel_2026.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
