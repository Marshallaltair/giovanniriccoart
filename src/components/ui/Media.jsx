/**
 * Media — immagine responsive oppure "plate" vuoto con marker di tracking.
 *
 * image: string | { src, avif?, srcSet?, width?, height? } | null
 * hint:  percorso suggerito, visibile solo in sviluppo sul placeholder.
 */
const MARKERS = [
  [14, 20],
  [41, 68],
  [63, 27],
  [86, 61],
  [26, 84],
  [77, 88],
]

export function Media({ image, alt = '', className = '', sizes = '100vw', priority = false, focus, tone, hint }) {
  const img = typeof image === 'string' ? { src: image } : image

  if (!img?.src) {
    return (
      <div className={`plate-placeholder ${className}`} style={tone ? { '--tone': tone } : undefined} aria-hidden="true">
        {MARKERS.map(([x, y]) => (
          <span key={`${x}-${y}`} className="plate-placeholder__marker" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
        {import.meta.env.DEV && hint ? <span className="plate-placeholder__hint">{hint}</span> : null}
      </div>
    )
  }

  return (
    <picture className={`media ${className}`}>
      {img.avif ? <source type="image/avif" srcSet={img.avif} sizes={sizes} /> : null}
      <img
        draggable="false"
        onContextMenu={(event) => event.preventDefault()}
        src={img.src}
        srcSet={img.srcSet}
        sizes={img.srcSet ? sizes : undefined}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </picture>
  )
}
