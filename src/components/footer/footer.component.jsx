import ContentWrapper from '../layout/contentWrapper/contentWrapper.component';
import { ReactComponent as TmdbLogo } from '../../assets/tmdb_logo.svg';

import './footer.styles.scss';

function Footer() {
  return (
    <footer className="site-footer">
      <ContentWrapper>
        <div className="flex">
          <div className="copy">
            © <a href="https://github.com/shljshlj" className="link--yellow">shljshlj</a> {new Date().getFullYear()}
          </div>
          <div className="api-provider">
            <p>Data provided by:</p>
            <TmdbLogo className="api-provider--logo" />
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
}

export default Footer;