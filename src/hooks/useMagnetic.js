import { useEffect } from "react"
import { gsap, mq } from "../lib/gsap.js"

/** Attrazione magnetica leggerissima verso il puntatore (solo desktop). */
export function useMagnetic(ref, strength = 0.25) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia(mq.finePointer).matches || window.matchMedia(mq.reduced).matches) return

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" })

    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    return () => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [ref, strength])
}
