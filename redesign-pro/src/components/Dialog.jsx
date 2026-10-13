import { useEffect, useRef } from 'react'

/**
 * Finestra a tutto schermo basata su <dialog>: trap del focus, Esc e ritorno del focus
 * li gestisce il browser. La pagina dietro non scorre mentre è aperta.
 */
export function Dialog({ open, onClose, label, className = '', children }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) { d.showModal(); document.documentElement.classList.add('is-locked') }
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      className={`sheet ${className}`}
      aria-label={label}
      onClose={() => { document.documentElement.classList.remove('is-locked'); onClose() }}
    >
      {open ? children : null}
    </dialog>
  )
}
