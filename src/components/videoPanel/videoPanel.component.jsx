import { useState } from 'react';
import { useMount, usePromise } from 'react-use';
import { showService } from '../../services/showService';
import VideoCard from '../videoCard/videoCard.component';
import Modal from '../modal/modal.component';

import './videoPanel.styles.scss';

function VideoPanel({ showId }) {
  const mounted = usePromise();
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useMount(() => {
    getVideos();
  })

  const getVideos = async () => {
    setLoading(true);
    const { videos, error } = await mounted(showService.fetchVideos(showId));

    setError(error);
    setVideos(videos);
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="panel video__panel">Loading...</section>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <section className="panel video__panel">
      <div className="panel__heading video__heading">
        <h3>Videos</h3>
      </div>
      <div className="video_wrapper">
        {
          videos ?
            videos.map((video) => <VideoCard key={video.videoId} video={video} setShowModal={setShowModal} />) :
            <div>No video available.</div>
        }
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title='Playing video'
      >
        <p>This is modal body</p>
      </Modal>
    </section>
  );
}

export default VideoPanel;