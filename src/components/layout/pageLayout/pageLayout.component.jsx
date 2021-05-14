import './pageLayout.styles.scss';

export default function PageLayout(props) {
  return (
    <div className="page-layout">
      {props.children}
    </div>
  );
}