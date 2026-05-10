import { useMemo, useState } from 'react';

/**
 * Videos Component for Jolchobi
 * Displays one video at a time with Left/Right navigation arrows.
 */
const Videos = ({ films }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Memoize the list to keep it stable
  const videoList = useMemo(() => films || [], [films]);

  // Navigation Logic
  const nextVideo = () => {
    setCurrentIndex((prev) => (prev === videoList.length - 1 ? 0 : prev + 1));
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
  };

  if (videoList.length === 0) {
    return (
      <div className="text-center py-5 bg-black">
        <div className="spinner-border text-danger mb-3"></div>
        <p className="text-secondary">Fetching cinematic stories...</p>
      </div>
    );
  }

  const currentFilm = videoList[currentIndex];

  return (
    <section id="motions" className="py-5 bg-black">
      <div className="container">
        
        <div className="text-center mb-5">
          <h2 className="text-white display-5 fw-bold">Wedding Films</h2>
          <div className="mx-auto" style={{ height: '3px', width: '80px', background: 'red' }}></div>
        </div>

        <div className="row justify-content-center align-items-center">
          {/* Left Arrow (<) */}
          <div className="col-1 text-end">
            <button 
              onClick={prevVideo}
              className="btn btn-link text-white p-0"
              style={{ fontSize: '3rem', textDecoration: 'none' }}
            >
              &#8249;
            </button>
          </div>

          {/* Active Video Card */}
          <div className="col-10 col-lg-8">
            <div className="video-card">
              <div 
                className="video-wrapper shadow-lg" 
                style={{ 
                  position: 'relative', 
                  paddingTop: '56.25%', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  backgroundColor: '#000' 
                }}
              >
                <iframe
                  // Using the automated embed_url from your Serializer
                  src={`${currentFilm.embed_url}?rel=0&modestbranding=1`}
                  title={currentFilm.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0
                  }}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-white h4 fw-light tracking-wide">
                  {currentFilm.title}
                </h3>
                <p className="text-secondary small">
                  {currentIndex + 1} / {videoList.length}
                </p>
              </div>
            </div>
          </div>

          {/* Right Arrow (>) */}
          <div className="col-1 text-start">
            <button 
              onClick={nextVideo}
              className="btn btn-link text-white p-0"
              style={{ fontSize: '3rem', textDecoration: 'none' }}
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;