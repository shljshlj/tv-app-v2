import ContentWrapper from '../../components/layout/contentWrapper/contentWrapper.component';
import ShowPreviewSection from '../../components/showPreviewSection/showPreviewSection.component';

const showTypes = {
  POPULAR: 'POPULAR',
  TOP_RATED: 'TOP_RATED'
}

function HomePage() {
  return (
    <ContentWrapper>
      <ShowPreviewSection type={showTypes.POPULAR} />
      <ShowPreviewSection type={showTypes.TOP_RATED} />
    </ContentWrapper>
  );
}

export default HomePage;