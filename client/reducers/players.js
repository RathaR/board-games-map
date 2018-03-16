import initialState from "../data";
import {GIVE_TOKEN, HOLD_CARD, BUY_CARD} from '../actions/actionTypes';
import {COLORS} from "../constants/common";

const players = function (state = initialState.players, action) {

  switch (action.type) {
    case BUY_CARD: {
      const card = action.card;
      const cost = card.cost;

      const costColors = cost.map(item => item.color);
      return state.map(player => {
        if(player.id === action.playerId) {

          return {
            ...player,
            cards: player.cards.concat([action.cardId]),
            reserve: [...player.reserve].filter(cardId => cardId !== action.cardId),
            tokens: player.tokens.map(item => {
              if(costColors.includes(item.color)) {
                return {
                  ...item,
                  amount: item.amount - 1,
                };
              }
              return item;
            })
          };
        }
        return player;
      })
    }

    case GIVE_TOKEN: {
      return state.map(player => {
        if(player.id === action.playerId) {
          return {
            ...player,
            tokens: player.tokens.map(token => {
              if(token.color === action.color) {
                return {
                  ...token,
                  amount: token.amount + 1,
                }
              }
              return token;
            })
          }
        }
        return player;
      })
    }

    case HOLD_CARD: {
      return state.map(player => {
        if(player.id === action.playerId) {
          return {
            ...player,
            reserve: player.reserve.concat([action.cardId]),
            tokens: player.tokens.map(token => {
              if(token.color === COLORS.GOLD) {
                return {
                  ...token,
                  amount: token.amount + 1,
                }
              }
              return token;
            })
          }
        }
        return player;
      })
    }

    default: {
      return state;
    }
  }
};

export default players;
