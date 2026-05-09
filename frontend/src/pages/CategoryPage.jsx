// frontend/src/pages/CategoryPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CategoryPage() {
  const { categorySlug } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/categories/${categorySlug}/`)
      .then(res => setCategory(res.data))
      .catch(err => console.error(err));
  }, [categorySlug]);

  if (!category) return <div className="text-center py-5 text-white">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 style={{ color: '#c9a96e' }}>{category.name} Collection</h2>
      <div className="row g-4 mt-4">
        {category.programs.map(prog => (
          <div className="col-md-4" key={prog.id}>
             <div className="card bg-dark text-white border-secondary">
               <img src={prog.thumbnail} className="card-img-top" alt={prog.title} />
               <div className="card-body">
                 <h5>{prog.title}</h5>
                 <button className="btn btn-link p-0" style={{color:'#c9a96e'}} onClick={() => navigate('/')}>View in Gallery</button>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryPage;