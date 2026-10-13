import { useState } from 'react'
import { socialList } from '@data/social.js'

const EMAIL = 'creativericco@gmail.com'
const empty = { name: '', email: '', message: '' }

export function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle')
  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!r.ok) throw new Error()
      setForm(empty); setStatus('sent')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="contact wrap" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title contact__title">Let’s work together.</h2>
      <p className="contact__sub">Commissions, artist proofs, comic pages and VFX compositing. Write to <a className="more more--inline" href={`mailto:${EMAIL}`}>{EMAIL}</a> or use the form.</p>
      <form className="form" onSubmit={submit}>
        <div className="form__row">
          <label className="field"><span>Name</span><input id="f-name" name="name" value={form.name} onChange={change} required autoComplete="name" enterKeyHint="next" /></label>
          <label className="field"><span>Email</span><input id="f-email" type="email" name="email" value={form.email} onChange={change} required autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" enterKeyHint="next" /></label>
        </div>
        <label className="field"><span>Message</span><textarea id="f-msg" name="message" value={form.message} onChange={change} required rows={5} /></label>
        <div className="form__foot">
          <button className="pill" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending' : 'Send message'}</button>
          <p className={`form__status${status === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">
            {status === 'sent' ? 'Message sent. I will reply by email.' : null}
            {status === 'error' ? `The message did not go through. Write to ${EMAIL}.` : null}
          </p>
        </div>
      </form>
      <ul className="social">
        {socialList.map((s) => <li key={s.id}><a className="more" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
      </ul>
    </section>
  )
}
