import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';
import {BONUS_COLORS} from "../../../../../../../../constants/common";
import Bonus from '../../../../../Bonus';

const getAmount = function(cards, color, getCard) {
  return cards.map(getCard).reduce((acc, curr)=> {
    if(curr.bonus === color) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const BLOCK = 'player-bonuses';
const PlayerBonuses =  function({ cards, getCard }) {

  const bonuses = BONUS_COLORS
    .filter(color => getAmount(cards, color, getCard) > 0)
    .map((color, index) => (
      <div key={index} className={`${BLOCK}__bonus-container`}>
        <Bonus amount={getAmount(cards, color, getCard)} color={color} />
      </div>));

  return (
    <div className={`${BLOCK}`}>
      {bonuses}
    </div>)
};

PlayerBonuses.propTypes = {

};

export default PlayerBonuses;
