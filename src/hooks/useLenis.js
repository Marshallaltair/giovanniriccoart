import { createContext, useCallback, useContext } from "react"

export const LenisContext = createContext(null)

/**
 * Accesso all'istanza Lenis e a uno scrollTo che funziona anche
 * quando lo smooth scroll è disattivato (reduced motion).
 */
export function useLenis() {
  const lenis = useContext(LenisContext)

  const scrollTo = useCallback(
    (target, options = {}) => {
      const el = typeof target === "string" ? document.querySelector(target) : target
      if (lenis) {
        lenis.scrollTo(el ?? target, { duration: 1.4, ...options })
      } else if (el?.scrollIntoView) {
        el.scrollIntoView({ block: "start" })
      } else if (typeof target === "number") {
        window.scrollTo(0, target)
      }
    },
    [lenis],
  )

  return { lenis, scrollTo }
}
