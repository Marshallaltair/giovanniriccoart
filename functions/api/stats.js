const KEYS = {
  visits: 'site_visits',
  downloads: 'marker_downloads',
}

export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url)
    const shouldCountVisit = url.searchParams.get('visit') === '1'
    const shouldCountDownload = url.searchParams.get('download') === '1'
    const db = context.env.DB

    if (!db) {
      if (shouldCountDownload) return downloadResponse(context, url)
      return json({ visits: 0, downloads: 0, persistent: false })
    }

    if (shouldCountVisit) await increment(db, KEYS.visits)
    const downloads = await getCount(db, KEYS.downloads)
    const visits = await getCount(db, KEYS.visits)

    if (shouldCountDownload) {
      await increment(db, KEYS.downloads)
      return downloadResponse(context, url)
    }

    return json({ visits, downloads, persistent: true })
  } catch {
    return json({ visits: 0, downloads: 0, persistent: false }, 500)
  }
}

async function downloadResponse(context, url) {
  const assetUrl = new URL('/Marker-Setup.zip', url)
  const response = await context.env.ASSETS.fetch(new Request(assetUrl))
  if (!response.ok) return response

  const headers = new Headers(response.headers)
  headers.set('Content-Disposition', 'attachment; filename="Marker-Setup.zip"')
  headers.set('Content-Type', 'application/zip')
  headers.set('Cache-Control', 'no-store')
  return new Response(response.body, { status: response.status, headers })
}

async function getCount(db, key) {
  const row = await db.prepare('SELECT value FROM counters WHERE key = ?1').bind(key).first()
  return Number(row?.value || 0)
}

async function increment(db, key) {
  const sql = 'INSERT INTO counters (key, value) VALUES (?1, 1) ' +
    'ON CONFLICT(key) DO UPDATE SET value = value + 1'
  await db.prepare(sql).bind(key).run()
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}
