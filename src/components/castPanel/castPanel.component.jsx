import { useState, useEffect } from 'react';
import { showService } from '../../services/showService';
import CastCard from '../castCard/castCard.component';

import './castPanel.styles.scss';

function CastPanel({ showId }) {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      setLoading(true);
      const cast = await showService.fetchCast(showId);
      const castInOrder = cast && cast.sort((a, b) => a.order - b.order);

      setCast(castInOrder);
      setLoading(false);
    };

    getCast();
  }, [showId]);

  if (loading) {
    return (
      <section className="panel cast__panel">Loading...</section>
    );
  }

  return (
    <section className="panel cast__panel">
      <div className="panel__heading cast__heading">
        <h3>Cast</h3>
        {cast && <span className="cast__heading-label">Series Cast Summary:</span>}
      </div>
      {
        cast ?
          (
            <div className="cast-scroller should_fade is_fading">
              <ol className="cast__list">
                {cast.map((person) => {
                  const profileImgUrl = person.getProfileImgUrl();
                  const genderStr = person.getGenderStr();
                  return <CastCard key={person.id} person={person} profileImgUrl={profileImgUrl} genderStr={genderStr} />;
                })}
              </ol>
            </div>
          ) :
          <p>No cast info.</p>
      }
    </section>
  );
}

export default CastPanel;