import { useEffect, useRef, useState } from 'react'
import { profile } from '@data/profile.js'
// Video della rotazione della testa: frame 0 = guarda a sinistra, CENTER = frontale, ultimo = guarda a destra.
// Codificato all-intra (ogni frame è un keyframe) così lo scrub col mouse è istantaneo.
import videoLg from '../assets/hero/face-lg.mp4'
import videoSm from '../assets/hero/face-sm.mp4'
import posterLg from '../assets/hero/face-center-lg.webp'
import posterSm from '../assets/hero/face-center-sm.webp'

const FPS = 24
const FRAMES = 124
const CENTER = 75 // frame frontale: la home parte da qui
const LAST = FRAMES - 1

// Punto della testa nel video (frazioni di larghezza e altezza)
const HEAD = { x: 0.557, y: 0.42 }
const VID_W = 1920
const VID_H = 1080

// Quanto rapidamente il frame mostrato insegue il mouse (0-1 per frame a 60fps): più basso = più morbido
const FOLLOW = 0.16

function headOnScreen(el) {
  const r = el.getBoundingClientRect()
  const s = Math.max(r.width / VID_W, r.height / VID_H)
  const [px, py] = getComputedStyle(el).objectPosition.split(' ').map((v) => parseFloat(v) / 100)
  const ox = (r.width - VID_W * s) * px
  const oy = (r.height - VID_H * s) * py
  return { x: r.left + ox + HEAD.x * VID_W * s, y: r.top + oy + HEAD.y * VID_H * s }
}

const clamp = (v) => Math.max(-1, Math.min(1, v))
// nx in [-1, 1] → frame: la metà sinistra usa 0..CENTER, la destra CENTER..LAST
const frameAt = (nx) => {
  const n = clamp(nx * 1.15)
  return n < 0 ? CENTER + n * CENTER : CENTER + n * (LAST - CENTER)
}

const small = () => matchMedia('(max-width: 899.98px), (max-aspect-ratio: 1/1)').matches

export function Hero() {
  const stage = useRef(null)
  const ref = useRef(null)
  const [sm] = useState(small)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches

    let target = CENTER
    let cur = CENTER
    let shown = -1
    let raf = 0
    let prev = 0
    let visible = true
    let drift = false
    let pausedUntil = 0

    const seek = (f) => {
      if (v.readyState < 1 || v.seeking) return false
      const d = v.duration || FRAMES / FPS
      v.currentTime = Math.min((f + 0.5) / FPS, d - 0.001)
      return true
    }

    // Un solo loop: il frame mostrato insegue il bersaglio con un'interpolazione morbida
    const loop = (now) => {
      raf = 0
      const dt = prev ? Math.min(now - prev, 64) : 16.7
      prev = now
      if (drift && Date.now() > pausedUntil && !document.hidden) {
        target = frameAt(Math.sin(now / 1700) * 0.8)
      }
      const k = 1 - Math.pow(1 - FOLLOW, dt / 16.7)
      cur += (target - cur) * k
      if (Math.abs(target - cur) < 0.04) cur = target
      const f = Math.round(cur)
      if (f !== shown && seek(f)) shown = f
      // si ferma quando è arrivato (e riparte al prossimo movimento)
      if (visible && (drift || cur !== target || f !== shown)) raf = requestAnimationFrame(loop)
      else prev = 0
    }
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(loop) }

    const onMeta = () => { shown = -1; kick() }
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('seeked', kick)
    if (v.readyState >= 1) onMeta()

    // iOS non decodifica i frame finché il video non è stato avviato almeno una volta
    let primed = false
    const prime = () => {
      if (primed) return
      const p = v.play()
      if (p) p.then(() => { primed = true; v.pause(); onMeta() }).catch(() => {})
    }
    prime()

    // Fuori schermo il loop si ferma
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick() })
    io.observe(stage.current)

    const track = (x) => {
      const h = headOnScreen(v)
      const dx = x - h.x
      const nx = dx < 0 ? dx / Math.max(h.x, 1) : dx / Math.max(innerWidth - h.x, 1)
      target = frameAt(nx)
      kick()
    }

    const cleanup = []
    if (still) {
      // Movimento ridotto: resta sulla posa frontale
    } else if (fine) {
      let back = 0
      const move = (e) => { clearTimeout(back); track(e.clientX) }
      const leave = () => { back = setTimeout(() => { target = CENTER; kick() }, 600) }
      window.addEventListener('pointermove', move, { passive: true })
      document.documentElement.addEventListener('pointerleave', leave)
      cleanup.push(() => {
        window.removeEventListener('pointermove', move)
        document.documentElement.removeEventListener('pointerleave', leave)
        clearTimeout(back)
      })
    } else {
      // Touch: segue il dito sull'hero, altrimenti si guarda intorno da sola
      const el = stage.current
      const start = setTimeout(() => { drift = true; kick() }, 1600)
      const touch = (e) => {
        const t = e.touches ? e.touches[0] : e
        if (!t) return
        prime()
        pausedUntil = Date.now() + 3500
        track(t.clientX)
      }
      el.addEventListener('touchstart', touch, { passive: true })
      el.addEventListener('touchmove', touch, { passive: true })
      cleanup.push(() => {
        clearTimeout(start)
        el.removeEventListener('touchstart', touch)
        el.removeEventListener('touchmove', touch)
      })
    }

    return () => {
      cleanup.forEach((fn) => fn())
      cancelAnimationFrame(raf)
      io.disconnect()
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('seeked', kick)
    }
  }, [])

  return (
    <section id="top" className="hero" aria-labelledby="hero-title" ref={stage}>
      <div className="hero__scene" aria-hidden="true">
        <video
          ref={ref}
          className="hero__video"
          src={sm ? videoSm : videoLg}
          poster={sm ? posterSm : posterLg}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        />
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
