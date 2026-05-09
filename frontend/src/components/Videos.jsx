// frontend/src/components/Videos.jsx
import { useEffect, useState } from 'react'
import API from '../api/axios'

function Videos() {
  const [videos, setVideos] = useState([])
  const [playing, setPlaying] = useState(null)

  useEffect(() => {
    API.get('/videos/').then(res => setVideos(res.data))
  }, [])

  return (
    <section id="videos" style={{ padding: '100px 60px', background: '#0d0d0d' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <p className="section-subtitle">Films</p>
        <h2 className="section-title">Wedding Films</h2>
        <div className="gold-line" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '30px',
        }}>
          {videos.map(video => (
            <div key={video.id} style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}>

              {playing === video.id ? (
                /* YouTube iframe player */
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                    src={`${video.embed_url}?autoplay=1`}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '100%', height: '100%',
                      border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write;
                           encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                /* Thumbnail with play button */
                <div
                  onClick={() => setPlaying(video.id)}
                  style={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s',
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                  {/* Dark overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {/* Play button */}
                    <div style={{
                      width: '64px', height: '64px',
                      borderRadius: '50%',
                      border: '2px solid #c9a96e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}>
                      <div style={{
                        width: 0, height: 0,
                        borderTop: '12px solid transparent',
                        borderBottom: '12px solid transparent',
                        borderLeft: '20px solid #c9a96e',
                        marginLeft: '5px',
                      }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Video info */}
              <div style={{ padding: '20px 24px' }}>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.3rem',
                  fontWeight: 300,
                  marginBottom: '8px',
                }}>
                  {video.title}
                </h3>
                {video.description && (
                  <p style={{
                    fontSize: '0.78rem',
                    color: '#9a9a9a',
                    lineHeight: 1.6,
                  }}>
                    {video.description}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Videos