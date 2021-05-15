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

  return (
    <div className="profile-placeholder" style={{ backgroundImage: `url(../../assets/${genderStr}_placeholder_tmdb.svg)` }} />
  );
};

function CastCard({ person, profileImgUrl, genderStr }) {
  const { name, character, episodeCount } = person;

  return (
    <li class="cast__card card">
      <div class="cast__card-link">
        <ProfileImg profileImgUrl={profileImgUrl} name={name} genderStr={genderStr} />
      </div>
      <span class="cast__name">{name}</span>
      <span class="cast__character">{character}</span>
      <EpisodeSpan episodeCount={episodeCount} />
    </li>
  );
}

export default CastCard;