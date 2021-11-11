import { Link } from 'react-router-dom';
import LogoImgPath from '../../images/raster/TrecboLogo.png';
import { useState } from 'react';
import classes from './PageNavigation.module.scss';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

function PageNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarLinksClasses = classes['navbar__links'];
  function menuToggleHandler() {
    setMenuOpen(!menuOpen);

    // Showing

    // Collapsing
  }

  return (
    <nav className={classes['navbar']}>
      <Link to='/' className={classes['navbar__logo']}>
        <img
          src={LogoImgPath}
          className={classes['navbar__logo-image']}
          alt='Logo'
        />
        Trecbo
      </Link>
      <ul className={navbarLinksClasses}>
        <li>
          <Link to='/sign-up' className={classes['navbar__link']}>
            Sign up
          </Link>
        </li>
        <li>
          <Link to='/login' className={classes['navbar__link']}>
            <button className={`btn ${classes['btn--login']}`}>Login</button>
          </Link>
        </li>
      </ul>
      {menuOpen ? (
        <MenuIcon
          className={classes['btn--toggle']}
          onClick={menuToggleHandler}
        />
      ) : (
        <CloseIcon
          className={classes['btn--toggle']}
          onClick={menuToggleHandler}
        />
      )}
    </nav>
  );
}

export default PageNavigation;
