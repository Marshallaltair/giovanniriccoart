import { useRef } from 'react'
import { gsap, motion } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import { useMagnetic } from '../../hooks/useMagnetic.js'
import { useLenis } from '../../hooks/useLenis.js'
import { profile } from '../../data/profile.js'
import { social, socialList } from '../../data/social.js'
import './Footer.css'

const LINES = ['Let’s build', 'the next', 'frame.']

/**
 * FOOTER / CONTACT — conclusione narrativa.
 * Il contenuto emerge da sotto la pagina (parallasse inversa) e il titolo sale riga per riga.
 */
export function Footer() {
  const root = useRef(null)
  const cta = useRef(null)
  const { scrollTo } = useLenis()
  useMagnetic(cta, 0.2)

  useScrollAnimation(root, () => {
    const q = gsap.utils.selector(root)
    gsap.fromTo(
      q('.footer__inner'),
      { yPercent: -35 },
      { yPercent: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } },
    )
    gsap.from(q('.footer__title .mask > span'), {
      yPercent: 110,
      duration: motion.cinematic,
      ease: motion.ease.heavy,
      stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: 'top 55%', once: true },
    })
  })

  return (
    <footer ref={root} id="contact-footer" className="footer" aria-labelledby="footer-title">
      <div className="footer__inner">
        <h2 id="footer-title" className="footer__title display">
          {LINES.map((line, i) => (
            <span key={line} className="mask">
              <span>{line}</span>
              {i < LINES.length - 1 ? ' ' : null}
            </span>
          ))}
        </h2>

        <div className="footer__cta">
          {profile.email ? (
            <a ref={cta} href={`mailto:${profile.email}`} className="footer__email link" data-cursor="Open">
              {profile.email}
            </a>
          ) : (
            <p className="footer__fallback">
              For commissions, illustration and VFX work, get in touch via{' '}
              <a ref={cta} href={social.instagram.url} className="link link--static" target="_blank" rel="noopener noreferrer" data-cursor="Open">
                Instagram
              </a>{' '}
              or{' '}
              <a href={social.linkedin.url} className="link link--static" target="_blank" rel="noopener noreferrer" data-cursor="Open">
                LinkedIn
              </a>
              .
            </p>
          )}
        </div>

        <div className="footer__bottom">
          <p>{profile.name}</p>
          <ul className="footer__links">
            {socialList.map((s) => (
              <li key={s.id}>
                <a href={s.url} className="link" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="footer__copy">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a
            href="#top"
            className="link"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(0, { duration: 2.2 })
              document.getElementById('top')?.focus({ preventScroll: true })
            }}
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
