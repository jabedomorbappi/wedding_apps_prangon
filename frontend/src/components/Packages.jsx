// frontend/src/components/Packages.jsx
import { useEffect, useState } from 'react'
import API from '../api/axios'

const CITIES = ['Chittagong', 'Dhaka']

function Packages() {
  const [packages, setPackages] = useState([])
  const [city, setCity] = useState('Chittagong')

  useEffect(() => {
    API.get('/packages/').then(res => setPackages(res.data))
  }, [])

  // Filter packages based on selected city (assuming API returns city data)
  const filteredPackages = packages.filter(pkg => pkg.city === city)

  return (
    <section id="packages" className="py-5" style={{ background: '#111' }}>
      <div className="container py-lg-5">

        {/* Header */}
        <div className="text-center mb-5">
          <p className="text-uppercase mb-2" style={{ fontSize: '0.62rem', letterSpacing: '5px', color: '#c9a96e' }}>
            Invest in Memories
          </p>
          <h2 className="text-white fw-light mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '3px' }}>
            Choose Your Package
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '20px auto 40px' }} />

          {/* City tabs - Responsive Flexbox */}
          <div className="d-flex justify-content-center flex-nowrap overflow-auto mb-4" style={{ borderBottom: '1px solid rgba(201,169,110,0.2)' }}>
            {CITIES.map((c) => {
              const isActive = c === city
              return (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className="btn border-0 rounded-0 py-3 px-4 px-md-5 transition-all"
                  style={{
                    background: isActive ? '#c9a96e' : 'transparent',
                    color: isActive ? '#0d0d0d' : '#c9a96e',
                    fontSize: '0.68rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        {/* Package cards - Responsive Grid */}
        <div className="row g-4 justify-content-center">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="col-12 col-md-6 col-lg-4">
              <div
                className="h-100 p-4 p-md-5 position-relative transition-all package-card"
                style={{
                  background: pkg.is_popular ? '#1a1208' : '#1a1a1a',
                  border: pkg.is_popular
                    ? '1px solid rgba(201,169,110,0.55)'
                    : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {pkg.is_popular && (
                  <div className="position-absolute top-0 start-50 translate-middle" style={{
                    background: '#c9a96e',
                    color: '#0d0d0d',
                    fontSize: '0.55rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    padding: '5px 18px',
                    fontWeight: 600,
                    zIndex: 2
                  }}>
                    Most Popular
                  </div>
                )}

                {/* Content */}
                <div className="mb-2" style={{ fontSize: '0.55rem', letterSpacing: '3px', color: '#c9a96e', textTransform: 'uppercase' }}>
                  {city} · {pkg.package_type}
                </div>

                <h3 className="text-white fw-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem' }}>
                  {pkg.name}
                </h3>

                <div className="mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem', color: '#c9a96e', fontWeight: 300 }}>
                  ৳{pkg.price}
                </div>

                <p className="text-muted small lh-lg mb-4" style={{ fontSize: '0.78rem' }}>
                  {pkg.description}
                </p>

                <hr style={{ borderColor: 'rgba(201,169,110,0.15)' }} className="my-4" />

                <ul className="list-unstyled mb-5">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="d-flex gap-2 align-items-start py-2 text-white-50" style={{ fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: '#c9a96e', fontSize: '0.6rem', marginTop: '4px' }}>✦</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className={`btn w-100 rounded-0 py-3 text-uppercase transition-all ${pkg.is_popular ? 'btn-gold' : 'btn-outline-gold'}`}
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '3px',
                    border: '1px solid rgba(201,169,110,0.45)',
                    background: pkg.is_popular ? '#c9a96e' : 'transparent',
                    color: pkg.is_popular ? '#0d0d0d' : '#c9a96e'
                  }}>
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Packages