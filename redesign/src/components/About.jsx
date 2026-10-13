import { profile } from '@data/profile.js'
import { asset } from '../content.js'

const list = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0])
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1)

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-head">About Giovanni</h2>
      <div className="about__grid">
        <figure className="about__portrait">
          <img src={asset(profile.portrait.image)} alt={profile.portrait.alt} loading="lazy" decoding="async" />
        </figure>
        <div className="about__bio">
          {profile.about.map((p) => <p key={p}>{p}</p>)}
          <p className="about__clients">Clients have included {list(profile.clients).replace(/\.$/, '')}.</p>
        </div>
      </div>
      <div className="about__facts">
        <div>
          <h3>Experience</h3>
          <ul>{profile.experience.map((e) => <li key={e.role + e.place}>{e.role}<span>{e.place}</span></li>)}</ul>
        </div>
        <div>
          <h3>Teaching</h3>
          <ul>
            <li>{cap(list(profile.teaching.subjects))}<span>{profile.teaching.places.join(', ')}</span></li>
          </ul>
        </div>
        <div>
          <h3>Education and tools</h3>
          <ul>
            {profile.education.map((e) => <li key={e.title}>{e.title}<span>{e.place}</span></li>)}
            <li>{profile.tools.join(', ')}<span>Compositing</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
