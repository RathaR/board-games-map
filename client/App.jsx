import React, { Component } from 'react';
import './styles.scss'

import Game from './scense/Game'

class App extends Component {
  state = {
    game: {
      turn: 'Player1',
      target: 15,
    },
    players: [{
      id: 'Player1',
      nobles: [],
      reserve: [],
      tokens: {
        blue: 2,
        black: 0,
        green: 3,
        red: 0,
        white: 2,
        gold: 1,
      },
      cards: [],
    }],
    board: {
      nobles: [],
      tokens: {
        blue: 4,
        black: 4,
        green: 4,
        red: 4,
        white: 4,
        gold: 5,
      },
      decks: {
        level1: 14,
        level2: 15,
        level3: 20,
      },
      cards: [{
        level: 1,
        prestige: 1,
        bonus: 'blue',
        cost: [{
          red: 1,
          blue: 2,
          black: 3,
        }]
      }]
    }
  };

  render() {
    return (<div className='app'>
      <Game />
    </div>);
  }
}
export default App;
