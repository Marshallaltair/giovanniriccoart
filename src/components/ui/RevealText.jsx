import { Fragment, useRef } from 'react'
import { gsap, motion } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

/**
 * RevealText — righe che salgono da una maschera, una volta, all'ingresso.
 * Usato solo per i titoli di capitolo.
 */
export function RevealText({ as: Tag = 'h2', lines, className = '', id }) {
  const ref = useRef(null)

  useScrollAnimation(ref, () => {
    gsap.from(ref.current.querySelectorAll('.mask > span'), {
      yPercent: 105,
      duration: motion.cinematic,
      ease: motion.ease.heavy,
      stagger: 0.09,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
    })
  })

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 ? ' ' : null}
          <span className="mask">
            <span>{line}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
