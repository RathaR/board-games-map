import { createSelector } from 'reselect';
import {cardsSelector, playersSelector } from './commmon';

export const playersCountSelector = state => state.players.length;

export const playerSelector = playerId => createSelector(
  playersSelector,
  players => players.find(player => player.id === playerId)
);

export const playerByOrderSelector = order => createSelector(
  playersSelector,
  players => players.find(player => player.order === order),
);

export const playerCardsSelector = player => player.cards;

export const tokensSelector = player => player.tokens;

export const playerBonusesSelector = playerId => createSelector(
  playerSelector(playerId),
  cardsSelector,
  (player, cards) => {
    const playerCards = playerCardsSelector(player)
      .map(cardId => cards.find(card => card.id === cardId));
    const _bonuses = playerCards.reduce((acc, curr) => {
      const color = curr.bonus;
      if (acc[color]) {
        acc[color] += 1;
      } else {
        acc[color] = 1;
      }
      return acc;
    }, {});
    return Object.keys(_bonuses).map(color => {return {color: color, amount: _bonuses[color]}});
  }
);


