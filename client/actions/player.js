import {TAKE_TOKEN, GIVE_TOKEN, BUY_CARD, HOLD_CARD} from './actionTypes';
import {playerBonusesSelector, playerSelector} from '../selectors/player';
import {cardOwnerSelector, cardSelector} from '../selectors/cards';
import {switchPlayer} from './activePlayer';
import {clearSelection} from './tokens';
import {activePlayerIdSelector, turn} from '../selectors/commmon';
import {getMissingTokens} from './helpers';

export function takeToken(colour, playerId) {
  return {type: TAKE_TOKEN, colour, playerId};
}

export function giveToken(colour, playerId) {
  return {type: GIVE_TOKEN, colour, playerId};
}

export function buyCard(cardId) {
  return (dispatch, getState) => {
    const state = getState();
    const playerId = activePlayerIdSelector(state);
    const _card = cardSelector(state)(cardId);

    const cardOwner = cardOwnerSelector(state)(cardId);
    if(cardOwner && cardOwner !== playerId) {
      return;
    }

    if(getMissingTokens(state, playerId, cardId).length) {
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

export function holdCard(cardId) {
  return (dispatch, getState) => {
    const playerId = activePlayerIdSelector(getState());
    const _card = cardSelector(getState())(cardId);

    dispatch({type: HOLD_CARD, level: _card.level, cardId, playerId});
    dispatch(switchPlayer());
  }
}

export function pickSelected() {

  return (dispatch, getState) => {
    const {selectedTokens} = turn(getState());
    const activePlayerId = activePlayerIdSelector(getState());

    selectedTokens.forEach(colour => dispatch(giveToken(colour, activePlayerId)));
    dispatch(clearSelection());
    dispatch(switchPlayer());
  }
}
