import React, {Component} from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BLOCK = 'deck';

function Deck({deck: {level, cards}, className}) {
  const blockClasses = classNames(`${BLOCK}`, className, {[`${BLOCK}--empty`]: cards.length === 0});

  return (
    <div className={blockClasses}>
      <div className={`${BLOCK}__count`}>{cards.length}</div>
      <div className={`${BLOCK}__level`}>{level}</div>
    </div>);
}

Deck.propTypes = {
  className: PropTypes.string,
  deck: PropTypes.object,
};

export default Deck;


