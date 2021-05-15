import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showService } from '../../services/showService';

import PageHeader from '../../components/pageHeader/pageHeader.component';

function ShowPage() {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getShow = async () => {
      setLoading(true);
      const fetchedShow = await showService.fetchShow(showId);
      console.log(fetchedShow);
      setShow(fetchedShow);
      setLoading(false);
    };

    getShow();
  }, [showId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(show);
  return (
    <>
      {
        show ?
          (<>
            <PageHeader show={show} />
          </>) :
          <div>No such show</div>
      }
    </>
  );
}

export default ShowPage;