import { useEffect } from 'react'; // ✅ Correct

function DetailsModal({ program, onClose }) {
  // Prevent scrolling on the main page when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!program) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content bg-dark text-white p-4 rounded-4 shadow-lg border border-secondary"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="m-0 text-primary">{program.title}</h2>
            <small className="text-secondary">{program.date} | {program.category_name}</small>
          </div>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="lead text-light" style={{ whiteSpace: 'pre-line' }}>
            {program.description}
          </p>
        </div>

        {/* Image Grid - The 10 Photos */}
        <div className="row g-3">
          {program.images && program.images.length > 0 ? (
            program.images.map((img) => (
              <div className="col-6 col-md-4 col-lg-3" key={img.id}>
                <div className="gallery-item-wrapper overflow-hidden rounded-3 border border-secondary">
                  <a href={img.image_url} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={img.image_url} 
                      alt={img.caption || program.title} 
                      className="img-fluid gallery-img transition-scale"
                      style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                    />
                  </a>
                  {img.caption && (
                    <div className="p-2 bg-black-50 small text-truncate">
                      {img.caption}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-secondary italic">No additional images available for this program.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-top border-secondary d-flex justify-content-end">
          <button className="btn btn-secondary px-4" onClick={onClose}>Close</button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
          padding: 20px;
        }
        .modal-content {
          max-width: 1000px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .gallery-img {
          cursor: zoom-in;
          transition: transform 0.3s ease;
        }
        .gallery-img:hover {
          transform: scale(1.05);
        }
        /* Custom scrollbar for a premium look */
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: #111;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

export default DetailsModal;