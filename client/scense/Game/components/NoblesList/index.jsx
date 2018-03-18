import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import Noble from './components/Noble';
import classNames from 'classnames';
import {NOBLE_VIEW_MODE} from '../../../../constants/common';

const BLOCK = 'nobles-list';
const NoblesList = function({nobles, getNoble, type}) {
  const blockClasses = classNames(BLOCK, {
    [`${BLOCK}--board`]: type === NOBLE_VIEW_MODE.BOARD,
    [`${BLOCK}--player`]: type === NOBLE_VIEW_MODE.PLAYER,
  });
    return (
      <div className={blockClasses}>
        {nobles.map(nobleId => <Noble key={nobleId} noble={getNoble(nobleId)} type={type}/>)}
      </div>);
  };

NoblesList.propTypes = {
  nobles: PropTypes.array,
  getNoble: PropTypes.func,
  type: PropTypes.string,
};

export default NoblesList;


