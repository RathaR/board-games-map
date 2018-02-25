import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'

const BLOCK = 'bonus';
class Bonus extends Component {
  state = {
  };

  render() {
    return (<div className={`${BLOCK}`}>
      Bonus
    </div>);
  }
}

Bonus.propTypes = {
};

export default Bonus;


