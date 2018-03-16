import { createSelector } from 'reselect';
import {cardsSelector, playersSelector} from './commmon';

export const cardSelector = createSelector(
  cardsSelector,
  cards => cardId => cards.find(card => card.id === cardId)
);

export const cardCostSelector = createSelector(
  cardSelector,
  getCard => cardId => getCard(cardId).cost,
);
export const cardOwnerSelector = createSelector(
  playersSelector,
  players => cardId => players.find(player => player.reserve.includes(cardId)),
);
