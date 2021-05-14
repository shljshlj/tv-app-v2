import './contentWrapper.styles.scss';

export default function ContentWrapper(props) {
  return (
    <div class="page-content">
      {props.children}
    </div>
  );
};