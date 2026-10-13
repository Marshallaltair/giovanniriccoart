import { useId, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import { Media } from './Media.jsx'

/**
 * ParallaxSection — capitolo full screen con immagine e titolo a velocità diverse.
 *
 * speed      0–0.33  ampiezza del movimento dell'immagine
 * scale      scala iniziale dell'immagine (rientra durante lo scroll)
 * align      'left' | 'center' | 'right'
 * textPosition 'bottom' | 'center'
 * overlay    0–1 oscuramento sopra l'immagine
 * intensity  moltiplicatore generale (ridotto automaticamente su mobile)
 */
export function ParallaxSection({
  id,
  image,
  alt = '',
  title,
  subtitle,
  speed = 0.3,
  scale = 1.2,
  align = 'left',
  textPosition = 'bottom',
  overlay = 0.35,
  background = 'var(--ink)',
  intensity = 1,
  tone,
  hint,
  headingLevel = 2,
  children,
}) {
  const ref = useRef(null)
  const titleId = useId()
  const Heading = `h${headingLevel}`

  useScrollAnimation(ref, ({ mobile }) => {
    const desktop = !mobile
    const k = intensity * (mobile ? 0.6 : 1)
    const range = Math.min(speed, 0.33) * 30 * k
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    tl.fromTo(
      ref.current.querySelector('.parallax__stage'),
      { rotateY: desktop ? -18 : 0, rotateX: desktop ? 6 : 0, scale: desktop ? 0.86 : 1 },
      { rotateY: desktop ? 18 : 0, rotateX: desktop ? -4 : 0, scale: 1, ease: 'none' },
      0,
    ).fromTo(
      ref.current.querySelector('.parallax__media'),
      { yPercent: -range, scale: scale, z: desktop ? -260 : 0 },
      { yPercent: range, scale: 1 + (scale - 1) * 0.3, z: desktop ? -120 : 0, ease: 'none' },
      0,
    ).fromTo(
      ref.current.querySelector('.parallax__content'),
      { yPercent: range * 4, z: desktop ? 220 : 0 },
      { yPercent: -range * 4, z: desktop ? 120 : 0, ease: 'none' },
      0,
    )
  })

  return (
    <section
      ref={ref}
      id={id}
      className="parallax"
      data-align={align}
      data-text-position={textPosition}
      style={{ '--overlay': overlay, background }}
      aria-labelledby={titleId}
    >
      <div className="parallax__sticky">
        <div className="parallax__stage">
          <div className="parallax__media">
            <Media image={image} alt={alt} tone={tone} hint={hint} />
          </div>
          <div className="parallax__overlay" />
          <div className="parallax__content">
            <Heading id={titleId} className="parallax__title display">
              {title}
            </Heading>
            {subtitle ? <p className="parallax__subtitle">{subtitle}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
