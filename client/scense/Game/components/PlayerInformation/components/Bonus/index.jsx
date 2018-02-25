import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'
import {COLORS} from "../../../../../../constants/common";

const BLOCK = 'bonus';
class Bonus extends Component {
  state = {
  };

  render() {
    const {amount, color} = this.props;
    const blockClasses = classNames(this.props.className, `${BLOCK}`, {
      [`${BLOCK}--red`]: color === COLORS.RED,
      [`${BLOCK}--black`]: color === COLORS.BLACK,
      [`${BLOCK}--green`]: color === COLORS.GREEN,
      [`${BLOCK}--gold`]: color === COLORS.GOLD,
      [`${BLOCK}--blue`]: color === COLORS.BLUE,
      [`${BLOCK}--white`]: color === COLORS.WHITE,
    });

    return (<div className={blockClasses}>
      <div className={`${BLOCK}__amount`}>
        {amount}
      </div>
    </div>);
  }
}

Bonus.propTypes = {
  color: PropTypes.string,
  amount: PropTypes.number,
  className: PropTypes.string,
};

export default Bonus;


