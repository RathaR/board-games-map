import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './styles.scss';
import Game from './scense/Game';
import {Provider} from 'react-redux';
import {toggleTokenSelection, switchPlayer, pickSelected, holdCard, buyCard} from './actions';
import {turn, game, nobles, board, tokens, card} from './selectors/index';
import {activePlayerSelector, playersSelector} from './selectors/player';

const mapStateToProps = state => {
  return {
    activePlayer: activePlayerSelector(state),
    turn: turn(state),
    game: game(state),
    players: playersSelector(state),
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
    onCardBuy: (cardId) => {
      dispatch(buyCard(cardId));
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
