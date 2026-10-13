import { profile } from '@data/profile.js'
import { asset } from '../content.js'

export function About() {
  return (
    <section id="about" className="about wrap" aria-labelledby="about-title">
      <div className="about__grid">
        <figure className="about__portrait"><img src={asset(profile.portrait.image)} alt={profile.portrait.alt} loading="lazy" /></figure>
        <div className="about__text">
          <h2 id="about-title" className="chapter__title">About Giovanni.</h2>
          {profile.about.map((p) => <p key={p} className="about__p">{p}</p>)}
        </div>
      </div>
      <div className="facts">
        <div className="facts__col">
          <h3>Experience</h3>
          <ul>{profile.experience.map((e) => <li key={e.role + e.place}>{e.role}<span>{e.place}</span></li>)}</ul>
        </div>
        <div className="facts__col">
          <h3>Teaching</h3>
          <ul><li>Compositing, matte painting and VFX supervision<span>{profile.teaching.places.join(', ')}</span></li></ul>
          <h3>Education</h3>
          <ul>{profile.education.map((e) => <li key={e.title}>{e.title}<span>{e.place}</span></li>)}</ul>
        </div>
        <div className="facts__col">
          <h3>Tools</h3>
          <ul><li>{profile.tools.join(', ')}<span>Compositing</span></li></ul>
          <h3>Based in</h3>
          <ul><li>{profile.location}<span>Working worldwide</span></li></ul>
        </div>
      </div>
    </section>
  )
}
