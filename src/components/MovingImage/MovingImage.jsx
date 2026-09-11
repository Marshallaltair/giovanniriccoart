import { ParallaxSection } from '../ui/ParallaxSection.jsx'
import './MovingImage.css'

/** ANIMATIONS — full-screen visual chapter using the existing moving-image artwork. */
export function MovingImage() {
  return (
    <section id="animations" aria-labelledby="animations-title">
      <ParallaxSection
        id="animations-title"
        title="Animations"
        image="/images/moving-image.webp"
        alt="Animation artwork by Giovanni Ricco"
        speed={0.3}
        scale={1.18}
        overlay={0.32}
        tone="#15171b"
        hint="images/moving-image.webp"
        headingLevel={2}
      />
    </section>
  )
}
