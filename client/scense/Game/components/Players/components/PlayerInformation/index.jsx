import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';
import TokensStack from '../../../TokensStack';
import ReservedCards from './components/ReservedCards';
import Bonus from '../../../Bonus';
import {BONUS_COLORS} from '../../../../../../constants/common';
import {connect} from "react-redux";
import {activePlayerIdSelector, playersSelector} from "../../../../../../selectors/commmon";
import {buyCard} from "../../../../../../actions/player";
import {playerPointsSelector} from "../../../../../../selectors/player";
import {cardSelector} from "../../../../../../selectors/cards";

const BLOCK = 'player-information';

const getAmount = function(cards, color, getCard) {
  return cards.map(getCard).reduce((acc, curr)=> {
    if(curr.bonus === color) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const mapStateToProps = state => {
  return {
    players: playersSelector(state),
    getCard: cardId => cardSelector(cardId)(state),
    getPlayerPoints: playerId => playerPointsSelector(playerId)(state),
    activePlayer: activePlayerIdSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onCardBuy: (cardId) => {
      dispatch(buyCard(cardId));
    }
  }
};

const PlayerInformation = function({playerInformation: {id, tokens, cards}, activePlayer, getPlayerPoints, playerInformation, onCardBuy, getCard}) {
    const blockClasses = classNames(BLOCK,{[`${BLOCK}--active-player`]: activePlayer === id});

    const _tokens = tokens.filter(token => token.amount >0)
      .map((token, index) =>
        <div key={index} className={`${BLOCK}__token-container`}>
          <TokensStack amount={token.amount} color={token.color} isSelectable={false} minimized/>
        </div>);

    const bonuses = BONUS_COLORS
      .filter(color => getAmount(cards, color, getCard) > 0)
      .map((color, index) => (
        <div key={index} className={`${BLOCK}__bonus-container`}>
          <Bonus amount={getAmount(cards, color, getCard)} color={color} />
        </div>));

    return (
      <div className={blockClasses}>
      <div className={`${BLOCK}__stats`}>
        <div className={`${BLOCK}__title`}>{id}</div>
        <div className={`${BLOCK}__prestige`}>Points: {getPlayerPoints(playerInformation)}</div>
      </div>
      <div className={`${BLOCK}__main`}>
        <div className={`${BLOCK}__left-container`}>
          <div className={`${BLOCK}__tokens`}>
            {_tokens}
          </div>
          <div className={`${BLOCK}__bonuses`}>
            {bonuses}
          </div>
        </div>
        <div className={`${BLOCK}__right-container `}>
          <ReservedCards
            className={`${BLOCK}__reserved-cards`}
            playerInformation={playerInformation}
            getCard={getCard}
            onCardBuy={onCardBuy} />
        </div>
      </div>
    </div>);
};

PlayerInformation.propTypes = {
  playerInformation: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerInformation);



