import { profile } from '@data/profile.js'

/** Riquadri con i dati veri della carriera. */
export function Numbers() {
  return (
    <section className="numbers wrap" aria-labelledby="numbers-title">
      <h2 id="numbers-title" className="section-title">Fifteen years of frames.</h2>
      <div className="bento">
        <div className="tile tile--big">
          <p className="tile__label">Productions</p>
          <p className="tile__num grad">70+</p>
          <p className="tile__text">Feature films and series as a VFX compositor, from Suspiria to Cliffhanger.</p>
        </div>
        <div className="tile">
          <p className="tile__label">Upper Deck</p>
          <p className="tile__num">178</p>
          <p className="tile__text">Sketch cards and artist proofs for official sets.</p>
        </div>
        <div className="tile">
          <p className="tile__label">Experience</p>
          <p className="tile__num">15+</p>
          <p className="tile__text">Years in visual effects, freelance and in studio.</p>
        </div>
        <div className="tile tile--wide">
          <p className="tile__label">Clients have included</p>
          <ul className="tile__clients">{profile.clients.map((c) => <li key={c} className="grad-silver">{c.replace(/\.$/, '.')}</li>)}</ul>
        </div>
        <div className="tile tile--wide tile--teach">
          <p className="tile__label">Teaching</p>
          <p className="tile__text tile__text--lg">Compositing, matte painting and VFX supervision at {profile.teaching.places.join(', ')}.</p>
        </div>
      </div>
    </section>
  )
}
