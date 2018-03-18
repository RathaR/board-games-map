import React, { Component } from 'react';
import './styles.scss'
import PropTypes from  'prop-types';
import classNames from 'classnames';
import {CARD_VIEW_TYPE, COLORS} from "../../../../constants/common";

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
      {[`${BLOCK}__cost-token--reserved`]: type === CARD_VIEW_TYPE.RESERVED });
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

  render() {
    const {card: {prestige, bonus, cost}, type, owner, activePlayer} = this.props;

    const holdActionPossible = type === CARD_VIEW_TYPE.BOARD;
    const buyActionPossible = (type === CARD_VIEW_TYPE.BOARD || (type === CARD_VIEW_TYPE.RESERVED && owner === activePlayer));

    const hasPossibleActions = buyActionPossible || holdActionPossible;
    const blockClasses = classNames(
      BLOCK,
      {
        [`${BLOCK}--reserved`]: type === CARD_VIEW_TYPE.RESERVED,
        [`${BLOCK}--available`]: activePlayer === owner,
        [`${BLOCK}--has-actions`]: hasPossibleActions,
      });

    return (
      <div className={blockClasses}>
        <div className={`${BLOCK}__top-container`}>
          <div className={`${BLOCK}__prestige`}>{prestige}</div>
          <div className={this.getBonusClasses(bonus)}/>
        </div>
        <div className={`${BLOCK}__cost`}>
          {cost.map((cost, index) => <div className={this.getCostTokenClasses(cost.color, type)} key={index}>{cost.amount}</div> )}
        </div>
        {hasPossibleActions && <div className={`${BLOCK}__actions`}>
          {buyActionPossible && <button className={`${BLOCK}__action-button`} onClick={this.handleBuyClick}>Buy</button>}
          {holdActionPossible && <button className={`${BLOCK}__action-button`} onClick={this.handleHoldClick}>Hold</button>}
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
};

export default Card;


