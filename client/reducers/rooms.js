import initialState from '../data';
import {roomsSelector} from '../selectors/common';

const rooms = function (state = roomsSelector(initialState), action) {
  return state;
};

export default rooms;
