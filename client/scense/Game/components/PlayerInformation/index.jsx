import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';
import TokensStack from '../TokensStack';
import Bonus from '../Bonus';
import Card from '../Card';
import {COLORS} from '../../../../constants/common';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const BLOCK = 'player-information';

class PlayerInformation extends Component {
  state = {};

  renderTokens() {
    const {playerInformation: {tokens}} = this.props;

    return (
      <div className={`${BLOCK}__tokens`}>
        {tokens.filter(token => token.amount >0).map(
          (token, index) =>
            <div key={index} className={`${BLOCK}__token-container`}>
              <TokensStack amount={token.amount} color={token.color} isSelectable={false} minimized/>
            </div>)}
      </div>)
  }

  renderBonuses() {
    const {playerInformation: {cards}, getCard} = this.props;

    const getAmount = function(color) {

      const res =  cards.map(getCard).reduce((acc, curr)=> {
        if(curr.bonus === color) {
          return acc + 1;
        }
        return acc;
      }, 0);
      return res;
    };

    const bonusColors = [
      COLORS.BLUE,
      COLORS.BLACK,
      COLORS.GREEN,
      COLORS.RED,
      COLORS.WHITE];
    const bonuses = bonusColors
      .filter(color => getAmount(color) > 0)
      .map((color, index) => (
        <div key={index} className={`${BLOCK}__bonus-container`}>
          <Bonus amount={getAmount(color)} color={color} />
        </div>));

    return (<div className={`${BLOCK}__bonuses`}>
      {bonuses}
    </div>)
  }

  renderReservedCards() {
    const {playerInformation: {reserve}, getCard, onCardBuy} = this.props;

    return (
        <ReactCSSTransitionGroup
          className={`${BLOCK}__reserved-cards`}
          component="div"
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
        {reserve.map(
          (cardId) =>
            <div key={cardId} className={`${BLOCK}__reserved-card-container`}>
              <Card type='Reserved' className='card--reserved' card={getCard(cardId)} onBuyClick={onCardBuy}/>
            </div>)}
      </ReactCSSTransitionGroup>)
  }

  render() {
    const {playerInformation: {id}, isActive, getPlayerPoints, playerInformation} = this.props;
    const blockClasses = classNames(BLOCK,{[`${BLOCK}--active-player`]: isActive} );

    return (<div className={blockClasses}>
      <div className={`${BLOCK}__stats`}>
        <div className={`${BLOCK}__title`}>{id}</div>
        <div className={`${BLOCK}__prestige`}>Points: {getPlayerPoints(playerInformation)}</div>
      </div>
      <div className={`${BLOCK}__main`}>
        <div className={`${BLOCK}__left-container`}>
          {this.renderTokens()}
          {this.renderBonuses()}
        </div>
        <div className={`${BLOCK}__right-container`}>
          {this.renderReservedCards()}
        </div>
      </div>
    </div>);
  }
}

PlayerInformation.propTypes = {
  playerInformation: PropTypes.object,
  isActive: PropTypes.bool,
  onCardBuy: PropTypes.func,
};

export default PlayerInformation;


