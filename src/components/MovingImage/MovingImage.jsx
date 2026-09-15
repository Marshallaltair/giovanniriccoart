import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ParallaxSection } from '../ui/ParallaxSection.jsx'
import { YouTubeTop } from '../YouTubeTop/YouTubeTop.jsx'
import './MovingImage.css'

/** ANIMATIONS — existing full-screen visual chapter; YouTube opens only on click. */
export function MovingImage() {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const closeButton = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false)
    document.getElementById('main')?.toggleAttribute('inert', true)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }))
    return () => {
      document.getElementById('main')?.toggleAttribute('inert', false)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
    }
  }, [open])

  return (
    <section id="animations" aria-labelledby="animations-title">
      <button ref={trigger} type="button" className="animations-trigger" onClick={() => setOpen(true)} aria-label="Enter animations">
        <ParallaxSection
          id="animations-title"
          title="Animations"
          image="/images/moving-image.webp"
          alt="Animation artwork by Giovanni Ricco"
          speed={0.3}
          scale={1.18}
          overlay={0.32}
          tone="#15171b"
          hint="images/moving-image.webp"
          headingLevel={2}
        />
      </button>
      {open ? createPortal(
        <div className="chapter-panel" data-lenis-prevent="true" role="dialog" aria-modal="true" aria-labelledby="animations-panel-title">
          <div className="chapter-panel__bar">
            <h2 id="animations-panel-title">Animations</h2>
            <button ref={closeButton} type="button" className="chapter-panel__close" onClick={() => setOpen(false)}>Close ×</button>
          </div>
          <YouTubeTop />
        </div>,
        document.body,
      ) : null}
    </section>
  )
}
