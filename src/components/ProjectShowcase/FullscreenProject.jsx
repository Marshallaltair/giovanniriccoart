import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import { isTodo, pad2, show } from '../../lib/content.js'
import { Media } from '../ui/Media.jsx'
import { UpperDeckGallery } from './UpperDeckGallery.jsx'
import { ComicsGallery } from './ComicsGallery.jsx'
import { Filmography } from '../Filmography/Filmography.jsx'
import { Showreel } from './Showreel.jsx'
import './UpperDeckGallery.css'
import './ComicsGallery.css'
import './Showreel.css'

/** FullscreenProject — capitolo full screen con immagine di fondo e titolo in parallasse. */
export function FullscreenProject({ project, index, total, onOpen }) {
  const ref = useRef(null)
  const frameRef = useRef(null)
  const chapterCloseRef = useRef(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [chapterOpen, setChapterOpen] = useState(false)
  const title = isTodo(project.title) ? project.category : show(project.title)
  const hasGallery = project.id === 'upper-deck' || project.id === 'artist-proofs'
  const hasChapter = project.id === 'compositing'
  const isInteractive = hasGallery || hasChapter || Boolean(onOpen)

  useEffect(() => {
    if (!chapterOpen) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setChapterOpen(false)
    document.getElementById('main')?.toggleAttribute('inert', true)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => chapterCloseRef.current?.focus({ preventScroll: true }))
    return () => {
      document.getElementById('main')?.toggleAttribute('inert', false)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      requestAnimationFrame(() => frameRef.current?.focus({ preventScroll: true }))
    }
  }, [chapterOpen])

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
    <article id={project.id} ref={ref} className={`fsp${isInteractive ? ' fsp--gallery' : ''}`} aria-labelledby={`project-${project.id}`}>
      <div className="fsp__sticky">
        <div className="fsp__stage">
          <button ref={frameRef} type="button" className="fsp__frame" onClick={() => hasGallery ? setGalleryOpen(true) : hasChapter ? setChapterOpen(true) : onOpen?.()} aria-label={hasGallery ? `Open ${title} gallery` : isInteractive ? `Open ${title}` : undefined} disabled={!isInteractive}>
            <div className="fsp__media">
              <Media image={project.image} alt={show(project.alt) ?? ''} focus={project.focus} tone={project.tone} hint={`images/work/${project.id}.webp`} />
            </div>
            <div className="fsp__shade" aria-hidden="true" />
          </button>

          <p className="fsp__index" aria-hidden="true">{pad2(index + 1)} / {pad2(total)}</p>

          <div className="fsp__content">
            <h3 id={`project-${project.id}`} className="fsp__title"><span>{title}</span></h3>
            {hasGallery ? <p className="fsp__action">Open gallery <span aria-hidden="true">↗</span></p> : null}
            {project.id === 'compositing' ? <p className="fsp__action">View selected credits <span aria-hidden="true">↗</span></p> : null}
          </div>
        </div>
      </div>
      {project.id === 'upper-deck' ? <UpperDeckGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} /> : null}
      {project.id === 'artist-proofs' ? <ComicsGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} /> : null}
      {chapterOpen ? createPortal(
        <div className="chapter-panel" data-lenis-prevent="true" role="dialog" aria-modal="true" aria-labelledby={`chapter-${project.id}`}>
          <div className="chapter-panel__bar">
            <h2 id={`chapter-${project.id}`}>{title}</h2>
            <button ref={chapterCloseRef} type="button" className="chapter-panel__close" onClick={() => setChapterOpen(false)}>Close ×</button>
          </div>
          <Showreel />
          <Filmography />
        </div>,
        document.body,
      ) : null}
    </article>
  )
}
