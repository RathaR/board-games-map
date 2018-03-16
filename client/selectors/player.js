import { createSelector } from 'reselect';
import {playersSelector, activePlayerIdSelector } from './commmon';
import {cardSelector} from './cards';

export const playersCountSelector = state => state.players.length;

export const playerSelector = createSelector(
  playersSelector,
  players => playerId => players.find(player => player.id === playerId)
);

export const activePlayerSelector = createSelector(
  activePlayerIdSelector,
  playerSelector,
  (activePlayerId, getPlayer) => getPlayer(activePlayerId),
);

export const activePlayerCardsSelector = createSelector(
  activePlayerSelector,
  getActivePlayer => getActivePlayer().cards,
);

export const playerByOrderSelector = createSelector(
  playersSelector,
  players => order => players.find(player => player.order === order),
);

export const playerCardsSelector = createSelector(
  playerSelector,
  getPlayer => playerId => getPlayer(playerId).cards,
);

export const playerTokensSelector = createSelector(
  playerSelector,
  getPlayer => playerId => getPlayer(playerId).tokens
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
    return Object.keys(_bonuses).map(color => {return {bonus: color, amount: _bonuses[color]}});
  }
);


