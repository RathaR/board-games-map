import { createSelector } from 'reselect';
import {cardsSelector, noblesSelector, playersSelector} from './commmon';
import {noblePrestigeSelector, nobleSelector} from './nobles';
import {cardPrestigeSelector} from './cards';

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

export const playerTokensSelector = player => player.tokens;

export const playerNoblesSelector = player => player.nobles;

export const playerPointsSelector = player => createSelector(
  noblesSelector,
  cardsSelector,
  (nobles, cards) => {
    const playerNoblesIds = playerNoblesSelector(player);
    const playerNobles = playerNoblesIds.map(nobleId => nobles.find(noble => noble.id === nobleId));
    const noblesPoints = playerNobles.reduce((acc, curr) => acc + noblePrestigeSelector(curr), 0);

    const playerCardsIds = playerCardsSelector(player);
    const playerCards = playerCardsIds.map(cardId => cards.find(card => card.id === cardId));
    const cardsPoints = playerCards.reduce((acc, curr) => acc + cardPrestigeSelector(curr), 0);

    return cardsPoints + noblesPoints;
  }
);

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


