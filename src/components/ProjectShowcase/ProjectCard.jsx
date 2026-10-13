import { show } from '../../lib/content.js'

/** ProjectCard — metadati del progetto dentro FullscreenProject. */
export function ProjectCard({ project }) {
  const year = show(project.year)
  const description = show(project.description)
  const external = project.link && /^https?:/.test(project.link)

  return (
    <div className="project-card">
      <p className="project-card__meta">
        <span>{project.category}</span>
        {year ? <span>{year}</span> : null}
      </p>
      {description ? <p className="project-card__desc">{description}</p> : null}
      {project.link ? (
        <a
          className="project-card__link link link--static"
          href={project.link}
          data-cursor={external ? 'Open' : 'Explore'}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {external ? 'Open' : 'See credits'}
        </a>
      ) : null}
    </div>
  )
}
