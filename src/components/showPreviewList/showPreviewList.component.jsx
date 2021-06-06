import { useState } from 'react';
import { useMount, usePromise } from 'react-use';
import { showService } from '../../services/showService';

import ShowPreviewItem from '../showPreviewItem/showPreviewItem.component';

import './showPreviewList.styles.scss';

const fetchShows = {
  POPULAR: showService.fetchPopular,
  TOP_RATED: showService.fetchTopRated
};

function ShowPreviewList({ type, numOfShows, className }) {
  const mounted = usePromise();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useMount(() => {
    getShows(type);
  })

  const getShows = async () => {
    setLoading(true);
    const fetchedShows = await mounted(fetchShows[type](numOfShows));

    setShows(fetchedShows);
    setLoading(false);
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <ul className={className}>
      {
        shows && shows.map((show) => <ShowPreviewItem key={show.id} show={show} />)
      }
    </ul>
  );
}

export default ShowPreviewList;