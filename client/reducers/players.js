import initialState from "../data";
import {GIVE_TOKEN, HOLD_CARD, BUY_CARD} from '../actions/actionTypes';
import {COLORS} from "../constants/common";


const players = function (state = initialState.players, action) {

  switch (action.type) {
    case BUY_CARD: {
      const card = action.card;
      const cost = card.cost;
      const bonuses = action.bonuses;

      const costColors = cost.map(item => item.color);
      return state.map(player => {
        if(player.id === action.playerId) {
          return {
            ...player,
            cards: player.cards.concat([card.id]),
            reserve: [...player.reserve].filter(cardId => cardId !== card.id),
            tokens: player.tokens.map(item => {
              const neededToken = cost.find(costItem => costItem.color === item.color);
              const neededTokenAmount = neededToken ? neededToken.amount : 0;
              const availableBonus = bonuses.find(bonus => bonus.color === item.color);
              const availableBonusAmount = availableBonus ? availableBonus.amount: 0;
              const availableTokensAmount = item.amount;

              if(neededTokenAmount && neededTokenAmount > availableBonusAmount) {
                return {
                  ...item,
                  amount: availableTokensAmount - (neededTokenAmount - availableBonusAmount) ,
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
            reserve: player.reserve.concat([action.card.id]),
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
