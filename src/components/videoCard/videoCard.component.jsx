import { Link } from 'react-router-dom';

function VideoCard({ video, playVideoInModal }) {
  const imgUrl = video.getImgUrl();
  const { title, videoId } = video;

  return (
    <div onClick={() => playVideoInModal(videoId, title)} className="video__card" style={{ backgroundImage: `url(${imgUrl})` }}>
      <Link className="video__play" to={`#play=${videoId}`}>
        <div className="play-background">
          <span className="play-background__icon"></span>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;