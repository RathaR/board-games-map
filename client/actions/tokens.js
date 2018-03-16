import {TOGGLE_TOKEN_SELECTION, CLEAR_SELECTION} from './actionTypes';

export function toggleTokenSelection(color) {
  return {type: TOGGLE_TOKEN_SELECTION, color};
}

export function clearSelection() {
  return {type: CLEAR_SELECTION};
}
