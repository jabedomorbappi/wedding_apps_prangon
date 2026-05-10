import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Packages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [bookedTypes, setBookedTypes] = useState([]); 
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Load initial data
  useEffect(() => {
    API.get('/packages/')
      .then(res => {
        setPackages(res.data);
        if (res.data.length > 0) setActiveTab(res.data[0].package_type);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 2. Check availability when date changes (Switched to POST)
  useEffect(() => {
    if (selectedDate) {
      API.post('/check-availability/', { date: selectedDate })
        .then(res => {
          // res.data.booked_types is what we defined in Django
          setBookedTypes(res.data.booked_types || []);
        })
        .catch(() => setBookedTypes([]));
    }
  }, [selectedDate]);

  const categories = [...new Set(packages.map(p => p.package_type))];
  const filteredPackages = packages.filter(p => p.package_type === activeTab);

  const handleProceed = (pkg) => {
    navigate('/contact', { 
      state: { 
        selectedPackageId: pkg.id, 
        selectedPackageName: pkg.name,
        eventDate: selectedDate 
      } 
    });
  };

  if (loading) return <div style={{ color: '#c9a96e', textAlign: 'center', padding: '100px' }}>Loading...</div>;

  return (
    <section style={{ background: '#000', padding: '100px 0', color: '#fff', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem' }}>
            Exclusive <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Packages</span>
          </h2>
          
          <div style={{ marginTop: '30px' }}>
            <p style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '10px' }}>SELECT EVENT DATE</p>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ background: 'transparent', border: '1px solid #c9a96e', color: '#fff', padding: '12px 20px', outline: 'none' }}
            />
          </div>
        </div>

        {/* Dynamic Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '60px', borderBottom: '1px solid #1a1a1a' }}>
          {categories.map(cat => {
            const isFullyBooked = bookedTypes.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === cat ? '#c9a96e' : '#555',
                  borderBottom: activeTab === cat ? '2px solid #c9a96e' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '15px 5px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '0.9rem',
                  position: 'relative'
                }}
              >
                {cat} 
                {isFullyBooked && <span style={{ color: '#ff4d4d', fontSize: '9px', marginLeft: '5px' }}>(FULL)</span>}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          {filteredPackages.map((pkg) => {
            const isBooked = bookedTypes.includes(pkg.package_type);

            return (
              <div key={pkg.id} style={{ 
                background: '#0a0a0a', 
                border: '1px solid #1a1a1a', 
                padding: '50px', 
                textAlign: 'center',
                opacity: isBooked ? 0.5 : 1,
                transition: '0.3s'
              }}>
                <h3 style={{ color: '#c9a96e', fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '20px' }}>{pkg.name}</h3>
                <p style={{ fontSize: '3rem', fontFamily: 'Cormorant Garamond, serif' }}>{Math.floor(pkg.price).toLocaleString()}/-</p>
                
                <ul style={{ listStyle: 'none', padding: '40px 0', textAlign: 'left' }}>
                  {pkg.features.map((feat, i) => (
                    <li key={i} style={{ color: '#888', marginBottom: '10px', fontSize: '0.9rem' }}>
                      <span style={{ color: '#c9a96e', marginRight: '10px' }}>—</span> {feat}
                    </li>
                  ))}
                </ul>
                
                {isBooked ? (
                  <div style={{ padding: '15px', border: '1px solid #ff4d4d', color: '#ff4d4d', fontSize: '0.8rem' }}>
                    FULLY BOOKED FOR THIS DATE
                  </div>
                ) : (
                  <button 
                    onClick={() => handleProceed(pkg)}
                    style={{ 
                      background: '#c9a96e', 
                      color: '#000', 
                      width: '100%', 
                      padding: '15px', 
                      border: 'none', 
                      fontWeight: 'bold', 
                      cursor: 'pointer',
                      letterSpacing: '1px'
                    }}
                  >
                    PROCEED TO BOOKING
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Packages;