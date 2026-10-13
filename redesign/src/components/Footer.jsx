import { profile } from '@data/profile.js'

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {profile.name}, {profile.location}</p>
      <a className="ink-link" href="/app">Marker, Windows app</a>
      <a className="ink-link" href="#top">Back to top</a>
    </footer>
  )
}
