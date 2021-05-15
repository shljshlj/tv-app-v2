import './singleShowGrid.styles.scss';

function SingleShowGrid({ children }) {
  return (
    <div className="main_wrapper single-page__grid">{children}</div>
  );
}

export default SingleShowGrid;