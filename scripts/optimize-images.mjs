/**
 * Ottimizzazione immagini — opzionale.
 *
 * 1. Metti gli originali (JPG/PNG/TIFF) in public/images/src/, anche in sottocartelle
 *    (es. public/images/src/work/upper-deck.jpg).
 * 2. npm install -D sharp   (una volta sola)
 * 3. npm run images
 *
 * Per ogni file crea in public/images/<sottocartella>/ le versioni WebP e AVIF
 * a 1200 e 2400 px di larghezza e stampa l'oggetto da incollare nei file in src/data/.
 * La cartella src/ è esclusa da git (.gitignore): nel repository vanno solo i derivati.
 */
import { readdir, mkdir } from 'node:fs/promises'
import { join, parse, relative } from 'node:path'

const SRC = 'public/images/src'
const OUT = 'public/images'
const WIDTHS = [1200, 2400]

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('sharp non è installato. Esegui: npm install -D sharp')
  process.exit(1)
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (/\.(jpe?g|png|tiff?)$/i.test(entry.name)) yield path
  }
}

try {
  await readdir(SRC)
} catch {
  console.error(`Cartella ${SRC} non trovata. Creala e inserisci gli originali.`)
  process.exit(1)
}

for await (const file of walk(SRC)) {
  const rel = relative(SRC, file)
  const { dir, name } = parse(rel)
  const target = join(OUT, dir)
  await mkdir(target, { recursive: true })

  const meta = await sharp(file).metadata()
  const sizes = WIDTHS.filter((w) => w < meta.width).concat(Math.min(meta.width, WIDTHS.at(-1)))
  const unique = [...new Set(sizes)]

  for (const w of unique) {
    const base = sharp(file).rotate().resize({ width: w, withoutEnlargement: true })
    await base.clone().webp({ quality: 80 }).toFile(join(target, `${name}-${w}.webp`))
    await base.clone().avif({ quality: 55 }).toFile(join(target, `${name}-${w}.avif`))
  }

  const largest = unique.at(-1)
  const height = Math.round((meta.height / meta.width) * largest)
  const url = (w, ext) => `/${join('images', dir, `${name}-${w}.${ext}`).replaceAll('\\', '/')}`
  const srcSet = (ext) => unique.map((w) => `${url(w, ext)} ${w}w`).join(', ')

  console.log(`\n${rel}`)
  console.log(
    JSON.stringify(
      { src: url(largest, 'webp'), srcSet: srcSet('webp'), avif: srcSet('avif'), width: largest, height },
      null,
      2,
    ),
  )
}
