import { useRef } from 'react'
import { gsap } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

/**
 * SectionTransition — il capitolo successivo sale sopra il precedente
 * (che resta fermo, sticky) e si allarga fino al full bleed.
 * Richiede che l'elemento precedente abbia una "coda" sticky di 100svh.
 */
export function SectionTransition({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)

  useScrollAnimation(ref, ({ mobile }) => {
    gsap.fromTo(
      ref.current,
      { clipPath: mobile ? 'inset(3% 3% 0% 3%)' : 'inset(9% 7% 0% 7%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top top', scrub: true },
      },
    )
  })

  return (
    <Tag ref={ref} className={`section-transition ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
