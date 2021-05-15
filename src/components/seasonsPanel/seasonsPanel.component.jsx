import { Link } from 'react-router-dom';

import SeasonCard from '../seasonCard/seasonCard.component';

import './seasonsPanel.styles.scss';

function SeasonPanel({ title, seasons }) {
  const seasonsInOrder = seasons.sort((a, b) => b.seasonNumber - a.seasonNumber);
  const seasonsList = seasons.length > 8 ? seasonsInOrder.slice(0, 8) : seasonsInOrder;

  return (
    <section class="panel season__panel">
      <div class="panel__heading season__heading">
        <h3>Seasons</h3>
      </div>
      <div class="season_wrapper">
        <ol class="season__list">
          {
            seasonsList.map((season) => {
              console.log(season)

              const posterUrl = season.getPosterUrl();
              const releaseYear = season.getReleaseYear();

              return <SeasonCard season={season} posterUrl={posterUrl} releaseYear={releaseYear} showTitle={title} />
            })
          }
        </ol>
        {
          seasons.length > 8 ?
            <Link class="link--more">Show More Seasons</Link> :
            null
        }
      </div>
    </section>
  );
}

export default SeasonPanel;