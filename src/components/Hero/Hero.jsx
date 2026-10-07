import { useEffect, useRef } from 'react'
import { gsap, motion, mq, useGSAP } from '../../lib/gsap.js'
import { useLenis } from '../../hooks/useLenis.js'
import { Media } from '../ui/Media.jsx'
import { profile } from '../../data/profile.js'
import './Hero.css'

/** Parola spezzata in caratteri per il reveal. aria-hidden: il nome è nell'aria-label dell'h1. */
function Word({ text, className }) {
  return (
    <span className={`hero__line ${className}`} aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="hero__char">
          {ch}
        </span>
      ))}
    </span>
  )
}

/**
 * Interactive portrait — usa le cinque tavole fornite nella cartella
 * "interactive home". Il puntatore controlla una dissolvenza morbida
 * fra centro e quattro direzioni, creando un ritratto vivo senza video.
 */
function InteractivePortrait() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const reduce = window.matchMedia(mq.reduced)
    let manualUntil = 0
    const set = (x = 0, y = 0) => {
      const dx = Math.max(-1, Math.min(1, x))
      const dy = Math.max(-1, Math.min(1, y))
      const horizontal = Math.abs(dx)
      const vertical = Math.abs(dy)
      const total = Math.min(1, Math.hypot(dx, dy))
      const values = {
        center: Math.max(0.35, 1 - total * 0.55),
        left: dx < 0 ? horizontal * 0.82 : 0,
        right: dx > 0 ? horizontal * 0.82 : 0,
        up: dy < 0 ? vertical * 0.72 : 0,
        down: dy > 0 ? vertical * 0.72 : 0,
      }

      Object.entries(values).forEach(([key, value]) => {
        el.style.setProperty(`--portrait-${key}`, value.toFixed(3))
      })
      el.style.setProperty('--portrait-x', `${(dx * 1.6).toFixed(2)}%`)
      el.style.setProperty('--portrait-y', `${(dy * 1.2).toFixed(2)}%`)
    }

    const onMove = (event) => {
      if (reduce.matches) return
      const rect = el.getBoundingClientRect()
      manualUntil = Date.now() + 3200
      set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        ((event.clientY - rect.top) / rect.height) * 2 - 1,
      )
    }
    const reset = () => {
      manualUntil = Date.now() + 1200
      set(0, 0)
    }

    // Movimento autonomo molto lento: il ritratto resta vivo anche senza mouse.
    const idle = [
      [0, 0],
      [-0.72, -0.04],
      [-0.45, 0.06],
      [0, 0],
      [0.68, -0.03],
      [0.42, 0.05],
      [0, 0],
    ]
    let idleIndex = 0
    const idleTimer = window.setInterval(() => {
      if (!reduce.matches && Date.now() >= manualUntil) {
        idleIndex = (idleIndex + 1) % idle.length
        set(...idle[idleIndex])
      }
    }, 2400)

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', reset)
    return () => {
      window.clearInterval(idleTimer)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <div ref={root} className="interactive-portrait" aria-hidden="true">
      {[
        ['center', '/images/interactive-home/center.jpg'],
        ['left', '/images/interactive-home/left.jpg'],
        ['right', '/images/interactive-home/right.jpg'],
        ['up', '/images/interactive-home/up.jpg'],
        ['down', '/images/interactive-home/down.jpg'],
      ].map(([key, src]) => (
        <img
          key={key}
          className={`interactive-portrait__image interactive-portrait__image--${key}`}
          src={src}
          alt=""
          draggable="false"
          loading={key === 'center' ? 'eager' : 'lazy'}
        />
      ))}
      <div className="interactive-portrait__vignette" />
    </div>
  )
}

/** Guide a matita: orizzonte, fughe prospettiche, ellisse di costruzione, marker di tracking. */
function PencilGuides() {
  const crosses = [
    [230, 190],
    [760, 300],
    [1390, 215],
    [310, 800],
    [1010, 850],
  ]
  return (
    <svg className="hero__guides" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path pathLength="1" d="M0 628 H1600" />
        <path pathLength="1" d="M1180 628 L0 1000" />
        <path pathLength="1" d="M1180 628 L0 90" />
        <path pathLength="1" d="M1180 628 L1600 1000" />
        <path pathLength="1" d="M1180 628 L1600 160" />
        <ellipse pathLength="1" cx="1180" cy="628" rx="250" ry="84" />
        <path pathLength="1" d="M80 60 H1520 V940 H80 Z" strokeDasharray="0.004 0.006" />
        {crosses.map(([x, y]) => (
          <path key={`${x}-${y}`} pathLength="1" d={`M${x - 11} ${y} H${x + 11} M${x} ${y - 11} V${y + 11}`} />
        ))}
      </g>
    </svg>
  )
}

/**
 * HERO — l'inquadratura d'apertura come una breakdown VFX.
 * Tre strati: plate (immagine), pencil (costruzione azzurra), ink (il nome).
 * Scorrendo la scena ruota nello spazio e gli strati si separano in profondità,
 * poi il capitolo successivo sale e la copre.
 */
export function Hero({ ready }) {
  const root = useRef(null)
  const intro = useRef(null)
  const { scrollTo } = useLenis()

  // Intro: prima la matita, poi l'inchiostro, infine il plate
  useGSAP(
    () => {
      if (window.matchMedia(mq.reduced).matches) return
      const q = gsap.utils.selector(root)
      intro.current = gsap
        .timeline({ paused: true })
        .fromTo(q('.hero__guides path, .hero__guides ellipse'), { strokeDashoffset: 1, strokeDasharray: '1 1' }, {
          strokeDashoffset: 0,
          duration: motion.hero,
          ease: motion.ease.heavy,
          stagger: 0.04,
          clearProps: 'strokeDasharray,strokeDashoffset',
        })
        .from(q('.hero__name--pencil'), { opacity: 0, duration: motion.cinematic, ease: 'power2.out' }, 0.1)
        .from(q('.hero__name--ink .hero__char'), { yPercent: 108, duration: motion.hero, ease: motion.ease.strong, stagger: 0.035 }, 0.35)
        .from(q('.hero__plate-inner'), { scale: 1.2, opacity: 0, duration: motion.hero * 1.2, ease: motion.ease.out }, 0)
        .from(q('.hero__ui > *'), { opacity: 0, y: 14, duration: motion.standard, ease: motion.ease.out, stagger: 0.08 }, 1.1)
    },
    { scope: root },
  )

  useEffect(() => {
    if (ready) intro.current?.play()
  }, [ready])

  // Scroll: breakdown (desktop) o parallasse multilivello (mobile)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: mq.desktop, mobile: mq.mobile }, (ctx) => {
        const { desktop } = ctx.conditions
        const q = gsap.utils.selector(root)
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        })

        tl.to(q('.hero__ui'), { opacity: 0, duration: 0.12 }, 0)

        if (desktop) {
          // 0 → 0.5: la scena si apre in strati
          tl.to(q('.hero__stage'), { rotateY: -24, rotateX: 9, scale: 0.7, xPercent: -3, duration: 0.5 }, 0)
            .to(q('[data-layer="plate"]'), { z: -420, duration: 0.5 }, 0)
            .to(q('[data-layer="pencil"]'), { z: -80, duration: 0.5 }, 0)
            .to(q('[data-layer="ink"]'), { z: 260, duration: 0.5 }, 0)
            .to(q('.hero__stage'), { '--breakdown': 1, duration: 0.18 }, 0.26)
            // 0.5 → 1: il capitolo successivo copre la scena
            .to(q('.hero__stage'), { rotateY: -32, scale: 0.62, duration: 0.5 }, 0.5)
            .to(q('.hero__shade'), { opacity: 0.8, duration: 0.5 }, 0.5)
        } else {
          // Parallasse: il plate scorre più lento, l'inchiostro più veloce
          tl.to(q('[data-layer="plate"]'), { yPercent: 22, duration: 1 }, 0)
            .to(q('[data-layer="pencil"]'), { yPercent: 10, duration: 1 }, 0)
            .to(q('[data-layer="ink"]'), { yPercent: -6, duration: 1 }, 0)
            .to(q('.hero__shade'), { opacity: 0.8, duration: 1 }, 0)
        }
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__sticky">
        <div className="hero__stage">
          <div className="hero__layer" data-layer="plate">
            <div className="hero__plate-inner">
              <InteractivePortrait />
            </div>
            <span className="hero__label">Plate</span>
          </div>

          <div className="hero__layer" data-layer="pencil" aria-hidden="true">
            <PencilGuides />
            <p className="hero__name hero__name--pencil">
              <Word text={profile.firstName} className="hero__line--1" />
              <Word text={profile.lastName} className="hero__line--2" />
            </p>
            <span className="hero__label">Pencil</span>
          </div>

          <div className="hero__layer" data-layer="ink">
            <h1 id="hero-title" className="hero__name hero__name--ink" aria-label={profile.name}>
              <Word text={profile.firstName} className="hero__line--1" />
              <Word text={profile.lastName} className="hero__line--2" />
            </h1>
            <span className="hero__label">Ink</span>
          </div>
        </div>

        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__ui">
          <p className="hero__descriptor">
            {profile.descriptor}
            <br />
            <span className="hero__location">{profile.location}</span>
          </p>
          <a
            href="#statement"
            className="hero__scroll"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#statement')
            }}
          >
            Scroll to explore
            <span className="hero__scroll-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
