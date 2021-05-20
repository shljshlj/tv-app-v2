import { useEffect, useState } from 'react';
import { showService } from '../../services/showService';
import VideoCard from '../videoCard/videoCard.component';

import './videoPanel.styles.scss';

function VideoPanel({ showId }) {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      const videos = await showService.fetchVideos(showId);

      setVideos(videos);
      setLoading(false);
    };

    getVideos();
  }, [showId]);

  if (loading) {
    return (
      <section className="panel video__panel">Loading...</section>
    );
  }

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