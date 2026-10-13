import { profile } from '@data/profile.js'

const LINKS = [
  { href: '#comics', label: 'Comics' },
  { href: '#cards', label: 'Upper Deck' },
  { href: '#vfx', label: 'VFX' },
  { href: '#about', label: 'About' },
]

export function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top">{profile.name}</a>
        <nav aria-label="Primary">
          <ul className="nav__links">{LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </nav>
        <a className="pill pill--small" href="#contact">Contact</a>
      </div>
    </header>
  )
}
