import { useState, useEffect } from 'react';
import { showService } from '../../services/showService';

function KeywordsPanel({ showId }) {
  const [keywords, setKeywords] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getKeywords = async () => {
      setLoading(true);
      const keywords = await showService.fetchKeywords(showId);

      setKeywords(keywords);
      setLoading(false);
    };

    getKeywords();
  }, [showId]);

  if (loading) {
    return <section className="panel keywords__panel">Loading...</section>
  }

  if (!loading && keywords && keywords.length !== 0) {
    const keywordsList = Array.from(keywords, keywordObj => keywordObj.name);

    return (
      <section className="panel keywords__panel">
        <div className="panel__heading facts__heading">
          <h4>Keywords</h4>
        </div>
        <ul className="keywords__list">
          {
            keywordsList.map((keyword) => <li key={keyword} className="keywords__item">{keyword}</li>)
          }
        </ul>
      </section>
    );
  }

  return (
    <section className="panel keywords__panel">
      <div className="panel__heading facts__heading">
        <h4>Keywords</h4>
      </div>
      <p>No keywords have been added.</p>
    </section>
  );
};

export default KeywordsPanel;