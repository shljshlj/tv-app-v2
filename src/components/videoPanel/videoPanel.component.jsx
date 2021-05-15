import VideoCard from '../videoCard/videoCard.component';

import './videoPanel.styles.scss';

function VideoPanel({ videos }) {

  return (
    <section className="panel video__panel">
      <div className="panel__heading video__heading">
        <h3>Videos</h3>
      </div>
      <div className="video_wrapper">
        {
          videos ?
            videos.map((video) => <VideoCard key={video.videoId} video={video} />) :
            <div>No video available.</div>
        }
      </div>
    </section>
  );
}

export default VideoPanel;