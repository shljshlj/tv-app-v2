import { Link } from 'react-router-dom';

import ContentWrapper from '../layout/contentWrapper/contentWrapper.component';

import './header.styles.scss';

function Header() {
  return (
    <header className="page-header">
      <ContentWrapper>
        <div className="logo">
          <Link to='/'>tvAPP</Link>
        </div>
      </ContentWrapper>
    </header>
  );
}

export default Header;