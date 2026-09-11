import { useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import { isTodo, pad2, show } from '../../lib/content.js'
import { Media } from '../ui/Media.jsx'
import { UpperDeckGallery } from './UpperDeckGallery.jsx'
import './UpperDeckGallery.css'

/** FullscreenProject — capitolo full screen con immagine di fondo e titolo in parallasse. */
export function FullscreenProject({ project, index, total }) {
  const ref = useRef(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const title = isTodo(project.title) ? project.category : show(project.title)
  const hasGallery = project.id === 'upper-deck'

  useScrollAnimation(ref, ({ desktop, mobile }) => {
    const q = gsap.utils.selector(ref)
    const mediaRange = mobile ? 9 : 12
    const contentRange = mobile ? 5 : 8
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 },
    })

    tl.fromTo(q('.fsp__stage'), { rotateY: desktop ? -18 : 0, rotateX: desktop ? 6 : 0, scale: desktop ? 0.86 : 1 }, { rotateY: desktop ? 18 : 0, rotateX: desktop ? -4 : 0, scale: 1, duration: 1 }, 0)
      .fromTo(q('.fsp__frame'), { clipPath: desktop ? 'inset(22% 28% 22% 28%)' : 'inset(20% 10% 28% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 0.5 }, 0)
      .fromTo(q('.fsp__media'), { yPercent: -mediaRange, scale: 1.25, z: desktop ? -260 : 0 }, { yPercent: mediaRange, scale: 1, z: desktop ? -120 : 0, duration: 1 }, 0)
      .fromTo(q('.fsp__content'), { yPercent: contentRange, z: desktop ? 220 : 0 }, { yPercent: -contentRange, z: desktop ? 120 : 0, duration: 1 }, 0)
      .from(q('.fsp__title > span'), { yPercent: 110, ease: 'power3.out', duration: 0.14 }, 0.34)
      .to(q('.fsp__frame'), { scale: 0.92, duration: 0.4 }, 0.6)
  })

  return (
    <article ref={ref} className={`fsp${hasGallery ? ' fsp--gallery' : ''}`} aria-labelledby={`project-${project.id}`}>
      <div className="fsp__sticky">
        <div className="fsp__stage">
          <button type="button" className="fsp__frame" onClick={() => hasGallery && setGalleryOpen(true)} aria-label={hasGallery ? 'Open Upper Deck gallery' : undefined} disabled={!hasGallery}>
            <div className="fsp__media">
              <Media image={project.image} alt={show(project.alt) ?? ''} focus={project.focus} tone={project.tone} hint={`images/work/${project.id}.webp`} />
            </div>
            <div className="fsp__shade" aria-hidden="true" />
          </button>

          <p className="fsp__index" aria-hidden="true">{pad2(index + 1)} / {pad2(total)}</p>

          <div className="fsp__content">
            <h3 id={`project-${project.id}`} className="fsp__title"><span>{title}</span></h3>
            {hasGallery ? <p className="fsp__action">Open gallery <span aria-hidden="true">↗</span></p> : null}
          </div>
        </div>
      </div>
      <UpperDeckGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </article>
  )
}
