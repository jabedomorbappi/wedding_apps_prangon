// frontend/src/components/Navbar.jsx
import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Stills', href: '#gallery' },
    { label: 'Motions', href: '#videos' },
    { label: 'Packages', href: '#packages' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'py-2' : 'py-3'}`}
      style={{
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : 'none'
      }}
    >
      <div className="container-fluid px-lg-5">
        {/* Logo */}
        <a className="navbar-brand d-flex flex-column align-items-center" href="#home" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#c9a96e', letterSpacing: '5px', lineHeight: 1 }}>
            JOLCHOBI
          </span>
          <span style={{ fontSize: '0.45rem', letterSpacing: '5px', color: 'rgba(201,169,110,0.55)' }}>
            PHOTOGRAPHY
          </span>
        </a>

        {/* Hamburger Button */}
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(73%) sepia(35%) saturate(541%) hue-rotate(351deg) brightness(92%) contrast(85%)' }}></span>
        </button>

        {/* Links Container */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center mt-3 mt-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item mx-lg-2" key={link.label}>
                <a 
                  className="nav-link text-uppercase" 
                  href={link.href}
                  style={{ 
                    color: '#f5f0eb', 
                    fontSize: '0.7rem', 
                    letterSpacing: '2px',
                    transition: '0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#c9a96e'}
                  onMouseLeave={(e) => e.target.style.color = '#f5f0eb'}
                >
                  {link.label}
                </a>
              </li>
            ))}
            
            {/* Social Icons for Mobile/Desktop */}
            <div className="d-flex justify-content-center gap-3 ms-lg-4 mt-3 mt-lg-0 border-start-lg ps-lg-4 border-secondary">
               <a href="#" className="text-secondary text-decoration-none small">IG</a>
               <a href="#" className="text-secondary text-decoration-none small">FB</a>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar