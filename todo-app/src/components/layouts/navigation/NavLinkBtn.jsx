import React from 'react';
import classes from './NavLinkBtn.module.scss';
import { Link } from 'react-router-dom';

export default function NavLinkBtn(props) {
  return (
    <li>
      <Link to={props.to} onClick={props.onClick}>
        <button className={`btn ${classes['btn--login']}`}>
          {props.children}
        </button>
      </Link>
    </li>
  );
}
