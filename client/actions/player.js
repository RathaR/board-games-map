import {BUY_CARD, HOLD_CARD, PICK_DOUBLE, PICK_SELECTED, NOBLE_COMING} from './actionTypes';
import {playerBonusesSelector, playerReservedCardsSelector, playerSelector} from '../selectors/player';
import {cardOwnerSelector, cardSelector} from '../selectors/cards';
import {switchPlayer} from './activePlayer';
import {activePlayerIdSelector, noblesSelector, turn} from '../selectors/common';
import {getMissingTokens, comingNobles} from './helpers';
import {tokenByColorSelector, tokensSelector} from "../selectors/tokens";
import {MAX_RESERVED_CARDS} from '../constants/common';
import {nobleSelector, playingNoblesSelector} from "../selectors/nobles";

export function buyCard(cardId) {
  return (dispatch, getState) => {
    const playerId = activePlayerIdSelector(getState());

    const cardOwner = cardOwnerSelector(cardId)(getState());
    if(cardOwner && cardOwner.id !== playerId) {
      return;
    }

    if(getMissingTokens(getState(), playerId, cardId).length) {
      return;
    }

    dispatch({
      type: BUY_CARD,
      card: cardSelector(cardId)(getState()),
      reserved: cardOwner && cardOwner.id === playerId,
      bonuses: playerBonusesSelector(playerId)(getState()),
      playerId,
    });

    const playingNoblesId = playingNoblesSelector(getState());
    const nobles = comingNobles(
      playingNoblesId.map(nobleId => nobleSelector(nobleId)(getState())),
      playerBonusesSelector(playerId)(getState()));

    if(nobles.length) {
      dispatch({
        type: NOBLE_COMING,
        noble: nobles[0],
        playerId
      });
    }

    dispatch(switchPlayer());
  }
}

export function holdCard(cardId) {
  return (dispatch, getState) => {
    const state = getState();
    const playerId = activePlayerIdSelector(state);
    const player = playerSelector(playerId)(state);
    const reservedCards = playerReservedCardsSelector(player);

    if(reservedCards.length >= MAX_RESERVED_CARDS) {
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
