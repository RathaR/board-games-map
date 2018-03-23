import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './styles.scss';
import classNames from 'classnames';
const BLOCK = 'navigation';

const Navigation = function () {
  return(
      <nav className={classNames(BLOCK)}>
        <Link to="/games">Games</Link>
        <Link to="/rules">Rules</Link>
      </nav>);
};

export default Navigation;
