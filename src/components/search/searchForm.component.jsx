import { useEffect } from 'react';
import ContentWrapper from '../layout/contentWrapper/contentWrapper.component';

import { showService } from '../../services/showService';

function SearchForm(props) {
  const { query, setQuery, debouncedQuery, setDebouncedQuery, setSearchResults, setIsSearching } = props;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    }
  }, [query, setDebouncedQuery]);

  useEffect(() => {
    const searchShows = async () => {
      if (debouncedQuery) {
        setIsSearching(true);
        const data = await showService.searchShows(debouncedQuery);

        setSearchResults(data);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    };

    searchShows();
  }, [debouncedQuery, setDebouncedQuery, setSearchResults, setIsSearching]);

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <ContentWrapper>
      <form className="search-form" onSubmit={onSubmit}>
        <label htmlFor="search">
          <span className="visually-hidden">Search shows</span>
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id="search"
          name="search"
          type="text"
          placeholder="Search TvApp"
        />
      </form>
    </ContentWrapper>
  );
}

export default SearchForm;