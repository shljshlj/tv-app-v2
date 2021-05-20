import { Link } from 'react-router-dom';

import SeasonCard from '../seasonCard/seasonCard.component';

import './seasonsPanel.styles.scss';

function SeasonPanel({ title, seasons }) {
  const seasonsInOrder = seasons.sort((a, b) => b.seasonNumber - a.seasonNumber);
  const seasonsList = seasonsInOrder.slice(0, 4);

  return (
    <section className="panel season__panel">
      <div className="panel__heading season__heading">
        <h3>Seasons</h3>
      </div>
      <div className="season_wrapper">
        <ol className="season__list">
          {
            seasonsList.map((season) => {
              const posterUrl = season.getPosterUrl();
              const releaseYear = season.getReleaseYear();

              return <SeasonCard key={season.id} season={season} posterUrl={posterUrl} releaseYear={releaseYear} showTitle={title} />
            })
          }
        </ol>
        {
          seasons.length > 4 ?
            <Link className="link--more" to="#">Show More Seasons</Link> :
            null
        }
      </div>
    </section>
  );
}

export default SeasonPanel;