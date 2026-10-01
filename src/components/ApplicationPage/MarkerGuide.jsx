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

export function MarkerGuide() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || host.shadowRoot) return
    const shadow = host.attachShadow({ mode: 'open' })
    shadow.innerHTML = '<style>' + guideStyles + '\n:host { color-scheme: light; --bg: #f5f6f8; --paper: #ffffff; --ink: #000000; --muted: #2f3339; --line: #e1e4ea; }\n</style>' + guideBody

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
