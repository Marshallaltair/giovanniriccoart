# giovanniriccoart.com

Sito personale di Giovanni Ricco. Single page in React + Vite, animazioni con GSAP/ScrollTrigger e Lenis, build statico per Cloudflare Pages.

## Avvio

Richiede Node 20.19 o superiore (consigliato 22, vedi `.nvmrc`).

```bash
npm install
npm run dev       # sviluppo su http://localhost:5173
npm run build     # build di produzione in dist/
npm run preview   # anteprima del build su http://localhost:4173
```

## Concept

Ogni inquadratura è costruita a strati, come ogni tavola. L'hero è una breakdown VFX: scorrendo, la scena ruota nello spazio e si separa in tre strati (plate, pencil, ink), poi il capitolo successivo sale e la copre. I capitoli si sovrappongono sempre così: chi entra copre chi esce.

Palette: nero, grafite, argento, bianco carta. L'unico accento è il non-photo blue (`#a4dded`), la matita azzurra usata sotto l'inchiostro: compare solo in guide, cursore e focus. Tipografia: Big Shoulders Display per titoli e nome, Geist per il testo, entrambi self-hosted.

## Modificare i contenuti

Tutti i contenuti stanno in `src/data/`. Non serve toccare i componenti.

| File | Contiene |
| --- | --- |
| `profile.js` | nome, descrittore, manifesto, bio, esperienza, docenza, email, immagini hero e ritratto, SEO |
| `projects.js` | Selected work |
| `filmography.js` | crediti cinema e TV |
| `social.js` | Instagram, LinkedIn, IMDb, YouTube (anche il video in evidenza) |

Due convenzioni:

- `TODO_CONTENT`: dato da completare. In sviluppo si vede, nel sito pubblicato viene nascosto.
- `draft: true` su un progetto: visibile solo con `npm run dev`, escluso dal build. Il progetto fumetti è in bozza finché non inserisci titolo, anno, testo e immagine.

Titolo, descrizione, Open Graph e dati strutturati schema.org vengono generati in build da `profile.js` e `social.js` (vedi `vite.config.js`), quindi hanno un'unica fonte.

### Da verificare prima di pubblicare

- Ruolo esatto in Blackstone Studio VFX (`profile.js` → `experience`), ricavato dallo snippet LinkedIn.
- Che la laurea in industrial design sia della Sapienza (`profile.js` → `education`): LinkedIn indica la Sapienza, la scheda CSC la laurea, ma non le collega esplicitamente.
- Anno dei lavori Upper Deck (`projects.js`).
- Crediti con ruolo generico "Visual effects" (Suspiria, Diabolik, The Broken Key, Suburra): se vuoi, sostituisci con il ruolo preciso.
- Email pubblica: con `email: null` il footer rimanda a Instagram e LinkedIn. Puoi creare un indirizzo `@giovanniriccoart.com` gratis con Cloudflare Email Routing.

## Immagini

Finché un'immagine manca, al suo posto compare un plate scuro con marker di tracking: nessun lavoro finto. In sviluppo il placeholder mostra il percorso consigliato.

Formati consigliati: hero 2400×1500, progetti 2400×1500, ritratto 1200×1500, still dei film 1600×1000.

Flusso consigliato con lo script incluso:

```bash
mkdir -p public/images/src/work
# copia gli originali, es. public/images/src/work/upper-deck.jpg
npm install -D sharp     # una volta sola
npm run images
```

Lo script crea WebP e AVIF a 1200 e 2400 px in `public/images/work/` e stampa l'oggetto da incollare nel file dati:

```js
image: {
  src: '/images/work/upper-deck-2400.webp',
  srcSet: '/images/work/upper-deck-1200.webp 1200w, /images/work/upper-deck-2400.webp 2400w',
  avif: '/images/work/upper-deck-1200.avif 1200w, /images/work/upper-deck-2400.avif 2400w',
  width: 2400,
  height: 1500,
},
alt: 'Descrizione breve di cosa si vede',
```

Va bene anche una stringa semplice: `image: '/images/work/upper-deck.webp'`. Gli originali in `public/images/src/` sono esclusi da git.

Per la filmografia usa solo materiale di cui hai i diritti: niente poster ufficiali senza autorizzazione. Le still compaiono all'hover (desktop) e nella riga aperta (touch) solo se presenti.

### YouTube

Senza `featuredVideoId` la sezione Moving image incorpora la playlist dei caricamenti del canale. Per mostrare un video preciso inserisci il suo ID in `social.js` → `youtube.featuredVideoId`: la thumbnail viene presa da YouTube. L'iframe (`youtube-nocookie.com`) si carica solo al click.

## Deploy su Cloudflare Pages

Il sito è statico: nessun backend, nessuna funzione.

1. Crea un repository GitHub e carica il contenuto di questa cartella (senza `node_modules` e `dist`, già esclusi da `.gitignore`). Se il vecchio progetto è già collegato a Pages, puoi sostituire i file nello stesso repository: il deploy riparte da solo al push.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → scegli il repository.
3. Impostazioni di build:
   - Framework preset: `React (Vite)` se presente, altrimenti `None`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Variabile d'ambiente: `NODE_VERSION` = `22`
4. Save and Deploy.
5. Custom domains → aggiungi `giovanniriccoart.com`. Il dominio è già su Cloudflare, quindi il record DNS viene creato in automatico. Aggiungi anche `www.giovanniriccoart.com` e reindirizzalo all'apex con una Redirect Rule (Rules → Redirect Rules → "Redirect from WWW to root"): `_redirects` di Pages non gestisce i redirect di dominio.

### Cosa è già configurato

- `public/_headers`: cache permanente per `/assets/*` (file con hash), HTML sempre rivalidato, header di sicurezza (CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy, frame-ancestors). La CSP consente YouTube e Cloudflare Web Analytics.
- `public/404.html`: pagina 404 servita automaticamente da Pages.
- `robots.txt`, `sitemap.xml` (aggiorna `lastmod` quando cambi contenuti in modo rilevante), `site.webmanifest`, favicon SVG e PNG, `og-image.jpg` 1200×630.

Non serve `_redirects`: è una single page con ancore interne.

### Analytics

Consigliato Cloudflare Web Analytics: senza cookie e senza impatto sul first paint. Si attiva da Workers & Pages → progetto → Metrics → Web Analytics. La CSP è già pronta. Se aggiungi un altro servizio, estendi `script-src` e `connect-src` in `_headers`.

## Struttura

```text
src/
  data/            contenuti (unica cosa da modificare di solito)
  components/
    Hero/            breakdown a strati
    Statement/       manifesto parola per parola
    ProjectShowcase/ FullscreenProject + ProjectCard
    Filmography/     apertura Cinema + lista crediti
    MovingImage/     facade YouTube
    About/  SocialLinks/  Footer/
    Navigation/  CustomCursor/  FrameCounter/  Loader/  SmoothScroll/
    ui/              Media, ParallaxSection, SectionTransition, RevealText,
                     SplitTextReveal, ImageReveal
  hooks/           useLenis, useScrollAnimation, useMediaQuery, useMagnetic
  lib/             gsap.js (plugin e motion system), content.js
  styles/          globals.css (token, reset, tipografia)
public/            file statici copiati così come sono in dist/
scripts/           optimize-images.mjs
```

## Motion system

Durate in `src/lib/gsap.js`: fast 0.3s, standard 0.6s, cinematic 1.2s, hero 1.6s. Curve: `power3.out`, `power4.out`, `expo.out`, `expo.inOut` per le tendine. Le animazioni legate allo scroll sono tutte in scrub: tornando indietro si riavvolgono, non si resettano. Si animano solo `transform`, `opacity` e `clip-path`.

Desktop: breakdown 3D nell'hero, cursore custom, still che segue il puntatore. Mobile e tablet: parallasse semplice, niente cursore, righe della filmografia apribili al tocco, social attivati dalla posizione di scroll.

## Accessibilità

- Con `prefers-reduced-motion: reduce` loader, smooth scroll, scrub, parallasse e cursore sono disattivati: le sezioni tornano in flusso normale e tutto il contenuto resta leggibile.
- Skip link, landmark semantici, focus visibile in azzurro su ogni elemento interattivo.
- Menu con `aria-expanded`, chiusura con Esc, focus spostato e restituito, resto della pagina `inert` mentre è aperto.
- Il nome nell'hero è un `h1` con `aria-label` (i singoli caratteri animati sono nascosti ai lettori di schermo).

## Loader

Compare solo alla prima visita della sessione (circa 2 secondi, il tempo di caricare i font) e mai con reduced motion. Per disattivarlo del tutto rimuovi `<Loader />` da `src/App.jsx`: l'hero parte comunque.
