import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'
import NoblesList from '../NoblesList';
import TokensStack from '../TokensStack';
import Cards from './components/Cards';
import { connect } from 'react-redux'
import {buyCard, holdCard, pickSelected, pickDouble} from "../../../../actions/player";
import {
  board, noblesSelector, playersSelector, tokens,
  turn
} from "../../../../selectors/commmon";
import {toggleTokenSelection} from "../../../../actions/tokens";
import {cardSelector} from "../../../../selectors/cards";

const BLOCK = 'board';

const renderTokens = function (tokens, selectedTokens, onPickSelected, onPickDouble, onTokenSelected) {
  const pickSelectedHidden = !selectedTokens.length;
  const pickDoubleHidden = !selectedTokens.length || selectedTokens.length > 1;

  return (
    <div className={`${BLOCK}__tokens`}>
      <div className={`${BLOCK}__tokens-actions`}>
        <button className={`${BLOCK}__tokens-action-button`} hidden={pickSelectedHidden} onClick={onPickSelected}>
          Pick selected
        </button>
        <button className={`${BLOCK}__tokens-action-button`} hidden={pickDoubleHidden} onClick={onPickDouble}>
          Pick double
        </button>
      </div>
      {tokens.filter(token => token.amount > 0).map(
        (token, index) =>
          <div key={token.color} className={`${BLOCK}__token-container`}>
            <TokensStack isSelected={selectedTokens.includes(token.color)} onSelected={onTokenSelected}
                         amount={token.amount} color={token.color} isSelectable/>
          </div>)}
    </div>);
};

const Board = function ({className, tokens, turn: {selectedTokens}, onPickSelected, onPickDouble, nobles, board: {cards, decks}, getCard, onCardBuy, onCardHold, onTokenSelected}) {
  const blockClasses = classNames(`${BLOCK}`, className);

  return (
    <div className={blockClasses}>
      <NoblesList nobles={nobles}/>
      <Cards cards={cards} decks={decks} getCard={getCard} onCardBuy={onCardBuy} onCardHold={onCardHold}/>
      {renderTokens(tokens, selectedTokens, onPickSelected, onPickDouble, onTokenSelected)}
    </div>);
};

const mapStateToProps = state => {
  return {
    turn: turn(state),
    board: board(state),
    nobles: noblesSelector(state),
    tokens: tokens(state),
    getCard: cardId => cardSelector(cardId)(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTokenSelected: color => {
      dispatch(toggleTokenSelection(color))
    },
    onPickSelected: () => {
      dispatch(pickSelected());
    },
    onPickDouble: () => {
      dispatch(pickDouble());
    },
    onCardHold: (cardId) => {
      dispatch(holdCard(cardId));
    },
    onCardBuy: (cardId) => {
      dispatch(buyCard(cardId));
    }
  }
};

Board.propTypes = {
  className: PropTypes.string,
  board: PropTypes.object,
  turn: PropTypes.object,
  decks: PropTypes.array,
  nobles: PropTypes.array,
  tokens: PropTypes.array,
  getCard: PropTypes.func,
  onTokenSelected: PropTypes.func,
  onPickSelected: PropTypes.func,
  onPickDouble: PropTypes.func,
  onCardHold: PropTypes.func,
  onCardBuy: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);


