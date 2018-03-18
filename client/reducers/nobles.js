import initialState from "../data";
import {noblesSelector} from '../selectors/common';
import {NOBLE_COMING} from "../actions/actionTypes";

const nobles = function (state = noblesSelector(initialState), action) {
  return state;
};

export default nobles;
