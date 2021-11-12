import React from 'react';
import classes from './NavLinkImage.module.scss';
import { Link } from 'react-router-dom';

export default function NavLinkImage(props) {
  return (
    <Link to='/' className={classes['navbar__image-container']}>
      <img
        src={props.src}
        className={classes['navbar__image']}
        alt={props.alt}
      />
      {props.children}
    </Link>
  );
}
