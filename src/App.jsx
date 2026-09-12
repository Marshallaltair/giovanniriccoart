import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap.js'
import { SmoothScroll } from './components/SmoothScroll/SmoothScroll.jsx'
import { Loader } from './components/Loader/Loader.jsx'
import { CustomCursor } from './components/CustomCursor/CustomCursor.jsx'
import { Navigation } from './components/Navigation/Navigation.jsx'
import { FrameCounter } from './components/FrameCounter/FrameCounter.jsx'
import { Hero } from './components/Hero/Hero.jsx'
import { Statement } from './components/Statement/Statement.jsx'
import { ProjectShowcase } from './components/ProjectShowcase/ProjectShowcase.jsx'
import { ProductionLogos } from './components/ProductionLogos/ProductionLogos.jsx'
import { MovingImage } from './components/MovingImage/MovingImage.jsx'
import { About } from './components/About/About.jsx'
import { Contact } from './components/Contact/Contact.jsx'
import { SocialLinks } from './components/SocialLinks/SocialLinks.jsx'

export default function App() {
  const [ready, setReady] = useState(false)
  const reveal = useCallback(() => setReady(true), [])

  // Ricalcola le posizioni di ScrollTrigger quando font e immagini hanno dimensioni definitive
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Loader onReveal={reveal} />
      <CustomCursor />
      <Navigation />
      <FrameCounter />
      <main id="main" tabIndex={-1}>
        <Hero ready={ready} />
        <Statement />
        <ProjectShowcase />
        <ProductionLogos />
        <MovingImage />
        <About />
        <SocialLinks />
        <Contact />
      </main>
    </SmoothScroll>
  )
}
