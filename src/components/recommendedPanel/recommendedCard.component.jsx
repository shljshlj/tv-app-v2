import { Link } from 'react-router-dom';

function RecommendedCard({ id, posterUrl, title, rating }) {
  return (
    <li className="recommended__item">
      <div className="recommended__item-image">
        <Link to={`/show/${id}`}>
          <img src={posterUrl} alt="" />
        </Link>
      </div>
      <div className="recommended__item-info">
        <Link to={`/show/${id}`}>{title}</Link>
        {
          rating ?
            <span>{rating}{String.fromCharCode(37)}</span> :
            null
        }
      </div>
    </li>
  );
}

export default RecommendedCard;