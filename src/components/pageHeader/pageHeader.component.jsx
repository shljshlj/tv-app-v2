import { useMedia } from 'react-use';
import ContentWrapper from '../../components/layout/contentWrapper/contentWrapper.component';

import './pageHeader.styles.scss';

function PageHeader({ showDetails }) {
  const { title, voteAverage, voteCount, overview, tagline, creators } = showDetails;
  const runtime = showDetails.episodeRuntime + 'min';
  const genreString = showDetails.getGenreString();
  const creatorString = showDetails.getCreatorString();
  const posterUrl = showDetails.getPosterUrl();
  const backdropUrl = showDetails.getBackdropUrl();
  const dateFormat = showDetails.getDateFormat();

  const isWide = useMedia('(min-width: 768px)');
  const bgImg = isWide ? `url(${backdropUrl})` : null;

  const sectionStyle = {
    backgroundImage: bgImg
  };

  return (
    <section className="page-header page-header--backdrop_poster" style={sectionStyle}>
      <div className="page-header--linear_gradient">
        <ContentWrapper>
          <div className="page-header_wrapper">
            <div className="poster_wrapper">
              <div className="poster">
                <img loading="lazy" src={posterUrl} alt={`Poster for ${title} show`} />
              </div>
            </div>
            <div className="overview">
              <div className="title_wrapper">
                <h1 className="title">{title}</h1>
                <div className="title__subtext">
                  <span>{runtime}</span>
                  <span className="title__divider">{String.fromCharCode(124)}</span>
                  <span>{genreString}</span>
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
              {tagline && <p className="tagline">{tagline}</p>}
              <div className="summary">
                <h3>Overview</h3>
                <p>{overview}</p>
              </div>
              <div className="creators">
                <h4>{creators.length > 1 ? 'Creators:' : 'Creator:'}</h4>
                <span>{creatorString}</span>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </section>
  );
}

export default PageHeader;