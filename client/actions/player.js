import {BUY_CARD, HOLD_CARD, PICK_DOUBLE, PICK_SELECTED} from './actionTypes';
import {playerBonusesSelector, playerReservedCardsSelector, playerSelector} from '../selectors/player';
import {cardOwnerSelector, cardSelector} from '../selectors/cards';
import {switchPlayer} from './activePlayer';
import {activePlayerIdSelector, turn} from '../selectors/commmon';
import {getMissingTokens} from './helpers';
import {tokenByColorSelector, tokensSelector} from "../selectors/tokens";

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
      reserved: cardOwner && cardOwner.id === playerId,
      bonuses: playerBonusesSelector(playerId)(state),
      playerId,
    });
    dispatch(switchPlayer());
  }
}

export function holdCard(cardId) {
  return (dispatch, getState) => {
    const state = getState();
    const playerId = activePlayerIdSelector(state);
    const player = playerSelector(playerId)(state);
    const reservedCards = playerReservedCardsSelector(player);

    if(reservedCards.length >= 3) {
      return;
    }

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
    const state = getState();
    const {selectedTokens} = turn(state);
    const activePlayerId = activePlayerIdSelector(state);

    dispatch({type: PICK_SELECTED, selectedTokens: selectedTokens, playerId : activePlayerId});
    dispatch(switchPlayer());
  }
}

export function pickDouble() {

  return (dispatch, getState) => {
    const state = getState();
    const {selectedTokens} = turn(state);
    const selectedColor = selectedTokens[0];
    const activePlayerId = activePlayerIdSelector(state);

    const tokens = tokensSelector(state);
    const selectedToken = tokenByColorSelector(selectedColor)(state);
    if(selectedToken.amount < 4) {
      return;
    }
    dispatch({type: PICK_DOUBLE, selectedToken: selectedToken.color, playerId : activePlayerId});
    dispatch(switchPlayer());
  }
}
