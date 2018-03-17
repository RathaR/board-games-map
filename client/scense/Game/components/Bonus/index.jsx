import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'
import {getColorModifier} from '../../helpers';

const BLOCK = 'bonus';

const getBlockClasses = function(color, className) {
  return classNames(className, BLOCK, getColorModifier(BLOCK, color));
};

const Bonus = function({amount, color, className}) {
    return (<div className={getBlockClasses(color, className)}>
      <div className={`${BLOCK}__amount`}>
        {amount}
      </div>
    </div>);
};

Bonus.propTypes = {
  color: PropTypes.string,
  amount: PropTypes.number,
  className: PropTypes.string,
};

export default Bonus;


