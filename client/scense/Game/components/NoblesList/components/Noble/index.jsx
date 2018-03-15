import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';
import Bonus from "../../../Bonus";

const BLOCK = 'noble';
const Noble = function({type, noble}) {
    const {bonuses, prestige} = noble;
    const blockClasses = classNames(`${BLOCK}`);
    return (<div className={blockClasses}>
      <div className={`${BLOCK}__prestige`}>
        <span>{prestige}</span>
      </div>
      {Object.keys(bonuses).map((color, index) => <Bonus amount={bonuses[color]} color={color} key={index} />)}
    </div>);
};

Noble.propTypes = {
  className: PropTypes.string,
  noble: PropTypes.object,
};

export default Noble;


