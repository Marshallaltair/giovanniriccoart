import { useRef } from 'react'
import { gsap, motion } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import { Media } from './Media.jsx'

/**
 * ImageReveal — l'immagine si sviluppa dal basso come una stampa,
 * mentre il contenuto interno rientra di scala.
 */
export function ImageReveal({ image, alt = '', className = '', ratio = '4 / 5', tone, hint, sizes, focus, children }) {
  const ref = useRef(null)

  useScrollAnimation(ref, () => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } })
    tl.fromTo(
      ref.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: motion.cinematic, ease: motion.ease.wipe },
    ).fromTo(
      ref.current.querySelector('.image-reveal__inner'),
      { scale: 1.3 },
      { scale: 1, duration: motion.cinematic * 1.5, ease: motion.ease.strong },
      0,
    )
  })

  return (
    <figure ref={ref} className={`image-reveal ${className}`} style={{ aspectRatio: ratio }}>
      <div className="image-reveal__inner">
        <Media image={image} alt={alt} tone={tone} hint={hint} sizes={sizes} focus={focus} />
      </div>
      {children}
    </figure>
  )
}
