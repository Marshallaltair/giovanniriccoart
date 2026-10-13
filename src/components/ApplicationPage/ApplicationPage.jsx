import { useEffect, useState } from 'react'
import { Navigation } from '../Navigation/Navigation.jsx'
import { MarkerGuide } from './MarkerGuide.jsx'
import './ApplicationPage.css'

const DOWNLOAD_URL = 'https://creativericco4.gumroad.com/l/marker'

export function ApplicationPage() {
  const [downloads, setDownloads] = useState(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setDownloads(data?.downloads ?? null))
      .catch(() => {})
  }, [])

  return (
    <div className="application-page">
      <Navigation />
      <main className="application-page__main">
        <p className="meta">DIGITAL TOOL / 2026</p>
        <h1 className="section-title">My Application</h1>

        <div className="application-page__content">
          <p className="prose">
            Marker is a Windows 11 utility for assigning colored tags to files and folders.
            The complete guide explains the workflow, settings and installation.
          </p>

          <div className="application-page__guide">
            <MarkerGuide />
          </div>

          <div className="application-page__download">
            <div className="application-page__counter">
              Downloads{downloads !== null ? ' · ' + downloads : ''}
            </div>
            <a
              className="application-page__cta"
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor="Download"
              onClick={() => { fetch('/api/stats?download=1', { keepalive: true }).catch(() => {}) }}
            >
              <span>Download application</span><span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <a className="link application-page__back" href="/">← Back to portfolio</a>
      </main>
    </div>
  )
}
