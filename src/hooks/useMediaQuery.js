import { useSyncExternalStore } from "react"
import { mq } from "../lib/gsap.js"

/** Stato reattivo di una media query (SSR-safe, niente listener duplicati). */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener("change", onChange)
      return () => list.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useReducedMotion = () => useMediaQuery(mq.reduced)
export const useFinePointer = () => useMediaQuery(mq.finePointer)
