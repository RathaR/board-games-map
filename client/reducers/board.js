import initialState from '../data';
import {BUY_CARD, HOLD_CARD} from '../actions/actionTypes';

const board = function(state = initialState.board, action) {
  switch (action.type) {
    case HOLD_CARD: {
      const card = action.card;
      const deck = state.decks.find(deck => deck.level === card.level);
      const rowIndex = state.cards.indexOf(card.id);

      const nextCard = deck.cards[0];
      const newCards = [...state.cards];
      newCards.splice(rowIndex, 1, nextCard);

      return {
        ...state,
        cards: newCards,
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
    }
    case BUY_CARD: {
      if(action.reserved) {
        return state;
      }
      const card = action.card;
      const deck = state.decks.find(deck => deck.level === card.level);
      const rowIndex = state.cards.indexOf(card.id);

      const nextCard = deck.cards[0];
      const newCards = [...state.cards];
      newCards.splice(rowIndex, 1, nextCard);

      return {
        ...state,
        cards: newCards,
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
    }
    default: {
      return state;
    }
  }
};

export default board;
