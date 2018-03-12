import { combineReducers } from 'redux'
import initialState from '../data';
import activePlayer from './activePlayer';
import turn from './turn';
import tokens from './tokens';
import players from './players';

const cards = function (state = initialState.cards, action) {
  return state;
};

const decks = function (state = initialState.decks, action) {
  return state;
};

const board = function (state = initialState.board) {
  return state;
};

const nobles = function (state = initialState.nobles) {
  return state;
};

const rootReducer = combineReducers({cards, decks, activePlayer, turn, players, board, nobles, tokens});

export default rootReducer
