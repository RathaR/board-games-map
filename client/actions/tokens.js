import {TOGGLE_TOKEN_SELECTION} from './actionTypes';

export function toggleTokenSelection(color) {
  return {type: TOGGLE_TOKEN_SELECTION, color};
}
