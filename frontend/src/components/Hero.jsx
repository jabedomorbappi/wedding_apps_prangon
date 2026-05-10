import { useState, useEffect } from 'react';

function Hero() {
  const [images, setImages] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Jolchobi | Capturing Your Forever";
    
    const fetchHeroData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/hero-slider/');
        const data = await response.json();
        
        // Ensure we extract just the 'image' string from each object
        const urls = data.map(item => item.image);
        console.log("Fetched image URLs:", urls); // Check your console!
        
        setImages(urls);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch hero images:", error);
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Timer logic for sliding
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === images.length - 1 && direction === 1) {
          setDirection(-1);
          return prev - 1;
        }
        if (prev === 0 && direction === -1) {
          setDirection(1);
          return prev + 1;
        }
        return prev + direction;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [direction, images.length]);

  // Prevent rendering if images aren't ready
  if (loading || images.length === 0) {
    return <section id="home" style={{ height: '100vh', background: '#000' }} />;
  }

  return (
    <section id="home" style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: '#000',
    }}>

      {/* The Sliding Track */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '2%',
        width: `${images.length * 96}%`, 
        height: '95%',
        marginTop: '150px',
        display: 'flex',
        // Dynamic transform based on the loaded images array
        transform: `translateX(-${(currentIndex * 100) / images.length}%)`,
        transition: 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        zIndex: 1,
      }}>
        {images.map((img, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              style={{
                width: '100%',
                height: '100%',
                padding: '0 10px',      
                position: 'relative',
                overflow: 'hidden',     
                borderRadius: '25px',   
              }}
            >
              <div
                className={isActive ? 'active-zoom' : ''}
                style={{
                  width: '100%',
                  height: '100%',
                  // CRITICAL: We wrap the URL in quotes to handle special characters
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${img}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '25px',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 5s linear',
                  willChange: 'transform'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Hero Content Overlay */}
      <div style={{ position: 'relative', zIndex: 3, paddingTop: '220px' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          fontFamily: 'Cormorant Garamond, serif',
          color: '#f5f0eb',
          marginBottom: '24px',
        }}>
          Capturing Your<br />
          <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Forever</span>
        </h1>
        
        <a href="#packages" className="btn" style={{
          padding: '14px 30px',
          background: '#c9a96e',
          color: '#0d0d0d',
          textDecoration: 'none',
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>
          View Packages
        </a>
      </div>

      {/* Dynamic Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        display: 'flex',
        gap: '12px',
        zIndex: 4
      }}>
        {images.map((_, i) => (
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