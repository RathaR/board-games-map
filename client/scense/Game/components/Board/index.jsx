import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss'
import Card from '../Card';
import Token from '../TokensStack/сomponents/Token';
import Noble from '../Noble';
import Deck from './components/Deck';
import {COLORS} from "../../../../constants/common";
import TokensStack from "../TokensStack";

const BLOCK = 'board';

class Board extends Component {

  renderCards() {
    const {decks, board: {cards}, getCard} = this.props;

    return (<div className={`${BLOCK}__cards`}>
      {decks.map(
        (deck, index) => (
          <div key={index} className={`${BLOCK}__deck-container`}>
            <div className={`${BLOCK}__card-container`}>
              <Deck deck={deck} />
            </div>
            {cards.map(cardId => getCard(cardId)).filter(card => card.level === deck.level).map(
              (card) => (
                <div key={card.id} className={`${BLOCK}__card-container`}>
                  <Card type='Card' card={card} onHoldClick={this.props.onCardHold} onBuyClick={this.props.onCardBuy} />
                </div>))}
          </div>))}
    </div>)
  }

  renderNobles() {
    const {nobles} = this.props;
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
    const {tokens, turn: {selectedTokens}} = this.props;
    const pickSelectedHidden = !selectedTokens.length;
    const pickDoubleHidden = !selectedTokens.length || selectedTokens.length > 1;

    return (
      <div className={`${BLOCK}__tokens`}>
        <div className={`${BLOCK}__tokens-actions`}>
          <button className={`${BLOCK}__tokens-action-button`} hidden={pickSelectedHidden} onClick={this.props.onPickSelected}>Pick selected</button>
          <button className={`${BLOCK}__tokens-action-button`} hidden={pickDoubleHidden} onClick={this.props.onPickDouble}>Pick double</button>
        </div>
        {tokens.filter(token => token.amount >0).map(
          (token, index) =>
            <div key={index} className={`${BLOCK}__token-container`}>
              <TokensStack isSelected={selectedTokens.includes(token.colour)} onSelected={this.props.onTokenSelected} amount={token.amount} colour={token.colour} isSelectable/>
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
  turn: PropTypes.object,
  decks: PropTypes.array,
  nobles: PropTypes.array,
  tokens: PropTypes.array,
  getCard: PropTypes.func,
  onTokenSelected: PropTypes.func,
  onPickSelected: PropTypes.func,
  onPickDouble: PropTypes.func,
  onCardHold: PropTypes.func,
  onCardBuy: PropTypes.func,
};

export default Board;


