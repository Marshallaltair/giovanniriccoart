// Worker del sito: serve i file statici di dist/ e gestisce il modulo contatti.
// Le Pages Functions in functions/ non girano su un Worker, quindi /api/contact vive qui.
// Serve la variabile segreta RESEND_API_KEY: npx wrangler secret put RESEND_API_KEY

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })

async function contact(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  let body
  try { body = await request.json() } catch { return json({ error: 'Invalid request' }, 400) }

  const name = String(body?.name || '').trim().slice(0, 200)
  const email = String(body?.email || '').trim().slice(0, 320)
  const message = String(body?.message || '').trim().slice(0, 10000)
  if (!name || !email || !message) return json({ error: 'Missing fields' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Invalid email' }, 400)
  if (!env.RESEND_API_KEY) return json({ error: 'Email service not configured' }, 500)

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${String(env.RESEND_API_KEY).trim()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Website Contact <contact@giovanniriccoart.com>',
      to: ['creativericco@gmail.com'],
      reply_to: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  })
  if (r.ok) return json({ ok: true })
  // Motivo dell'errore di Resend (es. chiave non valida), senza esporre la chiave
  let reason = ''
  try { reason = String((await r.json())?.message || '').slice(0, 200) } catch {}
  console.log('Resend error', r.status, reason)
  return json({ error: 'Email service failed', status: r.status, reason }, 502)
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/contact') return contact(request, env)
    if (pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404)
    return env.ASSETS.fetch(request)
  },
}
