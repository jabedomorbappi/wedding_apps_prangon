// frontend/src/components/Footer.jsx

function Footer() {
  return (
    <footer className="border-top" style={{
      background: '#080808',
      borderColor: 'rgba(201,169,110,0.12) !important',
      padding: '60px 0', // Padding top/bottom, container handles sides
    }}>
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">

          {/* Logo - Centered on mobile, Left on desktop */}
          <div className="text-center text-md-start">
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.5rem',
              color: '#c9a96e',
              letterSpacing: '4px',
              lineHeight: 1
            }}>
              JOLCHOBI
            </div>
            <div style={{ 
              fontSize: '0.55rem', 
              letterSpacing: '4px', 
              color: 'rgba(201,169,110,0.4)', 
              textTransform: 'uppercase', 
              marginTop: '6px' 
            }}>
              Wedding Photography
            </div>
          </div>

          {/* Copyright - Always centered relative to its space */}
          <div className="order-3 order-md-2">
            <p className="mb-0" style={{ 
              fontSize: '0.65rem', 
              color: '#444', 
              letterSpacing: '1px', 
              textAlign: 'center' 
            }}>
              © {new Date().getFullYear()} Jolchobi — All Rights Reserved
            </p>
          </div>

          {/* Social links - Centered on mobile, Right on desktop */}
          <div className="d-flex gap-4 order-2 order-md-3">
            {[
              { label: 'Facebook', href: '#' },
              { label: 'Youtube', href: '#' },
              { label: 'Instagram', href: '#' },
            ].map((s) => (
              <a 
                key={s.label} 
                href={s.href} 
                className="text-decoration-none transition-all"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '2px',
                  color: '#555',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={e => e.target.style.color = '#c9a96e'}
                onMouseLeave={e => e.target.style.color = '#555'}
              >
                {s.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer