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
    shadow.innerHTML = '<style>' + guideStyles + '</style>' + guideBody
    return () => { shadow.innerHTML = '' }
  }, [])

  return <div ref={hostRef} className="marker-guide" />
}
