import femalePlaceholderSvg from '../../assets/female_placeholder_tmdb.svg';
import malePlaceholderSvg from '../../assets/male_placeholder_tmdb.svg';

import './castCard.styles.scss';

const EpisodeSpan = ({ episodeCount }) => {
  if (episodeCount) {
    return (
      <span className="cast__episode_count">
        {episodeCount}{episodeCount > 1 ? ' Episodes' : ' Episode'}
      </span>
    );
  }
  return null;
};

const ProfileImg = ({ profileImgUrl, name, genderStr }) => {
  if (profileImgUrl) {
    return (
      <img src={profileImgUrl} alt={name} />
    );
  }

  const placeholderStr = genderStr === 'female' ? femalePlaceholderSvg : malePlaceholderSvg;

  return (
    <div className="profile-placeholder" style={{ backgroundImage: `url(${placeholderStr})` }} />
  );
};

function CastCard({ person, profileImgUrl, genderStr }) {
  const { name, character, episodeCount } = person;

  return (
    <li className="cast__card card">
      <div className="cast__card-link">
        <ProfileImg profileImgUrl={profileImgUrl} name={name} genderStr={genderStr} />
      </div>
      <span className="cast__name">{name}</span>
      <span className="cast__character">{character}</span>
      <EpisodeSpan episodeCount={episodeCount} />
    </li>
  );
}

export default CastCard;