import {COLORS} from '../constants/common';
export function turn(state) {
  return state.turn;
}

export function tokens(state) {
  return state.tokens;
}

export function game(state) {
  return state.game;
}

export function nobles(state) {
  return state.nobles;
}

export function board(state) {
  return state.board;
}
