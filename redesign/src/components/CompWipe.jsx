import { useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks.js'

const FPS = 24
const START = 86400 // 01:00:00:00 a 24 fps, come un timeline di montaggio
const tc = (frame) => {
  const f = frame % FPS
  const s = Math.floor(frame / FPS)
  const p = (n) => String(n).padStart(2, '0')
  return `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(f)}`
}

/**
 * La splash page: un'unica immagine in due passate, matita a sinistra e colore finale a destra,
 * separate da una banda chroma key che si trascina come lo split del viewer di un compositing.
 */
export function CompWipe({ src, pencil, alt }) {
  const root = useRef(null)
  const readout = useRef(null)
  const value = useRef(50)
  const dragging = useRef(false)
  const touched = useRef(false) // appena l'utente interviene, l'animazione d'apertura si ferma
  const reduced = useReducedMotion()

  const set = useCallback((pct) => {
    const v = Math.min(100, Math.max(0, pct))
    value.current = v
    const el = root.current
    if (!el) return
    el.style.setProperty('--wipe', `${v}%`)
    el.querySelector('.wipe__handle')?.setAttribute('aria-valuenow', String(Math.round(v)))
    if (readout.current) readout.current.textContent = tc(START + Math.round(v * 2.4))
  }, [])

  // Un solo momento orchestrato: all'apertura la matita "si colora" fino a metà inquadratura.
  useEffect(() => {
    // la linea si ferma sul volto, così il primo fotogramma mostra già matita e colore sulla stessa figura
    const target = matchMedia('(min-width: 761px)').matches ? 61 : 52
    if (reduced) { set(target); return undefined }
    set(100)
    let raf
    const t0 = performance.now() + 450
    const dur = 1300
    const ease = (t) => 1 - Math.pow(1 - t, 4)
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - t0) / dur))
      if (!touched.current) set(100 - (100 - target) * ease(t))
      if (t < 1 && !touched.current) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, set])

  const fromPointer = (e) => {
    const r = root.current.getBoundingClientRect()
    set(((e.clientX - r.left) / r.width) * 100)
  }

  return (
    <figure
      ref={root}
      className="wipe"
      onPointerDown={(e) => { touched.current = true; dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e) }}
      onPointerMove={(e) => { if (e.pointerType === 'mouse' || dragging.current) { touched.current = true; fromPointer(e) } }}
      onPointerUp={() => { dragging.current = false }}
      onPointerCancel={() => { dragging.current = false }}
    >
      <img className="wipe__img wipe__img--final" src={src} alt={alt} fetchPriority="high" draggable="false" />
      <div className="wipe__pencil" aria-hidden="true">
        <img className="wipe__img" src={pencil} alt="" draggable="false" />
      </div>
      <div
        className="wipe__handle"
        role="slider"
        tabIndex={0}
        aria-label="Compare pencil pass and final colour"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 10 : 2
          if (e.key === 'ArrowLeft') { e.preventDefault(); touched.current = true; set(value.current - step) }
          if (e.key === 'ArrowRight') { e.preventDefault(); touched.current = true; set(value.current + step) }
        }}
      >
        <span className="wipe__key" />
      </div>
      <figcaption className="wipe__hud" aria-hidden="true">
        <span>Pencil</span>
        <span ref={readout} className="wipe__tc">01:00:00:00</span>
        <span>Final</span>
      </figcaption>
    </figure>
  )
}
