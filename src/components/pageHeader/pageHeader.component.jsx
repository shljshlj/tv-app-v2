import ContentWrapper from '../../components/layout/contentWrapper/contentWrapper.component';

import './pageHeader.styles.scss';

function PageHeader({ show }) {
  const { title, voteAverage, voteCount, overview } = show;
  const runtime = show.episodeRuntime + 'min';
  const genres = show.getGenreList();
  const creators = show.getCreatorsList();
  const posterUrl = show.getPosterUrl();
  const backdropUrl = show.getBackdropUrl();
  const dateFormat = show.getDateFormat();
  const { numOfCreators, creatorsList } = creators;

  const sectionStyle = {
    backgroundImage: `url(${backdropUrl})`
  }

  return (
    <section className="page-header page-header--backdrop_poster" style={sectionStyle}>
      <div className="page-header--linear_gradient">
        <ContentWrapper>
          <div className="page-header_wrapper">
            <div className="poster_wrapper">
              <div className="poster">
                <img src={posterUrl} alt={`Poster for ${title} show`} />
              </div>
            </div>
            <div className="overview">
              <div className="title_wrapper">
                <h1 className="title">{title}</h1>
                <div className="title__subtext">
                  <span>{runtime}</span>
                  <span className="title__divider">{String.fromCharCode(124)}</span>
                  <span>{genres}</span>
                  <span className="title__divider">{String.fromCharCode(124)}</span>
                  <span>TV Series {dateFormat}</span>
                </div>
              </div>
              <div className="rating_wrapper">
                <div className="rating--icon">
                </div>
                <div className="rating--value">
                  <strong title={`${voteAverage} based on ${voteCount} user ratings`}>
                    <span>{voteAverage}</span>
                  </strong>
                </div>
              </div>
              <div className="summary">
                <h3>Overview</h3>
                <p>{overview}</p>
              </div>
              <div className="creators">
                <h4>{numOfCreators > 1 ? 'Creators:' : 'Creator:'}</h4>
                <span>{creatorsList}</span>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </section>
  );
}

export default PageHeader;