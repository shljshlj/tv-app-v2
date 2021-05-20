import { useEffect, useState } from 'react';
import { showService } from '../../services/showService';
import RecommendedCard from './recommendedCard.component';

import './recommendedPanel.styles.scss';

function RecommendedPanel({ showId }) {
  const [recommendedShows, setRecommendedShows] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRecommendedShow = async () => {
      setLoading(true);
      const recommendedShows = await showService.fetchRecommended(showId);

      setRecommendedShows(recommendedShows);
      setLoading(false);
    };

    getRecommendedShow();
  }, [showId]);

  if (loading) {
    return (
      <section className="panel recommended__panel">Loading...</section>
    )
  }

  return (
    <section className="panel recommended__panel">
      <div className="panel__heading recommended__heading">
        <h3>More Like This</h3>
      </div>
      {
        recommendedShows?.length >= 1 ?
          <ul className="recommended__list">
            {
              recommendedShows.map((item) => {
                const { id, title, rating } = item;
                const posterUrl = item.getPosterUrl('s');
                const ratingPercent = rating ? Math.round(rating * 10) : '';

                return <RecommendedCard key={id} id={id} posterUrl={posterUrl} title={title} rating={ratingPercent} />
              })
            }
          </ul> :
          <div>There are no recommended shows.</div>
      }
    </section>
  );
}

export default RecommendedPanel;