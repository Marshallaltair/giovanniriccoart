import { Nav } from './components/Nav.jsx'
import { Hero } from './components/Hero.jsx'
import { Statement } from './components/Statement.jsx'
import { Work } from './components/Work.jsx'
import { Vfx } from './components/Vfx.jsx'
import { About } from './components/About.jsx'
import { Contact } from './components/Contact.jsx'
import { Footer } from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Work />
        <Vfx />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
