import initialState from '../data';
import {BUY_CARD, HOLD_CARD} from '../actions/actionTypes';

const board = function(state = initialState.board, action) {
  const level = action.card.level;
  const deck = state.decks.find(deck => deck.level === level);
  const nextCard = deck.cards[0];

  const newState = {
    ...state,
    cards: state.cards.filter(cardId => cardId !== action.cardId).concat(nextCard),
    decks: state.decks.map(item => {
      if(item === deck) {
        return {
          ...deck,
          cards: deck.cards.filter(card => card !== nextCard),
        }
      }
      return item;
    })
  };

  switch (action.type) {
    case HOLD_CARD: {
      return newState
    }
    case BUY_CARD: {
      if(action.reserved) {
        return state;
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default board;
