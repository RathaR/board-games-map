import initialState from "../data";
import {GIVE_TOKEN, HOLD_CARD, BUY_CARD} from '../actions/index';
import {COLORS} from "../constants/common";

const players = function (state = initialState.players, action) {

  switch (action.type) {
    case BUY_CARD: {

      return state.map(player => {
        if(player.id === action.playerId) {
          return {
            ...player,
            cards: player.cards.concat([action.cardId]),
          }
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
              if(token.colour === action.colour) {
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
              if(token.colour === COLORS.GOLD) {
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
