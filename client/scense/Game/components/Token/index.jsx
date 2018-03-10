import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'
import {COLORS} from "../../../../constants/common";

const BLOCK = 'token';
class Token extends Component {
  state = {
  };

  render() {
    const {color, amount} = this.props;
    const blockClasses = classNames(this.props.className, `${BLOCK}`, {
      [`${BLOCK}--red`]: color === COLORS.RED,
      [`${BLOCK}--black`]: color === COLORS.BLACK,
      [`${BLOCK}--green`]: color === COLORS.GREEN,
      [`${BLOCK}--gold`]: color === COLORS.GOLD,
      [`${BLOCK}--blue`]: color === COLORS.BLUE,
      [`${BLOCK}--white`]: color === COLORS.WHITE,
    });

    return (<div className={blockClasses} tabIndex={1}>
      <div className={`${BLOCK}__icon`}>
        <div className={`${BLOCK}__amount`}>
          {amount}
        </div>
      </div>
    </div>);
  }
}

Token.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  amount: PropTypes.number,
};

export default Token;


