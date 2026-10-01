[Reading 55 lines from start (total: 55 lines, 0 remaining)]

import { useEffect, useState } from 'react'
import { Navigation } from '../Navigation/Navigation.jsx'
import { MarkerGuide } from './MarkerGuide.jsx'
import './ApplicationPage.css'

const DOWNLOAD_URL = '/Marker-Setup.zip'

export function ApplicationPage() {
  const [stats, setStats] = useState({ visits: null, downloads: null })

  useEffect(() => {
    fetch('/api/stats?visit=1')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setStats({ visits: data?.visits ?? null, downloads: data?.downloads ?? null }))
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
              Visits{stats.visits !== null ? ' · ' + stats.visits : ''} · Downloads{stats.downloads !== null ? ' · ' + stats.downloads : ''}
            </div>
            <a
              className="application-page__cta"
              href={DOWNLOAD_URL}
              download="Marker-Setup.zip"
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

[executed on device: LAPTOP-BAM6TR8H (5e64067a-bfa8-4884-b402-b44f10e02bc9)]