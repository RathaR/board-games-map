import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import Board from './components/Board';
import Chat from './components/Chat'
import GameLog from './components/GameLog';
import PlayerInformation from "./components/PlayerInformation";

const BLOCK = 'game';

export const Game = function({board, players, turn, activePlayer, nobles, tokens, onTokenSelected, onPickSelected, getCard, onCardBuy, onCardHold}) {
    return (<div className={BLOCK}>
      <div className={`${BLOCK}__players-information`}>
        {players.map((playerInformation, index) =>
          <div key={index} className={`${BLOCK}__player-information-container`}>
            <PlayerInformation getCard={getCard} playerInformation={playerInformation} isActive = {activePlayer === playerInformation.id} onCardBuy={onCardBuy} />
          </div>)}
      </div>
      <Board className={`${BLOCK}__board`}
             activePlayer={activePlayer}
             board={board} turn={turn} nobles={nobles} tokens={tokens}
             onTokenSelected={onTokenSelected}
             onPickSelected={onPickSelected}
             onCardHold={onCardHold}
             onCardBuy={onCardBuy}
             getCard={getCard}
      />
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
};

export default Game;


