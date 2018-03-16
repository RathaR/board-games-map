import { createSelector } from 'reselect';

export const cardsSelector = state => state.cards;

export const cardSelector = createSelector(
  cardsSelector,
  cards => cardId => cards.find(card => card.id === cardId)
);

