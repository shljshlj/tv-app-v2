import './pageContainer.styles.scss';

export default function PageContainer(props) {
  return (
    <main className="main-content">
      {props.children}
    </main>
  );
};