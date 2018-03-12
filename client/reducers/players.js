import initialState from "../data";
import {GIVE_TOKEN} from '../actions/index';

const players = function (state = initialState.players, action) {

  switch (action.type) {
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

    default: {
      return state;
    }
  }
};

export default players;
