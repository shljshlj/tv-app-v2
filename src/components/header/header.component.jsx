import { Link } from 'react-router-dom';

import ContentWrapper from '../layout/contentWrapper/contentWrapper.component';
import Search from '../search/search.component';

import './header.styles.scss';

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__content">
        <ContentWrapper>
          <div className="logo">
            <Link to='/' className="link--yellow">TvApp</Link>
          </div>
        </ContentWrapper>
      </div>
      <Search />
    </header>
  );
}

export default Header;