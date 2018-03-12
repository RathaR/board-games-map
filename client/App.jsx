import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './styles.scss';
import Game from './scense/Game';
import {Provider} from 'react-redux';
import {toggleTokenSelection, switchPlayer, pickSelected} from './actions';
import {turn, game, players, decks, cards, nobles, board, tokens, activePlayer} from './selectors/index';

const mapStateToProps = state => {
  return {
    activePlayer: state.activePlayer,
    turn: turn(state),
    game: game(state),
    players: players(state),
    decks: decks(state),
    cards: cards(state),
    board: board(state),
    nobles: nobles(state),
    tokens: tokens(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    switchPlayer: () => {
      dispatch(switchPlayer());
    },
    onTokenSelected: colour => {
      dispatch(toggleTokenSelection(colour))
    },
    onPickSelected: () => {
      dispatch(pickSelected());
    }
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
