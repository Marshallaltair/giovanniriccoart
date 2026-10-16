import { useState } from 'react'
import { projects } from '@data/projects.js'
import { published } from '@lib/content.js'
import { asset, comics, upperDeckManifest } from '../content.js'
import { useJson } from '../hooks.js'
import { Gallery } from './Gallery.jsx'
import { Videos } from './Videos.jsx'

const byId = Object.fromEntries(published(projects).map((p) => [p.id, p]))

/** Una tavola con quattro vignette: ogni vignetta apre il proprio capitolo. */
export function Work() {
  const [open, setOpen] = useState(null)
  const ud = useJson(upperDeckManifest, open === 'upper-deck')
  const udItems = ud?.map((name, i, all) => ({
    src: `images/work/upper-deck/${encodeURIComponent(name)}`,
    alt: `Upper Deck trading card artwork by Giovanni Ricco, ${i + 1} of ${all.length}`,
  }))

  const panels = [
    { key: 'artist-proofs', area: 'comics', action: 'Open the gallery', onClick: () => setOpen('artist-proofs') },
    { key: 'upper-deck', area: 'cards', action: 'Open the gallery', onClick: () => setOpen('upper-deck') },
    { key: 'compositing', area: 'vfx', action: 'See showreel and credits', href: '#vfx' },
    {
      key: 'animations', area: 'anim', action: 'Watch the animations', onClick: () => setOpen('animations'),
      project: { title: 'Animations', description: 'Motion design and animated redesigns of classic cartoon openings.', image: '/images/moving-image.webp', alt: 'Animation artwork by Giovanni Ricco', focus: '50% 45%' },
    },
  ]

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <h2 id="work-title" className="section-head">Comics, cards and visual effects</h2>
      <div className="tavola">
        {panels.map((p) => {
          const project = p.project ?? byId[p.key]
          if (!project) return null
          const inner = (
            <>
              <img src={asset(project.image)} alt={project.alt ?? ''} loading="lazy" decoding="async" style={{ objectPosition: project.focus }} draggable="false" />
              <span className="panel__caption">
                <span className="panel__title">{project.title}</span>
                {project.description ? <span className="panel__desc">{project.description}</span> : null}
              </span>
              <span className="panel__action">{p.action}</span>
            </>
          )
          return p.href ? (
            <a key={p.key} className={`panel panel--${p.area}`} href={p.href}>{inner}</a>
          ) : (
            <button key={p.key} type="button" className={`panel panel--${p.area}`} onClick={p.onClick}>{inner}</button>
          )
        })}
      </div>

      <Gallery open={open === 'artist-proofs'} onClose={() => setOpen(null)} title={byId['artist-proofs']?.title ?? 'Comic art'} items={comics} />
      <Gallery open={open === 'upper-deck'} onClose={() => setOpen(null)} title={byId['upper-deck']?.title ?? 'Upper Deck'} items={udItems} />
      <Videos open={open === 'animations'} onClose={() => setOpen(null)} />
    </section>
  )
}
