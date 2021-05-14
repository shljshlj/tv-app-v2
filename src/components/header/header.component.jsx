import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="logo">
        <Link to='/'>Tv App</Link>
      </div>
    </header>
  );
}

export default Header;