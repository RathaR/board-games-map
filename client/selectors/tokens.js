import {createSelector} from 'reselect';

export const tokensSelector = state => state.tokens;

export const tokenByColorSelector = color => createSelector(
  tokensSelector,
  tokens => tokens.find(token => token.color === color)
);
