import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import Deck from './components/Deck';
import Card from '../../../Card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {CARD_VIEW_TYPE} from '../../../../../../constants/common';

const BLOCK = 'cards';
const Cards = function ({cards, decks, getCard, onCardBuy, onCardHold}) {
  return (
    <div className={`${BLOCK}`}>
      {decks.map(
        (deck, index) => (
            <ReactCSSTransitionGroup
              key={index}
              className={`${BLOCK}__deck-container`}
              component="div"
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
            <div className={`${BLOCK}__card-container`}>
              <Deck deck={deck}/>
            </div>
            {cards.map(cardId => getCard(cardId)).filter(card => card.level === deck.level).map(
              (card) => (
                <div key={card.id} className={`${BLOCK}__card-container`}>
                  <Card type={CARD_VIEW_TYPE.BOARD} card={card} onHoldClick={onCardHold} onBuyClick={onCardBuy}/>
                </div>
              ))}
            </ReactCSSTransitionGroup>))}
    </div>)
};

Cards.propTypes = {
  cards: PropTypes.array,
  decks: PropTypes.array,
  getCard: PropTypes.func,
  onCardBuy: PropTypes.func,
  onCardHold: PropTypes.func,
};

export default Cards;


