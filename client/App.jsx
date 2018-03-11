import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './styles.scss';
import Game from './scense/Game';
import {Provider} from 'react-redux';

const mapStateToProps = state => {
  return {
    turn: state.app.turn,
    game: state.app.game,
    players: state.app.players,
    board: state.app.board,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // onTodoClick: id => {
    //   dispatch(toggleTodo(id))
    // }
  }
};

const ConnectedGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

const App = ({store}) => (
  <div className='app'>
    <Provider store={store}>
      <ConnectedGame />
    </Provider>
  </div>);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
