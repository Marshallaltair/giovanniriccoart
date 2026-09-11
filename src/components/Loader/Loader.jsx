import { useEffect, useRef, useState } from 'react'
import { gsap, motion, mq } from '../../lib/gsap.js'
import { useLenis } from '../../hooks/useLenis.js'
import { profile } from '../../data/profile.js'
import './Loader.css'

const KEY = 'gr:intro-seen'

function shouldSkip() {
  if (window.matchMedia(mq.reduced).matches) return true
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Loader — contatore 000→100 mentre si caricano i font, poi una tendina.
 * Solo alla prima visita della sessione; mai con reduced motion.
 * Durata totale ~2s, non blocca oltre il necessario.
 */
export function Loader({ onReveal }) {
  const [skip] = useState(shouldSkip)
  const [done, setDone] = useState(skip)
  const root = useRef(null)
  const count = useRef(null)
  const { lenis } = useLenis()

  useEffect(() => {
    if (skip) {
      onReveal()
      return undefined
    }

    const html = document.documentElement
    html.classList.add('is-loading')

    const counter = { value: 0 }
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        html.classList.remove('is-loading')
        try {
          sessionStorage.setItem(KEY, '1')
        } catch {
          /* storage non disponibile: nessun problema */
        }
        setDone(true)
      },
    })

    tl.to(counter, {
      value: 100,
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
      },
    })
      .add(onReveal, '+=0.05')
      .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: motion.ease.wipe }, '<')

    const timeout = new Promise((resolve) => setTimeout(resolve, 1200))
    Promise.race([document.fonts?.ready ?? Promise.resolve(), timeout]).then(() => tl.play())

    return () => {
      tl.kill()
      html.classList.remove('is-loading')
    }
    // onReveal è stabile: dipendiamo solo da skip
  }, [skip])

  // Blocca lo smooth scroll finché il loader è visibile
  useEffect(() => {
    if (!lenis) return
    if (done) lenis.start()
    else lenis.stop()
  }, [lenis, done])

  if (done) return null

  return (
    <div ref={root} className="loader" role="status" aria-live="polite">
      <p className="loader__name">{profile.name}</p>
      <p className="loader__count display" aria-hidden="true">
        <span ref={count}>000</span>
      </p>
      <span className="visually-hidden">Loading</span>
    </div>
  )
}
