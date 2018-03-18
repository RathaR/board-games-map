import { createSelector } from 'reselect';
import {cardsSelector, playersSelector} from './commmon';
import {playerReservedCardsSelector} from './player';

export const cardSelector = cardId => createSelector(
  cardsSelector,
  cards => cards.find(card => card.id === cardId)
);

export const cardCostSelector = card => card.cost;

export const cardPrestigeSelector = card => card.prestige;

export const cardOwnerSelector = cardId => createSelector(
  playersSelector,
  players => players.find(player => playerReservedCardsSelector(player).includes(cardId)),
);
