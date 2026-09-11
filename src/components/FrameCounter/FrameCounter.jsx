import { useRef } from 'react'
import { ScrollTrigger, useGSAP } from '../../lib/gsap.js'
import './FrameCounter.css'

/**
 * FrameCounter — il numero di frame avanza con lo scroll, come nel viewer
 * di un software di compositing. I frame partono da 1001 per convenzione VFX.
 * Decorativo, solo desktop.
 */
export function FrameCounter() {
  const ref = useRef(null)

  useGSAP(() => {
    const el = ref.current
    let last = -1
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const frame = 1001 + Math.round(self.scroll() / 12)
        if (frame !== last) {
          el.textContent = String(frame)
          last = frame
        }
      },
    })
  })

  return (
    <div className="frame-counter" aria-hidden="true">
      <span ref={ref}>1001</span>
    </div>
  )
}
