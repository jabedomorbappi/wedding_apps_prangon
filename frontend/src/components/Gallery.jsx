import { useState, useEffect } from 'react'; // ✅ Correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailsModal from './DetailsModal';

function Gallery() {
  const navigate = useNavigate();
  
  // State Management
  const [programs, setPrograms] = useState([]); 
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data from Django API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Ensure this URL matches your local Django server address
        const response = await axios.get('http://127.0.0.1:8000/api/event-programs/');
        setPrograms(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Failed to load gallery. Please check your connection.");
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <section className="gallery-section py-5 bg-black">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-white border-start border-primary border-4 ps-3">RECENT WORKS</h2>
          </div>
        </div>

        <div className="row g-4">
          {programs.length > 0 ? (
            programs.map((prog) => (
              <div className="col-12 col-md-6 col-lg-4" key={prog.id}>
                <div className="gallery-card bg-dark rounded-4 overflow-hidden border border-secondary h-100 shadow-lg">
                  
                  {/* Thumbnail Image */}
                  <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                    <img 
                      src={prog.thumbnail} 
                      alt={prog.title} 
                      className="w-100 h-100 object-fit-cover transition-scale"
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary text-uppercase">{prog.category_name}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 text-center">
                    <h5 className="text-white mb-2">{prog.title}</h5>
                    <p className="text-secondary small mb-3">
                      {prog.date} • {prog.images.length} Photos
                    </p>
                    
                    <div className="d-flex justify-content-center gap-2">
                      {/* Button to open the Modal containing the 10 images */}
                      <button 
                        className="btn btn-outline-light w-50"
                        onClick={() => setSelectedProgram(prog)}
                      >
                        DETAILS
                      </button> 
                      
                      {/* Navigation to the Category view */}
                      <button 
                        className="btn btn-primary w-50"
                        onClick={() => navigate(`/category/${prog.category_slug}`)}
                      >
                        MORE LIKE THIS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-secondary">No programs found in the gallery yet.</h4>
              <p className="text-muted">Check back soon for new updates from Chittagong!</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal - Renders only when a program is clicked */}
      {selectedProgram && (
        <DetailsModal 
          program={selectedProgram} 
          onClose={() => setSelectedProgram(null)} 
        />
      )}
    </section>
  );
}

export default Gallery;