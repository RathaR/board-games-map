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

    this.pickSelected = this.pickSelected.bind(this);
    this.toggleTokenSelection = this.toggleTokenSelection.bind(this);
  }

  isPlayerActive(playerId) {
    const {game: {activePlayer}} = this.state;
    return activePlayer === playerId;
  }

  getActivePlayerInformation() {
    const {players, game: {activePlayer}} = this.state;
    return players.filter(player => player.id === activePlayer)[0];
  }

  pickSelected() {
    ///increase player gems count
    const {board: {tokens}, turn: {selectedTokens}, game: {activePlayer}} = this.state;
    const newTokens = tokens.map((token) => {
      return selectedTokens.includes(token.colour) ? {colour: token.colour, amount: token.amount - 1}: token;
    });

    const activePlayerInformation = this.getActivePlayerInformation();
    const newPlayerTokens = activePlayerInformation.tokens.map((token) => {
      return selectedTokens.includes(token.colour) ? {colour: token.colour, amount: token.amount + 1}: token;
    });

    const newPlayers = this.state.players.map(player => {
      if(player.id === activePlayer) {
        return {
          ...player,
          tokens: newPlayerTokens
        }
      }
      return player;
    });

    this.setState({
      players: [...newPlayers],
      board: {
        ...this.state.board,
        tokens: newTokens
      }, turn: {
        ...this.state.turn,
        selectedTokens: []
      }});
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
    this.setState({
      turn: {
        ...this.state.turn,
        selectedTokens: newTokens
      }});
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
      <Board className={`${BLOCK}__board`} board={board} turn={turn} onTokenSelected={this.toggleTokenSelection} onPickSelected={this.pickSelected} />
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


