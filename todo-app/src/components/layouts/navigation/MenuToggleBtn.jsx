import React from 'react';
import classes from './MenuToggleBtn.module.scss';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

export default function MenuToggleBtn(props) {
  return props.isMenuOpen ? (
    <CloseIcon className={classes['btn--toggle']} onClick={props.onClick} />
  ) : (
    <MenuIcon className={classes['btn--toggle']} onClick={props.onClick} />
  );
}
