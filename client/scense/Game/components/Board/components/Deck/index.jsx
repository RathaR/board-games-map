import React, { Component } from 'react';
import './styles.scss'
import PropTypes from  'prop-types';
import classNames from 'classnames';

const BLOCK = 'deck';

class Deck extends Component {
  state = {
  };

  render() {
    const {deck: {level, cards}} = this.props;
    const blockClasses = classNames(`${BLOCK}`, this.props.className, {[`${BLOCK}--empty`]: cards.length === 0});

    return (<div className={blockClasses}>
      <div className={`${BLOCK}__title`}>
        Deck
      </div>
      <div className={`${BLOCK}__count`}>{cards.length}</div>
      <div className={`${BLOCK}__level`}>{level}</div>
    </div>);
  }
}

Deck.propTypes = {
  className: PropTypes.string,
  deck: PropTypes.object,
};

export default Deck;


