import './ProductionLogos.css'

const logos = [
  { name: 'NETFLIX', className: 'logo--netflix' },
  { name: 'Prime Video', className: 'logo--prime' },
  { name: 'RAI', className: 'logo--rai' },
  { name: 'SKY', className: 'logo--sky' },
  { name: 'FOX', className: 'logo--fox' },
  { name: 'DISNEY+', className: 'logo--disney' },
  { name: 'WARNER BROS.', className: 'logo--warner' },
  { name: 'BLACKSTONE STUDIO VFX', className: 'logo--blackstone' },
  { name: 'AUGUSTUS COLOR', className: 'logo--augustus' },
  { name: 'ALTEREGO', className: 'logo--alterego' },
  { name: 'MINISTERO DELL’INTERNO', className: 'logo--ministero' },
  { name: 'ALPS STUDIO', className: 'logo--alps' },
  { name: 'MIBAC', className: 'logo--mibac' },
]

export function ProductionLogos() {
  const repeated = [...logos, ...logos]

  return (
    <section className="production-logos" aria-label="Selected productions and VFX studios">
      <div className="production-logos__label">Selected productions &amp; VFX studios</div>
      <div className="production-logos__viewport">
        <div className="production-logos__track">
          {repeated.map((logo, index) => (
            <span key={`${logo.name}-${index}`} className={`production-logos__item ${logo.className}`} aria-hidden={index >= logos.length}>
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
