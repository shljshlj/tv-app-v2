import CastCard from '../castCard/castCard.component';

import './castPanel.styles.scss';

function CastPanel({ cast }) {
  const castInOrder = cast.sort((a, b) => a.order - b.order);

  return (
    <section className="panel cast__panel">
      <div className="panel__heading cast__heading">
        <h3>Cast</h3>
        <span className="cast__heading-label">Series Cast Summary:</span>
      </div>
      <div className="cast-scroller should_fade is_fading">
        <ol className="cast__list">
          {castInOrder.map((person) => {
            const profileImgUrl = person.getProfileImgUrl();
            const genderStr = person.getGenderStr();
            return <CastCard key={person.id} person={person} profileImgUrl={profileImgUrl} genderStr={genderStr} />;
          })}
        </ol>
      </div>
    </section>
  );
}

export default CastPanel;