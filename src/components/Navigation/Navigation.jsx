import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, motion, mq, ScrollTrigger, useGSAP } from '../../lib/gsap.js'
import { useLenis } from '../../hooks/useLenis.js'
import { useMagnetic } from '../../hooks/useMagnetic.js'
import { profile } from '../../data/profile.js'
import { socialList } from '../../data/social.js'
import './Navigation.css'

const LINKS = [
  { href: '#statement', label: 'Statement' },
  { href: '#artist-proofs', label: 'Comic Arts, Illustrations & Commissions' },
  { href: '#compositing', label: 'Showreel' },
  { href: '#animations', label: 'Animations' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

/** Navigation — menu completo delle sezioni editoriali del sito. */
export function Navigation() {
  const bar = useRef(null)
  const menu = useRef(null)
  const button = useRef(null)
  const tl = useRef(null)
  const [open, setOpen] = useState(false)
  const { lenis, scrollTo } = useLenis()

  useMagnetic(button, 0.3)

  useGSAP(() => {
    const el = bar.current
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => {
      const hide = self.direction === 1 && self.scroll() > 240
      if (el.dataset.hidden !== String(hide)) el.dataset.hidden = String(hide)
    } })
  })

  useGSAP(() => {
    const reduced = window.matchMedia(mq.reduced).matches
    tl.current = gsap.timeline({ paused: true })
      .set(menu.current, { visibility: 'visible' })
      .fromTo(menu.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0.01 : 0.9, ease: motion.ease.wipe })
      .from(menu.current.querySelectorAll('.menu__item > a > span'), { yPercent: 110, duration: reduced ? 0.01 : motion.cinematic, ease: motion.ease.heavy, stagger: 0.04 }, reduced ? 0 : 0.35)
      .from(menu.current.querySelectorAll('.menu__foot > *'), { opacity: 0, duration: motion.standard, stagger: 0.05 }, reduced ? 0 : 0.6)
  }, { scope: menu })

  const setInert = (value) => {
    document.getElementById('main')?.toggleAttribute('inert', value)
    document.getElementById('contact')?.toggleAttribute('inert', value)
  }

  const openMenu = useCallback(() => {
    setOpen(true); setInert(true); lenis?.stop()
    document.documentElement.classList.add('is-locked')
    tl.current?.timeScale(1).play()
    requestAnimationFrame(() => menu.current?.querySelector('a')?.focus({ preventScroll: true }))
  }, [lenis])

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false); setInert(false); lenis?.start()
    document.documentElement.classList.remove('is-locked')
    return new Promise((resolve) => {
      const t = tl.current
      if (!t) return resolve()
      t.eventCallback('onReverseComplete', () => {
        gsap.set(menu.current, { visibility: 'hidden' })
        if (returnFocus) button.current?.focus({ preventScroll: true })
        resolve()
      })
      t.timeScale(1.6).reverse()
    })
  }, [lenis])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeMenu])

  const go = async (e, href) => {
    e.preventDefault()
    if (open) await closeMenu(false)
    scrollTo(href)
    const target = document.querySelector(href)
    target?.setAttribute('tabindex', '-1')
    target?.focus({ preventScroll: true })
  }

  return (
    <>
      <header ref={bar} className="nav" data-hidden="false" data-open={open}>
        <a href="#top" className="nav__brand" onClick={(e) => go(e, '#top')}>{profile.name}</a>
        <button ref={button} type="button" className="nav__toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => (open ? closeMenu() : openMenu())}>
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <div ref={menu} id="site-menu" className="menu" aria-label="Site menu" role="dialog" aria-modal="true">
        <nav aria-label="Primary">
          <ol className="menu__list">
            {LINKS.map((link, i) => (
              <li key={link.href} className="menu__item">
                <a href={link.href} onClick={(e) => go(e, link.href)} data-cursor="Go">
                  <span><small className="menu__num">{String(i + 1).padStart(2, '0')}</small>{link.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot">
          {socialList.map((s) => <a key={s.id} href={s.url} className="link" target="_blank" rel="noopener noreferrer" data-cursor="Open">{s.label}</a>)}
        </div>
      </div>
    </>
  )
}
