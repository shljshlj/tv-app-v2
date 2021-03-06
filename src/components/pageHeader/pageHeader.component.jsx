import { useEffect, useRef, forwardRef } from 'react';
import { useMedia } from 'react-use';
import ContentWrapper from '../../components/layout/contentWrapper/contentWrapper.component';

import { setLinearGradient } from '../../utils/generateLinearGradient';
import posterPlaceholder from '../../assets/poster_placeholder_tmdb.svg';

import './pageHeader.styles.scss';


const Poster = forwardRef((props, ref) => {
  const posterStyle = {
    '--aspect-ratio': 2 / 3
  };

  return (
    <div className="poster">
      <div className="poster-container" style={posterStyle}>
        <img
          ref={ref}
          crossOrigin="anonymous"
          loading="lazy"
          src={props.posterUrl}
          alt={`Poster for ${props.title} show`}
        />
      </div>
    </div>
  );
});

const PosterPlaceholder = () => {
  const posterPlaceholderStyles = {
    backgroundImage: `url(${posterPlaceholder})`
  };

  return (
    <div className="poster" style={{ '--aspect-ratio': 2 / 3 }}>
      <div className="poster--placeholder" style={posterPlaceholderStyles}></div>
    </div>
  );
};

function PageHeader({ showDetails }) {
  const { title, voteAverage, voteCount, overview, tagline, creators } = showDetails;
  const runtime = showDetails.episodeRuntime;
  const genreString = showDetails.getGenreString();
  const creatorString = showDetails.getCreatorString();
  const posterUrl = showDetails.getPosterUrl();
  const backdropUrl = showDetails.getBackdropUrl();
  const dateFormat = showDetails.getDateFormat();

  const isWide = useMedia('(min-width: 768px)');
  const bgImg = backdropUrl ? isWide ? `url(${backdropUrl})` : null : null;

  const sectionStyle = bgImg ?
    {
      backgroundImage: bgImg
    } :
    {
      backgroundColor: '#121212'
    };

  const posterRef = useRef();
  const gradientRef = useRef();

  useEffect(() => {
    if (posterRef.current) {
      posterRef.current.onload = () => setLinearGradient(posterRef.current, gradientRef.current);
    }
  }, []);

  const posterImg = () => {
    return posterUrl ?
      <Poster ref={posterRef} title={title} posterUrl={posterUrl} /> :
      <PosterPlaceholder />
  };

  return (
    <section className="page-header page-header--backdrop_poster" style={sectionStyle}>
      <div ref={gradientRef} className="page-header--linear_gradient">
        <ContentWrapper>
          <div className="page-header_wrapper">
            <div className="poster_wrapper">
              {posterImg()}
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
                <p>{overview || 'There is no overview provided for this show.'}</p>
              </div>
              {creatorString &&
                <div className="creators">
                  <h4>{creators.length > 1 ? 'Creators:' : 'Creator:'}</h4>
                  <span>{creatorString}</span>
                </div>
              }
            </div>
          </div>
        </ContentWrapper>
      </div>
    </section>
  );
}

export default PageHeader;