# Giovanni Ricco — sito "Pro"

Versione autonoma del redesign in stile pagine prodotto Apple, con homepage interattiva:
la ragazza in apertura gira la testa seguendo il mouse (25 pose, griglia 5×5).

## Avvio

```bash
npm install
npm run dev       # anteprima su http://localhost:5173
npm run build     # sito statico pronto da pubblicare in /dist
```

## Struttura

- `src/components/` — sezioni della pagina (Hero interattivo, Comics, Upper Deck, VFX, About, Contatti)
- `src/data/` — testi e dati (filmografia, profilo, progetti, social)
- `src/assets/hero/` — le 25 pose della homepage: `r{riga}c{colonna}-lg.webp` (desktop) e `-sm.webp` (telefono)
  - righe 0→4: dall'alto al basso; colonne 0→4: da sinistra a destra; `r2c2` è la posa centrale
- `public/images/` — poster, tavole a fumetti e card Upper Deck

## Cambiare le pose della homepage

Basta sostituire i file in `src/assets/hero/` mantenendo gli stessi nomi. Se le pose diventano
di più (es. 11×11 generate con face-looker), si cambia `N` e `MID` in `src/components/Hero.jsx`.

## Da sapere

- Il modulo contatti e il link alla pagina di Marker funzionano solo pubblicati sul dominio del sito.

## Pubblicazione su Cloudflare Pages

- Imposta la root del progetto sulla radice di questa repository/branch.
- Build command: npm run build; output directory: dist.
- Le email richiedono una Cloudflare Pages Function in functions/api/contact.js e la variabile segreta RESEND_API_KEY nelle impostazioni del progetto Pages (Production e Preview, se usate).
- Non inserire mai la chiave Resend nel codice o nel repository. Il form va verificato con un invio reale dopo aver configurato la variabile sul progetto di destinazione.
