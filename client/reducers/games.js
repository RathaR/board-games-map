import initialState from '../data';
import {gamesSelector} from '../selectors/common';
import {FETCH_GAMES_BEGIN, FETCH_GAMES_FAILURE, FETCH_GAMES_SUCCESS} from "../actions/actionTypes";

const games = function (state = gamesSelector(initialState), action) {

  switch(action.type) {
    case FETCH_GAMES_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case FETCH_GAMES_SUCCESS: {
      return {
        ...state,
        loading: false,
        items: action.items
      };
    }

    case FETCH_GAMES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        items: []
      }
    }

    default: {
      return state;
    }
  }
};

export default games;
