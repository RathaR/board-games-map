import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import Board from './components/Board';
import Chat from './components/Chat'
import GameLog from './components/GameLog';
import PlayerInformation from "./components/PlayerInformation";

const BLOCK = 'game';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = this.props.initialState;

    this.toggleTokenSelection = this.toggleTokenSelection.bind(this);
  }

  isPlayerActive(playerId) {
    const {game: {activePlayer}} = this.state;
    return activePlayer === playerId;
  }

  toggleTokenSelection(color) {
    const {turn: {selectedTokens}} = this.state;
    let newTokens;

    if(selectedTokens.includes(color)) {
      newTokens = selectedTokens.filter(token => token !== color);
    } else {
      newTokens = selectedTokens.concat([color]);
    }

    if(newTokens.length > 3) {
      return;
    }
    this.setState({turn: {selectedTokens: newTokens}});
  }

  render() {
    const {board, players, turn}  = this.state;
    return (<div className={BLOCK}>
      <div className={`${BLOCK}__players-information`}>
        {players.map((playerInformation, index) =>
          <div key={index} className={`${BLOCK}__player-information-container`}>
            <PlayerInformation playerInformation={playerInformation} isActive = {this.isPlayerActive(playerInformation.id)} />
          </div>)}
      </div>
      <Board className={`${BLOCK}__board`} board={board} turn={turn} onTokenSelected={this.toggleTokenSelection} />
      <div>
        <Chat className={`${BLOCK}__chat`} />
        <GameLog className={`${BLOCK}__game-log`} />
      </div>
    </div>);
  }
}

Game.propTypes = {
  initialState: PropTypes.object,
};

export default Game;


