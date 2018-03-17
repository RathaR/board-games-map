import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './styles.scss';
import Game from './scense/Game';
import {Provider} from 'react-redux';
import {toggleTokenSelection} from './actions/tokens';
import {pickSelected, holdCard, buyCard} from './actions/player';
import {turn, game, nobles, board, tokens, playersSelector, activePlayerIdSelector} from './selectors/commmon';
import {cardSelector} from './selectors/cards';

const mapStateToProps = state => {
  return {
    activePlayer: activePlayerIdSelector(state),
    turn: turn(state),
    game: game(state),
    players: playersSelector(state),
    board: board(state),
    nobles: nobles(state),
    tokens: tokens(state),
    getCard: cardId => cardSelector(cardId)(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTokenSelected: color => {
      dispatch(toggleTokenSelection(color))
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
