import {TOGGLE_TOKEN_SELECTION, CLEAR_SELECTION} from './actionTypes';

export function toggleTokenSelection(colour) {
  return {type: TOGGLE_TOKEN_SELECTION, colour};
}

export function clearSelection() {
  return {type: CLEAR_SELECTION};
}
