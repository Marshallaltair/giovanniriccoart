import { useEffect, useState, useSyncExternalStore } from 'react'

export function useMedia(query) {
  return useSyncExternalStore(
    (cb) => { const m = matchMedia(query); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
    () => matchMedia(query).matches,
    () => false,
  )
}
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')

/** Carica il manifest JSON solo quando serve (apertura della galleria). */
export function useJson(url, enabled) {
  const [data, setData] = useState(null)
  useEffect(() => {
    if (!enabled || data) return undefined
    let off = false
    fetch(url).then((r) => (r.ok ? r.json() : [])).then((d) => !off && setData(d)).catch(() => !off && setData([]))
    return () => { off = true }
  }, [url, enabled, data])
  return data
}
