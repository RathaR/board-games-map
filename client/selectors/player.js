import { createSelector } from 'reselect';
import {playersSelector, activePlayerIdSelector } from './commmon';
import {cardSelector} from './cards';

export const playersCountSelector = state => state.players.length;

export const playerSelector = playerId => createSelector(
  playersSelector,
  players => players.find(player => player.id === playerId)
);

// export const activePlayerSelector = createSelector(
//   activePlayerIdSelector,
//   playerSelector,
//   (activePlayerId, getPlayer) => getPlayer(activePlayerId),
// );

export const playerByOrderSelector = order => createSelector(
  playersSelector,
  players => players.find(player => player.order === order),
);

export const playerCardsSelector = player => player.cards;

export const tokensSelector = player => player.tokens;

// export const playerTokensSelector = playerId => createSelector(
//   playerSelector(playerId),
//   tokensSelector,
//   (player, getPlayerTokens) => getPlayerTokens(player)
// );

export const playerBonusesSelector = playerId => createSelector(
  playerSelector(playerId),
  cardSelector,
  (player, getCard) => {
    debugger;
    const cards = playerCardsSelector(player)
      .map(getCard);
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


