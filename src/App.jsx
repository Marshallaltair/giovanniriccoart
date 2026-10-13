import { useState } from 'react'
import { Nav } from './components/Nav.jsx'
import { Hero } from './components/Hero.jsx'
import { Statement } from './components/Statement.jsx'
import { Highlights } from './components/Highlights.jsx'
import { Numbers } from './components/Numbers.jsx'
import { Chapters } from './components/Chapters.jsx'
import { Vfx } from './components/Vfx.jsx'
import { About } from './components/About.jsx'
import { Contact } from './components/Contact.jsx'
import { Footer } from './components/Footer.jsx'
import { Sheets } from './components/Sheets.jsx'

export default function App() {
  // Un solo stato per tutte le finestre (gallerie e video), aperte da più punti della pagina
  const [sheet, setSheet] = useState(null)
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Highlights open={setSheet} />
        <Numbers />
        <Chapters open={setSheet} />
        <Vfx />
        <About />
        <Contact />
      </main>
      <Footer />
      <Sheets sheet={sheet} close={() => setSheet(null)} />
    </>
  )
}
