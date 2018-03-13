import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './styles.scss';
import Game from './scense/Game';
import {Provider} from 'react-redux';
import {toggleTokenSelection, switchPlayer, pickSelected, holdCard} from './actions';
import {turn, game, players, nobles, board, tokens, activePlayer, card} from './selectors/index';

const mapStateToProps = state => {
  return {
    activePlayer: activePlayer(state),
    turn: turn(state),
    game: game(state),
    players: players(state),
    board: board(state),
    nobles: nobles(state),
    tokens: tokens(state),
    getCard: cardId => card(state, cardId),
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
    },
    onCardHold: (cardId) => {
      dispatch(holdCard(cardId));
    },
    onCardBuy: (cardId, playerId) => {

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
