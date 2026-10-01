import { Navigation } from '../Navigation/Navigation.jsx'
import './ApplicationPage.css'

const DOWNLOAD_URL = '/Marker-Setup.zip'

export function ApplicationPage() {
  return (
    <div className="application-page">
      <Navigation />
      <main className="application-page__main">
        <p className="meta">DIGITAL TOOL / 2026</p>
        <h1 className="section-title">My Application</h1>
        <div className="application-page__content">
          <p className="prose">
            An application created by Giovanni Ricco. Open the project page to explore the application and use its download option.
          </p>
          <a className="application-page__cta" href={DOWNLOAD_URL} download="Marker-Setup.zip" data-cursor="Download">
            <span>Download application</span><span aria-hidden="true">↓</span>
          </a>
        </div>
        <a className="link application-page__back" href="/">← Back to portfolio</a>
      </main>
    </div>
  )
}
