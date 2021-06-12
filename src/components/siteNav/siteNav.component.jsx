import { Link } from 'react-router-dom';

import './siteNav.styles.scss';

function SiteNav() {
  return (
    <nav className="site-nav">
      <ul className="site-nav__list">
        <li className="site-nav__item"><Link to="/tv/popular">Popular</Link></li>
        <li className="site-nav__item"><Link to="/tv/top-rated">Top Rated</Link></li>
      </ul>
    </nav>
  );
}

export default SiteNav;