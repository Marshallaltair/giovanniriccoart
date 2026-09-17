const API_VERSION = 'v26.0'
const DEFAULT_FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'timestamp',
  'children{media_type,media_url,thumbnail_url,permalink}',
].join(',')

export async function onRequestGet(context) {
  const token = context.env.IG_ACCESS_TOKEN
  const userId = context.env.IG_USER_ID

  if (!token || !userId) {
    return json({ configured: false, posts: [], error: 'Instagram integration is not configured yet.' }, 503)
  }

  try {
    const posts = []
    let nextUrl = buildUrl(userId, token)
    while (nextUrl) {
      const response = await fetch(nextUrl)
      const body = await response.json()
      if (!response.ok) {
        return json({ configured: true, posts: [], error: body?.error?.message || 'Instagram API error.' }, 502)
      }
      posts.push(...(body.data || []))
      nextUrl = body.paging?.next || null
    }
    return json({ configured: true, posts })
  } catch {
    return json({ configured: true, posts: [], error: 'Instagram API request failed.' }, 502)
  }
}

function buildUrl(userId, token) {
  const url = new URL(`https://graph.instagram.com/${API_VERSION}/${userId}/media`)
  url.searchParams.set('fields', DEFAULT_FIELDS)
  url.searchParams.set('limit', '50')
  url.searchParams.set('access_token', token)
  return url.toString()
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
