export function turn(state) {
  return state.turn;
}

export function tokens(state) {
  return state.tokens;
}

export function game(state) {
  return state.game;
}

export function noblesSelector(state) {
  return state.nobles;
}

export function board(state) {
  return state.board;
}

export const playersSelector = state => state.players;

export const cardsSelector = state => state.cards;

export const activePlayerIdSelector = state => state.activePlayer;
