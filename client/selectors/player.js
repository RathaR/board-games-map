import { createSelector } from 'reselect';
import {cardSelector} from  './cards';

export const playersSelector = state => state.players;

export const playersCountSelector = state => state.players.length;

export const activePlayerSelector = state => state.activePlayer;

export const playerSelector = createSelector(
  playersSelector,
  players => playerId => players.find(player => player.id === playerId)
);

export const playerCardsSelector = createSelector(
  playerSelector,
  playerSelector => playerId => playerSelector(playerId).cards
);

export const playerBonusesSelector = createSelector(
  playerCardsSelector,
  cardSelector,
  (playerCardsSelector, cardSelector) => playerId => {
    const cards = playerCardsSelector(playerId)
      .map(cardSelector);
    const _bonuses = cards.reduce((acc, curr) => {
      const color = curr.bonus;
      if (acc[color]) {
        acc[color] += 1;
      } else {
        acc[color] = 1;
      }
      return acc;
    }, {});
    return Object.keys(_bonuses).map(colour => {return {bonus: colour, amount: _bonuses[colour]}});
  }
);


