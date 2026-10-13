import './ProductionLogos.css'

const logos = [
  { name: 'Netflix', src: '/images/logos/Netflix.png' },
  { name: 'Mediaset', src: '/images/logos/mediaset.png' },
  { name: 'Blackstone Studio VFX', src: '/images/logos/blackstone-vfx.png' },
  { name: 'Augustus Color', src: '/images/logos/augustus-color.png' },
  { name: 'Alps Studios', src: '/images/logos/alps-studios.png' },
  { name: 'Disney+', src: '/images/logos/disneyplus.png' },
  { name: 'RAI', src: '/images/logos/RAI.png' },
  { name: 'Rai Cinema', src: '/images/logos/raicinema.png' },
]

export function ProductionLogos() {
  const repeated = [...logos, ...logos]

  return (
    <section className="production-logos" aria-label="Selected productions and VFX studios">
      <div className="production-logos__label">Selected productions &amp; VFX studios</div>
      <div className="production-logos__viewport">
        <div className="production-logos__track">
          {repeated.map((logo, index) => (
            <span key={`${logo.name}-${index}`} className="production-logos__item" aria-hidden={index >= logos.length}>
              <img src={logo.src} alt={index < logos.length ? logo.name : ''} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
