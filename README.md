# Giovanni Ricco — sito "Pro"

Versione autonoma del redesign in stile pagine prodotto Apple, con homepage interattiva:
la ragazza in apertura gira la testa seguendo il mouse (scrub di un video, solo sinistra↔destra).

## Avvio

```bash
npm install
npm run dev       # anteprima su http://localhost:5173
npm run build     # sito statico pronto da pubblicare in /dist
```

## Struttura

- `src/components/` — sezioni della pagina (Hero interattivo, Comics, Upper Deck, VFX, About, Contatti)
- `src/data/` — testi e dati (filmografia, profilo, progetti, social)
- `src/assets/hero/` — il video della homepage: `face-lg.mp4` (1920px, desktop) e `face-sm.mp4` (1280px, telefono),
  più i poster della posa frontale `face-center-lg/sm.webp`. Le vecchie 25 pose `r*c*.webp` non sono più usate.
- `public/images/` — poster, tavole a fumetti e card Upper Deck

## Cambiare il video della homepage

Il sorgente è `interactive home/face.mp4` (frame 0 = guarda a sinistra, ultimo = guarda a destra).
Va ricodificato **all-intra** (ogni frame keyframe), altrimenti lo scrub col mouse scatta:

```bash
ffmpeg -i "interactive home/face.mp4" -an -vf scale=1920:-2 -c:v libx264 -preset slow -crf 22 -g 1 -movflags +faststart src/assets/hero/face-lg.mp4
ffmpeg -i "interactive home/face.mp4" -an -vf scale=1280:-2 -c:v libx264 -preset slow -crf 23 -g 1 -movflags +faststart src/assets/hero/face-sm.mp4
```

In `src/components/Hero.jsx`: `FRAMES` (numero di frame), `CENTER` (frame frontale da cui parte la home, ora 75),
`HEAD` (posizione della testa nel video), `FOLLOW` (morbidezza dell'inseguimento).

## Da sapere

- Il modulo contatti e il link alla pagina di Marker funzionano solo pubblicati sul dominio del sito.

## Pubblicazione su Cloudflare (Worker "giovanniriccoart")

- Il sito gira su un Cloudflare Worker con static assets: `wrangler.jsonc` serve `dist/` e passa `/api/*` a `worker/index.js`.
- Build command: `npm run build`; deploy: `npx wrangler deploy`.
- Il modulo contatti (`/api/contact`) è in `worker/index.js`: la cartella `functions/` è delle Cloudflare Pages e su un Worker non viene eseguita.
- Le email richiedono la variabile segreta RESEND_API_KEY sul Worker: `npx wrangler secret put RESEND_API_KEY` (oppure Dashboard → Workers → giovanniriccoart → Settings → Variables and Secrets).
- Non inserire mai la chiave Resend nel codice o nel repository. Dopo il deploy, verificare il form con un invio reale.
