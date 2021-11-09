import { Link } from 'react-router-dom';
import LogoImgPath from '../../images/raster/TrecboLogo.png';
import classes from './PageNavigation.module.scss';

function PageNavigation() {
  return (
    <nav className={classes.navbar}>
      <Link to='/' className={classes.navbar__logo}>
        <img
          src={LogoImgPath}
          className={classes.navbar__logo__image}
          alt='Logo'
        />
        Trecbo
      </Link>
      <ul className={classes.navbar__links}>
        <li>
          <Link to='/Settings' className={classes.navbar__link}>
            Sign up
          </Link>
        </li>
        <li>
          <Link to='/Settings' className={classes.navbar__link}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNavigation;
