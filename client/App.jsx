import React, { Component } from 'react';
import './styles.scss'

import Game from './scense/Game'
import state from './data';

class App extends Component {
  render() {
    return (<div className='app'>
      <Game game={state} />
    </div>);
  }
}
export default App;
