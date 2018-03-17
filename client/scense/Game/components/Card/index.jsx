import React, { Component } from 'react';
import './styles.scss'
import PropTypes from  'prop-types';
import classNames from 'classnames';
import {COLORS} from "../../../../constants/common";

const BLOCK = 'card';

class Card extends Component {

  constructor(props) {
    super(props);

    this.handleHoldClick = this.handleHoldClick.bind(this);
    this.handleBuyClick = this.handleBuyClick.bind(this);
  }

  getCostTokenClasses(color, type) {
    return classNames(
      `${BLOCK}__cost-token`,
      `${BLOCK}__cost-token--${color}`,
      {[`${BLOCK}__cost-token--reserved`]: type === 'Reserved'});
  }

  getBonusClasses(color, type) {
    return classNames(
      `${BLOCK}__bonus`,
      `${BLOCK}__bonus--${color}`);
  }

  handleHoldClick() {
    const {card, onHoldClick} = this.props;
    onHoldClick(card.id);
  }

  handleBuyClick() {
    const {card, onBuyClick} = this.props;
    onBuyClick(card.id);
  }

  isReserved() {
    const {type} = this.props;
    return type === 'Reserved';
  }

  render() {
    const {card: {prestige, bonus, cost}, type, canBuy} = this.props;
    const holdActionVisible = type !== 'Reserved';
    const buyActionVisible = (type !== 'Reserved' || canBuy);
    const hasActions = buyActionVisible || holdActionVisible;
    const blockClasses = classNames(`${BLOCK}`, {[`${BLOCK}--reserved`]: this.isReserved()});

    return (<div className={blockClasses}>
      <div className={`${BLOCK}__top-container`}>
        <div className={`${BLOCK}__prestige`}>{prestige}</div>
        <div className={this.getBonusClasses(bonus)}/>
      </div>
      <div className={`${BLOCK}__cost`}>
        {cost.map((cost, index) => <div className={this.getCostTokenClasses(cost.color, type)} key={index}>{cost.amount}</div> )}
      </div>
      {hasActions && <div className={`${BLOCK}__actions`}>
        {buyActionVisible && <button className={`${BLOCK}__action-button`} onClick={this.handleBuyClick}>Buy</button>}
        {holdActionVisible && <button className={`${BLOCK}__action-button`} onClick={this.handleHoldClick}>Hold</button>}
      </div>}
    </div>);
  }
}

Card.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  card: PropTypes.object,
  onHoldClick: PropTypes.func,
  onBuyClick: PropTypes.func,
  canBuy: PropTypes.bool,
};

export default Card;


