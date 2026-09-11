import { Fragment, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

/**
 * SplitTextReveal — il testo si "espone" parola per parola seguendo lo scroll.
 * Scrub continuo: tornando indietro si riavvolge, niente reset bruschi.
 */
export function SplitTextReveal({ as: Tag = 'p', text, className = '' }) {
  const ref = useRef(null)
  const words = text.split(' ')

  useScrollAnimation(ref, () => {
    gsap.fromTo(
      ref.current.querySelectorAll('.word'),
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 78%', end: 'bottom 50%', scrub: true },
      },
    )
  })

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="word">{word}</span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
