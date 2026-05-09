// frontend/src/components/Stats.jsx
import { useEffect, useState } from 'react'
import API from '../api/axios'

function Stats() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    API.get('/stats/').then(res => setStats(res.data))
  }, [])

  return (
    <section style={{
      background: '#1a1a1a',
      borderTop: '1px solid rgba(201,169,110,0.15)',
      borderBottom: '1px solid rgba(201,169,110,0.15)',
      padding: '70px 60px',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
        textAlign: 'center',
      }}>
        {stats.map(stat => (
          <div key={stat.id}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '3.5rem',
              color: '#c9a96e',
              fontWeight: 300,
              lineHeight: 1,
              marginBottom: '8px',
            }}>
              {stat.value}+
            </div>
            <div style={{
              fontSize: '0.7rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#9a9a9a',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats