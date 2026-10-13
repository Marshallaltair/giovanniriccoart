import { RevealText } from '../ui/RevealText.jsx'
import { ParallaxSection } from '../ui/ParallaxSection.jsx'
import { FullscreenProject } from './FullscreenProject.jsx'
import { projects } from '../../data/projects.js'
import { published } from '../../lib/content.js'
import './ProjectShowcase.css'

/** ILLUSTRATION / VISUAL EFFECTS — opener parallax + sequenza di progetti a tutto schermo. */
export function ProjectShowcase() {
  const list = published(projects)

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <ParallaxSection
        id="work-title"
        title="Illustration & Visual Effects"
        image="/images/work/selected-work.webp"
        alt="Illustrated ocean scene with a ship and floating structure"
        speed={0.3}
        scale={1.18}
        overlay={0.32}
        tone="#15171b"
        hint="images/work/selected-work.webp"
        headingLevel={2}
      />
      <div className="work__projects">
        {list.map((project, i) => (
          <FullscreenProject key={project.id} project={project} index={i} total={list.length} />
        ))}
      </div>
    </section>
  )
}
