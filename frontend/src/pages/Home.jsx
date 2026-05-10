import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/Hero';
import About from '../components/About';
import Stats from '../components/Stats';
import Gallery from '../components/Gallery';
import Videos from '../components/Videos'; 
import Packages from '../components/Packages';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const mainRef = useRef(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    document.title = "Jolchobi | Capturing Your Forever";

    // 1. DATA FETCHING LOGIC
   const fetchVideos = async () => {
  try {
    // Switch from 'api/videos/' back to 'api/wedding-films/'
    const response = await fetch('http://127.0.0.1:8000/api/wedding-films/');
    const data = await response.json();
    setFilms(data);
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200); 
  } catch (error) {
    console.error("Error fetching films:", error);
  }
};

    fetchVideos();

    // 2. GSAP ANIMATIONS LOGIC
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".hero-entrance", {
        duration: 2.5,
        opacity: 0,
        scale: 1.1,
        filter: "blur(15px)",
        ease: "power4.out"
      });

      // Section Reveals
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 100, scale: 0.98 }, 
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert(); // Cleanup
  }, []); // Run once on mount

  return (
    <main ref={mainRef} className="main-wrapper bg-black" style={{ visibility: 'visible' }}>
      
      <section id="home" className="hero-entrance">
        <Hero />
      </section>

      <div className="reveal-section">
        <About />
      </div>

      <div className="reveal-section">
        <Stats />
      </div>

      <div className="reveal-section" id="stills">
        <Gallery />
      </div>

      <div className="reveal-section" id="motions">
        <Videos films={films} />
      </div>

      <div className="reveal-section">
        <Packages />
      </div>

      <div className="reveal-section">
        <Testimonials />
      </div>

      <div className="reveal-section">
        <Contact />
      </div>
      
    </main>
  );
}

export default Home;