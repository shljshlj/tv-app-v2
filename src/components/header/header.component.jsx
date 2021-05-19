import { Link } from 'react-router-dom';

import ContentWrapper from '../layout/contentWrapper/contentWrapper.component';

import './header.styles.scss';

function Header() {
  return (
    <header className="site-header">
      <ContentWrapper>
        <div className="logo">
          <Link to='/' className="link--yellow">TvApp</Link>
        </div>
      </ContentWrapper>
    </header>
  );
}

export default Header;