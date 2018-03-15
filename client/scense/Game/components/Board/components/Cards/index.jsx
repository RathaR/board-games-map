import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import Deck from './components/Deck';
import Card from '../../../Card';

const BLOCK = 'cards';
const Cards = function ({cards, decks, getCard, onCardBuy, onCardHold}) {
  return (
    <div className={`${BLOCK}`}>
      {decks.map(
        (deck, index) => (
          <div key={index} className={`${BLOCK}__deck-container`}>
            <div className={`${BLOCK}__card-container`}>
              <Deck deck={deck}/>
            </div>
            {cards.map(cardId => getCard(cardId)).filter(card => card.level === deck.level).map(
              (card) => (
                <div key={card.id} className={`${BLOCK}__card-container`}>
                  <Card type='Card' card={card} onHoldClick={onCardHold} onBuyClick={onCardBuy}/>
                </div>))}
          </div>))}
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


