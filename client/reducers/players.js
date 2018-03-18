import initialState from "../data";
import {HOLD_CARD, BUY_CARD, PICK_SELECTED, PICK_DOUBLE} from '../actions/actionTypes';
import {COLORS} from "../constants/common";
import {playersSelector} from '../selectors/commmon';

const mapSpecificPlayer = function(state, action, newPlayerFn) {
  const {playerId} = action;
  return state.map(player => {
    if(player.id === playerId) {
      return newPlayerFn(player, action)
    }
    return player;
  })
};

const applyBuyAction = (player, action) => {
  const {card: {cost}, card, bonuses} = action;

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
  }
};

const applyPickSelectedAction = (player, action) => {
  const {selectedTokens} = action;
  return {
    ...player,
    tokens: player.tokens.map(token => {
      if(selectedTokens.includes(token.color)) {
        return {
          ...token,
          amount: token.amount + 1,
        }
      }
      return token;
    })
  }
};

const applyPickDoubleAction = (player, action) => {
  const {selectedToken} = action;
      return {
        ...player,
        tokens: player.tokens.map(token => {
          if(selectedToken === token.color) {
            return {
              ...token,
              amount: token.amount + 2,
            }
          }
          return token;
        })
  }
};

const applyHoldCardAction = (player, action) => {
  const {card} = action;
  return {
    ...player,
    reserve: player.reserve.concat([card.id]),
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
};

const players = function (state = playersSelector(initialState), action) {

  switch (action.type) {
    case BUY_CARD: {
      return mapSpecificPlayer(state, action, applyBuyAction);
    }

    case PICK_SELECTED: {
      return mapSpecificPlayer(state, action, applyPickSelectedAction);
    }

    case PICK_DOUBLE: {
      return mapSpecificPlayer(state, action, applyPickDoubleAction);
    }

    case HOLD_CARD: {
      return mapSpecificPlayer(state, action, applyHoldCardAction);
    }

    default: {
      return state;
    }
  }
};

export default players;
