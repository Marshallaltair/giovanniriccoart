import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.js'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery.js'
import './CustomCursor.css'

/**
 * CustomCursor — punto minimo che mostra un'etichetta contestuale
 * sugli elementi con data-cursor ("View", "Open", "Play", "Explore").
 * Solo puntatori precisi; disattivato su touch e con reduced motion.
 */
export function CustomCursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const enabled = fine && !reduced

  if (!enabled) return null
  return <CursorInner />
}

function CursorInner() {
  const root = useRef(null)
  const [label, setLabel] = useState('')
  const [state, setState] = useState('hidden')

  useEffect(() => {
    const el = root.current
    const html = document.documentElement
    html.classList.add('has-cursor')

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })
    let visible = false

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      if (!visible) {
        visible = true
        gsap.set(el, { x: e.clientX, y: e.clientY })
        setState((s) => (s === 'hidden' ? 'idle' : s))
      }
    }

    const over = (e) => {
      const target = e.target.closest?.('[data-cursor], a, button')
      if (!target) {
        setState('idle')
        setLabel('')
        return
      }
      const text = target.getAttribute('data-cursor')
      setLabel(text ?? '')
      setState(text ? 'label' : 'link')
    }

    const leave = () => {
      visible = false
      setState('hidden')
    }
    const down = () => el.classList.add('is-pressed')
    const up = () => el.classList.remove('is-pressed')

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    html.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)

    return () => {
      html.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      html.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <div ref={root} className="cursor" data-state={state} aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label">{label}</span>
    </div>
  )
}
