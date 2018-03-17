import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './styles.scss';
import Game from './scense/Game';
import {Provider} from 'react-redux';
import { playersSelector } from './selectors/commmon';

const mapStateToProps = state => {
  return {
    players: playersSelector(state),
  }
};

const mapDispatchToProps = dispatch => ({});

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
