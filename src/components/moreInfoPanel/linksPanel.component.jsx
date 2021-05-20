import { useState, useEffect } from 'react';
import { showService } from '../../services/showService';

const FacebookLink = ({ facebook }) => {
  if (!facebook) return null;

  return (
    <li className="links__item links--social">
      <a title="Visit Facebook" href={facebook} target="_blank" rel="noreferrer">
        <span><i className="fab fa-facebook-square"></i></span>
      </a>
    </li>
  );
};

const TwitterLink = ({ twitter }) => {
  if (!twitter) return null;

  return (
    <li className="links__item links--social">
      <a title="Visit Twitter" href={twitter} target="_blank" rel="noreferrer">
        <span><i className="fab fa-twitter"></i></span>
      </a>
    </li>
  );
};

const InstagramLink = ({ instagram }) => {
  if (!instagram) return null;

  return (
    <li className="links__item links--social">
      <a title="Visit Instagram" href={instagram} target="_blank" rel="noreferrer">
        <span><i className="fab fa-instagram"></i></span>
      </a>
    </li>
  );
};


const HomepageLink = ({ homepage }) => {
  if (!homepage) return null;

  return (
    <li className="links__item">
      <a title="Visit homepage" href={homepage} target="_blank" rel="noreferrer">
        <span>
          <i className="fas fa-link"></i>
        </span>
      </a>
    </li>
  );
};

const ImdbSection = ({ imdb, imgAlt }) => {
  if (!imdb) return null;

  return (
    <section className="links__imdb">
      <span className="imdbRatingPlugin" data-title={imdb} data-style="t1">
        <a href={`https://www.imdb.com/title/${imdb}/?ref_=tt_plg_rt`} target="_blank" rel="noreferrer">
          <img alt={imgAlt}
            src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" />
        </a>
      </span>
      {/* <script>{imdbRating(document, 'script', 'imdb-rating-api')}</script> */}
    </section>
  );
};

function LinksPanel({ showId, homepage, title }) {
  const [externalIds, setExternalIds] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getExternalIds = async () => {
      setLoading(true);
      const externalIds = await showService.fetchExternalIds(showId);

      setExternalIds(externalIds);
      setLoading(false);
    };

    getExternalIds();
  }, [showId]);

  if (loading) {
    return <section className="panel links__panel">Loading...</section>
  }

  if (!loading && externalIds) {
    const facebook = externalIds.getExternalUrl('facebook');
    const instagram = externalIds.getExternalUrl('instagram');
    const twitter = externalIds.getExternalUrl('twitter');
    const imdb = externalIds.imdb;
    const imgAlt = `TV Show ${title} on IMDB`;

    return (
      <>
        <section className="panel links__panel">
          <ul className="links__list">
            <FacebookLink facebook={facebook} />
            <TwitterLink twitter={twitter} />
            <InstagramLink instagram={instagram} />
            <HomepageLink homepage={homepage} />
          </ul>
        </section>
        <ImdbSection imdb={imdb} imgAlt={imgAlt} />
      </>
    );
  }

  return null;
};

export default LinksPanel;