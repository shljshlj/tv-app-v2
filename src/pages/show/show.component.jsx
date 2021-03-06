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

import './show.styles.scss';

function ShowPage() {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getShow = async () => {
      setLoading(true);
      const fetchedShow = await showService.fetchDetails(showId);
      setShowDetails(fetchedShow);
      setLoading(false);
    };

    getShow();
  }, [showId]);

  if (loading) {
    return <div className="loading-show">Loading...</div>;
  }

  return (
    <>
      {
        showDetails ?
          (<>
            <PageHeader showDetails={showDetails} />
            <ContentWrapper>
              <SingleShowGrid>
                {/*
                  These components have problem with unmounting and updating the state
                  only if they are nested like this,
                  but not if they are on the same level with the PageHeader component (?)
                */}
                <CastPanel showId={showId} />
                <SeasonPanel title={showDetails.title} seasons={showDetails.seasons} />
                <VideoPanel showId={showId} />
                <RecommendedPanel showId={showId} />
                <MoreInfoPanel showDetails={showDetails} />
              </SingleShowGrid>
            </ContentWrapper>
          </>) :
          <div>No such show</div>
      }
    </>
  );
}

export default ShowPage;