import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ContentWrapper from '../../components/layout/contentWrapper/contentWrapper.component';
import ShowPreviewList from '../../components/showPreviewList/showPreviewList.component';

import './showspage.styles.scss';

const displayTypes = {
  'popular': {
    title: 'Popular TV Shows',
    type: 'POPULAR'
  },
  'top-rated': {
    title: 'Top Rated TV Shows',
    type: 'TOP_RATED'
  }
}

function ShowsPage() {
  const { tvId } = useParams();
  const { title, type } = displayTypes[tvId];
  const [selectValue, setSelectValue] = useState('popularity.desc');

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <ContentWrapper>
      <div className="showspage-grid">
        <header className="showspage__header">
          <h1 className="showspage__header-title">{title}</h1>
        </header>
        <div className="showspage__sidebar">
          <div className="filter-panel">
            <div className="filter-panel-name">
              <h2>Sort</h2>
            </div>
            <div className="filter">
              <h3>Sort Results By</h3>
              <div>
                <select id="sort_by" name="sort_by" value={selectValue} onChange={handleChange} style={{ display: 'block' }}>
                  <option value="popularity.desc">Popularity Descending</option>
                  <option value="popularity.asc">Popularity Ascending</option>
                  <option value="vote_average.desc">Rating Descending</option>
                  <option value="vote_average.asc">Rating Ascending</option>
                  <option value="primary_release_date.desc">Release Date Descending</option>
                  <option value="primary_release_date.asc">Release Date Ascending</option>
                  <option value="title.asc">Title (A-Z)</option>
                  <option value="title.desc">Title (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="filter-search">
            <span>Search</span>
          </div>
        </div>
        <div className="showspage__shows">
          <ShowPreviewList type={type} numOfShows={20} className="showspage__shows-grid" />
          <div className="pagination-button">Load More</div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default ShowsPage;