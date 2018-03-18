import {TOGGLE_TOKEN_SELECTION, PICK_SELECTED, PICK_DOUBLE} from '../actions/actionTypes';
import initialState from '../data';

const toggleSelection = function(selectedTokens, color) {
  if (selectedTokens.length === 3 && !selectedTokens.includes(color)) {
    return {selectedTokens};
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

    case PICK_SELECTED: {
      return {
        selectedTokens: []
      }
    }

    case PICK_DOUBLE: {
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
