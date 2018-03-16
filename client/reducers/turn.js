import {TOGGLE_TOKEN_SELECTION, CLEAR_SELECTION} from '../actions/actionTypes';
import initialState from '../data';

const toggleSelection = function(selectedTokens, color) {
  if (selectedTokens.length === 3 && !selectedTokens.includes(color)) {
    return state;
  }

  if (selectedTokens.includes(color)) {
    return {selectedTokens: selectedTokens.filter(token => token !== color)};
  } else {
    return {selectedTokens: selectedTokens.concat([color])};
  }
};

const turn = function (state = initialState.turn, action) {
  switch (action.type) {
    case TOGGLE_TOKEN_SELECTION: {
      return toggleSelection(state.selectedTokens, action.color);
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
