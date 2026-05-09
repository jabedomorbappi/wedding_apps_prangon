import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailsModal from './DetailsModal';

// frontend/src/components/Gallery.jsx

function Gallery() {
  const navigate = useNavigate();
  // Change state name from 'categories' to 'programs' for clarity
  const [programs, setPrograms] = useState([]); 
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Change: Fetching 'event-programs' (the 30 carts) instead of 'categories'
        const response = await axios.get('http://127.0.0.1:8000/api/event-programs/');
        setPrograms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // ... (inside the return)
  {programs.map((prog) => (
    <div className="col-12 col-md-6 col-lg-3" key={prog.id}>
      <div className="gallery-card">
        {/* Use the 'thumbnail' field from the new model */}
        <img src={prog.thumbnail} alt={prog.title} className="w-100" />
        
        <div className="p-4 text-center">
          <h4 className="text-white">{prog.title}</h4>
          
          <div className="d-flex justify-content-center gap-3 mt-3">
            {/* Opens modal with all 10 images */}
            <button onClick={() => setSelectedProgram(prog)}>DETAILS</button> 
            
            {/* Takes user to the Reception or Wedding page */}
            <button onClick={() => navigate(`/category/${prog.category_slug}`)}>
              MORE LIKE THIS
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}}

export default Gallery;