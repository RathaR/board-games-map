import initialState from '../data';
import {GIVE_TOKEN} from '../actions/actionTypes';

const tokens = function(state = initialState.tokens, action) {

  switch (action.type) {
    case GIVE_TOKEN: {
      return state.map(token => {
        if(token.colour === action.colour) {
          return {
            colour: token.colour, amount: token.amount - 1,
          }
        }
        return token;
      });
    }
    default: {
      return state;
    }
  }
};

export default tokens;
