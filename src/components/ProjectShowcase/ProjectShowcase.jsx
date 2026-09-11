import { RevealText } from '../ui/RevealText.jsx'
import { ParallaxSection } from '../ui/ParallaxSection.jsx'
import { FullscreenProject } from './FullscreenProject.jsx'
import { projects } from '../../data/projects.js'
import { published } from '../../lib/content.js'
import './ProjectShowcase.css'

/** SELECTED WORK — opener parallax + sequenza di progetti a tutto schermo. */
export function ProjectShowcase() {
  const list = published(projects)
  const categories = [...new Set(list.map((p) => p.category.toLowerCase()))]
  const lede = categories.length
    ? `${categories.slice(0, -1).join(', ')}${categories.length > 1 ? ' and ' : ''}${categories.at(-1)}.`
    : ''

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <ParallaxSection
        id="work-title"
        title="Selected work"
        image="/images/work/selected-work.webp"
        alt="Illustrated ocean scene with a ship and floating structure"
        speed={0.3}
        scale={1.18}
        overlay={0.32}
        tone="#15171b"
        hint="images/work/selected-work.webp"
        headingLevel={2}
      >
        {lede ? <p className="work__lede">{lede.charAt(0).toUpperCase() + lede.slice(1)}</p> : null}
      </ParallaxSection>
      <div className="work__projects">
        {list.map((project, i) => (
          <FullscreenProject key={project.id} project={project} index={i} total={list.length} />
        ))}
      </div>
    </section>
  )
}
