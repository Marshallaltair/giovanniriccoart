import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import { LenisContext } from '../../hooks/useLenis.js'
import { useReducedMotion } from '../../hooks/useMediaQuery.js'

/**
 * SmoothScroll — Lenis sincronizzato con il ticker di GSAP, così
 * ScrollTrigger e smooth scroll leggono lo stesso frame.
 * Disattivato con prefers-reduced-motion. Su touch Lenis lascia lo scroll nativo.
 */
export function SmoothScroll({ children }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (reduced) return undefined

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: false })
    const tick = (time) => instance.raf(time * 1000)

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
