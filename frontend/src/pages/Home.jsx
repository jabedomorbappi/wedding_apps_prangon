// frontend/src/pages/Home.jsx
import Hero from '../components/Hero'
import About from '../components/About'
import Stats from '../components/Stats'
import Gallery from '../components/Gallery'
import Videos from '../components/Videos'
import Packages from '../components/Packages'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function Home() {
  return (
    <main className="main-wrapper bg-black">
      {/* 1. Hero: Full width, handles its own padding/overlay */}
      <section id="home">
        <Hero />
      </section>

      {/* 2. About: Component already contains a .container */}
      <About />

      {/* 3. Stats: If the component has its own container, don't wrap it here */}
      <section id="stats" className="bg-dark border-top border-bottom border-secondary border-opacity-10">
        <Stats />
      </section>

      {/* 4. Gallery: Fluid layout for visual impact */}
      <Gallery />

      {/* 5. Videos: Dark contrast section */}
      <section id="videos" className="bg-black py-5">
        <Videos />
      </section>

      {/* 6. Packages: Handled its own 3-column responsive grid internally */}
      <Packages />

      {/* 7. Testimonials: Often looks more premium on a dark/neutral background */}
      <section id="testimonials" className="py-5" style={{ background: '#161616' }}>
        <Testimonials />
      </section>

      {/* 8. Contact: Centered and narrow for focus */}
      <section id="contact" className="py-5 bg-black">
        <div className="container">
          <div className="row justify-content-center">
            {/* Using col-11 for mobile, col-lg-8 for desktop */}
            <div className="col-11 col-md-10 col-lg-8">
              <Contact />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home