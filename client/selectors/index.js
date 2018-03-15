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

export function player(state, playerId) {
  return players(state).filter(player => player.id === playerId)[0];
}

export function bonuses(playerState, state) {
  const _bonuses = playerState.cards
    .map(cardId => card(state, cardId).bonus)
    .reduce((acc, curr) => {
      if(acc[curr]) {
        acc[curr] += 1;
      } else {
        acc[curr] = 1;
      }
      return acc;
  }, {
      [COLORS.RED]: 0,
      [COLORS.BLACK]: 0,
      [COLORS.BLUE]: 0,
      [COLORS.GREEN]: 0,
      [COLORS.WHITE]: 0,
    });

  return Object.keys(_bonuses).map(colour => {return {bonus: colour, amount: _bonuses[colour]}});
}
export function playerBonuses(state, playerId) {
  return bonuses(player(state, playerId), state);
}

export function board(state) {
  return state.board;
}
