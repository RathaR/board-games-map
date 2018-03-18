import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';
import ReservedCards from './components/ReservedCards';
import {connect} from "react-redux";
import {activePlayerIdSelector, playersSelector} from "../../../../../../selectors/common";
import {buyCard} from "../../../../../../actions/player";
import {playerPointsSelector} from "../../../../../../selectors/player";
import {cardSelector} from "../../../../../../selectors/cards";
import PlayerTokens from './components/PlayerTokens';
import PlayerBonuses from './components/PlayerBonuses';
import NoblesList from '../../../NoblesList';
import {NOBLE_VIEW_MODE} from '../../../../../../constants/common';
import {nobleSelector} from '../../../../../../selectors/nobles';
const BLOCK = 'player-information';

const mapStateToProps = state => {
  return {
    players: playersSelector(state),
    getCard: cardId => cardSelector(cardId)(state),
    getNoble: nobleId => nobleSelector(nobleId)(state),
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

const PlayerInformation = function({playerInformation: {id, tokens, cards, nobles}, activePlayer, getPlayerPoints, playerInformation, onCardBuy, getCard, getNoble}) {
    const blockClasses = classNames(BLOCK,{[`${BLOCK}--active-player`]: activePlayer === id});

    return (
      <div className={blockClasses}>
      <div className={`${BLOCK}__stats`}>
        <div className={`${BLOCK}__title`}>{id}</div>
        <NoblesList nobles={nobles} getNoble={getNoble} type={NOBLE_VIEW_MODE.PLAYER}/>
        <div className={`${BLOCK}__prestige`}>Points: {getPlayerPoints(playerInformation)}</div>
      </div>
      <div className={`${BLOCK}__main`}>
        <div className={`${BLOCK}__left-container`}>
          <PlayerTokens tokens={tokens} className={`${BLOCK}__tokens`}/>
          <PlayerBonuses cards={cards} getCard={getCard} />
        </div>
        <div className={`${BLOCK}__right-container `}>
          <ReservedCards
            className={`${BLOCK}__reserved-cards`}
            playerInformation={playerInformation}
            activePlayer={activePlayer}
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



