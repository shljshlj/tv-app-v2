import { useState } from 'react';
import { usePromise, useMount } from 'react-use';
import { showService } from '../../services/showService';
import RecommendedCard from './recommendedCard.component';

import './recommendedPanel.styles.scss';

function RecommendedPanel({ showId }) {
  const mounted = usePromise();
  const [recommendedShows, setRecommendedShows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useMount(() => {
    getRecommendedShow();
  })

  const getRecommendedShow = async () => {
    setLoading(true);
    const { recommendedShows, error } = await mounted(showService.fetchRecommended(showId));

    setError(error);
    setRecommendedShows(recommendedShows);
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="panel recommended__panel">Loading...</section>
    )
  }

  if (error) {
    console.log(error);
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