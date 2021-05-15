import './contentWrapper.styles.scss';

export default function ContentWrapper(props) {
  return (
    <div className="content-wrapper">
      {props.children}
    </div>
  );
};