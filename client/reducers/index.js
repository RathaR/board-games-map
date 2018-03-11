import { combineReducers } from 'redux'
import initialState from '../data';

const app = function(state = initialState, action) {
  return state;
};

const rootReducer = combineReducers({app});

export default rootReducer
