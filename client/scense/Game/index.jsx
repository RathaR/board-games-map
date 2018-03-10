import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import Board from './components/Board';
import Chat from './components/Chat'
import GameLog from './components/GameLog';
import PlayerInformation from "./components/PlayerInformation";

const BLOCK = 'game';

class Game extends Component {
  state = {
  };

  isPlayerActive(playerId) {
    const {game: {activePlayer}} = this.props.state;
    return activePlayer === playerId;
  }

  render() {
    const {board, players}  = this.props.state;
    return (<div className={BLOCK}>
      <div className={`${BLOCK}__players-information`}>
        {players.map((playerInformation, index) =>
          <div key={index} className={`${BLOCK}__player-information-container`}>
            <PlayerInformation playerInformation={playerInformation} isActive = {this.isPlayerActive(playerInformation.id)} />
          </div>)}
      </div>
      <Board className={`${BLOCK}__board`} board={board} />
      <div>
        <Chat className={`${BLOCK}__chat`} />
        <GameLog className={`${BLOCK}__game-log`} />
      </div>
    </div>);
  }
}

Game.propTypes = {
  state: PropTypes.object,
};

export default Game;


