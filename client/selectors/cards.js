import { createSelector } from 'reselect';
import {cardsSelector, playersSelector} from './commmon';

export const cardSelector = cardId => createSelector(
  cardsSelector,
  cards => cards.find(card => card.id === cardId)
);

export const cardCostSelector = card => card.cost;

export const cardPrestigeSelector = card => card.prestige;

export const cardOwnerSelector = createSelector(
  playersSelector,
  players => cardId => players.find(player => player.reserve.includes(cardId)),
);
