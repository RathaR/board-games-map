import initialState from "../data";
import {HOLD_CARD} from "../actions";

const board = function(state = initialState.board, action) {

  switch (action.type) {
    case HOLD_CARD: {
      const deck = state.decks.filter(deck => deck.level === action.level)[0];
      const newCard = deck.cards[0];

      return {
        ...state,
        cards: state.cards.filter(cardId => cardId !== action.cardId).concat(newCard),
        decks: state.decks.map(item => {
          if(item === deck) {
            return {
              ...deck,
              cards: deck.cards.filter(card => card !== newCard),
            }
          }
          return item;
        })
      }
    }
    default: {
      return state;
    }
  }
};

export default board;
