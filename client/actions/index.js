/*
 * action types
 */
export const HOLD_CARD = 'HOLD_CARD';
export const BUY_CARD = 'BUY_CARD';
export const TOGGLE_TOKEN_SELECTION = 'TOGGLE_TOKEN_SELECTION';
export const PICK_SELECTED = 'PICK_SELECTED';
export const PICK_DOUBLE = 'PICK_DOUBLE';

export function holdCard(card) {
  return {type: HOLD_CARD, card};
}

export function buyCard(card) {
  return {type: BUY_CARD, card};
}

export function toogleTokenSelection(colour) {
  return {type: TOGGLE_TOKEN_SELECTION, colour};
}

export function pickSelected() {
  return {type: PICK_SELECTED}
}
