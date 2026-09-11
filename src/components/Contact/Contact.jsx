import { useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.js'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import { RevealText } from '../ui/RevealText.jsx'
import './Contact.css'

const initialForm = { name: '', email: '', message: '' }

export function Contact() {
  const ref = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  useScrollAnimation(ref, () => {
    const fields = ref.current.querySelectorAll('.contact__field, .contact__submit')
    gsap.fromTo(fields, { y: 24, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
    })
  })

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Request failed')
      setForm(initialForm)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__intro">
        <span className="eyebrow">Contact</span>
        <RevealText id="contact-title" className="section-title" lines={['Let’s', 'work together']} />
        <p className="contact__mail">creativericco@gmail.com</p>
      </div>
      <form className="contact__form" onSubmit={handleSubmit}>
        <label className="contact__field">
          <span>Name</span>
          <input name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
        </label>
        <label className="contact__field">
          <span>Email</span>
          <input type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" />
        </label>
        <label className="contact__field contact__field--message">
          <span>Message</span>
          <textarea name="message" value={form.message} onChange={handleChange} required rows="5" />
        </label>
        <button className="contact__submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'sent' && <p className="contact__status">Message sent.</p>}
        {status === 'error' && <p className="contact__status contact__status--error">Something went wrong. Please email me directly.</p>}
      </form>
    </section>
  )
}
