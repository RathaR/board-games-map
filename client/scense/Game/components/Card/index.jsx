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
    const {card: {prestige, bonus, cost}, type} = this.props;

    const blockClasses = classNames(`${BLOCK}`, {[`${BLOCK}--reserved`]: this.isReserved()});

    return (<div className={blockClasses} tabIndex={1}>
      <div className={`${BLOCK}__top-container`}>
        <div className={`${BLOCK}__prestige`}>{prestige}</div>
        <div className={this.getBonusClasses(bonus)}/>
      </div>
      <div className={`${BLOCK}__cost`}>
        {Object.keys(cost).map((color, index) => <div className={this.getCostTokenClasses(color, type)}  key={index}>{index}</div> )}
      </div>
      <div className={`${BLOCK}__actions`}>
        <button className={`${BLOCK}__action-button`} onClick={this.handleBuyClick}>Buy</button>
        {!this.isReserved() && <button className={`${BLOCK}__action-button`} onClick={this.handleHoldClick}>Hold</button>}
      </div>
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


