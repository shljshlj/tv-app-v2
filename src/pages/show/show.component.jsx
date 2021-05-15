import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showService } from '../../services/showService';

import PageHeader from '../../components/pageHeader/pageHeader.component';
import SingleShowGrid from '../../components/layout/singleShowGrid/singleShowGrid.component';
import ContentWrapper from '../../components/layout/contentWrapper/contentWrapper.component';
import CastPanel from '../../components/castPanel/castPanel.component';
import SeasonPanel from '../../components/seasonsPanel/seasonsPanel.component';
import VideoPanel from '../../components/videoPanel/videoPanel.component';
import RecommendedPanel from '../../components/recommendedPanel/recommendedPanel.component';
import MoreInfoPanel from '../../components/moreInfoPanel/moreInfoPanel.component';

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

  return (
    <>
      {
        show ?
          (<>
            <PageHeader show={show} />
            <ContentWrapper>
              <SingleShowGrid>
                <CastPanel cast={show.cast} />
                <SeasonPanel title={show.title} seasons={show.seasons} />
                <VideoPanel videos={show.videos} />
                <RecommendedPanel recommendedShows={show.recommendedShows} />
                <MoreInfoPanel show={show} />
              </SingleShowGrid>
            </ContentWrapper>
          </>) :
          <div>No such show</div>
      }
    </>
  );
}

export default ShowPage;