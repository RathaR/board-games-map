import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import Board from './components/Board';
import Chat from './components/Chat'
import GameLog from './components/GameLog';
import Players from './components/Players';
import {connect} from "react-redux";
import {playersSelector} from "../../selectors/common";

const BLOCK = 'game';

const mapStateToProps = state => {
  return {
    players: playersSelector(state),
  }
};

 const Game = function({board, turn, activePlayer, nobles, tokens, onTokenSelected, onPickSelected, getCard, onCardBuy, onCardHold, players, match: {params}}) {
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
    </div>);
};

const mapDispatchToProps = dispatch => ({});

const ConnectedGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

ConnectedGame.propTypes = {
  getCard: PropTypes.func,
  onCardBuy: PropTypes.func,
  onCardHold: PropTypes.func,
  players: PropTypes.array,
};

export default ConnectedGame;


