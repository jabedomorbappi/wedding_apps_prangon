// frontend/src/components/Contact.jsx
import { useState } from 'react'
import API from '../api/axios'

function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    wedding_date: '', message: '',
    event_city: '', event_country: 'Bangladesh',
  })
  const [status, setStatus] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    API.post('/enquiry/', form)
      .then(() => {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', wedding_date: '', message: '', event_city: '', event_country: 'Bangladesh' })
      })
      .catch(() => setStatus('error'))
  }

  // Styles kept as constants for cleaner JSX
  const inputStyle = {
    width: '100%',
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(201,169,110,0.3)',
    padding: '13px 16px',
    color: '#f5f0eb',
    fontSize: '0.82rem',
    outline: 'none',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'border-color 0.3s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.58rem',
    letterSpacing: '2.5px',
    color: '#c9a96e',
    textTransform: 'uppercase',
    marginBottom: '8px',
  }

  function focusIn(e) { e.target.style.borderBottomColor = '#c9a96e' }
  function focusOut(e) { e.target.style.borderBottomColor = 'rgba(201,169,110,0.3)' }

  return (
    <section id="contact" className="py-5" style={{ background: '#0d0d0d' }}>
      <div className="container py-lg-5">
        
        {/* Header */}
        <div className="text-center mb-5 mb-lg-100">
          <p className="text-uppercase mb-2" style={{ fontSize: '0.62rem', letterSpacing: '5px', color: '#c9a96e' }}>
            Contact
          </p>
          <h2 className="fw-light" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#f5f0eb', letterSpacing: '2px' }}>
            Let's Book a Date
          </h2>
          <div className="mx-auto mt-3" style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
        </div>

        {/* Main Grid: 1 col on mobile, 2 cols on lg screens */}
        <div className="row g-5">
          
          {/* Left — Form */}
          <div className="col-12 col-lg-7">
            <form onSubmit={handleSubmit} className="pe-lg-4">
              
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>First Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    required placeholder="First name" style={inputStyle}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>Last Name</label>
                  <input name="last_name" placeholder="Last name" style={inputStyle}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>Event Date</label>
                  <input name="wedding_date" type="date" value={form.wedding_date}
                    onChange={handleChange} style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>Event City</label>
                  <input name="event_city" value={form.event_city} onChange={handleChange}
                    placeholder="e.g. Chittagong" style={inputStyle}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>Event Country</label>
                  <input name="event_country" value={form.event_country}
                    onChange={handleChange} placeholder="Bangladesh" style={inputStyle}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>Contact Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    required placeholder="+880 1XXX-XXXXXX" style={inputStyle}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div className="mb-4">
                <label style={labelStyle}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  required placeholder="your@email.com" style={inputStyle}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>

              <div className="mb-5">
                <label style={labelStyle}>Any Query *</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  required rows={5}
                  placeholder="Tell us about your wedding..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>

              <button type="submit" disabled={status === 'loading'} 
                className="btn py-3 px-5 text-uppercase fw-bold shadow-sm"
                style={{
                  background: '#c9a96e',
                  border: 'none',
                  color: '#0d0d0d',
                  fontSize: '0.68rem',
                  letterSpacing: '3px',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'all 0.3s',
                  borderRadius: 0,
                }}
                onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = '#e8d5b0' }}
                onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Now'}
              </button>

              {status === 'success' && (
                <p className="mt-4" style={{ color: '#c9a96e', fontSize: '0.78rem' }}>
                  ✦ Thank you! We'll be in touch soon.
                </p>
              )}
            </form>
          </div>

          {/* Right — Info */}
          <div className="col-12 col-lg-5 ps-lg-5 border-start-lg" style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
            {[
              { icon: '📍', label: 'Address', value: 'Chattogram & Dhaka, Bangladesh' },
              { icon: '📞', label: 'Phone', value: '+880 1XXX-XXXXXX' },
              { icon: '✉️', label: 'Email', value: 'hello@jolchobi.com' },
            ].map((item) => (
              <div key={item.label} className="d-flex gap-4 mb-4 pb-4 border-bottom border-secondary border-opacity-10">
                <div style={{ fontSize: '1.1rem' }}>{item.icon}</div>
                <div>
                  <p className="mb-1" style={labelStyle}>{item.label}</p>
                  <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>{item.value}</p>
                </div>
              </div>
            ))}

            <div className="mt-5">
              <p className="mb-3" style={labelStyle}>Stay Connected</p>
              <div className="d-flex gap-4">
                {['Facebook', 'Instagram', 'Youtube'].map((s) => (
                  <a key={s} href="#" className="text-decoration-none" style={{
                    fontSize: '0.65rem',
                    letterSpacing: '2px',
                    color: '#888',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#888'}>
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact