import ContentWrapper from '../../components/layout/contentWrapper/contentWrapper.component';
import ShowPreviewList from '../../components/showPreviewList/showPreviewList.component';

import './homepage.styles.scss';

function HomePage() {
  return (
    <ContentWrapper>
      <section className="main__section">
        <header className="main__section-header">
          <h1 className="main__section-title">Most Popular Shows</h1>
        </header>
        <ShowPreviewList />
      </section>
    </ContentWrapper>
  );
}

export default HomePage;