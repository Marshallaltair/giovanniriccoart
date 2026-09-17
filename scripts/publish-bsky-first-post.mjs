import fs from 'node:fs/promises'
import { PasswordSession } from '@atproto/lex-password-session'
import { Client } from '@atproto/lex'
import { post } from '@bsky/sdk'

const imagePath = 'public/images/work/upper-deck.webp'
const text = `🎨 New work — Upper Deck Trading Card Art

Original illustration created for official Upper Deck trading cards.

I love creating artwork that works both as an illustration and as a physical collectible.

More of my work:
https://giovanniriccoart.com

#Illustration #ComicArt #TradingCards #UpperDeck`

const alt = 'Original Upper Deck trading card illustration by Giovanni Ricco.'

const handle = process.env.BSKY_HANDLE
const password = process.env.BSKY_APP_PASSWORD
if (!handle || !password) throw new Error('Missing Bluesky credentials in process environment.')

const session = await PasswordSession.login({
  service: 'https://bsky.social',
  identifier: handle,
  password,
})

const client = new Client(session)
const bytes = await fs.readFile(imagePath)
const { body } = await client.uploadBlob(bytes, { encoding: 'image/webp' })

const result = await client.call(post, {
  text,
  embed: {
    $type: 'app.bsky.embed.images',
    images: [{ alt, image: body.blob }],
  },
})

console.log(`PUBLISHED ${result.uri}`)
console.log(`CID ${result.cid}`)
console.log(`HANDLE ${session.handle}`)
