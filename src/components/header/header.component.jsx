import { Link } from 'react-router-dom';

import ContentWrapper from '../layout/contentWrapper/contentWrapper.component';
import SiteNav from '../siteNav/siteNav.component';
import Search from '../search/search.component';

import './header.styles.scss';

function Header() {
  return (
    <header className="site-header">
      <ContentWrapper>
        <div className="site-header__content">
          <div className="logo">
            <Link to='/' className="link--yellow">TvApp</Link>
          </div>
          <SiteNav />
        </div>
      </ContentWrapper>
      <Search />
    </header>
  );
}

export default Header;