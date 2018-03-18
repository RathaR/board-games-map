import {TOGGLE_TOKEN_SELECTION} from './actionTypes';
import {COLORS} from "../constants/common";

export function toggleTokenSelection(color) {
  if(color === COLORS.GOLD) {
    return;
  }
  return {type: TOGGLE_TOKEN_SELECTION, color};
}
