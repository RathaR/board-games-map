import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'
import {getColorModifier} from '../../../../helpers';

const BLOCK = 'token';
const noop = function () {};
export const Token = function({color, amount, onSelected, className, isSelected, minimized}) {

    const blockClasses = classNames(
      className,
      `${BLOCK}`,
      getColorModifier(BLOCK, color), {
      [`${BLOCK}--selected`]: isSelected,
      [`${BLOCK}--minimized`]: minimized,
    });

  return (
    <div className={blockClasses} tabIndex={1} onClick= {onSelected}>
    <div className={`${BLOCK}__icon`}>
      <div className={`${BLOCK}__amount`}>
        {amount}
      </div>
    </div>
  </div>
   );
};

Token.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  amount: PropTypes.number,
  onSelected: PropTypes.func,
  isSelected: PropTypes.bool,
  isSelectable: PropTypes.bool,
  minimized: PropTypes.bool,
};

Token.defaultProps = {
  isSelected : false,
  onClick: noop,
  isSelectable: false,
};

export default Token;


