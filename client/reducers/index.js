import { combineReducers } from 'redux'
import initialState from '../data';
import activePlayer from './activePlayer';
import turn from './turn';
import tokens from './tokens';
import board from './board';
import players from './players';
import nobles from './nobles';
import cards from './cards';
import games from './games';

const rootReducer = combineReducers({cards, activePlayer, turn, players, board, nobles, tokens, games});

export default rootReducer
