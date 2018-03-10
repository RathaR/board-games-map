import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'
import {COLORS} from '../../../../constants/common';

const BLOCK = 'token';
const noop = function () {};

class Token extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {color, isSelectable} = this.props;
    if(!isSelectable) {
      return;
    }

    this.props.onSelected(color);
  }

  render() {
    const {color, amount} = this.props;
    const blockClasses = classNames(this.props.className, `${BLOCK}`, {
      [`${BLOCK}--red`]: color === COLORS.RED,
      [`${BLOCK}--black`]: color === COLORS.BLACK,
      [`${BLOCK}--green`]: color === COLORS.GREEN,
      [`${BLOCK}--gold`]: color === COLORS.GOLD,
      [`${BLOCK}--blue`]: color === COLORS.BLUE,
      [`${BLOCK}--white`]: color === COLORS.WHITE,
      [`${BLOCK}--selected`]: this.props.isSelected,
    });

    return (<div className={blockClasses} tabIndex={1} onClick={this.handleClick}>
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
  onSelected: PropTypes.func,
  isSelected: PropTypes.bool,
  isSelectable: PropTypes.bool,
};

Token.defaultProps = {
  isSelected : false,
  onClick: noop,
  isSelectable: false,
};

export default Token;


