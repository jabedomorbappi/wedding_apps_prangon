import ReactPlayer from 'react-player';

// Destructure the url from props
const VideoPlayer = ({ videoUrl }) => {
  return (
    /* We use a wrapper to maintain a 16:9 aspect ratio */
    <div className="video-player-container" style={{ position: 'relative', paddingTop: '56.25%' }}>
      <ReactPlayer 
        url={videoUrl} 
        controls={true}
        width='100%'
        height='100%'
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          facebook: {
            appId: '123456789012345' // Optional: standard FB dev ID
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;