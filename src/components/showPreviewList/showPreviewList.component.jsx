import { useState, useEffect } from 'react';
import { showService } from '../../services/showService';

import ShowPreviewItem from '../showPreviewItem/showPreviewItem.component';

import './showPreviewList.styles.scss';

const fetchShows = {
  POPULAR: showService.fetchPopular,
  TOP_RATED: showService.fetchTopRated
};

function ShowPreviewList({ type }) {
  const [shows, setShows] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getShows = async () => {
      setLoading(true);
      const fetchedShows = await fetchShows[type](10);

      setShows(fetchedShows)
      setLoading(false);
    }

    getShows();
  }, [type]);

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <ul className="main__section-grid movies-popular">
      {
        shows && shows.map((show) => <ShowPreviewItem key={show.id} show={show} />)
      }
    </ul>
  );
}

export default ShowPreviewList;