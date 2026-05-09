// frontend/src/components/About.jsx
import about1 from '../assets/about1.jpg' 

function About() {
  return (
    <section id="about" className="py-5" style={{ background: '#111', overflowX: 'hidden' }}>
      <div className="container py-lg-5">
        <div className="row align-items-center gx-lg-5 gy-5">
          
          {/* Left — Image Column */}
          <div className="col-12 col-lg-6">
            <div className="position-relative">
              {/* Primary Image */}
              <img
                src={about1}
                alt="Jolchobi Photography"
                className="img-fluid w-100 shadow"
                style={{
                  height: 'clamp(350px, 60vh, 580px)',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              
              {/* Gold accent box - Responsive visibility & sizing */}
              <div className="d-none d-xl-block" style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '150px',
                height: '150px',
                border: '1px solid rgba(201,169,110,0.3)',
                zIndex: -1,
              }} />

              {/* Stats overlay - Adjusted for mobile safety */}
              <div className="position-absolute shadow-lg" style={{
                bottom: '20px',
                left: '0', // Starts at edge on mobile
                marginLeft: 'calc(-1 * var(--bs-gutter-x, 0.75rem))', // Aligns with container edge
                background: '#0d0d0d',
                border: '1px solid rgba(201,169,110,0.25)',
                padding: '1.2rem 1.8rem',
                // Moves slightly left on larger screens
                transform: 'translateX(min(20px, 0px))' 
              }}>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  color: '#c9a96e',
                  lineHeight: 1,
                }}>1000+</div>
                <div style={{
                  fontSize: '0.55rem',
                  letterSpacing: '3px',
                  color: '#888',
                  textTransform: 'uppercase',
                  marginTop: '6px',
                  whiteSpace: 'nowrap'
                }}>Weddings Covered</div>
              </div>
            </div>
          </div>

          {/* Right — Text Column */}
          <div className="col-12 col-lg-6 ps-lg-5">
            <header className="mb-4">
              <p className="text-uppercase mb-2" style={{
                fontSize: '0.62rem',
                letterSpacing: '5px',
                color: '#c9a96e',
              }}>
                Our Story
              </p>

              <h2 className="text-white fw-light" style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                letterSpacing: '1px',
                lineHeight: 1.1,
              }}>
                The Story of <br />
                <span className="fst-italic" style={{ color: '#c9a96e' }}>Jolchobi</span>
              </h2>
              
              <div className="mt-3" style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
            </header>

            <div className="mb-5 text-secondary" style={{ fontSize: '0.95rem', lineHeight: 1.9 }}>
              <p>
                Jolchobi is a team of passionate photographers and cinematographers
                who love capturing real, raw and intense emotions. 
                We believe every wedding tells a unique story — and our mission 
                is to preserve that story with artistry and soul.
              </p>
              <p className="mb-0">
                Based in <strong>Dhaka</strong> and <strong>Chittagong</strong>, we have documented hundreds 
                of celebrations across Bangladesh, prioritizing quality and artistic value above all else.
              </p>
            </div>

            {/* Mini stats row - Better mobile wrapping */}
            <div className="row g-4 mb-5">
              {[
                { value: '500+', label: 'Weddings' },
                { value: '8+', label: 'Years' },
                { value: '2', label: 'Cities' },
              ].map((s) => (
                <div className="col-4" key={s.label}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#c9a96e',
                    lineHeight: 1,
                  }}>
                    {s.value}
                  </div>
                  <div className="text-uppercase text-muted" style={{
                    fontSize: '0.55rem',
                    letterSpacing: '2px',
                    marginTop: '4px',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn-outline-gold px-5 py-3 text-uppercase rounded-0 transition-all shadow-sm"
               style={{
                 borderColor: 'rgba(201,169,110,0.5)',
                 color: '#c9a96e',
                 fontSize: '0.65rem',
                 letterSpacing: '3px',
               }}
            >
              Book a Date
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About