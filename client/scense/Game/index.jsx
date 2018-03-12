import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import Board from './components/Board';
import Chat from './components/Chat'
import GameLog from './components/GameLog';
import PlayerInformation from "./components/PlayerInformation";

const BLOCK = 'game';

class Game extends Component {

  holdCard(card) {
    // const {game: {activePlayer}} = this.props;
    // const newPlayersInformation = this.props.players.map(playerInfo => {
    //   if(playerInfo.id === activePlayer) {
    //     return {
    //       ...playerInfo,
    //       reserve: playerInfo.reserve.concat([card]),
    //       tokens: playerInfo.tokens.map(token => {
    //         if(token.colour === COLORS.GOLD) {
    //           return {amount: token.amount + 1, colour: COLORS.GOLD}
    //         }
    //         return token;
    //       })
    //     }
    //   }
    //   return playerInfo;
    // });
    //
    // this.setState({
    //   game: {
    //     ...this.props.game,
    //     activePlayer: this.getNextPlayer(activePlayer),
    //   },
    //   players: [...newPlayersInformation]
    // })
  }

  buyCard(card) {

  }

  render() {
    const {board, players, turn, decks, activePlayer, nobles, tokens, onTokenSelected, onPickSelected, getCard}  = this.props;
    return (<div className={BLOCK}>
      <div className={`${BLOCK}__players-information`}>
        {players.map((playerInformation, index) =>
          <div key={index} className={`${BLOCK}__player-information-container`}>
            <PlayerInformation getCard={getCard} playerInformation={playerInformation} isActive = {activePlayer === playerInformation.id} />
          </div>)}
      </div>
      <Board className={`${BLOCK}__board`}
             board={board} turn={turn} decks={decks} nobles={nobles} tokens={tokens}
             onTokenSelected={onTokenSelected}
             onPickSelected={onPickSelected}
             onCardHold={this.holdCard}
             onCardBuy={this.buyCard}
             getCard={getCard}
      />
      <div>
        <Chat className={`${BLOCK}__chat`} />
        <GameLog className={`${BLOCK}__game-log`} />
      </div>
    </div>);
  }
}

Game.propTypes = {
  getCard: PropTypes.func,
};

export default Game;


