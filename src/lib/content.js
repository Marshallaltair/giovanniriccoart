import { TODO } from "../data/profile.js"

/** true se il valore è un segnaposto da completare. */
export const isTodo = (value) => value == null || value === TODO

/** Restituisce il valore solo se reale; in sviluppo mostra il segnaposto. */
export const show = (value) => {
  if (!isTodo(value)) return value
  return import.meta.env.DEV && value === TODO ? TODO : null
}

/** Esclude dal build di produzione gli elementi marcati draft. */
export const published = (items) => items.filter((item) => import.meta.env.DEV || !item.draft)

export const pad2 = (n) => String(n).padStart(2, "0")
