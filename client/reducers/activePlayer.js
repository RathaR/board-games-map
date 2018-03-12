import {SWITCH_PLAYER} from "../actions";
import initialState from "../data";

const activePlayer = function(state = initialState.activePlayer, action) {
  switch(action.type) {
    case SWITCH_PLAYER : {
      switch (state) {
        case 'Player1': {
          return 'Player2';
        }
        case 'Player2': {
          return 'Player3';
        }
        case 'Player3': {
          return 'Player4';
        }
        case 'Player4': {
          return 'Player1';
        }
        default: {
          return 'Player1';
        }
      }
      break;
    }
    default:
      return state;
  }
};

export default activePlayer;
