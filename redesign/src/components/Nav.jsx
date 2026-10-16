import { profile } from '@data/profile.js'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#vfx', label: 'VFX' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="nav">
      <a className="nav__brand" href="#top">{profile.name}</a>
      <nav aria-label="Primary">
        <ul className="nav__links">
          {LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
      </nav>
    </header>
  )
}
