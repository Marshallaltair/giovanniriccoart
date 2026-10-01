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
      return json({ visits: 0, downloads: 0, persistent: false })
    }

    if (shouldCountVisit) await increment(db, KEYS.visits)
    if (shouldCountDownload) await increment(db, KEYS.downloads)

    const downloads = await getCount(db, KEYS.downloads)
    const visits = await getCount(db, KEYS.visits)

    return json({ visits, downloads, persistent: true })
  } catch {
    return json({ visits: 0, downloads: 0, persistent: false }, 500)
  }
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
