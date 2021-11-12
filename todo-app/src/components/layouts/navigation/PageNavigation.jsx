import LogoImgPath from '../../../images/raster/TrecboLogo.png';
import { useState, useEffect } from 'react';
import classes from './PageNavigation.module.scss';
import NavLink from './NavLink';
import NavLinkBtn from './NavLinkBtn';
import MenuToggleBtn from './MenuToggleBtn';
import NavLinkImage from './NavLinkImage';

function PageNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navLinksClasses, setNavLinksClasses] = useState(
    `${classes['navbar__links']} ${classes['hidden']}`
  );

  useEffect(() => {
    toggleMenu();
  });

  function toggleMenu() {
    if (isMenuOpen) {
      setNavLinksClasses(`${classes['navbar__links']} ${classes['shown']}`);
    } else {
      setNavLinksClasses(`${classes['navbar__links']} ${classes['hidden']}`);
    }
  }

  function menuToggleHandler() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className={classes['navbar']}>
      <NavLinkImage src={LogoImgPath} alt='Logo'>
        Trecbo
      </NavLinkImage>
      <ul className={navLinksClasses}>
        <NavLink to='/sign-up' onClick={menuToggleHandler}>
          Sign up
        </NavLink>
        <NavLinkBtn to='/login' onClick={menuToggleHandler}>
          Login
        </NavLinkBtn>
      </ul>
      <MenuToggleBtn isMenuOpen={isMenuOpen} onClick={menuToggleHandler} />
    </nav>
  );
}

export default PageNavigation;
