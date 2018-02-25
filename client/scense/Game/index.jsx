import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import Board from './components/Board';
import Chat from './components/Chat'
import PlayerInformation from "./components/PlayerInformation";

const BLOCK = 'game';

class Game extends Component {
  state = {
  };

  render() {
    const {board, players}  = this.props.game;
    return (<div className={BLOCK}>
      <div className={`${BLOCK}__players-information`}>
        {players.map((playerInformation, index) =>
          <div key={index} className={`${BLOCK}__player-information-container`}>
            <PlayerInformation playerInformation={playerInformation} />
          </div>)}
      </div>
      <Board className={`${BLOCK}__board`} board={board} />
      <Chat className={`${BLOCK}__chat`} />
    </div>);
  }
}

Game.propTypes = {
  game: PropTypes.object,
};

export default Game;


