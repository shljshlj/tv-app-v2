import { Link } from 'react-router-dom';

import ShowPreviewList from '../showPreviewList/showPreviewList.component';

import './showPreviewSection.styles.scss';

const sectionType = {
  POPULAR: {
    title: 'Most Popular Shows',
    route: '/tv/popular',
  },
  TOP_RATED: {
    title: 'Top Rated Shows',
    route: '/tv/top-rated',
  }
}

function ShowPreviewSection({ type }) {
  const { title, route } = sectionType[type];

  return (
    <section className="main__section">
      <header className="main__section-header">
        <h1 className="main__section-title">{title}</h1>
      </header>
      <ShowPreviewList type={type} />
      <Link to={route} className="main__section-link">Discover More</Link>
    </section>
  )
}

export default ShowPreviewSection