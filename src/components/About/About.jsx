import { useRef } from 'react'
import { gsap } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import { ImageReveal } from '../ui/ImageReveal.jsx'
import { profile } from '../../data/profile.js'
import './About.css'

const list = (items) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0]

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

/** ABOUT — dichiarazione editoriale: nome, biografia, esperienza, docenza. */
export function About() {
  const ref = useRef(null)

  useScrollAnimation(ref, ({ mobile }) => {
    const q = gsap.utils.selector(ref)
    const range = mobile ? 3 : 6
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    tl.fromTo(q('.about__portrait'), { yPercent: -range }, { yPercent: range, ease: 'none' }, 0)
      .fromTo(q('.about__bio'), { yPercent: range }, { yPercent: -range, ease: 'none' }, 0)
  })

  return (
    <section ref={ref} id="about" className="about" aria-labelledby="about-title">
      <div className="about__top">
        <h2 id="about-title" className="about__name display">
          <span>{profile.firstName}</span> <span>{profile.lastName}</span>
        </h2>
        <ImageReveal
          className="about__portrait"
          image={profile.portrait.image}
          alt={profile.portrait.alt}
          ratio="4 / 5"
          tone="#191a1d"
          hint="images/portrait.webp"
          sizes="(min-width: 900px) 33vw, 100vw"
        />
        <div className="about__bio">
          {profile.about.map((p) => (
            <p key={p} className="prose">
              {p}
            </p>
          ))}
          {profile.clients.length ? (
            <p className="about__clients">Clients have included {list(profile.clients)}.</p>
          ) : null}
        </div>
      </div>

      <div className="about__facts">
        <div>
          <h3 className="about__label">Experience</h3>
          <ol className="about__list">
            {profile.experience.map((e) => (
              <li key={`${e.role}-${e.place}`}>
                <span>{e.role}</span>
                <span className="about__place">{e.place}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="about__label">Teaching</h3>
          <p className="about__subjects">{capitalize(list(profile.teaching.subjects))}</p>
          <ul className="about__list">
            {profile.teaching.places.map((place) => (
              <li key={place}>
                <span>{place}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="about__label">Education</h3>
          <ul className="about__list">
            {profile.education.map((e) => (
              <li key={e.title}>
                <span>{e.title}</span>
                <span className="about__place">{e.place}</span>
              </li>
            ))}
          </ul>
          <h3 className="about__label about__label--spaced">Tools</h3>
          <p>{profile.tools.join(', ')}</p>
        </div>
      </div>
    </section>
  )
}
