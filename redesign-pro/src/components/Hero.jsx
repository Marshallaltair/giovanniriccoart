import { useEffect, useRef, useState } from 'react'
import { profile } from '@data/profile.js'
// 25 pose in griglia 5x5: righe = inclinazione (0 su, 4 giù), colonne = rotazione (0 sinistra, 4 destra)
const LG = import.meta.glob('../assets/hero/r*c*-lg.webp', { eager: true, import: 'default' })
const SM = import.meta.glob('../assets/hero/r*c*-sm.webp', { eager: true, import: 'default' })
const N = 5
const MID = 2
const key = (r, c) => `r${r}c${c}`
const CENTER = key(MID, MID)
const POSES = [CENTER]
for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (key(r, c) !== CENTER) POSES.push(key(r, c))
const src = (k, size) => (size === 'lg' ? LG : SM)[`../assets/hero/${k}-${size}.webp`]

// Punto della testa nell'immagine (frazioni di larghezza e altezza): tutte le pose condividono l'inquadratura
const HEAD = { x: 0.774, y: 0.34 }
const IMG_W = 2208
const IMG_H = 1080

function headOnScreen(img) {
  const r = img.getBoundingClientRect()
  const s = Math.max(r.width / IMG_W, r.height / IMG_H)
  const [px, py] = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100)
  const ox = (r.width - IMG_W * s) * px
  const oy = (r.height - IMG_H * s) * py
  return { x: r.left + ox + HEAD.x * IMG_W * s, y: r.top + oy + HEAD.y * IMG_H * s }
}

const clamp = (v) => Math.max(-1, Math.min(1, v))
// nx, ny in [-1, 1]: quanto il punto è lontano dalla testa rispetto al bordo dello schermo in quella direzione
function poseAt(nx, ny) {
  const c = MID + Math.round(clamp(nx * 1.25) * MID)
  const r = MID + Math.round(clamp(ny * 1.25) * MID)
  return key(r, c)
}

export function Hero() {
  const [pose, setPose] = useState(CENTER)
  const stage = useRef(null)
  const ref = useRef(null)

  useEffect(() => {
    const img = ref.current
    if (!img) return
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = CENTER
    let back = 0

    const track = (x, y) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = headOnScreen(img)
        const dx = x - h.x
        const dy = y - h.y
        const nx = dx < 0 ? dx / Math.max(h.x, 1) : dx / Math.max(innerWidth - h.x, 1)
        const ny = dy < 0 ? dy / Math.max(h.y, 1) : dy / Math.max(innerHeight - h.y, 1)
        const p = poseAt(nx, ny)
        if (p !== last) { last = p; setPose(p) }
      })
    }

    if (fine) {
      const move = (e) => { clearTimeout(back); track(e.clientX, e.clientY) }
      const leave = () => { back = setTimeout(() => { last = CENTER; setPose(CENTER) }, 600) }
      window.addEventListener('pointermove', move, { passive: true })
      document.documentElement.addEventListener('pointerleave', leave)
      return () => {
        window.removeEventListener('pointermove', move)
        document.documentElement.removeEventListener('pointerleave', leave)
        cancelAnimationFrame(raf); clearTimeout(back)
      }
    }

    // Touch: segue il dito sull'hero, altrimenti si guarda intorno da sola
    const el = stage.current
    // percorso morbido (una specie di otto) che attraversa tutte le pose vicine
    let t = 0
    let timer = 0
    let pausedUntil = 0
    const tick = () => {
      if (Date.now() > pausedUntil && !document.hidden) {
        t += 0.16
        const p = poseAt(Math.sin(t) * 0.85, Math.sin(t * 1.7) * 0.7)
        if (p !== last) { last = p; setPose(p) }
      }
      timer = setTimeout(tick, 120)
    }
    if (!still) timer = setTimeout(tick, 1600)
    const touch = (e) => {
      const t = e.touches ? e.touches[0] : e
      if (!t) return
      pausedUntil = Date.now() + 3500
      track(t.clientX, t.clientY)
    }
    el.addEventListener('touchstart', touch, { passive: true })
    el.addEventListener('touchmove', touch, { passive: true })
    return () => {
      clearTimeout(timer); cancelAnimationFrame(raf)
      el.removeEventListener('touchstart', touch)
      el.removeEventListener('touchmove', touch)
    }
  }, [])

  return (
    <section id="top" className="hero" aria-labelledby="hero-title" ref={stage}>
      <div className="hero__scene" aria-hidden="true">
        {POSES.map((k) => (
          <img
            key={k}
            ref={k === CENTER ? ref : undefined}
            className={`hero__pose${pose === k ? ' is-on' : ''}`}
            src={src(k, 'lg')}
            srcSet={`${src(k, 'sm')} 1200w, ${src(k, 'lg')} 2208w`}
            sizes="max(100vw, 204svh)"
            alt=""
            decoding="async"
            fetchPriority={k === CENTER ? 'high' : 'low'}
          />
        ))}
      </div>
      <div className="hero__copy">
        <p className="hero__kicker">{profile.name}</p>
        <h1 id="hero-title" className="hero__title">Drawn by hand.<br />Finished in comp.</h1>
        <p className="hero__sub">Illustrator and senior VFX compositor in Rome. Comic art, Upper Deck trading cards and visual effects for film and television.</p>
        <div className="hero__ctas">
          <a className="pill pill--light" href="#highlights">See the work</a>
          <a className="more more--light" href="#vfx">Watch the showreel</a>
        </div>
      </div>
    </section>
  )
}
