import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Motion design system.
 * Durate in secondi, curve con peso e inerzia (niente ease-in-out generico).
 */
export const motion = {
  fast: 0.3,
  standard: 0.6,
  cinematic: 1.2,
  hero: 1.6,
  ease: {
    out: "power3.out",
    strong: "expo.out",
    heavy: "power4.out",
    settle: "circ.out",
    wipe: "expo.inOut",
  },
}

/** Media query condivise con gsap.matchMedia e i componenti. */
export const mq = {
  desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 899.98px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
}

export { gsap, ScrollTrigger, useGSAP }
