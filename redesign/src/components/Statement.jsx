import { profile } from '@data/profile.js'

/** Il manifesto come un riquadro di didascalia narrativa, quello che apre una tavola. */
export function Statement() {
  return (
    <section className="statement" aria-label="Statement">
      <p className="caption-box">{profile.statement}</p>
    </section>
  )
}
