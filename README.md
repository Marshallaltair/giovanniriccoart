# Giovanni Ricco — sito portfolio

Sito a pagina singola, interattivo: volo 3D in WebGL tra le tavole, galleria comics orizzontale,
anello 3D delle card Upper Deck, muro di locandine, node graph Nuke dei crediti, ritratto che segue il mouse.

## Avvio

```bash
npm install
npm run dev       # anteprima su http://localhost:5173
npm run build     # sito statico pronto da pubblicare in /dist
```

## Struttura

- `index.html` — tutto il markup della pagina
- `src/site.css` — stili (font: SF Pro sui Mac, Inter Variable altrove, da @fontsource)
- `src/site.js` — interazioni: GSAP + ScrollTrigger, Lenis (smooth scroll), three.js (volo iniziale)
- `public/img/` — immagini ottimizzate usate dalla pagina:
  `comic-NN.webp` / `comic-NN-s.webp` (tavole e miniature), `card-NNN.webp` (178 card Upper Deck),
  `ba-N-a/b.webp` (coppie ink/colour per il confronto nella galleria comics), `poster-*.webp` (locandine),
  `logo-*.png` (loghi bianchi usati come maschera), `portrait.webp`, `hl-vfx.webp`
- `public/media/` — video del ritratto interattivo (`face-lg.mp4`, `face-sm.mp4`) e poster frontali
- I vecchi componenti React in `src/components/` non sono più usati dalla pagina; `src/data/` serve ancora a `vite.config.js` per i meta SEO.

## Contenuti da aggiornare

- Filmografia: array `credits` (15 film principali, con regista) ed `extraFilms` (altri crediti IMDb) in `src/site.js`
- Posizione delle locandine principali sul muro: oggetto `SLOTS` in `src/site.js`
- Video del ritratto: `FRAMES`, `CENTER` e `HEAD` nella sezione `FACE` di `src/site.js` (stesso video all-intra di prima)

## Da sapere

- Il modulo contatti e il link alla pagina di Marker funzionano solo pubblicati sul dominio del sito.

## Pubblicazione su Cloudflare (Worker "giovanniriccoart")

- Il sito gira su un Cloudflare Worker con static assets: `wrangler.jsonc` serve `dist/` e passa `/api/*` a `worker/index.js`.
- Build command: `npm run build`; deploy: `npx wrangler deploy`.
- Il modulo contatti (`/api/contact`) è in `worker/index.js`: la cartella `functions/` è delle Cloudflare Pages e su un Worker non viene eseguita.
- Le email richiedono la variabile segreta RESEND_API_KEY sul Worker: `npx wrangler secret put RESEND_API_KEY` (oppure Dashboard → Workers → giovanniriccoart → Settings → Variables and Secrets).
- Non inserire mai la chiave Resend nel codice o nel repository. Dopo il deploy, verificare il form con un invio reale.
