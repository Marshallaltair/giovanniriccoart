import fs from 'node:fs/promises'
import http from 'node:http'
import { spawn } from 'node:child_process'
import { Agent } from '@atproto/api'
import { NodeOAuthClient, buildAtprotoLoopbackClientMetadata } from '@atproto/oauth-client-node'
import { post } from '@bsky/sdk'

const imagePath = 'public/images/work/upper-deck.webp'
const text = `🎨 New work — Upper Deck Trading Card Art

Original illustration created for official Upper Deck trading cards.

I love creating artwork that works both as an illustration and as a physical collectible.

More of my work:
https://giovanniriccoart.com

#Illustration #ComicArt #TradingCards #UpperDeck`
const alt = 'Original Upper Deck trading card illustration by Giovanni Ricco.'

const stateMap = new Map()
const sessionMap = new Map()
const stateStore = {
  get: (key) => stateMap.get(key),
  set: (key, value) => stateMap.set(key, value),
  del: (key) => stateMap.delete(key),
}
const sessionStore = {
  get: (key) => sessionMap.get(key),
  set: (key, value) => sessionMap.set(key, value),
  del: (key) => sessionMap.delete(key),
}
let oauthClient

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1')
    if (url.pathname !== '/') {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    const { session } = await oauthClient.callback(url.searchParams)
    const agent = new Agent(session)
    const bytes = await fs.readFile(imagePath)
    const blob = await agent.uploadBlob(bytes, { encoding: 'image/webp' })
    const result = await agent.post({
      text,
      embed: {
        $type: 'app.bsky.embed.images',
        images: [{ alt, image: blob.data.blob }],
      },
    })

    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    res.end('<h1>Pubblicato su Bluesky</h1><p>Puoi chiudere questa finestra.</p>')
    console.log(`PUBLISHED ${result.uri}`)
    console.log(`CID ${result.cid}`)
    console.log(`DID ${session.did}`)
    setTimeout(() => server.close(() => process.exit(0)), 500)
  } catch (error) {
    console.error('OAuth/publish failed:', error)
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(`Errore: ${error?.message ?? error}`)
  }
})

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port
  const redirectUri = `http://127.0.0.1:${port}/`
  const metadata = buildAtprotoLoopbackClientMetadata({
    scope: 'atproto',
    redirect_uris: [redirectUri],
  })
  metadata.client_name = 'Giovanni Ricco Art — Bluesky Publisher'
  oauthClient = new NodeOAuthClient({ clientMetadata: metadata, stateStore, sessionStore })
  try {
    const url = await oauthClient.authorize('giovanniriccoart.bsky.social', {
      redirect_uri: redirectUri,
    })
    console.log(`OPEN ${url.toString()}`)
    spawn('cmd.exe', ['/c', 'start', '', url.toString()], { detached: true, stdio: 'ignore' }).unref()
  } catch (error) {
    console.error('OAuth start failed:', error)
    server.close(() => process.exit(1))
  }
})
