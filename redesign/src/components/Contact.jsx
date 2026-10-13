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
      setForm(empty)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__intro">
        <h2 id="contact-title" className="contact__title">Let’s work together</h2>
        <p className="contact__lede">Commissions, artist proofs, comic work and VFX compositing.</p>
        <a className="contact__mail ink-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <ul className="contact__social">
          {socialList.map((s) => (
            <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer"><span>{s.label}</span><span className="contact__handle">{s.handle}</span></a></li>
          ))}
        </ul>
      </div>
      <form className="balloon" onSubmit={submit}>
        <label>Name<input name="name" value={form.name} onChange={change} required autoComplete="name" enterKeyHint="next" /></label>
        <label>Email<input type="email" name="email" value={form.email} onChange={change} required autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" enterKeyHint="next" /></label>
        <label>Message<textarea name="message" value={form.message} onChange={change} required rows={5} /></label>
        <button className="btn btn--solid" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending message' : 'Send message'}</button>
        <p className={`balloon__status${status === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">
          {status === 'sent' ? 'Message sent. I will reply by email.' : null}
          {status === 'error' ? `The message did not go through. Write to ${EMAIL}.` : null}
        </p>
      </form>
    </section>
  )
}
