import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import Board from './components/Board';
import Chat from './components/Chat'
import GameLog from './components/GameLog';
import PlayerInformation from "./components/PlayerInformation";
import {COLORS} from "../../constants/common";

const BLOCK = 'game';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = this.props.initialState;

    this.pickSelected = this.pickSelected.bind(this);
    this.toggleTokenSelection = this.toggleTokenSelection.bind(this);
    this.holdCard = this.holdCard.bind(this);
    this.buyCard = this.buyCard.bind(this);
  }

  isPlayerActive(playerId) {
    const {game: {activePlayer}} = this.state;
    return activePlayer === playerId;
  }

  getActivePlayerInformation() {
    const {players, game: {activePlayer}} = this.state;
    return players.filter(player => player.id === activePlayer)[0];
  }

  getNextPlayer(currentPlayer) {
    switch (currentPlayer) {
      case 'Player1': {
        return 'Player2';
      }
      case 'Player2': {
        return 'Player3';
      }
      case 'Player3': {
        return 'Player4';
      }
      case 'Player4': {
        return 'Player1';
      }
      default: {
        return 'Player1';
      }
    }
  }

  pickSelected() {
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
      game: {
        ...this.state.game,
        activePlayer: this.getNextPlayer(activePlayer),
      },
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

  holdCard(card) {
    const {game: {activePlayer}} = this.state;
    const newPlayersInformation = this.state.players.map(playerInfo => {
      if(playerInfo.id === activePlayer) {
        return {
          ...playerInfo,
          reserve: playerInfo.reserve.concat([card]),
          tokens: playerInfo.tokens.map(token => {
            if(token.colour === COLORS.GOLD) {
              return {amount: token.amount + 1, colour: COLORS.GOLD}
            }
            return token;
          })
        }
      }
      return playerInfo;
    });

    this.setState({
      game: {
        ...this.state.game,
        activePlayer: this.getNextPlayer(activePlayer),
      },
      players: [...newPlayersInformation]
    })
  }

  buyCard(card) {

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
      <Board className={`${BLOCK}__board`} board={board} turn={turn}
             onTokenSelected={this.toggleTokenSelection}
             onPickSelected={this.pickSelected}
             onCardHold={this.holdCard}
             onCardBuy={this.buyCard}
      />
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


