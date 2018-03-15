import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'
import {COLORS} from "../../../../constants/common";

const BLOCK = 'bonus';

const getBlockClasses = function(colour, className) {
  return classNames(className, `${BLOCK}`, {
    [`${BLOCK}--red`]: colour === COLORS.RED,
    [`${BLOCK}--black`]: colour === COLORS.BLACK,
    [`${BLOCK}--green`]: colour === COLORS.GREEN,
    [`${BLOCK}--gold`]: colour === COLORS.GOLD,
    [`${BLOCK}--blue`]: colour === COLORS.BLUE,
    [`${BLOCK}--white`]: colour === COLORS.WHITE,
  });
};

const Bonus = function({amount, color, className}) {
    const blockClasses = getBlockClasses(color, className);

    return (<div className={blockClasses}>
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


