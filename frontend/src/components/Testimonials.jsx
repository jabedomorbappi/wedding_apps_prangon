// frontend/src/components/Testimonials.jsx
import { useEffect, useState } from 'react'
import API from '../api/axios'

function Testimonials() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    API.get('/testimonials/').then(res => setTestimonials(res.data))
  }, [])

  return (
    <section id="testimonials" style={{ padding: '100px 60px', background: '#111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <p className="section-subtitle">Kind Words</p>
        <h2 className="section-title">Couples Say</h2>
        <div className="gold-line" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}>
          {testimonials.map(t => (
            <div key={t.id} style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '40px 36px',
              position: 'relative',
            }}>

              {/* Quote mark */}
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '5rem',
                color: 'rgba(201,169,110,0.2)',
                lineHeight: 1,
                position: 'absolute',
                top: '20px', left: '28px',
              }}>
                "
              </div>

              {/* Stars */}
              <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                {'★'.repeat(t.rating).split('').map((s, i) => (
                  <span key={i} style={{ color: '#c9a96e', fontSize: '0.9rem' }}>{s}</span>
                ))}
              </div>

              <p style={{
                fontSize: '0.85rem',
                color: '#c8c0b8',
                lineHeight: 1.9,
                fontStyle: 'italic',
                marginBottom: '28px',
              }}>
                {t.message}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '20px',
              }}>
                {t.photo && (
                  <img
                    src={`http://127.0.0.1:8000${t.photo}`}
                    alt={t.couple_name}
                    style={{
                      width: '44px', height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(201,169,110,0.4)',
                    }}
                  />
                )}
                <div>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.1rem',
                    color: '#f5f0eb',
                  }}>
                    {t.couple_name}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#9a9a9a',
                    letterSpacing: '1px',
                  }}>
                    {new Date(t.wedding_date).toLocaleDateString('en-US', {
                      month: 'long', year: 'numeric'
                    })}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials