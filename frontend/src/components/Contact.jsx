import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../api/axios';

function Contact() {
  const location = useLocation();
  
  // Get data passed from Packages.jsx
  const { selectedPackage, eventDate } = location.state || {};

  // FIX: Initialize state directly. This avoids the "setState in useEffect" error.
  const [form, setForm] = useState({
    name: '', 
    email: '', 
    phone: '',
    wedding_date: eventDate || '', 
    message: selectedPackage ? `Inquiry regarding the ${selectedPackage} package.` : '',
    event_city: 'Chittagong',
    event_country: 'Bangladesh',
  });
  
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    API.post('/enquiry/', form)
      .then(() => {
        setStatus('success');
        setForm({ 
          name: '', email: '', phone: '', 
          wedding_date: '', message: '', 
          event_city: 'Chittagong', event_country: 'Bangladesh' 
        });
      })
      .catch(() => setStatus('error'));
  };

  // --- Premium Styles ---
  const inputStyle = {
    width: '100%',
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(201,169,110,0.3)',
    padding: '13px 16px',
    color: '#f5f0eb',
    fontSize: '0.85rem',
    outline: 'none',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'all 0.3s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.6rem',
    letterSpacing: '2.5px',
    color: '#c9a96e',
    textTransform: 'uppercase',
    marginBottom: '8px',
  };

  const focusIn = (e) => { 
    e.target.style.borderBottomColor = '#c9a96e'; 
    e.target.style.background = '#222'; 
  };
  const focusOut = (e) => { 
    e.target.style.borderBottomColor = 'rgba(201,169,110,0.3)'; 
    e.target.style.background = '#1a1a1a'; 
  };

  return (
    <section 
      id="contact" 
      style={{ 
        background: '#0d0d0d', 
        paddingTop: '160px', // Clears the fixed navbar
        paddingBottom: '100px',
        scrollMarginTop: '100px', // Corrects the scroll-to-id position
        overflow: 'visible' 
      }}
    >
      <div className="container">
        
        {/* Header Section */}
        <div className="text-center mb-5 pb-lg-4">
          <p className="text-uppercase mb-2" style={{ fontSize: '0.65rem', letterSpacing: '5px', color: '#c9a96e' }}>
            Reservation
          </p>
          <h2 className="fw-light" style={{ 
            fontFamily: 'Cormorant Garamond, serif', 
            fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', 
            color: '#f5f0eb', 
            lineHeight: '1.2' 
          }}>
            {selectedPackage ? `Booking: ${selectedPackage}` : "Let's Book a Date"}
          </h2>
          <div className="mx-auto mt-4" style={{ width: '50px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
        </div>

        <div className="row g-5 justify-content-center">
          
          {/* Form Column */}
          <div className="col-12 col-lg-7">
            <form onSubmit={handleSubmit} className="pe-lg-5">
              
              <div className="row g-4 mb-4">
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    required placeholder="Enter your name" style={inputStyle}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>Contact Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    required placeholder="+880" style={inputStyle}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>Event Date</label>
                  <input name="wedding_date" type="date" value={form.wedding_date}
                    onChange={handleChange} style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div className="col-12 col-md-6">
                  <label style={labelStyle}>City</label>
                  <input name="event_city" value={form.event_city} onChange={handleChange}
                    placeholder="e.g. Chittagong" style={inputStyle}
                    onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div className="mb-4">
                <label style={labelStyle}>Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  required placeholder="hello@example.com" style={inputStyle}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>

              <div className="mb-5">
                <label style={labelStyle}>Your Vision *</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  required rows={5}
                  placeholder="Tell us about your event details..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>

              <button type="submit" disabled={status === 'loading'} 
                className="btn py-3 px-5 text-uppercase fw-bold"
                style={{
                  background: '#c9a96e',
                  border: 'none',
                  color: '#0d0d0d',
                  fontSize: '0.75rem',
                  letterSpacing: '4px',
                  borderRadius: 0,
                  transition: '0.4s ease',
                  width: '100%',
                  opacity: status === 'loading' ? 0.6 : 1
                }}
              >
                {status === 'loading' ? 'Sending Request...' : 'Send Inquiry'}
              </button>

              {status === 'success' && (
                <div className="mt-4 p-3 text-center" style={{ border: '1px solid #c9a96e', color: '#c9a96e' }}>
                  ✦ Thank you! We have received your inquiry.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info Column */}
          <div className="col-12 col-lg-4 mt-5 mt-lg-0">
            <div className="ps-lg-4" style={{ borderLeft: '1px solid rgba(201,169,110,0.1)' }}>
              <h5 className="mb-4" style={labelStyle}>Location & Contact</h5>
              <p className="text-muted mb-5" style={{ fontSize: '0.85rem', lineHeight: '1.8' }}>
                Based in <span style={{ color: '#f5f0eb' }}>Chittagong</span>, capturing stories across Bangladesh.
              </p>
              
              <div className="mb-4">
                <p style={labelStyle}>General Inquiries</p>
                <p style={{ color: '#f5f0eb' }}>hello@jolchobi.com</p>
              </div>

              <div className="mb-4">
                <p style={labelStyle}>Direct Call</p>
                <p style={{ color: '#f5f0eb' }}>+880 1XXX XXXXXX</p>
              </div>

              <div className="mt-5">
                <p style={labelStyle}>Follow Our Work</p>
                <div className="d-flex gap-3">
                  <a href="#" style={{ color: '#888', fontSize: '0.7rem' }} className="text-decoration-none">INSTAGRAM</a>
                  <a href="#" style={{ color: '#888', fontSize: '0.7rem' }} className="text-decoration-none">FACEBOOK</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;