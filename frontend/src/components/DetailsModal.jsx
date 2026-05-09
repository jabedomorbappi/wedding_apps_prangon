import React from 'react';

function DetailsModal({ album, onClose }) {
  // 'album' here is actually the 'EventProgram' object passed from Gallery.jsx
  if (!album) return null;

  return (
    <div 
      className="modal d-block" 
      tabIndex="-1" 
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)', zIndex: 1050 }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="modal-content" style={{ background: '#0a0a0a', border: '1px solid #c9a96e', borderRadius: '0' }}>
          
          {/* Header: Displays Program Title and Main Description */}
          <div className="modal-header border-0 p-4 pb-0">
            <div>
              <h2 className="modal-title" style={{ fontFamily: 'Cormorant Garamond', color: '#c9a96e', fontSize: '2rem' }}>
                {album.title}
              </h2>
              <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{album.description}</p>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Body: Displays the 10+ images for this specific program */}
          <div className="modal-body p-4">
            <div className="row g-4">
              {album.images && album.images.length > 0 ? (
                album.images.map((img) => (
                  <div className="col-12 col-md-6" key={img.id}>
                    <div className="position-relative" style={{ overflow: 'hidden' }}>
                      {/* 
                          img.image comes from ProgramImageSerializer 
                          Handles both manual PC uploads and Facebook URLs 
                      */}
                      <img 
                        src={img.image} 
                        alt={img.caption || album.title} 
                        className="img-fluid w-100 shadow-sm" 
                        style={{ border: '1px solid #222', minHeight: '250px', objectFit: 'cover' }}
                      />
                      
                      {/* Individual Image Details */}
                      {(img.caption || img.details) && (
                        <div className="mt-3 p-3" style={{ borderLeft: '3px solid #c9a96e', background: 'rgba(201,169,110,0.05)' }}>
                          {img.caption && (
                            <h6 style={{ color: '#c9a96e', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                              {img.caption}
                            </h6>
                          )}
                          {img.details && (
                            <p style={{ color: '#f5f0eb', fontSize: '0.9rem', marginBottom: 0, lineHeight: '1.6' }}>
                              {img.details}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted italic">No program images have been uploaded for this event yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-0 p-4 pt-0">
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm px-5" 
              style={{ borderRadius: '0', letterSpacing: '2px', color: '#888', borderColor: '#444' }}
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;