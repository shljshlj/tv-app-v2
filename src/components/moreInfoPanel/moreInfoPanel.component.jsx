import LinksPanel from './linksPanel.component';

import './moreInfoPanel.styles.scss';

const DetailsPanel = ({ country, language, releaseDate, status }) => {
  return (
    <section className="panel details__panel">
      <div className="panel__heading details__heading">
        <h4>Series Details</h4>
      </div>
      <table className="details__table">
        <tbody>
          <tr>
            <td>Country:</td>
            <td>{country}</td>
          </tr>
          <tr>
            <td>Language</td>
            <td>{language}</td>
          </tr>
          <tr>
            <td>Release Date:</td>
            <td>{releaseDate}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{status}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

const KeywordsPanel = ({ keywordsList }) => {
  return (
    <section className="panel keywords__panel">
      <div className="panel__heading facts__heading">
        <h4>Keywords</h4>
      </div>
      {
        keywordsList.length !== 0 ?
          <ul className="keywords__list">
            {
              keywordsList.map((keyword) => <li key={keyword} className="keywords__item">{keyword}</li>)
            }
          </ul> :
          <p>No keywords have been added.</p>
      }
    </section>
  );
};

function MoreInfoPanel({ show }) {
  const country = show.getCountryOfOrigin();
  const language = show.getOriginalLanguageFull();
  const releaseDateFormated = show.getReleaseDateFormat();
  const keywordsList = show.getKeywordsArray();

  const { status, homepage, externalIds, title } = show;

  return (
    <div className="more-info">
      <DetailsPanel
        country={country}
        language={language}
        releaseDate={releaseDateFormated}
        status={status}
      />
      <KeywordsPanel keywordsList={keywordsList} />
      <LinksPanel
        externalIds={externalIds}
        homepage={homepage}
        title={title}
      />
    </div>
  );
}

export default MoreInfoPanel;