import React, { Component } from 'react';
import './styles.scss'
import Board from './components/Board';
import Chat from './components/Chat'
import PlayerInformation from "./components/PlayerInformation";

const BLOCK = 'game';

class Game extends Component {
  state = {
  };

  render() {
    return (<div className={BLOCK}>
      <div className={`${BLOCK}__players-information`}>
        {[1,2,3,4].map((card, index) =>
          <div key={index} className={`${BLOCK}__player-information-container`}>
            <PlayerInformation />
          </div>)}
      </div>
      <Board className={`${BLOCK}__board`} />
      <Chat className={`${BLOCK}__chat`} />
    </div>);
  }
}

Game.propTypes = {};

export default Game;


