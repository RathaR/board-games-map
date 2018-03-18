import initialState from '../data';
import {cardsSelector} from '../selectors/common';

const cards = function (state = cardsSelector(initialState), action) {
  return state;
};

export default cards;
