import React from 'react';
import classes from './NavLink.module.scss';
import { Link } from 'react-router-dom';

export default function NavLink(props) {
  return (
    <li>
      <Link
        to={props.to}
        className={classes['navbar__link']}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    </li>
  );
}
