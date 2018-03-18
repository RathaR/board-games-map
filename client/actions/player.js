import {TAKE_TOKEN, GIVE_TOKEN, BUY_CARD, HOLD_CARD} from './actionTypes';
import {playerBonusesSelector} from '../selectors/player';
import {cardOwnerSelector, cardSelector} from '../selectors/cards';
import {switchPlayer} from './activePlayer';
import {clearSelection} from './tokens';
import {activePlayerIdSelector, turn} from '../selectors/commmon';
import {getMissingTokens} from './helpers';

export function takeToken(color, playerId) {
  return {type: TAKE_TOKEN, color, playerId};
}

export function giveToken(color, playerId) {
  return {type: GIVE_TOKEN, color, playerId};
}

export function buyCard(cardId) {
  return (dispatch, getState) => {
    const state = getState();
    const playerId = activePlayerIdSelector(state);

    const cardOwner = cardOwnerSelector(cardId)(state);
    if(cardOwner && cardOwner.id !== playerId) {
      return;
    }

    if(getMissingTokens(state, playerId, cardId).length) {
      return;
    }

    dispatch({
      type: BUY_CARD,
      card: cardSelector(cardId)(state),
      reserved: cardOwner.id === playerId,
      bonuses: playerBonusesSelector(playerId)(state),
      playerId,
    });
    dispatch(switchPlayer());
  }
}

export function holdCard(cardId) {
  return (dispatch, getState) => {
    const playerId = activePlayerIdSelector(getState());
    dispatch({
      type: HOLD_CARD,
      card: cardSelector(cardId)(getState()),
      playerId,
    });
    dispatch(switchPlayer());
  }
}

export function pickSelected() {

  return (dispatch, getState) => {
    const {selectedTokens} = turn(getState());
    const activePlayerId = activePlayerIdSelector(getState());

    selectedTokens.forEach(color => dispatch(giveToken(color, activePlayerId)));
    dispatch(clearSelection());
    dispatch(switchPlayer());
  }
}
