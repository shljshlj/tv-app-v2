import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { POSTER_PATH_XS } from '../../shared/constants';

import ContentWrapper from '../layout/contentWrapper/contentWrapper.component';
import SearchForm from './searchForm.component';

import './search.styles.scss';

const SearchItem = ({ id, title, releaseYear, posterUrl }) => {
  return (
    <li className="search-item">
      <Link to={`/show/${id}`}>
        <div className="search-item__poster">
          {posterUrl && <img src={posterUrl} alt={`Poster for show ${title}`} />}
        </div>
        <div className="search-item__info">
          <h3>{title}</h3>
          <span>{releaseYear ? releaseYear : 'No release date'}</span>
        </div>
      </Link>
    </li>
  )
}

const RenderedResults = ({ results, isSearching, query, open, setOpen, formRef }) => {
  const resultsRef = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (resultsRef.current?.contains(event.target) || formRef.current?.contains(event.target)) {
        return;
      }

      setOpen(false);
    }

    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, { capture: true });
    };
  }, [setOpen, formRef]);


  if (!isSearching) return null;
  if (results.length === 0) {
    return (
      <div ref={resultsRef} className={`no-results ${open ? '' : 'hidden'}`}>
        <span>NO RESULTS</span>
      </div>
    );
  }

  return (
    <ul ref={resultsRef} className={`search-list ${open ? '' : 'hidden'}`}>
      {
        results.map((result) => {
          const { id, name, first_air_date, poster_path } = result;
          const releaseYear = first_air_date ? new Date(first_air_date).getFullYear() : null;
          const posterUrl = poster_path ? `${POSTER_PATH_XS}${poster_path}` : null;

          return <SearchItem key={id} id={id} title={name} releaseYear={releaseYear} posterUrl={posterUrl} />
        })
      }
      <li className="search-item"><Link to="#">See all results for "{query}"</Link></li>
    </ul>
  );
}

function Search() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formRef, setFormRef] = useState(null);
  const [open, setOpen] = useState(true);

  const initialLocation = useRef(useLocation().pathname);
  let location = useLocation().pathname;

  useEffect(() => {
    if (initialLocation.current !== location) {
      setIsSearching(false);
      setQuery('');
      initialLocation.current = location;
    }
  }, [location])

  return (
    <div className="search">
      <div className="search-bar">
        <SearchForm
          query={query}
          setQuery={setQuery}
          debouncedQuery={debouncedQuery}
          setDebouncedQuery={setDebouncedQuery}
          setSearchResults={setSearchResults}
          setIsSearching={setIsSearching}
          setFormRef={setFormRef}
          setOpen={setOpen}
        />
      </div>
      <div className="search-results">
        <ContentWrapper>
          <div className="content">
            <RenderedResults
              results={searchResults}
              isSearching={isSearching}
              query={debouncedQuery}
              open={open}
              setOpen={setOpen}
              formRef={formRef}
            />
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
}

export default Search;