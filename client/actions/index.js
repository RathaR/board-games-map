/*
 * action types
 */
export const HOLD_CARD = 'HOLD_CARD';
export const BUY_CARD = 'BUY_CARD';
export const TOGGLE_TOKEN_SELECTION = 'TOGGLE_TOKEN_SELECTION';
export const PICK_SELECTED = 'PICK_SELECTED';
export const SWITCH_PLAYER = 'SWITCH_PLAYER';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const TAKE_TOKEN = 'TAKE_TOKEN';
export const GIVE_TOKEN = 'GIVE_TOKEN';

import {turn, card} from '../selectors/index';

import {playerSelector, activePlayerSelector, playersSelector, playerBonusesSelector} from '../selectors/player';

const getCardOwner = function (getState, cardId) {
  const _players = playersSelector(getState());
  let playerId;
  _players.forEach(player => {
    if(player.reserve.includes(cardId)) {
      playerId = player.id;
    }
  });
  return playerId;
};

const canBuyCard = function(cardCost, playerTokens, bonuses) {
  ///TODO: change to reducer
  let result = true;

  cardCost.forEach(item => {

    const availableTokens = playerTokens.filter(token => token.colour === item.colour)[0].amount;
    const availableBonus = bonuses.find(bonus => bonus.bonus === item.colour);
    const bonusAmount = availableBonus ? availableBonus.amount : 0;

    if(item.amount > availableTokens + bonusAmount) {
      result = false;
    }
  });

  return result;
};

export function buyCard(cardId) {
  return (dispatch, getState) => {
    const playerId = activePlayerSelector(getState());
    const _card = card(getState(), cardId);
    const _player = playerSelector(getState())(playerId);
    const _bonuses = playerBonusesSelector(getState())(playerId);

    const cardOwner = getCardOwner(getState, cardId);
    if(cardOwner && cardOwner !== playerId) {
      return;
    }

    if(!canBuyCard(_card.cost, _player.tokens, _bonuses)) {
      return;
    }

    dispatch({
      type: BUY_CARD,
      level: _card.level,
      card: _card,
      reserved: cardOwner === playerId,
      cardId,
      playerId,
    });
    dispatch(switchPlayer());
  }
}

export function toggleTokenSelection(colour) {
  return {type: TOGGLE_TOKEN_SELECTION, colour};
}

export function clearSelection() {
  return {type: CLEAR_SELECTION};
}

export function takeToken(colour, playerId) {
  return {type: TAKE_TOKEN, colour, playerId};
}

export function giveToken(colour, playerId) {
  return {type: GIVE_TOKEN, colour, playerId};
}

export function holdCard(cardId) {
  return (dispatch, getState) => {
    const playerId = activePlayerSelector(getState());
    const _card = card(getState(), cardId);

    dispatch({type: HOLD_CARD, level: _card.level, cardId, playerId});
    dispatch(switchPlayer());
  }
}

export function pickSelected() {

  return (dispatch, getState) => {
    const {selectedTokens} = turn(getState());
    const activePlayerId = activePlayerSelector(getState());

    selectedTokens.forEach(colour => dispatch(giveToken(colour, activePlayerId)));
    dispatch(clearSelection());
    dispatch(switchPlayer());
  }
}

export function switchPlayer() {
  return {type: SWITCH_PLAYER};
}
