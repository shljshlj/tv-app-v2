import { useState } from 'react';
import { useMount, usePromise, useLockBodyScroll, useToggle } from 'react-use';
import { showService } from '../../services/showService';
import VideoCard from '../videoCard/videoCard.component';
import Modal from '../modal/modal.component';

import './videoPanel.styles.scss';

const VideoModalContent = ({ videoId, videoTitle }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  return (
    <iframe
      className="modal-player"
      src={videoSrc}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title={videoTitle}
    />
  );
}

function VideoPanel({ showId }) {
  const mounted = usePromise();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [playVideoId, setPlayVideoId] = useState(null);
  const [playVideoTitle, setPlayVideoTitle] = useState(null);

  const [locked, toggleLocked] = useToggle(false);
  useLockBodyScroll(locked);

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

  const playVideoInModal = (videoId, videoTitle) => {
    setShowModal(true);
    toggleLocked();
    setPlayVideoId(videoId);
    setPlayVideoTitle(videoTitle);
  };

  const closeModal = () => {
    setShowModal(false);
    toggleLocked();
    setPlayVideoId(null);
    setPlayVideoTitle(null);
  }

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
          videos.length !== 0 ?
            videos.map((video) =>
              <VideoCard
                key={video.videoId}
                video={video}
                playVideoInModal={playVideoInModal}
              />) :
            <div>No videos available.</div>
        }
      </div>
      <Modal
        show={showModal}
        onClose={closeModal}
        title={playVideoTitle}
      >
        <VideoModalContent videoId={playVideoId} videoTitle={playVideoTitle} />
      </Modal>
    </section>
  );
}

export default VideoPanel;