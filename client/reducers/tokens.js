import initialState from '../data';
import {PICK_DOUBLE, PICK_SELECTED} from '../actions/actionTypes';
import {tokensSelector} from '../selectors/tokens';

const tokens = function(state = tokensSelector(initialState), action) {

  switch (action.type) {

    case PICK_SELECTED: {
      const {selectedTokens} = action;
      const newState = [...state];
      selectedTokens.forEach(color => {
        const token = newState.find(token => token.color === color);
        token.amount -= 1;
      });

      return newState;
    }

    case PICK_DOUBLE: {
      const {selectedToken} = action;
      const newState = [...state];
      const token = newState.find(token => token.color === selectedToken);
      token.amount -= 2;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default tokens;
