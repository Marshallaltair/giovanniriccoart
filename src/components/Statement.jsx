import { profile } from '@data/profile.js'

/** Il manifesto si "accende" parola per parola mentre attraversa lo schermo. */
export function Statement() {
  const words = profile.statement.split(' ')
  return (
    <section className="statement" aria-label="Statement">
      <p className="statement__text">
        {words.map((w, i) => <span key={i} className="statement__word">{w}{i < words.length - 1 ? ' ' : ''}</span>)}
      </p>
    </section>
  )
}
