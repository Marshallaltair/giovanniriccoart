import { SectionTransition } from '../ui/SectionTransition.jsx'
import { SplitTextReveal } from '../ui/SplitTextReveal.jsx'
import { profile } from '../../data/profile.js'
import './Statement.css'

/** STATEMENT — il manifesto sale sopra l'hero e si espone parola per parola. */
export function Statement() {
  return (
    <SectionTransition as="section" id="statement" className="statement" aria-label="Statement">
      <SplitTextReveal className="statement__text" text={profile.statement} />
    </SectionTransition>
  )
}
