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

export function cards(state) {
  return state.cards;
}

export function card(state, id) {
  return cards(state).filter(card => card.id === id)[0];
}

export function activePlayer(state) {
  return state.activePlayer;
}

export function players(state) {
  return state.players;
}

export function board(state) {
  return state.board;
}
