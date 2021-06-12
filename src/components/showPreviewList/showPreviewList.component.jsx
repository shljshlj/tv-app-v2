import { useEffect, useState } from 'react';
import { usePromise } from 'react-use';
import { showService } from '../../services/showService';

import ShowPreviewItem from '../showPreviewItem/showPreviewItem.component';

import './showPreviewList.styles.scss';

const fetchShows = {
  POPULAR: showService.fetchPopular,
  TOP_RATED: showService.fetchTopRated
};

function ShowPreviewList({ type, numOfShows, className, isPaginated }) {
  const mounted = usePromise();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getShows = async () => {
      setLoading(true);
      const fetchedShows = await mounted(fetchShows[type](numOfShows));

      setShows(fetchedShows);
      setLoading(false);
    }

    getShows(type);
  }, [mounted, type, numOfShows])


  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <ul className={className}>
        {
          shows && shows.map((show) => <ShowPreviewItem key={show.id} show={show} />)
        }
      </ul>
      {isPaginated && <div className="pagination-button">Load More</div>}
    </>
  );
}

export default ShowPreviewList;