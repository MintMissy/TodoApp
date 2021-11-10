import React from 'react';
import Card from '../ui/Card';
import classes from './LoginForm.module.scss';

export default function LoginForm(props) {
  return (
    <div className={classes['form-container']}>
      <Card>
        <form className={classes['login-form']}>
          <h1>Login</h1>
          <div className={classes['input-container']}>
            <label htmlFor='username' className={classes['input-label--text']}>
              Username
            </label>
            <input
              name='username'
              type='text'
              className={classes['input--text']}
              required
            />
          </div>
          <div className={classes['input-container']}>
            <label htmlFor='password' className={classes['input-label--text']}>
              Password
            </label>
            <input
              name='password'
              type='password'
              className={classes['input--text']}
              required
            />
          </div>
          <button type='submit' className={`btn ${classes['btn--login-form']}`}>
            Login
          </button>
          <p>Don't have an account yet?</p>
        </form>
      </Card>
    </div>
  );
}
