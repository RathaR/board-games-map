import {TOGGLE_TOKEN_SELECTION, CLEAR_SELECTION} from '../actions/actionTypes';
import initialState from '../data';

const toggleSelection = function(selectedTokens, colour) {
  if (selectedTokens.length === 3 && !selectedTokens.includes(colour)) {
    return state;
  }

  if (selectedTokens.includes(colour)) {
    return {selectedTokens: selectedTokens.filter(token => token !== colour)};
  } else {
    return {selectedTokens: selectedTokens.concat([colour])};
  }
};

const turn = function (state = initialState.turn, action) {
  switch (action.type) {
    case TOGGLE_TOKEN_SELECTION: {
      return toggleSelection(state.selectedTokens, action.colour);
    }

    case CLEAR_SELECTION: {
      return {
        selectedTokens: []
      }
    }

    default: {
      return state;
    }
  }
};

export default turn;
