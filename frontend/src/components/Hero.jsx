// frontend/src/components/Hero.jsx
import { useState, useEffect } from 'react';

const sliderImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=2000'
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        // If we reach the last image, switch to backward direction
        if (prev === sliderImages.length - 1 && direction === 1) {
          setDirection(-1);
          return prev - 1;
        }
        // If we reach the first image, switch to forward direction
        if (prev === 0 && direction === -1) {
          setDirection(1);
          return prev + 1;
        }
        // Otherwise, continue in the current direction
        return prev + direction;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [direction]);

  return (
    <section id="home" style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: '#000',
    }}>

      {/* 1. The Sliding Track */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${sliderImages.length * 100}%`, // Makes the track wide enough for all images
        height: '100%',
        display: 'flex',
        // This moves the entire track based on the currentIndex
        transform: `translateX(-${(currentIndex * 100) / sliderImages.length}%)`,
        transition: 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        zIndex: 1
      }}>
        {sliderImages.map((img, index) => (
          <div
            key={index}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* 2. Decorative Circles (zIndex 2) */}
      <div style={{
        position: 'absolute',
        width: 'min(600px, 90vw)', height: 'min(600px, 90vw)',
        border: '1px solid rgba(201,169,110,0.15)',
        borderRadius: '50%',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* 3. Text Content (zIndex 3) */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <p style={{
          fontSize: '0.75rem',
          letterSpacing: '6px',
          color: '#c9a96e',
          textTransform: 'uppercase',
          marginBottom: '24px',
        }}>
          Wedding Photography
        </p>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '4px',
          color: '#f5f0eb',
          marginBottom: '24px',
        }}>
          Capturing Your<br />
          <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Forever</span>
        </h1>

        <div style={{ width: '60px', height: '1px', background: '#c9a96e', margin: '0 auto 24px' }} />

        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '2px',
          color: '#e0e0e0',
          marginBottom: '48px',
          maxWidth: '400px',
          margin: '0 auto 48px',
          lineHeight: 1.8,
        }}>
          Timeless stories told through light, emotion & artistry
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <a href="#packages" className="btn" style={{
            padding: '14px 30px',
            background: '#c9a96e',
            color: '#0d0d0d',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
            transition: '0.3s'
          }}>
            View Packages
          </a>
          <a href="#gallery" className="btn" style={{
            padding: '14px 30px',
            border: '1px solid rgba(201,169,110,0.5)',
            color: '#c9a96e',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            transition: '0.3s'
          }}>
            Our Work
          </a>
        </div>
      </div>

      {/* 4. Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        display: 'flex',
        gap: '12px',
        zIndex: 4
      }}>
        {sliderImages.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: i === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === currentIndex ? '#c9a96e' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;