import initialState from '../data';
import {BUY_CARD, HOLD_CARD, NOBLE_COMING} from '../actions/actionTypes';

const drawCard = function(board, card) {
  const deck = board.decks.find(deck => deck.level === card.level);
  const rowIndex = board.cards.indexOf(card.id);

  const newCards = [...board.cards];
  const nextCard = deck.cards[0];
  if(nextCard) {
    newCards.splice(rowIndex, 1, nextCard);
  } else {
    newCards.splice(rowIndex, 1);
  }

  return {
    ...board,
    cards: newCards,
    decks: board.decks.map(item => {
      if(item === deck) {
        return {
          ...deck,
          cards: deck.cards.filter(card => card !== nextCard),
        }
      }
      return item;
    })
  };
};

const board = function(state = initialState.board, action) {
  switch (action.type) {

    case HOLD_CARD: {
      return drawCard(state, action.card);
    }

    case BUY_CARD: {
      if(action.reserved) {
        return state;
      }

      return drawCard(state, action.card);
    }
    case NOBLE_COMING: {
      const {noble} = action;

      return {
        ...state,
        nobles: state.nobles.filter(nobleId => nobleId !== noble.id)
      };
    }
    default: {
      return state;
    }
  }
};

export default board;
