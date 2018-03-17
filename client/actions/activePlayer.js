import { playerSelector, playerByOrderSelector, playersCountSelector} from '../selectors/player';
import {SWITCH_PLAYER} from './actionTypes';
import {activePlayerIdSelector} from '../selectors/commmon';

export function switchPlayer() {
  return (dispatch, getState) => {
    const activePlayerId = activePlayerIdSelector(getState());
    const activePlayer =  playerSelector(activePlayerId)(getState());
    const playersCount = playersCountSelector(getState());

    const nextPlayerOrder = activePlayer.order >= playersCount ? 1 : activePlayer.order + 1;
    const nextPlayer = playerByOrderSelector(nextPlayerOrder)(getState());
    dispatch({type: SWITCH_PLAYER, nextPlayerId: nextPlayer.id});
  }
}
