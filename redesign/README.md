# giovanniriccoart.com, versione "Pencil → Comp"

Proposta alternativa di design per il sito. Stessi contenuti del sito principale:
testi e dati arrivano da `../src/data`, le immagini da `../public`. Se modifichi un
progetto o un credito nel sito principale, cambia anche qui.

## Avvio

```bash
cd redesign
npm install
npm run dev       # http://localhost:5173
npm run build     # build statica in redesign/dist
```

## Il concept

Il fumetto e il VFX hanno la stessa catena di lavoro: matita, china, colore / plate, comp, final.
Il sito è un albo stampato su cartoncino da tavola che, al capitolo VFX, si accende e diventa
lo schermo del viewer.

- Splash page: la stessa tavola in due passate, matita azzurra a sinistra e colore finale a destra,
  divise da una banda chroma key che si trascina (mouse, dito o frecce della tastiera), con il timecode.
  La passata matita è un'immagine pre-calcolata (`src/assets/comic-pencil.webp`); per cambiare
  tavola va rigenerata.
- La tavola dei lavori: quattro vignette con didascalie, ognuna apre il proprio capitolo.
- Le gallerie sono impaginate come una tavola, con viewer a schermo pieno (frecce, swipe, Esc).
- Il capitolo VFX è l'unico cambio di tema: si accende come un monitor durante lo scroll.
- Il modulo contatti è un balloon: unico elemento tondo, tutto il resto ha angoli vivi.

## Sistema

| Token | Valore | Uso |
| --- | --- | --- |
| Cartoncino | `#FAFAF8` | fondo |
| China | `#0E0E0E` | testo, bordi delle vignette (3px) |
| Chroma key | `#00B140` | unico accento, solo campiture, mai testo verde su bianco |
| Grafite | `#5E5E5E` | testo secondario |
| Viewer | `#151617` | solo capitolo VFX |

Caratteri: Archivo variabile (ultra condensato e nero per i titoli, normale per il testo),
Geist Mono solo per timecode e numeri.

## Da sapere

- Il modulo contatti e il link alla pagina di Marker funzionano solo una volta pubblicato sullo
  stesso dominio del sito (usano `/api/contact` e `/app`).
- `npm run build` copia in `dist` tutta la cartella `../public`, perché le immagini sono quelle del sito.
