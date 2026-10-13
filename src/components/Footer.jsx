import { profile } from '@data/profile.js'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner wrap">
        <p>Copyright © {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <ul><li><a href="/app">Marker for Windows</a></li><li><a href="#top">Back to top</a></li></ul>
      </div>
    </footer>
  )
}
