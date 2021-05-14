import { useState, useEffect } from 'react';

import { showService } from '../../services/showService';

function HomePage() {
  const [topRatedShows, setTopRatedShows] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTopShows = async () => {
      setLoading(true);
      const fetchedTopShows = await showService.fetchPopular();
      const topShows = await showService.createShowPreviews(fetchedTopShows);
      console.log(fetchedTopShows);
      console.log(topShows);
      setLoading(false);
    }

    getTopShows();
  }, [])

  return (
    <h1>Top Trending Shows</h1>
  );
}

export default HomePage;