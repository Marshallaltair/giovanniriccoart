import { useEffect, useRef } from 'react'
import guideSource from '../../assets/Marker-guida.html?raw'

function extract(source, tag) {
  const open = source.indexOf('<' + tag)
  const openEnd = source.indexOf('>', open)
  const close = source.indexOf('</' + tag + '>', openEnd)
  return close === -1 ? '' : source.slice(openEnd + 1, close)
}

const guideBody = extract(guideSource, 'body')
const guideStyles = extract(guideSource, 'style')

const lightThemeOverrides = ':host, :root { color-scheme: light; --bg: #f5f6f8 !important; --paper: #ffffff !important; --ink: #000000 !important; --muted: #2f3339 !important; --line: #e1e4ea !important; --accent: #0b63ce !important; --accent-soft: #e6f0fc !important; --code-bg: #eef0f4 !important; }\\nbody { background: var(--bg) !important; color: #000000 !important; }\\n.hero h1, .hero .lead, .hero .meta, section > h2, section > .intro, section p, section li, section td, section th, section h3, footer, details.faq summary, details.faq p, .legend .chip, .note, .steps, .tbl td { color: #000000 !important; }\\nnav.toc a, nav.toc a::before, figcaption, .tbl th { color: #2f3339 !important; }\\ncode { color: #000000 !important; }'

export function MarkerGuide() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || host.shadowRoot) return
    const shadow = host.attachShadow({ mode: 'open' })
    shadow.innerHTML = '<style>' + guideStyles + lightThemeOverrides + '</style>' + guideBody

    const scrollToHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1))
      if (!hash) return
      const target = shadow.getElementById(hash)
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      }
    }

    const onHashChange = () => scrollToHash()
    window.addEventListener('hashchange', onHashChange)
    scrollToHash()

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      shadow.innerHTML = ''
    }
  }, [])

  return <div ref={hostRef} className="marker-guide" />
}
