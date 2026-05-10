import { useState, useEffect } from 'react';
import './Navbar.css'; 
import logoImage from '../assets/logo.png'; 
import { HashLink } from 'react-router-hash-link';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update hrefs to include the leading slash '/'
  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Stills', href: '/#gallery' },
    { label: 'Motions', href: '/#videos' },
    { label: 'Packages', href: '/#packages' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`navbar navbar-expand-lg fixed-top custom-dream-nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container-fluid h-100 d-flex align-items-center">
        {/* Logo - Use HashLink here too */}
        <HashLink className="navbar-brand" to="/#home">
          <img src={logoImage} alt="JOLCHOBI" className="dream-logo" />
        </HashLink>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center align-items-center">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.label}>
                {/* Use 'HashLink' instead of 'a' 
                  Use 'to' instead of 'href'
                  Added 'smooth' for that luxury feel
                */}
                <HashLink 
                  smooth 
                  className="nav-link dream-link" 
                  to={link.href}
                >
                  {link.label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;