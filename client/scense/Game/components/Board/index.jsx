import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss'
import Card from '../Card';
import Token from '../Token';
import Noble from '../Noble';
import Deck from './components/Deck';

const BLOCK = 'board';

class Board extends Component {
  state = {
  };

  renderCards() {
    const {board: {decks, cards}} = this.props;

    return (<div className={`${BLOCK}__cards`}>
      {decks.map(
        (deck, index) => (
          <div key={index} className={`${BLOCK}__deck-container`}>
            <div className={`${BLOCK}__card-container`}>
              <Deck deck={deck} />
            </div>
            {cards.filter(card => card.level === deck.level).map(
              (card, index) => (
                <div key={index} className={`${BLOCK}__card-container`}>
                  <Card type='Card' card={card} />
                </div>))}
          </div>))}
    </div>)
  }

  renderNobles() {
    const {board: {nobles}} = this.props;
    return (
      <div className={`${BLOCK}__nobles`}>
        {nobles.map(
          (noble, index) => (
            <div key={index} className={`${BLOCK}__noble-container`}>
              <Noble noble={noble} />
            </div>))}
      </div>);
  }

  renderTokens() {
    const {board: {tokens}} = this.props;
    return (
      <div className={`${BLOCK}__tokens`}>
        {Object.keys(tokens).map(
          (color, index) =>
            <div key={index} className={`${BLOCK}__token-container`}>
              <Token amount={tokens[color]} color={color} />
            </div>)}
      </div>);
  }

  render() {
    const blockClasses = classNames(`${BLOCK}`, this.props.className);

    return (
      <div className={blockClasses}>
        {this.renderNobles()}
        {this.renderCards()}
        {this.renderTokens()}
    </div>);
  }
}

Board.propTypes = {
  className: PropTypes.string,
  board: PropTypes.object,
};

export default Board;


