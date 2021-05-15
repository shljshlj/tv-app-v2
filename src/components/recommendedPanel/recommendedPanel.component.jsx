import RecommendedCard from './recommendedCard.component';

import './recommendedPanel.styles.scss';

function RecommendedPanel({ recommendedShows }) {
  return (
    <section className="panel recommended__panel">
      <div className="panel__heading recommended__heading">
        <h3>More Like This</h3>
      </div>
      <ul className="recommended__list">
        {
          recommendedShows.map((item) => {
            const { id, title, rating } = item;
            const posterUrl = item.getPosterUrl('s');
            const ratingPercent = rating ? Math.round(rating * 10) : '';

            return <RecommendedCard key={id} id={id} posterUrl={posterUrl} title={title} rating={ratingPercent} />
          })
        }
      </ul>
    </section>
  );
}

export default RecommendedPanel;