import {activePlayerSelector, playerByOrderSelector, playersCountSelector} from '../selectors/player';
import {SWITCH_PLAYER} from './actionTypes';

export function switchPlayer() {
  return (dispatch, getState) => {
    const activePlayer = activePlayerSelector(getState());
    const playersCount = playersCountSelector(getState());

    const nextPlayerOrder = activePlayer.order >= playersCount ? 1 : activePlayer.order + 1;
    const nextPlayer = playerByOrderSelector(getState())(nextPlayerOrder);
    dispatch({type: SWITCH_PLAYER, nextPlayerId: nextPlayer.id});
  }
}
