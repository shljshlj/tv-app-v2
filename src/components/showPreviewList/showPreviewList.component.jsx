import { useState, useEffect } from 'react';
import { showService } from '../../services/showService';

import ShowPreviewItem from '../showPreviewItem/showPreviewItem.component';

import './showPreviewList.styles.scss';

function ShowPreviewList() {
  const [popularShows, setPopularShows] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPopularShows = async () => {
      setLoading(true);
      const fetchedPopularShows = await showService.fetchPopular(20);
      const popularShows = await showService.createShowPreviews(fetchedPopularShows);

      setPopularShows(popularShows)
      setLoading(false);
    }

    getPopularShows();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <ul className="main__section-grid movies-popular">
      {
        popularShows && popularShows.map((show) => <ShowPreviewItem key={show.id} show={show} />)
      }
    </ul>
  );
}

export default ShowPreviewList;