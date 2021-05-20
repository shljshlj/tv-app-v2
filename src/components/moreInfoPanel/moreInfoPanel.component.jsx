import DetailsPanel from './detailsPanel.component';
import KeywordsPanel from './keywordsPanel.component';
import LinksPanel from './linksPanel.component';

import './moreInfoPanel.styles.scss';

function MoreInfoPanel({ showDetails }) {
  const showId = showDetails.showId;
  const country = showDetails.getCountryOfOrigin();
  const language = showDetails.getOriginalLanguageFull();
  const releaseDateFormated = showDetails.getReleaseDateFormat();

  const { status, homepage, title } = showDetails;

  return (
    <div className="more-info">
      <DetailsPanel
        country={country}
        language={language}
        releaseDate={releaseDateFormated}
        status={status}
      />
      <KeywordsPanel
        showId={showId}
      />
      <LinksPanel
        showId={showId}
        homepage={homepage}
        title={title}
      />
    </div>
  );
}

export default MoreInfoPanel;