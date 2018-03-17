import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import Board from './components/Board';
import Chat from './components/Chat'
import GameLog from './components/GameLog';
import Players from './components/Players';

const BLOCK = 'game';

export const Game = function({board, turn, activePlayer, nobles, tokens, onTokenSelected, onPickSelected, getCard, onCardBuy, onCardHold, players}) {
    return (
      <div className={BLOCK}>
        <Players players={players} className={`${BLOCK}__players-information`} />
        <Board
          className={`${BLOCK}__board`}
          activePlayer={activePlayer}
          board={board} turn={turn} nobles={nobles} tokens={tokens}
          onTokenSelected={onTokenSelected}
          onPickSelected={onPickSelected}
          onCardHold={onCardHold}
          onCardBuy={onCardBuy}
          getCard={getCard} />
        <div>
          <Chat className={`${BLOCK}__chat`} />
          <GameLog className={`${BLOCK}__game-log`} />
        </div>
    </div>);
};

Game.propTypes = {
  getCard: PropTypes.func,
  onCardBuy: PropTypes.func,
  onCardHold: PropTypes.func,
  players: PropTypes.array,
};

export default Game;


