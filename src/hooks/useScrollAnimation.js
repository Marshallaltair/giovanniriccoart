import { gsap, mq, useGSAP } from "../lib/gsap.js"

/**
 * Registra animazioni GSAP/ScrollTrigger con cleanup automatico.
 * La factory riceve le condizioni { desktop, mobile } e non viene
 * eseguita con prefers-reduced-motion: il contenuto resta nello stato finale.
 */
export function useScrollAnimation(scope, factory, dependencies = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: mq.desktop, mobile: mq.mobile }, (context) => {
        const { desktop, mobile } = context.conditions
        if (!desktop && !mobile) return
        return factory({ desktop, mobile })
      })
      return () => mm.revert()
    },
    { scope, dependencies },
  )
}
