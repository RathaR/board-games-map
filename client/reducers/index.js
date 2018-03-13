import { combineReducers } from 'redux'
import initialState from '../data';
import activePlayer from './activePlayer';
import turn from './turn';
import tokens from './tokens';
import board from './board';
import players from './players';

const cards = function (state = initialState.cards, action) {
  return state;
};

const nobles = function (state = initialState.nobles) {
  return state;
};

const rootReducer = combineReducers({cards, activePlayer, turn, players, board, nobles, tokens});

export default rootReducer
