import {SWITCH_PLAYER} from '../actions/actionTypes';
import initialState from '../data';
import {activePlayerIdSelector} from '../selectors/commmon';

const activePlayer = function(state = activePlayerIdSelector(initialState), action) {
  switch(action.type) {
    case SWITCH_PLAYER : {
      return action.nextPlayerId;
    }
    default:
      return state;
  }
};

export default activePlayer;
