import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  const imgUrl = video.getImgUrl();
  const { title, videoId } = video;

  return (
    <div className="video__card" style={{ backgroundImage: `url(${imgUrl})` }}>
      <Link className="video__play" data-site="YouTube" data-video-id={videoId} data-title={title} to="#">
        <div className="play-background">
          <span className="play-background__icon"></span>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;