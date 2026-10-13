# giovanniriccoart.com, versione "Pro"

Proposta di redesign in stile pagine prodotto Apple. Stessi contenuti del sito principale:
testi e dati da `../src/data`, immagini da `../public`.

## Avvio

```bash
cd redesign-pro
npm install
npm run dev       # http://localhost:5173
npm run build     # build statica in redesign-pro/dist
```

## Cosa c'è

- Barra di navigazione in vetro smerigliato, titolo enorme sfumato in argento.
- La tavola in apertura nasce piccola e arrotondata e si allarga a tutto schermo scorrendo.
- Manifesto che si accende parola per parola, carosello "Get the highlights", riquadri con i numeri.
- Capitoli Comics e Upper Deck con anteprime e galleria completa con viewer (frecce, swipe, Esc).
- VFX: showreel, crediti in fila come su Apple TV, loghi.
- Le animazioni legate allo scroll usano solo CSS (scroll-driven animations). Sui browser che non le
  supportano la pagina resta completa e ferma; con "riduci movimento" sono disattivate.

## Da sapere

- Modulo contatti e link alla pagina di Marker funzionano solo pubblicati sullo stesso dominio del sito.
- `npm run build` copia in `dist` tutta la cartella `../public`.
