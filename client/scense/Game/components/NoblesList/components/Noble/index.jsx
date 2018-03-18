import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';
import Bonus from "../../../Bonus";
import {NOBLE_VIEW_MODE} from '../../../../../../constants/common';

const BLOCK = 'noble';
const Noble = function({type, noble}) {
    const {bonuses, prestige} = noble;
    const blockClasses = classNames(BLOCK, {
      [`${BLOCK}--player`]: type === NOBLE_VIEW_MODE.PLAYER,
      [`${BLOCK}--board`]: type === NOBLE_VIEW_MODE.BOARD,
    });
    return (<div className={blockClasses}>
      <div className={`${BLOCK}__prestige`}>
        <span>{prestige}</span>
      </div>
      { type === NOBLE_VIEW_MODE.BOARD && bonuses.map(bonus => <Bonus amount={bonus.amount} color={bonus.color} key={bonus.color} />)}
    </div>);
};

Noble.propTypes = {
  className: PropTypes.string,
  noble: PropTypes.object,
  type: PropTypes.string,
};

export default Noble;


