import { Link } from 'react-router-dom';
import LogoImgPath from '../../images/raster/TrecboLogo.png';
import { useState } from 'react';
import classes from './PageNavigation.module.scss';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

// TODO Make this component out of pure components so they can be reused
function PageNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLinksClasses, setNavLinksClasses] = useState(
    `${classes['navbar__links']} ${classes['hidden']}`
  );

  function menuToggleHandler() {
    setMenuOpen(!menuOpen);

    if (menuOpen) {
      setNavLinksClasses(`${classes['navbar__links']} ${classes['shown']}`);
    } else {
      setNavLinksClasses(`${classes['navbar__links']} ${classes['hidden']}`);
    }
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
      <ul className={navLinksClasses}>
        <li>
          <Link
            to='/sign-up'
            className={classes['navbar__link']}
            onClick={menuToggleHandler}
          >
            Sign up
          </Link>
        </li>
        {/* TODO li elements to separate components -> NavLink, NavLinkBtn */}
        <li>
          <Link
            to='/login'
            className={classes['navbar__link']}
            onClick={menuToggleHandler}
          >
            <button className={`btn ${classes['btn--login']}`}>Login</button>
          </Link>
        </li>
      </ul>
      {/* TODO Page navigation to separate folder */}
      {/* TODO Component toggleNavbar button */}
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
