const SeasonOverview = ({ overview }) => {
  if (!overview) return null;

  return (
    <div className="season__overview">
      <p className="text-overview">
        {overview}
      </p>
    </div>
  );
};

function SeasonCard({ season, posterUrl, releaseYear, showTitle }) {
  const { title, episodeCount, overview } = season;
  const seasonTitle = `${showTitle}: ${title}`;

  return (
    <li className="season__card card">
      <div className="season__card-poster">
        <img src={posterUrl} alt="" />
      </div>
      <div className="season__content">
        <h2 className="season__title">{seasonTitle}</h2>
        <h4 className="season__subheading">
          <span>{releaseYear} {String.fromCharCode(124)} {episodeCount}{episodeCount > 1 ? ' Episodes' : ' Episode'}</span>
        </h4>
        <SeasonOverview overview={overview} />
      </div>
    </li>
  );
}

export default SeasonCard;