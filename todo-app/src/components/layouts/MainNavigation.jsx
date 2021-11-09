import { Link } from 'react-router-dom';

function MainNavigation(params) {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Startup</Link>
        </li>
        <li>
          <Link to='/Dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/Settings'>Setting</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
