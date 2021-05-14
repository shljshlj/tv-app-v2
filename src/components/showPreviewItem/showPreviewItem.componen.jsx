import { Link } from 'react-router-dom';

import './showPreviewItem.styles.scss';

function ShowPreviewItem({ show }) {
  const { id, title, rating } = show;
  const posterUrl = show.getPosterUrl();
  const releaseYear = show.getReleaseYear();
  const genres = show.getGenresFormat();
  console.log(show);

  return (
    <li className="grid__card card">
      <div className="grid__card-poster">
        <Link to={`/show/${id}`}>
          <img
            alt="movie poster"
            src={posterUrl}
          />
        </Link>
      </div>
      <div className="grid__card-content">
        <header className="grid__card-header">
          <div className="grid__card-rating">{rating}</div>
          <h2 className="grid__card-title">
            <Link to={`/show/${id}`}>
              {title}
            </Link>
          </h2>
        </header>
        <div className="grid__card-content-expanded">
          <div className="grid__card-genre">{genres}</div>
          <div className="grid__card-year">({releaseYear})</div>
        </div>
      </div>
    </li>
  );
}

export default ShowPreviewItem;