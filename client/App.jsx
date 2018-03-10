import React, { Component } from 'react';
import './styles.scss'

import Game from './scense/Game'
import gameState from './data';

class App extends Component {
  render() {
    return (<div className='app'>
      <Game state={gameState} />
    </div>);
  }
}
export default App;
