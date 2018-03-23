import {FETCH_GAMES_BEGIN, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAILURE} from './actionTypes';
import request from 'axios';

export function fetchGames(url) {
  return (dispatch, getState) => {
    dispatch(fetchGamesBegin());
    request.get('/api/state/all').then(({data}) => dispatch(fetchGamesSuccess(data)))
  }
}

export const fetchGamesBegin = () => ({
  type: FETCH_GAMES_BEGIN
});

export const fetchGamesSuccess = items => ({
  type: FETCH_GAMES_SUCCESS,
  items: items
});

export const fetchGamesError = error => ({
  type: FETCH_GAMES_FAILURE,
  error: error
});

//https://daveceddia.com/where-fetch-data-redux/
