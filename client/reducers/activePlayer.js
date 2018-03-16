import {SWITCH_PLAYER} from '../actions/actionTypes';
import initialState from '../data';

const activePlayer = function(state = initialState.activePlayer, action) {
  switch(action.type) {
    case SWITCH_PLAYER : {
      return action.nextPlayerId;
    }
    default:
      return state;
  }
};

export default activePlayer;
