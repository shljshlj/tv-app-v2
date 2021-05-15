import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showService } from '../../services/showService';

import PageHeader from '../../components/pageHeader/pageHeader.component';
import SingleShowGrid from '../../components/layout/singleShowGrid/singleShowGrid.component';
import ContentWrapper from '../../components/layout/contentWrapper/contentWrapper.component';
import CastPanel from '../../components/castPanel/castPanel.component';

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
            <ContentWrapper>
              <SingleShowGrid>
                <CastPanel cast={show.cast} />
              </SingleShowGrid>
            </ContentWrapper>
          </>) :
          <div>No such show</div>
      }
    </>
  );
}

export default ShowPage;